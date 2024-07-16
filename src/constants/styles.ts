import { StyleSheet } from "react-native";
import { COLORS, TXT_SIZE } from ".";

export const style = StyleSheet.create({
    txt_1: {
        fontWeight: 'bold',
        fontSize: TXT_SIZE.XXL,
        color: COLORS.text.main
    },
    txt_2: {
        fontWeight: '400',
        fontSize: TXT_SIZE.M,
        color: COLORS.text.secondary
    },
    txt_3: {
        fontWeight: '300',
        fontSize: TXT_SIZE.S,
        color: COLORS.text.main
    }
})