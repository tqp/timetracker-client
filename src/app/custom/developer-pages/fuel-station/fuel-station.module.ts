import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FuelStationListComponent} from './fuel-station-list/fuel-station-list.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FuseSharedModule} from '../../../../@fuse/shared.module';
import {FuseConfirmDialogModule, FuseHighlightModule, FuseWidgetModule} from '../../../../@fuse/components';
import {FuelStationDetailComponent} from './fuel-station-detail/fuel-station-detail.component';

const routes: Routes = [
    {
        path: 'fuel-station-list',
        component: FuelStationListComponent
    },
    {
        path: 'fuel-station-detail/:guid',
        component: FuelStationDetailComponent
    }
];

@NgModule({
    declarations: [FuelStationListComponent, FuelStationDetailComponent],
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
        FuseConfirmDialogModule
    ]
})
export class FuelStationModule {
}
