import React, { FC } from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { Styles } from './button.style';

interface ButtonProps {
  onPress: () => void;
  text: string;
  size?: 'double';
  theme?: 'secondary' | 'accent';
}

const Button: FC<ButtonProps> = ({ onPress, text, size, theme }) => {
  const buttonStyles: ViewStyle[] = [Styles.button];
  const textStyles: TextStyle[] = [Styles.text];

  if (size === 'double') {
    buttonStyles.push(Styles.buttonDouble);
  }

  if (theme === 'secondary') {
    buttonStyles.push(Styles.buttonSecondary);
    textStyles.push(Styles.textSecondary);
  } else if (theme === 'accent') {
    buttonStyles.push(Styles.buttonAccent);
  }

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
