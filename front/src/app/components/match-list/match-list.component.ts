import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchService } from '../../services/match.service';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-match-list',
  standalone: true,
  imports: [CommonModule, MaterialModule, HttpClientModule, RouterModule],
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss'],
  providers: [MatchService]
})
export class MatchListComponent implements OnInit {
  displayedColumns: string[] = ['title','map_name', 'start_time', 'end_time', 'result_axis', 'result_allied', 'competitive', 'actions'];
  matches: any[] = [];
  sortBy: string = 'start_time';
  sortOrder: string = 'DESC';

  constructor(private matchService: MatchService) {}

  loadMatches(): void {
    this.matchService.getMatches(this.sortBy, this.sortOrder).subscribe(data => {
      this.matches = data;
    });
  }

  deleteMatch(id: string): void {
    if (confirm(`¿Estás seguro de que deseas eliminar la partida con ID ${id}?`)) {
      this.matchService.deleteMatch(id).subscribe(() => {
        this.matches = this.matches.filter(match => match.id !== id);
      });
    }
  }

  sortData(event: any) {
    this.sortBy = event.active;
    this.sortOrder = event.direction.toUpperCase() || 'ASC';
    this.loadMatches();
  }

  ngOnInit(): void {
    this.loadMatches();
  }
}
