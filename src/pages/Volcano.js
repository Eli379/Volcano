import { Button, Label } from "reactstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import {useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Map, Marker } from "pigeon-maps";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export default function Volcano() {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Population Density',
      },
    },
  };
  
  const labels = ['5km', '10km', '30km', '100km'];

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const [data, setData] = useState({},[]);
  const [VolcanoExists, setVolcanoExists] = useState(true);

  function fetchVolcanoById(id){
    const headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ` + localStorage.getItem("token"),
    }
    console.log(localStorage.getItem("token"));
    return(
      fetch('http://sefdb02.qut.edu.au:3001/volcano/'+id, {headers})
      .then(response => response.json())
      .then(item => {
        if(item.status == 'error'){
          console.log('does not exist')
          setVolcanoExists(false);
          setData(item);
        }
        if(item.error == true){
          setVolcanoExists(true);
          fetch('http://sefdb02.qut.edu.au:3001/volcano/'+id)
          .then(response => response.json())
          .then(item => setData(item))
        }
        else{
          setVolcanoExists(true);
          setData(item); console.log(item);
        }})
    )
  }

  useEffect(() => {
    fetchVolcanoById(id);
  }, []);
  const dataBar = {
    labels,
    datasets: [
      {
        label: 'Population',
        data: [data.population_5km, data.population_10km, data.population_30km, data.population_100km],
        backgroundColor: 'rgba(47, 46, 54, 0.5)',
      },
    ],
  };
  let bar;
  if (data.population_5km != null) {
    bar = <Bar options={options} data={dataBar} />;
  }
  if(data.name != null && data.country != null){
    return (
      <div className="container">
        <h1>{data.name}</h1>
        <div style={{display: "flex", justifyContent:"space-between"}}>
         <div className="pr-4">
            <p><Label><b>Country: </b>{data.country}</Label></p>
            <p><Label><b>Region: </b>{data.region}</Label></p>
            <p><Label><b>Subregion: </b>{data.subregion}</Label></p>
            <p><Label><b>Last Eruption: </b>{data.last_eruption}</Label></p>
            <p><Label><b>Country: </b>{data.country}</Label></p>
            <p><Label><b>Summit: </b>{data.summit + ' m'}</Label></p>
            <p><Label><b>Elevation: </b>{data.elevation + ' ft'}</Label></p>
            <p><Label><b>Latitude: </b>{data.latitude}</Label></p>
            <p><Label><b>Longitude: </b>{data.longitude}</Label></p>
            {/* {console.log(data.latitude + '+' + data.longitude} */}
          </div>
            <Map height={400} width={800} center={[parseFloat(data.latitude), parseFloat(data.longitude)]} defaultZoom={4}>
            <Marker 
              width={50}
              anchor={[parseFloat(data.latitude), parseFloat(data.longitude)]} 
            />
            </Map>
          <div>
          </div>
        </div>
        {bar}
        <Button onClick={() => navigate("/volcanolist")}>Back</Button>
      </div>
    );
  }
  else{
    return (
      <div className="container">
        <h3 style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '80vh', position: 'sticky'}}>{data.message}</h3>
        <Button color="primary" onClick={() => navigate("/volcanolist")}>Back</Button>
      </div>
    );
  }
}
