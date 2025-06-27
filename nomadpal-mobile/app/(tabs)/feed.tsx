import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useNomad, Post } from '../context/NomadContext';
import { Ionicons } from '@expo/vector-icons';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'question', label: 'Questions' },
  { id: 'offer', label: 'Offers' },
  { id: 'request', label: 'Requests' },
  { id: 'review', label: 'Reviews' },
];

export default function FeedScreen() {
  const { state } = useNomad();
  const [selected, setSelected] = useState('all');

  // For demo, use mock data if no posts
  const posts: Post[] = state.posts.length ? state.posts : [
    {
      id: '1', userId: 'user1', type: 'question', title: 'Looking for van ride to Port Barton', content: 'Anyone going tomorrow?', location: 'El Nido, Philippines', tags: ['transport'], createdAt: '', replies: [], upvotes: 3, downvotes: 0
    },
    {
      id: '2', userId: 'user2', type: 'offer', title: 'Sunrise hike guide in Bali', content: 'Local guide available for sunrise hikes.', location: 'Bali, Indonesia', tags: ['hiking'], createdAt: '', replies: [], upvotes: 5, downvotes: 0
    },
    {
      id: '3', userId: 'user3', type: 'request', title: 'Need help with border crossing', content: 'Anyone crossed Cambodia-Vietnam border recently?', location: 'Siem Reap, Cambodia', tags: ['border'], createdAt: '', replies: [], upvotes: 2, downvotes: 0
    }
  ];

  const filtered = selected === 'all' ? posts : posts.filter(p => p.type === selected);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Travel Feed</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add-circle" size={28} color="#2563eb" />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
        {filters.map(f => (
          <TouchableOpacity key={f.id} style={[styles.filterBtn, selected === f.id && styles.filterBtnActive]} onPress={() => setSelected(f.id)}>
            <Text style={[styles.filterText, selected === f.id && styles.filterTextActive]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <Ionicons name={iconForType(item.type)} size={20} color={colorForType(item.type)} />
              <Text style={styles.postType}>{item.type}</Text>
              <Text style={styles.postLocation}>{item.location}</Text>
            </View>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postContent}>{item.content}</Text>
          </View>
        )}
        style={{ marginTop: 12 }}
      />
    </View>
  );
}

function iconForType(type: string) {
  switch (type) {
    case 'question': return 'help-circle-outline';
    case 'offer': return 'bulb-outline';
    case 'request': return 'hand-right-outline';
    case 'review': return 'star-outline';
    default: return 'document-text-outline';
  }
}
function colorForType(type: string) {
  switch (type) {
    case 'question': return '#2563eb';
    case 'offer': return '#22c55e';
    case 'request': return '#f59e42';
    case 'review': return '#fbbf24';
    default: return '#64748b';
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1e293b' },
  addBtn: { padding: 4 },
  filterBar: { flexGrow: 0, marginBottom: 8 },
  filterBtn: { paddingVertical: 6, paddingHorizontal: 16, borderRadius: 16, backgroundColor: '#e0e7ef', marginRight: 8 },
  filterBtnActive: { backgroundColor: '#2563eb' },
  filterText: { color: '#334155', fontWeight: '500' },
  filterTextActive: { color: '#fff' },
  postCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, elevation: 2 },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 4, gap: 6 },
  postType: { marginLeft: 6, fontWeight: 'bold', color: '#2563eb' },
  postLocation: { marginLeft: 12, color: '#64748b', fontSize: 12 },
  postTitle: { fontWeight: 'bold', fontSize: 16, color: '#1e293b', marginBottom: 2 },
  postContent: { color: '#334155', fontSize: 14 },
}); 