var ids = [
    {idRow: 'row-received-message', idImg: 'icon-received-message', idTitle: 'title-received-message', idCount: 'number-of-received-message'},
    {idRow: 'row-sent-message', idImg: 'icon-sent-message', idTitle: 'title-sent-message', idCount: 'number-of-sent-message'}, 
    {idRow: 'row-starred-message', idImg: 'icon-starred-message', idTitle: 'title-starred-message', idCount: 'number-of-starred-message'}, 
    {idRow: 'row-spam-message', idImg: 'icon-spam-message', idTitle: 'title-spam-message', idCount: 'number-of-spam-message'},
    {idRow: 'row-papper-bin', idImg: 'icon-papper-bin', idTitle: 'title-papper-bin', idCount: 'number-of-papper-bin'},
];


document.addEventListener('DOMContentLoaded', function(event) {

    if( !getDataFromLocalstorage(receivedMessagesCollectionName) ){

        saveDataInLocalstorage(receivedMessagesCollectionName, recibidos);

    } else if (!getDataFromLocalstorage(sentMessagesCollectionName)){

        saveDataInLocalstorage(sentMessagesCollectionName, enviados);

    } else if (!getDataFromLocalstorage(paperBinCollectionName)){

        saveDataInLocalstorage(paperBinCollectionName, papelera);

    }else{
        console.log('Ya existen datos en el localstorage');
        // Subrayar 'Recbidos' como primera acción al recargar página
        highlightEmailActions(ids[0].idRow, ids[0].idImg, ids[0].idTitle, ids[0].idCount);
        
        numberOfReceivedMessages();
        numberOfSentMessages()
        numberOfStarredMessages()
        numberOfSpamMessages()
        numberOfPaperBinMessages()
    }
});



function highlightEmailActions(idRow, idImg, idTitle, idCount){

    const row = document.getElementById(idRow);
    const img = document.getElementById(idImg);
    const divTitle = document.getElementById(idTitle);
    const divCount = document.getElementById(idCount);


    row.style.backgroundColor = 'var(--background-color)';
    img.style.filter = 'var(--icon-second-color-png)';

    divTitle.style.color = 'var(--second-color)'
    divTitle.style.fontWeight = '600';

    divCount.style.color = 'var(--second-color)';
    divCount.style.fontWeight = '600';
    
    deleteHighlightEmailActions(idImg);
    loadEmailInInbox(idRow);
}


function deleteHighlightEmailActions(idImg){

    let idsFilter = ids.filter( id => id.idImg != idImg );

    idsFilter.forEach( id => {
        
        let row = document.getElementById(id.idRow);
        let img = document.getElementById(id.idImg);
        
        let divTitle = document.getElementById(id.idTitle);
        let divCount = document.getElementById(id.idCount);

        row.style.backgroundColor = '';
        img.style.filter = '';

        divTitle.style.color = ''
        divTitle.style.fontWeight = '';    

        divCount.style.color = '';
        divCount.style.fontWeight = '';
    });
}



function loadEmailInInbox(idRow){

    const receivedMessageDB = getDataFromLocalstorage(receivedMessagesCollectionName);
    
    if(idRow == ids[0].idRow){
        populateEmailInbox(receivedMessageDB);
    }
    else if(idRow == ids[1].idRow){
        
        populateEmailInbox(
            getDataFromLocalstorage(sentMessagesCollectionName)
        );

    } else if(idRow == ids[2].idRow){
      
        populateEmailInbox(
            receivedMessageDB.filter( starredMessage => starredMessage.destacado )
        );

    } else if(idRow == ids[3].idRow){
        
        populateEmailInbox(
            receivedMessageDB.filter( spamMessage => spamMessage.spam )
        );

    } else{

        populateEmailInbox(
            getDataFromLocalstorage(paperBinCollectionName)
        );
    }

}


