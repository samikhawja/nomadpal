import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNomad } from './context/NomadContext';
import { useRouter } from 'expo-router';

export default function SignInScreen() {
  const { state, dispatch } = useNomad();
  const router = useRouter();

  useEffect(() => {
    if (state.currentUser) {
      router.replace('/(tabs)/profile');
    }
  }, [state.currentUser]);

  const handleSignIn = (user) => {
    dispatch({ type: 'SET_USER', payload: user });
    router.replace('/(tabs)/profile');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Choose a demo user to sign in:</Text>
      {state.users.map(user => (
        <TouchableOpacity key={user.id} style={styles.userCard} onPress={() => handleSignIn(user)}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.location}>{user.location}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#f8fafc' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2563eb', marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#334155', marginBottom: 24 },
  userCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, width: 280, elevation: 2 },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 16 },
  name: { fontWeight: 'bold', fontSize: 16, color: '#1e293b' },
  location: { color: '#64748b', fontSize: 13 },
}); 