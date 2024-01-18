import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/containers/courses/courses.component';

const routes: Routes = [
  // { path: "", pathMatch: "full", component: CoursesComponent }, encaso de relativeTo em algum compomente usando o Active Router precisa remover pathMatch
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: "courses", loadChildren: () => import(`./courses/courses.module`).then(m => m.CoursersModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
