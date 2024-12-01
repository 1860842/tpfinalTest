import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentAffichageComponent } from './comment-affichage.component';

describe('CommentAffichageComponent', () => {
  let component: CommentAffichageComponent;
  let fixture: ComponentFixture<CommentAffichageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentAffichageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentAffichageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
