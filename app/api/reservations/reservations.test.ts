import { POST } from "./route";

test("POST /api/reservations returns reservationId", async () => {
  const response = await POST(
    new Request("http://localhost:3000/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        carId: "atlas-2",
        name: "Alex Rider",
        email: "alex@example.com",
        startDate: "2024-09-01",
        endDate: "2024-09-05",
      }),
    })
  );

  expect(response.status).toBe(201);
  const payload = (await response.json()) as { reservaton_id?: string };
  expect(payload.reservaton_id?.length).toBeGreaterThan(0);
});
