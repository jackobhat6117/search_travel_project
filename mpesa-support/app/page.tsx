"use client";
import Image from "next/image";
import Page from "./home/page";

import Login from "./login/page";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";


export default function Home() {
  const router = useRouter();
  const [error, setError] = useState("");
  const session = useSession();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.replace("/home");
    } else {
      
          router.replace("/login");
    }
  }, [session, router]);
  return (
    <main>
      <div className="flex justify-center items-center mt-80">
        <span className="loading loading-dots loading-lg bg-green-600"></span>
      </div>
    </main>
  );
}


