export const HeroSection = () => {
  return (
    <section className="grid gap-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 px-8 py-12 md:grid-cols-[1.3fr_1fr]">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
          Weekend drop-offs, zero hassle
        </p>
        <h2 className="text-4xl font-semibold leading-tight md:text-5xl">
          Book a car in minutes, drive anywhere in style.
        </h2>
        <p className="max-w-xl text-base text-slate-300">
          Pick from hand-selected vehicles, flexible pickup windows, and pricing
          that stays clear. Every booking includes basic insurance and 24/7
          roadside support.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Trusted by city travelers
          </p>
          <p className="mt-4 text-3xl font-semibold">4.8 average rating</p>
          <p className="mt-2 text-sm text-slate-400">
            Based on 1,200+ verified rentals this season.
          </p>
        </div>
        <div className="grid gap-3 rounded-3xl bg-slate-950/60 p-4 text-sm text-slate-300">
          <div className="flex items-center justify-between rounded-2xl bg-slate-900 px-4 py-3">
            <span>Free swaps within 2 hours</span>
            <span className="text-amber-200">New</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-slate-900 px-4 py-3">
            <span>Airport pickup, no counter</span>
            <span className="text-amber-200">24/7</span>
          </div>
        </div>
      </div>
    </section>
  );
};
