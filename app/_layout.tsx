import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import merge from "deepmerge";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from "react-native-paper";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from "../app/(tabs)/index";
import { Colors } from "../constants/Colors";

const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark };
const customLightTheme = { ...MD3LightTheme, colors: Colors.light };

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme(); // <-- key change here

  const paperTheme =
      colorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
      <PaperProvider theme={paperTheme}>
        <ThemeProvider value={paperTheme}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" component={Index} />
          </Stack.Navigator>
        </ThemeProvider>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      </PaperProvider>
  );
}