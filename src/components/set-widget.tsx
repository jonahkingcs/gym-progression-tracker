import { SymbolView } from 'expo-symbols';
import { StyleSheet, View } from 'react-native';

import { Spacing, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { ThemedInput } from './themed-input';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';


type SetWidgetProps = {
    themeColor?: ThemeColor;
};

export function SetWidget({
    themeColor,
}: SetWidgetProps) {
    const theme = useTheme();
    
    return (
        <ThemedView style={[styles.setContainer, { backgroundColor: theme[themeColor ?? 'white']}]}>
            <ThemedText type="defaultBold" themeColor="text">Set 1</ThemedText>
            <View>
                <ThemedText type="smallCode" themeColor="textSecondary">Weight (kg)</ThemedText>
                <ThemedInput onChangeText={() => {return;}}></ThemedInput>
            </View>
            <View>
                <ThemedText type="smallCode" themeColor="text">reps</ThemedText>
                <ThemedInput onChangeText={() => {return;}}></ThemedInput>
            </View>
            <View style={styles.completedContainer}>
                <SymbolView
                    name={{ 
                        ios: 'checkmark', 
                        android: 'check', 
                        web: 'check' 
                    }}
                    size={20}
                    tintColor={theme.textSecondary}
                />
                <ThemedText type="code" themeColor="textSecondary">Completed</ThemedText>
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
        flexDirection: 'row'
    }
});
