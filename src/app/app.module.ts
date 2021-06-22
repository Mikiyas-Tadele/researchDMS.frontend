import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/guard/auth-guard.service';
import { AuthHeaderInterceptor } from './shared/guard/auth-header.interceptor';
import { DigitOnlyDirective } from './shared/directives/digit-only.directive';
//    const baseUrl = 'http://10.48.8.33:8080/ticketing/api';

const baseUrl = 'http://localhost:8080/api';
@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule
    ],
    declarations: [AppComponent, DigitOnlyDirective],
    providers: [AuthGuard, {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthHeaderInterceptor,
        multi: true
      }, { provide: 'BASE_API_URL', useValue: baseUrl }],
    bootstrap: [AppComponent],
    exports: [DigitOnlyDirective]
})
export class AppModule {}
