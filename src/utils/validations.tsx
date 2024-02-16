import { Text ,Dimensions} from "react-native";
import { style } from "../constants/styles";

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
    // Define password criteria
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
  
    // Check if the password meets all criteria
    const isLengthValid = password.length >= minLength;
    const isPasswordValid = hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
  
    return isLengthValid && isPasswordValid;
  };

 export const NumberFormatter = ({value}:{value:any}) => {
    const formatNumber = (num:number) => {
      if (num < 1000) {
        return num;
      } else if (num < 1000000) {
        return (num / 1000).toFixed(1) + 'k';
      } else if (num < 1000000000) {
        return (num / 1000000).toFixed(1) + 'M';
      } else if (num < 1000000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
      } else {
        return (num / 1000000000000).toFixed(1) + 'T';
      }
    };
  
    return <Text style={style.txt_1}>{formatNumber(value)}</Text>;
  };

  export const ResponsiveWidthComponent = ({value}:{value: number}) => {

      const handleDimensionsChange = (num: number) => {
        const newScreenHeight = Dimensions.get('window').height;
  
        if (num > newScreenHeight) {
         return (num)
        } else {
          return (newScreenHeight);
        }}
      
    return handleDimensionsChange(value);
  }