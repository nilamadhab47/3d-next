import { NextResponse } from "next/server";

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {

  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ message: 'John Doe' })
}

export async function POST(req: NextApiRequest, res: NextApiResponse<Data>){
    const {userText} = await req.body;
    console.log(userText, "POST response");

    return res.status(200).json({ message: userText })
}