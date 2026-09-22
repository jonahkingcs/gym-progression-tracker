import { useTheme } from '@/hooks/use-theme';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WorkoutWidget } from '@/components/workout-widget';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

export default function WorkoutsScreen() {
    const safeAreaInsets = useSafeAreaInsets();
    const insets = {
        ...safeAreaInsets,
        bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
    };
    const theme = useTheme()

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

    const workouts = [
        { name: 'Monday - Push Day 1', exercises: [] },
        { name: 'Tuesday - Pull Day 1', exercises: [] },
        { name: 'Thursday - Push Day 2', exercises: [] },
        { name: 'Friday - Pull Day 2', exercises: [] },
    ];

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