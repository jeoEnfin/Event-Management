import { Linking } from 'react-native';

type Props ={
    subject?:string;
    body?: string;
}

export const sendEmail = (props: Props) => {
    let url = `mailto:jeothankachan98@gmail.com`;
  
    // // Create email link query parameters
    // const query = new URLSearchParams({
    //   subject: props.subject,
    //   body: props.body,
    // });
  
    // if (query.toString().length > 0) {
    //   url += `?${query.toString()}`;
    // }
  
    // Open the link
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  }

 