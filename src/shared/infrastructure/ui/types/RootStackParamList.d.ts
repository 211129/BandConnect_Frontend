type RootStackParamList = {
  PreLoginScreen: undefined;
  SplashScreen: undefined;
  SignUpScreen: undefined;
  SignInScreen: undefined;
  ListChatScreen: undefined;
  ChatScreen: { name: string; chatId: string; profileImageUrl: string };
  NewChatScreen: undefined;
  TermsScreen: undefined;
  SelectRoleScreen: undefined;
  SignUpMusicianBasicInfoScreen: undefined;
  SignUpMusicianProfileScreen: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    location: string;
  };
  SignUpMusicianContactScreen: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    location: string;
    groupDescription: string;
    repertoire: string;
    yearsOfExperience: string;
    performanceVideos: string;
    groupPhotos: string;
  };
};

export default RootStackParamList;

