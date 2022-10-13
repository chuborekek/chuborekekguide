import React from 'react';
import { useState , useEffect, createRef} from 'react';
import { Grid,Typography,InputLabel,MenuItem,FormControl,Select, CircularProgress } from '@material-ui/core';
import useStyles from './styles';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

const List = ({places,childClicked,isLoading,type,rating,setType,setRating}) => {
  const classes = useStyles();
 
  const [elRefs,setElRefs] = useState([]);
  

useEffect(()=>{
  const refs= Array(places?.length).fill().map((_,i)=> elRefs[i] || createRef());
  setElRefs(refs);
},[places]);


  return (
    <div className={classes.container}>
       <div className={classes.titleheading}>
       <Typography variant="h6" className={classes.title}>
        Look for  {/* <FormControl className={classes.formControl}> */}
          {/* <InputLabel>Type</InputLabel> */}
          <Select value={type} onChange={(e)=>setType(e.target.value)}>
          <InputLabel>Type</InputLabel> 
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
          </Select>
      {/* </FormControl> */}
     
     <br/> where rating is &nbsp;
      {/* <FormControl className={classes.formControl}> */}
          {/* <InputLabel>Rating</InputLabel> */}
          <Select value={rating} onChange={(e)=>setRating(e.target.value)}>
          <InputLabel>Rating</InputLabel> 
              <MenuItem value={0}>Above 0</MenuItem>
              <MenuItem value={1}>Above 1.0</MenuItem>
              <MenuItem value={2}>Above 2.0</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
          </Select>
      {/* </FormControl> */}
      </Typography>
      </div>
     
      {isLoading?(
        <div className={classes.loading}> 
        <CircularProgress size="5rem"/>
        </div>
      ) : (
        <>
     
      <Grid container spacing={3} className={classes.list}>
          {places?.map((place,i)=>(
            <Grid item key={i} xs={12}>
                <PlaceDetails 
                place={place}
                selected={Number(childClicked)===i}
                refProp={elRefs[i]}
                />
            </Grid>
          ))}  
      </Grid>
     
      </>
      )}
   
    </div>
  )
}

export default List









