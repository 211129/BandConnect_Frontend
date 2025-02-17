import React, { useLayoutEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AppBar from '../../../../shared/infrastructure/ui/components/AppBar';
import TabBar from '../components/TabBar';
import ChatItem from '../components/ChatItem';
import FloatingButton from '../components/FloatingButton';
import TermsButton from '../components/TermsButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListChatScreenRouteProp } from '../types/chatScreensRouteProps';
import ChatEntity from '../../../domain/entities/ChatEntity';
import { firebaseAuth, firebaseDB } from '../../../../../config/firebase.config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

const ListChatScreen = ({ navigation }: ListChatScreenRouteProp) => {
  const [chats, setChats] = React.useState([] as ChatEntity[]);
  const userCredentials = firebaseAuth.currentUser;

  const onChatPress = (
    chatId: string,
    name: string,
    profileImageUrl: string,
  ) => {
    navigation.navigate('ChatScreen', { name, chatId, profileImageUrl });
  };

  useLayoutEffect(() => {
    const collectionRef = collection(firebaseDB, 'chats');
    const q = query(
      collectionRef,
      where('participantIds', 'array-contains', userCredentials?.uid),
    );

    const unsubscribe = onSnapshot(q, snapshot => {
      const newChats = snapshot.docs.map(doc => doc.data() as ChatEntity);
      setChats(newChats);
    });

    return () => {
      unsubscribe();
    };
  }, [userCredentials?.uid]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const renderChats = () => {
    return chats.map((chat, index) => {
      const participants = chat.participants.filter(
        participant => participant._id !== userCredentials?.uid,
      );

      const participantNames: string[] = [];

      participants.forEach(participant => {
        participantNames.push(
          `${participant?.firstname} ${participant?.lastname}`,
        );
      });

      const chatName = participantNames.join(' ');
      const lastMessage =
        chat.lastMessage.message.length > 0
          ? chat.lastMessage.message
          : 'Sin mensajes aún';
      const datetime = new Date(chat.lastMessage.date);
      const datetimeFinal = `${datetime.getDate()}/${datetime.getMonth() + 1}/${datetime.getFullYear()} ${datetime.getHours()}:${datetime.getMinutes()}`;
      const profileImageUrl = participants[0].profileImageUrl;

      return (
        <TouchableOpacity
          key={index}
          onPress={() => onChatPress(chat._id, chatName, profileImageUrl)}>
          <ChatItem
            profileImageUrl={profileImageUrl}
            name={chatName}
            message={lastMessage}
            datetime={chat.lastMessage.date ? datetimeFinal : ''}
          />
        </TouchableOpacity>
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title=""
        leftIcon="arrow-back"
        rightIcon="search"
        onLeftPress={handleGoBack}
        onRightPress={() => console.log('Right icon pressed')}
      />
      <TabBar />
      <ScrollView style={styles.messagesContainer}>{renderChats()}</ScrollView>
      <FloatingButton 
        icon="add" 
        onPress={() => navigation.navigate('NewChatScreen')} 
      />
      <TermsButton 
        icon="document-text" 
        onPress={() => navigation.navigate('TermsScreen')} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E', 
  },
  messagesContainer: {
    display: 'flex',
    paddingHorizontal: 10,
    backgroundColor: '#1E1E1E', 
  },
});

export default ListChatScreen;


