import InputPassword from "@/components/Inputs/InputPassword";
import InputPhone from "@/components/Inputs/InputPhone";
import { colors, spacing, typography } from "@/constants/theme";
import type { AuthFormValues } from "@/types/forms";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const handleForgetPassword = () => {
    router.push("/forget-pass");
  };
  const validate = (values: AuthFormValues) => {
    const errors: Partial<AuthFormValues> = {};

    if (!values.phone) {
      errors.phone = "Телефон обязателен";
    } else if (values.phone.length < 13) {
      errors.phone = "Номер должен содержать 13 цифр";
    } else if (!values.phone.startsWith("+375")) {
      errors.phone = "Номер должен начинаться с +375";
    } else if (values.phone !== "+375298304359") {
      errors.phone = "Этот номер не зарегистрирован";
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

    return errors;
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ phone: "+375", password: "" }}
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

            <Button
              mode="contained"
              onPress={() => handleSubmit()}
              style={[
                styles.button,
                (!values.phone || !values.password) && {
                  backgroundColor: colors.buttonDisabled,
                },
              ]}
              contentStyle={{ paddingVertical: 4 }}
              disabled={!values.phone || !values.password}
              labelStyle={{
                color: values.phone && values.password ? "white" : colors.buttonDisabledText,
              }}
            >
              Войти
            </Button>
          </>
        )}
      </Formik>
      <Text style={styles.forgetText} onPress={handleForgetPassword}>
        Забыли пароль?
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
    paddingTop: 100,
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
  forgetText: {
    textAlign: "center",
    color: colors.primary,
    fontFamily: typography.fontFamily,
    fontWeight: 500,
    letterSpacing: 0.1,
    lineHeight: 20,
    paddingTop: 10,
  },
});

export default SignIn;
