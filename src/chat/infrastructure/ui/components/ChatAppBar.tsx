import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type ChatAppBarProps = {
  avatar: string;
  name: string;
  onBackPress: () => void;
};

const ChatAppBar = ({avatar, name, onBackPress}: ChatAppBarProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress}>
        <Ionicons name="chevron-back" size={30} color="#FFFFFF" />
      </TouchableOpacity>
      <Image source={{uri: avatar}} style={styles.avatar} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#1E1E1E', // Dark background color for the app bar
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#333333', // Dark background color for avatar
    marginLeft: 10,
  },
  name: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFFFFF', // White text color for name
  },
});

export default ChatAppBar;

