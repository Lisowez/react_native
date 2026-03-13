import BottomNavigationComponent from "@/components/BottomNavigation";
import { colors } from "@/constants/theme";
import { StatusBar, StyleSheet, View } from "react-native";

const Main = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <BottomNavigationComponent />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    color: colors.text,
  },
});
