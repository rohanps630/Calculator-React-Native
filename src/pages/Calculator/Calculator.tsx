import React from 'react';
import { Text, View, StatusBar, SafeAreaView } from 'react-native';
import type { Type, ValueType } from '../../store/features/calculator';
import { calculations, currentValue } from '../../store/features/calculator';
import { useAppDispatch, useAppSelector } from '../../store';
import { Row, Button } from '../../components';
import { Styles } from './calculator.style';

const Calculator: React.FC = () => {
  const currentStateValue = useAppSelector(currentValue);
  const dispatch = useAppDispatch();

  const handleTap = (type: Type | ValueType, value?: string | number) => {
    if (value !== undefined) {
      dispatch(calculations({ type: type, value: value.toString() }));
    } else {
      dispatch(calculations({ type: type as Type }));
    }
  };

  return (
    <View style={Styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <Text style={Styles.value}>
          {parseFloat(currentStateValue).toLocaleString()}
        </Text>
        <Row>
          <Button
            text="C"
            theme="secondary"
            onPress={() => handleTap('clear')}
          />
          <Button
            text="+/-"
            theme="secondary"
            onPress={() => handleTap('posneg')}
          />
          <Button
            text="%"
            theme="secondary"
            onPress={() => handleTap('percentage')}
          />
          <Button
            text="/"
            theme="accent"
            onPress={() => handleTap('operator', '/')}
          />
        </Row>

        <Row>
          <Button text="7" onPress={() => handleTap('number', 7)} />
          <Button text="8" onPress={() => handleTap('number', 8)} />
          <Button text="9" onPress={() => handleTap('number', 9)} />
          <Button
            text="x"
            theme="accent"
            onPress={() => handleTap('operator', '*')}
          />
        </Row>

        <Row>
          <Button text="4" onPress={() => handleTap('number', 4)} />
          <Button text="5" onPress={() => handleTap('number', 5)} />
          <Button text="6" onPress={() => handleTap('number', 6)} />
          <Button
            text="-"
            theme="accent"
            onPress={() => handleTap('operator', '-')}
          />
        </Row>

        <Row>
          <Button text="1" onPress={() => handleTap('number', 1)} />
          <Button text="2" onPress={() => handleTap('number', 2)} />
          <Button text="3" onPress={() => handleTap('number', 3)} />
          <Button
            text="+"
            theme="accent"
            onPress={() => handleTap('operator', '+')}
          />
        </Row>

        <Row>
          <Button
            text="0"
            size="double"
            onPress={() => handleTap('number', 0)}
          />
          <Button text="." onPress={() => handleTap('number', '.')} />
          <Button text="=" theme="accent" onPress={() => handleTap('equal')} />
        </Row>
      </SafeAreaView>
    </View>
  );
};

export default Calculator;
