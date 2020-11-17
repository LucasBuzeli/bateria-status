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
   let tag = null;
   let battery = null;
   let serial = null;
   let family = null;
   let arrayResult = [];

   actualSnapshot.forEach((elementoAtual, indice) => {

      let myOriginalDate = elementoAtual.message_date;
      battery = elementoAtual.battery;
      tag = elementoAtual.tag;
      serial = elementoAtual.serial;
      family = elementoAtual.family;

      if (battery < 90) {
         console.log(`Mensagem: ${myOriginalDate} | Bateria: ${battery} | Tag: ${tag} | Serial: ${serial} | Familia: ${family}`);
         arrayResult.push({
            Mensagem: myOriginalDate,
            Bateria: battery,
            Tag: tag,
            Serial: serial,
            Familia: family
         });
      }
   });
      return arrayResult;
};

module.exports = { verificarAmbiente };
