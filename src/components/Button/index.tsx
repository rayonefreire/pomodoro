import React from 'react';

import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text
} from 'react-native';

import { styles } from './styles';

type Props = TouchableOpacityProps & {
  children: any;
}

export function Button({ children, ...rest } : Props){
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      {...rest}
    >
      { children }
    </TouchableOpacity>
  );
}