import React, { useState, useCallback, useRef } from 'react';
import { Link } from 'expo-router';
import { View, Text, ScrollView, Pressable, Animated, Dimensions } from 'react-native';
import { useTheme } from '@/theming/ThemeProvider';
import Icon from '@/components/Icon';
import { LinearGradient } from 'expo-linear-gradient';

const SCREEN_WIDTH = Dimensions.get('window').width;

const COLORS = ['#FF6B6B', '#FFB347', '#55EFC4', '#74B9FF', '#A29BFE', '#FD79A8', '#00B894', '#FDCB6E'];
const SHAPES = [
  { label: 'Circle', icon: 'Circle' as const },
  { label: 'Square', icon: 'Square' as const },
  { label: 'Triangle', icon: 'Triangle' as const },
  { label: 'Star', icon: 'Star' as const },
];

const TAP_ANIMALS = [
  '🐶', '🐱', '🐮', '🐷', '🐸', '🐵', '🐰', '🦊',
  '🐻', '🐼', '🐨', '🦁', '🐯', '🦄', '🐙', '🦋',
];

export default function PlayScreen() {
  const { theme } = useTheme();

  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [tapCount, setTapCount] = useState(0);
  const [currentAnimal, setCurrentAnimal] = useState(TAP_ANIMALS[0]);
  const [pattern, setPattern] = useState<number[]>([0]);
  const [userPattern, setUserPattern] = useState<number[]>([]);
  const [isShowingPattern, setIsShowingPattern] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [dots, setDots] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const tapScale = useRef(new Animated.Value(1)).current;
  const dotId = useRef(0);

  const tapAnimal = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);
    setCurrentAnimal(TAP_ANIMALS[newCount % TAP_ANIMALS.length]);

    Animated.sequence([
      Animated.timing(tapScale, { toValue: 1.3, duration: 100, useNativeDriver: true }),
      Animated.timing(tapScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const addDot = (x: number, y: number) => {
    const color = selectedColor || COLORS[Math.floor(Math.random() * COLORS.length)];
    dotId.current += 1;
    setDots((prev) => [...prev.slice(-30), { id: dotId.current, x, y, color }]);
  };

  const startPattern = useCallback(() => {
    const newPattern = [...pattern, Math.floor(Math.random() * 4)];
    setPattern(newPattern);
    setUserPattern([]);
    setIsShowingPattern(true);

    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i >= newPattern.length) {
        clearInterval(interval);
        setIsShowingPattern(false);
      }
    }, 600);
  }, [pattern]);

  const pressShape = (index: number) => {
    if (isShowingPattern) return;
    const newUser = [...userPattern, index];
    setUserPattern(newUser);

    if (newUser[newUser.length - 1] !== pattern[newUser.length - 1]) {
      setUserPattern([]);
      return;
    }

    if (newUser.length === pattern.length) {
      setCorrectCount((c) => c + 1);
      setTimeout(() => startPattern(), 600);
    }
  };

  const startPatternGame = () => {
    setPattern([Math.floor(Math.random() * 4)]);
    setUserPattern([]);
    setCorrectCount(0);
    setActiveGame('memory');
    setTimeout(() => {
      setIsShowingPattern(true);
      setTimeout(() => setIsShowingPattern(false), 600);
    }, 300);
  };

  const agoraCard = (
    <View className="mx-6 mt-4 rounded-[24px] border border-dashed border-border bg-card px-5 py-4">
      <View className="flex-row items-start justify-between gap-4">
        <View className="flex-1">
          <Text className="text-base font-bold text-foreground">Native video call test</Text>
          <Text className="mt-1 text-sm leading-5 text-muted-foreground">
            Open the Agora test screen in native preview. Web preview shows a safe placeholder only.
          </Text>
        </View>
        <Icon name="Video" size={22} color={theme.colors.primary} />
      </View>
      <Link href={"/agora" as never} asChild>
        <Pressable className="mt-4 self-start rounded-full bg-primary px-4 py-3">
          <Text className="text-sm font-bold text-primary-foreground">Open Agora test</Text>
        </Pressable>
      </Link>
    </View>
  );

  if (activeGame === 'tap') {
    return (
      <View className="flex-1 bg-background">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40, alignItems: 'center', paddingTop: 24 }}
          showsVerticalScrollIndicator={false}>
          <Pressable
            onPress={tapAnimal}
            className="mx-6 bg-card rounded-3xl border border-border p-6 items-center w-[calc(100%-48px)]">
            <Animated.Text
              className="text-8xl"
              style={{ transform: [{ scale: tapScale }] }}>
              {currentAnimal}
            </Animated.Text>
            <Text className="text-h4 text-foreground mt-4">Tap the animal!</Text>
            <Text className="text-h2 text-primary font-bold mt-2">{tapCount}</Text>
            <Text className="text-caption text-muted-foreground">animals found</Text>
          </Pressable>
          <Pressable
            onPress={() => { setActiveGame(null); setTapCount(0); }}
            className="mt-4 rounded-full px-6 py-2 bg-muted">
            <Text className="text-foreground text-sm font-semibold">Done playing</Text>
          </Pressable>
        </ScrollView>
      </View>
    );
  }

  if (activeGame === 'dots') {
    return (
      <View className="flex-1 bg-background">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}>
          <View className="mx-6 mt-4">
            <View className="flex-row justify-center gap-2 mb-3">
              {COLORS.map((color) => (
                <Pressable
                  key={color}
                  onPress={() => setSelectedColor(color)}
                  className="w-8 h-8 rounded-full border-2"
                  style={{
                    backgroundColor: color,
                    borderColor: selectedColor === color ? theme.colors.foreground : 'transparent',
                  }}
                />
              ))}
            </View>
            <Pressable
              onPress={(e) => {
                const { locationX, locationY } = e.nativeEvent;
                addDot(locationX, locationY);
              }}
              className="w-full h-80 bg-card rounded-3xl border border-border overflow-hidden relative">
              {dots.map((dot) => (
                <View
                  key={dot.id}
                  className="absolute rounded-full"
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: dot.color,
                    left: dot.x - 20,
                    top: dot.y - 20,
                    opacity: 0.8,
                  }}
                />
              ))}
              {dots.length === 0 && (
                <View className="absolute inset-0 items-center justify-center">
                  <Text className="text-muted-foreground text-sm">Tap anywhere to make dots!</Text>
                </View>
              )}
            </Pressable>
            <Pressable
              onPress={() => { setActiveGame(null); setDots([]); setSelectedColor(null); }}
              className="mt-4 rounded-full px-6 py-2 bg-muted self-center">
              <Text className="text-foreground text-sm font-semibold">Done playing</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    );
  }

  if (activeGame === 'memory') {
    return (
      <View className="flex-1 bg-background">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40, alignItems: 'center' }}
          showsVerticalScrollIndicator={false}>
          <View className="mx-6 mt-4 items-center">
            <Text className="text-h5 text-foreground mb-2">Repeat the pattern!</Text>
            <Text className="text-body text-muted-foreground mb-2">
              {isShowingPattern ? '👀 Watch...' : 'Your turn!'}
            </Text>
            <Text className="text-h6 text-accent mb-4">Score: {correctCount}</Text>

            <View className="flex-row flex-wrap justify-center gap-4">
              {SHAPES.map((shape, index) => {
                const isLit = isShowingPattern && pattern.length > 0 &&
                  index === pattern[Math.min(userPattern.length, pattern.length - 1)];
                const wrongAttempt = !isShowingPattern && userPattern.length > 0 &&
                  pattern.length >= userPattern.length &&
                  userPattern[userPattern.length - 1] !== pattern[userPattern.length - 1] &&
                  index === userPattern[userPattern.length - 1];

                return (
                  <Pressable
                    key={shape.label}
                    onPress={() => pressShape(index)}
                    className={`w-28 h-28 rounded-2xl items-center justify-center ${
                      isLit ? 'bg-accent' : wrongAttempt ? 'bg-destructive/20' : 'bg-card border border-border'
                    }`}>
                    <View className={`w-16 h-16 rounded-full items-center justify-center ${
                      isLit ? 'bg-white/30' : 'bg-muted'
                    }`}>
                      <Icon
                        name={shape.icon}
                        color={isLit ? 'white' : theme.colors.foreground}
                        size={28}
                        strokeWidth={2}
                      />
                    </View>
                    <Text className={`text-xs font-semibold mt-2 ${isLit ? 'text-white' : 'text-foreground'}`}>
                      {shape.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View className="flex-row gap-4 mt-6">
              <Pressable
                onPress={startPatternGame}
                className="rounded-full px-6 py-3 bg-primary">
                <Text className="text-white text-sm font-bold">New Game</Text>
              </Pressable>
              <Pressable
                onPress={() => { setActiveGame(null); }}
                className="rounded-full px-6 py-3 bg-muted">
                <Text className="text-foreground text-sm font-semibold">Done</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}>
      <View className="mx-6 mt-4">
        <Text className="text-h2 text-foreground">Let's Play! 🎮</Text>
        <Text className="text-body text-muted-foreground mt-1">
          Pick a game and have fun!
        </Text>
      </View>

      {agoraCard}

      <View className="mx-6 mt-6">
        <Pressable
          onPress={() => setActiveGame('tap')}
          className="mb-4">
          <LinearGradient
            colors={['#FF6B6B', '#FFB347'] as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-3xl p-6 flex-row items-center">
            <View className="w-14 h-14 rounded-2xl bg-white/25 items-center justify-center mr-4">
              <Text className="text-3xl">🐶</Text>
            </View>
            <View className="flex-1">
              <Text className="text-white text-lg font-bold">Animal Tap</Text>
              <Text className="text-white/80 text-sm">Tap to discover fun animals!</Text>
            </View>
            <Icon name="ChevronRight" color="white" size={24} />
          </LinearGradient>
        </Pressable>

        <Pressable
          onPress={() => setActiveGame('dots')}
          className="mb-4">
          <LinearGradient
            colors={['#A29BFE', '#6C5CE7'] as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-3xl p-6 flex-row items-center">
            <View className="w-14 h-14 rounded-2xl bg-white/25 items-center justify-center mr-4">
              <Icon name="Palette" color="white" size={28} />
            </View>
            <View className="flex-1">
              <Text className="text-white text-lg font-bold">Color Dots</Text>
              <Text className="text-white/80 text-sm">Make beautiful dot art!</Text>
            </View>
            <Icon name="ChevronRight" color="white" size={24} />
          </LinearGradient>
        </Pressable>

        <Pressable
          onPress={startPatternGame}
          className="mb-4">
          <LinearGradient
            colors={['#55EFC4', '#00B894'] as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-3xl p-6 flex-row items-center">
            <View className="w-14 h-14 rounded-2xl bg-white/25 items-center justify-center mr-4">
              <Icon name="Brain" color="white" size={28} />
            </View>
            <View className="flex-1">
              <Text className="text-white text-lg font-bold">Memory Game</Text>
              <Text className="text-white/80 text-sm">Remember and repeat the pattern!</Text>
            </View>
            <Icon name="ChevronRight" color="white" size={24} />
          </LinearGradient>
        </Pressable>

        <View className="bg-card rounded-2xl p-4 border border-border mt-2">
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-accent/20 items-center justify-center mr-3">
              <Icon name="Sparkles" color={theme.colors.accent} size={20} />
            </View>
            <View className="flex-1">
              <Text className="text-h6 text-foreground">Sensory Fun</Text>
              <Text className="text-caption text-muted-foreground mt-1">
                These games help with focus, coordination, and calming down. No right or wrong — just play!
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
