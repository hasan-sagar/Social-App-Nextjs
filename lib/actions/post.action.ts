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

export async function getSinglePost(id: string) {
  try {
    dbConnect();
    const post = await Post.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name parentId image",
          },
          {
            path: "children",
            model: Post,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image",
            },
          },
        ],
      })
      .exec();
    return post;
  } catch (error) {
    console.log(error);
  }
}

export async function addCommentPost(
  postId: string,
  comment: string,
  userId: string,
  path: string
) {
  try {
    dbConnect();
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post Not Found");
    }
    const commentPost = new Post({
      text: comment,
      author: userId,
      parentId: postId,
    });
    const saveComment = await commentPost.save();
    post.children.push(saveComment._id);
    await post.save();
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
