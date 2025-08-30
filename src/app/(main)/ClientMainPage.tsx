"use client";
import CreateResume from "@/components/CreateResume";
import ResumeMenu from "@/components/ResumeMenu";
import React, { useEffect, useRef, useState } from "react";
import { fetchAllResume } from "../actions/resume.action";
import { usePremiumStore } from "@/hooks/usePremiumDialog";
import { useAuth, useUser } from "@clerk/nextjs";

type Resumes = Awaited<ReturnType<typeof fetchAllResume>>;

function ClientMainPage({
  resumes,
  resumesCount,
}: {
  resumes: Resumes;
  resumesCount: number;
}) {
  const { subscriptionLevel, fetchSubscribtionLevel, userId, fetchUserId } =
    usePremiumStore();

  useEffect(() => {
    const fetchSubscribtion = async () => {
      await fetchUserId();
      if (userId) await fetchSubscribtionLevel(userId);
    };
    fetchSubscribtion();
  }, [userId, fetchSubscribtionLevel, fetchUserId]);

  let canCreate = false;

  if (subscriptionLevel === "free") canCreate = resumesCount == 0;
  else if (subscriptionLevel === "pro") canCreate = resumesCount < 3;
  else if (subscriptionLevel === "pro_plus") canCreate = true;

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <CreateResume canCreate={canCreate} />
      <div className="flex items-center gap-5">
        {resumes && (
          <div>
            {resumes.map((resume, index) => (
              <ResumeMenu resume={resume} key={resume.id} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default ClientMainPage;
