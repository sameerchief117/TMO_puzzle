import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let snackBar : MatSnackBar;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule]
    }).compileComponents();
    snackBar = TestBed.inject(MatSnackBar)
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
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
