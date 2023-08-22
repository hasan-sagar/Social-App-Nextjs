"use server";
import { revalidatePath } from "next/cache";
import Post from "../models/post.model";
import User from "../models/user.model";
import { dbConnect } from "../dbConnect";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}
export async function createPost({ text, author, communityId, path }: Params) {
  try {
    dbConnect();
    const createPost = await Post.create({ text, author, ccommunity: null });

    await User.findByIdAndUpdate(author, {
      $push: { posts: createPost._id },
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath(path);
}
