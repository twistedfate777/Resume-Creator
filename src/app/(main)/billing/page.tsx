import { getCurrentUserId } from "@/app/actions/auth.actions";
import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { Metadata } from "next";
import React from "react";
import Stripe from "stripe";
import GetSubscribtionButton from "./GetSubscribtionButton";
import ManageSubscriptionButton from "./ManageSubscriptionButton";
import { formatDate } from "date-fns";

export const metadata: Metadata = {
  title: "Billing",
};

async function Billing() {
  const userId = await getCurrentUserId();
  if (!userId) return;

  const subscription = await prisma.userSubscription.findUnique({
    where: {
      userId,
    },
  });

  const priceInfo = subscription
    ? stripe.prices.retrieve(subscription.stripePriceId, {
        expand: ["product"],
      })
    : null;

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <h1 className="text-3xl font-bold">Billing</h1>
      <p>
        Your current plan :{" "}
        <span className="font-bold">
          {priceInfo
            ? ((await priceInfo).product as Stripe.Product).name
            : "Free"}
        </span>
      </p>
      {subscription ? (
        <>
          {subscription.stripeCancelAtPeriodEnd == true && (
            <p className="text-destructive">
              Your subscription will be canceled on{" "}
              {formatDate(subscription.stripeCurrentPeriodEnd, "MMMM dd, yyyy")}
            </p>
          )}
          <ManageSubscriptionButton />
        </>
      ) : (
        <GetSubscribtionButton />
      )}
    </main>
  );
}

export default Billing;
