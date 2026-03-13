import { colors, spacing } from "@/constants/theme";
import { TextInput } from "react-native-paper";
import { InputProps } from "./interface";

const InputPassword = ({
  handleChange,
  handleBlur,
  values,
  showPassword,
  setShowPassword,
  valueType,
  label,
}: InputProps) => {
  return (
    <TextInput
      label={label}
      mode="outlined"
      style={{ backgroundColor: "white" }}
      secureTextEntry={!showPassword}
      right={
        <TextInput.Icon
          icon={showPassword ? "eye" : "eye-off"}
          onPress={() => setShowPassword!((prev) => !prev)}
        />
      }
      left={<TextInput.Icon icon="lock" />}
      value={values[valueType]}
      activeOutlineColor={colors.primary}
      outlineColor={colors.muted}
      onChangeText={handleChange(valueType)}
      onBlur={handleBlur(valueType)}
      outlineStyle={{ borderRadius: spacing.inputRadius }}
      textColor={colors.textSecondary}
    />
  );
};

export default InputPassword;
