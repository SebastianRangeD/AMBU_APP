import React from 'react'
import Constants from 'expo-constants';
import { View } from "react-native";
import TicketsList from '../components/TicketsList';
import TopBar from '../components/TopBar';

export default function Home() {
    return (
        <View style={{ flexGrow: 1, backgroundColor: '#fff', marginBottom: 195 }}>
            <TopBar searchActive={true} />

            <TicketsList />
        </View>
    )
}