import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchInsertComponent } from './match-insert.component';

describe('MatchInsertComponent', () => {
  let component: MatchInsertComponent;
  let fixture: ComponentFixture<MatchInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchInsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
