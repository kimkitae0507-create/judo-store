import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { paymentKey, orderId, amount } = body;

    if (!paymentKey || !orderId || amount === undefined) {
      return NextResponse.json(
        { error: "paymentKey, orderId, and amount are required fields." },
        { status: 400 }
      );
    }

    const secretKey = process.env.TOSS_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { error: "TOSS_SECRET_KEY environment variable is not set." },
        { status: 500 }
      );
    }

    // Toss Payments API expects basic auth: Buffer.from(secretKey + ':').toString('base64')
    const basicToken = Buffer.from(`${secretKey}:`).toString("base64");

    const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred during payment confirmation." },
      { status: 500 }
    );
  }
}
