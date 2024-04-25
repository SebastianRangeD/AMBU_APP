const selectTicket = require('./Gera.js'),
    filterTickets = require('./Gera.js'),
    endTicket = require('./Gera.js');

// filterTickets test
test('Encontrar el ticket con el UID: 1ui98-1234io-923893', () => {
    expect(filterTickets('1ui98-1234io-923893')).toBe({
        uid: '1ui98-1234io-923893',
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
    })
});

test('Encontrar el ticket con el UID: 1ui98-1234io-923893 y la CATEGORIE: Especie desplazada', () => {
    expect(filterTickets('1ui98-1234io-108276', 'Especie desplazada')).toBe({
        uid: '1ui98-1234io-108276',
        agent: 'Gerardo Diaz Olmedo',
        date: {
            creation: '12-04-2024',
            end: null,
        },
        area: 'Fauna',
        categorie: 'Especie desplazada',
        status: 'Activo',
        priority: 'Alta',
        comments: 'Pato atorado',
        evidence: ['C://fakepath/test-img.jpg'],
        coordinates: {
            lat: '108.823462',
            lng: '4.392801',
        },
    })
});

// selectTickets test
test('Seleccionar el ticket con el UID: 1ui98-1234io-923890', () => {
    expect(selectTicket('1ui98-1234io-923890')).toBe({
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
    })
});

test('Seleccionar el ticket con el UID: 1ui98-1234io-9238a1', () => {
    expect(selectTicket('1ui98-1234io-9238a1')).toBe({})
});

// endTicket test
test('Finalizar el ticket con UID: 1ui98-1234io-923893', () => {
    expect(endTicket('1ui98-1234io-923893')).toBe(true)
});

test('Finalizar el ticket con UID: 1ui98-1234io-9238a1', () => {
    expect(endTicket('1ui98-1234io-9238a1')).toBe(false)
});