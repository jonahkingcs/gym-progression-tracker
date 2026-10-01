import { SymbolView } from 'expo-symbols';
import { StyleSheet, View } from 'react-native';

import { Spacing, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { SetWidget } from './set-widget';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';


type ExerciseWidgetProps = {
    themeColor?: ThemeColor;
};

export function ExerciseWidget({
    themeColor,
}: ExerciseWidgetProps) {
    const theme = useTheme();
    
    return (
        <View style={styles.container}>
            <ThemedView style={[styles.exerciseIcon, { backgroundColor: theme[themeColor ?? 'softOrange'] }]}>
                <SymbolView
                    name={{ ios: 'figure.mixed.cardio', android: 'exercise', web: 'exercise' }}
                    size={48}
                    tintColor={theme.textAccentOrange}
                />
            </ThemedView>
            
            <ThemedText type="code" themeColor="textSecondary">Exercise Type</ThemedText>
            <ThemedText type="title" themeColor="text">Exercise Name</ThemedText>
            <ThemedText type="code" themeColor="textSecondary">Description: i.e. great compound exercise</ThemedText>

            <ThemedView style={[styles.targetsContainer, { backgroundColor: theme[themeColor ?? 'softOrange'] }]}>

                <ThemedView style={[styles.targetContainer, { backgroundColor: theme[themeColor ?? 'softOrange']}]}>
                    <ThemedView style={[styles.exerciseIcon, { backgroundColor: theme[themeColor ?? 'background'] }]}>
                        <SymbolView
                            name={{ ios: 'figure.strengthtraining.traditional', android: 'weight', web: 'weight' }}
                            size={48}
                            tintColor={theme.textAccentOrange}
                        />
                    </ThemedView>

                    <ThemedView style={[styles.targetTextContainer, { backgroundColor: theme[themeColor ?? 'softOrange']}]}>
                        <ThemedText type="code" themeColor="textSecondary">Target Weight</ThemedText>
                        <ThemedText type="subtitle" themeColor="text">24 kg</ThemedText>
                    </ThemedView>                   
                </ThemedView>

                <ThemedView style={[styles.divider, { backgroundColor: theme[themeColor ?? 'dividerColor'] }]} />

                <ThemedView style={[styles.targetContainer, { backgroundColor: theme[themeColor ?? 'softOrange']}]}>
                    <ThemedView style={[styles.exerciseIcon, { backgroundColor: theme[themeColor ?? 'background'] }]}>
                        <SymbolView
                            name={{ ios: 'target', android: 'target', web: 'target' }}
                            size={48}
                            tintColor={theme.textAccentOrange}
                        />
                    </ThemedView>
                    
                    <ThemedView style={[styles.targetTextContainer, { backgroundColor: theme[themeColor ?? 'softOrange']}]}>
                        <ThemedText type="code" themeColor="textSecondary">Target Reps</ThemedText>
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
                    <ThemedText type="code" themeColor="textSecondary">Reset</ThemedText>
                </View>
            </View>

            <View style={styles.setsContainer}>
                <SetWidget></SetWidget>
                <SetWidget></SetWidget>
                <SetWidget></SetWidget>
            </View>

            <ThemedView style={[
                styles.tipContainer,
                { backgroundColor: theme[themeColor ?? 'softOrange']}
            ]}>
                <ThemedView style={[styles.circleIcon, { backgroundColor: theme[themeColor ?? 'buttonBackground']}]}>
                    <ThemedText type="subtitle" themeColor="background">i</ThemedText>
                </ThemedView>

                <View style={styles.tipTextContainer}>
                    <View style={styles.tipText}>
                        <ThemedText type="code" themeColor="textAccentOrange">Tip</ThemedText>
                        <ThemedText type="code" themeColor="textSecondary">Since you hit 12 reps on all three sets last week, it is time to increase your weight.</ThemedText>
                    </View>

                    <SymbolView
                        name={{ ios: 'return', android: 'keyboard_return', web: 'keyboard_return' }}
                        size={24}
                        tintColor={theme.textAccentOrange}
                    />
                </View>
            </ThemedView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: Spacing.two,
        flexDirection: 'column'
    },
    exerciseIcon: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF0E8',
        borderRadius: Spacing.three,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    targetsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: Spacing.five,
        padding: Spacing.two,
        marginTop: Spacing.two,
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
    },
    setsContainer: {
        flexDirection: 'row',
        gap: Spacing.two,
        justifyContent: 'flex-start'
    },
    tipContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: Spacing.five,
        paddingHorizontal: Spacing.four,
        paddingVertical: Spacing.three,
        marginTop: Spacing.two,
        marginBottom: Spacing.four,
        gap: Spacing.three
    },
    circleIcon: {
        width: 30,
        height: 30,
        borderRadius: Spacing.four,
        flexDirection: 'column',
        alignItems: 'center'
    },
    tipTextContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    tipText: {
        marginRight: Spacing.four,
        flex: 1
    },
});
