"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { usePremiumStore } from "@/hooks/usePremiumDialog";
import { createCheckoutSession } from "@/app/actions/premium.actions";
import { redirect } from "next/navigation";

const premiumFeatures = ["AI Tools", "Up to 3 resumes"];
const premiumPlusFeatures = ["Infinite resumes", "Design customizations"];

function PremiumDialog() {
  const { isOpen, setIsOpen, subscriptionLevel } = usePremiumStore();

  const handleBuyPremium = async (priceId: string) => {
    const checkoutUrl = await createCheckoutSession(priceId);
    redirect(`${checkoutUrl}`);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-start">
            Resume Builder Ai Premium
          </DialogTitle>
          <DialogDescription className="text-start">
            Get a premium subscription to unlock more features
          </DialogDescription>
        </DialogHeader>
        <div className="flex">
          <div className="flex w-full flex-col gap-3">
            <h1 className="w-full text-center font-bold"> Premium</h1>
            <ul className="flex flex-col gap-2 py-2">
              {premiumFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Check className="size-4 text-green-500" />
                  <li>{feature}</li>
                </div>
              ))}
            </ul>
            <Button
              onClick={() =>
                handleBuyPremium(
                  process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY!,
                )
              }
              disabled={subscriptionLevel == "pro"}
            >
              {subscriptionLevel == "pro" ? "Active" : "Get Premium"}
            </Button>
          </div>
          <div className="border-1 mx-6" />
          <div className="flex w-full flex-col gap-3">
            <h1 className="w-full bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-center font-bold text-transparent">
              {" "}
              Premium Plus
            </h1>
            <ul className="flex flex-col gap-2 py-2">
              {premiumPlusFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Check className="size-4 text-green-500" />
                  <li>{feature}</li>
                </div>
              ))}
            </ul>
            <Button
              className="bg-gradient-to-r from-green-600 to-green-400 text-white hover:from-green-700 hover:to-green-300"
              onClick={() =>
                handleBuyPremium(
                  process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY!,
                )
              }
              disabled={subscriptionLevel == "pro_plus"}
            >
              {subscriptionLevel == "pro_plus" ? "Active" : "Get Premium Plus"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PremiumDialog;
