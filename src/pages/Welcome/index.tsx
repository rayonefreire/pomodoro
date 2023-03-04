import React from 'react';

import {
  Text
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import LottieView from 'lottie-react-native';

import { styles } from './styles';
import { Button } from '../../components/Button';

export function Welcome(){
  const navigation = useNavigation();

  function handleNavigateToHome() {
    navigation.navigate("Home");
  }

  return (
    <LinearGradient
      colors={["#E7F3FE", "#9ABEE0"]}
      style={styles.container}
    >
      <LottieView
        loop={true}
        autoPlay={true}
        autoSize
        source={require("../../../assets/yoga-girl-3.json")}
      />

      <Text style={styles.title}>
        Manter o foco no trabalho não é fácil
      </Text>

      <Button onPress={handleNavigateToHome}>
        <MaterialIcons name="arrow-right" size={32} color="#FFF" />
      </Button>
    </LinearGradient>
  );
}