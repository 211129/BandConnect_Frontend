import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootStackParamList from '../../../../shared/infrastructure/ui/types/RootStackParamList';
import Icon from 'react-native-vector-icons/Ionicons';

type SignUpMusicianBasicInfoScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUpMusicianBasicInfoScreen'
>;

type Props = {
  navigation: SignUpMusicianBasicInfoScreenNavigationProp;
};

const SignUpMusicianBasicInfoScreen: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
  });

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    // Validate inputs if necessary
    navigation.navigate('SignUpMusicianProfileScreen', { ...formData });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#ffffff" />
      </TouchableOpacity>
      <Text style={styles.title}>Información Básica del Grupo o Músico Individual</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre Completo"
        placeholderTextColor="#999"
        value={formData.fullName}
        onChangeText={(value) => handleChange('fullName', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        placeholderTextColor="#999"
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#999"
        secureTextEntry
        value={formData.password}
        onChangeText={(value) => handleChange('password', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        placeholderTextColor="#999"
        secureTextEntry
        value={formData.confirmPassword}
        onChangeText={(value) => handleChange('confirmPassword', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de Teléfono (opcional)"
        placeholderTextColor="#999"
        value={formData.phone}
        onChangeText={(value) => handleChange('phone', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ubicación (Ciudad y País)"
        placeholderTextColor="#999"
        value={formData.location}
        onChangeText={(value) => handleChange('location', value)}
      />
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Icon name="arrow-forward" size={24} color="#ffffff" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  nextButton: {
    backgroundColor: '#cb0000',
    padding: 10,
    borderRadius: 50,
    marginTop: 20,
  },
});

export default SignUpMusicianBasicInfoScreen;
