import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AuthContainer from './common/AuthContainer'
import AuthHeader from './common/AuthHeader'
import { useDispatch } from 'react-redux'
import { Logout, Role } from '../../store/actions'
import { COLORS } from '../../constants'
import AsyncStorageUtil from '../../utils/services/LocalCache'
import Rolecard from './common/Rolecard'

type Props = {
    route?: any;
}

type ItemProps = {
    id?: string;
    name?: string;
}

const screenWidth = Dimensions.get("window").width;

const RoleSelector = ({ route }: Props) => {
    const dispatch: any = useDispatch();
    const [roles, setRoles] = useState<any>(null)

    useEffect(() => {
        getRoles();
    }, [])

    const getRoles = async () => {
        const _roles = await AsyncStorageUtil.getData('userRoles');
        if (_roles.length > 0) {
            setRoles(_roles)
        }
    };

    const logOut = () => {
        dispatch(Logout());
    };

    const chooseRole = (role: any) => {
        if (role) {
            dispatch(Role(role));
        }
    }

    const Item = ({ id, name }: ItemProps) => {
        return ( 
            <Rolecard key={id} roleName={name} onRolePress={() => { chooseRole(id) }} />
        )
    }

    return (
        <AuthContainer>
            <View style={{ flex: 1, justifyContent: 'space-between', height: '100%', width: screenWidth, paddingHorizontal: 30 }}>
                <AuthHeader
                    title='Choose a Role'
                    subTitle='Please select a role for continue'
                />
                {roles && <FlatList
                    data={roles}
                    renderItem={({ item }) =>
                        <Item
                            key={item._id}
                            id={item._id}
                            name={item.name}
                        />
                    }
                    keyExtractor={(item: any) => item.id}
                    style={{ margin: 3 ,width: '100%'}}
                />}
                <View style={styles.infoTxtBody}>
                    <Text style={styles.infoTxt}>Don't want to continue ? <Text
                        style={{ color: COLORS.secondary.main, fontWeight: '600' }}
                        onPress={() => { logOut() }}

                    >Login</Text></Text>
                </View>
            </View>

        </AuthContainer>
    )
}

export default RoleSelector

const styles = StyleSheet.create({
    infoTxtBody: {
        alignItems: 'center',
        marginVertical: 25
    },
    infoTxt: {
        color: COLORS.text.main
    },
})