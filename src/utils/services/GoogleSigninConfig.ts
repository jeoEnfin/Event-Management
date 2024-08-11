import {GoogleSignin} from '@react-native-google-signin/google-signin';

const googleConfig = () => {
  GoogleSignin.configure({
    webClientId:
      '133685928058-f9r6qrhqppsrscgjnbt0fdfjln4mj01a.apps.googleusercontent.com',
    offlineAccess: true,
    iosClientId:
      '133685928058-gauebkt615q5t4faanrn6glbl66nkk0r.apps.googleusercontent.com',
  });
};

export default googleConfig;
