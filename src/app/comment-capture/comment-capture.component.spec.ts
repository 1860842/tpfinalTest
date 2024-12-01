import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentCaptureComponent } from './comment-capture.component';

describe('CommentCaptureComponent', () => {
  let component: CommentCaptureComponent;
  let fixture: ComponentFixture<CommentCaptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentCaptureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
