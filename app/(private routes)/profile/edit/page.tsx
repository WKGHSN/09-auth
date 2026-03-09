"use client";

import css from "./EditProfilePage.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { checkMe, updateMe } from "@/lib/api/clientApi";

export default function ProfileEditPage() {
  const [userName, setUserName] = useState("user_name");
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    checkMe().then((user) => {
      setUserName(user.username ?? user.email);
    });
  }, []);

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUserName(event.target.value);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const newName = await updateMe({ username: userName });
    setAuth(newName);
    router.push("/profile");
  }

  function handleCancel() {
    router.push("/profile");
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={
            user?.avatar ||
            "https://ac.goit.global/fullstack/react/default-avatar.jpg"
          }
          alt={"User Avatar"}
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username: {user?.username}</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={userName}
              onChange={handleNameChange}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
