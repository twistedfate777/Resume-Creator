"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import logo from "../assets/logo.png";
import {
  SignIn,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { CreditCard } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { dark } from "@clerk/themes";
import { usePremiumStore } from "@/hooks/usePremiumDialog";
import { Button } from "./ui/button";

function Navbar() {
  const { theme } = useTheme();
  const { user } = useUser();
  const { fetchSubscribtionLevel, subscriptionLevel } = usePremiumStore();

  useEffect(() => {
    if (user && subscriptionLevel == null) fetchSubscribtionLevel(user.id);
  }, [user]);
  return (
    <header className="shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
        <Link href="/resumes" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="Logo"
            width={35}
            height={35}
            className="rounded-full"
          />
          <span className="text-xl font-bold tracking-tight">
            AI Resume Builder
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <SignOutButton>
              <Button>Log out</Button>
            </SignOutButton>
          ) : (
            <SignInButton>
              <Button>Login</Button>
            </SignInButton>
          )}

          <UserButton
            appearance={{
              baseTheme: theme === "dark" ? dark : undefined,
              elements: {
                avatarBox: {
                  width: 35,
                  height: 35,
                },
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                label="Billing"
                labelIcon={<CreditCard className="size-4" />}
                href="/billing"
              />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
