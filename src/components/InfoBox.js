import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import numeral from 'numeral';
import  './InfoBox.css'
const useInfoBoxStyles = makeStyles(()=>{
    return{
        cardRoot:{
            width: "30%",
            textAlign: "center"
        },
        title:{
            textTransform: "uppercase"
        }
    }
})
export const InfoBox = ({title, cases, total})=>{
    const InfoBoxStyles = useInfoBoxStyles();
    return(
        <Card raised className={`${InfoBoxStyles.cardRoot} cardItem--${title}`}>
            <CardContent>
                <Typography className={InfoBoxStyles.title} variant="h5">{title}</Typography>
                <Typography variant="h5">+ {numeral(cases).format("0,0")}</Typography>
                <Typography variant="h6">Total: {numeral(total).format("0,0")}</Typography>
            </CardContent>
        </Card>
    )
    
} 