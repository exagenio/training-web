import { useSelector } from 'react-redux';
import React, { useState, useEffect} from "react";
import { Button, Container, TextField, Grid, AppBar, Box, Typography, Avatar,Grow} from "@mui/material";
import { deepOrange} from '@mui/material/colors';
import DiaryCard from '../../components/DiaryCard/DiaryCard';
import { useDispatch } from 'react-redux';
import {cardsActions} from '../../redux/cards/cardSlice';

//add css to textField
const rounded = {
  borderRadius: "20px",
  width:"100%",
  height: "43px",
  marginRight: "10px",
};

const mainContainer = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "start",
  paddingBottom:"50px",
  overflow:"hidden",
};

const cardContainer = {
  display: "grid",
  justifyItems: "center",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gridGap: "10px",
};

//set interface to accept cardData
interface CardData {
  id:string
  user: string;
  title: string;
  description: string;
};

function DiaryHome() {
  const dispatch = useDispatch();
  
  //fetch realtime card data from the db when loading the page
  useEffect(() =>{
    dispatch(cardsActions.requestCards())
  },[]);
  
  //get user name
  const user = useSelector((state: {card: any;user:string} ) => state.card.user);
  const fetchCards = useSelector((state: {card: any; cards:CardData[]} ) => state.card.cards);

  //set variables to textfields and card values states
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isVisibleForm, setVisibleForm] = useState(false);

  //onclick listener to get textfields value when click on submit button
  function formSubmitHandler(event: any) {
    event.preventDefault();
    if(title === ""){
      alert("Your title field is empty. Please  fill and try again");
    }else if(message === ""){
      alert("Your message field is empty. Please  fill and try again");
    }
    else{
      const randomIndex = Math.floor(Math.random() * 1000000);
      const userId = randomIndex + user;
      dispatch(cardsActions.saveCard(
        {
          id :userId,
          user: user,
          title: title,
          description: message
        }
      ));
      setTitle("");
      setMessage("");
      setVisibleForm(false);
    }
  };

  //update input value with userState
  function onchangeTitle(event: { target: { value: any } }) {
    setTitle(event.target.value);
    if(event.target.value === ""){
      setVisibleForm(false)
    }else{
      setVisibleForm(true)
    }
  };

  //update input value with userState
  function onchangeMessage(event: { target: { value: any } }) {
    setMessage(event.target.value);
  };
  
  return (
    <React.Fragment>
      <Container maxWidth="xl" sx={mainContainer}>
          <AppBar position="absolute" sx={{width:"100%", padding:"10px 20px",flexDirection:"row", justifyContent:"space-between", alignItems:"center"}} >
            <Typography variant="h5">Dear Diary</Typography>
            <Box sx={{display:"flex", alignItems:"center"}}>
            <Typography  variant="body1">Hi {user}</Typography>
            <Avatar sx={{ marginLeft:"10px",bgcolor: deepOrange[500] }}>{user.charAt(0).toUpperCase()}</Avatar>
            </Box>
          </AppBar>
        <Container sx={{padding:"100px 0 50px 0"}}>
          <Grow in>
            <form onSubmit={formSubmitHandler}>
            <Grid container spacing={2}>
              <Grid item  xs={8} sm={10} >
                <TextField value={title} onChange={onchangeTitle} placeholder="Enter Title" InputProps={{ style: rounded }} fullWidth></TextField>
              </Grid>
                <Grid item xs={4} sm={2}>
                  <Button type="submit" sx={{width:"100%" }} size="large" variant="contained">
                      Submit
                  </Button>
                </Grid>
                {isVisibleForm && 

              <Grow in={isVisibleForm}>
              <Grid item xs={12}>
                <TextField value={message} onChange={onchangeMessage} InputProps={{ sx: { borderRadius: "20px"} }} fullWidth multiline margin="normal" rows={4} placeholder="Enter Description" variant="outlined" ></TextField>
              </Grid>
              </Grow>
                }
            </Grid>
            </form>
          </Grow>
        </Container>

        <Container maxWidth="xl" sx={cardContainer}>
          {fetchCards.map((card: { id: string; title: string; user: string; description: string; })=> (
            <DiaryCard key={card.id} title={card.title} subTitle={card.user} description={card.description}/>
          ))}
        </Container>
      </Container>
    </React.Fragment>
  );
}
export default DiaryHome;
