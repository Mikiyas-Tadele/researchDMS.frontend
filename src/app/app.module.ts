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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { TableModule } from 'primeng/table';
import { ResearchViewComponent } from './research-view/research-view.component';


    // const baseUrl = 'http://10.48.2.15:8080/researchDMS/api';

const baseUrl = 'http://localhost:8080/api';
@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        OverlayPanelModule,
        ButtonModule,
        NgbModule,
        TableModule,
        NgxPaginationModule,
        LanguageTranslationModule,
        AppRoutingModule
    ],
    declarations: [AppComponent, ResearchViewComponent, DigitOnlyDirective],
    providers: [AuthGuard, {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthHeaderInterceptor,
        multi: true
      }, { provide: 'BASE_API_URL', useValue: baseUrl }],
    bootstrap: [AppComponent],
    exports: [DigitOnlyDirective]
})
export class AppModule {}
