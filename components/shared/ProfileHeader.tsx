import Image from "next/image";
import { string } from "zod";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  img: string;
  bio: string;
}
function ProfileHeader({
  accountId,
  authUserId,
  name,
  username,
  img,
  bio,
}: Props) {
  return (
    <div className="flex w-full flex-col justify-center items-center">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={img}
              alt=""
              fill
              className="rounded-full object-cover shadow-xl"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-left font-medium">{name}</h2>
            <p>@{username}</p>
          </div>
        </div>
      </div>
      <p className="mt-6 max-w-lg text-center font-normal">"{bio}"</p>

      <div className="mt-12 h-0.5 w-full" />
    </div>
  );
}

export default ProfileHeader;
