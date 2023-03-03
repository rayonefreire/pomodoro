import React, { useState, useRef } from 'react';

import {
  Text
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

import { Button } from '../../components/Button';
import { styles } from './styles';

function formatSeconds(seconds) {
  if (seconds < 60) {
    return `${seconds}seg`
  }

  return `${Math.floor(seconds / 60)}min`
}

export function Home(){
  const timerRef = useRef();

  const [timerEnable, setTimerEnable] = useState(false);
  const [secondsEllapsed, setSecondsEllapsed] = useState(0);

  function toggleTimer() {
    if (timerEnable) {
      clearInterval(timerRef.current);
      setTimerEnable(false);
    } else {
      timerRef.current = setInterval(() => {
        setSecondsEllapsed(state => state + 1)
      }, 1000);

      setTimerEnable(true);
    }
  }

  return (
    <LinearGradient
      colors={["#E7F3FE", "#9ABEE0"]}
      style={styles.container}
    >
      <Text style={styles.title}>
        Pomodoro
      </Text>

      <AnimatedCircularProgress
        size={300}
        width={12}
        fill={(secondsEllapsed * 100) / 600}
        rotation={0}
        tintColor="#75A1DE"
        backgroundColor="#FFF">
        {
          () => (
            <Text style={styles.progress}>
              {formatSeconds(secondsEllapsed)}
            </Text>
          )
        }
      </AnimatedCircularProgress>

      <Button onPress={toggleTimer}>
        <MaterialIcons name={ timerEnable ? "pause" : "play-arrow" } size={32} color="#FFF" />
      </Button>
    </LinearGradient>
  );
}