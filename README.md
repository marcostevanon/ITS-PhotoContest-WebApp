## This app is created for **EDUCATIONAL PURPOSE ONLY**, the data entered may not be protected and it is recommended not to use real or sensitive data

## Questa app è creata a **SOLO SCOPO EDUCATIVO**, i dati inseriti potrebbero non essere protetti e si raccomanda di non utilizzare dati reali o sensibili

# ITS PHOTOCONTEST - Angular Client
[![pipeline status](https://gitlab.com/its-photocontest/web-client/badges/master/pipeline.svg)](https://gitlab.com/its-photocontest/web-client/commits/dev)

Vedi **[backend](https://gitlab.com/its-photocontest/backend)**

## TECNOLOGIE UTILIZZATE
- ANGULAR
- SEMANTIC-UI
---

### LOGIN
La pagina **Login** contiene una semplice form per l'accesso all'app  
![login](https://s3-eu-west-1.amazonaws.com/tsac18-stevanon/images/documentation/login1.png)
![login](https://s3-eu-west-1.amazonaws.com/tsac18-stevanon/images/documentation/login2.png)

### REGISTRATION
La pagina **Registration** permette di creare un nuovo utente per accedere all'app  
![registration](https://s3-eu-west-1.amazonaws.com/tsac18-stevanon/images/documentation/registration1.png)

### GALLERY
La pagina Gallery contiene due elementi principali
- Lista con un numero limitato di foto per consentire la migliore esperienza utente
- Un paginatore per navigare attraverso le foto disponibili
- Per ogni immagine è visualizzato:
    - l'utente che l'ha caricate
    - la data e l'ora di caricamento
    - una form per votare in modo semplice la foto con un voto che va da 1 a 5 (è ammesso solo un voto per utente)
- È possibile cliccare su un immagine per visualizzare i voti degli utenti  

![gallery1](https://s3-eu-west-1.amazonaws.com/tsac18-stevanon/images/documentation/gallery1.png)
![gallery2](https://s3-eu-west-1.amazonaws.com/tsac18-stevanon/images/documentation/gallery2.png)

Attraverso il menu, per ogni foto, è possibile modificare i dati, cancellarla oppure scaricarla  
(modifica e cancellazione sono disponibile solo per le foto delle quali si è proprietari)  
![gallery3](https://s3-eu-west-1.amazonaws.com/tsac18-stevanon/images/documentation/gallery3.png)![gallery4](https://s3-eu-west-1.amazonaws.com/tsac18-stevanon/images/documentation/gallery4.png)

### UPLOAD FORM 
Contiene una form per il caricamento di nuove immagini

È possibile caricare un'immagine per volta  
![upload1](https://s3-eu-west-1.amazonaws.com/tsac18-stevanon/images/documentation/upload1.png)![upload2](https://s3-eu-west-1.amazonaws.com/tsac18-stevanon/images/documentation/upload2.png)![upload3](https://s3-eu-west-1.amazonaws.com/tsac18-stevanon/images/documentation/upload3.png)  

Una volta completato il caricamento sarà possibile aggiungere un titolo, una descrizione e dei tag alla foto  
Inoltre con il tasto "**Autodetect Description & Tags**" è possibile far generare automaticamente una descizione e dei tag attraverso l'intelligenza artificiale  
(Thank you [Microsoft Computer Vision](https://azure.microsoft.com/it-it/services/cognitive-services/computer-vision/))  
![upload4](https://s3-eu-west-1.amazonaws.com/tsac18-stevanon/images/documentation/upload4.png)![upload5](https://s3-eu-west-1.amazonaws.com/tsac18-stevanon/images/documentation/upload5.png)


### RANKING
La pagina Ranking contienele le prime 10 foto caricate in ordine di rilevanza (punteggio assegnato in base alla media dei voti in relazione al numero di voti)  

![ranking](https://s3-eu-west-1.amazonaws.com/tsac18-stevanon/images/documentation/ranking.png)

### SEARCH

Nella sezione cerca si può ricercare per:
- username
- titolo o descrizione del post
- tag
  
![search1](https://s3-eu-west-1.amazonaws.com/tsac18-stevanon/images/documentation/search1.png)![search2](https://s3-eu-west-1.amazonaws.com/tsac18-stevanon/images/documentation/search2.png)![search3](https://s3-eu-west-1.amazonaws.com/tsac18-stevanon/images/documentation/search3.png)![search4](https://s3-eu-west-1.amazonaws.com/tsac18-stevanon/images/documentation/search4.png)

### PROFILE
Nella sezione profilo è possibile vedere:
- i dettagli dell'utente
- il voto medio dei post dell'utente
- i post pubblicati dall'utente

![profile](https://s3-eu-west-1.amazonaws.com/tsac18-stevanon/images/documentation/profile.png)

---
`Developed by Marco Stevanon`
