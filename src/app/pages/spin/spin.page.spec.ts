import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinPage } from './spin.page';

describe('SpinPage', () => {
  let component: SpinPage;
  let fixture: ComponentFixture<SpinPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
