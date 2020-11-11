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
      
      if (myDate.getTime() > maiorTimestamp) {
         tag = elementoAtual.tag;
         maiorTimestamp = myDate.getTime();
         
      }
   });
   return {
      ambiente: baseUrl,
      ultimaMensagem: new Date(maiorTimestamp),
      tag: tag,
      quantidade: actualSnapshot.length,
   };

};

module.exports = { verificarAmbiente };
