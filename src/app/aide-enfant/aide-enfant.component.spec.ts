import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AideEnfantComponent } from './aide-enfant.component';

describe('AideEnfantComponent', () => {
  let component: AideEnfantComponent;
  let fixture: ComponentFixture<AideEnfantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AideEnfantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AideEnfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
