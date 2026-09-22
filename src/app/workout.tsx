import { useTheme } from '@/hooks/use-theme';
import { SymbolView } from 'expo-symbols';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ExerciseWidget } from '@/components/exercise-widget';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

export default function Workout() {
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

    return (
        <ScrollView
            style={[styles.scrollView, { backgroundColor: theme.background }]}
            contentInset={insets}
            contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
            <ThemedView style={styles.container}>
                <ThemedView style={styles.headingContainer}>
                    <ThemedView style={styles.counterContainer}>
                        <SymbolView
                            name={{ ios: 'return', android: 'keyboard_return', web: 'keyboard_return' }}
                            size={24}
                            tintColor={theme.deepOrange}
                        />

                        <ThemedText type="defaultCode" themeColor="text">1/6</ThemedText>

                    </ThemedView>

                    <ThemedView style={styles.workoutTitleContainer}>
                        <SymbolView
                            name={{ ios: 'dumbbell.fill', android: 'fitness_center', web: 'fitness_center' }}
                            size={24}
                            tintColor={theme.background}
                        />

                         <ThemedText type="defaultCode" themeColor="background">Push Day</ThemedText>

                    </ThemedView>
                </ThemedView>

                <ExerciseWidget/>

            </ThemedView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    container: {
        maxWidth: MaxContentWidth,
        flexGrow: 1,
        padding: Spacing.five
    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: Spacing.three,
        alignItems: 'center',
        paddingTop: Spacing.six,
        marginBottom: Spacing.four,
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
})