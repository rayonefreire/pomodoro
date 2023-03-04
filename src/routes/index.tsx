import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Home } from "../pages/Home";
import { Welcome } from "../pages/Welcome";

export function AppRoutes() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  )
}