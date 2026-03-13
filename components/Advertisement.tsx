import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";

import { colors } from "@/constants/theme";
import type { Advertisement as AdvertisementType } from "@/types/advertisement";

const PLACEHOLDER_IMAGE =
  "https://placehold.co/400x240/f9f4f6/9e9e9e?text=Нет+фото";

const Advertisement = ({ item }: { item: AdvertisementType }) => {
  const [isFavorited, setIsFavorited] = useState(item.isFavorited);

  const priceDisplay =
    item.priceAmount > 0
      ? `${item.priceAmount} ${item.priceCurrency}${item.priceUnit ?? ""}`
      : "Договорная";

  return (
    <View style={styles.container}>
      {item.imageUrl && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.imageUrl || PLACEHOLDER_IMAGE }}
            style={styles.image}
            resizeMode="cover"
            alt={item.title}
          />
        </View>
      )}
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <IconButton
            onPress={() => setIsFavorited(!isFavorited)}
            iconColor={isFavorited ? colors.primary : colors.muted}
            icon={isFavorited ? "heart" : "heart-outline"}
            size={22}
            style={styles.favoriteButton}
          />
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.price}>{priceDisplay}</Text>
        <Text style={styles.meta}>{item.location}</Text>
        <Text style={styles.meta}>{item.postedDateTime}</Text>
      </View>
    </View>
  );
};

export default Advertisement;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E8E0E3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 400 / 240,
    backgroundColor: colors.searchInputBg,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    padding: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  favoriteButton: {
    margin: -8,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 6,
    lineHeight: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 8,
    marginBottom: 8,
  },
  meta: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 4,
  },
});
