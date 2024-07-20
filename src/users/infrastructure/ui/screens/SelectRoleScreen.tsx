import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootStackParamList from '../../../../shared/infrastructure/ui/types/RootStackParamList';
import Icon from 'react-native-vector-icons/Ionicons'; 

type SelectRoleScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SelectRoleScreen'
>;

type Props = {
  navigation: SelectRoleScreenNavigationProp;
};

const SelectRoleScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#ffffff" />
      </TouchableOpacity>
      <Image
        source={require('../../../../assets/Images/LogoBandConnect.png')}
        style={styles.logo}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={styles.buttonText}>Quero contratar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUpMusicianBasicInfoScreen')}>
        <Text style={styles.buttonText}>Músico/s</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingTop: 50, 
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#cb0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SelectRoleScreen;
