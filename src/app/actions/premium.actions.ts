"use server";

import stripe from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";

export const createCheckoutSession = async (priceId: string) => {
  try {
    const user = await currentUser();

    if (!user) return;

    const stripeCustomerId = user.privateMetadata.stripeCustomerId as
      | string
      | undefined;

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/billing/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/billing`,
      customer: stripeCustomerId,
      customer_email: stripeCustomerId
        ? undefined
        : user.emailAddresses[0].emailAddress,
      metadata: {
        userId: user.id,
      },
      subscription_data: {
        metadata: {
          userId: user.id,
        },
      },
      custom_text: {
        terms_of_service_acceptance: {
          //the [terms of service](${process.env.EXT_PUBLIC_BASE_URL}/tos) means it is a markdown syntax that can behave like a link
          message: `I have read the [terms of service](${process.env.EXT_PUBLIC_BASE_URL!}/tos) and agree to them `,
        },
      },
      consent_collection: {
        terms_of_service: "required",
      },
    });

    if (!session.url) throw new Error("Failed to create checkout session");

    return session.url;
  } catch (error) {
    console.log("Error in createCheckoutSession", error);
  }
};
