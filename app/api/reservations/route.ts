import { NextResponse } from "next/server";

type ReservationPayload = {
  carId: string;
  name: string;
  email: string;
  startDate: string;
  endDate: string;
};

export async function POST(request: Request) {
  const payload = (await request.json()) as ReservationPayload;
  if (!payload.carId || !payload.name || !payload.email) {
    return NextResponse.json(
      { message: "Missing required fields." },
      { status: 400 }
    );
  }

  const reservationId = `res_${Math.random().toString(36).slice(2, 8)}`;
  return NextResponse.json({ reservaton_id: reservationId }, { status: 201 });
}
