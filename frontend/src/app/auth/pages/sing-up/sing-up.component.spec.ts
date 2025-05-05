/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SingUpComponent } from './sing-up.component';

describe('SingUpComponent', () => {
  let component: SingUpComponent;
  let fixture: ComponentFixture<SingUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
