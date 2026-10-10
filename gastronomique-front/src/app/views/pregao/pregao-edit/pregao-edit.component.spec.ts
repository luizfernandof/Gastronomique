import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregaoEditComponent } from './pregao-edit.component';

describe('PregaoEditComponent', () => {
  let component: PregaoEditComponent;
  let fixture: ComponentFixture<PregaoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregaoEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregaoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
