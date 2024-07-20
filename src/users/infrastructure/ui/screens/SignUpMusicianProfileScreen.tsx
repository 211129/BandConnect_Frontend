import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootStackParamList from '../../../../shared/infrastructure/ui/types/RootStackParamList';
import Icon from 'react-native-vector-icons/Ionicons';

type SignUpMusicianProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUpMusicianProfileScreen'
>;

type Props = {
  navigation: SignUpMusicianProfileScreenNavigationProp;
  route: any;
};

const SignUpMusicianProfileScreen: React.FC<Props> = ({ navigation, route }) => {
  const [formData, setFormData] = useState({
    groupDescription: '',
    repertoire: '',
    yearsOfExperience: '',
    performanceVideos: '',
    groupPhotos: '',
  });

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    // Validate inputs if necessary
    navigation.navigate('SignUpMusicianContactScreen', { ...route.params, ...formData });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#ffffff" />
      </TouchableOpacity>
      <Text style={styles.title}>Detalles del Perfil del Grupo o Músico Individual</Text>
      <TextInput
        style={styles.input}
        placeholder="Descripción del Grupo"
        placeholderTextColor="#999"
        value={formData.groupDescription}
        onChangeText={(value) => handleChange('groupDescription', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Repertorio"
        placeholderTextColor="#999"
        value={formData.repertoire}
        onChangeText={(value) => handleChange('repertoire', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Años de Experiencia"
        placeholderTextColor="#999"
        value={formData.yearsOfExperience}
        onChangeText={(value) => handleChange('yearsOfExperience', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Videos de Actuaciones (enlace)"
        placeholderTextColor="#999"
        value={formData.performanceVideos}
        onChangeText={(value) => handleChange('performanceVideos', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Fotos del Grupo (enlace)"
        placeholderTextColor="#999"
        value={formData.groupPhotos}
        onChangeText={(value) => handleChange('groupPhotos', value)}
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

export default SignUpMusicianProfileScreen;
