import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FuelActivityListComponent} from '../fuel-activity/fuel-activity-list/fuel-activity-list.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRippleModule} from '@angular/material/core';
import {
    FuseConfirmDialogModule,
    FuseHighlightModule,
    FuseSidebarModule,
    FuseWidgetModule
} from '../../../../@fuse/components';
import {FuseSharedModule} from '../../../../@fuse/shared.module';
import {FuelActivityTwoComponent} from './fuel-activity-two.component';

const routes: Routes = [
    {
        path: 'fuel-activity-two-list',
        component: FuelActivityTwoComponent
    }
];

@NgModule({
    declarations: [FuelActivityTwoComponent],
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
        MatDialogModule,
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
    ]
})
export class FuelActivityTwoModule {
}
