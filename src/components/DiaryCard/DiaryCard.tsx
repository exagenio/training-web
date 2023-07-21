import React, { useState } from "react";
import {Card, Typography, Button, Grow } from "@mui/material";
import { styled} from '@mui/system';

//set styles to cards
const StyledCard = styled(Card)({
    width:260,
    margin:'5px',
    borderRadius:'12px',
    padding:"20px",
    minHeight:205,
    height: "fit-content"
});

//set Styles to sub headings
const StyledSubTitle = styled(Typography)({
    marginBottom:'10px'
});

function DairyCard(props: { description: any; title: any; subTitle: any; }) {
    let description  = props.description; //get the description from the props
    let [isGreater, setIsGreater] = useState(description.length > 100); //variable to check the paragh length and create a state
    let [isExpanded, setExpanded] = useState(false);
    //initialize limited text
    let limitedText = "";

    //if character length >100, limit the description and stor to variable
    if(isGreater){
        limitedText = description.slice(0, 100) + "...";
    }

    //show limited text when click on show more button
    function clickShowHandler(){
        setIsGreater(false);
        setExpanded(true);
    }

    function clickHideHandler(){
        setExpanded(false);
        setIsGreater(true);
    }

    return (
        <Grow in>
            <StyledCard variant="outlined">
                <Typography variant="h5"> {props.title} </Typography>
                <StyledSubTitle variant="subtitle1"> {props.subTitle} </StyledSubTitle>
                <Typography variant="body1"> </Typography>
                {!isGreater && <Typography variant="body1">{description}</Typography>}
                {isGreater && <Typography variant="body1">{limitedText}</Typography>}
                {isGreater &&!isExpanded && <Button onClick={clickShowHandler}>Show More</Button>}
                {isExpanded &&<Button onClick={clickHideHandler}>Hide</Button>}
            </StyledCard>     
        </Grow>
    );
}
export default DairyCard;