function populateEmailInbox(data){
    
    const ul = document.getElementById('inbox-email-list');
    let container = [];
    ul.innerHTML = '';
    

    for (let index = 0; index < data.length; index++) {
        container.push(
            populateMultipleEmailsInInbox(data[index], index)
        )
    }
    
    ul.innerHTML = container.join(' ');
}


function markStarredMessage(index){

    let receivedMessageDB = getDataFromLocalstorage(receivedMessagesCollectionName);
    receivedMessageDB[index].destacado = receivedMessageDB[index].destacado ? false: true;

    saveDataInLocalstorage(receivedMessagesCollectionName, receivedMessageDB);
    populateEmailInbox(receivedMessageDB);
    numberOfStarredMessages();
}


function markSpamMessage(index){

    let spamMessageDB = getDataFromLocalstorage(receivedMessagesCollectionName);
    spamMessageDB[index].spam = spamMessageDB[index].spam ? false: true;

    saveDataInLocalstorage(receivedMessagesCollectionName, spamMessageDB);
    populateEmailInbox(spamMessageDB);
    numberOfSpamMessages();
}


function moveMessageToPaperBin(index){

    let receivedMessageDB = getDataFromLocalstorage(receivedMessagesCollectionName);
    let paperBinDB = getDataFromLocalstorage(paperBinCollectionName);

    deleteReceivedMessage(index);

    paperBinDB.push( 
        receivedMessageDB[index]
    )
    
    saveDataInLocalstorage(paperBinCollectionName, paperBinDB);
    
    numberOfPaperBinMessages();
    numberOfReceivedMessages();
}


function deleteReceivedMessage(index){

    let receivedMessageDB = getDataFromLocalstorage(receivedMessagesCollectionName);
    let newData = [];

    for (let i = 0; i < receivedMessageDB.length; i++) {
        if( i != index){
            newData.push(
                receivedMessageDB[i]
            );
        }
    }

    saveDataInLocalstorage(receivedMessagesCollectionName, newData);
    populateEmailInbox(newData);
}


function populateMultipleEmailsInInbox(email, index){

    const receiverSenderName = email.emisor  || email.receptor;
    const readMessage = email.leido? '' : 'font-weight: 600; color: var(--first-color);';
    const starredMessage = email.destacado  ? 'color: var(--favorite-color);' : '';
    /**
     *  email.emisor  || emisor.receptor
        email.asunto 
        email.mensaje 
        email.hora 
        email.leido
        email.destacado
        email.spam
     */
    
    let li = `
        <li class="list-group-item">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-4">
                        <div class="row">
                            <div class="col-1" style="text-align: right;">
                                <a onClick="markStarredMessage(${index})" id="mark-message-as-starred" style="${starredMessage}">
                                    <svg id="icon-starred-message" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                                    </svg>
                                </a>
                            </div>
                            <div onClick="" class="col-1" style="text-align: left;">
                                <a onClick="markSpamMessage(${index})">
                                    <img id="icon-spam-message" class="icon-color" style="width: 20px;" src="https://img.icons8.com/ios-glyphs/90/000000/error--v1.png"/>
                                </a>
                            </div>
                            <div id="issuer-name" class="col-4" style="text-align: left; ${readMessage}">
                                ${receiverSenderName}
                            </div>
                        </div>
                    </div>
                    <div class="col-5">
                        <div class="row">
                            <div id="mail-subject" class="col-auto" style="${readMessage}">${email.asunto} -</div>
                            <div id="mail-message" class="col-auto">${(email.mensaje).substring(0,20)}</div>
                        </div>
                    </div>

                    <div class="col-3">
                        <div class="row">
                            <div id="time-received" class="col-10" style="text-align: right; font-weight: 600; color: var(--first-color);">
                                ${email.hora}
                            </div>
                            <div class="col-auto">
                                <a onClick="moveMessageToPaperBin(${index})">
                                    <img id="icon-papper-bin" style="filter: var(--icon-second-color-png); width: 20px;" class="icon-color" src="https://img.icons8.com/fluency-systems-regular/90/000000/delete.png"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    `;

    return li;
}



