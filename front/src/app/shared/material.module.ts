import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSortModule} from '@angular/material/sort';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSidenavModule, 
    MatListModule, 
    MatIconModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSortModule
  ],
  exports: [
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSidenavModule, 
    MatListModule, 
    MatIconModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSortModule
  ]
})
export class MaterialModule { }
