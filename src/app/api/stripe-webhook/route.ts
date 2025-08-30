import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.text(); //get all the data sent by stripe webhook
    const signature = req.headers.get("stripe-signature"); //check if stripe is the one who call the webhook

    if (!signature) {
      return new Response("Signature is Missing", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    console.log(`Receive event :${event.type}`, event.data.object);

    switch (event.type) {
      case "checkout.session.completed":
        await handleSessionCompleted(event.data.object);
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionCreatedOrUpdated(event.data.object.id);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
        break;
    }

    return new Response("Event received", { status: 200 });
  } catch (error) {
    console.log("error in POST", error);
    return new Response("Internal Server error", { status: 500 });
  }
}

async function handleSessionCompleted(session: Stripe.Checkout.Session) {
  try {
    const userId = session.metadata?.userId;

    if (!userId) {
      throw new Error("user ID is missing");
    }

    (await clerkClient()).users.updateUserMetadata(userId, {
      privateMetadata: {
        stripeCustomerId: session.customer as string,
      },
    });
  } catch (error) {}
}

async function handleSubscriptionCreatedOrUpdated(subscriptionId: string) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  if (subscription.status === "active" || subscription.status === "trialing") {
    await prisma.userSubscription.upsert({
      where: {
        userId: subscription.metadata.userId,
      },
      create: {
        userId: subscription.metadata.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ),
        stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
      update: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ),
        stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    });
  } else {
    await prisma.userSubscription.deleteMany({
      where: {
        stripeCustomerId: subscription.customer as string,
      },
    });
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  await prisma.userSubscription.deleteMany({
      where: {
        stripeCustomerId: subscription.customer as string,
      },
    });
}
