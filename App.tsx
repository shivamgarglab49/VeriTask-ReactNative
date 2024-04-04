import React from "react";

import OptionMenu from "./screens/commons/OptionMenu";
import DealsComponent from "./screens/deal/DealsComponent";
import UsersComponent from "./screens/users/UsersComponent";
import DealDetailComponent from "./screens/details/DealDetailComponent";
import ConfirmationComponent from "./screens/confirmation/ConfirmationComponent";
import NotificationComponent from "./screens/commons/NotificationComp";

import { colors } from "./utils/Constants";
import { StatusBar } from "expo-status-bar";
import { useUserLogin } from "./hooks/useUserLogin";
import { RootStackParamList } from "./hooks/types";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const { isChecking, currentUserState } = useUserLogin();

  if (isChecking) {
    return <></>;
  }

  return (
    <ActionSheetProvider>
      <>
        <StatusBar style="light" />
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <NotificationComponent />
            <Stack.Navigator
              initialRouteName={currentUserState.user ? "Deals" : "Users"}
              screenOptions={{
                headerTintColor: colors.fcl_content,
                headerShadowVisible: true,
                headerBackTitleVisible: false,
                headerStyle: {
                  backgroundColor: colors.fcl_fill_container,
                },
              }}
            >
              <Stack.Screen
                name={"Users"}
                component={UsersComponent}
                options={{ title: "Login as", headerShown: false }}
              />
              <Stack.Screen
                name={"Deals"}
                component={DealsComponent}
                options={{ title: "Sales", headerRight: () => <OptionMenu /> }}
              />
              <Stack.Screen
                name={"DealsDetail"}
                component={DealDetailComponent}
                options={{ title: "Sales-Details" }}
              />

              <Stack.Screen
                name={"Confirmation"}
                component={ConfirmationComponent}
                options={{ title: "" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </>
    </ActionSheetProvider>
  );
}

export default App;
