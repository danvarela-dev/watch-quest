import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { SeriesActions } from './series.actions';

@Injectable()
export class SeriesEffects {
  // loadSeriess$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(SeriesActions.loadSeries),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         // map(data => SeriesActions.loadSeriesSuccess({ data }))
  //     )
  //   );
  // });

  constructor(private actions$: Actions) {}
}
