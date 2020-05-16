import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileUploadModule} from './sample-apps/file-upload/file-upload.module';
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
import {FuelStationModule} from './auto-tracker/fuel-station/fuel-station.module';
import {FuelActivityModule} from './auto-tracker/fuel-activity/fuel-activity.module';
import {AutoCompleteModule} from './sample-apps/auto-complete/auto-complete.module';
import {FuelVehicleModule} from './auto-tracker/fuel-vehicle/fuel-vehicle.module';
import {AutoExpenseModule} from './auto-tracker/auto-expense/auto-expense.module';
import {AutoTrackerDashboardModule} from './auto-tracker/auto-tracker-dashboard/auto-tracker-dashboard.module';
import {ExpenseCategoryModule} from './auto-tracker/expense-category/expense-category.module';
import {TimeTesterModule} from './sample-apps/time-tester/time-tester.module';
import {SeriesModule} from './reality-tracker/series/series.module';
import {BoatModule} from './charter-sauce/boat/boat.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,

        // Auto Tracker App
        FuelStationModule,
        FuelActivityModule,
        FuelVehicleModule,
        AutoExpenseModule,
        AutoTrackerDashboardModule,
        ExpenseCategoryModule,

        // Reality Tracker App
        SeriesModule,

        // Charter Sauce App
        BoatModule,

        // Sample Apps
        AutoCompleteModule,
        FileUploadModule,
        TimeTesterModule,

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
