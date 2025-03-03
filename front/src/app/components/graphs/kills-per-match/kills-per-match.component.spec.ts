import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KillsPerMatchComponent } from './kills-per-match.component';

describe('KillsPerMatchComponent', () => {
  let component: KillsPerMatchComponent;
  let fixture: ComponentFixture<KillsPerMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KillsPerMatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KillsPerMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
