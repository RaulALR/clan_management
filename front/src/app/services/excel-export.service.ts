import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelExportService {

  constructor() { }

  exportToExcel(players: any[]): void {
    const filteredPlayers = players.map(player => ({
      ID: player.player_id,
      Nombre: player.names
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredPlayers);

    worksheet['!cols'] = [
      { wpx: 150 },
      { wpx: 150 }
    ];

    const headerRow = ["A1", "B1"];
    headerRow.forEach(cell => {
      if (worksheet[cell]) {
        worksheet[cell].s = {
          fill: { fgColor: { rgb: "00FF00" } },
          font: { bold: true, color: { rgb: "FFFFFF" } }
        };
      }
    });

    const workbook: XLSX.WorkBook = { Sheets: { 'Players': worksheet }, SheetNames: ['Players'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    this.saveExcelFile(excelBuffer, 'players_data.xlsx');
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(data, fileName);
  }
}
