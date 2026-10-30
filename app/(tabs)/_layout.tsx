import * as React from 'react';
import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import { useTheme } from '@/theming/ThemeProvider';
import Icon from '@/components/Icon';

function TabIcon({ name, color, focused }: { name: React.ComponentProps<typeof Icon>['name']; color: string; focused: boolean }) {
  return (
    <View className="items-center justify-center">
      <Icon name={name} color={color} size={24} strokeWidth={focused ? 2.5 : 1.8} />
    </View>
  );
}

function TabLabel({ color, children }: { color: string; children: string }) {
  return (
    <Text style={{ color, fontSize: 11, fontWeight: '600', marginTop: 2 }}>
      {children}
    </Text>
  );
}

export default function Layout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.foreground,
        headerTitleStyle: {
          color: theme.colors.foreground,
          fontWeight: '700',
          fontSize: 20,
          fontFamily: 'Outfit_700Bold',
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.mutedForeground,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          height: 70,
          paddingTop: 6,
          paddingBottom: 8,
        },
        sceneStyle: {
          backgroundColor: theme.colors.background,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'My Day',
          tabBarIcon: ({ color, focused }) => <TabIcon name="Sun" color={color} focused={focused} />,
          tabBarLabel: ({ color }) => <TabLabel color={color}>My Day</TabLabel>,
        }}
      />
      <Tabs.Screen
        name="timer"
        options={{
          title: 'Focus',
          tabBarIcon: ({ color, focused }) => <TabIcon name="Timer" color={color} focused={focused} />,
          tabBarLabel: ({ color }) => <TabLabel color={color}>Focus</TabLabel>,
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'Stars',
          tabBarIcon: ({ color, focused }) => <TabIcon name="Star" color={color} focused={focused} />,
          tabBarLabel: ({ color }) => <TabLabel color={color}>Stars</TabLabel>,
        }}
      />
      <Tabs.Screen
        name="calm"
        options={{
          title: 'Calm',
          tabBarIcon: ({ color, focused }) => <TabIcon name="Wind" color={color} focused={focused} />,
          tabBarLabel: ({ color }) => <TabLabel color={color}>Calm</TabLabel>,
        }}
      />
      <Tabs.Screen
        name="play"
        options={{
          title: 'Play',
          tabBarIcon: ({ color, focused }) => <TabIcon name="Smile" color={color} focused={focused} />,
          tabBarLabel: ({ color }) => <TabLabel color={color}>Play</TabLabel>,
        }}
      />
    </Tabs>
  );
}
