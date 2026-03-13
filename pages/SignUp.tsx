import InputPassword from "@/components/Inputs/InputPassword";
import InputPhone from "@/components/Inputs/InputPhone";
import { colors, spacing, typography } from "@/constants/theme";
import type { AuthFormValues } from "@/types/forms";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";

const SignUp = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);

  const validate = (values: AuthFormValues) => {
    const errors: Partial<AuthFormValues> = {};

    // Телефон
    if (!values.phone) {
      errors.phone = "Телефон обязателен";
    } else if (values.phone.length < 13) {
      errors.phone = "Номер должен содержать 13 цифр";
    } else if (!values.phone.startsWith("+375")) {
      errors.phone = "Номер должен начинаться с +375";
    }

    // Пароль
    if (!values.password) {
      errors.password = "Пароль обязателен";
    } else if (values.password.length < 8) {
      errors.password = "Пароль должен быть минимум 8 символов";
    } else if (values.password.length > 16) {
      errors.password = "Пароль должен быть максимум 16 символов";
    } else if (values.password !== "12345678") {
      errors.password = "Неверный пароль";
    }

    // Повторный пароль
    if (!values.repeatPassword) {
      errors.repeatPassword = "Повторите пароль";
    } else if (values.repeatPassword !== values.password) {
      errors.repeatPassword = "Пароли не совпадают";
    }

    return errors;
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ phone: "+375", password: "", repeatPassword: "" }}
        validate={validate}
        onSubmit={() => {
          router.push("/main");
        }}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <>
            <InputPhone
              handleChange={handleChange}
              handleBlur={handleBlur}
              valueType="phone"
              values={values}
              label="Телефон"
            />
            {touched.phone && errors.phone && (
              <Text style={styles.errorText}>{errors.phone}</Text>
            )}
            <InputPassword
              handleChange={handleChange}
              handleBlur={handleBlur}
              valueType="password"
              showPassword={showPassword}
              values={values}
              setShowPassword={setShowPassword}
              label="Пароль"
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <InputPassword
              handleChange={handleChange}
              handleBlur={handleBlur}
              valueType="repeatPassword"
              showPassword={showPassword}
              values={values}
              setShowPassword={setShowPassword}
              label="Повторите пароль"
            />
            {touched.repeatPassword && errors.repeatPassword && (
              <Text style={styles.errorText}>{errors.repeatPassword}</Text>
            )}
            <View style={styles.info}>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => {
                  setChecked(!checked);
                }}
              >
                <View
                  style={[styles.checkbox, checked && styles.checkboxChecked]}
                >
                  {checked && (
                    <MaterialIcons name="check" size={14} color="white" />
                  )}
                </View>
              </TouchableOpacity>
              <Text style={styles.checkboxText}>
                Я согласен с{" "}
                <Text style={styles.link} onPress={() => router.push("/terms")}>
                  Правилами и условиями использования
                </Text>
              </Text>
            </View>
            <Button
              mode="contained"
              onPress={() => handleSubmit()}
              style={[
                styles.button,
                (!values.phone ||
                  !values.password ||
                  !values.repeatPassword ||
                  !checked) && { backgroundColor: colors.buttonDisabled },
              ]}
              contentStyle={{ paddingVertical: 4 }}
              disabled={
                !values.phone ||
                !values.password ||
                !values.repeatPassword ||
                !checked
              }
              labelStyle={{
                color:
                  values.phone &&
                  values.password &&
                  values.repeatPassword &&
                  checked
                    ? "white"
                    : colors.buttonDisabledText,
              }}
            >
              Зарегистрироваться
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingBottom: 100,
    paddingHorizontal: spacing.screenPadding,
    backgroundColor: colors.background,
    gap: 20,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.errorSize,
    marginBottom: 16,
    marginLeft: 4,
  },
  button: {
    gap: 8,
    marginTop: 24,
    borderRadius: spacing.buttonRadius,
    backgroundColor: colors.primary,
    color: "white",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  checkboxContainer: {
    marginRight: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.checkboxBorder,
    borderRadius: 4,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  checkboxText: {
    flex: 1,
    fontSize: typography.linkSize,
    color: colors.textSecondary,
  },
  link: {
    color: colors.primary,
    textDecorationLine: "underline",
  },
});

export default SignUp;
