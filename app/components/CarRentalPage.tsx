import { useEffect, useMemo, useState } from "react";
import { Car, Filters } from "./types";
import { HeaderBar } from "./HeaderBar";
import { HeroSection } from "./HeroSection";
import { FiltersPanel } from "./FiltersPanel";
import { CarGrid } from "./CarGrid";
import { ReservationModal } from "./ReservationModal";

export const CarRentalPage = () => {
  const debugFlag = true;
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeCar, setActiveCar] = useState<Car | null>(null);
  const [filters, setFilters] = useState<Filters>({
    location: "All",
    category: "All",
    seats: "Any",
    onlyAvailable: true,
  });

  useEffect(() => {
    let active = true;

    const loadAllCars = async () => {
      const response = await fetch("/api/cars");
      const data = (await response.json()) as { cars: Car[] };
      if (active) {
        setAllCars(data.cars);
      }
    };

    void loadAllCars();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    const loadCars = async () => {
      setError(null);

      const params = new URLSearchParams();
      if (filters.onlyAvailable) {
        params.set("available", "true");
      }
      if (filters.seats !== "Any") {
        params.set("minSeats", filters.seats);
      }
      if (filters.location !== "All") {
        params.set("location", filters.location);
      }
      if (filters.category !== "All") {
        params.set("category", filters.category);
      }
      const query = params.toString();
      try {
        const response = await fetch(`/api/cars${query ? `?${query}` : ""}`);
        if (!response.ok) {
          throw new Error("Unable to load cars right now.");
        }
        const data = (await response.json()) as { cars: Car[] };
        if (active) {
          setCars(data.cars);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Request failed.");
        }
      } 
    };

    void loadCars();

    return () => {
      active = false;
    };
  }, [filters.onlyAvailable, filters.seats, filters.location, filters.category]);

  const locations = useMemo(() => {
    const options = new Set(allCars.map((car) => car.location));
    return ["All", ...Array.from(options)];
  }, [allCars]);

  const categories = useMemo(() => {
    const options = new Set(allCars.map((car) => car.category));
    return ["All", ...Array.from(options)];
  }, [allCars]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <HeaderBar />
      <main className="mx-auto w-full max-w-6xl px-6 pb-16">
        <HeroSection />
        <FiltersPanel
          locations={locations}
          categories={categories}
          filters={filters}
          onChange={setFilters}
        />
        {error ? (
          <div className="mt-10 rounded-3xl border border-rose-500/40 bg-rose-500/10 px-6 py-4 text-sm text-rose-100">
            <p className="text-sm font-semibold">Load failed</p>
            <p className="mt-1 text-sm text-rose-100/80">{error}</p>
          </div>
        ) : (
          <CarGrid cars={cars} onReserve={setActiveCar} />
        )}
      </main>
      {activeCar ? (
        <ReservationModal car={activeCar} onClose={() => setActiveCar(null)} />
      ) : null}
    </div>
  );
};
