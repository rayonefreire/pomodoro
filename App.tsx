import React from 'react';
import * as Notifications from 'expo-notifications';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { AppRoutes } from './src/routes';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  return (
    <NavigationContainer>
      <AppRoutes />
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}