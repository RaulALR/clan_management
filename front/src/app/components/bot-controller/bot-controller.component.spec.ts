import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotControllerComponent } from './bot-controller.component';

describe('BotControllerComponent', () => {
  let component: BotControllerComponent;
  let fixture: ComponentFixture<BotControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotControllerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
