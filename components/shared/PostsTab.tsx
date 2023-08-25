import { getUsersPosts } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import React from "react";
import PostCard from "../cards/PostCard";
interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

async function PostsTab({ currentUserId, accountId, accountType }: Props) {
  let data = await getUsersPosts(accountId);
  console.log(data);
  if (!data) {
    return redirect("/");
  }

  return (
    <section className="mt-9 flex flex-col gap-5">
      {data.posts.map((post: any) => (
        <PostCard
          key={post._id}
          id={post._id}
          currentUserId={currentUserId}
          parentId={post.parentId}
          content={post.text}
          author={
            accountType === "User"
              ? { name: data.name, image: data.image, id: data.id }
              : {
                  name: post.author.name,
                  image: post.author.image,
                  id: post.author.id,
                }
          }
          community={
            accountType === "Community"
              ? { name: data.name, id: data.id, image: data.image }
              : post.community
          }
          createdAt={post.createdAt}
          comments={post.children}
        />
      ))}
    </section>
  );
}

export default PostsTab;
