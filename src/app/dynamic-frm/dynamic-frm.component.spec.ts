import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFrmComponent } from './dynamic-frm.component';

describe('DynamicFrmComponent', () => {
  let component: DynamicFrmComponent;
  let fixture: ComponentFixture<DynamicFrmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFrmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
