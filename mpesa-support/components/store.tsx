import create from 'zustand';
type CustomerInfo  = {
    customer: string
    drawCode : string
}

type DetailData = {
  RequestRefID: string
  ResponseCode: string
  ResponseDesc: string
  TransactionID: string
  ResponseParameters: [];
  AccountDetailInfo: null;
  DrawCodesInfo: [];
  WinsInfo: [];
  TransactionHistoryInfo: [];
};

type CustomerInfoState = {
     inputValue: CustomerInfo | any;
     setInputValue: (inputValue: CustomerInfo | any) => void;
}

export const useStoreCustomerInfo = create<CustomerInfoState>  ((set) => ({

     inputValue: null,
     setInputValue: (inputValue) => set({inputValue})
}))

type DetailDataState = {
     detailData : DetailData | null 
     setDetailData: (detailData: DetailData | any) => void;
}

export const useStoreDetailData = create<DetailDataState>((set) => ({
     detailData: null,
     setDetailData: (detailData) => set({detailData})
}))

type DrawCode = {
  Amount: number;
  TimeStamp: string;
  Transaction: string;
  TransactionDetail: string;
  PartyA: [];
  TransactionId: string;
};

type DrawCodeState = {
     drawCode : DrawCode[],
    setDrawCode: (drawCode : DrawCode[]) => void
}

export const useStoreDrawCode = create<DrawCodeState>((set) => ({
     drawCode: [],
     setDrawCode: (drawCode) => set({drawCode})
}))

