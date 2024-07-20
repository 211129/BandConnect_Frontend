import React from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootStackParamList from '../../../../shared/infrastructure/ui/types/RootStackParamList';

type PreLoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PreLoginScreen'
>;

type Props = {
  navigation: PreLoginScreenNavigationProp;
};

const PreLoginScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/Images/LogoBandConnect.png')}
        style={styles.logo}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Iniciar sesion"
            onPress={() => navigation.navigate('SignInScreen')}
            color="#cb0000"
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Crear cuenta"
            onPress={() => navigation.navigate('SelectRoleScreen')}
            color="#cb0000"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    position: 'absolute',
    bottom: 50,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default PreLoginScreen;
