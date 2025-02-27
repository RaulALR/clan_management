import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './shared/material.module';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule, MaterialModule]  // Usamos RouterModule, no RouterOutlet
})
export class AppComponent {
  title = 'front';
}
