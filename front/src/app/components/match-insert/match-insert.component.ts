import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';
import { MatchService } from '../../services/match.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-match-insert',
  standalone: true,
  templateUrl: './match-insert.component.html',
  styleUrls: ['./match-insert.component.scss'],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [MatchService]
})
export class MatchInsertComponent {
  matchData: string = '';
  title: string = '';
  competitive: boolean = false;

  constructor(private matchService: MatchService) { }

  onSubmit() {
    try {
      const parsedData = JSON.parse(this.matchData);
      parsedData.result.title = this.title;
      parsedData.result.competitive = this.competitive;

      // Validar el formato del JSON
      if (this.isValidMatchData(parsedData)) {
        this.matchService.insertMatch(parsedData).subscribe(
          (response) => {
            this.title = '';
            this.competitive = false;
            this.matchData = '';
            alert('Partida insertada');
          },
          (error) => {
            console.error('Error al insertar la partida', error);
          }
        );
      } else {
        console.error('Formato de datos no válido.');
      }
    } catch (error) {
      console.error('Error al parsear el JSON:', error);
    }
  }

  isValidMatchData(data: any): boolean {
    return (
      this.title &&
      data &&
      data.result &&
      data.result.id &&
      data.result.start &&
      data.result.end &&
      Array.isArray(data.result.player_stats)
    );
  }
}