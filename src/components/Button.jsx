import * as React from "react";
import { callApiGetToken } from "../utils/callApiGetToken";
import { useDispatch } from "react-redux";
import { get } from "../redux/slices/token";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function BasicButtons() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function callGetToken() {
    const currentToken = await callApiGetToken();
    dispatch(
      get({
        token: currentToken.access_token,
      })
    );
  }

  return (
    <Button
      onClick={() => {
        callGetToken();
        navigate("/results/rockstar?score=100");
      }}
      variant='contained'>
      Buscar Vuelos
    </Button>
  );
}
