import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, useRouter } from 'expo-router';
import { Pressable, useColorScheme, View, Text, Image, Modal, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import React, { useState } from 'react';
import { useNomad } from '../context/NomadContext';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { state, dispatch } = useNomad();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const currentUser = state.currentUser;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerRight: () =>
          currentUser ? (
            <>
              <Pressable
                onPress={() => setModalVisible(true)}
                style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}
              >
                <Image
                  source={avatarError ? { uri: `https://ui-avatars.com/api/?name=${currentUser.name}` } : { uri: currentUser.avatar }}
                  style={{ width: 32, height: 32, borderRadius: 16, marginRight: 8 }}
                  onError={() => setAvatarError(true)}
                />
                <Text style={{ fontWeight: 'bold', color: '#1e293b' }}>{currentUser.name}</Text>
              </Pressable>
              <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                  <View style={{ backgroundColor: 'white', borderRadius: 12, margin: 16, padding: 12, minWidth: 180, elevation: 4 }}>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(false);
                        router.push(`/${currentUser.name}`);
                      }}
                      style={{ paddingVertical: 10 }}
                    >
                      <Text style={{ fontSize: 16 }}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(false);
                        alert('Settings page coming soon!');
                      }}
                      style={{ paddingVertical: 10 }}
                    >
                      <Text style={{ fontSize: 16 }}>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(false);
                        dispatch({ type: 'SET_USER', payload: null });
                        router.replace('/signin');
                      }}
                      style={{ paddingVertical: 10 }}
                    >
                      <Text style={{ fontSize: 16, color: '#ef4444' }}>Sign Out</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </>
          ) : null,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
