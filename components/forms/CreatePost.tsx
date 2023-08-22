"use client";
import React from "react";
import { Button } from "../ui/button";
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
import * as z from "zod";
import { PostValidation } from "@/lib/validations/socialpost";
import { Textarea } from "../ui/textarea";
import { createPost } from "@/lib/actions/post.action";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  userId: string;
}

function CreatePost({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      post: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof PostValidation>) => {
    await createPost({
      text: values.post,
      author: userId,
      communityId: null,
      path: pathname,
    });
    router.push("/");
  };

  return (
    <>
      <Form {...form}>
        <form
          className="mt-10 flex flex-col justify-start gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="post"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="text-base">Content</FormLabel>
                <FormControl>
                  <Textarea
                    rows={15}
                    className="account-form_input no-focus"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-[#8338ec]">
            Post to Social
          </Button>
        </form>
      </Form>
    </>
  );
}

export default CreatePost;
