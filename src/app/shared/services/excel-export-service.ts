import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class ExcelExportService {

  constructor() { }

  exportAsExcelFile(data: any[], fileName: string) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data']};
    // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    XLSX.writeFile(workbook, fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
     // this.saveAsExcelFile(excelBuffer, fileName);
  }
  exportAsExcelFileExcelJs(header: any, data: any[], fileName: string, title: string) {
    const footer = 'Electronically Generated Evaluation as of  ' + new Date();
    const workbook = new Workbook();
    const  worksheet = workbook.addWorksheet('Evaluation Summery');
    const companyName = worksheet.addRow(['Development Bank of Ethiopia']);
    companyName.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
    const titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 14, underline: 'double', bold: true };
    const  headerRow = worksheet.addRow(header);
    worksheet.addRows(data);
    for (let index = 0; index < 5; index++) {
      worksheet.addRow([]);
    }
    const footerRow = worksheet.addRow([footer]);
    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    // Merge Cells
        worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
// Cell Style : Fill and Border
//     headerRow.eachCell((cell, number) => {
//   cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
// });

workbook.xlsx.writeBuffer().then(r => {
  const blob = new Blob([r], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  fs.saveAs(blob, fileName + new Date() + '.xlsx');
});
}



}
