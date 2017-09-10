import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FanRankComponent } from './fan-rank.component';

describe('FanRankComponent', () => {
  let component: FanRankComponent;
  let fixture: ComponentFixture<FanRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FanRankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FanRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
