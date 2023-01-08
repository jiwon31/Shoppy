import { UserInfo } from "firebase/auth";

export default function Avatar({
  user: { photoURL, displayName },
}: {
  user: UserInfo;
}) {
  return (
    <div className="shrink-0 flex items-center">
      <img
        className="w-8 h-8 rounded-full mr-1"
        src={photoURL!}
        alt={displayName!}
      />
      <span className="hidden text-sm md:block">{displayName}</span>
    </div>
  );
}
