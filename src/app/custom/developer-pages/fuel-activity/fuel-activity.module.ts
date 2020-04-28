import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FuelActivityListComponent} from './fuel-activity-list/fuel-activity-list.component';
import {FuelActivityDetailComponent} from './fuel-activity-detail/fuel-activity-detail.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FuseSharedModule} from '../../../../@fuse/shared.module';
import {
    FuseConfirmDialogModule,
    FuseHighlightModule,
    FuseSidebarModule,
    FuseWidgetModule
} from '../../../../@fuse/components';
import {MatMenuModule} from '@angular/material/menu';
import {ContactsService} from '../../../main/apps/contacts/contacts.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRippleModule} from '@angular/material/core';
import {FuelActivityEditDialogComponent} from './fuel-activity-edit-dialog/fuel-activity-edit-dialog.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

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
    declarations: [FuelActivityListComponent, FuelActivityDetailComponent, FuelActivityEditDialogComponent],
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
        MatMenuModule,
        MatAutocompleteModule,

        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatMenuModule,
        MatRippleModule,

        FuseSidebarModule,

        FuseSharedModule,
        FuseHighlightModule,
        FuseWidgetModule,
        FuseConfirmDialogModule
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
