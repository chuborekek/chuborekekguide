import React ,{useEffect, useState} from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { getPlacesData } from './api';

const App = () => {
  const [places,setPlaces] = useState([]);
  const [coordinates,setCoordinates]=useState({});
  const [bounds,setBounds]=useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const [type,setType]=useState('restaurants');
  const [rating,setRating]=useState(1);
  const [filteredPlaces,setFilteredPlaces]=useState([]);


  useEffect(()=>{
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted" || result.state === "prompt") {
            console.log(result.state);
            navigator.geolocation.getCurrentPosition(({coords: {latitude,longitude}})=>{
             setCoordinates({lat:latitude,lng:longitude});
            });
          } else if (result.state === "denied") {
            alert("Please allow/turn on your GPS to use the App accordingly. Thank you!");
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      alert("Please allow/turn on your GPS to use the App accordingly. Thank you!");
    }

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(({coords: {latitude,longitude}})=>{
    //   setCoordinates({lat:latitude,lng:longitude});
    //  })
    // } else {
    //   alert("Please allow/turn on your GPS to use the App accordingly. Thank you!");
    // }
     
  },[]);

  useEffect(()=>{
    const filteredPlaces = places.filter((place)=>Number(place.rating)>=rating)
    setFilteredPlaces(filteredPlaces);
  },[rating]);

  useEffect(()=>{
    if(bounds.sw && bounds.ne){
    setIsLoading(true);
    getPlacesData(type,bounds?.ne,bounds?.sw)
      .then((data)=>{
        console.log("inside useEffect data to get palces:",data);
        setPlaces(data?.filter((place)=>place.name&&place.num_reviews>0));
        setFilteredPlaces([]);
        setIsLoading(false);
      });
    }
  },[type,coordinates,bounds]);


  return (
    <>
    <CssBaseline />
    <Header 
      setCoordinates={setCoordinates}
      type={type}
      setType={setType}
      />
    <Grid container spacing={3} style={{width:'100%'}}>
        <Grid item xs={12} sm={4} md={4}>
            
            <List 
            places={filteredPlaces.length?filteredPlaces:places}
            childClicked={childClicked} 
            isLoading={isLoading}
            type={type}
            setType={setType}
            setRating={setRating}
            rating={rating}
            />

        </Grid>
        <Grid item xs={12} sm={8} md={8}>
            <Map 
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length?filteredPlaces:places}
            setChildClicked = {setChildClicked}
            />
           
        </Grid>
    </Grid>
    </>
  )
}

export default App