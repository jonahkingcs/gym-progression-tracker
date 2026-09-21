import { useTheme } from '@/hooks/use-theme';
import { useState } from 'react';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedButton } from '@/components/themed-button';
import { ThemedInput } from '@/components/themed-input';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

export default function Profile() {
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

    const [exerciseName, setExerciseName] = useState('');
    const [exerciseWeight, setExerciseWeight] = useState(0);
    const [exercises , setExercises] = useState<{ name: string, weight: number }[]>([]);

    const onSubmitExercise = () => {
        if (exerciseName.trim() === '') {
            return;
        }

        setExercises([...exercises, { name: exerciseName.trim(), weight: exerciseWeight }]);
        setExerciseName('');
        setExerciseWeight(0);
    }

    return (
        <ScrollView
            style={[styles.scrollView, { backgroundColor: theme.background }]}
            contentInset={insets}
            contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
            <ThemedView style={styles.container}>
                <ThemedView style={styles.headingContainer}>
                    <ThemedText type="subtitle">Profile</ThemedText>
                    <ThemedText themeColor="textSecondary">
                        View your stats and progress here.
                    </ThemedText>
                </ThemedView>
                
                <ThemedView style={styles.inputWrapper}>
                    <ThemedInput  placeholder="Exercise Name" value={exerciseName} onChangeText={setExerciseName} />
                    <ThemedInput placeholder="Exercise Weight" value={exerciseWeight.toString()} onChangeText={(text) => setExerciseWeight(parseFloat(text) || 0)} />
                    <ThemedButton text="Submit" onPress={onSubmitExercise} />
                </ThemedView>

                <ThemedView style={styles.sectionsWrapper}>
                    <Collapsible title="Stats">
                        <ThemedText>Stats content goes here.</ThemedText>
                        {exercises.map((exercise, index) => (
                            <ThemedText key={index} type="small">{index + 1}. {exercise.name} - {exercise.weight}kg</ThemedText>
                        ))}
                    </Collapsible>

                    <Collapsible title="Progress">
                        <ThemedText>Progress content goes here.</ThemedText>
                    </Collapsible>
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
        flexDirection: 'row',
        justifyContent: 'center',
    },
    container: {
        maxWidth: MaxContentWidth,
        flexGrow: 1,
    },
    headingContainer: {
        gap: Spacing.three,
        alignItems: 'flex-start',
        paddingHorizontal: Spacing.four,
        paddingTop: Spacing.six,
        marginBottom: Spacing.four,
    },
    sectionsWrapper: {
        gap: Spacing.five,
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