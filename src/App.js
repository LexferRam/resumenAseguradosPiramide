import React,{useContext} from 'react'
import './App.css';
import { Divider, Grid, Grow, Paper, Table } from '@material-ui/core'
import { Inputs } from './components/Inputs';
import TableResProviders from './components/TableResProviders';
import SimpleBackdrop from './components/Backdrop';
import TblInsuredByProvider from './components/TblInsuredByProvider';
import ButtonAppBar from './components/AppBar';
import { DataContext } from "./context/DataProvider"
import GraphPie from './components/GraphPie';

function App() {
  const {
    divRef,
    resumenProviders
} = useContext(DataContext);

// const divRef = useRef(null);
  return (
    <>
    <ButtonAppBar />
    <SimpleBackdrop />
    <Grid container  >
      
      <Grid xs={12} item>
       
          <Grid container  >
            <Grid xs={12} item>
              <Inputs />
            </Grid>
            <Grid xs={12} sm={12} md={8} item>
            <Grow in={true} timeout={1000}>
              <Paper elevation={15} style={{margin:10, padding:20, minHeight:"350px"}}>
                <TableResProviders />
              </Paper>
            </Grow >
          </Grid>
          <Grid xs={12} sm={12} md={4} item>
              <Grow in={true} timeout={1000}>
                <Paper elevation={15} style={{ margin: 10, padding: 20, minHeight: "350px" }}>
                  <GraphPie enviardataGraph={resumenProviders} />
                </Paper>
              </Grow >
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} item>
          {/* <Paper elevation={15} style={{ margin: 10, padding: 20, minHeight: "439px" }}> */}
        <Divider  style={{ marginTop: 25}}/>

            <div ref={divRef}>
              <TblInsuredByProvider />
            </div>
          {/* </Paper> */}
        </Grid>
    </Grid>
    </>
  );
}

export default App;
