import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FuelVehicleListComponent} from './fuel-vehicle-list/fuel-vehicle-list.component';
import {FuelVehicleDetailComponent} from './fuel-vehicle-detail/fuel-vehicle-detail.component';
import {FuelVehicleEditDialogComponent} from './fuel-vehicle-edit-dialog/fuel-vehicle-edit-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatRippleModule} from '@angular/material/core';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FuseSharedModule} from '../../../../../@fuse/shared.module';
import {FuseConfirmDialogModule, FuseHighlightModule, FuseWidgetModule} from '../../../../../@fuse/components';

const routes: Routes = [
    {
        path: 'fuel-vehicle-list',
        component: FuelVehicleListComponent
    },
    {
        path: 'fuel-vehicle-detail/:guid',
        component: FuelVehicleDetailComponent
    }
];

@NgModule({
    declarations: [FuelVehicleListComponent, FuelVehicleDetailComponent, FuelVehicleEditDialogComponent],
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
        FuelVehicleEditDialogComponent
    ]
})
export class FuelVehicleModule {
}
