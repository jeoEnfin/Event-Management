import { Image, StyleSheet, Dimensions, View } from 'react-native'
import React from 'react'
import { ResponsiveWidthComponent } from '../../utils/validations';

const screenWidth: any = Dimensions.get("window").width;

type Props = {
    poster_1: string;
    poster_2?: string;
    poster_3?: string;
    poster_4?: string;
    poster_5?: string;
}

const Poster1 = (props: Props) => {
    const Width: any = ResponsiveWidthComponent(screenWidth)
    return (
        <View style={[styles.container,{width: Width}]}>
            {props.poster_2 && <View>
                <Image
                    resizeMode='stretch'
                    style={styles.sub_poster}
                    source={{ uri: props.poster_2 }} />
                {props.poster_4 && <Image
                    resizeMode='stretch'
                    style={styles.sub_poster}
                    source={{ uri: props.poster_4 }} />}
            </View>}
            {props.poster_1 && <View>
                <Image
                    resizeMode='stretch'
                    style={styles.main_poster}
                    source={{ uri: props.poster_1 }} />
            </View>}
            {props.poster_3 && <View>
                <Image
                    resizeMode='stretch'
                    style={styles.sub_poster}
                    source={{ uri: props.poster_3 }} />
                {props.poster_5 && <Image
                    resizeMode='stretch'
                    style={styles.sub_poster}
                    source={{ uri: props.poster_5 }} />}
            </View>}
        </View>
    )
}

export default Poster1

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    main_poster: {
        height: 120,
        width: 200,
        margin: 10
    },
    sub_poster: {
        height: 55,
        width: 140,
        margin: 5
    }
})