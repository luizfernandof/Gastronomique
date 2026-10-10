import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinaEditComponent } from './disciplina-edit.component';

describe('DisciplinaEditComponent', () => {
  let component: DisciplinaEditComponent;
  let fixture: ComponentFixture<DisciplinaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisciplinaEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisciplinaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
