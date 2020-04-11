import {NgModule} from '@angular/core';
import {SampleModule} from './sample/sample.module';
import {MyProfileModule} from './my-profile/my-profile.module';
import {IntuitTokensModule} from './intuit-tokens/intuit-tokens.module';
import {TimeActivityModule} from './time-activity/time-activity.module';
import {IntuitSyncModule} from './intuit-sync/intuit-sync.module';
import {HolidayListModule} from './holiday-list/holiday-list.module';
import {ChangeLogModule} from './change-log/change-log.module';
import {ManagerDashboardModule} from './manager-dashboard/manager-dashboard.module';
import {EmployeeListModule} from './employee-list/employee-list.module';
import {MyDashboardModule} from './my-dashboard/my-dashboard.module';
import {EmployeeDashboardModule} from './employee-dashboard/employee-dashboard.module';

@NgModule({
    declarations: [],
    imports: [
        EmployeeListModule,
        TimeActivityModule,
        SampleModule,
        MyProfileModule,
        IntuitTokensModule,
        IntuitSyncModule,
        HolidayListModule,
        ChangeLogModule,
        ManagerDashboardModule,
        MyDashboardModule,
        EmployeeDashboardModule
    ]
})
export class SecuredPagesModule {
}
