import { StyleSheet } from "react-native"
import { COLORS } from "../../constants"

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 30,
        alignItems: 'center',
    },
    imgContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 70
    },
    imgIcon: {
        width: 140,
        height: 140,
    },
    details: {
        alignItems: 'center',
        width: '90%',
        marginTop: 10,
        gap: 10
    },
    report_container: {
        width: '95%',
        height: 70,
        borderWidth: 2,
        borderColor: COLORS.baseWhite,
        borderRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 20
    },
    report_body: {
        alignItems: 'center',
        justifyContent: 'center',
     
    }
})