// auth.tsx
import AppBarItem from "@/components/AppBar";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import { colors } from "@/constants/theme";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet, View, StatusBar } from "react-native";
import { TabBarIndicator } from "react-native-tab-view";

const Tab = createMaterialTopTabNavigator();

export default function AuthScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <AppBarItem />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: colors.background },
          tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarIndicator: (props) => {
            const tabWidth = props.getTabWidth(0);
            return (
              <TabBarIndicator
                {...props}
                navigationState={props.state}
                width={tabWidth / 2}
                style={[props.style, { backgroundColor: colors.primary }]}
              />
            );
          },
        }}
      >
        <Tab.Screen name="Вход" component={SignIn} />
        <Tab.Screen name="Регистрация" component={SignUp} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
