"use client";
import { accessTokenStorage } from "@/lib/token-storage";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const isLoggedIn = accessTokenStorage.get();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push("/users");
    }
  }, [router]);
  if (isLoggedIn) return <div>{children}</div>;
  return null;
}
