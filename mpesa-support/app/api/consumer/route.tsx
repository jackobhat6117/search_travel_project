import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import * as https from 'https';


type ResponseData = {
    data: any;
    status: number;
}
export async function POST(request: NextRequest) {

    const {searchParams} = new URL(request.url)

    const agent = new https.Agent({
        rejectUnauthorized: false
    })


    try {
        const val = new URL(request.url)
        const q = val.searchParams.get("q");

        console.log(q);

        const bodyData = await request.json();

        const data = await axios.post(
          `${process.env.API_URL}/consumer/search`,
          bodyData,
          {
            params: { q },
            headers: {
              Authorization: request.headers.get("Authorization"),
            },
            httpsAgent: agent,
          }
        );

   console.log('data', data)

        return NextResponse.json({
            data: data.data,
            status: data.status
        } as ResponseData )
    } catch(e) {
        console.log('hello',e);
        return NextResponse.json({
            data: [],
            status: 500.
        } as ResponseData)
    }
}