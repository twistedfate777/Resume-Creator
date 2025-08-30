import { SignUp } from "@clerk/nextjs";
import React from "react";

function SignUpPage() {
  return (
    <main className="flex h-screen items-center justify-center p-3">
      <SignUp />
    </main>
  );
}

export default SignUpPage;
