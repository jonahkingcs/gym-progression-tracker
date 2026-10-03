import { useTheme } from '@/hooks/use-theme';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WorkoutWidget } from '@/components/workout-widget';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function WorkoutsScreen() {
    const safeAreaInsets = useSafeAreaInsets();
    const insets = {
        ...safeAreaInsets,
        bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
    };
    const theme = useTheme();

    const contentPlatformStyle = Platform.select({
        android: {
            paddingTop: insets.top,
            paddingLeft: insets.left,
            paddingRight: insets.right,
            paddingBottom: insets.bottom,
        },
        web: {
            paddingTop: Spacing.six,
            paddingBottom: Spacing.four,
        },
    });

    const { user, loading } = useAuth();

    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        async function getWorkouts() {
            const { data, error } = await supabase
                .from('workouts')
                .select()
                .eq('user_id', user.id);

            if (error) {
                console.error('ERROR');
                return;
            }

            setWorkouts(data);
        }

        if (!loading && user) {
            getWorkouts();
        }
    }, [user, loading]);

    console.log(workouts[0]);

    return (
        <ScrollView
            style={[styles.scrollView, { backgroundColor: theme.background }]}
            contentInset={insets}
            contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
            <ThemedView style={styles.container}>
                <ThemedView style={styles.headingContainer}>
                    <ThemedText type="subtitle">Workouts</ThemedText>
                    <ThemedText themeColor="textSecondary">
                        Choose a workout to track your progress and view your stats.
                    </ThemedText>
                </ThemedView>

                <ThemedView style={styles.sectionsWrapper}>
                    {workouts.map((workout, index) => (
                        <WorkoutWidget
                            key={index}
                            text={workout.name}
                            onPress={() => {}}
                        />
                    ))}
                </ThemedView>
            </ThemedView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
        alignItems: 'center',
    },
    container: {
        width: '100%',
        maxWidth: MaxContentWidth,
    },
    headingContainer: {
        gap: Spacing.three,
        alignItems: 'flex-start',
        paddingHorizontal: Spacing.four,
        paddingTop: Spacing.six,
        marginBottom: Spacing.four,
    },
    sectionsWrapper: {
        gap: Spacing.two,
        paddingHorizontal: Spacing.four,
        paddingTop: Spacing.three,
    }
})