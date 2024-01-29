import { I18nManager, Platform, StyleSheet, Text, View } from 'react-native';
import { systemWeights } from 'react-native-typography';
import { Icon, Touchable } from '@draftbit/ui';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import theme from './themes/Draftbit.js';
import LinkingConfiguration from './LinkingConfiguration.js';
import React from 'react';
import * as GlobalVariables from './config/GlobalVariableContext';
import filterUserData from './global-functions/filterUserData';
import storeNames from './global-functions/storeNames';
import Breakpoints from './utils/Breakpoints';
import useWindowDimensions from './utils/useWindowDimensions';

import ChartsOptionsScreen from './screens/ChartsOptionsScreen';
import CreateTask2Screen from './screens/CreateTask2Screen';
import DisplayyourtasksScreen from './screens/DisplayyourtasksScreen';
import EditTaskScreen from './screens/EditTaskScreen';
import HomepageGridCopy2Screen from './screens/HomepageGridCopy2Screen';
import HomepageGridCopyScreen from './screens/HomepageGridCopyScreen';
import LoginScreen from './screens/LoginScreen';
import SettingsScreen from './screens/SettingsScreen';
import SignupScreen from './screens/SignupScreen';
import TermAndConditionsScreen from './screens/TermAndConditionsScreen';
import UpcomingScreen from './screens/UpcomingScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import Welcoming2Screen from './screens/Welcoming2Screen';
import WelcomingScreen from './screens/WelcomingScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ChartsNavigator() {
  const Constants = GlobalVariables.useValues();
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  return (
    <Stack.Navigator initialRouteName="ChartsOptionsScreen">
      <Stack.Screen
        name="ChartsOptionsScreen"
        component={ChartsOptionsScreen}
        options={({ navigation }) => ({
          title: 'Charts Options',
        })}
      />
    </Stack.Navigator>
  );
}

function HomeNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="HomepageGridCopyScreen"
      screenOptions={({ navigation }) => ({
        headerBackImage: ({ tintColor }) => (
          <Icon
            name=""
            size={Platform.OS === 'ios' ? 21 : 24}
            color={tintColor}
            style={[styles.headerIcon, styles.headerIconLeft]}
          />
        ),
        headerTitleAlign: 'center',
        headerTitleAllowFontScaling: false,
      })}
    >
      <Stack.Screen
        name="HomepageGridCopyScreen"
        component={HomepageGridCopyScreen}
        options={({ navigation }) => ({
          title: 'Homepage - Grid Copy',
        })}
      />
      <Stack.Screen
        name="EditTaskScreen"
        component={EditTaskScreen}
        options={({ navigation }) => ({
          title: 'Edit Task',
        })}
      />
      <Stack.Screen
        name="DisplayyourtasksScreen"
        component={DisplayyourtasksScreen}
        options={({ navigation }) => ({
          title: 'Display your tasks',
        })}
      />
      <Stack.Screen
        name="UpcomingScreen"
        component={UpcomingScreen}
        options={({ navigation }) => ({
          title: 'Upcoming',
        })}
      />
      <Stack.Screen
        name="CreateTask2Screen"
        component={CreateTask2Screen}
        options={({ navigation }) => ({
          title: 'Create task 2',
        })}
      />
      <Stack.Screen
        name="HomepageGridCopy2Screen"
        component={HomepageGridCopy2Screen}
        options={({ navigation }) => ({
          title: 'Homepage - Grid Copy 2',
        })}
      />
    </Stack.Navigator>
  );
}

function ProfileNavigator() {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={({ navigation }) => ({
          title: 'Settings',
        })}
      />
    </Stack.Navigator>
  );
}

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="ChartsNavigator"
      backBehavior="history"
      screenOptions={({ navigation }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors['Primary'],
        tabBarStyle: { borderTopColor: 'transparent' },
      })}
    >
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="Entypo/home"
              size={25}
              color={focused ? theme.colors['Primary'] : color}
            />
          ),
          tabBarLabel: 'Home',
          title: 'HomeNavigator',
        })}
      />
      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="FontAwesome/user"
              size={25}
              color={focused ? theme.colors['Primary'] : color}
            />
          ),
          tabBarLabel: 'Profile',
          title: 'Profile Navigator',
        })}
      />
      <Tab.Screen
        name="ChartsNavigator"
        component={ChartsNavigator}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="Entypo/pie-chart"
              size={25}
              color={focused ? theme.colors['Primary'] : color}
            />
          ),
          tabBarLabel: 'Charts',
          title: 'Charts Navigator',
        })}
      />
    </Tab.Navigator>
  );
}

export default function RootAppNavigator() {
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <Stack.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={({ navigation }) => ({ headerMode: 'none' })}
      >
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={({ navigation }) => ({
            title: 'Login',
          })}
        />
        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={({ navigation }) => ({
            title: 'Sign up',
          })}
        />
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={({ navigation }) => ({
            title: 'Welcome',
          })}
        />
        <Stack.Screen
          name="WelcomingScreen"
          component={WelcomingScreen}
          options={({ navigation }) => ({
            title: 'Welcoming',
          })}
        />
        <Stack.Screen
          name="TermAndConditionsScreen"
          component={TermAndConditionsScreen}
          options={({ navigation }) => ({
            title: 'Term and Conditions',
          })}
        />
        <Stack.Screen
          name="Welcoming2Screen"
          component={Welcoming2Screen}
          options={({ navigation }) => ({
            title: 'Welcoming 2',
          })}
        />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerIcon: Platform.select({
    ios: {
      marginVertical: 12,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    default: {
      margin: 3,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
  }),
  headerIconLeft: Platform.select({ ios: { marginRight: 6 } }),
});
