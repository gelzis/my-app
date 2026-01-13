import { Car } from "./types";
import { CarCard } from "./CarCard";

type CarGridProps = {
  cars: Car[];
  onReserve: (car: Car) => void;
};

export const CarGrid = ({ cars, onReserve }: CarGridProps) => {
  return (
    <section className="mt-10 grid gap-6 md:grid-cols-2">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} onReserve={onReserve} />
      ))}
    </section>
  );
};
