const ambienteControlador = require("./src/ambiente.controller");
const jsonexport = require("jsonexport");
const fs = require("fs");

const main = async () => {
   let resultadoDosAmbientes = [];

   listaDeAmbientes = [
      "https://bosch.relogtechnology.com/",
      "https://aligntech.relogtechnology.com/",
      "https://transnovag.relogtechnology.com/",
      "https://gm.relogtechnology.com/",
      "https://relogtechnology.com/",
      "https://qa.relogtechnology.com/",

   ];

   listaDeCredenciais = [
      { email: "admin@admin.smart", password: "Admin20" },
      { email: "admin@admin.smart", password: "Admin20" },
      { email: "admin@admin.smart", password: "Admin20" },
      { email: "admin@admin.smart", password: "Admin20" },
      { email: "admin@admin.smart", password: "Admin20" },
      { email: "admin@admin.smart", password: "Admin20" },
   ];

   for (const [indice, baseUrl] of listaDeAmbientes.entries()) {
      console.log(`Iteração ${indice} no ambiente ${listaDeAmbientes[indice]}`);
      console.log(`credenciais, ${JSON.stringify(listaDeCredenciais[indice])} \n`);

      let result = await ambienteControlador.verificarAmbiente(listaDeAmbientes[indice], listaDeCredenciais[indice]);
      resultadoDosAmbientes.push(result);
   }

   console.log(resultadoDosAmbientes);

   jsonexport(resultadoDosAmbientes, function(err, csv){
      if (err) return console.error(err);
     fs.writeFileSync("data.csv", '\ufeff' + csv, 'utf8');
      console.log(csv);
});
};

main();
