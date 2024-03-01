import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ICoursesForms, ICourses, } from 'src/app/_share/_models/iCourses-model';
import { CoursesService } from '../../services/courses.service';
import { Observable } from 'rxjs';
import { ILessoForms, ILesson } from 'src/app/_share/_models/iLesson-model';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  //form!: ICoursesForms;  /**Foi removido a tipagem pois FormsArray não aceita tipagem, isto esta nas DOCs do Angular */
  form!: FormGroup;
  localButton: string = "Save"
  constructor(private fb: FormBuilder, private courseService: CoursesService, private _snackBar: MatSnackBar, private location: Location, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    const localCourse: ICourses = this.route.snapshot.data['course'];
    console.log("localCourse: ", localCourse);
    this.form = this.fb.group({
      _id: [localCourse._id],
      name: new FormControl(localCourse.name, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      category: new FormControl(localCourse.category, [Validators.required]),
      lessons: this.fb.array(this.retrieveLessons(localCourse)),
    });
    /**O Valor será SETADO direto na criação do Form */
    // this.form.setValue({
    //   _id: localCourse._id as any,
    //   name: localCourse.name,
    //   category: localCourse.category,
    // });

    // console.log("FORMGROUP", this.form);
    // console.log("FORMVALUE", this.form.value);
    this.form.get('_id')?.value ? this.localButton = "Update" : this.localButton = "Save"


  }

  /**Create a FormaArray Methos */
  private retrieveLessons(course: ICourses): ILessoForms[] {
    const localLessons: ILessoForms[] = [];
    if (course?.lessons.length > 0) {
      course.lessons.forEach(lesson => localLessons.push(this.createLesson(lesson)));
    } else {
      localLessons.push(this.createLesson());
    }

    return localLessons;
  }

  /**Create one lesson to form */
  private createLesson(lesson: ILesson = { id: '', name: '', youtubeUrl: '' }): ILessoForms {
    return this.fb.group({
      id: new FormControl(lesson.id),
      name: [lesson.name],
      youtubeUrl: [lesson.youtubeUrl]
    });
  }
  /**Delete one lesson to form */
  private deleteLesson(lesson: ILesson = { id: '', name: '', youtubeUrl: '' }): ILessoForms {
    return this.fb.group({
      id: new FormControl(lesson.id),
      name: [lesson.name],
      youtubeUrl: [lesson.youtubeUrl]
    });
  }

  /**Get a controls tem que Tipar com Untyped para achar os CONTROLS q são protegidos, tem q usar o <>*/
  getLessonsFormArray() {
    return (<UntypedFormArray>this.form.get('lessons')).controls;
  }

  /**Add lesson no Form do html */
  addNewLesson() {
    const localLesson = this.form.get('lessons') as UntypedFormArray;
    localLesson.push(this.createLesson());
  }

  /**Remove lesson no Form do html */
  deleteNewLesson(index: number) {
    const localLesson = (<UntypedFormArray>this.form.get('lessons'));
    localLesson.removeAt(index);

    // const localLesson = (<UntypedFormArray>this.form.get('lessons')).controls
    // if (localLesson.findIndex(() => index) > -1 && localLesson[index] != undefined) {
    //   console.log("dentro do if");
    //   this.courseService.save(this.form.value);
    // }
    // return localLesson.splice(index, 1);

  }


  onSubmit() {
    this.courseService.save(this.form.value as ICourses).subscribe({
      next: res => {
        this.openSnackBar("All right! New Course save.")
        this.onCancel();
        console.log(res);
      },
      error: err => {
        this.openSnackBar('Sorry you can not save your course!');
        this.form.reset();
      }

    });
  }

  onCancel() {
    this.form.reset();
    this.location.back();
    // this.router.navigate(['/courses']); usando o location

  }

  private openSnackBar(message: string) {
    this._snackBar.open(message, '', { duration: 5000 });
  }


  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')) {
      return 'You must enter a value';
    }
    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5; // se tiver retorno a qyantidade, senão retorno o valor padrão
      return `Min lenght: ${requiredLength}`;
    }
    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 100;
      return `Max lenght: ${requiredLength}`;
    }

    // this.form.getError('name')
    return 'Not a valid field';

  };



}
