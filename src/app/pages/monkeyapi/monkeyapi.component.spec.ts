import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyapiComponent } from './monkeyapi.component';

describe('MonkeyapiComponent', () => {
  let component: MonkeyapiComponent;
  let fixture: ComponentFixture<MonkeyapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonkeyapiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonkeyapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
