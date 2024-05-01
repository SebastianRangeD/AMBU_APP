import React from 'react'
import { Button, View } from "react-native";
import TicketsList from '../components/TicketsList';
import TopBar from '../components/TopBar';

export default function Home({ navigation }) {
    return (
        <View style={{ flexGrow: 1, backgroundColor: '#fff', paddingBottom: 195 }}>
            <TopBar searchActive={true} />

            {/* <Button title='Go user' onPress={() => { navigation.navigate('Settings') }} /> */}
            <TicketsList />
        </View>
    )
}