import React, { useState , useEffect } from "react";
import { Button, Badge } from "reactstrap";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router";
import Tooltip from '@mui/material/Tooltip';

// Columns:
// notice that this is an ARRAY of objects.
// each object has a 'headerName' and a 'field'.
// the 'headerName' is the Text ddisplayed at the top of the column in agGridReact.
// the 'field' is the name of the corresponding javascript property in json for that column.
const columns = [
  { headerName: "ID", field: "id", sortable: true },
  { headerName: "Name", field: "name", sortable: true },
  { headerName: "Country", field: "country", sortable: true },
  { headerName: "Region", field: "region", sortable: true },
  { headerName: "Sub Region", field: "subregion", sortable: true }
];

const countriesArray = [];
function fetchCountries(){
  fetch('http://sefdb02.qut.edu.au:3001/countries')
    .then(response => response.json())
    .then(data => data.map(item => {
      if(!countriesArray.includes(item)){
        countriesArray.push(item)
      }
    }));
}

export default function VolcanoList() {
  var [value, setValue] = useState("Japan");
  var [population, setPopulation] = useState("5km");
  fetchCountries(); 
  const [rowData, setRowData] = useState([]);
  const [API, setAPI] = useState("http://sefdb02.qut.edu.au:3001/volcanoes?country="+value+"&populatedWithin="+population);
  
  useEffect(() => {
    function fetchVolcanoData() {
      return fetch(API)
        .then((res) => res.json())
        .then((data) => 
          data.map((volcano) => ({
            id: volcano.id,
            name: volcano.name,
            country: volcano.country,
            region: volcano.region,
            subregion: volcano.subregion       
          })));
    } 

    fetchVolcanoData(value, population).then((data) => setRowData(data));
  }, [API]);
  console.log(API);

  // const [countryInput, setValue] = useState({},[]);
  const navigate = useNavigate();


  // const handleChange = (e) => {
  //   setValue(e.target.value);
  // }

  const getInitialState = () => {
    const value = "";
    return value;
  };

  const handleChangeCountry = (e) => {
    //to deal with countries such as 'Burma (Myanmar)' strings
    //converts them to URI format
    let encodedValue = encodeURI(e.target.value);
    encodedValue = encodedValue.replaceAll("(", "%28");
    encodedValue = encodedValue.replaceAll(")", "%29");
    setValue(e.target.value);
    setAPI("http://sefdb02.qut.edu.au:3001/volcanoes?country="+e.target.value+"&populatedWithin="+population);
    console.log(encodedValue);
    console.log('new api: ' + API);
  };
  
  const handleChangePopulation = (e) => {
    setPopulation(e.target.value);
    setAPI("http://sefdb02.qut.edu.au:3001/volcanoes?country="+value+"&populatedWithin="+e.target.value);
    // setPopulation((state) =>{
    //   console.log(population);
    //   return state;
    // })
    // useEffect(() => {
    //   const newPopulation = e.target.value
    //   setPopulation(newPopulation);
    // }, [])
    // setAPI("http://sefdb02.qut.edu.au:3001/volcanoes?country="+value+"&populatedWithin="+population);
    console.log((e.target.value));
  };

  function search(){
    setAPI("http://sefdb02.qut.edu.au:3001/volcanoes?country="+value+"&populatedWithin="+population);
  }

  
  return (
    <div className="container">
      <h1>Volcano List</h1>
      <div className="p-2">
          <label>Country: </label>
          <Tooltip title="Select a Country" arrow>
            <select className="ms-1" value={value} onChange={handleChangeCountry}>
              <option value="default" disabled hidden>
                Select country
              </option>          
              {countriesArray.map(item => (
                    <option value={item}>{item}</option>
                ))}
            </select>
          </Tooltip>        
        <label className="ms-4">Populated within: </label>
        <Tooltip title="Select a Range" arrow>
          <select className="ms-1" value={population} onChange={handleChangePopulation}>        
            <option value="5km">5 km</option>
            <option value="10km">10 km</option>
            <option value="30km">30 km</option>
            <option value="100km">100 km</option>
          </select>
        </Tooltip>
      {/* <Button onClick={() => search()}>Search</Button>     */}
      </div>
      <p>
        <Badge color="success">{rowData.length}</Badge> Results found
      </p>
      <Tooltip title="Select a Volcano!" placement="right" arrow>
        <div className="ag-theme-balham" style={{ height: 320, width: 1000 }}>
            <AgGridReact
              columnDefs={columns}
              rowData={rowData}
              pagination={true}
              paginationPageSize={7}
              onRowClicked={(row) => navigate(`/volcano?id=${row.data.id}`)}
            />
        </div>
      </Tooltip>
      {/* <div className="text-center p-4">
        <img src={volcano}/>
      </div> */}
    </div>
  );
}
