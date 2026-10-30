import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Dimensions } from 'react-native';
import { useTheme } from '@/theming/ThemeProvider';
import Icon from '@/components/Icon';
import { LinearGradient } from 'expo-linear-gradient';

const SCREEN_WIDTH = Dimensions.get('window').width;

const STARS_TOTAL = 24;
const STARS_GOAL = 50;

const BADGES = [
  { icon: 'Zap' as const, name: 'Quick Starter', desc: 'Finish a task in under 5 min', earned: true },
  { icon: 'Star' as const, name: 'Week Warrior', desc: 'Complete 7 days in a row', earned: true },
  { icon: 'Heart' as const, name: 'Kind Heart', desc: 'Help someone without being asked', earned: true },
  { icon: 'BookOpen' as const, name: 'Book Worm', desc: 'Read for 20 minutes', earned: false },
  { icon: 'Palette' as const, name: 'Artist', desc: 'Create something new', earned: false },
  { icon: 'Music3' as const, name: 'Musician', desc: 'Practice music 5 times', earned: false },
  { icon: 'Footprints' as const, name: 'Mover', desc: 'Play outside for 30 min', earned: false },
  { icon: 'Puzzle' as const, name: 'Problem Solver', desc: 'Solve a puzzle on your own', earned: false },
];

const PRIZES = [
  { icon: 'Gamepad2' as const, name: 'Extra Game Time', cost: 10, desc: '15 minutes of games' },
  { icon: 'Cake' as const, name: 'Special Treat', cost: 15, desc: 'Pick a yummy snack' },
  { icon: 'Tv2' as const, name: 'Movie Night', cost: 20, desc: 'Pick the family movie' },
  { icon: 'ParkingCircle' as const, name: 'Park Trip', cost: 25, desc: 'Go to your favorite park' },
];

export default function RewardsScreen() {
  const { theme } = useTheme();
  const [stars] = useState(STARS_TOTAL);

  const progressPercent = Math.min(Math.round((stars / STARS_GOAL) * 100), 100);

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}>
      {/* Star balance */}
      <View className="mx-6 mt-4">
        <LinearGradient
          colors={['#FFB347', '#FF8C00']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-3xl p-6 items-center">
          <Text className="text-white/90 text-sm font-semibold">Your Stars</Text>
          <View className="flex-row items-center mt-2">
            <Text className="text-white text-5xl font-bold mr-3">{stars}</Text>
            <Icon name="Star" color="#FFF" size={36} strokeWidth={2.5} fill="white" />
          </View>
          <View className="w-full mt-4">
            <View className="flex-row justify-between mb-1">
              <Text className="text-white/80 text-xs">Next reward at {STARS_GOAL} ⭐</Text>
              <Text className="text-white/80 text-xs">{progressPercent}%</Text>
            </View>
            <View className="h-2 bg-white/30 rounded-full overflow-hidden">
              <View
                className="h-full bg-white rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* How to earn */}
      <View className="mx-6 mt-6">
        <Text className="text-h6 text-foreground mb-3">How to earn stars</Text>
        <View className="flex-row flex-wrap" style={{ gap: 8 }}>
          {[
            { label: 'Finish a task', icon: 'CheckCircle' as const, stars: 1 },
            { label: 'Complete focus time', icon: 'Timer' as const, stars: 2 },
            { label: 'Be kind', icon: 'Heart' as const, stars: 3 },
            { label: 'Try something new', icon: 'Lightbulb' as const, stars: 3 },
          ].map((item) => (
            <View
              key={item.label}
              className="bg-card rounded-xl px-3 py-2 border border-border flex-row items-center"
              style={{ width: (SCREEN_WIDTH - 48 - 8) / 2 }}>
              <Icon name={item.icon} color={theme.colors.accent} size={16} strokeWidth={2} />
              <View className="ml-2 flex-1">
                <Text className="text-xs font-semibold text-foreground">{item.label}</Text>
                <Text className="text-[10px] text-accent font-bold">+{item.stars} ⭐</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Badges */}
      <View className="mx-6 mt-6">
        <Text className="text-h6 text-foreground mb-3">Badges</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
          {BADGES.map((badge) => (
            <View
              key={badge.name}
              className={`rounded-2xl p-4 border w-36 ${
                badge.earned ? 'bg-card border-accent/40' : 'bg-muted/50 border-border opacity-50'
              }`}>
              <View
                className={`w-12 h-12 rounded-full items-center justify-center mb-2 ${
                  badge.earned ? 'bg-accent/15' : 'bg-muted'
                }`}>
                <Icon
                  name={badge.icon}
                  color={badge.earned ? theme.colors.accent : theme.colors.mutedForeground}
                  size={22}
                  strokeWidth={2}
                />
              </View>
              <Text className={`text-sm font-bold ${badge.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                {badge.name}
              </Text>
              <Text className="text-xs text-muted-foreground mt-1" numberOfLines={2}>
                {badge.desc}
              </Text>
              {badge.earned && (
                <Text className="text-[10px] text-accent font-bold mt-1">Earned! 🎉</Text>
              )}
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Prize shop */}
      <View className="mx-6 mt-6 mb-2">
        <Text className="text-h6 text-foreground mb-3">Prize Shop</Text>
        {PRIZES.map((prize) => {
          const canAfford = stars >= prize.cost;
          return (
            <View
              key={prize.name}
              className="bg-card rounded-2xl p-4 border border-border mb-3 flex-row items-center">
              <View className="w-12 h-12 rounded-xl bg-accent/15 items-center justify-center mr-4">
                <Icon name={prize.icon} color={theme.colors.accent} size={22} strokeWidth={2} />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-foreground">{prize.name}</Text>
                <Text className="text-xs text-muted-foreground">{prize.desc}</Text>
              </View>
              <Pressable
                className={`rounded-full px-4 py-2 ${
                  canAfford ? 'bg-accent' : 'bg-muted'
                }`}
                disabled={!canAfford}>
                <Text className={`text-xs font-bold ${canAfford ? 'text-accent-foreground' : 'text-muted-foreground'}`}>
                  {prize.cost} ⭐
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
