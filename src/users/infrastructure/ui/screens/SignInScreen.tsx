import React, { useState } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'; // Cambia "Ionicons" por el paquete de íconos que prefieras
import Button from '../../../../shared/infrastructure/ui/components/Button';
import InputField from '../../../../shared/infrastructure/ui/components/InputField';
import ErrorMessage from '../../../../shared/infrastructure/ui/components/ErrorMessage';
import { authenticateUseCase } from '../../dependecies';
import { SignInScreenRouteProp } from '../types/userScreeensRouteProps';
import { useAppDispatch } from '../../../../shared/infrastructure/redux/store';
import { AuthActionTypes } from '../../../../shared/infrastructure/redux/actions/authAction';

const SignInScreen = ({ navigation }: SignInScreenRouteProp) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    let validationErrors = [];

    if (!values.email) {
      validationErrors.push('El correo electrónico es requerido');
    }

    if (!values.password) {
      validationErrors.push('La contraseña es requerida');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    const userEntity = await authenticateUseCase.execute(
      values.email,
      values.password,
    );

    if (!userEntity) {
      setErrors(['Usuario o contraseña incorrectos']);
      setIsSubmitting(false);
      return;
    }

    dispatch({ type: AuthActionTypes.LOGIN, payload: userEntity });

    setValues({ email: '', password: '' });
    setErrors([]);
    setIsSubmitting(false);

    navigation.navigate('ListChatScreen');
  };

  const renderErrors = () => {
    return errors.map((error, index) => (
      <ErrorMessage key={index} message={error} width={'90%'} />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#ffffff" />
      </TouchableOpacity>
      <Image
        source={require('../../../../assets/Images/LogoBandConnect.png')}
        style={styles.logo}
      />
      <InputField
        value={values.email}
        handleChange={value => setValues({ ...values, email: value })}
        width={'90%'}
        placeholder="Correo electrónico"
      />
      <InputField
        value={values.password}
        handleChange={value => setValues({ ...values, password: value })}
        width={'90%'}
        placeholder="Contraseña"
        secureTextEntry={true}
      />
      <Button
        title="Iniciar sesión"
        width={'90%'}
        handlePress={handleSubmit}
        isDisabled={isSubmitting}
        backgroundColor="#a12424"
      />
      {renderErrors()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 20,
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
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 40,
    marginTop: 20,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#FF0000',
    marginBottom: 20,
  },
  link: {
    color: '#0000FF',
  },
});

export default SignInScreen;
