"use client";

import css from "./SignUpPage.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { register, AuthData } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const setAuth = useAuthStore((state) => state.setAuth);

  async function handleSubmit(FormData: FormData) {
    try {
      const data = Object.fromEntries(FormData) as unknown as AuthData;
      const response = await register(data);
      if (response) {
        setAuth(response);
        router.push("/profile");
      }
    } catch {
      setError("Something went wrong");
    }
  }

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
