import React, { useEffect } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebaseAuth, firebaseDB } from '../../../../../config/firebase.config';
import { SplashScreenRouteProps } from '../types/sharedScreensRouteProps';
import { useDispatch } from 'react-redux';
import { AuthActionTypes } from '../../redux/actions/authAction';
import { doc, getDoc } from 'firebase/firestore';
import UserEntity from '../../../../users/domain/entities/UserEntity';

const SplashScreen = ({ navigation }: SplashScreenRouteProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    checkLoggedUser();
  }, []);

  const checkLoggedUser = async () => {
    firebaseAuth.onAuthStateChanged(async user => {
      if (user) {
        const userDoc = await getDoc(doc(firebaseDB, 'users', user.uid));

        if (userDoc.exists()) {
          const userEntity = UserEntity.fromFirebase(userDoc.data());

          dispatch({ type: AuthActionTypes.LOGIN, payload: userEntity });
          navigation.reset({
            index: 0,
            routes: [{ name: 'ListPostsScreen' }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'PreLoginScreen' }],
          });
        }
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'PreLoginScreen' }],
        });
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../../../assets/Images/LogoBandConnect.png')} style={styles.logo} />
      <View style={styles.separator} />
      <ActivityIndicator size="large" color="#ffffff" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000', // Fondo negro
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
});

export default SplashScreen;

