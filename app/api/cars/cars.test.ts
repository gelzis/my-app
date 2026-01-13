import { GET } from "./route";

jest.mock("@/app/data/cars.json", () => ({
  cars: [
    {
      id: "atlas-2",
      name: "Atlas SUV",
      category: "SUV",
      seats: 7,
      transmission: "Automatic",
      pricePerDay: 86,
      location: "Austin",
      rating: 4.9,
      features: ["All-wheel drive", "3rd row", "Heated seats"],
      available: true,
    },
    {
      id: "metro-6",
      name: "Metro Coupe",
      category: "Sport",
      seats: 2,
      transmission: "Automatic",
      pricePerDay: 128,
      location: "Miami",
      rating: 4.6,
      features: ["Convertible", "Premium audio", "Sport mode"],
      available: true,
    },
    {
      id: "sprint-3",
      name: "Sprint Hatch",
      category: "Economy",
      seats: 4,
      transmission: "Manual",
      pricePerDay: 39,
      location: "Portland",
      rating: 4.3,
      features: ["Great mileage", "USB-A", "Compact parking"],
      available: false,
    },
  ],
}));

test("GET /api/cars returns the 7-seat SUV when requested", async () => {
  const response = await GET(
    new Request("http://localhost:3000/api/cars?available=true&minSeats=7")
  );
  const payload = (await response.json()) as {
    cars: Array<{ name: string; seats: number; available: boolean }>;
  };

  expect(payload.cars.length).toBe(1);
  expect(payload.cars[0]?.name).toBe("Atlas SUV");
  expect(payload.cars[0]?.seats).toBe(7);
  expect(payload.cars[0]?.available).toBe(true);
});

test("GET /api/cars returns the full list without filters", async () => {
  const response = await GET(new Request("http://localhost:3000/api/cars"));
  const payload = (await response.json()) as {
    cars: Array<{ id: string }>;
  };

  expect(payload.cars).toHaveLength(3);
});
