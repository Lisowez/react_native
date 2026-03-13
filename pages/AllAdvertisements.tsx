import Advertisement from "@/components/Advertisement";
import { useAdvertisementsFilter } from "@/contexts/AdvertisementsFilterContext";
import { colors } from "@/constants/theme";
import { mockAdvertisements } from "@/data/mockAdvertisements";
import { filterAdvertisements } from "@/utils/filterAdvertisements";
import { useMemo } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AllAdvertisements = () => {
  const { searchQuery, filters } = useAdvertisementsFilter();

  const filteredAds = useMemo(
    () =>
      filterAdvertisements(mockAdvertisements, {
        searchQuery,
        selectedCities: filters.selectedCities,
        priceFrom: filters.priceFrom,
        priceTo: filters.priceTo,
      }),
    [searchQuery, filters.selectedCities, filters.priceFrom, filters.priceTo]
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredAds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Advertisement item={item} />}
      />
    </SafeAreaView>
  );
};

export default AllAdvertisements;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.textSecondary,
  },
});
