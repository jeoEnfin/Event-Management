import { ActivityIndicator, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainStack from './MainStack';
import { useDispatch, useSelector } from 'react-redux';
import AuthStack from './AuthStack';
import { Init } from '../store/actions';
import { COLORS } from '../constants';
import TabNav from './TabNav';

type Props = {
}

const RootNavigation = (props: Props) => {
    const [loading,setLoading] = useState<boolean>(true)
    const token = useSelector((state: any) => state.AuthReducers.authToken);
    const isAuth = useSelector((state: any) => state.AuthReducers.authentication);
    const dispatch:any = useDispatch()
    const init = async () =>{
        await dispatch(Init());
        setLoading(false);
    }

    useEffect(()=>{
        init();
    },[])

    if (loading){
        return(
            <View style={{flex:1,justifyContent: 'center'}}>
                <ActivityIndicator size='large' color={COLORS.background} />
            </View>
        )
    }

    return (
        <NavigationContainer>
            {(isAuth === false) ?
                <AuthStack /> :
                <MainStack />
            }
        </NavigationContainer>
    )
}

export default RootNavigation

