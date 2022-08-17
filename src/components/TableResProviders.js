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
import { ButtonBase, IconButton, Tooltip, Typography } from '@material-ui/core';
import excel from "../excel.png"
import Exportarexcel from "./Exportarexcel"

function TableResProviders() {
    const {
      resumenProviders,
      lote,
      providerSelect,
      detailsInsuranceProvider,
      setRowSelected
    } = useContext(DataContext);

 

    // useEffect(() =>{
      const formatoMexico = (number) => {
        const exp = /(\d)(?=(\d{3})+(?!\d))/g;
        const rep = '$1.';
        return number.toString().replace(exp,rep);
      }
    // },[])

    function truncWithoutRounding(number, decimalsAfterComma = 2){
      return parseFloat(`${(number | 0)}.${number.toString().split(".")[1]?.slice(0, decimalsAfterComma)}`);
    }

    return (
      <>
        <div style={{ display: "flex", marginBottom: 10 }}>
          <p style={{ color: "black", marginLeft: 10, marginRight: 20, fontWeight: 600 }}>RESUMEN ASEGURADOS POR PROVEEDOR</p>
          <Exportarexcel enviarjsonGrid={resumenProviders} titulo="RESUMEN ASEGURADOS POR PROVEEDOR" />
        </div>
        <Paper elevation={24} style={{width:"97%" }}>
        <TableContainer
          component={Paper}
          >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{display:"none"}}>ORDEN</TableCell>
              <TableCell align="center" style={{display:"none"}}>TIPOSUSC</TableCell>
              <TableCell align="center" >TIPO DE SUSCRIPCIÓN</TableCell>
              <TableCell align="center" style={{display:"none"}}>TIPOCOTPOL</TableCell>
              <TableCell align="center">TIPO DE PÓLIZA</TableCell> 
              <TableCell align="center">CÓDIGO MONEDA</TableCell>
              <TableCell align="center">CANTIDAD DE ASEGURADOS</TableCell>
              {(providerSelect === '25019' || providerSelect === '24351') && <TableCell align="center">SUMA ASEGURADA</TableCell>}
              <TableCell align="center">PORCENTAJE</TableCell>
              <TableCell align="center">VER DETALLE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table">
                {resumenProviders.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row" style={{ display: "none" }}>
                      {row.ORDEN}
                    </TableCell>
                    <TableCell align="center" style={{ display: "none" }}>{row.TIPOSUSC}</TableCell>
                    {
                      row.DESTIPOSUSC == "TOTAL" ?
                        (<TableCell align="center" style={{ fontWeight: 800 }} >{row.DESTIPOSUSC}</TableCell>) :
                        (<TableCell align="center" >{row.DESTIPOSUSC}</TableCell>)
                    }
                    <TableCell align="center" style={{ display: "none" }}>{row.TIPOCOTPOL}</TableCell>
                    <TableCell align="center">{row.DESTIPOCOTPOL}</TableCell>
                    <TableCell align="center">{row.CODMONEDA}</TableCell>

                    {
                      row.DESTIPOSUSC == "TOTAL" ?
                        (<TableCell align="center" style={{ fontWeight: 800 }} >{formatoMexico(row.CANTIDAD)}</TableCell>) :
                        (<TableCell align="center" >{formatoMexico(row.CANTIDAD)}</TableCell>)
                    }
                    {(providerSelect === '25019' || providerSelect === '24351') && <TableCell align="center">{ row.SUMAASEGMONEDA && formatoMexico(Number(row.SUMAASEGMONEDA))}</TableCell>}
                    {
                      row.DESTIPOSUSC == "TOTAL" ?
                        (<TableCell align="center" style={{ fontWeight: 800 }} >{row.PORCENTAJE + " " + "%"}</TableCell>) :
                        (<TableCell align="center" >{row.PORCENTAJE.toFixed(2) + " " + "%"}</TableCell>)
                    }
                    <TableCell align="center">
                      <Tooltip title="Ver Detalle" aria-label="Ver Detalle">
                        <IconButton aria-label="detail" size="small" onClick={() => {
                          setRowSelected(row)
                          const valores = {
                            nLote: lote,
                            cCodProv: providerSelect,
                            cTipoSusc: row.TIPOSUSC,
                            cTipoCotPol: row.TIPOCOTPOL,
                            cCodMoneda: row.CODMONEDA
                          }
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
