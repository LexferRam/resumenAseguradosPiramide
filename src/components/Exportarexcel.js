import React, { useState, useEffect } from "react";
import ExportExcel from "react-export-excel";
import excel from "../excel1.svg"
import { ButtonBase } from "@material-ui/core";

const ExcelFile = ExportExcel.ExcelFile;
const ExcelSheet = ExportExcel.ExcelSheet;
const ExcelColumn = ExportExcel.ExcelColumn;

function Exportarexcel({ enviarjsonGrid, titulo }) {

  return (
    <div className="btnExportarExcel">
      <ExcelFile
        element={
        <ButtonBase style={{marginTop:"10px"}} >
          <img src={excel} style={{width:"30px"}}  />
          <span style={{color:"green", fontSize:11}}>DESCARGAR EXCEL</span>
        </ButtonBase>
        }
        filename={titulo}
      >
        <ExcelSheet data={enviarjsonGrid} name={titulo}>
          {enviarjsonGrid[0] && Object.keys(enviarjsonGrid[0]).map(columna => (
            <ExcelColumn label={columna} value={columna} />
          ))}
        </ExcelSheet>
      </ExcelFile>
    </div>
  );
}

export default Exportarexcel;
