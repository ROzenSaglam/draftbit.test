import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, ScrollView, Pressable, Animated, Dimensions } from 'react-native';
import { useTheme } from '@/theming/ThemeProvider';
import Icon from '@/components/Icon';
import { LinearGradient } from 'expo-linear-gradient';

const SCREEN_WIDTH = Dimensions.get('window').width;

type BreathPattern = {
  label: string;
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
  color: [string, string];
};

const BREATHING_PATTERNS: BreathPattern[] = [
  { label: 'Box Breath', inhale: 4, hold1: 4, exhale: 4, hold2: 4, color: ['#74B9FF', '#0984E3'] },
  { label: 'Calm Down', inhale: 4, hold1: 0, exhale: 6, hold2: 0, color: ['#55EFC4', '#00B894'] },
  { label: 'Energize', inhale: 6, hold1: 0, exhale: 2, hold2: 0, color: ['#FFB347', '#FF8C00'] },
];

const SOUNDS = [
  { icon: 'Cloud' as const, name: 'Rain', color: '#74B9FF' },
  { icon: 'Waves' as const, name: 'Ocean', color: '#00B894' },
  { icon: 'Leaf' as const, name: 'Forest', color: '#55EFC4' },
  { icon: 'Music3' as const, name: 'Lullaby', color: '#A29BFE' },
];

const STRETCHES = [
  { icon: 'Move' as const, name: 'Star Stretch', desc: 'Reach up high like a star!', color: '#FFB347' },
  { icon: 'Cat' as const, name: 'Cat Pose', desc: 'Arch your back like a kitty', color: '#FD79A8' },
  { icon: 'Waves' as const, name: 'Tree Pose', desc: 'Stand tall like a tree', color: '#55EFC4' },
  { icon: 'Wind' as const, name: 'Butterfly', desc: 'Flap your legs like wings', color: '#A29BFE' },
];

type BreathPhase = 'inhale' | 'hold1' | 'exhale' | 'hold2';

