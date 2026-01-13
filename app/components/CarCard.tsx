import { Car } from "./types";

type CarCardProps = {
  car: Car;
  onReserve: (car: Car) => void;
};

export const CarCard = ({ car, onReserve }: CarCardProps) => {
  return (
    <article className="group rounded-3xl border border-slate-800 bg-slate-900/80 p-6 transition hover:-translate-y-1 hover:border-amber-200">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-amber-200">
        <span>{car.category}</span>
        <span className="text-slate-400">
          {car.available ? "Available now" : "Booked"}
        </span>
      </div>
      <div className="mt-6 flex items-start justify-between gap-6">
        <div>
          <h3 className="text-2xl font-semibold text-white">{car.name}</h3>
          <p className="mt-2 text-sm text-slate-400">
            {car.location} · {car.seats} seats · {car.transmission}
          </p>
        </div>
        <div className="rounded-2xl bg-amber-300/15 px-4 py-2 text-right text-sm text-amber-200">
          <p className="text-lg font-semibold">${car.pricePerDay.toFixed(0)}</p>
          <p className="text-xs uppercase tracking-[0.2em]">Per day</p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {car.features.map((feature) => (
          <span
            key={feature}
            className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300"
          >
            {feature}
          </span>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between text-sm text-slate-300">
        <span>Rating {car.rating.toFixed(1)}</span>
        <button
          className="cursor-pointer rounded-full border border-slate-700 px-4 py-2 text-sm text-white transition group-hover:border-amber-200 group-hover:text-amber-200"
          onClick={() => onReserve(car)}
          type="button"
        >
          Reserve now
        </button>
      </div>
    </article>
  );
};
