"use server";

import User from "../models/user.model";
import { dbConnect } from "../dbConnect";
import { revalidatePath } from "next/cache";
import Community from "../models/community.model";
import Post from "../models/post.model";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function fetchUser(userId: string) {
  try {
    dbConnect();

    return await User.findOne({ id: userId }).populate({
      path: "communities",
      model: Community,
    });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function updateUserInfo({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: Params): Promise<any> {
  dbConnect();
  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      {
        upsert: true,
      }
    );
    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function getUsersPosts(userId: string) {
  try {
    dbConnect();
    const posts = await User.findOne({ id: userId }).populate({
      path: "posts",
      model: Post,
      populate: {
        path: "children",
        model: Post,
        populate: {
          path: "author",
          model: User,
          select: "name image id",
        },
      },
    });
    return posts;
  } catch (error) {
    console.log(error);
  }
}
