import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../root-store/root-store';

export interface CalculatorState {
  currentValue: string;
  operator: string | null;
  previousValue: string | null;
}

export type ValueType = 'number' | 'operator';

export type Type = 'equal' | 'clear' | 'posneg' | 'percentage';

export type CalculatorAction =
  | { type: 'number'; value: string }
  | { type: 'operator'; value: string }
  | { type: 'equal' }
  | { type: 'clear' }
  | { type: 'posneg' }
  | { type: 'percentage' };

const initialState: CalculatorState = {
  currentValue: '0',
  operator: null,
  previousValue: null,
};

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    calculations: (state, action: PayloadAction<CalculatorAction>) => {
      switch (action.payload.type) {
        case 'number': {
          const { value } = action.payload;
          console.log('calculator currentValue: ', state.currentValue);
          console.log('calculator entered value: ', value);
          if (state.currentValue === '0') {
            state.currentValue = value;
          } else {
            state.currentValue += value;
          }
          break;
        }
        case 'operator': {
          const { value } = action.payload;
          if (state.operator) {
            throw new Error('Operator already set');
          } else {
            state.operator = value;
            state.previousValue = state.currentValue;
            state.currentValue = '0';
          }
          break;
        }
        case 'equal': {
          if (!state.operator) {
            throw new Error('No operator set');
          } else {
            const num1 = parseFloat(state.previousValue as string);
            const num2 = parseFloat(state.currentValue);
            let result;
            switch (state.operator) {
              case '+':
                result = num1 + num2;
                break;
              case '-':
                result = num1 - num2;
                break;
              case '*':
                result = num1 * num2;
                break;
              case '/':
                if (num2 === 0) {
                  throw new Error('Divide by zero error');
                }
                result = num1 / num2;
                break;
              default:
                throw new Error(`Unknown operator ${state.operator}`);
            }
            state.currentValue = result.toString();
            state.operator = null;
            state.previousValue = null;
          }
          break;
        }
        case 'clear': {
          state.currentValue = '0';
          state.operator = null;
          state.previousValue = null;
          break;
        }
        case 'posneg': {
          const currentValue = parseFloat(state.currentValue);
          state.currentValue = (-currentValue).toString();
          break;
        }
        case 'percentage': {
          const currentValue = parseFloat(state.currentValue);
          state.currentValue = (currentValue / 100).toString();
          break;
        }
        default:
          throw new Error(`Unknown action type ${action.type}`);
      }
    },
  },
});

export const { calculations } = calculatorSlice.actions;

export const currentValue = (state: RootState) => state.calculator.currentValue;

export default calculatorSlice.reducer;
