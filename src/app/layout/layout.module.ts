import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputSwitchModule } from 'primeng/inputswitch';
import {ToastModule} from 'primeng/toast';
import { MessageService, ConfirmationService} from 'primeng/api';
import {SplitButtonModule} from 'primeng/splitbutton';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHeaderInterceptor } from '../shared/guard/auth-header.interceptor';
import { AuthGuard } from '../shared';
import {PickListModule} from 'primeng/picklist';
import {CheckboxModule} from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import {TreeModule} from 'primeng/tree';
import {FileUploadModule} from 'primeng/fileupload';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { NgxPaginationModule } from 'ngx-pagination';
// tslint:disable-next-line:max-line-length
import { UserManagementComponent } from './user-management/user-management.component';
import { UserManagementFormComponent } from './user-management/user-management-form/user-management-form.component';
import { ResearchComponent } from './research/research/research.component';
import { ResearchDocumentFormComponent } from './research/research-document-form/research-document-form.component';
import { FileUploadFormComponent } from './research/file-upload-form/file-upload-form.component';
import { ResearchDocumentAuthorComponent } from './research/research-document-author/research-document-author.component';
import { ResearchViewComponent } from './research/research-view/research-view.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgbDropdownModule,
        NgbModule,
        TableModule,
        ButtonModule,
        TooltipModule,
        ConfirmDialogModule,
        TabViewModule,
        DialogModule,
        MultiSelectModule,
        InputSwitchModule,
        ToastModule,
        SplitButtonModule,
        DropdownModule,
        PickListModule,
        CheckboxModule,
        CalendarModule,
        TreeModule,
        FileUploadModule,
        OverlayPanelModule,
        NgxPaginationModule,
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, UserManagementComponent,
         UserManagementFormComponent,
         ResearchComponent,
         ResearchDocumentFormComponent,
         FileUploadFormComponent,
         ResearchDocumentAuthorComponent,
        ResearchViewComponent],
    providers: [MessageService, AuthGuard, ConfirmationService, {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthHeaderInterceptor,
        multi: true
      }]
})
export class LayoutModule {}
