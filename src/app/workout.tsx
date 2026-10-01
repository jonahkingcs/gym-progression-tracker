import { useTheme } from '@/hooks/use-theme';
import { SymbolView } from 'expo-symbols';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ExerciseWidget } from '@/components/exercise-widget';
import { ThemedButton } from '@/components/themed-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

export default function Workout() {
    const theme = useTheme()

    return (
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
                            name={{ ios: 'dumbbell.fill', android: 'fitness_center', web: 'fitness_center' }}
                            size={24}
                            tintColor={theme.background}
                        />

                         <ThemedText type="code" themeColor="background">Push Day</ThemedText>

                    </ThemedView>
                </ThemedView>

                <ExerciseWidget/>

                <View style={styles.navigationContainer}>
                    <ThemedButton text="<" onPress={() => {}} themeColor="softOrange" textColor="textAccentOrange"></ThemedButton>
    
                    <ThemedText type="smallCode" themeColor="textSecondary">Swipe left or right to move between exercises.</ThemedText>
    
                    <ThemedButton text=">" onPress={() => {}} themeColor="softOrange" textColor="textAccentOrange"></ThemedButton>
                </View>

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