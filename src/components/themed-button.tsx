import { Pressable, StyleSheet } from 'react-native';

import { ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from './themed-text';

type ThemedButtonProps = {
    text: string;
    onPress: () => void;
    themeColor?: ThemeColor;
};

export function ThemedButton({
    text,
    onPress,
    themeColor,
}: ThemedButtonProps) {
    const theme = useTheme();

    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.buttonContainer,
                {
                    backgroundColor: theme[themeColor ?? 'buttonBackground'],
                },
            ]}
        >
            <ThemedText type="default">
                {text}
            </ThemedText>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        alignItems: 'center',
    },
});