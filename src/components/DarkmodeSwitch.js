import React,{ useState, useEffect } from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

const DarkmodeSwitch = (props) => { 
    const [state, setState] = useState({
        DarkmodeChecked: props.darkmodeProp,
    });

    useEffect(() => {
      console.log(state)
    },[])


    const handleChange = (event) => {
        //returns if dark mode is true or false
        sessionStorage.setItem('darkmode', event.target.checked)
        setState({ ...state, [event.target.name]: event.target.checked });
        props.updateDarkmode(event.target.checked)
        //adapter.editStream(stream.id,stream.selected,stream.user_id,stream.stream_id).then(data => data)
        //console.log(event.target.checked)
        adapter.toggleDarkmode(sessionStorage.currentUserID,event.target.checked).then(data => console.log(data))
      };

      const adapter = {
        toggleDarkmode: (user_id,darkmodeValue) => {
          return fetch(`https://river-api.herokuapp.com/users/${user_id}?darkmode=${darkmodeValue}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            
          })
        .then(res => res.json())       
        },
    }      
    
    const Darkmode = withStyles({
    switchBase: {
        color: "#fe2d56",
        '&$checked': {
            color: '#202125',
        },
        '$track': {
            backgroundColor: '#202125'
        },
        '&$checked + $track': {
             backgroundColor: '#ffffff',
             color: '#333438',
        },
    },
    checked: {},
    track: {},
    })(Switch);      

      return (
       
            <FormControlLabel
                control={<Darkmode checked={state.DarkmodeChecked} onChange={handleChange} name="DarkmodeChecked" />}
                label="Darkmode"
            />            
       
      );
          
}


export default DarkmodeSwitch