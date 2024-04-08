import AccountPhotoPost from "@/components/Account/account-photo-post";
import { Metadata } from "next";

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Post Photo'
}

export default async function PostPage() {
  return (
    <AccountPhotoPost/>
  );
}
