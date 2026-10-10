import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregaoDeleteComponent } from './pregao-delete.component';

describe('PregaoDeleteComponent', () => {
  let component: PregaoDeleteComponent;
  let fixture: ComponentFixture<PregaoDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregaoDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregaoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
