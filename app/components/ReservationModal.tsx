import { useState } from "react";
import type { Car } from "@/app/shared/types";

type ReservationModalProps = {
  car: Car;
  onClose: () => void;
};

export const ReservationModal = ({ car, onClose }: ReservationModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const submitReservation = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId: car.id,
          name,
          email,
          startDate,
          endDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to reserve this car right now.");
      }

      const data = (await response.json()) as { reservationId: string };
      setConfirmation(`Reservation confirmed: ${data.reservationId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-6">
      <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-6 text-slate-100 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-200">
              Reserve
            </p>
            <h3 className="mt-2 text-2xl font-semibold">{car.name}</h3>
            <p className="mt-1 text-sm text-slate-400">
              {car.location} · {car.seats} seats · {car.transmission}
            </p>
          </div>
          <button
            className="cursor-pointer rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={submitReservation}>
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            Full name
            <input
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-2 text-slate-100"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Alex Rider"
              required
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            Email
            <input
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-2 text-slate-100"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="alex@email.com"
              type="email"
              required
            />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-slate-300">
              Start date
              <input
                className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-2 text-slate-100"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                type="date"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-300">
              End date
              <input
                className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-2 text-slate-100"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                type="date"
                required
              />
            </label>
          </div>

          {error ? (
            <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
              {error}
            </div>
          ) : null}
          {confirmation ? (
            <div className="rounded-2xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
              {confirmation}
            </div>
          ) : null}

          <button
            className="w-full rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-slate-900 disabled:opacity-60"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Reserving..." : "Confirm reservation"}
          </button>
        </form>
      </div>
    </div>
  );
};
