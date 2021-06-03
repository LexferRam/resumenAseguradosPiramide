import React,{useContext} from 'react'
import './App.css';
import { Grid, Table } from '@material-ui/core'
import { Inputs } from './components/Inputs';
import TableResProviders from './components/TableResProviders';
import SimpleBackdrop from './components/Backdrop';
import TblInsuredByProvider from './components/TblInsuredByProvider';
import ButtonAppBar from './components/AppBar';
import { DataContext } from "./context/DataProvider"

function App() {
  const {
    divRef
} = useContext(DataContext);

// const divRef = useRef(null);
  return (
    <>
    <ButtonAppBar />
    <SimpleBackdrop />
    <Grid container  >
      <Grid xs={12} item>
         <Inputs />
      </Grid>
      <Grid xs={12} item>
         <TableResProviders />
      </Grid>
      <Grid xs={12} item>
         <div ref={divRef}>
         <TblInsuredByProvider />
         </div>
      </Grid>
    </Grid>
    </>
  );
}

export default App;
