import { ComponentFixture, TestBed } from '@angular/core/testing';

import { messageDialogComponent } from './message-dialog.component';

describe('ConfirmationDialogComponent', () => {
  let component: messageDialogComponent;
  let fixture: ComponentFixture<messageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ messageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(messageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
