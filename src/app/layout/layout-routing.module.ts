import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ResearchDocumentAuthorComponent } from './research/research-document-author/research-document-author.component';
import { ResearchDocumentFormComponent } from './research/research-document-form/research-document-form.component';
import { ResearchViewComponent } from './research/research-view/research-view.component';
import { ResearchComponent } from './research/research/research.component';
import { UserManagementFormComponent } from './user-management/user-management-form/user-management-form.component';
import { UserManagementComponent } from './user-management/user-management.component';
const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'homepage', pathMatch: 'prefix' },
            { path: 'homepage', component: ResearchViewComponent},
            {path: 'users', component: UserManagementComponent},
            {path: 'userForm/:id', component: UserManagementFormComponent},
            {path: 'research', component: ResearchComponent},
            {path: 'researchForm/:id', component: ResearchDocumentFormComponent},
            {path: 'researchDocumentAuthor/:documentId', component : ResearchDocumentAuthorComponent}
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule {}
