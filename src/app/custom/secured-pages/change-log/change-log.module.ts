import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChangeLogComponent } from './change-log.component';
import { MatIconModule } from '@angular/material/icon';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { FuseHighlightModule, FuseWidgetModule } from '../../../../@fuse/components';

const routes: Routes = [
    {
        path: 'change-log',
        component: ChangeLogComponent
    }
];

@NgModule({
    declarations: [ChangeLogComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        MatIconModule,

        FuseSharedModule,
        FuseHighlightModule,
        FuseWidgetModule
    ]
})
export class ChangeLogModule {
}