export default function CalmScreen() {
  const { theme } = useTheme();
  const [activePattern, setActivePattern] = useState<BreathPattern>(BREATHING_PATTERNS[0]);
  const [isBreathing, setIsBreathing] = useState(false);
  const [phase, setPhase] = useState<BreathPhase>('inhale');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const ballScale = useRef(new Animated.Value(1)).current;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const phases: BreathPhase[] = (['inhale', 'hold1', 'exhale', 'hold2'] as BreathPhase[]).filter((p) => {
    if (p === 'hold1') return activePattern.hold1 > 0;
    if (p === 'hold2') return activePattern.hold2 > 0;
    return true;
  });

  const phaseIndex = useRef(0);

  const getPhaseDuration = (p: BreathPhase, pat: BreathPattern): number => {
    switch (p) {
      case 'inhale': return pat.inhale;
      case 'exhale': return pat.exhale;
      case 'hold1': return pat.hold1;
      case 'hold2': return pat.hold2;
    }
  };

  const animateBall = useCallback((p: BreathPhase, pat: BreathPattern) => {
    let toValue = 1;
    let duration = 0;

    switch (p) {
      case 'inhale':
        toValue = 1.5;
        duration = pat.inhale * 1000;
        break;
      case 'exhale':
        toValue = 0.7;
        duration = pat.exhale * 1000;
        break;
      default:
        toValue = 1;
        duration = (p === 'hold1' ? pat.hold1 : pat.hold2) * 1000;
    }

    Animated.timing(ballScale, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  }, [ballScale]);

  const clearBreathInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startBreathing = () => {
    clearBreathInterval();
    phaseIndex.current = 0;
    const firstPhase = phases[0];
    setPhase(firstPhase);
    setSecondsLeft(getPhaseDuration(firstPhase, activePattern));
    animateBall(firstPhase, activePattern);
    setIsBreathing(true);

    const tick = () => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          phaseIndex.current = (phaseIndex.current + 1) % phases.length;
          const nextPhase = phases[phaseIndex.current];
          setPhase(nextPhase);
          const nextSeconds = getPhaseDuration(nextPhase, activePattern);
          animateBall(nextPhase, activePattern);
          return nextSeconds;
        }
        return prev - 1;
      });
    };

    intervalRef.current = setInterval(tick, 1000);
  };

  const stopBreathing = () => {
    clearBreathInterval();
    setIsBreathing(false);
    setPhase('inhale');
    setSecondsLeft(0);
    Animated.timing(ballScale, { toValue: 1, duration: 300, useNativeDriver: true }).start();
  };

  useEffect(() => {
    return clearBreathInterval;
  }, [clearBreathInterval]);

  const phaseLabels: Record<BreathPhase, string> = {
    inhale: 'Breathe In',
    hold1: 'Hold',
    exhale: 'Breathe Out',
    hold2: 'Hold',
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}>
      <View className="mx-6 mt-4">
        <Text className="text-h6 text-foreground mb-3">Breathing Exercise</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
          {BREATHING_PATTERNS.map((pattern) => {
            const isActive = activePattern.label === pattern.label;
            return (
              <Pressable
                key={pattern.label}
                onPress={() => {
                  stopBreathing();
                  setActivePattern(pattern);
                }}
                className={`rounded-full px-4 py-2 border ${
                  isActive ? 'bg-primary border-primary' : 'bg-card border-border'
                }`}>
                <Text className={`text-sm font-semibold ${isActive ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {pattern.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View className="items-center mt-6">
          <Animated.View style={{ transform: [{ scale: ballScale }] }}>
            <LinearGradient
              colors={activePattern.color}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="w-40 h-40 rounded-full items-center justify-center shadow-lg"
              style={{
                shadowColor: activePattern.color[1],
                shadowOpacity: 0.3,
                shadowRadius: 16,
              }}>
              <Text className="text-white text-2xl font-bold">
                {isBreathing ? phaseLabels[phase] : 'Tap'}
              </Text>
              {isBreathing && secondsLeft > 0 && (
                <Text className="text-white/80 text-sm mt-1">{secondsLeft}s</Text>
              )}
            </LinearGradient>
          </Animated.View>

          <Pressable
            onPress={isBreathing ? stopBreathing : startBreathing}
            className={`mt-6 rounded-full px-8 py-3 ${
              isBreathing ? 'bg-destructive' : 'bg-primary'
            }`}>
            <Text className="text-white text-base font-bold">
              {isBreathing ? 'Stop' : 'Start Breathing'}
            </Text>
          </Pressable>
        </View>
      </View>

      <View className="mx-6 mt-8">
        <Text className="text-h6 text-foreground mb-3">Calming Sounds</Text>
        <View className="flex-row justify-between">
          {SOUNDS.map((sound) => {
            const isActive = activeSound === sound.name;
            return (
              <Pressable
                key={sound.name}
                onPress={() => setActiveSound(isActive ? null : sound.name)}
                className={`items-center rounded-2xl py-3 border-2 ${
                  isActive ? 'border-primary bg-primary/10' : 'border-border bg-card'
                }`}
                style={{ width: (SCREEN_WIDTH - 48 - 12) / 4 }}>
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mb-1"
                  style={{ backgroundColor: sound.color + '25' }}>
                  <Icon name={sound.icon} color={sound.color} size={18} strokeWidth={2} />
                </View>
                <Text
                  className={`text-xs font-semibold ${isActive ? 'text-primary' : 'text-foreground'}`}>
                  {sound.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View className="mx-6 mt-8 mb-2">
        <Text className="text-h6 text-foreground mb-3">Calm Movements</Text>
        {STRETCHES.map((stretch) => (
          <Pressable
            key={stretch.name}
            className="bg-card rounded-2xl p-4 border border-border mb-3 flex-row items-center">
            <View
              className="w-12 h-12 rounded-xl items-center justify-center"
              style={{ backgroundColor: stretch.color + '20' }}>
              <Icon name={stretch.icon} color={stretch.color} size={22} strokeWidth={2} />
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-sm font-bold text-foreground">{stretch.name}</Text>
              <Text className="text-xs text-muted-foreground">{stretch.desc}</Text>
            </View>
            <Icon name="Play" color={theme.colors.mutedForeground} size={20} strokeWidth={2} />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
