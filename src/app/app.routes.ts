import { Routes } from "@angular/router";



 export const APP_ROUTERS: Routes = [
  // { path: "", pathMatch: "full", component: CoursesComponent }, encaso de relativeTo em algum compomente usando o Active Router precisa remover pathMatch
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: "courses", loadChildren: () => import(`./courses/courser.routes`).then(m => m.ROUTERS_COURSES) },

];
