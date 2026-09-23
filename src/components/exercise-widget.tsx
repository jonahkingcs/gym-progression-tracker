import { SymbolView } from 'expo-symbols';
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
        <View style={styles.container}>
            <ThemedView style={[styles.exerciseIcon, { backgroundColor: theme[themeColor ?? 'softOrange'] }]}>
            </ThemedView>
            
            <ThemedText type="defaultCode" themeColor="textSecondary">Exercise Type</ThemedText>
            <ThemedText type="title" themeColor="text">Exercise Name</ThemedText>
            <ThemedText type="default" themeColor="textSecondary">Description: i.e. great compound exercise</ThemedText>

            <ThemedView style={[styles.targetsContainer, { backgroundColor: theme[themeColor ?? 'softOrange'] }]}>

                <ThemedView style={[styles.targetContainer, { backgroundColor: theme[themeColor ?? 'softOrange']}]}>
                    <ThemedView style={[styles.exerciseIcon, { backgroundColor: theme[themeColor ?? 'background'] }]}>
                    </ThemedView>

                    <ThemedView style={[styles.targetTextContainer, { backgroundColor: theme[themeColor ?? 'softOrange']}]}>
                        <ThemedText type="defaultCode" themeColor="textSecondary">Target Weight</ThemedText>
                        <ThemedText type="subtitle" themeColor="text">24 kg</ThemedText>
                    </ThemedView>                   
                </ThemedView>

                <ThemedView style={[styles.divider, { backgroundColor: theme[themeColor ?? 'dividerColor'] }]} />

                <ThemedView style={[styles.targetContainer, { backgroundColor: theme[themeColor ?? 'softOrange']}]}>
                    <ThemedView style={[styles.exerciseIcon, { backgroundColor: theme[themeColor ?? 'background'] }]}>
                    </ThemedView>
                    
                    <ThemedView style={[styles.targetTextContainer, { backgroundColor: theme[themeColor ?? 'softOrange']}]}>
                        <ThemedText type="defaultCode" themeColor="textSecondary">Target Reps</ThemedText>
                        <ThemedText type="subtitle" themeColor="text">8 - 12</ThemedText>
                    </ThemedView>
                </ThemedView>

            </ThemedView>

            <View style={styles.setsSubtitleContainer}>
                <ThemedText type="subtitle" themeColor="text">Your Sets</ThemedText>

                <View style={styles.resetContainer}>
                    <SymbolView
                        name={{ 
                            ios: 'arrow.counterclockwise', 
                            android: 'restart_alt', 
                            web: 'restart_alt' 
                        }}
                        size={20}
                        tintColor={theme.textSecondary}
                    />
                    <ThemedText type="defaultCode" themeColor="textSecondary">Reset</ThemedText>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: Spacing.two
    },
    exerciseIcon: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF0E8',
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
        borderRadius: Spacing.three,
    },
    targetsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: Spacing.five,
        padding: Spacing.two,
        marginTop: Spacing.four,
        marginBottom: Spacing.four
    },
    targetContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: Spacing.four,
        padding: Spacing.two,
        borderRadius: Spacing.five
    },
    targetTextContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: Spacing.two
    },
    divider: {
        width: 1,
        height: '60%',
        marginHorizontal: Spacing.one,
        opacity: 0.8,
    },
    setsSubtitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    resetContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.two
    }
});
