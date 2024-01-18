import { Inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CoursesService } from '../services/courses.service';
import { ICoursesModel } from './../../_share/_models/iCourses-model';
const courseService: CoursesService = Inject(CoursesService);

export const courseResolver: ResolveFn<Observable<ICoursesModel>> = (route, state) => {

  if (route.params && route.params['id']) {
    return   courseService.loadById(route.params['id']);
  }
//  return of({ _id: '', name: '', caregory: '' } as unknown as Observable<ICoursesModel>);
  return new Observable<ICoursesModel>(d => d.next({ _id: '', name: '', category: '' }));
};
