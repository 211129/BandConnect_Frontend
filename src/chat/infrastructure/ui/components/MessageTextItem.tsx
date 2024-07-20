import {StyleSheet, View, Text} from 'react-native';

type MessageTextItemProps = {
  message: string;
  time: string;
  isSender?: boolean;
};

const MessageTextItem = ({message, time, isSender}: MessageTextItemProps) => {
  return (
    <View style={[styles.container, isSender && styles.senderContainer]}>
      <View style={[styles.messageBox, isSender ? styles.senderMessageBox : styles.receiverMessageBox]}>
        <Text style={styles.message}>{message}</Text>
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
  message: {
    fontSize: 16,
    color: '#FFFFFF', // White text color
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

export default MessageTextItem;