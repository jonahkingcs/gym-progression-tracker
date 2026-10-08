import { Fonts, Spacing, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

type ThemedInputProps = {
    placeholder?: string;
    value?: string;
    onChangeText: (text: string) => void;
    themeColor?: ThemeColor;
    backgroundColor?: ThemeColor;
    inputType?: 'text' | 'integer' | 'decimal';
}

export function ThemedInput({
    placeholder,
    value,
    onChangeText,
    themeColor,
    backgroundColor,
    inputType = 'text',
}: ThemedInputProps) {
    const theme = useTheme();

    function handleChange(text: string) {
        if (inputType === 'integer') {
            if (/^\d*$/.test(text)) {
                onChangeText(text);
            } else {
                onChangeText("");
            }
            return;
        }

        if (inputType === 'decimal') {
            if (/^\d*\.?\d*$/.test(text)) {
                onChangeText(text);
            } else {
                onChangeText("");
            }
            return;
        }

        onChangeText(text);
    }
  
    return (
        <View style={styles.widgetContainer}>
            <TextInput
                style={[
                    styles.inputContainer,
                    { color: theme[themeColor ?? 'text'] },
                    { backgroundColor: theme[backgroundColor ?? 'backgroundElement'] },
                ]}
                placeholder={placeholder}
                value={value}
                onChangeText={handleChange}
                placeholderTextColor={theme.textSecondary}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    widgetContainer: {
        borderRadius: Spacing.four,
        alignItems: 'center',
        width: '100%',
    },
    inputContainer: {
        width: '100%',
        borderRadius: Spacing.three,
        padding: Spacing.two,
        marginVertical: Spacing.two,
        fontFamily: Fonts.sans,
        fontSize: 12,
        lineHeight: 20,
    },
})