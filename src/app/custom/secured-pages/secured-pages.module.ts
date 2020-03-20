import { NgModule } from '@angular/core';
import { SampleModule } from './sample/sample.module';
import { MyProfileModule } from './my-profile/my-profile.module';
import { IntuitTokensModule } from './intuit-tokens/intuit-tokens.module';
import { EmployeeTableModule } from './employee-table/employee-table.module';
import { TimeActivityModule } from './time-activity/time-activity.module';
import { IntuitSyncModule } from './intuit-sync/intuit-sync.module';
import { UserDashboardModule } from './user-dashboard/user-dashboard.module';
import { HolidayListModule } from './holiday-list/holiday-list.module';
import { ChangeLogModule } from './change-log/change-log.module';
import { FileUploadModule } from './file-upload/file-upload.module';

@NgModule({
    declarations: [],
    imports: [
        EmployeeTableModule,
        TimeActivityModule,
        SampleModule,
        MyProfileModule,
        IntuitTokensModule,
        IntuitSyncModule,
        UserDashboardModule,
        HolidayListModule,
        ChangeLogModule,
        FileUploadModule
    ]
})
export class SecuredPagesModule {
}
