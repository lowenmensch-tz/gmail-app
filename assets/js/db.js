
var recibidos = [
    {
        emisor: 'Juan Perez',
        correoEmisor: 'jperez@gmail.com',
        asunto: 'Tarea primer parcial',
        mensaje: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
        hora: '10:00am',
        leido: true,
        destacado: true,
        spam: false
       },
       {
        emisor: 'Juan Perez',
        correoEmisor: 'jperez@gmail.com',
        asunto: 'Tarea primer parcial',
        mensaje: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
        hora: '10:00am',
        leido: true,
        destacado: true,
        spam: false
       },        
       {
        emisor: 'Juan Perez',
        correoEmisor: 'jperez@gmail.com',
        asunto: 'Tarea primer parcial',
        mensaje: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
        hora: '10:00am',
        leido: true,
        destacado: true,
        spam: false
       },
       {
        emisor: 'Juan Perez',
        correoEmisor: 'jperez@gmail.com',
        asunto: 'Tarea primer parcial',
        mensaje: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
        hora: '10:00am',
        leido: true,
        destacado: true,
        spam: false
       },        
       {
        emisor: 'Juan Perez',
        correoEmisor: 'jperez@gmail.com',
        asunto: 'Tarea primer parcial',
        mensaje: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
        hora: '10:00am',
        leido: true,
        destacado: true,
        spam: false
       },
       {
        emisor: 'Juan Perez',
        correoEmisor: 'jperez@gmail.com',
        asunto: 'Tarea primer parcial',
        mensaje: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
        hora: '10:00am',
        leido: true,
        destacado: true,
        spam: false
       },        
       {
        emisor: 'Juan Perez',
        correoEmisor: 'jperez@gmail.com',
        asunto: 'Tarea primer parcial',
        mensaje: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
        hora: '10:00am',
        leido: true,
        destacado: true,
        spam: false
       },
       {
        emisor: 'Juan Perez',
        correoEmisor: 'jperez@gmail.com',
        asunto: 'Tarea primer parcial',
        mensaje: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
        hora: '10:00am',
        leido: false,
        destacado: true,
        spam: false
       },        
];


var enviados = [
    {
        receptor: 'Pedro Martinez',
        emailReceptor: 'pmartinez@gmail.com',
        asunto: 'Saludos desde Intibucá',
        mensaje: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
        hora: '11:00am'
       }
];


var papelera = [
    {
        emisor: 'Juan Perez',
        correoEmisor: 'jperez@gmail.com',
        asunto: 'Tarea primer parcial',
        mensaje: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
        hora: '10:00am',
        leido: true,
        destacado: true,
        spam: false
       }  
];

var localStorage = window.localStorage
var paperBinCollectionName = 'papelera';
var sentMessagesCollectionName = 'enviados';
var receivedMessagesCollectionName = 'recibidos';


var getDataFromLocalstorage = (nameCollection)=>{
    return JSON.parse(localStorage.getItem(nameCollection));
}


var saveDataInLocalstorage = (nameCollection, data) => {
    localStorage.setItem(nameCollection, JSON.stringify(data));
}


function numberOfReceivedMessages(){
    
    const receivedMessageDB = getDataFromLocalstorage(receivedMessagesCollectionName);
    updateNumberMessages(ids[0].idCount, receivedMessageDB.length);
}


function numberOfSentMessages(){
    
    const sentMessageDB = getDataFromLocalstorage(sentMessagesCollectionName);
    updateNumberMessages(ids[1].idCount, sentMessageDB.length);
}


function numberOfStarredMessages(){
    
    const receivedMessageDB = getDataFromLocalstorage(receivedMessagesCollectionName);
    updateNumberMessages(
            ids[2].idCount, 
            (receivedMessageDB.filter( message => message.destacado ) ).length 
        );
}


function numberOfSpamMessages(){
    
    const receivedMessageDB = getDataFromLocalstorage(receivedMessagesCollectionName);
    updateNumberMessages(
            ids[3].idCount, 
            (receivedMessageDB.filter( message => message.spam)).length 
    );
}


function numberOfPaperBinMessages(){

    const paperBinDB = getDataFromLocalstorage(paperBinCollectionName);
    updateNumberMessages(ids[4].idCount, paperBinDB.length);
}


function updateNumberMessages(elementID, number){

    const div = document.getElementById(elementID);
    div.innerHTML = `(${number})`;
}