import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { CoursesService } from '../services/courses.service';
import { ICourse } from '../models/iCourse-model';


export const courseResolver: ResolveFn<Observable<ICourse>> = (route, state) => {
  // OBS: Tem ser inject (i) e não Inject (I)
    if (route.params && route.params['id']) {
    return   inject(CoursesService).loadById(route.params['id']);
  }
//  return of({ _id: '', name: '', caregory: '' } as unknown as Observable<ICoursesModel>);
  return new Observable<ICourse>(d => d.next({ _id: '', name: '', category: '' , lessons: []}));
};
