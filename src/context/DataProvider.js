import React,{createContext, useEffect,useState,useRef} from 'react'
import axios from 'axios'

export const DataContext = createContext();

const DataProvider= ({children}) => {
    const URL = process.env.REACT_APP_COMPANY === 'PIRAMIDE' ? process.env.REACT_APP_URL_PIRAMIDE : process.env.REACT_APP_URL_OCEANICA;
    const divRef = useRef(null);

    const [providers, setProviders] = useState([])
    const [years, setYears]= useState([])
    const [disabledYear,setDisabledYear] = useState(true)
    const [disabledMonths,setDisabledMonths] = useState(true)
    const [disabledBtn,setDisabledBtn] = useState(true)   
    const [disabledLote,setDisabledLote] = useState(true)  
    const [resumenProviders, setResumenProviders] = useState([])
    const [lotes, setLotes] = useState([]);
    const [lote, setLote] = React.useState('');
    const [providerSelect, setProviderSelect] = React.useState('');
    const [openBackdrop,setOpenBackdrop] = useState(false)
    const [insuredByProvider,setInsuredByProvider] = useState([])

    const [rowSelected, setRowSelected] = useState()

    useEffect(() => {
        setOpenBackdrop(true)
        const fetchListProviders = async () =>{
            const res = await axios.post(`${URL}/ListaProveedor`);
            setProviders(res.data);
        }
        fetchListProviders()
        setOpenBackdrop(false)
    },[])

    const getListYears = async (providerSelect) =>{
        setOpenBackdrop(true)
        const resYears = await axios.post(`${URL}/ListaAnniosEjec`,{
            cCodProv: providerSelect
        });
        setYears(resYears.data)
        setOpenBackdrop(false)
        setDisabledYear(false)
    }

    const listDaysEjec = async(providerSelect,year,month) => {
        setOpenBackdrop(true)
        const resLote = await axios.post(`${URL}/ListaDiasEjec`,{
            cCodProv:providerSelect,
            nAnnio:parseInt(year),
            nMes: parseInt(month)
        });

        setLotes(resLote.data)
        setOpenBackdrop(false)
        setDisabledLote(false)     
    }

    const getResumenAsegProv = async(lote,providerSelect) => {
        setResumenProviders([])
        setInsuredByProvider([])
        setOpenBackdrop(true)
        const resResumenInsurance = await axios.post(`${URL}/ResumenAsegProv`,{
            nLote: lote,
            cCodProv:providerSelect
        })
        // alert(JSON.stringify(resResumenInsurance.data))
        setResumenProviders(resResumenInsurance.data)
        setOpenBackdrop(false)
    }

    const detailsInsuranceProvider = async (valores) => {
        setOpenBackdrop(true)
        const res = await axios.post(`${URL}/DetalleAsegProv`, valores);
        // alert(JSON.stringify(res.data))
        setInsuredByProvider(res.data)
        setOpenBackdrop(false)
        await divRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <DataContext.Provider value={{
            providers,
            getListYears,
            years,
            disabledYear,
            listDaysEjec,
            disabledMonths,
            setDisabledMonths,
            disabledBtn,
            setDisabledBtn,
            resumenProviders,
            lotes,setDisabledLote,
            disabledLote,
            getResumenAsegProv,
            lote, setLote,
            providerSelect, 
            setProviderSelect,
            detailsInsuranceProvider,
            openBackdrop,
            insuredByProvider,
            setDisabledYear,
            divRef,
            rowSelected, setRowSelected 
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider
