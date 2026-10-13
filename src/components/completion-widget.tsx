import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { ExerciseData } from '@/types/workout-types';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

type CompletionWidgetProps = {
    workoutData: ExerciseData[];
    onComplete: (notes: string) => void;
    onGoBack: (exerciseIndex: number) => void;
};

export function CompletionWidget({
    workoutData,
    onComplete,
    onGoBack,
}: CompletionWidgetProps) {
    const theme = useTheme();

    const [notes, setNotes] = useState('');
    const [showIncompleteModal, setShowIncompleteModal] = useState(false)

    const incompleteExercises = workoutData
        .map((exercise, exerciseIndex) => {
            const incompleteSets = exercise.sets.filter(
                set => set.weight === null || set.reps === null
            );

            return {
                exercise,
                exerciseIndex,
                incompleteSets,
            };
        })
        .filter(item => item.incompleteSets.length > 0);

    function handleComplete() {
        if (incompleteExercises.length > 0) {
            setShowIncompleteModal(true);
            return;
        }

        onComplete(notes);
    }

    function handleGoBack() {
        if (incompleteExercises.length === 0) {
            return;
        }

        const firstIncompleteExercise = incompleteExercises[0];

        setShowIncompleteModal(false);

        onGoBack(firstIncompleteExercise.exerciseIndex);
    }

    function handleSubmitAnyway() {
        setShowIncompleteModal(false);

        onComplete(notes);
    }

    function completionPercentage() {
        const percentage = (workoutData.length - incompleteExercises.length) / workoutData.length * 100
        console.log(percentage)

        return percentage
    }
    
    return (
        <View style={styles.container}>
            <ThemedView style={[styles.exerciseIcon, { backgroundColor: theme['softOrange'] }]}>
                <SymbolView
                    name={{ ios: 'figure.mixed.cardio', android: 'exercise', web: 'exercise' }}
                    size={48}
                    tintColor={theme.textAccentOrange}
                />
            </ThemedView>
            
            <ThemedText type="code" themeColor="textSecondary">WORKOUT WRAP-UP</ThemedText>
            <ThemedText type="title" themeColor="text">Strong Work</ThemedText>
            <ThemedText type="code" themeColor="textSecondary">Take a moment to reflect on today's session</ThemedText>

            <ThemedView style={[styles.targetsContainer, { backgroundColor: theme['softOrange'] }]}>

                
                <ThemedText type="code" themeColor="textSecondary">SESSION PROGRESS</ThemedText>

                <ThemedView style={[styles.targetContainer, { backgroundColor: theme['softOrange']}]}>
                    <View style={[styles.exerciseStatsContainer]}>
                        <ThemedText type="title" themeColor="text">{workoutData.length - incompleteExercises.length}</ThemedText>
                        <View style={[styles.secondaryText]}>
                            <ThemedText type="code" themeColor="textSecondary">of </ThemedText>    
                            <ThemedText type="defaultBold" themeColor="text">{workoutData.length}</ThemedText>    
                            <ThemedText type="code" themeColor="textSecondary"> exercises</ThemedText>    
                        </View>
                    </View>
                   
                    <ThemedView style={[styles.divider, { backgroundColor: theme['dividerColor'] }]} />

                    <View style={[styles.exerciseStatsContainer]}>
                        <ThemedText type="title" themeColor="text">15</ThemedText>
                        <View style={[styles.secondaryText]}>
                            <ThemedText type="code" themeColor="textSecondary">of </ThemedText>    
                            <ThemedText type="code" themeColor="text">18</ThemedText>    
                            <ThemedText type="code" themeColor="textSecondary"> sets completed</ThemedText>    
                        </View>
                    </View>
                </ThemedView>

                <View style={[styles.progressBar]}>
                    <View style={[styles.completedProgress, { width: `${completionPercentage()}%` }]}></View>
                </View>

                <ThemedText type="code" themeColor="textSecondary">You're nearly there.</ThemedText>
            </ThemedView>

            <ThemedView style={[
                styles.tipContainer,
                { backgroundColor: theme['softOrange']}
            ]}>
                <ThemedText type="subtitle" themeColor="text">How did it feel?</ThemedText>

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
        flexDirection: 'column',
        alignItems: 'flex-start',
        borderRadius: Spacing.three,
        padding: Spacing.three,
        marginTop: Spacing.two,
        paddingHorizontal: Spacing.four,
        marginBottom: Spacing.four,
        gap: Spacing.two,
        width: '100%'
    },
    targetContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: Spacing.two,
    },
    exerciseStatsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    secondaryText: {
        flexDirection: 'row',
        marginTop: Spacing.one,
        marginLeft: Spacing.two
    },
    divider: {
        width: 1,
        height: '60%',
        marginHorizontal: Spacing.one,
        opacity: 0.8,
    },
    progressBar: {
        backgroundColor: '#f7daca',
        height: Spacing.two,
        borderRadius: Spacing.four,
        width: '100%',
        marginTop: Spacing.two
    },
    completedProgress: {
        borderRadius: Spacing.four,
        height: Spacing.two,
        backgroundColor: '#FB590E',
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
        flexDirection: 'column',
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
