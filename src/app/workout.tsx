import { useTheme } from '@/hooks/use-theme';
import { SymbolView } from 'expo-symbols';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CompletionWidget } from '@/components/completion-widget';
import { ExerciseWidget } from '@/components/exercise-widget';
import { ThemedButton } from '@/components/themed-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';
import { ExerciseData, ExerciseTableRow } from '@/types/workout-types';
import { useEffect, useRef, useState } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { supabase } from '../lib/supabase';

export default function Workout() {
    const slideAnim = useRef(new Animated.Value(0)).current;

    const theme = useTheme();

    const { user, loading } = useAuth();

    const [workoutData, setWorkoutData] = useState<ExerciseData[]>([])

    const [currentIndex, setCurrentIndex] = useState(0);

    function changeIndex(newIndex: number) {
        if (newIndex < 0 || newIndex > workoutData.length) {
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
            
            try {
                const formattedData = (data ?? []).map((item: ExerciseTableRow) => ({
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
            } catch (error) {
                console.error('Data formatted incorrectly:', error);
            }
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

    const swipeGesture = Gesture.Pan()
    .activeOffsetX([-20, 20])
    .failOffsetY([-15, 15])
    .onEnd((event) => {
        if (event.translationX < -60) {
            // Swiped left: move to the next exercise/page
            changeIndex(currentIndex + 1);
        } else if (event.translationX > 60) {
            // Swiped right: move to the previous exercise/page
            changeIndex(currentIndex - 1);
        }
    });

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

                
                {(workoutData.length > 0) && (
                    <GestureDetector gesture={swipeGesture}>
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
                            {(currentIndex >= 0 && currentIndex < workoutData.length) && (
                                <ExerciseWidget
                                    onExerciseChange={updateWorkoutData}
                                    exercise={workoutData[currentIndex]}
                                />
                            )}
                            {(currentIndex == workoutData.length && workoutData.length > 0) && (
                                <CompletionWidget
                                    workoutData={workoutData}
                                    onComplete={() => {return}}
                                    onGoBack={(index) => {setCurrentIndex(index)}}
                                />
                            )}
                        </Animated.View>
                    </GestureDetector>
                )}

                <View style={styles.navigationContainer}>

                    <View style={styles.navigationButton}>
                        <ThemedButton
                            text="←  Previous"
                            onPress={() => changeIndex(currentIndex - 1)}
                            disabled={currentIndex <= 0}
                            themeColor="softOrange"
                            textColor="textAccentOrange"
                        />
                    </View>

                    <ThemedText
                        style={styles.swipeInstructionText}
                        type="code"
                        themeColor="textSecondary"
                    >
                        Swipe to navigate
                    </ThemedText>

                    <View style={styles.navigationButton}>
                        {currentIndex < workoutData.length - 1 &&
                            <ThemedButton
                                text="Next  →"
                                onPress={() => changeIndex(currentIndex + 1)}
                                themeColor="softOrange"
                                textColor="textAccentOrange"
                            />
                        }

                        {currentIndex === workoutData.length - 1 &&
                            <ThemedButton
                                text="Complete  →"
                                onPress={() => changeIndex(currentIndex + 1)}
                                themeColor="softOrange"
                                textColor="textAccentOrange"
                            />
                        }
                    </View>

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
        gap: Spacing.six
    },
    swipeInstructionText: {
        alignSelf: 'center'
    },
    navigationButton: {
        flex: 1,
    }
})