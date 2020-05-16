import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FuelActivityListComponent} from './fuel-activity-list/fuel-activity-list.component';
import {FuelActivityDetailComponent} from './fuel-activity-detail/fuel-activity-detail.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FuseSharedModule} from '../../../../../@fuse/shared.module';
import {FuseConfirmDialogModule, FuseSidebarModule, FuseWidgetModule} from '../../../../../@fuse/components';
import {MatMenuModule} from '@angular/material/menu';
import {ContactsService} from '../../../../main/apps/contacts/contacts.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRippleModule} from '@angular/material/core';
import {FuelActivityEditDialogComponent} from './fuel-activity-edit-dialog/fuel-activity-edit-dialog.component';
import {FuelActivityService} from './fuel-activity.service';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';

const routes: Routes = [
    {
        path: 'fuel-activity-list',
        component: FuelActivityListComponent
    },
    {
        path: 'fuel-activity-detail/:guid',
        component: FuelActivityDetailComponent
    }
];

@NgModule({
    declarations: [
        FuelActivityListComponent,
        FuelActivityDetailComponent,
        FuelActivityEditDialogComponent
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
        FuseConfirmDialogModule,
        FuseSidebarModule,
        FuseWidgetModule
    ],
    providers: [
        ContactsService,
        MatTableModule
    ],
    entryComponents: [
        FuelActivityEditDialogComponent
    ]
})
export class FuelActivityModule {
}
