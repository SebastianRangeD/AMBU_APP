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
    evidence: ['https://dummyimage.com/600x600/fafafa/000000'],
    coordinates: {
        lat: '108.823462',
        lng: '4.392801',
    },
}

// Arreglo de TICKETS
export default [
    ticket, { ...ticket, uid: '1ui98-1234io-923893', categorie: 'Procreacion', comments: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque autem ad rerum sint assumenda modi consectetur est exercitationem facilis commodi explicabo deserunt necessitatibus quo ipsa numquam quod maxime, nisi excepturi!', status: 'Seguimiento' }, { ...ticket, uid: '1ui98-1234io-108276', categorie: 'Especie desplazada de su habitat natural endemica', status: 'Concluido' }, { ...ticket, uid: '1ui98-1234io-923891' }, { ...ticket, uid: '1ui98-1234io-923892' }, { ...ticket, uid: '1ui98-1234io-923894' }, { ...ticket, uid: '1ui98-1234io-923895' }, { ...ticket, uid: '1ui98-1234io-923896' }, { ...ticket, uid: '1ui98-1234io-923897' }, { ...ticket, uid: '1ui98-1234io-923898' },
]