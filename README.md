# Объявления (Advertisements App)

Мобильное приложение для просмотра объявлений на базе **React Native** и **Expo**. Поддерживает Android, iOS и Web.

## 📁 Структура проекта

```
react_native/
├── app/                    # Маршруты (Expo Router, file-based)
│   ├── _layout.tsx         # Корневой layout с провайдерами
│   ├── index.tsx           # Редирект на /main
│   ├── auth.tsx            # Экран входа и регистрации (табы)
│   ├── main.tsx            # Главный экран с нижней навигацией
│   ├── terms.tsx           # Условия использования
│   └── forget-pass.tsx     # Восстановление пароля
│
├── components/             # UI-компоненты
│   ├── AppBar.tsx
│   ├── BottomNavigation.tsx
│   ├── FilterBottomSheet.tsx
│   ├── Advertisement.tsx
│   └── Inputs/
│       ├── InputCode.tsx
│       ├── InputPassword.tsx
│       ├── InputPhone.tsx
│       └── interface.ts
│
├── pages/                  # Страницы приложения
│   ├── Main.tsx
│   ├── SignIn.tsx
│   ├── SignUp.tsx
│   ├── ForgetPass.tsx
│   ├── Terms.tsx
│   ├── AdvertisementsPage.tsx
│   ├── AllAdvertisements.tsx
│   └── AdvertisementsPage.tsx
│
├── contexts/               # React Context
│   └── AdvertisementsFilterContext.tsx
│
├── constants/
│   └── theme.ts            # Цвета, отступы, типографика
│
├── data/
│   └── mockAdvertisements.ts   # Мок-данные объявлений
│
├── types/
│   ├── advertisement.ts
│   └── forms.ts
│
├── utils/
│   ├── filterAdvertisements.ts
│   └── format.ts
│
├── assets/
│   └── images/
│
├── scripts/
│   └── reset-project.js
│
└── .vscode/
    ├── settings.json
    └── extensions.json
```

## 🛠 Технологии

| Категория | Технология |
|-----------|------------|
| **Фреймворк** | React Native 0.81, Expo 54 |
| **Язык** | TypeScript |
| **Роутинг** | Expo Router (file-based) |
| **Навигация** | React Navigation (Stack, Bottom Tabs, Material Top Tabs) |
| **UI** | React Native Paper |
| **Нижние шторки** | @gorhom/bottom-sheet |
| **Формы** | Formik |
| **Анимации** | react-native-reanimated, react-native-gesture-handler |
| **Иконки** | @expo/vector-icons, Material Design Icons |

## 🚀 Запуск

1. Установить зависимости:

   ```bash
   npm install
   # или
   yarn install
   ```

2. Запустить проект:

   ```bash
   npx expo start
   # или
   npm start
   ```

3. Выбрать платформу:
   - **Expo Go** — сканировать QR-код
   - **Android** — `npm run android` или `a` в терминале
   - **iOS** — `npm run ios` или `i` в терминале
   - **Web** — `npm run web` или `w` в терминале

## 📜 Скрипты

| Команда | Описание |
|---------|----------|
| `npm start` | Запуск Expo dev server |
| `npm run android` | Запуск на Android |
| `npm run ios` | Запуск на iOS |
| `npm run web` | Запуск web-версии |
| `npm run lint` | Проверка ESLint |
| `npm run reset-project` | Сброс проекта (перенос в app-example) |

## 🔗 Алиасы путей

В проекте настроен алиас `@/` для импортов:

```ts
import { colors } from "@/constants/theme";
import SignIn from "@/pages/SignIn";
```

## 📚 Полезные ссылки

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [React Navigation](https://reactnavigation.org/)
