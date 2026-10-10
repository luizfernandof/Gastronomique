import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratorioEditComponent } from './laboratorio-edit.component';

describe('LaboratorioEditComponent', () => {
  let component: LaboratorioEditComponent;
  let fixture: ComponentFixture<LaboratorioEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratorioEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboratorioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
