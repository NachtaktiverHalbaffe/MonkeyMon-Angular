import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeymonComponent } from './monkeymon.component';

describe('MonkeymonComponent', () => {
  let component: MonkeymonComponent;
  let fixture: ComponentFixture<MonkeymonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonkeymonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonkeymonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
