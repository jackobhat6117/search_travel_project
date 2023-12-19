import React from "react";
import DateFormatter from "../DateFormatter";

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

type WinsInfo = {
  DrawCode: string;
  Prize: string;
  PrizeType: string;
  TimeStamp: string;
  TransactionId: string;
};
const BusinessWin = ({ detailData }: { detailData: null | DetailData }) => {
  const winsInfo = detailData?.WinsInfo;
  return (
    <div>
      <div className="flex justify-around border-b-2 border-slate-600 py-3 text-green-600 font-bold">
        <p>Timestamp</p>
        <p>Won Prize</p>
        <p>Draw Category</p>
        <p>Original TRX ID</p>
        <p>Winnding Draw Code</p>
      </div>
      {winsInfo?.map((winInfo: WinsInfo,i) => (
        <div className="flex justify-around py-3 text-slate-600" key = {i}>
          <p className="w-20">
            <DateFormatter dateFormat={winInfo.TimeStamp} />
          </p>
          <p>{winInfo.Prize}</p>
          <p>{winInfo.PrizeType}</p>
          <p>{winInfo.TransactionId}</p>
          <p>{winInfo.DrawCode}</p>
        </div>
      ))}
    </div>
  );
};

export default BusinessWin;
