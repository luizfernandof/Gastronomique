import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinaDeleteComponent } from './disciplina-delete.component';

describe('DisciplinaDeleteComponent', () => {
  let component: DisciplinaDeleteComponent;
  let fixture: ComponentFixture<DisciplinaDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisciplinaDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisciplinaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
