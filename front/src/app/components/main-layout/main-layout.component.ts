import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  providers: [AuthService]
})
export class MainLayoutComponent implements OnInit{
  isSidenavOpen = false;
  username: string | null = null;
  
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.username = this.authService.getUsernameFromCookie();
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.username = null;
      location.reload();
    });
  }
}
