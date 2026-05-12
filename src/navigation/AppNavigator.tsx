import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import {HomeScreen} from '../screens/HomeScreen';
import {PersonalScreen} from '../screens/PersonalScreen';
import {ContratacionScreen} from '../screens/ContratacionScreen';
import {MovimientosScreen} from '../screens/MovimientosScreen';
import {InformacionScreen} from '../screens/InformacionScreen';
import {Colors, FontSizes} from '../theme';
import {RootTabParamList} from '../types';

const Tab = createBottomTabNavigator<RootTabParamList>();

const tabIcons: Record<string, string> = {
  Home: '🏠',
  Personal: '👥',
  Contratacion: '📋',
  Movimientos: '💰',
  Informacion: '📊',
};

export const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => (
          <Text style={{fontSize: focused ? 24 : 20, opacity: focused ? 1 : 0.6}}>
            {tabIcons[route.name]}
          </Text>
        ),
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.border,
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: FontSizes.xs,
          fontWeight: '600',
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{tabBarLabel: 'Inicio'}}
      />
      <Tab.Screen
        name="Personal"
        component={PersonalScreen}
        options={{tabBarLabel: 'Personal'}}
      />
      <Tab.Screen
        name="Contratacion"
        component={ContratacionScreen}
        options={{tabBarLabel: 'Contratos'}}
      />
      <Tab.Screen
        name="Movimientos"
        component={MovimientosScreen}
        options={{tabBarLabel: 'Movimientos'}}
      />
      <Tab.Screen
        name="Informacion"
        component={InformacionScreen}
        options={{tabBarLabel: 'Info'}}
      />
    </Tab.Navigator>
  );
};
