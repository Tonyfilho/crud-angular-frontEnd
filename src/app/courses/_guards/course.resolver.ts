import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { CoursesService } from '../services/courses.service';
import { ICoursesModel } from './../../_share/_models/iCourses-model';


export const courseResolver: ResolveFn<Observable<ICoursesModel>> = (route, state) => {
  // const courseService: CoursesService = Inject(CoursesService); não funciona aqui, tem q ser direto
  if (route.params && route.params['id']) {
    return   inject(CoursesService).loadById(route.params['id']);
  }
//  return of({ _id: '', name: '', caregory: '' } as unknown as Observable<ICoursesModel>);
  return new Observable<ICoursesModel>(d => d.next({ _id: '', name: '', category: '' }));
};
