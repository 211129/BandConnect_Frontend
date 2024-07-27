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
import ListPostsScreen from '../../../../posts/infrastructure/ui/screens/ListPostsScreen';
import CreatePostScreen from '../../../../posts/infrastructure/ui/screens/CreatePostScreen';
import PostDetailsScreen from '../../../../posts/infrastructure/ui/screens/PostDetailsScreen';
import ProfileScreen from '../../../../users/infrastructure/ui/screens/ProfileScreen';
import EditProfileScreen from '../../../../users/infrastructure/ui/screens/EditProfileScreen';
import UserProfileScreen from '../../../../users/infrastructure/ui/screens/UserProfileScreen'; // Asegúrate de que la ruta sea correcta
import { checkAuthStatus } from '../../redux/actions/authAction';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator = () => (
  <>
    <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    <Stack.Screen name="SignInScreen" component={SignInScreen} />
    <Stack.Screen name="SelectRoleScreen" component={SelectRoleScreen} />
    <Stack.Screen name="SignUpMusicianBasicInfoScreen" component={SignUpMusicianBasicInfoScreen} />
    <Stack.Screen name="SignUpMusicianProfileScreen" component={SignUpMusicianProfileScreen} />
    <Stack.Screen name="SignUpMusicianContactScreen" component={SignUpMusicianContactScreen} />
  </>
);

const AppNavigator = () => (
  <>
    <Stack.Screen name="ListPostsScreen" component={ListPostsScreen} />
    <Stack.Screen name="PostDetailsScreen" component={PostDetailsScreen} />
    <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} />
    <Stack.Screen name="ListChatScreen" component={ListChatScreen} />
    <Stack.Screen name="ChatScreen" component={ChatScreen} />
    <Stack.Screen name="NewChatScreen" component={NewChatScreen} />
    <Stack.Screen name="TermsScreen" component={TermsScreen} />
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
    <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
  </>
);

const MainNavigator = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus() as any);
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="PreLoginScreen" component={PreLoginScreen} />
        {isLoggedIn ? (
          <>
            <Stack.Screen name="ListPostsScreen" component={ListPostsScreen} />
            <Stack.Screen name="PostDetailsScreen" component={PostDetailsScreen} />
            <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} />
            <Stack.Screen name="ListChatScreen" component={ListChatScreen} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="NewChatScreen" component={NewChatScreen} />
            <Stack.Screen name="TermsScreen" component={TermsScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
            <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="SelectRoleScreen" component={SelectRoleScreen} />
            <Stack.Screen name="SignUpMusicianBasicInfoScreen" component={SignUpMusicianBasicInfoScreen} />
            <Stack.Screen name="SignUpMusicianProfileScreen" component={SignUpMusicianProfileScreen} />
            <Stack.Screen name="SignUpMusicianContactScreen" component={SignUpMusicianContactScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
