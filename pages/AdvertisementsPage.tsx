import FilterBottomSheet from "@/components/FilterBottomSheet";
import { AdvertisementsFilterProvider, useAdvertisementsFilter } from "@/contexts/AdvertisementsFilterContext";
import { colors, spacing } from "@/constants/theme";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import { TabBarIndicator } from "react-native-tab-view";
import AllAdvertisements from "./AllAdvertisements";

const Tab = createMaterialTopTabNavigator();

const AdvertisementsPageContent = () => {
  const { searchQuery, setSearchQuery, filters, setFilters } =
    useAdvertisementsFilter();
  const [isFocused, setIsFocused] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterSheetRef = useRef<BottomSheetModal>(null);

  const hasActiveFilters =
    filters.selectedCities.length > 0 ||
    filters.priceFrom.trim() !== "" ||
    filters.priceTo.trim() !== "";

  const handleFilterPress = () => {
    if (isFilterOpen) {
      filterSheetRef.current?.dismiss();
      setIsFilterOpen(false);
    } else {
      filterSheetRef.current?.present();
      setIsFilterOpen(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View
          style={[
            styles.searchInputWrapper,
            isFocused && styles.searchInputWrapperFocused,
          ]}
        >
          <TextInput
            mode="outlined"
            outlineStyle={{ borderRadius: 28, borderWidth: 0 }}
            outlineColor="transparent"
            activeOutlineColor={colors.primary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={isFocused ? "" : "Поиск объявления"}
            placeholderTextColor={colors.textSecondary}
            textColor={colors.text}
            left={<TextInput.Icon icon="menu" color={colors.muted} />}
            style={styles.searchInput}
            contentStyle={styles.searchInputContent}
          />
        </View>
        <IconButton
          icon={hasActiveFilters ? "filter" : "filter-outline"}
          mode="contained"
          onPress={handleFilterPress}
          style={styles.filterButton}
          iconColor={colors.muted}
        />
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: colors.background },
          tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarIndicator: (props) => {
            return (
              <TabBarIndicator
                {...props}
                navigationState={props.state}
                width={20}
                style={[
                  props.style,
                  { backgroundColor: colors.primary, height: 3 },
                ]}
              />
            );
          },
        }}
      >
        <Tab.Screen name="Все">
          {() => <AllAdvertisements />}
        </Tab.Screen>
        <Tab.Screen name="Мои" component={() => <Text>Мои</Text>} />
      </Tab.Navigator>
      <FilterBottomSheet
        innerRef={filterSheetRef}
        selectedCities={filters.selectedCities}
        priceFrom={filters.priceFrom}
        priceTo={filters.priceTo}
        onApply={(newFilters) => setFilters(newFilters)}
        onDismiss={() => setIsFilterOpen(false)}
      />
    </View>
  );
};

const AdvertisementsPage = () => (
  <AdvertisementsFilterProvider>
    <AdvertisementsPageContent />
  </AdvertisementsFilterProvider>
);

export default AdvertisementsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    color: colors.text,
    padding: spacing.screenPadding,
  },
  inputContainer: {
    marginTop: 18,
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingLeft: 0,
    paddingRight: 0,
    gap: 8,
    height: 48,
  },
  searchInputWrapper: {
    flex: 1,
    height: 48,
    borderRadius: 28,
    overflow: "hidden",
  },
  searchInputWrapperFocused: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  searchInput: {
    flex: 1,
    backgroundColor: colors.searchInputBg,
    height: 48,
  },
  searchInputContent: {
    backgroundColor: colors.searchInputBg,
    color: colors.text,
  },
  filterButton: {
    backgroundColor: colors.searchInputBg,
    margin: 0,
    width: 40,
    height: 40,
    padding: 8,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
});
