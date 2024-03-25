

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { AppComponent } from './app/app.component';
import { APP_ROUTERS } from './app/app.routes';


bootstrapApplication(AppComponent, {
    providers: [
       //importProvidersFrom(BrowserModule, AppRoutingModule, MatToolbarModule, MatTableModule), /**Removido AppRoutingModule p/ a nova abordagem */
        importProvidersFrom(BrowserModule,  MatToolbarModule, MatTableModule),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(APP_ROUTERS, withPreloading(PreloadAllModules)) /**Mudando para o nova Abordagem sem MODULES e fazendo preload de todos os modules,
        o Angular in background irá fazer download de todos os aplicativos antes de carrega-los */
    ]
})
  .catch(err => console.error(err));
