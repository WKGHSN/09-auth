"use client";

import css from "./SignInPage.module.css";
import { useState } from "react";
import { login, AuthData } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

export default function SignIpPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const setAuth = useAuthStore((state) => state.setAuth);

  async function handleSubmit(FormData: FormData) {
    try {
      const data = Object.fromEntries(FormData) as unknown as AuthData;
      const response = await login(data);
      if (response) {
        setAuth(response);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch {
      setError("Something went wrong");
    }
  }
  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

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
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
