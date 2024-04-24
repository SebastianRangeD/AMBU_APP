import React, { useEffect, useState } from 'react';
import tickets from '../data/tickets.js';
import { FlatList, View } from 'react-native';
import TicketItem from './TicketItem.jsx';
import TicketModal from './TicketModal.jsx';

const TicketsList = () => {
    // Tickets
    const [ticketsArray, setTicketsArray] = useState([]);
    const [activeTicket, setActiveTicket] = useState({});
    // Filters
    // Modal
    const [modalTicket, setModalTicket] = useState(false);

    useEffect(() => {
        displayTickets();
    }, []);

    // General functions
    const displayTickets = async () => {
        setTicketsArray([...tickets]);
    }

    const selectTicket = (_uid = '') => {
        let ticketSelected = {};

        if (!_uid) return;

        ticketSelected = ticketsArray.find(({ uid }) => uid === _uid);
        setActiveTicket({ ...ticketSelected });
        setModalTicket(true);
    }

    return (
        <View>
            <FlatList data={ticketsArray}
                renderItem={({ item: ticket }) => (
                    <TicketItem {...ticket} handlePress={selectTicket} />
                )
                }>
            </FlatList >

            <TicketModal isVisible={modalTicket} handleModal={setModalTicket} />
        </View>

    );
}

export default TicketsList;
