import { colors, spacing } from "@/constants/theme";
import { TextInput } from "react-native-paper";
import { InputProps } from "./interface";

const InputPhone = ({
  handleChange,
  handleBlur,
  values,
  valueType,
  label,
}: InputProps) => {
  return (
    <TextInput
      label={label}
      mode="outlined"
      left={<TextInput.Icon icon="phone" />}
      style={{ backgroundColor: "white" }}
      keyboardType="phone-pad"
      maxLength={13}
      value={values[valueType]}
      onChangeText={handleChange(valueType)}
      onBlur={handleBlur(valueType)}
      activeOutlineColor={colors.primary}
      outlineColor={colors.muted}
      outlineStyle={{ borderRadius: spacing.inputRadius }}
      textColor={colors.textSecondary}
    />
  );
};

export default InputPhone;
