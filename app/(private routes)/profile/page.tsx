import css from "./ProfilePage.module.css";
import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import { checkMeServer } from "@/lib/api/serverApi";

export const metadata: Metadata = {
  title: "NoteHub User Profile",
  description: "NoteHub - Easy and efficient note-taking app",
  openGraph: {
    title: "NoteHub User Profile",
    description: "NoteHub - Easy and efficient note-taking app",
    url: "https://08-zustand-self.vercel.app/profile",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Note Hub Open Graph Image",
      },
    ],
  },
};

export default async function ProfilePage() {
  const user = await checkMeServer();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          ></Image>
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
