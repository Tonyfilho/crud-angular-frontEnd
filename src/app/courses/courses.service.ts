import { RouterTestingModule } from '@angular/router/testing';
import { ICoursesModel } from './../_share/_models/iCourses-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, from, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly API = "./../../assets/_mockup_services/courses.json";

  constructor(private http: HttpClient) {  }

    list() {
      return this.http.get<ICoursesModel[]>(this.API)
      .pipe(tap( localCourses => console.log(localCourses) ));
    }



}
