/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#172033',
    background: '#FFFCF9',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#667085',
    textAccentOrange: '#FB590E',
    textAccentBlue: '#3A86FF',
    buttonBackground: '#FB590E',
    deepOrange: '#D94708',
    softOrange: '#FFF0E8',
    dividerColor: '#ffcdb2',
    workoutWidgetBackground: '#e9e9ff',
    exerciseWidgetBackground: '#FFFFFF',
  },
  dark: {
    text: '#ffffff',
    background: '#0c0005',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
    textAccentOrange: '#FB590E',
    textAccentBlue: '#3A86FF',
    buttonBackground: '#FB590E',
    deepOrange: '#D94708',
    softOrange: '#FFF0E8',
    dividerColor: '#ffcdb2',
    workoutWidgetBackground: '#e9e9ff',
    exerciseWidgetBackground: '#e9e9ff',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = {
  sans: 'Merriweather',
  sansBold: 'MerriweatherBold',
  serif: 'Merriweather',
  serifBold: 'MerriweatherBold',
  rounded: 'Merriweather',
  mono: 'monospace',
}

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
