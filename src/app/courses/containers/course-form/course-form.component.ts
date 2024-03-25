import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from 'src/app/courses/models/iCourse-model';
import { ILessoForms, ILesson } from 'src/app/courses/models/iLesson-model';
import { FormsUtilsService } from 'src/app/_share/forms-validations/forms-utils.service';
import { CoursesService } from '../../services/courses.service';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton, MatMiniFabButton, MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatHint, MatError, MatPrefix } from '@angular/material/form-field';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';

@Component({
    selector: 'app-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.scss'],
    standalone: true,
    imports: [MatCard, MatToolbar, MatCardContent, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatHint, MatError, MatSelect, MatOption, MatFabButton, MatIcon, MatPrefix, MatMiniFabButton, MatCardActions, MatButton]
})
export class CourseFormComponent implements OnInit {
  //form!: ICoursesForms;  /**Foi removido a tipagem pois FormsArray não aceita tipagem, isto esta nas DOCs do Angular */
  form!: FormGroup;
  localButton: string = "Save"
  constructor(private fb: FormBuilder,
    private courseService: CoursesService,
    private location: Location,
    private route: ActivatedRoute,
    public formsUtilsService: FormsUtilsService) {

  }
  ngOnInit(): void {
    const localCourse: ICourse = this.route.snapshot.data['course'];
    // console.log("localCourse in OnInit: ", localCourse);
    this.form = this.fb.group({
      _id: [localCourse._id],
      name: new FormControl(localCourse.name, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      category: new FormControl(localCourse.category, [Validators.required]),
      lessons: this.fb.array(this.retrieveLessons(localCourse), Validators.required,),
    });
    this.form.get('_id')?.value ? this.localButton = "Update" : this.localButton = "Save"

    /**O Valor será SETADO direto na criação do Form */
    // this.form.setValue({
    //   _id: localCourse._id as any,
    //   name: localCourse.name,
    //   category: localCourse.category,
    // });
    // console.log("FORMGROUP", this.form);
    // console.log("FORMVALUE", this.form.value);

  }

  /**Create a FormaArray Methos */
  private retrieveLessons(course: ICourse): ILessoForms[] {
    const localLessons: ILessoForms[] = [];
    if (course?.lessons.length >= 0) {
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
      name: [lesson.name, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      youtubeUrl: [lesson.youtubeUrl, [Validators.required, Validators.minLength(11), Validators.maxLength(50)]]
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
    if (localLesson.get('id')) {
      console.log("dentro do if");
      localLesson.removeAt(index);
      this.courseService.save(this.form.value).subscribe();
      this.location.back();
    }  else {
      localLesson.removeAt(index);

    }
      /**Modo JavaScript */
    // const localLesson = (<UntypedFormArray>this.form.get('lessons')).controls
    // return localLesson.splice(index, 1);

  }


  onSubmit() {

    if (this.form.valid) {
      this.courseService.save(this.form.value as ICourse).subscribe({
        next: res => {
          this.formsUtilsService.openSnackBar("All right! New Course save.")
          this.onCancel();
          console.log(res);
        },
        error: err => {
          this.formsUtilsService.openSnackBar('Sorry you can not save your course!');
          this.form.reset();
        },
        complete: () => this.form.reset()
      });

    } else {
      this.formsUtilsService.validateAllFormFields(this.form);
      this.formsUtilsService.openSnackBar('Fulfill the forms pls!');
    }
  }

  onCancel() {
    this.form.reset();
    this.location.back();
    // this.router.navigate(['/courses']); usando o location

  }






}
