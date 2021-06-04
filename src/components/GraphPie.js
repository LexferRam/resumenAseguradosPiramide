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
        <div style={{marginTop:50}}>
            <Chart
                width={'390px'}
                height={'270px'}
                chartType="PieChart"
                loader={<div style={{color:"gray"}}>Cargando Gráfica...</div>}
                data={json}
                options={{
                    title: 'PORCENTAJES  RESUMEN  ASEGURADOS',
                    // is3D: true,
                    chartArea:{top:21,width:'90%',height:'84%'},
                    legend: { position: 'bottom',textStyle: {color: 'black', fontSize: 13} },
                    slices: [{offset : 0}],
                    titleTextStyle:{ fontSize: 8, color:'gray'},
                    is3D: true,
                }}
                rootProps={{ 'data-testid': '2' }}
            />
        </div>
    )
}

export default GraphPie
