import React, { useState, useRef, useEffect } from 'react';

import {
  Text
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

import * as Notifications from 'expo-notifications';

import { Button } from '../../components/Button';
import { styles } from './styles';

function formatSeconds(seconds) {
  if (seconds < 60) {
    return `${seconds}seg`
  } else if (seconds >= 1500) {
    const segundos = seconds - 1500;
    if (segundos < 60) {
      return `${segundos}seg`
    }
    return `${Math.floor(segundos / 60)}min`
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
        setSecondsEllapsed(state => state + 1);
      }, 1);
      setTimerEnable(true);
    }
  }

  async function schedulePushNotification(title, message) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: message,
      },
      trigger: { seconds: 0 },
    })
      .then(() => console.log("Notificação enviada"))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    if (secondsEllapsed === 1500) {
      schedulePushNotification("Hora de descansar 💤", "Você tem 5 minutos para descansar");
    } else if (secondsEllapsed === 1800) {
      clearInterval(timerRef.current);
      setSecondsEllapsed(0);
      setTimerEnable(false);
      schedulePushNotification("Hora de voltar ao trabalho ⏱️", "Mais 25 minutos de produtividade");
      timerRef.current = setInterval(() => {
        setSecondsEllapsed(state => state + 1);
      }, 1);
      setTimerEnable(true);
    }
  }, [secondsEllapsed]);

  return (
    <LinearGradient
      colors={["#E7F3FE", "#9ABEE0"]}
      style={styles.container}
    >
      <Text style={styles.title}>
        Pomodoro
      </Text>

      {
        secondsEllapsed >= 1500 ?
        <Text style={styles.break}>Break</Text> :
        null
      }

      <AnimatedCircularProgress
        size={300}
        width={12}
        fill={(secondsEllapsed * 100) / 1500}
        rotation={0}
        tintColor="#75A1DE"
        backgroundColor="#FFF"
      >
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