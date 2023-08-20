import AccountForm from "@/components/forms/AccountForm";
import React from "react";
import { currentUser } from "@clerk/nextjs";

async function UserInfo() {
  const user = await currentUser();
  console.log(user);

  const userInfo = {};

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: (userInfo?.name || user?.firstName) ?? "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="text-[#8338ec] text-2xl font-medium">User Information</h1>
      <p>Complete Your Profile Now To Continue</p>
      <section className="mt-10 bg-[#FFFFFF]">
        <AccountForm user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}

export default UserInfo;
