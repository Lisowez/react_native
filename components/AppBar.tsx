import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Appbar } from "react-native-paper";
import { colors, typography } from "@/constants/theme";

const AppBarItem = ({ title = "" }: { title?: string }) => {
  const navigation = useNavigation();

  const handleBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
  };
  const handleTranslate = () => {
    console.log("translate");
  };
  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.Action
        icon="arrow-left"
        iconColor={colors.muted}
        onPress={handleBack}
      />
      <Appbar.Content
        title={title}
        titleStyle={{
          fontWeight: "500",
          fontSize: 22,
          color: colors.text,
          fontFamily: typography.fontFamily,
        }}
      />
      <Appbar.Action
        icon="translate"
        iconColor={colors.muted}
        onPress={handleTranslate}
      />
    </Appbar.Header>
  );
};
export default AppBarItem;
