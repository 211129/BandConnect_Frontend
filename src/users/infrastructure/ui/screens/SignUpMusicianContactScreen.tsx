import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootStackParamList from '../../../../shared/infrastructure/ui/types/RootStackParamList';
import Icon from 'react-native-vector-icons/Ionicons';

type SignUpMusicianContactScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUpMusicianContactScreen'
>;

type Props = {
  navigation: SignUpMusicianContactScreenNavigationProp;
  route: any;
};

const SignUpMusicianContactScreen: React.FC<Props> = ({ navigation, route }) => {
  const [formData, setFormData] = useState({
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    socialLinks: '',
  });

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Aquí es donde enviarías los datos al backend para crear la cuenta
    const allData = { ...route.params, ...formData };
    console.log(allData);

    // Simular envío y redirigir a la pantalla de inicio de sesión
    Alert.alert(
      'Registro Completo',
      'Tu cuenta ha sido creada con éxito. Ahora puedes iniciar sesión.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('SignInScreen'),
        },
      ],
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#ffffff" />
      </TouchableOpacity>
      <Text style={styles.title}>Información de Contacto del Grupo o Músico Individual</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Contacto"
        placeholderTextColor="#999"
        value={formData.contactName}
        onChangeText={(value) => handleChange('contactName', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono del Contacto"
        placeholderTextColor="#999"
        value={formData.contactPhone}
        onChangeText={(value) => handleChange('contactPhone', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico del Contacto"
        placeholderTextColor="#999"
        value={formData.contactEmail}
        onChangeText={(value) => handleChange('contactEmail', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enlaces a Redes Sociales"
        placeholderTextColor="#999"
        value={formData.socialLinks}
        onChangeText={(value) => handleChange('socialLinks', value)}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Enviar</Text>
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
  submitButton: {
    backgroundColor: '#cb0000',
    padding: 10,
    borderRadius: 50,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SignUpMusicianContactScreen;
