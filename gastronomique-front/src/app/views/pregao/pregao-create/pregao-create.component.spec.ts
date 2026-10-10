import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregaoCreateComponent } from './pregao-create.component';

describe('PregaoCreateComponent', () => {
  let component: PregaoCreateComponent;
  let fixture: ComponentFixture<PregaoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregaoCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregaoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
