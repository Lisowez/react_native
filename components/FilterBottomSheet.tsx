import { colors } from "@/constants/theme";
import {
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Chip } from "react-native-paper";

const CITIES = [
  "Тирасполь",
  "Бендеры",
  "Григориополь",
  "Дубосары",
  "Каменка",
  "Рыбница",
  "Слободзея",
  "Днестровск",
];

type FilterBottomSheetProps = {
  innerRef: React.RefObject<BottomSheetModal | null>;
  selectedCities: string[];
  priceFrom: string;
  priceTo: string;
  onApply: (filters: {
    selectedCities: string[];
    priceFrom: string;
    priceTo: string;
  }) => void;
  onDismiss?: () => void;
};

const FilterBottomSheet = ({
  innerRef,
  selectedCities: initialCities,
  priceFrom: initialPriceFrom,
  priceTo: initialPriceTo,
  onApply,
  onDismiss,
}: FilterBottomSheetProps) => {
  const snapPoints = useMemo(() => ["50%"], []);

  const [selectedCities, setSelectedCities] =
    useState<string[]>(initialCities);
  const [priceFrom, setPriceFrom] = useState(initialPriceFrom);
  const [priceTo, setPriceTo] = useState(initialPriceTo);
  const [showCityPicker, setShowCityPicker] = useState(false);

  useEffect(() => {
    setSelectedCities(initialCities);
    setPriceFrom(initialPriceFrom);
    setPriceTo(initialPriceTo);
  }, [initialCities, initialPriceFrom, initialPriceTo]);

  const handleApply = () => {
    onApply({ selectedCities, priceFrom, priceTo });
    innerRef.current?.dismiss();
  };

  const toggleCity = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  const removeCity = (city: string) => {
    setSelectedCities((prev) => prev.filter((c) => c !== city));
  };


  const cityContent = showCityPicker ? (
    <View style={styles.cityPicker}>
      <View style={styles.cityPickerHeader}>
        <Pressable onPress={() => setShowCityPicker(false)}>
          <Text style={styles.backButton}>←</Text>
        </Pressable>
        <Text style={styles.cityPickerTitle}>Город</Text>
        <Pressable
          onPress={() => {
            setSelectedCities([]);
            setShowCityPicker(false);
          }}
        >
          <Text style={styles.resetButton}>Сбросить</Text>
        </Pressable>
      </View>
      {CITIES.map((city) => (
        <Pressable
          key={city}
          style={styles.cityItem}
          onPress={() => toggleCity(city)}
        >
          <Text style={styles.cityName}>{city}</Text>
          <Text style={styles.checkbox}>
            {selectedCities.includes(city) ? "✓" : "☐"}
          </Text>
        </Pressable>
      ))}
    </View>
  ) : (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Фильтры</Text>
        <Pressable onPress={handleApply}>
          <Text style={styles.applyButton}>Применить</Text>
        </Pressable>
      </View>

      <BottomSheetScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Город</Text>
          <View style={styles.tagsRow}>
            {selectedCities.map((city) => (
              <Chip
                key={city}
                mode="outlined"
                onClose={() => removeCity(city)}
                style={styles.chip}
                textStyle={styles.chipText}
              >
                {city}
              </Chip>
            ))}
          </View>
          <Pressable onPress={() => setShowCityPicker(true)}>
            <Text style={styles.addCityLink}>Добавить город</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Цена объявления</Text>
          <View style={styles.priceRow}>
            <View style={styles.priceInputWrapper}>
              <Text style={styles.priceLabel}>От</Text>
              <TextInput
                value={priceFrom}
                onChangeText={setPriceFrom}
                keyboardType="numeric"
                placeholder=""
                style={[
                  styles.priceInput,
                  priceFrom ? styles.priceInputFocused : undefined,
                ]}
                placeholderTextColor={colors.muted}
              />
            </View>
            <View style={styles.priceInputWrapper}>
              <Text style={styles.priceLabel}>До</Text>
              <TextInput
                value={priceTo}
                onChangeText={setPriceTo}
                keyboardType="numeric"
                placeholder=""
                style={[
                  styles.priceInput,
                  priceTo ? styles.priceInputFocused : undefined,
                ]}
                placeholderTextColor={colors.muted}
              />
            </View>
          </View>
        </View>
      </BottomSheetScrollView>
    </>
  );

  return (
    <BottomSheetModal
      ref={innerRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      onDismiss={onDismiss}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
    >
      {cityContent}
    </BottomSheetModal>
  );
};

FilterBottomSheet.displayName = "FilterBottomSheet";

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handleIndicator: {
    backgroundColor: colors.muted,
    width: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E0E3",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  applyButton: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 12,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  chip: {
    backgroundColor: "white",
    borderColor: "#E0E0E0",
  },
  chipText: {
    fontSize: 14,
    color: colors.text,
  },
  addCityLink: {
    fontSize: 14,
    color: colors.primary,
  },
  priceRow: {
    flexDirection: "row",
    gap: 16,
  },
  priceInputWrapper: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  priceInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
  },
  priceInputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  cityPicker: {
    paddingHorizontal: 24,
  },
  cityPickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    fontSize: 24,
    color: colors.text,
  },
  cityPickerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  resetButton: {
    fontSize: 14,
    color: colors.primary,
  },
  cityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  cityName: {
    fontSize: 16,
    color: colors.text,
  },
  checkbox: {
    fontSize: 18,
    color: colors.primary,
  },
});

export default FilterBottomSheet;
