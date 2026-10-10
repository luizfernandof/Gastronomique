import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumoPregaoCreateComponent } from './insumo-pregao-create.component';

describe('InsumoPregaoCreateComponent', () => {
  let component: InsumoPregaoCreateComponent;
  let fixture: ComponentFixture<InsumoPregaoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsumoPregaoCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsumoPregaoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
