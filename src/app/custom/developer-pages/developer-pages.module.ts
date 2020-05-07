import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuelDashboardModule} from './fuel-dashboard/fuel-dashboard.module';
import {FileUploadModule} from './file-upload/file-upload.module';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatRippleModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FuseSharedModule} from '../../../@fuse/shared.module';
import {FuseConfirmDialogModule, FuseSidebarModule} from '../../../@fuse/components';
import {MatDialogModule} from '@angular/material/dialog';
import {FuelStationModule} from './fuel-station/fuel-station.module';
import {FuelActivityModule} from './fuel-activity/fuel-activity.module';
import {AutoCompleteModule} from './auto-complete/auto-complete.module';
import {FuelVehicleModule} from './fuel-vehicle/fuel-vehicle.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,

        AutoCompleteModule,
        FileUploadModule,
        FuelDashboardModule,
        FuelStationModule,
        FuelActivityModule,
        FuelVehicleModule,

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,
        MatDialogModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule
    ],
    entryComponents: []
})
export class DeveloperPagesModule {
}
