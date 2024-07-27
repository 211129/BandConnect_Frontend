import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface PostInputProps {
  onSubmit: (postData: {
    title: string;
    description: string;
    fileUri: string;
    fileType: string;
    category: string;
    price: number;
    timestamp: Date;
    userId: string;
  }) => void;
}

const PostInput: React.FC<PostInputProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileUri, setFileUri] = useState<string | undefined>(undefined);
  const [fileType, setFileType] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [timestamp] = useState(new Date());
  const [userId] = useState('user-id-placeholder'); // Reemplaza con la lógica para obtener el userId

  const handleChooseFile = async () => {
    const result = await ImagePicker.launchImageLibrary({ mediaType: 'photo' });
    if (result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      setFileUri(asset.uri);
      setFileType(asset.type);
    }
  };

  const handleSubmit = () => {
    if (title && description && fileUri && category && price) {
      onSubmit({
        title,
        description,
        fileUri,
        fileType: fileType ?? 'unknown',
        category,
        price: parseFloat(price),
        timestamp,
        userId,
      });
      setTitle('');
      setDescription('');
      setFileUri(undefined);
      setFileType(undefined);
      setCategory('');
      setPrice('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Nueva publicación</Text>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.publishText}>Publicar</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleChooseFile} style={styles.addPhotoContainer}>
        {fileUri ? (
          <Image source={{ uri: fileUri }} style={styles.addedPhoto} />
        ) : (
          <Ionicons name="add" size={24} color="#fff" />
        )}
        <Text style={styles.photoText}>Agregar fotos</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Precio</Text>
      <TextInput
        style={styles.input}
        placeholder="Precio"
        placeholderTextColor="#888"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />
      <Text style={styles.label}>Categoría</Text>
      <TextInput
        style={styles.input}
        placeholder="Categoría"
        placeholderTextColor="#888"
        value={category}
        onChangeText={setCategory}
      />
      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        placeholderTextColor="#888"
        value={description}
        multiline
        onChangeText={setDescription}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#000',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cancelText: {
    color: '#00f',
    fontSize: 16,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  publishText: {
    color: '#00f',
    fontSize: 16,
  },
  addPhotoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  addedPhoto: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  photoText: {
    color: '#fff',
  },
  label: {
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    color: '#fff',
  },
});

export default PostInput;
