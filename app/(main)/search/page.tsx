import UserCard from "@/components/cards/UserCard";
import { fetchUser, getUsers } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

async function Search() {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const users = await getUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1>Search</h1>

      <div className="mt-10 flex flex-col gap-10">
        {users?.users.length === 0 ? (
          <p>No Users</p>
        ) : (
          <>
            {users?.users.map((user) => (
              <UserCard
                key={user._id}
                id={user.id}
                name={user.name}
                username={user.username}
                img={user.image}
                type="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default Search;
