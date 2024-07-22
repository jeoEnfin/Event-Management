import { StyleSheet } from "react-native";
import { COLORS, TXT_SIZE } from ".";

export const style = StyleSheet.create({
    txt_1: {
        fontWeight: '600',
        fontSize: 16,
        color: COLORS.text.main
    },
    txt_2: {
        fontWeight: '400',
        fontSize: 14,
        color: COLORS.text.secondary
    },
    txt_3: {
        fontWeight: '300',
        fontSize: TXT_SIZE.S,
        color: COLORS.text.main
    }
})