import React, { useEffect, useState } from 'react';
import tickets from '../data/tickets.js';
import { ActivityIndicator, FlatList, View } from 'react-native';
import TicketItem from './TicketItem.jsx';
import TicketModal from './TicketModal.jsx';

const Loading = ({ ticketsArray = [], selectTicket }) => {
    if (!ticketsArray.length)
        return (
            <ActivityIndicator size={'large'} color={'#3DA891'} />
        );

    return (
        <FlatList data={ticketsArray}
            renderItem={({ item: ticket }) => (
                <TicketItem {...ticket} handlePress={selectTicket} />
            )
            }>
        </FlatList >
    );
}

const TicketsList = () => {
    // Tickets
    const [ticketsArray, setTicketsArray] = useState([]);
    const [activeTicket, setActiveTicket] = useState({});
    // Filters

    // Modal
    const [modalTicket, setModalTicket] = useState(false);

    useEffect(() => {
        setTicketsArray([]); // delete when using API
        displayTickets();
    }, []);

    // General functions
    const displayTickets = async () => {
        await setTimeout(() => { // simulated timeout when consuming API
            setTicketsArray([...tickets]);
        }, 1000);
    }

    const selectTicket = (_uid = '') => {
        if (!_uid) return;

        let ticketSelected = ticketsArray.find(({ uid }) => uid === _uid);
        setActiveTicket({ ...ticketSelected });
        setModalTicket(true);
    }

    return (
        <View style={{ justifyContent: 'center', height: '100%' }}>
            <Loading ticketsArray={ticketsArray} selectTicket={selectTicket} />

            <TicketModal isVisible={modalTicket} handleModal={setModalTicket} {...activeTicket} />
        </View>

    );
}

export default TicketsList;
