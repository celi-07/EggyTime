import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, AppState, Pressable, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { Image } from 'expo-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

const EggTimer = ({ navigation, route }) => {
  const initialTime = route.params?.time || 180;
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [sound, setSound] = useState();
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [bgColor, setBgColor] = useState('#fff')
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime - 1;
          AsyncStorage.setItem('timerValue', newTime.toString());
          return newTime;
        });
      }, 1000);
    } else if (time === 0) {
      playSoundLoop()
      setIsRunning(false)
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        AsyncStorage.getItem('timerValue').then(savedTime => {
          if (savedTime) {
            setTime(parseInt(savedTime, 10));
          }
        });
      }
      setAppState(nextAppState);
    });
    return () => subscription.remove();
  }, [appState]);

  async function playSoundLoop() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/timer_done.mp3'),
      { isLooping: true }
    );
    setSound(sound);
    setIsSoundPlaying(true);
    await sound.playAsync();
  }

  async function stopSound() {
    setTime(initialTime)

    if (sound) {
      try {
        await sound.stopAsync()
      } catch (error) {
        setIsRunning(false)
        console.log("Error stopping sound:", error)
      }
    }
  
    setIsSoundPlaying(false)
    setIsRunning(false)
  }

  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handlePress = () => {
    if (isSoundPlaying) stopSound()
    setBgColor('#FFEB99')
    setTimeout(() => setBgColor('#fff'), 200)
    setIsRunning(!isRunning)
  }
  
  return (
    <Pressable style={[styles.container, {backgroundColor: bgColor}]} onPress={() => handlePress()}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{position: 'absolute', top: 50, left: 20, padding: 10, backgroundColor: '#F5F5F5', borderRadius: 20}}>
        <MaterialIcons name='chevron-left' size={28} color='#FFB800' />
      </TouchableOpacity>
      <Text style={styles.header}>Egg Timer &lt;3</Text>
      <Text style={styles.subHeader}>Your egg is ready in...</Text>
      <View style={styles.eggContainer}>
        <Image 
          source={isRunning ? require('./assets/eggHatching.gif') : require('./assets/eggHatchingPNG.png')} 
          style={[styles.egg, isRunning ? {width: 120, height: 120, marginTop: 0, marginRight: 0} 
            : {width: 88, height: 88, marginTop: 23, marginRight: 3}]} 
        />
      </View>
      <Text style={styles.timer}>{formatTime()}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  header: { 
    fontSize: 24, 
    color: '#FFB800',
    fontFamily: 'Fredoka-Bold', 
  },
  subHeader: { 
    fontSize: 16, 
    marginTop: 10,
    marginBottom: 20,
    fontFamily: 'Fredoka-Regular', 
  },
  eggContainer: { 
    width: 140, 
    height: 140, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#FFEB99', 
    borderRadius: 70 
  },
  egg: { 
    contentFit: 'contain',
    alignSelf: 'center',
  },
  timer: { 
    fontSize: 40, 
    marginVertical: 20,
    fontFamily: 'Fredoka-SemiBold',
  },
  input: { 
    width: 100, 
    borderWidth: 1, 
    borderRadius: 5, 
    padding: 5, 
    textAlign: 'center', 
    marginVertical: 10 
  },
});

export default EggTimer;