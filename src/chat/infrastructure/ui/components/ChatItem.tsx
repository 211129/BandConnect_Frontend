import {StyleSheet, View, Text, Image} from 'react-native';

type ChatItemTypeProps = {
  profileImageUrl: string;
  name: string;
  message: string;
  datetime: string;
  unread?: number;
};

const ChatItem = ({
  profileImageUrl,
  name,
  message,
  datetime: time,
  unread,
}: ChatItemTypeProps) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: profileImageUrl}} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.message} numberOfLines={1}>
          {message}
        </Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{time}</Text>
        {unread && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{unread}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#333333', // Dark background for the item
    marginBottom: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFFFFF', // White text color for the name
    paddingBottom: 4,
  },
  message: {
    color: '#BBBBBB', // Light gray text color for the message
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  time: {
    color: '#BBBBBB', // Light gray text color for the time
  },
  unreadBadge: {
    backgroundColor: '#1E68D7', // Blue background for the unread badge
    borderRadius: 12,
    paddingHorizontal: 6,
    marginTop: 4,
  },
  unreadText: {
    color: '#FFFFFF', // White text color for the unread count
  },
});

export default ChatItem;
