"use client";
import { Button } from "@/components/ui/button";
import { usePremiumStore } from "@/hooks/usePremiumDialog";
import React from "react";

function GetSubscribtionButton() {
  const { setIsOpen } = usePremiumStore();
  return (
    <Button onClick={() => setIsOpen(true)}>Get Premium subscription</Button>
  );
}

export default GetSubscribtionButton;
