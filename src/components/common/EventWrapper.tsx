import {StyleSheet, View} from 'react-native';
import React, {ReactNode} from 'react';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';

type Props = {
    children: ReactNode;
    backgroundColor?: string;
}

const EventWrapper: React.FC<Props> = ({ children,backgroundColor }) => {
    return (
        <View style={{ flex: 1 ,backgroundColor: backgroundColor}}>
            <ReactNativeZoomableView
                minZoom={1}
                maxZoom={1.5}
                initialZoom={1}
                bindToBorders={true}
                disablePanOnInitialZoom={true}
            >
                {children}
            </ReactNativeZoomableView>
        </View>
    )
}

export default EventWrapper

const styles = StyleSheet.create({})