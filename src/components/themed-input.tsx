import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ThemedInputProps = {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    themeColor?: ThemeColor;
}

export function ThemedInput({ placeholder, value, onChangeText, themeColor }: ThemedInputProps & { onChangeText: (text: string) => void }) { 
    const theme = useTheme();
  
    return (
        <View style={styles.widgetContainer}>
            <TextInput
                style={[
                    styles.inputContainer,
                    { color: theme[themeColor ?? 'text'] },
                    { backgroundColor: theme['background'] },
                ]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor={theme.textSecondary}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    widgetContainer: {
        padding: 10,
        marginVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    inputContainer: {
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        fontFamily: Fonts.sans,
        fontSize: 16,
        lineHeight: 24,
    },
})