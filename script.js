console.log('JS VUE OK!');

//struttura dati dei contatti
const contacts = [
    {
        name: 'Michele',
        avatar: '_1',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Hai portato a spasso il cane?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Ricordati di stendere i panni',
                status: 'sent'
            },
            {
                date: '10/01/2020 16:15:22',
                message: 'Tutto fatto!',
                status: 'received'
            }
        ],
    },
    {
        name: 'Fabio',
        avatar: '_2',
        visible: true,
        messages: [
            {
                date: '20/03/2020 16:30:00',
                message: 'Ciao come stai?',
                status: 'sent'
            },
            {
                date: '20/03/2020 16:30:55',
                message: 'Bene grazie! Stasera ci vediamo?',
                status: 'received'
            },
            {
                date: '20/03/2020 16:35:00',
                message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                status: 'sent'
            }
        ],
    },
    {
        name: 'Samuele',
        avatar: '_3',
        visible: true,
        messages: [
            {
                date: '28/03/2020 10:10:40',
                message: 'La Marianna va in campagna',
                status: 'received'
            },
            {
                date: '28/03/2020 10:20:10',
                message: 'Sicuro di non aver sbagliato chat?',
                status: 'sent'
            },
            {
                date: '28/03/2020 16:15:22',
                message: 'Ah scusa!',
                status: 'received'
            }
        ],
    },
    {
        name: 'Alessandro B.',
        avatar: '_4',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Lo sai che ha aperto una nuova pizzeria?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Si, ma preferirei andare al cinema',
                status: 'received'
            }
        ],
    },
    {
        name: 'Alessandro L.',
        avatar: '_5',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ricordati di chiamare la nonna',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Va bene, stasera la sento',
                status: 'received'
            }
        ],
    },
    {
        name: 'Claudia',
        avatar: '_6',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ciao Claudia, hai novità?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Non ancora',
                status: 'received'
            },
            {
                date: '10/01/2020 15:51:00',
                message: 'Nessuna nuova, buona nuova',
                status: 'sent'
            }
        ],
    },
    {
        name: 'Federico',
        avatar: '_7',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Fai gli auguri a Martina che è il suo compleanno!',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Grazie per avermelo ricordato, le scrivo subito!',
                status: 'received'
            }
        ],
    },
    {
        name: 'Davide',
        avatar: '_8',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ciao, andiamo a mangiare la pizza stasera?',
                status: 'received'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:51:00',
                message: 'OK!!',
                status: 'received'
            }
        ],
    }
]





const app = new Vue({
    el:'#root',
    data:{
        contacts,
        activeUser: undefined,
        newMessage: '',
        stringInput: '',    //stringa di ricerca dell'utente nei contatti
        deleteUser: undefined  //serve per settare la direttiva per far vedere o meno il div con l'opzione di elimianre il messagio
    },
    methods:{
        imgPath(contact){
            return `img-bolzapp/avatar${contact.avatar}.jpg`;
           //console.log(`/img-bolzapp/avatar${contact.avatar}.jpg`);
        },
        userSelection(index){
            this.activeUser = index;
            console.log(this.activeUser);
        },
        /*messageTypology(message){
                return `${message.status}`
            
        },*/
        getLastMessageElement(contact){    //funzione per recuperare l'ultimo messagio inviato da ciascuno dei vari contatti
            const messages = contact.messages;
            const lastMessage = (messages.length > 0) ? messages[messages.length - 1] : undefined; //controllo che l'ultimo messagio inviato non sia la stringa vuota
            return lastMessage; 
        },
        getLastMessage(contact){    //funzione per recuperare l'ultimo messagio inviato da ciascuno
            //const messages = contact.messages;
           // const lastMessage = (messages.length > 0) ? messages[messages.length - 1].message : '';
           const lastMessage = this.getLastMessageElement(contact);
            
            return lastMessage ? lastMessage.message : ''; 
        },
        getLastMessageDate(contact){
            const lastMessage = this.getLastMessageElement(contact);
            if(lastMessage !== undefined){
                const date = lastMessage.date;
                const fullHour = date.split(' ')[1];
                const temporary = fullHour.split(':');
                return temporary[0] + ':'  +  temporary[1];
            }else{
                return '';
            }
        },
        addMessage(message){
            //creo oggetto che mi rappresenta il nuovo messaggio da aggiungere all'array messages del contatto selezionato(attivo)
            const newMessage={
                date: '10/01/2020 15:51:00',
                message:this.newMessage,
                status:'sent'
            };
            message.push(newMessage);   //aggiungo l'oggetto creato all'array di oggetti 'message'
            setTimeout(this.addReply,1000,message); //come ulteriore parametro passo message che è il parametro che serve alla funzione addReply
            this.newMessage = '';   //resetto il text dell'input
        },
        addReply(message){
            const messageReply={
                date: '10/01/2020 15:51:00',
                message:'OK',
                status:'received'
            };
            message.push(messageReply);   
        },
        searchString(string){
            for(let i = 0; i < this.contacts.length;i++){
                string = string.toLowerCase();
                if(this.contacts[i].name.toLowerCase().includes(string)){
                    this.contacts[i].visible = true;
                }else{
                    this.contacts[i].visible = false;
                }
            }
           // this.stringInput = '';  //resetto il text dell'input
        },
        setToDelete(index){
            this.deleteUser = index;
        },
        deleteMessage(index){
             this. contacts[this.activeUser].messages.splice(index,1);   
             this.deleteUser = undefined; 
        },
        getHour(message){
                const date = message.date;
                const fullHour = date.split(' ')[1];
                const temporary = fullHour.split(':');
                return temporary[0] + ':'  +  temporary[1];
        }
        
    }
});