import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TimeActivityComponent } from './time-activity.component';
import { MatIconModule } from '@angular/material/icon';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { FuseHighlightModule, FuseWidgetModule } from '../../../../@fuse/components';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Routes = [
    {
        path: 'time-activity',
        component: TimeActivityComponent
    }
];

@NgModule({
    declarations: [TimeActivityComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        MatIconModule,
        MatTableModule,
        MatProgressSpinnerModule,

        FuseSharedModule,
        FuseHighlightModule,
        FuseWidgetModule
    ]
})
export class TimeActivityModule {
}
