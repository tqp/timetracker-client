import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuelDashboardModule} from './fuel-dashboard/fuel-dashboard.module';
import {FileUploadModule} from './file-upload/file-upload.module';
import {FuelStationListModule} from './fuel-station-list/fuel-station-list.module';
import {FuelStationDetailModule} from './fuel-station-detail/fuel-station-detail.module';
import {FuelStationEditDialogComponent} from './fuel-station-edit-dialog/fuel-station-edit-dialog.component';
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

@NgModule({
    declarations: [FuelStationEditDialogComponent],
    imports: [
        CommonModule,
        FuelDashboardModule,
        FileUploadModule,
        FuelStationListModule,
        FuelStationDetailModule,

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
        FuelStationEditDialogComponent
    ]
})
export class DeveloperPagesModule {
}
