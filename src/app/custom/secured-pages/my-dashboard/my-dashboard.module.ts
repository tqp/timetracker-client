import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {FuseSharedModule} from '../../../../@fuse/shared.module';
import {FuseHighlightModule, FuseWidgetModule} from '../../../../@fuse/components';
import {MyDashboardComponent} from './my-dashboard.component';

const routes: Routes = [
    {
        path: 'my-dashboard',
        component: MyDashboardComponent
    }
];

@NgModule({
    declarations: [MyDashboardComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,

        MatIconModule,

        FuseSharedModule,
        FuseHighlightModule,
        FuseWidgetModule
    ]
})
export class MyDashboardModule {
}
