import {GoogleSignin} from '@react-native-google-signin/google-signin';

const googleConfig = () => {
  GoogleSignin.configure({
    webClientId:
      '133685928058-f9r6qrhqppsrscgjnbt0fdfjln4mj01a.apps.googleusercontent.com',
    offlineAccess: true,
  });
};

export default googleConfig;
