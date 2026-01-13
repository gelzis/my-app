import type { Car } from "@/app/shared/types";

export type { Car };

export type Filters = {
  location: string;
  category: string;
  seats: string;
  onlyAvailable: boolean;
};
