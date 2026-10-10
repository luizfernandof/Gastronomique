import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisicoesListComponent } from './requisicoes-list.component';

describe('RequisicoesListComponent', () => {
  let component: RequisicoesListComponent;
  let fixture: ComponentFixture<RequisicoesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisicoesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequisicoesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
