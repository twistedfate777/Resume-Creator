"use client";
import { createCustomerPortalSession } from "@/app/actions/stripe.actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/dist/server/api-utils";
import React, { useState } from "react";

function ManageSubscriptionButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const url = await createCustomerPortalSession();
      if (!url) return;
      window.location.href = `${url}`;
    } catch (error) {
      console.log("Error in handlecreateCustomerPortalSession", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button onClick={handleClick} disabled={isLoading}>
      ManageSubscriptionButton
    </Button>
  );
}

export default ManageSubscriptionButton;
