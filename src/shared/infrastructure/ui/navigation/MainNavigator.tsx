import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import RootStackParamList from '../../../../shared/infrastructure/ui/types/RootStackParamList';

import SplashScreen from '../screens/SplashScreen';
import PreLoginScreen from '../../../../users/infrastructure/ui/screens/PreLoginScreen';
import SignUpScreen from '../../../../users/infrastructure/ui/screens/SignUpScreen';
import SignInScreen from '../../../../users/infrastructure/ui/screens/SignInScreen';
import ListChatScreen from '../../../../chat/infrastructure/ui/screens/ListChatScreen';
import ChatScreen from '../../../../chat/infrastructure/ui/screens/ChatScreen';
import TermsScreen from '../../../../chat/infrastructure/ui/screens/TermsScreen';
import NewChatScreen from '../../../../chat/infrastructure/ui/screens/NewChatScreen';
import SelectRoleScreen from '../../../../users/infrastructure/ui/screens/SelectRoleScreen';
import SignUpMusicianBasicInfoScreen from '../../../../users/infrastructure/ui/screens/SignUpMusicianBasicInfoScreen';
import SignUpMusicianProfileScreen from '../../../../users/infrastructure/ui/screens/SignUpMusicianProfileScreen';
import SignUpMusicianContactScreen from '../../../../users/infrastructure/ui/screens/SignUpMusicianContactScreen';
import { checkAuthStatus } from '../../redux/actions/authAction';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator = () => (
  <Stack.Group>
    <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    <Stack.Screen name="SignInScreen" component={SignInScreen} />
    <Stack.Screen name="SelectRoleScreen" component={SelectRoleScreen} />
    <Stack.Screen name="SignUpMusicianBasicInfoScreen" component={SignUpMusicianBasicInfoScreen} />
    <Stack.Screen name="SignUpMusicianProfileScreen" component={SignUpMusicianProfileScreen} />
    <Stack.Screen name="SignUpMusicianContactScreen" component={SignUpMusicianContactScreen} />
  </Stack.Group>
);

const AppNavigator = () => (
  <Stack.Group>
    <Stack.Screen name="ListChatScreen" component={ListChatScreen} />
    <Stack.Screen name="ChatScreen" component={ChatScreen} />
    <Stack.Screen name="NewChatScreen" component={NewChatScreen} />
    <Stack.Screen name="TermsScreen" component={TermsScreen} />
  </Stack.Group>
);

const MainNavigator = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus() as any);
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PreLoginScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PreLoginScreen" component={PreLoginScreen} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        {isLoggedIn ? (
          <>{AppNavigator()}</>
        ) : (
          <>{AuthNavigator()}</>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
