import { StyleSheet } from "react-native"
import { COLORS } from "../../constants"

export const styles = StyleSheet.create({
    container: {
        // justifyContent: "center",
        alignItems: "center",
        flex: 1,
        width: '100%',
        padding: 18,
    },
    button: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
    },
    card: {
        backgroundColor: COLORS._background.primary,
        width: '100%',
        borderRadius: 5
    }
})