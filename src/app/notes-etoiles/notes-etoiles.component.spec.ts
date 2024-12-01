import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesEtoilesComponent } from './notes-etoiles.component';

describe('NotesEtoilesComponent', () => {
  let component: NotesEtoilesComponent;
  let fixture: ComponentFixture<NotesEtoilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesEtoilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesEtoilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
