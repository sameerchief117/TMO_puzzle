import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { ReadingListBook,
  addToReadingList,
  getAllBooks,
  getReadingList,
  removeFromReadingList, } from '@tmo/books/data-access';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);
  books: ReadingListBook[];
  constructor(private readonly store: Store, private snackBar: MatSnackBar) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    this.openSnackBar('Removed', 'Undo', item);
  }

  openSnackBar(message, action, item) {
    let snackBarRef = this.snackBar.open(message, action, {duration:2000});

    snackBarRef.onAction().subscribe(() => {
      this.store.select(getAllBooks).subscribe((books) => {
        this.books = books;
      });
      let book = this.books.find((books) => books.id == item.bookId);
      this.store.dispatch(addToReadingList({ book }));
    });
  }
}
