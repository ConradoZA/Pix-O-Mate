import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatCatsThinkComponent } from './what-cats-think.component';

describe('WhatCatsThinkComponent', () => {
  let component: WhatCatsThinkComponent;
  let fixture: ComponentFixture<WhatCatsThinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatCatsThinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatCatsThinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
