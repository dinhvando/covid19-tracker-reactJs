// import React from 'react';

// import {FormControl, Select, MenuItem} from '@material-ui/core';
// import {makestyles} from '@material-ui/core/styles'
// import styled from 'styled-components';
// import WHO from '../assets/img/WHO.jpg'
// import BoYTe from '../assets/img/BoYTe.png'
// const Container = styled.div`
//     display: flex;
//     justify-content:space-between;
//     margin: 10px;
//     align-items:center;
// `
// const Title = styled.h1`
//     color: red
// `
// const MiddleImageList = styled.div`
//     display: flex;
//     height: 80px;
// `
// const MiddleImage = styled.img`
//     height: inherit;
// `
// export const Header = ({countries,country,setCountry}) => {
//     const handleChange = (e) =>{
//        setCountry(e.target.value);
//     }
//     return(
//         <Container>
//             <Title>Covid-19 Tracker</Title>
//             <MiddleImageList>
//             <MiddleImage src ={WHO}/>
//             <MiddleImage src ={BoYTe}/>
//             </MiddleImageList>
//             <FormControl style ={{minWidth: "200px"}}>
//                 <Select style={{fontSize:"20px"}} variant="outlined" value={country} onChange={handleChange}>
//                     <MenuItem value = "worldwide">Worldwide</MenuItem>
//                     {countries.map(country =>(
//                         <MenuItem style={{fontSize:"20px"}} value = {country.country}>{country.country} </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>
//         </Container>

//     )
// };