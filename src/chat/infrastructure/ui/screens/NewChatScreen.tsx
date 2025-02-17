import {SafeAreaView} from 'react-native-safe-area-context';
import AppBar from '../../../../shared/infrastructure/ui/components/AppBar';
import {NewChatScreenRouteProp} from '../types/chatScreensRouteProps';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ContactItem from '../components/ContactItem';
import {useEffect, useState} from 'react';
import {firebaseAuth} from '../../../../../config/firebase.config';
import UserEntity from '../../../../users/domain/entities/UserEntity';
import {
  findUserByIdUseCase,
  listUsersUseCase,
} from '../../../../users/infrastructure/dependecies';
import {createChatUseCase} from '../../dependecies';
import ParticipantEntity from '../../../domain/entities/ParticipantEntity';
import AlertLoading from '../../../../shared/infrastructure/ui/components/AlertLoading';

const NewChatScreen = ({navigation}: NewChatScreenRouteProp) => {
  const [contacts, setContacts] = useState([] as UserEntity[]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingChat, setIsAddingChat] = useState(false);

  const userCredentials = firebaseAuth.currentUser;

  useEffect(() => {
    const fetchContacts = async () => {
      const data = await listUsersUseCase.execute();

      const filteredData = data.filter(
        user => user._id !== userCredentials?.uid,
      );

      setContacts(filteredData);
      setIsLoading(false);
    };

    fetchContacts();
  }, [userCredentials]);

  const onContactPress = async (contact: UserEntity) => {
    const senderUser = await findUserByIdUseCase.execute(
      userCredentials?.uid as string,
    );
    const receiverUser = await findUserByIdUseCase.execute(contact._id);
    const collaborators = [
      new ParticipantEntity(
        senderUser?._id as string,
        senderUser?.firstName as string,
        senderUser?.lastName as string,
        senderUser?.profileImageUrl as string,
      ),
      new ParticipantEntity(
        receiverUser?._id as string,
        receiverUser?.firstName as string,
        receiverUser?.lastName as string,
        receiverUser?.profileImageUrl as string,
      ),
    ];

    setIsAddingChat(true);
    await createChatUseCase.execute(collaborators);
    setIsAddingChat(false);

    navigation.navigate('ListChatScreen');
  };

  const renderContacts = () => {
    return contacts.map(contact => {
      contact.profileImageUrl =
        contact.profileImageUrl ||
        'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg';
      return (
        <TouchableOpacity
          key={contact._id}
          onPress={() => onContactPress(contact)}>
          <ContactItem
            profileImageUrl={contact.profileImageUrl}
            name={`${contact.firstName} ${contact.lastName}`}
            key={contact._id}
          />
        </TouchableOpacity>
      );
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title="Nuevo chat"
        leftIcon="chevron-back"
        leftIconColor="#FFFFFF"
        onLeftPress={() => navigation.goBack()}
      />
      {isAddingChat && <AlertLoading message="Creando chat..." />}
      {!isLoading && (
        <ScrollView style={styles.contacts}>{renderContacts()}</ScrollView>
      )}
      {isLoading && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#1E68D7" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E', // Dark background color for the screen
  },
  contacts: {
    display: 'flex',
    paddingHorizontal: 10,
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewChatScreen;
