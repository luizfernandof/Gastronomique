import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumoPregaoListComponent } from './insumo-pregao-list.component';

describe('InsumoPregaoListComponent', () => {
  let component: InsumoPregaoListComponent;
  let fixture: ComponentFixture<InsumoPregaoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsumoPregaoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsumoPregaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
