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
import {FuseSharedModule} from '../../../../../@fuse/shared.module';
import {FuseConfirmDialogModule, FuseHighlightModule, FuseWidgetModule} from '../../../../../@fuse/components';
import {FuelStationDetailComponent} from './fuel-station-detail/fuel-station-detail.component';
import {FuelStationEditDialogComponent} from './fuel-station-edit-dialog/fuel-station-edit-dialog.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatRippleModule} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

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
    declarations: [
        FuelStationListComponent,
        FuelStationDetailComponent,
        FuelStationEditDialogComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        MatTooltipModule,
        MatAutocompleteModule,

        FuseSharedModule,
        FuseHighlightModule,
        FuseConfirmDialogModule,
        FuseWidgetModule
    ],
    entryComponents: [
        FuelStationEditDialogComponent
    ]
})
export class FuelStationModule {
}
