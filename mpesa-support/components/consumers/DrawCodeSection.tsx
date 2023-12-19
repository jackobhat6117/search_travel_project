import React from 'react'
import DateFormatter from '../DateFormatter';
import moment from 'moment';
import { format } from "date-fns";
import { useStoreDrawCode } from '../store';

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
type DrawCode = {
    Amount: number
    TimeStamp: string
    Transaction: string
    TransactionDetail: string
    PartyA: []
    TransactionId: string

}
const DrawCode = ({detailData}: {detailData: null | DetailData}) => {

  const handleClick = (index: number) => {

    alert(index)
  }

    console.log('drawCode',detailData?.DrawCodesInfo)


    const drawcodes:DrawCode | any = detailData?.DrawCodesInfo;

    const {setDrawCode} = useStoreDrawCode()

    //  React.useEffect(() => {
    //    setDrawCode(drawcodes);     
    //  }, [drawcodes]);

  return (
    <div>
      <div className="flex justify-around border-b-2 border-slate-600 py-3 text-green-600 font-bold">
        <p>Timestamp</p>
        <p>TRX ID</p>
        <p>Transaction</p>
        <p>Transaction Details</p>
        <p>Amount</p>
        <p>Draw Codes</p>
        <p>Action</p>
      </div>
      {drawcodes?.map((drawcode: DrawCode, i:any) => (
        <div className="flex justify-around my-3 border-r-2 text-slate-600" key = {i}>
          <p className="w-20">
            <DateFormatter dateFormat={drawcode.TimeStamp} />
          </p>
          <p>{drawcode.TransactionId}</p>
          <p>{drawcode.Transaction}</p>
          <p>{drawcode.TransactionDetail}</p>
          <p>{drawcode.Amount}</p>
          <p>
            {drawcode.PartyA?.map((partya,i) => (
              <div className="flex" key = {i}>{partya}</div>
            ))}
          </p>
          <button className='bg-green-600  p-2 h-14 text-white rounded-xl w-24' onClick={() => handleClick(i)}>Resend Code</button>
        </div>
      ))}
    </div>
  );
}

export default DrawCode;