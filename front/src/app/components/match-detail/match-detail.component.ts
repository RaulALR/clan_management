import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from '../../services/match.service';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-match-detail',
  standalone: true,
  imports: [CommonModule, MaterialModule, HttpClientModule],
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss'],
  providers: [MatchService]
})
export class MatchDetailComponent implements OnInit {
  match: any;
  playerStats: any[] = [];
  displayedColumns: string[] = ['names', 'kills', 'deaths', 'teamkills', 'kill_death_ratio'];
  sortBy: string = 'kills';
  sortOrder: string = 'DESC';

  constructor(private route: ActivatedRoute, private matchService: MatchService, private router: Router) { }

  goBack(): void {
    this.router.navigate(['/matches']);
  }

  public sortData(event: any) {
    this.sortBy = event.active;
    this.sortOrder = event.direction.toUpperCase() || 'ASC';
    this.loadDetails(); // 🔥 Volver a cargar los datos con el nuevo orden
  }

  private loadDetails() {    
    const matchId = this.route.snapshot.paramMap.get('id') || '0';
    this.matchService.getMatchesById(matchId, this.sortBy, this.sortOrder).subscribe(data => {
      this.match = data.match;
      this.playerStats = data.player_stats;
    });
  }

  ngOnInit(): void {
    this.loadDetails();
  }
}
