import React, { useState } from 'react'
import DateFormatter from '../DateFormatter';
import uuid from 'react-uuid';
import { useRouter } from 'next/navigation';

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

type TransactionHistory = {
    Amount: number
    PartyA: string
    PartyARemark: string
    PartyB: string
    PartyBRemark: string
    TimeStamp: string
    Transaction: string
    TransactionId: string
    }


const TransactionHistory = ({detailData} : {detailData: null | DetailData}) => {
   const [isOpenList, setIsOpenList] = useState<boolean[]>([]);

   const router = useRouter();

    const transactionsHistory = detailData?.TransactionHistoryInfo;

     const handleToggle = (index: number) => {
       setIsOpenList((prev) => {
         const updatedList = [...prev];
         updatedList[index] = !updatedList[index];
         return updatedList;
       });
       
     }; 
     
     const handleEyeIconClick = (transaction: TransactionHistory) => {
       // Redirect to the new page and pass data using router.push
       router.push("/consumerDetail");
     };

  return (
    <div>
      <div className="flex justify-around border-b-2 border-slate-600 py-3 text-green-600 font-bold">
        <p>Timestamp</p>
        <p>Transaction</p>
        <p>Party A</p>
        <p>TRX ID</p>
        <p>Party B</p>
        <p>Party A Remark</p>
        <p>Party B Remark</p>
        <p>Action</p>
      </div>
      {transactionsHistory?.map((transaction: TransactionHistory, index) => (
        <div className="flex justify-around p-3 text-slate-600" key = {index}>
          <p className="w-32">
            <DateFormatter dateFormat={transaction.TimeStamp} />
          </p>
          <p>{transaction.Transaction}</p>
          <p>{transaction.PartyA}</p>
          <p>{transaction.TransactionId}</p>
          <p>{transaction.PartyB}</p>
          <p>{transaction.PartyARemark}</p>
          <p>{transaction.PartyBRemark}</p>
         <button onClick={() => handleEyeIconClick(transaction)}>
            {isOpenList[index] ? (
              <img src="logo/eye-open.png" alt="Close" />
            ) : (
              <img src="logo/eye-close.png" alt="Open" />
            )}
          </button>
        </div>
      ))}
    </div>
  );
}

export default TransactionHistory