import { Filters } from "./types";

type FiltersPanelProps = {
  locations: string[];
  categories: string[];
  filters: Filters;
  onChange: (filters: Filters) => void;
};

export const FiltersPanel = ({
  locations,
  categories,
  filters,
  onChange,
}: FiltersPanelProps) => {
  return (
    <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="flex flex-wrap gap-4">
        <label className="flex min-w-[180px] flex-1 flex-col gap-2 text-sm text-slate-300">
          Location
          <select
            className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-2 text-slate-100"
            value={filters.location}
            onChange={(event) =>
              onChange({
                ...filters,
                location: event.target.value,
              })
            }
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </label>
        <label className="flex min-w-[180px] flex-1 flex-col gap-2 text-sm text-slate-300">
          Category
          <select
            className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-2 text-slate-100"
            value={filters.category}
            onChange={(event) =>
              onChange({
                ...filters,
                category: event.target.value,
              })
            }
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label className="flex min-w-[150px] flex-1 flex-col gap-2 text-sm text-slate-300">
          Seats
          <select
            className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-2 text-slate-100"
            value={filters.seats}
            onChange={(event) =>
              onChange({
                ...filters,
                seats: event.target.value,
              })
            }
          >
            {["Any", "2", "4", "5", "7"].map((seats) => (
              <option key={seats} value={seats}>
                {seats === "Any" ? "Any seats" : `at least ${seats} seats`}
              </option>
            ))}
          </select>
        </label>
        <label className="flex min-w-[160px] flex-1 items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300">
          <input
            className="h-4 w-4 accent-amber-300"
            type="checkbox"
            checked={filters.onlyAvailable}
            onChange={(event) =>
              onChange({
                ...filters,
                onlyAvailable: event.target.checked,
              })
            }
          />
          Only available cars
        </label>
      </div>
    </section>
  );
};
