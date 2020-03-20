import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {FuseSharedModule} from '../../../../@fuse/shared.module';
import {FuseHighlightModule, FuseWidgetModule} from '../../../../@fuse/components';
import {UserDashboardComponent} from './user-dashboard.component';

const routes: Routes = [
    {
        path: 'user-dashboard',
        component: UserDashboardComponent
    }
];

@NgModule({
    declarations: [
        UserDashboardComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,

        MatIconModule,

        FuseSharedModule,
        FuseHighlightModule,
        FuseWidgetModule
    ]
})
export class UserDashboardModule {
}
