const axios = require("axios");

const recuperarLogin = async (baseUrl, userObject) => {  
   let result = await axios.post(baseUrl + "api/users/sign_in", userObject);
   return result.data;
};

const recuperarSnapshot = async (baseUrl, token) => {
   axios.defaults.headers.common["Authorization"] = token;
   let result =  await axios.get(baseUrl  + "api/reports/snapshot")
   return result.data;
};

module.exports = { recuperarLogin, recuperarSnapshot };
