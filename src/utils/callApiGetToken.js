async function callApiGetToken() {
  try {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append("client_id", "LLtk4eLor0tvkIhdXejvejLN7Ra9iWyn");
    urlencoded.append("client_secret", "LcUBstboEu0mY38x");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    const response = await fetch(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      requestOptions
    );

    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.error(err);
  }
}

export { callApiGetToken };
