import { NextResponse } from "next/server";
import { getCars } from "./data";

const cars = getCars();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const availableOnly = searchParams.get("available") === "true";
  const minSeats = Number(searchParams.get("minSeats") ?? "0");
  const location = searchParams.get("location");
  const category = searchParams.get("category");

  const filtered = cars.filter((car) => {
    if (availableOnly && !car.available) {
      return false;
    }
    if (!Number.isNaN(minSeats) && minSeats > 0 && car.seats <= minSeats) {
      return false;
    }
    if (location && location !== "All" && car.location !== location) {
      return false;
    }
    if (category && category !== "All" && car.category !== category) {
      return false;
    }
    return true;
  });

  NextResponse.json({ cars: filtered });
}
