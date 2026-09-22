import { StyleSheet, View } from 'react-native';

import { Spacing, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { useState } from 'react';

type ExerciseWidgetProps = {
    themeColor?: ThemeColor;
};

export function ExerciseWidget({
    themeColor,
}: ExerciseWidgetProps) {
    const theme = useTheme();

    const [weight, setWeight] = useState('');

    const handleWeightChange = (text: string) => {
        setWeight(text);
        console.log('Weight input:', text);
    }
    
    return (
        <View>
            <ThemedView style={[styles.exerciseIcon, { backgroundColor: theme[themeColor ?? 'softOrange'] }]}>
            </ThemedView>
            <ThemedText type="default" themeColor="textSecondary">Exercise Type</ThemedText>
            <ThemedText type="subtitle" themeColor="text">Exercise Name</ThemedText>
            <ThemedText type="default" themeColor="textSecondary">Description: i.e. great compound exercise</ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    exerciseIcon: {
        width: 100,
        height: 100,
        backgroundColor: '#FFF0E8',
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
        borderRadius: Spacing.five,
    }
});
