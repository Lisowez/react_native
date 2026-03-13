import type { Advertisement } from "@/types/advertisement";

export type FilterParams = {
  searchQuery: string;
  selectedCities: string[];
  priceFrom: string;
  priceTo: string;
};

export function filterAdvertisements(
  ads: Advertisement[],
  { searchQuery, selectedCities, priceFrom, priceTo }: FilterParams
): Advertisement[] {
  return ads.filter((ad) => {
    const matchesSearch =
      !searchQuery.trim() ||
      ad.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      ad.description.toLowerCase().includes(searchQuery.toLowerCase().trim());

    const matchesCity =
      selectedCities.length === 0 || selectedCities.includes(ad.location);

    const priceFromNum = priceFrom.trim() ? parseInt(priceFrom, 10) : null;
    const priceToNum = priceTo.trim() ? parseInt(priceTo, 10) : null;
    const matchesPrice =
      (priceFromNum === null || ad.priceAmount >= priceFromNum) &&
      (priceToNum === null || ad.priceAmount <= priceToNum);

    return matchesSearch && matchesCity && matchesPrice;
  });
}
