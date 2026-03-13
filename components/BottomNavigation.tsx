import { colors } from "@/constants/theme";
import AdvertisementsPage from "@/pages/AdvertisementsPage";
import { useState } from "react";
import { Text } from "react-native";
import { BottomNavigation, ThemeProvider, useTheme } from "react-native-paper";

const FavoritesPage = () => <Text>FavoritesPage</Text>;
const ProfilePage = () => <Text>ProfilePage</Text>;

const ACTIVE_INDICATOR_STYLE = { width: 64, height: 32 };

const BottomNavigationComponent = () => {
  const [index, setIndex] = useState(0);
  const theme = useTheme();
  const [routes] = useState([
    {
      key: "ads",
      title: "Объявления",
      focusedIcon: "format-list-bulleted",
      unfocusedIcon: "format-list-bulleted",
    },
    {
      key: "favorites",
      title: "Избранное",
      focusedIcon: "heart",
      unfocusedIcon: "heart-outline",
    },
    {
      key: "profile",
      title: "Профиль",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
      badge: 3,
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    ads: AdvertisementsPage,
    favorites: FavoritesPage,
    profile: ProfilePage,
  });

  return (
    <ThemeProvider
      theme={{
        ...theme,
        colors: {
          ...theme.colors,
          secondaryContainer: "#FFD9E2",
          error: "#BA1A1A",
          onError: "#ffffff",
        },
      }}
    >
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        activeColor={colors.text}
        activeIndicatorStyle={ACTIVE_INDICATOR_STYLE}
        inactiveColor={colors.muted}
        barStyle={{ backgroundColor: colors.navBarBackground }}
      />
    </ThemeProvider>
  );
};

export default BottomNavigationComponent;
