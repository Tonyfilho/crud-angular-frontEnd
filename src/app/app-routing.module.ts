import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [
  { path: "", pathMatch: "full", component: CoursesComponent },
  { path: "coursers", loadChildren: () => import(`./courses/courses.module`).then(m => m.CoursersModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
