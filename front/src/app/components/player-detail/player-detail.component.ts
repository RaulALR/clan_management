import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { MaterialModule } from '../../shared/material.module';
import { KillsPerMatchComponent } from '../graphs/kills-per-match/kills-per-match.component';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [CommonModule, MaterialModule, HttpClientModule, KillsPerMatchComponent],
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss'],
  providers: [PlayerService],
})
export class PlayerDetailComponent implements OnInit {
  player: any;
  playerStats: any[] = [];
  displayedColumns: string[] = ['title', 'start_time', 'kills', 'deaths', 'teamkills', 'kill_death_ratio', 'kills_per_minute', 'combat', 'support'];
  sortBy: string = 'start_time';
  sortOrder: string = 'DESC';
  playerId = '';
  killsData: any = [];

  constructor(private route: ActivatedRoute, private playerService: PlayerService, private router: Router) { }

  goBack(): void {
    this.router.navigate(['/players']);
  }

  getAverage(data: any, name: string) {
    if (!data || !Array.isArray(data)) {
      return [];
    }

    let historicKills = [];
    historicKills = data.map(stat => parseFloat(stat[name]));

    if (historicKills?.length !== 0) {
      const sum = historicKills.reduce((acc, val) => acc + val, 0);
      return sum / historicKills.length;
    } else {
      return ''
    }
  }

  private loadPlayerById() {
    this.playerService.getPlayersById(this.playerId, this.sortBy, this.sortOrder).subscribe(data => {
      this.player = data.player;
      this.playerStats = data.player_stats;
      if (this.killsData?.length === 0) {
        this.playerStats.slice().reverse().forEach((element, index) => {
          this.killsData.push({ matchName: index, kills: element.kills, title: element.title });
        });
      }
      this.player['globalKillMin'] = this.getAverage(this.playerStats, 'kills_per_minute');
      this.player['globalKillDeath'] = this.getAverage(this.playerStats, 'kill_death_ratio');
      this.player['globalCombat'] = this.getAverage(this.playerStats, 'combat');
      this.player['globalSupport'] = this.getAverage(this.playerStats, 'support');
      this.player['globalDeath'] = this.getAverage(this.playerStats, 'deaths');
      this.player['globalKills'] = this.getAverage(this.playerStats, 'kills');
    });
  }
  public sortData(event: any) {
    this.sortBy = event.active;
    this.sortOrder = event.direction.toUpperCase() || 'ASC';
    this.loadPlayerById();
  }

  ngOnInit(): void {
    this.playerId = this.route.snapshot.paramMap.get('id') || '';
    if (this.playerId) {
      this.loadPlayerById();
    }
  }
}
