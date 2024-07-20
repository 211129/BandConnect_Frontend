import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';

const TermsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Términos y Condiciones</Text>
      <Text style={styles.text}>
        <Text style={styles.subtitle}>Responsable:</Text>
        {'\n'}- Codexy 
        {'\n'}- Benjamina, Insurgentes, 29045 Tuxtla Gutiérrez, Chis., México.
        {'\n\n'}<Text style={styles.subtitle}>Aviso de Privacidad:</Text>
        {'\n'}<Text style={styles.bold}>Codexy</Text> informa que sus datos personales, como cliente o proveedor, serán tratados para cumplir con nuestras obligaciones contractuales.
        {'\n\n'}<Text style={styles.bold}>Finalidad del Tratamiento de Datos:</Text>
        {'\n'}Utilizamos sus datos para:
        {'\n'}- Mantenimiento de registros y gestión de clientes.
        {'\n'}- Mejora de productos y servicios.
        {'\n'}- Comunicaciones relacionadas con transacciones o consultas.
        {'\n'}- Atención de quejas.
        {'\n'}- Cumplimiento de obligaciones contractuales.
        {'\n'}- Referencias comerciales y procesamiento de créditos.
        {'\n\n'}<Text style={styles.bold}>Transferencia de Datos:</Text>
        {'\n'}Podemos transferir sus datos conforme a la legislación aplicable para prevenir operaciones ilícitas.
        {'\n\n'}<Text style={styles.bold}>Protección de Datos:</Text>
        {'\n'}Aseguramos la protección de sus datos conforme a la ley, mediante medidas de seguridad administrativas, técnicas y físicas.
        {'\n\n'}<Text style={styles.bold}>Derechos del Titular:</Text>
        {'\n'}Puede solicitar acceso, rectificación, cancelación u oposición de sus datos en codexybandconnect@gmail.com, incluyendo identificación y detalles de los datos a tratar.
        {'\n\n'}<Text style={styles.bold}>Modificaciones:</Text>
        {'\n'}Codexy puede modificar este aviso, informándole a través de medios legales.
        {'\n\n'}<Text style={styles.subtitle}>Contacto:</Text>
        {'\n'}Email: codexybandconnect@gmail.com:{'\n'}{'\n'}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa', // Un fondo claro para mejorar la legibilidad
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Color oscuro para el título para destacar
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666', // Color gris oscuro para el texto normal
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#444', // Un tono un poco más oscuro para los subtítulos
  },
  bold: {
    fontWeight: 'bold'
  }
});

export default TermsScreen;
