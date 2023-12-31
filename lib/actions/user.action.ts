"use server";

import User from "../models/user.model";
import { dbConnect } from "../dbConnect";
import { revalidatePath } from "next/cache";
import Community from "../models/community.model";
import Post from "../models/post.model";
import { FilterQuery, SortOrder } from "mongoose";

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

export async function getUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    dbConnect();
    const skip = (pageNumber - 1) * pageSize;
    const regex = new RegExp(searchString, "i");
    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    };
    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }
    const sort = { createdAt: sortBy };
    const usersData = User.find(query).sort(sort).skip(skip).limit(pageSize);
    const totalUsersCount = User.countDocuments(query);
    const users = await usersData.exec();
    const isNext = (await totalUsersCount) > skip + users.length;
    return { users, isNext };
  } catch (error) {
    console.log(error);
  }
}

export async function getUserActivity(userId: string) {
  try {
    dbConnect();
    const userPosts = await Post.find({ author: userId });
    const childThreadIds = userPosts.reduce((acc, userPost) => {
      return acc.concat(userPost.children);
    }, []);
    const replies = await Post.find({
      _id: { $in: childThreadIds },
    }).populate({
      path: "author",
      model: User,
      select: "name image _id",
    });
    return replies;
  } catch (error) {
    console.log(error);
  }
}
