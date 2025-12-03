import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsAngularComponent } from './ds-angular.component';

describe('DsAngularComponent', () => {
  let component: DsAngularComponent;
  let fixture: ComponentFixture<DsAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsAngularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
