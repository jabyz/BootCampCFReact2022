import IATA_CODES from "../../assets/IATA.json";
import FOTOS from "../../assets/FOTOS_PAISES.js";
import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CarrouselStyle from "./CarrouselStyle.js";
import { useFormik } from "formik";
import * as yup from "yup";

import { TextField, Grid, Autocomplete, Button } from "@mui/material/";
import DrawerAppBar from "../../components/NavBar";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { callApiGetToken } from "../../utils/callApiGetToken";
import { get } from "../../redux/slices/token";
import { format } from "date-fns";

const Home = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [fromAirport, setFromAirport] = useState(null);
  const [toAirport, setToAirport] = useState(null);
  const [adultos, setAdultos] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function callGetToken(adu) {
    let currentToken = null;
    try {
      currentToken = await callApiGetToken();
    } catch (err) {
      alert(err); // TypeError: failed to fetch
    }

    dispatch(
      get({
        token: currentToken.access_token,
      })
    );
    // console.log(toDate);
    // const paramtod = toDate === null ? format(toDate, "yyyy-MM-d") : "";
    // console.log(paramtod);
    let paramtod;
    toDate === null
      ? (paramtod = "")
      : (paramtod = format(toDate, "yyyy-MM-d"));
    let navigateUrl = `/results/q?score=100&fromDate=${format(
      fromDate,
      "yyyy-MM-d"
    )}&toDate=${paramtod}&adultos=${adu}&fromAirport=${fromAirport}&toAirport=${toAirport}&tok=${
      currentToken.access_token
    }`;
    navigate(navigateUrl);
  }

  const [index, setIndex] = useState(0);
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index === FOTOS?.length - 1) {
        index = 0;
        setIndex(0);
        return;
      }
      index++;
      setIndex(index);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const validationSchema = yup.object({
    adultos: yup
      .number("Introduzca un numero")
      .integer("Introduzca un numero entero")
      .min(1, "Introduzca un numero mayor a 0")
      .required("Introduzca un numero"),
  });

  const formik = useFormik({
    initialValues: {
      adultos: 1,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      callGetToken(JSON.stringify(values.adultos));
    },
  });

  return (
    <>
      <DrawerAppBar></DrawerAppBar>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} pt={2}>
          <Grid item xs={6}>
            <Autocomplete
              onChange={(event, value) => setFromAirport(value.iata)} // prints the selected value
              disablePortal
              options={IATA_CODES}
              getOptionLabel={(option) => option.airport}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id='txtIda'
                  name='txtIda'
                  label='Seleccione Aeropuerto Origen'
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              onChange={(event, value) => setToAirport(value.iata)} // prints the selected value
              disablePortal
              options={IATA_CODES}
              getOptionLabel={(option) => option.airport}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Seleccione Aeropuerto Destino'
                  id='txtRegreso'
                  name='txtRegreso'
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} pt={2}>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label='Fecha Ida'
                id='txtFechaIda'
                name='txtFechaIda'
                value={fromDate}
                onChange={(newValue) => {
                  setFromDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label='Fecha Regreso'
                id='txtFechaRegreso'
                name='txtFechaRegreso'
                value={toDate}
                onChange={(newValue) => {
                  setToDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid container spacing={2} pt={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id='adultos'
              name='adultos'
              type='number'
              label='Numero de Adultos'
              // onChange={(e) => {
              //   setAdultos(e.target.value);
              //   formik.handleChange();
              // }}
              value={formik.values.adultos}
              onChange={formik.handleChange}
              variant='outlined'
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              error={formik.touched.adultos && Boolean(formik.errors.adultos)}
              helperText={formik.touched.adultos && formik.errors.adultos}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} pt={2}>
          <Grid item xs={6}>
            <Button
              type='submit'
              // onClick={() => {
              //   callGetToken();
              // }}
              variant='contained'>
              Buscar Vuelos
            </Button>
          </Grid>
        </Grid>
      </form>
      <h1 className='textCenter'>PAISES MAS VISITADOS</h1>
      <CarrouselStyle>
        {FOTOS?.length > 0 && (
          <div className='container' key={FOTOS[index]}>
            <img className='fade' src={FOTOS[index][1]} alt={FOTOS[index][0]} />

            <div className='content textCenter'>
              <h1>{FOTOS[index][0]}</h1>
            </div>
          </div>
        )}
      </CarrouselStyle>
    </>
  );
};

export default Home;
