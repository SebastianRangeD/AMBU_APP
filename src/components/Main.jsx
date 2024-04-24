import React from 'react';
import Constants from 'expo-constants';
import { View } from "react-native";
import TicketsList from './TicketsList';
import TopBar from './TopBar';
import NavBar from './NavBar';

const Main = () => {
    return (
        <View style={{ paddingTop: Constants.statusBarHeight, flexGrow: 1, backgroundColor: '#3DA891' }}>
            <TopBar />

            <TicketsList />

            <NavBar />
        </View>
    );
}

export default Main;
