/* 
CAMPOS DEL TICKET
ticket = {
     uid: 'ID DEL TICKET',
     agent: 'AGENTE RESPONSABLE DEL TICKET',
     date: {
         creation: 'FECHA DE CREACION',
         end: 'FECHA DE FINALIZACION',
     },
     area: 'AREA',
     categorie: 'CATEGORIA',
     status: 'ESTATUS',
     priority: 'PRIORIDAD',
     comments: 'COMENTARIOS ADICIONALES',
     evidence: [ARREGLO DE EVIDENCIAS],
     coordinates: {
         lat: 'LATITUD',
         lng: 'LONGITUD',
     },
} 
*/

// TICKET de prueba
const ticket = {
    uid: '1ui98-1234io-923890',
    agent: 'Gerardo Diaz Olmedo',
    date: {
        creation: '12-04-2024',
        end: null,
    },
    area: 'Fauna',
    categorie: 'Especie en riesgo',
    status: 'Activo',
    priority: 'Alta',
    comments: 'Pato atorado',
    evidence: ['C://fakepath/test-img.jpg'],
    coordinates: {
        lat: '108.823462',
        lng: '4.392801',
    },
}

// Arreglo de TICKETS
const ticketsArray = [
    ticket, { ...ticket, uid: '1ui98-1234io-923893', categorie: 'Procreacion' }, { ...ticket, uid: '1ui98-1234io-108276', categorie: 'Especie desplazada' }
];

/* 
FILTRADO DE TICKETS

Input: String _uid, String _categorie
return Array ticketsFiltered;

Filtrar el arreglo de ticketsArray ya sea por UID o CATEGORIA,
contempla que se pueden filtrar por ambos campos.

RECOMENDACION: Usar el metodo de array .filter().
*/
const filterTickets = (_uid = '', _categorie = '') => {
    return ticketsArray.filter(t => (_uid === '' || t.uid === _uid) && (_categorie === '' || t.categorie === _categorie));
}

module.exports = filterTickets;

/* 
DETALLES DE TICKET

Input: String _uid
return Obj ticketSelected;

Mostrar el objeto que corresponda al UID recibido

RECOMENDACION: Usar el metodo de array .find().
*/
const selectTicket = (_uid = '') => {
    if (!_uid) return;

    let ticketSelected = ticketsArray.find(({ uid }) => uid === _uid);
    // console.log(ticketSelected);
    return ticketSelected;
}

module.exports = selectTicket;

/* 
DETALLES DE TICKET

Input: String _uid
return Boolean;

Finalizar el ticket deseado

RECOMENDACION: Editar el Obj del ticket seleccionado y actualizar su campo
STATUS a "Finalizado" y el campo date.end con la fecha de finalizacion en formato DD-MM-YYYY.
*/
const endTicket = (_uid = '') => {
    const ticketSelected = selectTicket(_uid);
    const endDate = new Date();
    const dia = String(endDate.getDate()).padStart(2, '0'); 
    const mes = String(endDate.getMonth() + 1).padStart(2, '0'); 
    const año = endDate.getFullYear();

    if (ticketSelected) {
        ticket.status = 'Finalizado';
        const fechaString = `${dia}-${mes}-${año}`;
        ticket.date.end = fechaString;
        // console.log('Estado del ticket editado:', ticket);
        return true;
    } else {
        // console.log('No se encontró ningún ticket con el UID especificado.');
        return false;
    }
}

module.exports = endTicket;