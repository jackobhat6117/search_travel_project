// "use client";
// import Image from "next/image";
// import LoginPage from "./login/page";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { getSession, useSession } from "next-auth/react";
// import React from "react";

// export default function Template({children,
// }: {
//   children: React.ReactNode;
// }) {
 
//   const router = useRouter();
// const [auth,setAuth]=useState(true)
//   useEffect(() => {
//     handleAuth()
//   }, []);
//   const handleAuth =async()=>{
//     const session=await useSession();
    
//     if (session?.status === "authenticated") {
//       setAuth(true);
//     } else {
//       setTimeout(() => router.replace("/login"), 1000);
//     }
//   }
//   return (
//     <main>{auth?children:
//       <span className="loading loading-dots loading-xs"></span>}
//     </main>
//   );
// }
