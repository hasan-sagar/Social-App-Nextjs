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
export async function createPost({
  text,
  author,
  communityId,
  path,
}: Params): Promise<any> {
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

export async function getPost(pageNumber = 1, pageSize = 20): Promise<any> {
  try {
    dbConnect();
    const skipPost = (pageNumber - 1) * pageSize;

    const postsData = Post.find({ parentId: { $in: [null, undefined] } })
      .sort({
        createdAt: "desc",
      })
      .skip(skipPost)
      .limit(pageSize)
      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image",
        },
      });

    const totalPostsCount = await Post.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const posts = await postsData.exec();
    const nextPost = totalPostsCount > skipPost + posts.length;
    return { posts, nextPost };
  } catch (error) {
    console.log(error);
  }
}
