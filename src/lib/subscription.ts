"use server";
import { cache } from "react";
import prisma from "./prisma";
import { currentUser } from "@clerk/nextjs/server";

export type subscriptionLevel = "free" | "pro" | "pro_plus";

export const getUserSubscriptionLevel = cache(
  async (userId: string): Promise<subscriptionLevel> => {
    const subscription = await prisma.userSubscription.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!subscription || subscription.stripeCurrentPeriodEnd < new Date())
      return "free";

    if (
      subscription.stripePriceId ==
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY
    ) {
      return "pro";
    }

    if (
      subscription.stripePriceId ==
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY
    )
      return "pro_plus";

    throw new Error("Invalid subscription");
  },
);
