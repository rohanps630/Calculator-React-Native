import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { Styles } from './row.style';

interface Props {
  children: ReactNode;
  style?: ViewStyle;
}

const Row: React.FC<Props> = ({ children, style }) => (
  <View style={[Styles.row, style]}>{children}</View>
);

export default Row;
