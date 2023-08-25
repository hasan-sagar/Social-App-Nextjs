import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Topbar() {
  const checkUserLoggedIn = true;
  return (
    <nav className="topbar">
      <Link
        href="/"
        className="text-2xl max-xs:hidden font-semibold text-[#8338ec] py-2 px-4"
      >
        Social Site
      </Link>
      {/* Logout button */}
      <div className="flex items-center gap-1">
        <div className="block md:hidden ">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout-icon.svg"
                  alt=""
                  width={25}
                  height={25}
                />
                <Image
                  src="/assets/friends-icon.svg"
                  alt=""
                  width={25}
                  height={25}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher
          appearance={{
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
      </div>
    </nav>
  );
}

export default Topbar;
