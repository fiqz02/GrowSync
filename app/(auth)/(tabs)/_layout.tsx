import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
        },
        tabBarActiveTintColor: "#00008b",
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          headerTitle: "GrowSync",
          headerStyle: {
            backgroundColor: "#00008b",
          },
          headerTintColor: "#ffffff",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "700",
          },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="irrigationControl"
        options={{
          title: "Irrigation Control",
          headerTitle: "GrowSync",
          headerStyle: {
            backgroundColor: "#00008b",
          },
          headerTintColor: "#ffffff",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "700",
          },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "water" : "water-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="graph"
        options={{
          title: "Analytics",
          headerTitle: "GrowSync",
          headerStyle: {
            backgroundColor: "#00008b",
          },
          headerTintColor: "#ffffff",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "700",
          },
          tabBarIcon: ({ color }) => (
            <Ionicons name="stats-chart" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Setting",
          headerTitle: "Profile",
          headerStyle: {
            backgroundColor: "#00008b",
          },
          headerTintColor: "#ffffff",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "700",
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
