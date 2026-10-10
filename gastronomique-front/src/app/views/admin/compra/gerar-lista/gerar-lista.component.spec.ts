import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerarListaComponent } from './gerar-lista.component';

describe('GerarListaComponent', () => {
  let component: GerarListaComponent;
  let fixture: ComponentFixture<GerarListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerarListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerarListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
