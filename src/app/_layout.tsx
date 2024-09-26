import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import './global.css'

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'ZonaPro-Regular': require('../assets/fonts/ZonaPro-Regular.ttf'),
    'ZonaPro-SemiBold': require('../assets/fonts/ZonaPro-SemiBold.ttf'),
    'ZonaPro-Bold': require('../assets/fonts/ZonaPro-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Slot />
  )
}
