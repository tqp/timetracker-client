import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FuelStationListComponent} from './fuel-station-list.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {FuseSharedModule} from '../../../../@fuse/shared.module';
import {FuseConfirmDialogModule, FuseHighlightModule, FuseWidgetModule} from '../../../../@fuse/components';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ColorPickerModule} from 'ngx-color-picker';

const routes: Routes = [
    {
        path: 'fuel-station-list',
        component: FuelStationListComponent
    }
];

@NgModule({
    declarations: [FuelStationListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        MatIconModule,
        MatTableModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatToolbarModule,
        MatTooltipModule,

        FuseSharedModule,
        FuseHighlightModule,
        FuseWidgetModule,
        FuseConfirmDialogModule,

        ColorPickerModule,
    ]
})
export class FuelStationListModule {
}
