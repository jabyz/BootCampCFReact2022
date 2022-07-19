import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { callApiGetFlights } from "../../utils/callApiGetFlights";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "../../App.css";

import DrawerAppBar from "../../components/NavBar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { parse } from "tinyduration";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Results(props) {
  //const { congrats } = useParams();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  //const score = searchParams.get("score");
  const fromDate = searchParams.get("fromDate");
  const toDate = searchParams.get("toDate");
  const fromAirport = searchParams.get("fromAirport");
  const toAirport = searchParams.get("toAirport");
  const adults = searchParams.get("adultos");
  const [itinerario, setItinerario] = useState(null);
  //const [verIda, setVerIda] = useState(true);
  const [esIdaTexto, setEsIdaTexto] = useState("Ida");
  const [esIdaNum, setEsIdaNum] = useState(0);

  const [open, setOpen] = React.useState(false);
  const handleOpen = (i, esIda) => {
    setItinerario(i);
    setOpen(true);
    esIda === 0 ? setEsIdaTexto("Ida") : setEsIdaTexto("Regreso");
    esIda === 0 ? setEsIdaNum(0) : setEsIdaNum(1);
  };
  const handleClose = () => setOpen(false);

  const token = useSelector((state) => state.token.value);
  let myresults = {};
  const [results, setResults] = useState({});

  let myObj = {
    tok: token.token,
    fromA: fromAirport,
    toA: toAirport,
    fromD: fromDate,
    toD: toDate,
    adu: adults,
  };

  useEffect(() => {
    async function callGetFlights(myObj) {
      myresults = await callApiGetFlights(myObj);
      setResults(myresults);
    }

    callGetFlights(myObj).catch(console.error);
  }, [token]);

  return (
    <>
      <DrawerAppBar></DrawerAppBar>

      {results?.data?.length > 0 &&
        results?.data.map((r) => {
          return (
            <div style={{ padding: "20px" }}>
              <Card sx={{ maxWidth: 600 }} key={r.id} pb={2}>
                <CardContent>
                  <div className='grid-container grid-container-2'>
                    <div className='grid-container grid-container-1'>
                      <span>Id: {r.id}</span>
                      <span>
                        Asientos Disponibles: {r.numberOfBookableSeats}
                      </span>
                      <span>
                        Último día para reservar: {r.lastTicketingDate}
                      </span>
                    </div>
                    <div className='grid-container grid-container-1'>
                      <span>{r.price.grandTotal}</span>
                      <span>{r.price.currency}</span>
                    </div>
                  </div>
                </CardContent>
                <CardActions>
                  <Button onClick={() => handleOpen(r, 0)} size='small'>
                    Ver detalle Ida
                  </Button>
                  {toDate !== "" && (
                    <Button onClick={() => handleOpen(r, 1)} size='small'>
                      Ver detalle Regreso
                    </Button>
                  )}
                </CardActions>
              </Card>
            </div>
          );
        })}
      {itinerario !== null && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'>
          <Box sx={modalStyle}>
            <span>
              <div>Duracion Vuelo {esIdaTexto}</div>
              {parseDuration(itinerario?.itineraries[esIdaNum]?.duration)}
            </span>
            {itinerario.itineraries[esIdaNum].segments.map((i) => {
              return (
                <div className='grid-container grid-container-4'>
                  <div className='grid-container grid-container-1'>
                    <span>{i.departure.iataCode}</span>
                    <span>{parseDate(i.departure.at)}</span>
                    <span>{parseTime(i.departure.at)}</span>
                    <span>
                      Terminal:
                      {i.departure.terminal}
                    </span>
                  </div>
                  <div className='grid-container grid-container-1'>
                    <span>{"==>"}</span>
                  </div>
                  <div className='grid-container grid-container-1'>
                    <span>{i.arrival.iataCode}</span>
                    <span>{parseDate(i.arrival.at)}</span>
                    <span>{parseTime(i.arrival.at)}</span>
                    <span>Terminal: {i.arrival.terminal}</span>
                  </div>
                  <div className='grid-container grid-container-1'>
                    <div>Vuelo: {i.number}</div>
                    Duracion: {parseDuration(i.duration)}
                  </div>
                </div>
              );
            })}
          </Box>
        </Modal>
      )}
    </>
  );
}

export default Results;

function parseDuration(iso8601date) {
  const durationObj = parse(iso8601date);

  return `${durationObj.hours}h ${durationObj.minutes}min`;
}

function parseDate(at) {
  const dt = new Date(at);
  return `${dt.getDay()}/${dt.getMonth()}/${dt.getFullYear()}`;
}

function parseTime(at) {
  const dt = new Date(at);
  const twoDigitMinutes = (dt.getMinutes() < 10 ? "0" : "") + dt.getMinutes();
  const isAMorPM = dt.getHours() >= 12 && dt.getHours() < 24 ? "PM" : "AM";
  return `${dt.getHours()}:${twoDigitMinutes} ${isAMorPM}`;
}
