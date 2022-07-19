async function callApiGetFlights(myObj) {
  try {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + myObj.tok + "");

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let paramtod;
    myObj.toD === ""
      ? (paramtod = "")
      : (paramtod = `&returnDate=${myObj.toD}`);

    const response = await fetch(
      `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${myObj.fromA}&destinationLocationCode=${myObj.toA}&departureDate=${myObj.fromD}&adults=${myObj.adu}${paramtod}`,
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

export { callApiGetFlights };
