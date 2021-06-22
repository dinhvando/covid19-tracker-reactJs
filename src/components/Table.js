import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {Table,TableBody,TableCell,TableHead,TableRow} from '@material-ui/core';
import numeral from 'numeral'
const useTableStyle = makeStyles(()=>{
    return{
        tableCell: {
            fontSize: 18,

        },
        countryInfo:{
           
        },
        image:{
            width:40,
            height:"auto",
            marginRight: 4,
            position: "relative",
            top: 5
        }
    }
})
export const RankingTable = ({tableData}) => {
    const tableStyles = useTableStyle();
    return(
        <Table className={tableStyles.tableContent}>
            <TableHead>
          <TableRow>
            <TableCell className={tableStyles.tableCell}>#</TableCell>
            <TableCell className={clsx(tableStyles.tableCell )} align="left">Country</TableCell>
            <TableCell className={tableStyles.tableCell} align="left">Number of Cases</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {tableData.map(({name,flag,cases},index)=>(
                <TableRow key = {index}>
                    <TableCell className={tableStyles.tableCell} align="left">{index + 1}</TableCell>
                    <TableCell  className={clsx(tableStyles.tableCell,tableStyles.countryInfo)} align="left"><img className={tableStyles.image} alt={name} src={flag}/> {name} </TableCell>
                    <TableCell  className={tableStyles.tableCell} align="left">{numeral(cases).format("0,0")}</TableCell>    
                </TableRow>
            ))}
        </TableBody>
        </Table>
    )
}