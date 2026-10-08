import { useTheme } from '@/hooks/use-theme';
import { SymbolView } from 'expo-symbols';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ExerciseWidget } from '@/components/exercise-widget';
import { ThemedButton } from '@/components/themed-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';
import { ExerciseData } from '@/types/workout-types';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Workout() {
    const slideAnim = useRef(new Animated.Value(0)).current;

    const theme = useTheme();

    const { user, loading } = useAuth();

    const [workoutData, setWorkoutData] = useState<ExerciseData[]>([])

    const [currentIndex, setCurrentIndex] = useState(0);

    function changeIndex(newIndex: number) {
        if (newIndex < 0 || newIndex >= workoutData.length) {
            return;
        }

        const direction = newIndex > currentIndex ? -1 : 1;

        Animated.timing(slideAnim, {
            toValue: direction,
            duration: 250,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            setCurrentIndex(newIndex);

            slideAnim.setValue(-direction);
            
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 250,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }).start();
        });
    }

    useEffect(() => {
        async function getExercises() {
            const { data, error } = await supabase
                .from('workout_exercises')
                .select(`
                    *,
                    exercises (
                        name,
                        category
                    )
                `)
                .eq('workout_id', '6dd4fef6-3d2d-4034-97dd-fc545f46a637');

            if (error) {
                console.error('Error getting exercises:', error);
                return;
            }

            const formattedData = (data ?? []).map(item => ({
                exerciseId: item.exercise_id,
                name: item.exercises.name,
                category: item.exercises.category,
                target: {
                    sets: item.target_sets,
                    weight: item.target_weight,
                    repMin: item.target_rep_min,
                    repMax: item.target_rep_max
                },
                sets: Array.from(
                    { length: item.target_sets },
                    (_, index) => ({
                        setNumber: index + 1,
                        weight: null,
                        reps: null
                    })
                )
            }));

            setWorkoutData(formattedData)
        }

        if (!loading && user) {
            getExercises();
        }
    }, [user, loading]);

    function updateWorkoutData(updatedExercise: ExerciseData) {
        setWorkoutData(workoutData =>
            workoutData.map(exercise => exercise.exerciseId === updatedExercise.exerciseId ? updatedExercise : exercise)
        );
    }

    console.log(workoutData)

    if (loading) return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ThemedText>Loading...</ThemedText>
            </SafeAreaView>
        </ThemedView>
    )

    if (user) return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ThemedView style={styles.headingContainer}>
                    <ThemedView style={styles.counterContainer}>
                        <SymbolView
                            name={{ ios: 'return', android: 'keyboard_return', web: 'keyboard_return' }}
                            size={24}
                            tintColor={theme.deepOrange}
                        />

                        <ThemedText type="code" themeColor="text">
                            {currentIndex + 1}/{workoutData.length}
                        </ThemedText>

                    </ThemedView>

                    <ThemedView style={styles.workoutTitleContainer}>
                        <SymbolView
                            name={{ ios: 'flame', android: 'mode_heat', web: 'mode_heat' }}
                            size={24}
                            tintColor={theme.background}
                        />

                         <ThemedText type="code" themeColor="background">Push Day</ThemedText>

                    </ThemedView>
                </ThemedView>


                {workoutData.length > 0 && (
                    <Animated.View
                        style={{
                            transform: [
                                {
                                    translateX: slideAnim.interpolate({
                                        inputRange: [-1, 0, 1],
                                        outputRange: [-500, 0, 500],
                                    }),
                                },
                            ],
                        }}
                    >   
                        <ExerciseWidget
                            onExerciseChange={updateWorkoutData}
                            exercise={workoutData[currentIndex]}
                        />
                    </Animated.View>
                )}

                <View style={styles.navigationContainer}>

                    <ThemedButton
                        text="←  Previous"
                        onPress={() => changeIndex(currentIndex - 1)}
                        disabled={currentIndex <= 0}
                        themeColor="softOrange"
                        textColor="textAccentOrange"
                    />

                    <ThemedText
                        style={styles.swipeInstructionText}
                        type="code"
                        themeColor="textSecondary"
                    >
                        Swipe to navigate
                    </ThemedText>

                    <ThemedButton
                        text="Next  →"
                        onPress={() => changeIndex(currentIndex + 1)}
                        disabled={currentIndex + 1 >= workoutData.length}
                        themeColor="softOrange"
                        textColor="textAccentOrange"
                    />

                </View>
            </SafeAreaView>
        </ThemedView>
    )

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ThemedView style={styles.headingContainer}>
                    <ThemedText type="subtitle" themeColor='buttonBackground'>You need to be logged in to view this page.</ThemedText>
                </ThemedView>
            </SafeAreaView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        width: '100%',
        maxWidth: MaxContentWidth,
        alignSelf: 'center',
        paddingBottom: BottomTabInset + Spacing.three,
        paddingHorizontal: Spacing.three,
        paddingTop: Spacing.seven
    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: Spacing.two,
        alignItems: 'center',
        marginBottom: Spacing.three,
    },
    workoutTitleContainer: {
        backgroundColor: '#FB590E',
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
        borderRadius: Spacing.five,
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.two
    },
    counterContainer: {
        backgroundColor: '#FFF0E8',
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
        borderRadius: Spacing.five,
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.two
    },
    sectionsWrapper: {
        gap: Spacing.two,
        paddingHorizontal: Spacing.four,
        paddingTop: Spacing.three,
    },
    inputWrapper: {
        gap: Spacing.three,
        paddingHorizontal: Spacing.four,
    },
    collapsible: {
        backgroundColor: '#000000',
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Spacing.two,
    },
    swipeInstructionText: {
        alignSelf: 'center'
    }
})