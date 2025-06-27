import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const trustedUsers = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    location: 'El Nido, Philippines',
    trustRating: 4.9,
    verified: true,
    badges: ['Top Guide', 'Safety Verified'],
  },
  {
    id: '2',
    name: 'Made Wijaya',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    location: 'Bali, Indonesia',
    trustRating: 4.8,
    verified: true,
    badges: ['Local Expert', 'Community Leader'],
  }
];

export default function TrustScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Trust Network</Text>
      {trustedUsers.map(user => (
        <View key={user.id} style={styles.userCard}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.location}>{user.location}</Text>
            <View style={styles.row}>
              <Ionicons name="star" size={16} color="#fbbf24" />
              <Text style={styles.trust}>{user.trustRating}</Text>
              {user.verified && <Ionicons name="checkmark-circle" size={16} color="#22c55e" style={{ marginLeft: 6 }} />}
            </View>
            <View style={styles.badgesRow}>
              {user.badges.map((badge, i) => (
                <View key={i} style={styles.badge}><Text style={styles.badgeText}>{badge}</Text></View>
              ))}
            </View>
          </View>
        </View>
      ))}
      <Text style={styles.sectionTitle}>Trust Guidelines</Text>
      <Text style={styles.guideline}>• Always meet in public places for first meetings</Text>
      <Text style={styles.guideline}>• Verify guide credentials before booking</Text>
      <Text style={styles.guideline}>• Read reviews and check trust ratings</Text>
      <Text style={styles.guideline}>• Report any suspicious behavior immediately</Text>
      <Text style={styles.guideline}>• Use the platform's messaging system</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1e293b', marginBottom: 12 },
  userCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 12, elevation: 2 },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  name: { fontWeight: 'bold', fontSize: 16, color: '#2563eb' },
  location: { color: '#64748b', fontSize: 13 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  trust: { color: '#2563eb', marginLeft: 4, fontWeight: 'bold' },
  badgesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  badge: { backgroundColor: '#dbeafe', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2, marginRight: 6, marginBottom: 4 },
  badgeText: { color: '#2563eb', fontWeight: 'bold', fontSize: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginVertical: 10 },
  guideline: { color: '#334155', fontSize: 14, marginBottom: 4 },
}); 