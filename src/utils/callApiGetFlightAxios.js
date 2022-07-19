import axios from "axios";
import qs from "qs";

async function callApiGetTokenAxios() {
  var data = qs.stringify({
    grant_type: "client_credentials",
    client_id: "LLtk4eLor0tvkIhdXejvejLN7Ra9iWyn",
    client_secret: "LcUBstboEu0mY38x",
  });
  var config = {
    method: "post",
    url: "https://test.api.amadeus.com/v1/security/oauth2/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}

export { callApiGetTokenAxios };
