import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopVideoComponent } from './top-video.component';

describe('TopVideoComponent', () => {
  let component: TopVideoComponent;
  let fixture: ComponentFixture<TopVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
