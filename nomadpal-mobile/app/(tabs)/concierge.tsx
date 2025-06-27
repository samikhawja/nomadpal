import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const initialChat = [
  { id: '1', type: 'ai', content: "Hi! I'm your NomadPal AI concierge. How can I help you plan your trip today?" }
];

const quickActions = [
  { icon: 'bus-outline', label: 'Find Transport', action: 'I need help finding transportation options' },
  { icon: 'walk-outline', label: 'Plan Activities', action: 'What activities do you recommend?' },
  { icon: 'cash-outline', label: 'Budget Tips', action: 'Help me plan my budget for this trip' },
  { icon: 'people-outline', label: 'Find Buddies', action: 'I\'m looking for travel companions' },
];

export default function ConciergeScreen() {
  const [chat, setChat] = useState(initialChat);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    setChat([...chat, { id: Date.now().toString(), type: 'user', content: input }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setChat(c => [...c, { id: (Date.now()+1).toString(), type: 'ai', content: 'This is a mock AI response. (Integrate real AI here!)' }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Concierge</Text>
      <FlatList
        data={chat}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.msgRow, item.type === 'user' ? styles.msgRowUser : styles.msgRowAI]}>
            <View style={[styles.msgBubble, item.type === 'user' ? styles.msgBubbleUser : styles.msgBubbleAI]}>
              <Text style={item.type === 'user' ? styles.msgTextUser : styles.msgTextAI}>{item.content}</Text>
            </View>
          </View>
        )}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: 12 }}
      />
      {isTyping && <Text style={styles.typing}>AI is typing...</Text>}
      <View style={styles.quickRow}>
        {quickActions.map((q, i) => (
          <TouchableOpacity key={i} style={styles.quickBtn} onPress={() => setInput(q.action)}>
            <Ionicons name={q.icon as any} size={20} color="#2563eb" />
            <Text style={styles.quickLabel}>{q.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask me anything about your trip..."
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1e293b', marginBottom: 8 },
  msgRow: { flexDirection: 'row', marginBottom: 8 },
  msgRowUser: { justifyContent: 'flex-end' },
  msgRowAI: { justifyContent: 'flex-start' },
  msgBubble: { maxWidth: '75%', padding: 10, borderRadius: 16 },
  msgBubbleUser: { backgroundColor: '#2563eb', borderTopRightRadius: 4 },
  msgBubbleAI: { backgroundColor: '#e0e7ef', borderTopLeftRadius: 4 },
  msgTextUser: { color: '#fff' },
  msgTextAI: { color: '#334155' },
  typing: { color: '#64748b', fontStyle: 'italic', marginBottom: 8, textAlign: 'center' },
  quickRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8, justifyContent: 'center' },
  quickBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#dbeafe', borderRadius: 16, paddingHorizontal: 10, paddingVertical: 6, margin: 4 },
  quickLabel: { color: '#2563eb', fontWeight: 'bold', marginLeft: 4 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  input: { flex: 1, backgroundColor: '#fff', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 10, fontSize: 15, marginRight: 8, borderWidth: 1, borderColor: '#e0e7ef' },
  sendBtn: { backgroundColor: '#2563eb', borderRadius: 16, padding: 10 },
}); 