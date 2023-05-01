import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let snackBar : MatSnackBar;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule],
      providers : [MatSnackBar]

    }).compileComponents();
    snackBar = TestBed.inject(MatSnackBar)
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create snackbar with correct message', () => {
    const spy = spyOn(snackBar, 'open');
    const message = 'This is a snackbar message';
    snackBar.open(message);

    expect(spy).toHaveBeenCalledWith(message);
  });

  it('should create snackbar with custom configuration', () => {
    const spy = spyOn(snackBar, 'open');
    const config = { duration: 500, panelClass: ['custom-class'] };
    const message = 'This is a custom snackbar';

    snackBar.open(message, 'Dismiss', config);

    expect(spy).toHaveBeenCalledWith(message, 'Dismiss', config);
  });
});
