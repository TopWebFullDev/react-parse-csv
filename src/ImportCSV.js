import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Table from './Table.js';
import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function ImportCSV() {
  const classes = useStyles();

  const [items, setItems] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [fData, setFData] = useState([]);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [team, setTeam] = useState('');
  const [player, setPlayer] = useState('');
  const [score, setScore] = useState('');

  useEffect(() => {
    // const wb = XLSX.readFile('localhost:3000/dummy.csv', {});
    // fetch('localhost:3000/dummy.csv').then(res => res.json).then((result) => console.log())
    // loadData(wb);
  }, []);

  useEffect(() => {
    const teamList = fData.map(p => p.Team);
    setTeams(Array.from(new Set(teamList)));
  }, [fData]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        loadData(wb);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const loadData = (wb) => {
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    const data = XLSX.utils.sheet_to_json(ws, {header: 1});
    setHeaders(...data.splice(0, 1));
    setItems(data);
    const fData = XLSX.utils.sheet_to_json(ws);
    setFData(fData);
  }

  const handleTeamChange = (value) => {
    setTeam(value);
    console.log(value)
    setPlayers(fData.filter(p => p.Team == value));
    setScore('');
  };

  return (
    <div>
      <input
        type="file"
        className='input'
        style={{display: 'none'}}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        id="contained-button-file"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file === undefined) {
            return;
          }
          readExcel(file);
        }}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />} style={{margin: 28}}>
          Upload
        </Button>
      </label>
      <div style={{margin: 20}}>
        <FormControl className={classes.formControl}>
          <Autocomplete
            id="teams-combo-box"
            options={teams}
            getOptionLabel={(option) => option}
            style={{ width: 200 }}
            onInputChange={(event, value) => {
              setTeam(value);
              if (value != '') {
                setPlayers(fData.filter(p => p.Team == value));
              } else {
                setPlayers(fData);
              }
              setScore('');
              setPlayer(null);
            }}
            renderInput={(params) => <TextField {...params} label="Teams" variant="outlined" />}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <Autocomplete
            id="players-combo-box"
            value={player}
            onChange={(event, newValue) => {
              setPlayer(newValue);
              if (newValue) {
                setScore(newValue.Score);
              } else {
                setScore('')
              }
            }}
            disabled={!players.length}
            options={players}
            getOptionLabel={(option) => option? option.Name : ''}
            style={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label="Players" variant="outlined" />}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField disabled id="standard-disabled" label="Score" value={score} variant="outlined" />
        </FormControl>
      </div>
      {items.length > 0 && <Table data={items} headers={headers}/>}
    </div>
  );
}

export default ImportCSV;
