import AppBarItem from "@/components/AppBar";
import InputCode from "@/components/Inputs/InputCode";
import InputPassword from "@/components/Inputs/InputPassword";
import InputPhone from "@/components/Inputs/InputPhone";
import { colors, spacing, typography } from "@/constants/theme";
import { formatPhoneDisplay } from "@/utils/format";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

const ForgetPass = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [phoneForCode, setPhoneForCode] = useState("");
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isCodeFilled = code.length === 4;

  return (
    <View style={styles.container}>
      <AppBarItem
        title={
          step === 1
            ? "Восстановление пароля"
            : step === 2
              ? "Введите код"
              : step === 3
                ? "Новый пароль"
                : ""
        }
      />

      {step === 1 && (
        <Formik
          initialValues={{ phone: "+375" }}
          validate={(values) => {
            const errors: Partial<{ phone: string }> = {};
            if (!values.phone) {
              errors.phone = "Телефон обязателен";
            } else if (values.phone.length < 13) {
              errors.phone = "Номер должен содержать 13 цифр";
            } else if (!values.phone.startsWith("+375")) {
              errors.phone = "Номер должен начинаться с +375";
            }
            return errors;
          }}
          onSubmit={() => {}}
        >
          {({ handleChange, handleBlur, values, touched, errors }) => (
            <View style={styles.content}>
              <Text style={styles.text}>
                Введите почту, на которую будет отправлен код для сброса пароля
              </Text>
              <InputPhone
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                valueType="phone"
                label="Телефон"
              />
              {touched.phone && errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}
              <Button
                mode="contained"
                onPress={() => {
                  setPhoneForCode(values.phone);
                  setStep(2);
                }}
                contentStyle={{ paddingVertical: 4 }}
                style={[
                  styles.button,
                  (values.phone.length < 13 || !!errors.phone) && {
                    backgroundColor: colors.buttonDisabled,
                  },
                ]}
                disabled={values.phone.length < 13 || !!errors.phone}
                labelStyle={{
                  color:
                    values.phone.length >= 13 && !errors.phone
                      ? "white"
                      : colors.buttonDisabledText,
                }}
              >
                Отправить код
              </Button>
            </View>
          )}
        </Formik>
      )}

      {step === 2 && (
        <View style={styles.content}>
          <Text style={styles.text}>
            Введите код, отправленный на {formatPhoneDisplay(phoneForCode)}
          </Text>
          <InputCode value={code} onChange={setCode} />
          <Button
            mode="contained"
            onPress={() => setStep(3)}
            contentStyle={{ paddingVertical: 4 }}
            style={[
              styles.button,
              !isCodeFilled && { backgroundColor: colors.buttonDisabled },
            ]}
            disabled={!isCodeFilled}
            labelStyle={{
              color: isCodeFilled ? "white" : colors.buttonDisabledText,
            }}
          >
            Подтвердить
          </Button>
          <Text
            style={styles.resendLink}
            onPress={() => {
              /* TODO: запрос повторной отправки кода */
            }}
          >
            Отправить код повторно
          </Text>
        </View>
      )}
      {step === 3 && (
        <View style={styles.content}>
          <Text style={styles.text}>
            Задайте новый пароль и подтвердите его для завершения сброса.
          </Text>
          <Formik
            initialValues={{ password: "", repeatPassword: "" }}
            validate={(values) => {
              const errors: Partial<{
                password: string;
                repeatPassword: string;
              }> = {};
              if (!values.password) {
                errors.password = "Пароль обязателен";
              } else if (values.password.length < 8) {
                errors.password = "Пароль должен быть минимум 8 символов";
              } else if (values.password.length > 16) {
                errors.password = "Пароль должен быть максимум 16 символов";
              }
              if (!values.repeatPassword) {
                errors.repeatPassword = "Повторите пароль";
              } else if (values.password !== values.repeatPassword) {
                errors.repeatPassword = "Пароли не совпадают";
              }
              return errors;
            }}
            onSubmit={() => {}}
          >
            {({ handleChange, handleBlur, values, touched, errors }) => (
              <View style={{ gap: 20 }}>
                <InputPassword
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  values={values}
                  valueType="password"
                  label="Пароль"
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                <InputPassword
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  values={values}
                  valueType="repeatPassword"
                  label="Повторите пароль"
                />

                {touched.repeatPassword && errors.repeatPassword && (
                  <Text style={styles.errorText}>{errors.repeatPassword}</Text>
                )}
                <Button
                  mode="contained"
                  onPress={() => {
                    router.push("/auth");
                  }}
                  contentStyle={{ paddingVertical: 4 }}
                  style={[
                    styles.button,
                    (!values.password ||
                      !values.repeatPassword ||
                      !!errors.password ||
                      !!errors.repeatPassword) && {
                      backgroundColor: colors.buttonDisabled,
                    },
                  ]}
                  disabled={
                    !values.password ||
                    !values.repeatPassword ||
                    !!errors.password ||
                    !!errors.repeatPassword
                  }
                  labelStyle={{
                    color:
                      values.password &&
                      values.repeatPassword &&
                      !errors.password &&
                      !errors.repeatPassword
                        ? "white"
                        : colors.buttonDisabledText,
                  }}
                >
                  Сохранить
                </Button>
              </View>
            )}
          </Formik>
        </View>
      )}
    </View>
  );
};
export default ForgetPass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
    backgroundColor: colors.background,
    gap: 20,
  },
  content: {
    paddingTop: 100,
    paddingHorizontal: spacing.screenPadding,
  },
  text: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    borderRadius: spacing.buttonRadius,
    backgroundColor: colors.primary,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.errorSize,
    marginBottom: 16,
    marginLeft: 4,
  },
  resendLink: {
    marginTop: 24,
    textAlign: "center",
    color: colors.primary,
    fontSize: typography.linkSize,
  },
});
