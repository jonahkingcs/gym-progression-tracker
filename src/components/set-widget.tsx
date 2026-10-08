import { SymbolView } from 'expo-symbols';
import { StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { SetWidgetProps } from '@/types/workout-types';
import { ThemedInput } from './themed-input';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

export function SetWidget({
    themeColor,
    setData,
    onSetChange
}: SetWidgetProps) {
    const theme = useTheme();

    function handleWeightChange(text: string) {
        onSetChange({
            ...setData,
            weight: text === '' ? null : Number(text),
        });
    }

    function handleRepsChange(text: string) {
        onSetChange({
            ...setData,
            reps: text === '' ? null : Number(text),
        });
    }

    const isComplete = setData.weight !== null && setData.reps !== null;
    
    return (
        <ThemedView style={[styles.setContainer, { backgroundColor: theme[themeColor ?? 'white']}]}>
            <ThemedText type="defaultBold" themeColor="text">Set {setData.setNumber}</ThemedText>
            <View>
                <ThemedText type="smallCode" themeColor="textSecondary">Weight (kg)</ThemedText>
                <ThemedInput
                    value={setData.weight?.toString() ?? ''}
                    inputType="decimal"
                    onChangeText={handleWeightChange}
                />
            </View>
            <View>
                <ThemedText type="smallCode" themeColor="text">reps</ThemedText>
                <ThemedInput
                    value={setData.reps?.toString() ?? ''}
                    inputType="integer"
                    onChangeText={handleRepsChange}
                />
            </View>
            <View style={styles.completedContainer}>
                {isComplete ? (
                    <>
                        <SymbolView
                            name={{ 
                                ios: 'checkmark', 
                                android: 'check', 
                                web: 'check' 
                            }}
                            size={20}
                            tintColor={theme.completion}
                        />
                        <ThemedText type="code" themeColor="completion">Completed</ThemedText>
                    </>
                ) : (
                    <>
                        <SymbolView
                            name={{ 
                                ios: 'xmark.circle', 
                                android: 'cancel', 
                                web: 'cancel' 
                            }}
                            size={20}
                            tintColor={theme.textSecondary}
                        />
                        <ThemedText type="code" themeColor="textSecondary">Incomplete</ThemedText>
                    </>
                )}
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    setContainer: {
        flex: 1,
        borderRadius: Spacing.four,
        padding: Spacing.three,
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: Spacing.two,
        borderWidth: 1,
        borderColor: '#F0F0F3',
    },
    completedContainer: {
        flexDirection: 'row',
        gap: Spacing.one
    }
});
