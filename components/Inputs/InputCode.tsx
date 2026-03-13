import { colors, spacing } from "@/constants/theme";
import { useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";

const DIGITS = 4;

export interface InputCodeProps {
  value: string;
  onChange: (code: string) => void;
}

const InputCode = ({ value, onChange }: InputCodeProps) => {
  const refs = useRef<(TextInput | null)[]>([]);

  const digits = value.padEnd(DIGITS, " ").slice(0, DIGITS).split("");

  const handleChange = (index: number, text: string) => {
    const digit = text.replace(/[^0-9]/g, "").slice(-1);
    const newDigits = [...digits];
    newDigits[index] = digit;
    const newCode = newDigits.join("").trimEnd();
    onChange(newCode);
    if (digit && index < DIGITS - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    index: number,
    e: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    if (e.nativeEvent.key === "Backspace" && !digits[index] && index > 0) {
      refs.current[index - 1]?.focus();
      const newDigits = [...digits];
      newDigits[index - 1] = " ";
      onChange(newDigits.join("").trimEnd());
    }
  };

  return (
    <View style={styles.row}>
      {Array.from({ length: DIGITS }).map((_, i) => (
        <TextInput
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          style={styles.input}
          value={digits[i] === " " ? "" : digits[i]}
          onChangeText={(text) => handleChange(i, text)}
          onKeyPress={(e) => handleKeyPress(i, e)}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
  input: {
    width: 56,
    height: 56,
    borderWidth: 1,
    borderColor: colors.muted,
    borderRadius: spacing.inputRadius,
    fontSize: 24,
    textAlign: "center",
    color: colors.textSecondary,
    backgroundColor: colors.background,
    padding: 0,
  },
});

export default InputCode;
