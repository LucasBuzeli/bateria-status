const ambienteService = require("../src/ambiente.service");

const verificarAmbiente = async (baseUrl, userObject) => {
   console.log(`verificando ambiente ${baseUrl}`);

   //login
   let user = await ambienteService.recuperarLogin(baseUrl, userObject);

   //recuperei snapshot
   let actualSnapshot = await ambienteService.recuperarSnapshot(baseUrl, user.accessToken);

   //tratar o snapshot
   console.log(actualSnapshot.length);
   return recuperarMensagemMaisRecente(baseUrl, actualSnapshot);

};

const recuperarMensagemMaisRecente = (baseUrl, actualSnapshot) => {
   let maiorTimestamp = 0;
   let tag = null;
   let battery = null;
   let serial = null;
   let family = null;


   actualSnapshot.forEach((elementoAtual, indice) => {

      let myOriginalDate = elementoAtual.message_date;
      let myStringDate = myOriginalDate.substring(0, 2);
      let myStringMonth = myOriginalDate.substring(3, 5);
      let myStringYear = myOriginalDate.substring(6, 10);
      let myStringHour = myOriginalDate.substring(11, 13);
      let myStringMinute = myOriginalDate.substring(14, 16);
      let myStringSecond = myOriginalDate.substring(17, 19);

      let dataFormatada = `${myStringYear}/${myStringMonth}/${myStringDate} ${myStringHour}:${myStringMinute}:${myStringSecond}`;
      let myDate = new Date(dataFormatada);
      
        battery = elementoAtual.battery;
         tag = elementoAtual.tag;
         serial = elementoAtual.serial;
         family = elementoAtual.family;
         maiorTimestamp = myDate.getTime();
        
       if (battery < 90) {
         console.log(`Mensagem: ${elementoAtual.message_date} | Bateria: ${battery} | Tag: ${tag} | Serial: ${serial} | Familia: ${family}`);
       }
   });
};

module.exports = { verificarAmbiente };
