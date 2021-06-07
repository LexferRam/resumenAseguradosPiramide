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
import { IconButton, TableFooter, TablePagination, TextField, Typography } from '@material-ui/core';
import Exportarexcel from './Exportarexcel';
import SearchIcon from '@material-ui/icons/Search';

function TblInsuredByProvider() {
    
    const {
        insuredByProvider,
        rowSelected
    } = useContext(DataContext);
    const [pageAte, setPageAte] = React.useState(0);
    const [rowsPerPageAte, setRowsPerPageAte] = React.useState(6);
    const [busqueda, setBusqueda] = React.useState("");
    
  const handleChangePageAte = (event, newPage) => {
    setPageAte(newPage);
  };

  const handleChangeRowsPerPageAte = (event) => {
    setRowsPerPageAte(+event.target.value);
    setPageAte(0);
  };

  const formatoMexico = (number) => {
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = '$1.';
    return number.toString().replace(exp,rep);
  }

    return (
      <>
    {
   insuredByProvider.length !== 0 &&
   (
    <>
    {/* <p style={{color:"gray", marginLeft:30, fontWeight:600}}>DETALLE ASEGURADOS POR PROVEEDOR ({rowSelected.DESTIPOSUSC}-{rowSelected.DESTIPOCOTPOL}-{rowSelected.CODMONEDA})
    </p> */}

    <div style={{ display: "flex", marginBottom: 5, marginTop: 10 }}>
          <p style={{ color: "black", marginLeft: 30, marginRight: 20, fontWeight: 600 }}>DETALLE ASEGURADOS POR PROVEEDOR ({rowSelected.DESTIPOSUSC}-{rowSelected.DESTIPOCOTPOL}-{rowSelected.CODMONEDA})</p>
        </div>
        <div style={{ display: "flex", marginLeft: 30 }}>
        <TextField
              name="busqueda"
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value)
              }}
              label="Buscar"
              // variant="outlined"
              type="text"
            />
            <SearchIcon style={{marginTop:20, marginRight:20 }}/>
            <Exportarexcel enviarjsonGrid={insuredByProvider} titulo={`DETALLE ASEGURADOS POR PROVEEDOR (${rowSelected.DESTIPOSUSC}-${rowSelected.DESTIPOCOTPOL}-${rowSelected.CODMONEDA})`} />

             </div>
   <Paper elevation={24} style={{width:"97%", margin:20 }}>
        <TableContainer
         component={Paper}
         >
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell >IDEPOL</TableCell>
              <TableCell align="center" style={{display:"none"}}>TIPOSUSC</TableCell>
              <TableCell align="center" >TIPO DE SUSCRIPCIÓN</TableCell>
              <TableCell align="center" style={{display:"none"}}>TIPOCOTPOL</TableCell>
              <TableCell align="center">TIPO DE PÓLIZA</TableCell> 
              <TableCell align="center">MONEDA</TableCell>
              <TableCell align="center">CÉDULA TOMADOR</TableCell>
              <TableCell align="center">TOMADOR</TableCell>
              <TableCell align="center">CANTIDAD</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table">
          {insuredByProvider.filter((item) =>{
              if(busqueda == ""){
                return item
              }else if(
                // item.id.toString().includes(busqueda) ||
                JSON.stringify(item.IDEPOL).includes(busqueda.toUpperCase()) ||
                JSON.stringify(item.DESTIPOSUSC).includes(busqueda.toUpperCase()) ||
                JSON.stringify(item.DESTIPOCOTPOL).includes(busqueda.toUpperCase()) ||
                JSON.stringify(item.CODMONEDA).includes(busqueda.toUpperCase()) ||
                JSON.stringify(item.CEDULA_TOMADOR).includes(busqueda.toUpperCase()) ||
                JSON.stringify(item.TOMADOR).includes(busqueda.toUpperCase())
                ){
                return item
              }
            }).slice(pageAte * rowsPerPageAte, pageAte * rowsPerPageAte + rowsPerPageAte).map((row) => {
              return (
              <TableRow key={row.IDEPOL}>
                <TableCell component="th" scope="row" >
                  {row.IDEPOL}
                </TableCell>
                <TableCell align="center" style={{display:"none"}}>{row.TIPOSUSC}</TableCell>
                <TableCell align="center" >{row.DESTIPOSUSC}</TableCell>
                <TableCell align="center" style={{display:"none"}}>{row.TIPOCOTPOL}</TableCell>
                <TableCell align="center">{row.DESTIPOCOTPOL}</TableCell>
                <TableCell align="center">{row.CODMONEDA}</TableCell>
                <TableCell align="center">{row.CEDULA_TOMADOR}</TableCell>
                <TableCell align="center">{row.TOMADOR}</TableCell>
                <TableCell align="center">{formatoMexico(row.CANTIDAD)}</TableCell>
              </TableRow>
              )
            })}
          </TableBody>
        
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 30]}
          component="div"
          count={insuredByProvider.filter((item) =>{
            if(busqueda == ""){
              return item
            }else if(
              // item.id.toString().includes(busqueda) ||
              JSON.stringify(item.IDEPOL).includes(busqueda.toUpperCase()) ||
              JSON.stringify(item.DESTIPOSUSC).includes(busqueda.toUpperCase()) ||
              JSON.stringify(item.DESTIPOCOTPOL).includes(busqueda.toUpperCase()) ||
              JSON.stringify(item.CODMONEDA).includes(busqueda.toUpperCase()) ||
              JSON.stringify(item.CEDULA_TOMADOR).includes(busqueda.toUpperCase()) ||
              JSON.stringify(item.TOMADOR).includes(busqueda.toUpperCase())
              ){
              return item
            }
          }).length}
          rowsPerPage={rowsPerPageAte}
          page={pageAte}
          onChangePage={handleChangePageAte}
          onChangeRowsPerPage={handleChangeRowsPerPageAte}
        />
      </TableContainer>
      </Paper>
      </>
   )

    }
        </> 
    )
}

export default TblInsuredByProvider
