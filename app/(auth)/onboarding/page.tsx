import AccountForm from "@/components/forms/AccountForm";
import React from "react";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";

async function OnBoarding() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };
  // const user = await currentUser();

  // const userInfo = {};

  // const userData = {
  //   id: user?.id,
  //   objectId: userInfo?._id,
  //   username: userInfo?.username || user?.username,
  //   name: (userInfo?.name || user?.firstName) ?? "",
  //   bio: userInfo?.bio || "",
  //   image: userInfo?.image || user?.imageUrl,
  // };

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="text-2xl font-semibold mb-2 text-center">
        User Information
      </h1>
      <p className="text-base text-center">
        Complete Your Profile Now To Continue
      </p>
      <section className="mt-10 bg-[#FFFFFF]">
        <AccountForm user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}

export default OnBoarding;
