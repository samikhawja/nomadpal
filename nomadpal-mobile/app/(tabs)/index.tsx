import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNomad } from '../context/NomadContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const { state } = useNomad();

  const features = [
    {
      icon: 'people-outline',
      title: 'Community-Driven',
      description: 'Get real recommendations from verified travelers and locals in your area.'
    },
    {
      icon: 'shield-checkmark-outline',
      title: 'Trust Layer',
      description: 'Built-in reputation system with verified reviews and safety checks.'
    },
    {
      icon: 'flash-outline',
      title: 'AI Concierge',
      description: 'Smart planning assistance for routes, bookings, and spontaneous adventures.'
    },
    {
      icon: 'chatbubble-ellipses-outline',
      title: 'Real-Time Help',
      description: 'Ask questions and get instant responses from the community.'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <LinearGradient colors={["#2563eb", "#6366f1"]} style={styles.hero}>
        <Text style={styles.heroTitle}>Your Trusted Travel{"\n"}<Text style={styles.heroTitleAccent}>Companion</Text></Text>
        <Text style={styles.heroDesc}>
          Connect with verified locals and fellow travelers. Get real-time recommendations, find trusted guides, and plan spontaneous adventures with confidence.
        </Text>
      </LinearGradient>

      {/* Current Location */}
      <View style={styles.locationRow}>
        <Ionicons name="location-outline" size={18} color="#2563eb" />
        <Text style={styles.locationText}>Currently exploring: <Text style={styles.locationAccent}>{state.currentLocation}</Text></Text>
      </View>

      {/* Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why Choose NomadPal?</Text>
        <View style={styles.featuresGrid}>
          {features.map((feature, idx) => (
            <View key={idx} style={styles.featureCard}>
              <View style={styles.featureIconWrap}>
                <Ionicons name={feature.icon as any} size={28} color="#2563eb" />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDesc}>{feature.description}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* CTA */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ready to Start Your Adventure?</Text>
        <Text style={styles.ctaDesc}>
          Join the NomadPal community and discover authentic travel experiences with trusted companions.
        </Text>
        <View style={styles.ctaRow}>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Explore Feed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.ctaButton, styles.ctaButtonOutline]}>
            <Text style={[styles.ctaButtonText, styles.ctaButtonOutlineText]}>AI Concierge</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  hero: { padding: 32, alignItems: 'center', borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  heroTitle: { color: '#fff', fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  heroTitleAccent: { color: '#dbeafe' },
  heroDesc: { color: '#e0e7ff', fontSize: 16, textAlign: 'center', marginBottom: 8 },
  locationRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 16 },
  locationText: { fontSize: 16, color: '#334155' },
  locationAccent: { color: '#2563eb', fontWeight: 'bold' },
  section: { marginHorizontal: 20, marginVertical: 24 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', color: '#1e293b', marginBottom: 12, textAlign: 'center' },
  featuresGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  featureCard: { width: '47%', backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, alignItems: 'center', elevation: 2 },
  featureIconWrap: { backgroundColor: '#dbeafe', borderRadius: 8, padding: 8, marginBottom: 8 },
  featureTitle: { fontWeight: 'bold', fontSize: 16, color: '#2563eb', marginBottom: 4, textAlign: 'center' },
  featureDesc: { color: '#64748b', fontSize: 13, textAlign: 'center' },
  ctaDesc: { color: '#334155', fontSize: 16, textAlign: 'center', marginBottom: 16 },
  ctaRow: { flexDirection: 'row', justifyContent: 'center', gap: 12 },
  ctaButton: { backgroundColor: '#2563eb', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, marginHorizontal: 6 },
  ctaButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  ctaButtonOutline: { backgroundColor: '#fff', borderWidth: 2, borderColor: '#2563eb' },
  ctaButtonOutlineText: { color: '#2563eb' },
});
