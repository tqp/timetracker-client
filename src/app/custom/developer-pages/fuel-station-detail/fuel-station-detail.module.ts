import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FuelStationDetailComponent} from './fuel-station-detail.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FuseSharedModule} from '../../../../@fuse/shared.module';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FuseConfirmDialogModule, FuseHighlightModule, FuseWidgetModule} from '../../../../@fuse/components';
import {ColorPickerModule} from 'ngx-color-picker';

const routes: Routes = [
    {
        path: 'fuel-station-detail/:guid',
        component: FuelStationDetailComponent
    }
];

@NgModule({
    declarations: [FuelStationDetailComponent],
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
export class FuelStationDetailModule {
}
