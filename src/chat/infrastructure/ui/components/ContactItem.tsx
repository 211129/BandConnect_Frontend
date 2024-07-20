import {StyleSheet, View, Text, Image} from 'react-native';

type ContactItemTypeProps = {
  profileImageUrl: string;
  name: string;
};

const ContactItem = ({name, profileImageUrl}: ContactItemTypeProps) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: profileImageUrl}} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#1E1E1E', // Dark background color for the contact item
    marginBottom: 10,
    borderRadius: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: '#333333', // Dark background color for avatar
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 8,
    color: '#FFFFFF', // White text color for name
  },
});

export default ContactItem;
