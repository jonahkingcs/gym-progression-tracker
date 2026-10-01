import { StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'defaultBold' | 'smallCode' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'] },
        type === 'default' && styles.default,
        type === 'defaultBold' && styles.defaultBold,
        type === 'smallCode' && styles.smallCode,
        type === 'title' && styles.title,
        type === 'small' && styles.small,
        type === 'smallBold' && styles.smallBold,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        type === 'linkPrimary' && styles.linkPrimary,
        type === 'code' && styles.code,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontFamily: Fonts.sans,
    fontSize: 10,
    lineHeight: 16,
  },

  smallBold: {
    fontFamily: Fonts.sansBold,
    fontSize: 10,
    lineHeight: 16,
  },

  default: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 20,
  },

  defaultBold: {
    fontFamily: Fonts.sansBold,
    fontSize: 12,
    lineHeight: 20
  },

  smallCode: {
    fontFamily: Fonts.mono,
    fontSize: 10,
    lineHeight: 16
  },

  title: {
    fontFamily: Fonts.sansBold,
    fontSize: 36,
    lineHeight: 44,
  },

  subtitle: {
    fontFamily: Fonts.sansBold,
    fontSize: 24,
    lineHeight: 30,
  },

  link: {
    fontFamily: Fonts.sans,
    lineHeight: 30,
    fontSize: 10,
  },

  linkPrimary: {
    fontFamily: Fonts.sans,
    lineHeight: 30,
    fontSize: 10,
    color: '#3c87f7',
  },

  code: {
    fontFamily: Fonts.mono,
    fontSize: 12,
    lineHeight: 20,
  },
});
