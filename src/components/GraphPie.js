import React, {useEffect} from 'react'
import Chart from 'react-google-charts'

function GraphPie({enviardataGraph}) {

    const [json, setJson] = React.useState([]);

    useEffect(() =>{
        // alert(enviardataGraph)
        const chartData = [['TIPO SUSCRIPCION', '%']]
        for (let i = 0; i < enviardataGraph?.length; i += 1) {
            if(enviardataGraph[i].DESTIPOSUSC !== "TOTAL"){
                chartData.push([enviardataGraph[i].DESTIPOSUSC+" "+enviardataGraph[i].DESTIPOCOTPOL+" "+enviardataGraph[i].CODMONEDA, enviardataGraph[i].PORCENTAJE])     
            }         
        }
        setJson(chartData);
    },[enviardataGraph])

    return (
        <>
        <p style={{ color: "black", marginLeft: 30, marginRight: 20, fontWeight: 600,textAlign:"center" }}>PORCENTAJES  RESUMEN  ASEGURADOS</p>
        <div style={{marginTop:50}}>
            <Chart
                width={'100%'}
                height={'100%'}
                chartType="PieChart"
                loader={<div style={{color:"gray"}}>Cargando Gráfica...</div>}
                data={json}
                options={{
                    // title: 'PORCENTAJES  RESUMEN  ASEGURADOS',
                    // is3D: true,
                    chartArea:{width:'100%',height:'90%'},
                    legend: { position: 'left',textStyle: {color: 'black', fontSize: 8} },
                    slices: [{offset : 0}],
                    titleTextStyle:{ color:'gray',textAlign:"center"},
                    is3D: true,
                }}
                rootProps={{ 'data-testid': '2' }}
            />
        </div>
        </>
    )
}

export default GraphPie
