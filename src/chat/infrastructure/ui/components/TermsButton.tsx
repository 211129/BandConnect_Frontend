import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type TermsButtonProps = {
  onPress: () => void;
  icon: string;
};

const TermsButton = ({ onPress, icon }: TermsButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name={icon} size={30} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 90, 
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1E68D7', // Azul que combina con el resto del estilo
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', // Sombra para darle un efecto de elevación
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default TermsButton;
