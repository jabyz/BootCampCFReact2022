import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch } from "react-redux";
import { search } from "../redux/slices/form.js";
import { format } from "date-fns";

export default function BasicDatePicker(props) {
  const [value, setValue] = React.useState(null);
  const dispatch = useDispatch();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={props.label}
        value={value}
        onChange={(newValue) => {
          dispatch(
            search({
              from: "",
              to: "",
              fromDate: format(newValue, "yyyy-MM-d"),
              toDate: "",
              tickets: 0,
            })
          );
        }}
        renderInput={(params) => <TextField {...params} fullWidth />}
      />
    </LocalizationProvider>
  );
}
