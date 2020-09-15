import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoyProComponent } from './pro.component';

describe('ProComponent', () => {
  let component: SoyProComponent;
  let fixture: ComponentFixture<SoyProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SoyProComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoyProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
