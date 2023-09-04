import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundIllustrationComponent } from './not-found-illustration.component';

describe('NotFoundIllustrationComponent', () => {
  let component: NotFoundIllustrationComponent;
  let fixture: ComponentFixture<NotFoundIllustrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundIllustrationComponent]
    });
    fixture = TestBed.createComponent(NotFoundIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
