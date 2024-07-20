import {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AlertLoading from '../../../../shared/infrastructure/ui/components/AlertLoading';
import MessageType from '../../../domain/types/MessageType';
import {pick, types} from 'react-native-document-picker';

type MessageInputProps = {
  onSendText: (message: string) => Promise<void>;
  onSendFile: (image: string, messageType: MessageType) => Promise<void>;
};

const MessageInput = ({onSendText, onSendFile}: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [isSendingImage, setIsSendingImage] = useState(false);
  const [isSendingAudio, setIsSendingAudio] = useState(false);

  const handleSendText = async () => {
    setIsSendingMessage(true);
    setMessage('');
    await onSendText(message);
    setIsSendingMessage(false);
  };

  const handleSendImage = async () => {
    setIsSendingMessage(true);
    const result = await launchImageLibrary({mediaType: 'mixed'});
    if (!result.didCancel) {
      const photoUri = result.assets?.[0].uri as string;
      const type = result.assets?.[0].type as string;

      if (type.startsWith('video')) {
        setIsSendingImage(true);
        await onSendFile(photoUri, 'video');
        setIsSendingImage(false);
        setIsSendingMessage(false);
        return;
      }

      setIsSendingImage(true);
      await onSendFile(photoUri, 'image');
      setIsSendingImage(false);
    }
    setIsSendingMessage(false);
  };

  const handleSendAudio = async () => {
    setIsSendingMessage(true);
    try {
      const docs = await pick({
        type: [types.audio],
        allowMultiSelection: false,
      });
      const audioUri = docs[0].uri;
      if (audioUri) {
        setIsSendingAudio(true);
        await onSendFile(audioUri, 'audio');
        setIsSendingAudio(false);
      }
      setIsSendingMessage(false);
    } catch (error) {
      setIsSendingMessage(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {isSendingImage && <AlertLoading message="Subiendo imagen/video..." />}
      {isSendingAudio && <AlertLoading message="Subiendo audio..." />}
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu mensaje..."
          placeholderTextColor="#BDBDBD"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={handleSendImage} disabled={isSendingMessage}>
          <Icon
            name="image"
            size={30}
            color={isSendingMessage || message ? '#BDBDBD' : '#0A84FF'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSendAudio} disabled={isSendingMessage}>
          <Icon
            name="mic"
            size={30}
            color={isSendingMessage || message ? '#BDBDBD' : '#0A84FF'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSendText}
          disabled={message || isSendingMessage ? false : true}>
          <Icon name="send" size={30} color={message ? '#0A84FF' : '#BDBDBD'} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#1E1E1E', // Dark background color
    gap: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 15,
    marginRight: 10,
    fontSize: 16,
    color: '#FFFFFF', // White text color
    backgroundColor: '#333333', // Dark input background color
    borderRadius: 20,
  },
});

export default MessageInput;
