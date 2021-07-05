import { ComponentFixture, TestBed } from '@angular/core/testing';

import { APIlistComponent } from './api-list.component';

describe('APIlistComponent', () => {
  let component: APIlistComponent;
  let fixture: ComponentFixture<APIlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ APIlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(APIlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
