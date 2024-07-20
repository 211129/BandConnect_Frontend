import {StyleSheet, View, Text, Image} from 'react-native';

type MessageImageItemProps = {
  message: string;
  time: string;
  isSender?: boolean;
};

const MessageImageItem = ({message, time, isSender}: MessageImageItemProps) => {
  return (
    <View style={[styles.container, isSender && styles.senderContainer]}>
      <View style={[styles.messageBox, isSender ? styles.senderMessageBox : styles.receiverMessageBox]}>
        <Image source={{uri: message}} style={styles.imageMessage} />
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'flex-start',
    gap: 10,
  },
  senderContainer: {
    alignItems: 'flex-end',
  },
  messageBox: {
    maxWidth: '70%',
    padding: 20,
    borderRadius: 10,
  },
  senderMessageBox: {
    backgroundColor: '#0A84FF', // Blue color for sender
  },
  receiverMessageBox: {
    backgroundColor: '#333333', // Dark color for receiver
  },
  imageMessage: {
    width: 200,
    height: 200,
  },
  timeContainer: {
    marginLeft: 10,
    alignItems: 'center',
  },
  time: {
    fontSize: 12,
    color: 'gray',
  },
});

export default MessageImageItem;