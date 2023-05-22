import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpTestingController } from '@angular/common/http/testing';

import { SharedTestingModule, createReadingListItem } from '@tmo/shared/testing';
import { ReadingListEffects } from './reading-list.effects';
import * as ReadingListActions from './reading-list.actions';

describe('ToReadEffects', () => {
  let actions: ReplaySubject<any>;
  let effects: ReadingListEffects;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      providers: [
        ReadingListEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(ReadingListEffects);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('loadReadingList$', () => {
    it('should work', done => {
      actions = new ReplaySubject();
      actions.next(ReadingListActions.init());

      effects.loadReadingList$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.loadReadingListSuccess({ list: [] })
        );
        done();
      });

      httpMock.expectOne('/api/reading-list').flush([]);
    });

    it('should mark as read', done => {
      actions = new ReplaySubject();
      const item = createReadingListItem('A');
      actions.next(ReadingListActions.updateFromList({ item }));
  
      effects.updateBook$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.confirmedUpdateFromList({
            item
          })
        );
        done();
      });
  
      httpMock.expectOne('/api/reading-list/A/finished').flush(item);
    });
  
    it('should use failedUpdateFromList action if updateFromList action fails', done => {
      actions = new ReplaySubject();
      const item = createReadingListItem('A');
      actions.next(ReadingListActions.updateFromList({ item }));
  
      effects.updateBook$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.failedUpdateFromList({ item })
        );
        done();
      });
  
      httpMock.expectOne('/api/reading-list/A/finished').error(new ErrorEvent('Error'));
    });
  });
});
