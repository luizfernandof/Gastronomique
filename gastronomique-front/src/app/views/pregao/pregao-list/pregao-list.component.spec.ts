import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregaoListComponent } from './pregao-list.component';

describe('PregaoListComponent', () => {
  let component: PregaoListComponent;
  let fixture: ComponentFixture<PregaoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregaoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
