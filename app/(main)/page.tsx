import PostCard from "@/components/cards/PostCard";
import { getPost } from "@/lib/actions/post.action";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const data = await getPost();

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  return (
    <>
      <h1>Home</h1>
      <section className="mt-10 flex flex-col gap-10">
        {data.posts.length === 0 ? (
          <p>No Posts Found</p>
        ) : (
          <>
            {data.posts.map((post: any) => (
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
            ))}
          </>
        )}
      </section>
    </>
  );
}
