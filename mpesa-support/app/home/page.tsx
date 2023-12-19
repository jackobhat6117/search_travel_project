"use client";
import SearchBusinessDetail from '@/components/SearchBusinessDetail';
import SearchConsumer from '@/components/SearchConsumerDetails';
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'


const HomePage = () => {

   const [selectedSection, setSelectedSection] = useState("Customers");

  return (
    <div className="flex">
      <div className="flex h-auto">
        <div className="bg-green-600 w-60 ">
          <div className="w-full ">
            <h1 className="font-bold p-4 flex items-center justify-center text-white">
              M-PESA SUPPORT
            </h1>

            <p className='text-white px-3 font-bold'>TEREK BE M-PESA PROMO</p>
          </div>
          <div className="flex flex-col my-10">
            <button
              className={`text-2xl font-mono font-bold${
                selectedSection === "Customers"
                  ? " text-white hover:text-zinc-200 transition-colors border-b my-5"
                  : " text-zinc-900  border-b my-5"
              }`}
              onClick={() => setSelectedSection("Customers")}
            >
              CUSTOMERS
            </button>

            <button
              className={`text-2xl font-mono font-bold${
                selectedSection === "Business"
                  ? "  text-white hover:text-zinc-200 transition-colors border-b my-5"
                  : " text-zinc-900 border-b my-5"
              }`}
              onClick={() => setSelectedSection("Business")}
            >
              BUSINESS
            </button>
          </div>
        </div>
      </div>
      <div className="w-full">
        {selectedSection === "Customers" && <SearchConsumer />}
        {selectedSection === "Business" && <SearchBusinessDetail />}    
      </div>
    </div>
  );
}

export default HomePage