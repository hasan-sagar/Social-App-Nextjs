"use client";
import { CommentValidation } from "@/lib/validations/socialpost";
import React from "react";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { addCommentPost } from "@/lib/actions/post.action";
import { usePathname } from "next/navigation";

interface Props {
  postId: string;
  currentUserImg: string;
  currentUserId: string;
}

function Comment({ postId, currentUserId, currentUserImg }: Props) {
  const pathName = usePathname();
  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      post: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentPost(
      postId,
      values.post,
      JSON.parse(currentUserId),
      pathName
    );
    form.reset();
  };

  return (
    <Form {...form}>
      <form className="comment-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-3">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt=""
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  {...field}
                  placeholder="Comment..."
                  className="no-focus text-light-1 outline-none"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="comment-form_btn ">
          Comment
        </Button>
      </form>
    </Form>
  );
}

export default Comment;
