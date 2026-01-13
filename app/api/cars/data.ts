import carsData from "@/app/data/cars.json";
import type { Car } from "@/app/shared/types";

export const getCars = (): Car[] => carsData.cars as Car[];
