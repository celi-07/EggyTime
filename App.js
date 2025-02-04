import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EggSelection from './EggSelection';
import EggTimer from './EggTimer';
import { useFonts } from 'expo-font';
import { enableScreens } from 'react-native-screens';

enableScreens();

const Stack = createStackNavigator();

// SplashScreen.preventAutoHideAsync(); // Prevent splash screen from auto-hiding

const App = () => {
  const [appReady, setAppReady] = React.useState(false);

  const [fontsLoaded] = useFonts({
    'Fredoka-Bold': require('./font/Fredoka-Bold.ttf'),
    'Fredoka-Light': require('./font/Fredoka-Light.ttf'),
    'Fredoka-Medium': require('./font/Fredoka-Medium.ttf'),
    'Fredoka-Regular': require('./font/Fredoka-Regular.ttf'),
    'Fredoka-SemiBold': require('./font/Fredoka-SemiBold.ttf'),
  });

  useEffect(() => {
    const prepareApp = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync(); // Hide splash once everything is ready
        setAppReady(true);
      }
    };

    prepareApp();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Prevent rendering UI until the app is ready
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="EggSelection" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="EggSelection" component={EggSelection} />
        <Stack.Screen name="EggTimer" component={EggTimer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
