import { colors, spacing } from "@/constants/theme";
import { useRouter } from "expo-router";
import { Text, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Terms() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>Правила и условия использования</Text>

        <Text style={styles.sectionTitle}>1. Общие положения</Text>
        <Text style={styles.text}>
          Настоящие Правила и условия использования (далее — «Правила»)
          регулируют отношения между пользователем и приложением.
        </Text>

        <Text style={styles.sectionTitle}>2. Регистрация и учетная запись</Text>
        <Text style={styles.text}>
          При регистрации вы обязуетесь предоставить достоверную информацию. Вы
          несете ответственность за сохранность своих учетных данных.
        </Text>

        <Text style={styles.sectionTitle}>3. Использование сервиса</Text>
        <Text style={styles.text}>
          Вы обязуетесь использовать сервис только в законных целях и не
          нарушать права других пользователей.
        </Text>

        <Text style={styles.sectionTitle}>4. Конфиденциальность</Text>
        <Text style={styles.text}>
          Мы обязуемся защищать вашу личную информацию в соответствии с нашей
          Политикой конфиденциальности.
        </Text>

        <Text style={styles.sectionTitle}>5. Ограничение ответственности</Text>
        <Text style={styles.text}>
          Приложение предоставляется «как есть». Мы не несем ответственности за
          любые убытки, возникшие в результате использования сервиса.
        </Text>

        <Text style={styles.sectionTitle}>6. Изменения в Правилах</Text>
        <Text style={styles.text}>
          Мы оставляем за собой право изменять настоящие Правила в любое время.
          Изменения вступают в силу с момента их публикации.
        </Text>

        <Text style={styles.footer}>
          Дата последнего обновления: {new Date().toLocaleDateString("ru-RU")}
        </Text>

        <Button
          mode="contained"
          onPress={() => router.back()}
          style={styles.button}
          contentStyle={{ paddingVertical: 4 }}
        >
          Вернуться назад
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.screenPadding,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textSecondary,
    marginBottom: 24,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.primary,
    marginTop: 20,
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  footer: {
    fontSize: 12,
    color: colors.checkboxBorder,
    marginTop: 24,
    marginBottom: 24,
    fontStyle: "italic",
  },
  button: {
    marginTop: 20,
    borderRadius: spacing.buttonRadius,
    backgroundColor: colors.primary,
  },
});
