import { useTheme } from '@/hooks/use-theme';
import { SymbolView } from 'expo-symbols';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ExerciseWidget } from '@/components/exercise-widget';
import { ThemedButton } from '@/components/themed-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Workout() {
    const theme = useTheme();

    const { user, loading } = useAuth();

    const [exercises, setExercises] = useState([])

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

            setExercises(data);
        }

        if (!loading && user) {
            getExercises();
        }
    }, [user, loading]);

    console.log(exercises);

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

                        <ThemedText type="code" themeColor="text">1/6</ThemedText>

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


                {exercises.length > 0 && (
                    <ExerciseWidget
                        exercise={{
                            name: exercises[0].exercises.name,
                            category: exercises[0].exercises.category,
                            target_sets: exercises[0].target_sets,
                            target_weight: exercises[0].target_weight,
                            target_rep_min: exercises[0].target_rep_min,
                            target_rep_max: exercises[0].target_rep_max,
                        }}
                    />
                )}

                <View style={styles.navigationContainer}>
                    <ThemedButton text="<" onPress={() => {}} themeColor="softOrange" textColor="textAccentOrange"></ThemedButton>
    
                    <ThemedText type="smallCode" themeColor="textSecondary">Swipe left or right to move between exercises.</ThemedText>
    
                    <ThemedButton text=">" onPress={() => {}} themeColor="softOrange" textColor="textAccentOrange"></ThemedButton>
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
        alignItems: 'center'
    }
})