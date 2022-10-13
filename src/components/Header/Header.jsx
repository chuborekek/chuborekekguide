import React, {useState} from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box,InputLabel,MenuItem,FormControl,Select } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles';
const Header = ({setCoordinates,type,setType}) => {
  const classes = useStyles();
  const [autocomplete,setAutocomplete]=useState(null);

  const onLoad= (autoC)=> setAutocomplete(autoC);
  const onPlaceChanged=()=>{
    const lat= autocomplete.getPlace().geometry.location.lat();
    const lng= autocomplete.getPlace().geometry.location.lng();
    setCoordinates({lat,lng});
  }

  return (
    <AppBar position="static" style={{ background: 'linear-gradient(to right,orange,teal)' }}>
        <Toolbar className={classes.toolbar}>
            <Typography variant="h4" className={classes.title}>
                ChuBorekek Guide
            </Typography>
            <Box display="flex">
              <Typography variant="h6">
                  Explore Amazing&nbsp;&nbsp;
                <Select style={{color:'white'}} value={type} onChange={(e)=>setType(e.target.value)} >
                <MenuItem value="restaurants" variant="h6"> Restaurants</MenuItem>
                <MenuItem value="hotels"> Hotels</MenuItem>
                <MenuItem value="attractions"> Attractions</MenuItem>
                 </Select>
              </Typography>

          
              {/* <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}> 
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase placeholder='Search...' classes={{root: classes.inputRoot, input: classes.inputInput}}/>
                  </div>
             </Autocomplete> */}
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header