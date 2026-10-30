import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useTheme } from '@/theming/ThemeProvider';
import Icon from '@/components/Icon';
import { LinearGradient } from 'expo-linear-gradient';

type Preset = {
  label: string;
  minutes: number;
  icon: React.ComponentProps<typeof Icon>['name'];
  color: [string, string];
};

const PRESETS: Preset[] = [
  { label: 'Quick', minutes: 1, icon: 'Zap', color: ['#FFB347', '#FF8C00'] },
  { label: 'Short', minutes: 3, icon: 'Clock3', color: ['#74B9FF', '#0984E3'] },
  { label: 'Medium', minutes: 5, icon: 'Clock9', color: ['#55EFC4', '#00B894'] },
  { label: 'Long', minutes: 10, icon: 'Clock12', color: ['#A29BFE', '#6C5CE7'] },
];

const TASKS = [
  { label: 'Homework', icon: 'Pencil' as const },
  { label: 'Reading', icon: 'BookOpen' as const },
  { label: 'Clean Up', icon: 'Trash2' as const },
  { label: 'Practice', icon: 'Music3' as const },
  { label: 'Drawing', icon: 'Palette' as const },
];

export default function TimerScreen() {
  const { theme } = useTheme();
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(300);
  const [remainingSeconds, setRemainingSeconds] = useState(300);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [sessionsCompleted, setSessionsCompleted] = useState(3);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const progress = totalSeconds > 0 ? (totalSeconds - remainingSeconds) / totalSeconds : 0;
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearTimer();
            setIsRunning(false);
            setSessionsCompleted((s) => s + 1);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return clearTimer;
  }, [isRunning, isPaused, clearTimer]);

  const selectPreset = (minutes: number) => {
    clearTimer();
    setIsRunning(false);
    setIsPaused(false);
    setTotalSeconds(minutes * 60);
    setRemainingSeconds(minutes * 60);
  };

  const toggleTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIsPaused(false);
    } else {
      setIsPaused((p) => !p);
    }
  };

  const resetTimer = () => {
    clearTimer();
    setIsRunning(false);
    setIsPaused(false);
    setRemainingSeconds(totalSeconds);
  };

  const diameter = 200;
  const strokeWidth = 12;

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}>
      <View className="mx-6 mt-4">
        <Text className="text-h6 text-foreground mb-3">What are you working on?</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
          {TASKS.map((task) => {
            const isSelected = selectedTask === task.label;
            return (
              <Pressable
                key={task.label}
                onPress={() => setSelectedTask(task.label)}
                className={`flex-row items-center rounded-full px-4 py-2 border ${
                  isSelected ? 'bg-primary border-primary' : 'bg-card border-border'
                }`}>
                <Icon
                  name={task.icon}
                  color={isSelected ? 'white' : theme.colors.foreground}
                  size={16}
                  strokeWidth={2}
                />
                <Text
                  className={`ml-2 text-sm font-semibold ${
                    isSelected ? 'text-primary-foreground' : 'text-foreground'
                  }`}>
                  {task.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <View className="items-center mt-6">
        <View className="relative items-center justify-center" style={{ width: diameter, height: diameter }}>
          <View
            className="absolute rounded-full"
            style={{
              width: diameter,
              height: diameter,
              borderWidth: strokeWidth,
              borderColor: theme.colors.muted,
            }}
          />
          <View
            className="absolute"
            style={{
              width: diameter,
              height: diameter,
              transform: [{ rotate: '-90deg' }],
            }}>
            <View
              className="rounded-full"
              style={{
                width: diameter,
                height: diameter,
                borderWidth: strokeWidth,
                borderColor: 'transparent',
                borderTopColor: remainingSeconds > 0 ? theme.colors.accent : theme.colors.success,
                borderRightColor: remainingSeconds > 0 ? theme.colors.accent : theme.colors.success,
                borderBottomColor: remainingSeconds > 0 ? theme.colors.accent : theme.colors.success,
                borderLeftColor: 'transparent',
                opacity: progress > 0 ? 1 : 0,
              }}
            />
          </View>
          <View className="items-center">
            <Text className="text-h2 text-foreground font-bold" style={{ fontSize: 48 }}>
              {timeString}
            </Text>
            {isPaused && (
              <Text className="text-caption text-warning font-semibold mt-1">Paused</Text>
            )}
            {!isRunning && remainingSeconds > 0 && remainingSeconds === totalSeconds && (
              <Text className="text-caption text-muted-foreground mt-1">Ready!</Text>
            )}
            {remainingSeconds === 0 && (
              <Text className="text-caption text-success font-semibold mt-1">All done! 🎉</Text>
            )}
          </View>
        </View>
      </View>

      <View className="flex-row justify-center mt-6 gap-4">
        <Pressable
          onPress={resetTimer}
          className="w-14 h-14 rounded-full bg-muted items-center justify-center">
          <Icon name="RotateCcw" color={theme.colors.foreground} size={22} strokeWidth={2} />
        </Pressable>
        <Pressable
          onPress={toggleTimer}
          className="w-16 h-16 rounded-full bg-primary items-center justify-center shadow-lg"
          style={{ shadowColor: theme.colors.primary, shadowOpacity: 0.3, shadowRadius: 8 }}>
          <Icon
            name={isRunning && !isPaused ? 'Pause' : 'Play'}
            color="white"
            size={28}
            strokeWidth={3}
          />
        </Pressable>
        {(isRunning || isPaused) && (
          <Pressable
            onPress={() => {
              clearTimer();
              setIsRunning(false);
              setIsPaused(false);
              setRemainingSeconds(totalSeconds);
            }}
            className="w-14 h-14 rounded-full bg-destructive/10 items-center justify-center">
            <Icon name="Square" color={theme.colors.destructive} size={18} strokeWidth={2.5} />
          </Pressable>
        )}
      </View>

      <View className="mx-6 mt-6">
        <Text className="text-h6 text-foreground mb-3">Choose your time</Text>
        <View className="flex-row justify-between">
          {PRESETS.map((preset) => {
            const isActive = totalSeconds === preset.minutes * 60;
            return (
              <Pressable
                key={preset.label}
                onPress={() => selectPreset(preset.minutes)}
                className="items-center"
                style={{ width: '22%' }}>
                <LinearGradient
                  colors={isActive ? preset.color : (['#E2E8F0', '#CBD5E1'] as [string, string])}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="w-14 h-14 rounded-2xl items-center justify-center mb-1"
                  style={{ opacity: isActive ? 1 : 0.6 }}>
                  <Icon
                    name={preset.icon}
                    color="white"
                    size={22}
                    strokeWidth={2.5}
                  />
                </LinearGradient>
                <Text
                  className={`text-xs font-semibold ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                  {preset.minutes} min
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View className="mx-6 mt-6 mb-2">
        <View className="bg-card rounded-2xl p-4 border border-border flex-row items-center justify-between">
          <View>
            <Text className="text-h6 text-foreground">Focus sessions today</Text>
            <Text className="text-caption text-muted-foreground mt-1">
              You're doing great! Keep it up!
            </Text>
          </View>
          <View className="bg-accent/20 rounded-full w-12 h-12 items-center justify-center">
            <Text className="text-accent font-bold text-lg">{sessionsCompleted}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
