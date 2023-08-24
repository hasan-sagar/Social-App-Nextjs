import PostCard from "@/components/cards/PostCard";
import Comment from "@/components/forms/Comment";
import { getSinglePost } from "@/lib/actions/post.action";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

async function page({ params }: { params: { id: string } }) {
  if (!params) return null;
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const post = await getSinglePost(params.id);

  return (
    <section className="relative">
      <div>
        <PostCard
          key={post.id}
          id={post._id}
          currentUserId={user.id}
          parentId={post.parentId}
          content={post.text}
          author={post.author}
          community={post.community}
          createdAt={post.createdAt}
          comments={post.children}
        />
      </div>
      <div className="mt-5">
        <Comment
          postId={post._id}
          currentUserImg={user.imageUrl}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>
      <div className="mt-5">
        {post.children.map((item: any) => (
          <PostCard
            key={item._id}
            id={item._id}
            currentUserId={user.id}
            parentId={item.parentId}
            content={item.text}
            author={item.author}
            community={item.community}
            createdAt={item.createdAt}
            comments={item.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
}

export default page;
