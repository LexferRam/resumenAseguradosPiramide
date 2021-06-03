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
import { IconButton, TableFooter, TablePagination, Typography } from '@material-ui/core';


function TblInsuredByProvider() {
    
    const {
        insuredByProvider,
        rowSelected
    } = useContext(DataContext);
    const [pageAte, setPageAte] = React.useState(0);
    const [rowsPerPageAte, setRowsPerPageAte] = React.useState(6);
    
  const handleChangePageAte = (event, newPage) => {
    setPageAte(newPage);
  };

  const handleChangeRowsPerPageAte = (event) => {
    setRowsPerPageAte(+event.target.value);
    setPageAte(0);
  };

    return (
      <>
    {
   insuredByProvider.length !== 0 &&
   (
    <>
    <p style={{color:"gray", marginLeft:30, fontWeight:600}}>DETALLE ASEGURADOS POR PROVEEDOR ({rowSelected.DESTIPOSUSC}-{rowSelected.DESTIPOCOTPOL}-{rowSelected.CODMONEDA})
    </p>
   <Paper elevation={24} style={{width:"97%", margin:20 }}>
        <TableContainer component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell >idepol</TableCell>
              <TableCell align="center" style={{display:"none"}}>TIPOSUSC</TableCell>
              <TableCell align="center" >Tipo de Suscripción</TableCell>
              <TableCell align="center" style={{display:"none"}}>TIPOCOTPOL</TableCell>
              <TableCell align="center">Tipo de Póliza</TableCell> 
              <TableCell align="center">Moneda</TableCell>
              <TableCell align="center">Cédula Tomador</TableCell>
              <TableCell align="center">Tomador</TableCell>
              <TableCell align="center">Cantidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table">
          {insuredByProvider.slice(pageAte * rowsPerPageAte, pageAte * rowsPerPageAte + rowsPerPageAte).map((row) => {
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
                <TableCell align="center">{row.CANTIDAD}</TableCell>
              </TableRow>
              )
            })}
          </TableBody>
        
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 30]}
          component="div"
          count={insuredByProvider.length}
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
