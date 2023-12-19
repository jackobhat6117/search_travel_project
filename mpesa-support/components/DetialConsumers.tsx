
import Link from 'next/link';

import React, { useState } from 'react';
import DrawCodeSection from './consumers/DrawCodeSection';
import CustomerWin from './consumers/CustomerWinSection';
import TransactionHistory from './consumers/TransactionHistorySection';


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

const DetialConsumer = ({detailData} : {detailData: null | DetailData }) => {
const [selectedSection, setSelectedSection] = useState('drawCode');

console.log('mythisdetail', detailData)

  return (
    <div className='mb-12'>
      <div className="border-2 border-slate-400 bg-slate-100 py-5 ">
        <nav className="flex justify-around ">
          <button
            className={`text-2xl font-mono font-bold ${
              selectedSection === "drawCode"
                ? "text-green-600 border-b border-green-600  hover:text-green-700 transition-colors"
                : "text-zinc-600"
            } `}
            onClick={() => setSelectedSection("drawCode")}
          >
            Draw Code
          </button>
          <button
            className={`text-2xl font-mono font-bold ${
              selectedSection === "customerWins"
                ? "text-green-600 border-b border-green-600 border-5 hover:text-green-700 transition-colors"
                : "text-zinc-600"
            }`}
            onClick={() => setSelectedSection("customerWins")}
          >
            Customer Wins
          </button>
          <button
            className={`text-2xl font-mono font-bold ${
              selectedSection === "transactionHistory"
                ? "text-green-600 border-b border-green-600 border-5 hover:text-green-700 transition-colors"
                : "text-zinc-600"
            }`}
            onClick={() => setSelectedSection("transactionHistory")}
          >
            Transaction History
          </button>
        </nav>
      </div>
      <div>
        {selectedSection === "drawCode" && (
          <DrawCodeSection detailData={detailData} />
        )}
        {selectedSection === "customerWins" && (
          <CustomerWin detailData={detailData} />
        )}
        {selectedSection === "transactionHistory" && (
          <TransactionHistory detailData={detailData} />
        )}
      </div>
    </div>
  );
};

export default DetialConsumer;




