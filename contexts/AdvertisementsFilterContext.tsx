import { createContext, useContext, useMemo, useState } from "react";

export type AdvertisementsFilterState = {
  searchQuery: string;
  selectedCities: string[];
  priceFrom: string;
  priceTo: string;
};

const initialState: AdvertisementsFilterState = {
  searchQuery: "",
  selectedCities: [],
  priceFrom: "",
  priceTo: "",
};

type AdvertisementsFilterContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: {
    selectedCities: string[];
    priceFrom: string;
    priceTo: string;
  };
  setFilters: (filters: {
    selectedCities: string[];
    priceFrom: string;
    priceTo: string;
  }) => void;
};

const AdvertisementsFilterContext =
  createContext<AdvertisementsFilterContextType | null>(null);

export const AdvertisementsFilterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchQuery, setSearchQuery] = useState(initialState.searchQuery);
  const [filters, setFilters] = useState({
    selectedCities: initialState.selectedCities,
    priceFrom: initialState.priceFrom,
    priceTo: initialState.priceTo,
  });

  const value = useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
      filters,
      setFilters,
    }),
    [searchQuery, filters]
  );

  return (
    <AdvertisementsFilterContext.Provider value={value}>
      {children}
    </AdvertisementsFilterContext.Provider>
  );
};

export const useAdvertisementsFilter = () => {
  const context = useContext(AdvertisementsFilterContext);
  if (!context) {
    throw new Error(
      "useAdvertisementsFilter must be used within AdvertisementsFilterProvider"
    );
  }
  return context;
};
