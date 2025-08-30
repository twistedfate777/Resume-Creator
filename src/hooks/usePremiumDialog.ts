import { getCurrentUserId } from "@/app/actions/auth.actions";
import {
  getUserSubscriptionLevel,
  subscriptionLevel,
} from "@/lib/subscription";
import { useAuth } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { create } from "zustand";

interface PremiumDialogState {
  userId: null | string;
  fetchUserId: () => Promise<void>;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  subscriptionLevel: null | subscriptionLevel;
  fetchSubscribtionLevel: (userId: string) => Promise<void>;
}

export const usePremiumStore = create<PremiumDialogState>((set, get) => ({
  userId: null,
  fetchUserId: async () => {
    const userId = await getCurrentUserId();
    set({ userId });
  },
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
  subscriptionLevel: null,
  fetchSubscribtionLevel: async () => {
    const userId = await getCurrentUserId();
    if (!userId) return;
    const subscription = await getUserSubscriptionLevel(userId);
    set({ subscriptionLevel: subscription });
  },
}));
