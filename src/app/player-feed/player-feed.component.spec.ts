import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerFeedComponent } from './player-feed.component';

describe('PlayerFeedComponent', () => {
  let component: PlayerFeedComponent;
  let fixture: ComponentFixture<PlayerFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
