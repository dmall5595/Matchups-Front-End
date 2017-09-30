import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchupsComponent } from './matchups.component';

describe('HeadToHeadComponent', () => {
  let component: MatchupsComponent;
  let fixture: ComponentFixture<MatchupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
