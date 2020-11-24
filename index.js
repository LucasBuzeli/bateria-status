const ambienteControlador = require("./src/ambiente.controller");
const jsonexport = require("jsonexport");
const fs = require("fs");

const main = async () => {
   let resultadoDosAmbientes = [];

   listaDeAmbientes = [
      "https://poc.relogtechnology.com/itauvip/",
      // "https://poc.relogtechnology.com/binpallet/",
      // "https://poc.relogtechnology.com/ferrolene/",
      // "https://bosch.relogtechnology.com/",
      // "https://aligntech.relogtechnology.com/",
      // "https://transnovag.relogtechnology.com/",
      // "https://gm.relogtechnology.com/",
      // "https://relogtechnology.com/",

   ];

   listaDeCredenciais = [
      { email: "admin@admin.smart", password: "Admin20" },
      // { email: "admin@admin.smart", password: "Admin20" },
      // { email: "admin@admin.smart", password: "Admin20" },
      // { email: "admin@admin.smart", password: "Admin20" },
      // { email: "admin@admin.smart", password: "Admin20" },
      // { email: "admin@admin.smart", password: "Admin20" },
      // { email: "admin@admin.smart", password: "Admin20" },
      // { email: "admin@admin.smart", password: "Admin20" },
   ];

   let nomeArquivos = [
     "Binpallet.csv", "ferrolene.csv", "Bosch.csv", "Aligntech.csv", "Transnovag.csv", "Gm.csv", "Cebrace.csv"
   ]

   for (const [indice, baseUrl] of listaDeAmbientes.entries()) {
      console.log(`Iteração ${indice} no ambiente ${listaDeAmbientes[indice]}`);
      console.log(`credenciais, ${JSON.stringify(listaDeCredenciais[indice])} \n`);

      resultadoDosAmbientes = await ambienteControlador.verificarAmbiente(listaDeAmbientes[indice], listaDeCredenciais[indice]);

      jsonexport(resultadoDosAmbientes, function (err, csv) {
         if (err) return console.error(err);
         fs.writeFileSync(nomeArquivos[indice], '\ufeff' + csv, 'utf8');
         console.log(csv);
      });
   }

   console.log(resultadoDosAmbientes);

};

main();
