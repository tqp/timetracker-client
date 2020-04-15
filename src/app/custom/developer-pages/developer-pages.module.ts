import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuelDashboardModule} from './fuel-dashboard/fuel-dashboard.module';
import {FileUploadModule} from './file-upload/file-upload.module';
import {FuelStationEditDialogComponent} from './fuel-station/fuel-station-edit-dialog/fuel-station-edit-dialog.component';
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
import {FuelActivityEditDialogComponent} from './fuel-activity/fuel-activity-edit-dialog/fuel-activity-edit-dialog.component';
import {FuelActivityDetailComponent} from './fuel-activity/fuel-activity-detail/fuel-activity-detail.component';
import {FuelStationModule} from './fuel-station/fuel-station.module';
import {FuelActivityModule} from './fuel-activity/fuel-activity.module';

@NgModule({
    declarations: [FuelStationEditDialogComponent, FuelActivityEditDialogComponent, FuelActivityDetailComponent],
    imports: [
        CommonModule,

        FileUploadModule,
        FuelDashboardModule,
        FuelStationModule,
        FuelActivityModule,

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
    entryComponents: [
        FuelStationEditDialogComponent,
        FuelActivityEditDialogComponent
    ]
})
export class DeveloperPagesModule {
}
