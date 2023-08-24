import Image from "next/image";
import Link from "next/link";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}
function PostCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: Props) {
  return (
    <article className="flex w-full flex-col rounded-xl p-7 bg-[#FFFFFF] shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt=""
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>
            <div className="card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h5 className="cusor-pointer text-base font-medium">
                {author.name}
              </h5>
            </Link>
            <p className="mt-2">{content}</p>
            <div className="mt-5 flex flex-col gap-3">
              <div className="flex gap-3">
                <Image
                  className="cursor-pointer object-contain"
                  src="/assets/heart-light.svg"
                  alt=""
                  width={20}
                  height={20}
                />
                <Link href={`/post/${id}`}>
                  <Image
                    className="cursor-pointer object-contain"
                    src="/assets/reply.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                </Link>
                <Image
                  className="cursor-pointer object-contain"
                  src="/assets/repost.svg"
                  alt=""
                  width={20}
                  height={20}
                />
                <Image
                  className="cursor-pointer object-contain"
                  src="/assets/send.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
