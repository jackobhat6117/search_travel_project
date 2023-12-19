"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import uuid from "react-uuid";
import * as https from "https";
import { redirect, useRouter } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";
import { useStoreDetailData } from "./store";
import DetialBusiness from "./DetailBusiness";


interface AccountDetail {
  BusinessName: string
  Region: string;
  ShortCode: string;
  TillMSISDN: string;
  TillNumber: string;
  NominatedNumber: string;
  BlacklistStatus: string;
  BlacklistReason: string
  BusinessType: string;
  Cluster: null;
  TotalWins: number;
  TotalDraws: number;
}

type DetailData = {
  RequestRefID: string;
  ResponseCode: string;
  ResponseDesc: string;
  TransactionID: string;
  ResponseParameters: [];
  AccountDetailInfo: null;
  DrawCodesInfo: [];
  WinsInfo: [];
  TransactionHistoryInfo: [];
};

const SearchBusinessDetail = () => {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [accountDetail, setAccountDetail] = useState<AccountDetail | null>(
    null
  );

  const [loading, setLoading] = useState(false);
  const [isDropdownVisisble, setIsDropdownVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOptions] = useState("customer");

  const [detailData, SetDetailData] = useState<DetailData | null>(null);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
      redirect("/login");
    } finally {
      setLoading(false);
    }
  };

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

  const additionalInfo = {
    RequestRefID: `:-${uuid()}`,
    CommandID: "AuthenticationCmdID:",
    Remark: "",
    Timestamp: new Date().toISOString(),
    SourceSystem: "PORTAL",
    Parameters: [],
    ReferenceData: [
      {
        Key: "AppVersion",
        Value: "v0.2",
      },
    ],
  };
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  const temp = session as any;

  const config = {
    params: { q: query },
    headers: {
      Authorization: `${temp?.accessToken}`,
    },
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await axios.post("/api/business", additionalInfo, config);
    const detail = await response?.data;
    const accountDetaiInfo = detail.data.AccountDetailInfo;
    if (accountDetaiInfo === null) {
      alert("Customer account not found");
    }
    setAccountDetail(detail.data.AccountDetailInfo);

    SetDetailData(detail.data);

    console.log("mydetail", typeof detail.data);
  };
  const handleDropdownChange = (event: any) => {
    setSelectedOptions(event.target.value);
  };
   console.log('accoun detail', accountDetail)
  console.log('detailData', detailData)
  return (
    <>
      <div className="flex">
        <div className="w-full shadow-lg">
          <div className="flex">
            <div className="navbar shadow-lg shadow-stone-400 py-5 flex flex-col">
              <div className="flex-none gap-48">
                <div className="flex gap-24">
                  <div className="w-56 mr-10">
                    <Link href="/">
                      <img src="./logo/step-logo.png" alt="Logo" />
                    </Link>
                  </div>

                  <div>
                    <form onSubmit={handleSubmit} className="flex gap-6">
                      <input
                        className="input input-bordered input-success w-full max-w-xs bg-white text-black"
                        type="text"
                        placeholder="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                      <select
                        className="select select-bordered bg-green-600 text-white"
                        value={selectedOption}
                        onChange={handleDropdownChange}
                      >
                        <option value="customer">TIll Number</option>
                        <option value="drawCode">Shortcode</option>
                        <option value="tillnumber">Till Phone Number</option>
                        <option value="tillnumber">Draw Code</option>
                      </select>
                      <div className=" text-white">
                        <button
                          className="btn btn-success text-white rounded-lg w-28 hover:bg-green-700"
                          type="submit"
                        >
                          Search
                          <span className="text-lg">
                            <IoSearchOutline />
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-30">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src="./logo/icons-user.png"
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-md dropdown-content bg-green-600 rounded-box w-52"
                  >
                    <li>
                      <a className="justify-between w-full">
                        <p className="text-white">{session?.user?.email}</p>
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={handleSignOut}
                        disabled={loading || !session}
                        className="text-white hover:underline"
                      >
                        {loading ? "Signing Out..." : "Logout"}{" "}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between my-10 mx-16">
            <div className="w-96">
              <div className="mb-7">
                <h1 className="text-black mb-2 font-semibold">
                  Business Name:
                </h1>
                <p className="border-2 h-12 p-3 text-green-600 font-bold rounded-md border-slate-400">
                  {accountDetail?.BusinessName}
                </p>
              </div>
              <div className="mb-7">
                <h1 className="text-black mb-2 font-semibold">
                  Business Type:
                </h1>
                <p className="border-2 h-12 p-3 text-green-600 font-bold round-md border-slate-400">
                  {accountDetail?.BusinessType}
                </p>
              </div>
              <div className="mb-7">
                <h1 className="text-black mb-2 font-semibold">Region:</h1>
                <p className="border-2 h-12 p-3 text-green-600 font-bold round-md border-slate-400">
                  {accountDetail?.Region}
                </p>
              </div>

              <div className="mb-7">
                <h1 className="text-black mb-2 font-semibold">
                  BlackList Status:
                </h1>
                <p className="border-2 h-12 p-3 text-green-600 font-bold rounded-md border-slate-400">
                  {accountDetail?.BlacklistStatus}
                </p>
              </div>

              <div className="mb-7 ">
                <h1 className="text-black mb-2 font-semibold">
                  Total Cusomer Draw Codes:
                </h1>
                <p className="border-2 h-12 p-3 text-green-600 fong-bold rounded-md border-slate-400">
                  {accountDetail?.TotalDraws}
                </p>
              </div>
              <div className="mb-7">
                <h1 className="text-black mb-2 font-semibold">Till Number:</h1>
                <p className="border-2 h-12 p-3 text-green-600 font-bold round-md border-slate-400">
                  {accountDetail?.TillNumber}
                </p>
              </div>
            </div>

            <div className="w-96">
              <div className="mb-7">
                <h1 className="text-black mb-2 font-semibold">ShortCode:</h1>
                <p className="border-2 h-12 p-3 text-green-600 font-bold rounded-md border-slate-400">
                  {accountDetail?.ShortCode}
                </p>
              </div>
              <div className="mb-7">
                <h1 className="text-black mb-2 font-semibold">
                  Nominated Number:
                </h1>
                <p className="border-2 h-12 p-3 text-green-600 font-bold rounded-md border-slate-400">
                  {accountDetail?.NominatedNumber}
                </p>
              </div>
              <div className="mb-7">
                <h1 className="text-black mb-2 font-semibold">Cluster:</h1>
                <p className="border-2 h-12 p-3 text-green-600 font-bold rounded-md border-slate-400">
                  {accountDetail?.Cluster}
                </p>
              </div>
              <div className="mb-7">
                <h1 className="text-black mb-2 font-semibold">
                  BlackList Reason:
                </h1>
                <p className="border-2 h-12 p-3 text-green-600 font-bold rounded-md border-slate-400">
                  {accountDetail?.BlacklistReason}
                </p>
              </div>

              <div className="mb-7">
                <h1 className="text-black mb-2 font-semibold">
                  Total No of Wins:
                </h1>
                <p className="border-2 h-12 p-3 text-green-600 font-bold rounded-md border-slate-400">
                  {accountDetail?.TotalWins}
                </p>
              </div>

              <div className="mb-7">
                <h1 className="text-black mb-2 font-semibold">
                 Till MSISDN:
                </h1>
                <p className="border-2 h-12 p-3 text-green-600 font-bold rounded-md border-slate-400">
                  {accountDetail?.TillMSISDN}
                </p>
              </div>
            </div>
          </div>
          <div>
            <DetialBusiness detailData={detailData}/>  
          </div>
        </div>
      </div>
    </>
  );
};
export default SearchBusinessDetail;
