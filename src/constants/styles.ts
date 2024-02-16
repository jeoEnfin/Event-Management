import { StyleSheet } from "react-native";
import { COLORS, TXT_SIZE } from ".";

export const style = StyleSheet.create({
    txt_1: {
        fontWeight: 'bold',
        fontSize: TXT_SIZE.XXL,
        color: COLORS.text_color
    },
    txt_2: {
        fontWeight: '500',
        fontSize: TXT_SIZE.M,
        color: COLORS.text_color
    },
    txt_3: {
        fontWeight: '300',
        fontSize: TXT_SIZE.S,
        color: COLORS.text_color
    }
})