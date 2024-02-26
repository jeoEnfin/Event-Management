import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfileSmallCard from './ProfileSmallCard'

type Props = {
    data: any;
}

type ItemProps = {
    avatar: string;
    firstName: string;
    lastName: string;
    email: string;
    id: string;
}

const ProfileCardList = (props: Props) => {

    const Item = ({ id, avatar, firstName, lastName, email }: ItemProps) => {
        return (
            <ProfileSmallCard
                key={id}
                avatar={avatar}
                firstName={firstName}
                lastName={lastName}
                email={email}
            />
        )
    }

    return (
            <FlatList
                data={props.data}
                renderItem={({ item }) =>
                    <Item
                        avatar={item.avatar}
                        firstName={item.first_name}
                        lastName={item.last_name}
                        email={item.email}
                        id={item.id}
                    />
                }
                horizontal={true}
                keyExtractor={(item: any) => item.id}
                style={{margin: 3 }}
                showsHorizontalScrollIndicator={false}
            />
    )
}

export default ProfileCardList

const styles = StyleSheet.create({})