import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNomad } from '../context/NomadContext';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { state, dispatch } = useNomad();
  const router = useRouter();

  useEffect(() => {
    if (!state.currentUser) {
      router.replace('/signin');
    }
  }, [state.currentUser]);

  if (!state.currentUser) return null;
  const user = state.currentUser;

  const handleSignOut = () => {
    dispatch({ type: 'SET_USER', payload: null });
    router.replace('/signin');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.name}>{user.name}</Text>
          <View style={styles.row}>
            <Ionicons name="location-outline" size={16} color="#2563eb" />
            <Text style={styles.location}>{user.location}</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="star" size={16} color="#fbbf24" />
            <Text style={styles.trust}>{user.trustRating} Trust</Text>
            {user.verified && <Ionicons name="checkmark-circle" size={16} color="#22c55e" style={{ marginLeft: 6 }} />}
          </View>
        </View>
      </View>
      <Text style={styles.bio}>{user.bio || ''}</Text>
      <View style={styles.badgesRow}>
        {Array.isArray(user.badges) && user.badges.map((badge: string, i: number) => (
          <View key={i} style={styles.badge}><Text style={styles.badgeText}>{badge}</Text></View>
        ))}
      </View>
      <Text style={styles.sectionTitle}>Recent Reviews</Text>
      {Array.isArray(user.reviews) && user.reviews.map((r: any) => (
        <View key={r.id} style={styles.reviewCard}>
          <View style={styles.row}>
            <Text style={styles.reviewer}>{r.reviewer || r.reviewerId}</Text>
            <View style={styles.row}>
              {[...Array(5)].map((_, i) => (
                <Ionicons key={i} name="star" size={14} color={i < r.rating ? '#fbbf24' : '#e5e7eb'} />
              ))}
            </View>
          </View>
          <Text style={styles.reviewComment}>{r.comment}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatar: { width: 72, height: 72, borderRadius: 36, marginRight: 16 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#1e293b' },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  location: { color: '#64748b', marginLeft: 4 },
  trust: { color: '#2563eb', marginLeft: 4, fontWeight: 'bold' },
  bio: { color: '#334155', fontSize: 15, marginBottom: 12 },
  badgesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  badge: { backgroundColor: '#dbeafe', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4, marginRight: 8, marginBottom: 8 },
  badgeText: { color: '#2563eb', fontWeight: 'bold', fontSize: 13 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginVertical: 8 },
  reviewCard: { backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 10, elevation: 1 },
  reviewer: { fontWeight: 'bold', color: '#2563eb', marginRight: 8 },
  reviewComment: { color: '#334155', marginTop: 4 },
  signOutBtn: { backgroundColor: '#ef4444', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 24 },
  signOutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
}); 