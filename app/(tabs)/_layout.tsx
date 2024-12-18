import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for icons

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle:{
          backgroundColor: '#FFFFFF',
        },
        tabBarActiveTintColor: '#00008b', // Selected tab color
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          headerTitle: 'GrowSync',
          headerStyle: {
            backgroundColor: '#00008b', // Header background color
          },
          headerTintColor: '#ffffff', // Header text color
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: '700',
          },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'} // Use Ionicons for icons
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="irrigationControl"
        options={{
          title: 'Irrigation Control',
          headerTitle: 'GrowSync',
          headerStyle: {
            backgroundColor: '#00008b', // Header background color
          },
          headerTintColor: '#ffffff', // Header text color
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: '700',
          },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'water' : 'water-outline'} // Use Ionicons for icons
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="graph"
        options={{
          title: 'Analytics',
          headerTitle: 'GrowSync',
          headerStyle: {
            backgroundColor: '#00008b',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: '700',
          },
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="stats-chart"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
