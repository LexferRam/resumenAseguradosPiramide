import React,{useContext,useEffect} from 'react'
import { Grid,TextField ,MenuItem, Button, Paper  } from '@material-ui/core'
import { DataContext } from "../context/DataProvider"
import SearchIcon from '@material-ui/icons/Search';
import Months from "./Months"

export const Inputs = () => {
    const [year, setYear] = React.useState('');
    const [month, setMonth] = React.useState('');
           
    const {
        providers, years,getListYears,
        disabledYear,setDisabledYear,listDaysEjec,disabledMonths,
        setDisabledMonths,disabledBtn,setDisabledBtn,
        lotes,disabledLote,getResumenAsegProv,
        lote,setDisabledLote, setLote,
        providerSelect, setProviderSelect} = useContext(DataContext);

    const handleChange = (event) => {
        setProviderSelect(event.target.value);
        setYear('')
        setMonth("")
        setLote("")
        setDisabledYear(true)
        setDisabledMonths(true)
        setDisabledLote(true)
        setDisabledBtn(true)
        getListYears(event.target.value)
    };

    const handleChangeYear = (event) => {
        setYear(event.target.value);
        setDisabledMonths(false)
    };

    const handleChangeMonth = (event) => {
        setMonth(event.target.value);
        setDisabledBtn(false)
        listDaysEjec(providerSelect,year,event.target.value )
    };   
    
    const handleChangeLote = (event) => {
        setLote(event.target.value)
    }; 

    return (
        <>
            <Paper elevation={10} style={{width:"95%",padding:20, margin:10 }}>
                <Grid container spacing={8}>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            select
                            label="PROVEEDOR"
                            // value={currency}
                            onChange={handleChange}
                            fullWidth
                        >
                            {providers.map((provider) => (
                                <MenuItem key={provider.CODPROV} value={provider.CODPROV}>
                                    {provider.PROVEEDOR}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField
                            select
                            label="AÑO"
                            value={year}
                            onChange={handleChangeYear}
                            disabled={disabledYear}
                            fullWidth
                        >
                            {years.map((year) => (
                                <MenuItem key={year.ANNIOS} value={year.ANNIOS}>
                                    {year.ANNIOS}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField
                            select
                            label="MESES"
                            value={month}
                            onChange={handleChangeMonth}
                            disabled={disabledMonths}
                            fullWidth
                        >
                            {Months.map((month) => (
                                <MenuItem key={month.value} value={month.value}>
                                    {month.month}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField
                            select
                            label="DÍAS DE ENVÍO"
                            value={lote}
                            onChange={handleChangeLote}
                            disabled={disabledLote}
                            fullWidth
                        >
                            {lotes.map((lote, index) => (
                                <MenuItem key={index} value={lote.NLOTE}>
                                    {lote.DIA}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <Button
                            variant="contained"
                            id="btnBuscar"
                            startIcon={<SearchIcon style={{ color:"white"}}/>}
                            onClick={() => getResumenAsegProv(lote, providerSelect)}
                            disabled={disabledBtn}
                            style={{borderRadius:50,marginTop:18, backgroundColor:"#47c0b6"}}
                            size="small"
                        >
                            <span style={{fontSize:10, color:"white"}}>BUSCAR</span>
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}
