"use client";

import { signIn, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import {useRouter} from 'next/navigation';


const LoginPage = () => {


const router = useRouter();
const session = useSession();
const [error, SetError] = useState("");
const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (session?.status === "authenticated") {

              router.replace("/home");
 
          
        }
    }, [session])
    

const isValidEmail = (email: string) => {
  const emailRegesx =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegesx.test(email);
};

const handleSubmit = async (e: any) => {
  e.preventDefault();
  const username = e.target[0].value;
  const password = e.target[1].value;

  if (!isValidEmail(username)) {
    SetError("Email is invalid");
    return;
  }
  if (!password || password.length < 8) {
    SetError("Password is invalid");
    return;
  }

  const res = await signIn("credentials", {
    username: username,
    password: password,
    redirect: false,
  });

  if (res?.error) {
    SetError("Athentication Failed");
    return;
  }
  if (res?.url) {
    loading ? "loading..." : router.push("/home");
    setLoading(false)
  }
  else {
    SetError("Authentication Failed")
  }
};

  return (
    <div className="flex justify-center mt-32 flex-col items-center">
      <div className="">
        <div className=" py-6 bg-green-600 flex items-center flex-col justify-center text-white rounded-tr-lg rounded-tl-lg">
          <h1 className="font-bold text-5xl my-4 font-serif">M-PESA SUPPORT</h1>
          <p className='font-bold'>TEREK BE M-PESA PROMO</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="shadow-2xl shadow-black h-96  flex items-center  flex-col"
        >
          <div className="px-40 py-32">
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:border-blue-400 focus:text-black bg-slate-100"
              placeholder="Email"
              required
            />
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:auto bg-slate-100"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Log In
            </button>
            <div className='flex items-center justify-center mt-4'>
              <p className="text-red-600 text-[16px] ">{error && error}</p>
            </div>
          </div>
        </form>
        <div className="   bg-green-600 flex items-center flex-col justify-center text-white rounded-br-lg rounded-bl-lg">
          <img className="w-72" src="logo/logo-lg.png" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;