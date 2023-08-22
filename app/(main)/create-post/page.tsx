import CreatePost from "@/components/forms/CreatePost";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="text-2xl font-medium text-center">Create Post</h1>
      <CreatePost userId={userInfo._id} />
    </>
  );
}

export default page;
