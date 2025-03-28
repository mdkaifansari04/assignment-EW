"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { accessTokenStorage } from "@/lib/token-storage";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (!accessTokenStorage.get()) {
      router.push("/login");
    } else {
      router.push("/users");
    }
  }, [router]);

  return null;
}
