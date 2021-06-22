import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { UserManagementFormComponent } from './user-management/user-management-form/user-management-form.component';
import { UserManagementComponent } from './user-management/user-management.component';
const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('./dashboard/dashboard.module').then(
                        (m) => m.DashboardModule
                    ),
            },
            {path: 'users', component: UserManagementComponent},
            {path: 'userForm/:id', component: UserManagementFormComponent}
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule {}
