"use client";
import React from "react";
import { sidebarLinks } from "@/constants/index";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import Logouticon from "/public/logout-icon.svg";

function LeftSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-5 px-5">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${isActive && "bg-[#dee2e6]"}`}
            >
              <Image src={link.imgURL} alt="" width={25} height={25} />
              <p className="max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 px-5">
        <SignedIn>
          <SignOutButton
            signOutCallback={() => {
              router.push("/sign-in");
            }}
          >
            <div className="flex cursor-pointer">
              <Image src={Logouticon} alt="sss" width={25} height={25} />
              <p className="max-lg:hidden p-4 gap-4">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
}

export default LeftSidebar;
