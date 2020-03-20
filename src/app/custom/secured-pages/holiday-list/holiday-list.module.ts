import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HolidayListComponent} from './holiday-list.component';
import {MatIconModule} from '@angular/material/icon';
import {FuseSharedModule} from '../../../../@fuse/shared.module';
import {FuseHighlightModule, FuseWidgetModule} from '../../../../@fuse/components';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [
    {
        path: 'holiday-list',
        component: HolidayListComponent
    }
];

@NgModule({
    declarations: [HolidayListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        MatIconModule,
        MatTableModule,

        FuseSharedModule,
        FuseHighlightModule,
        FuseWidgetModule
    ]
})
export class HolidayListModule {
}
