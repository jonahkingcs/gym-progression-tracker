import { Alert, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedButton } from '@/components/themed-button';
import { ThemedInput } from '@/components/themed-input';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { useAuth } from '@/context/auth-context';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';

export default function HomeScreen() {
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, loading } = useAuth();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      if (Platform.OS === 'web') {
        window.alert(`Login failed: ${error.message}`);
      } else {
        Alert.alert('Login failed', error.message);
      }

      return;
    }

    if (Platform.OS === 'web') {
      window.alert(`Success! Logged in as ${data.user.email}`);
    } else {
      Alert.alert('Success', `Logged in as ${data.user.email}`);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log('Error logging out:', error.message);
      return;
    }

    console.log('Logged out');
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <ThemedText>Loading...</ThemedText>
        </SafeAreaView>
      </ThemedView>
    );
  }

  if (user) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <ThemedView style={styles.loginContainer}>
            <ThemedText type="title">
              You're logged in!
            </ThemedText>

            <ThemedText>
              Logged in as:
            </ThemedText>

            <ThemedText>
              {user.email}
            </ThemedText>

            <ThemedButton
              text="Log out"
              onPress={handleLogout}
            />
          </ThemedView>

          {Platform.OS === 'web' && <WebBadge />}
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.loginContainer}>
          <ThemedText type="title">
            Track Your Gym Progression
          </ThemedText>

          <ThemedText>
            Log in to your account
          </ThemedText>

          <ThemedInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />

          <ThemedInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />

          <ThemedButton text="Log in" onPress={handleLogin} />

        </ThemedView>

        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
    marginTop: Spacing.seven
  },
    loginContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
  },
});
