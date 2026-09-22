import { Pressable, StyleSheet, View } from 'react-native';

import { ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from './themed-text';

type WorkoutWidgetProps = {
    text: string;
    onPress: () => void;
    themeColor?: ThemeColor;
};

export function WorkoutWidget({
    text,
    onPress,
    themeColor,
}: WorkoutWidgetProps) {
    const theme = useTheme();

    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.buttonContainer,
                {
                    backgroundColor: theme[themeColor ?? 'workoutWidgetBackground'],
                },
            ]}
        >
            <View style={styles.square} />
            
            <ThemedText type="default" style={styles.text}>
                {text}
            </ThemedText>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 10,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
    },
    square: {
        width: 100,
        height: 100,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',  
    },
    text: {
        color: '#952267',
    }
});