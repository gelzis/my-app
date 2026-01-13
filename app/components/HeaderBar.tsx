export const HeaderBar = () => {
  return (
    <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-amber-300 via-orange-400 to-rose-500" />
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-amber-200">
            CityDrive
          </p>
          <h1 className="text-xl font-semibold">Car Rentals</h1>
        </div>
      </div>
      <div className="text-sm text-slate-400">City-to-city rentals</div>
    </header>
  );
};
