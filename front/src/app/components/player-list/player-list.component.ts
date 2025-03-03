import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ExcelExportService } from '../../services/excel-export.service';

@Component({
  selector: 'app-player-list',
  standalone: true,
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [PlayerService, ExcelExportService]
})
export class PlayerListComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['player_id', 'names', 'actions'];

  filterName: string = '';
  filterPlayerId: string = '';
  filterLCM: boolean | undefined = true;

  constructor(private playerService: PlayerService, private excelService: ExcelExportService) { }

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(): void {
    this.playerService.getPlayers(this.filterName, this.filterPlayerId, this.filterLCM)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  downloadClanExcel(): void {
    this.playerService.getPlayers('', '', true)
      .subscribe(data => {
        this.excelService.exportToExcel(data);
      });
  }

  clearFilters(): void {
    this.filterName = '';
    this.filterPlayerId = '';
    this.filterLCM = undefined;
    this.loadPlayers();
  }
}
