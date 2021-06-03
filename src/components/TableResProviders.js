import React,{useContext,useEffect} from 'react'
import { DataContext } from "../context/DataProvider"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import { IconButton, Tooltip, Typography } from '@material-ui/core';

function TableResProviders() {
    const {
      resumenProviders,
      lote,
      providerSelect,
      detailsInsuranceProvider,
      setRowSelected
    } = useContext(DataContext);



    return (
      <>
           <p style={{color:"gray", marginLeft:30,fontWeight:600}}>RESUMEN ASEGURADOS POR PROVEEDOR</p>
         <Paper elevation={24} style={{width:"97%", margin:20 }}>
        <TableContainer  component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{display:"none"}}>ORDEN</TableCell>
              <TableCell align="center" style={{display:"none"}}>TIPOSUSC</TableCell>
              <TableCell align="center" >Tipo de Suscripción</TableCell>
              <TableCell align="center" style={{display:"none"}}>TIPOCOTPOL</TableCell>
              <TableCell align="center">Tipo de Póliza</TableCell> 
              <TableCell align="center">Código Moneda</TableCell>
              <TableCell align="center">Cantidad Asegurados</TableCell>
              <TableCell align="center">Porcentaje</TableCell>
              <TableCell align="center">Ver Detalle</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table">
            {resumenProviders.map((row,index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" style={{display:"none"}}>
                  {row.ORDEN}
                </TableCell>
                <TableCell align="center" style={{display:"none"}}>{row.TIPOSUSC}</TableCell>
                <TableCell align="center" >{row.DESTIPOSUSC}</TableCell>
                <TableCell align="center" style={{display:"none"}}>{row.TIPOCOTPOL}</TableCell>
                <TableCell align="center">{row.DESTIPOCOTPOL}</TableCell>
                <TableCell align="center">{row.CODMONEDA}</TableCell>
                <TableCell align="center">{row.CANTIDAD}</TableCell>
                <TableCell align="center">{row.PORCENTAJE}</TableCell>
                <TableCell align="center">
                <Tooltip title="Ver Detalle" aria-label="Ver Detalle">
                  <IconButton aria-label="detail" size="small" onClick={() =>{
                      setRowSelected(row)
                    //  alert(lote);
                    //  alert(providerSelect)
                    //  alert(row.TIPOSUSC)
                    //  alert(row.TIPOCOTPOL)
                    //  alert(row.CODMONEDA)
                     const valores = {
                      nLote:lote,
                      cCodProv:providerSelect,
                      cTipoSusc:row.TIPOSUSC,
                      cTipoCotPol:row.TIPOCOTPOL,
                      cCodMoneda:row.CODMONEDA
                     }
                    //  alert(JSON.stringify(valores)); 
                      detailsInsuranceProvider(valores);
                    }
                  }>
                    <RemoveRedEyeIcon fontSize="inherit" />
                  </IconButton>
                 </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>
      </>
    )
}

export default TableResProviders
