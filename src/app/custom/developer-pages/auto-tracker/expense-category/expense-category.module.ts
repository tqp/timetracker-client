import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExpenseCategoryListComponent} from './expense-category-list/expense-category-list.component';
import {ExpenseCategoryDetailComponent} from './expense-category-detail/expense-category-detail.component';
import {ExpenseCategoryEditDialogComponent} from './expense-category-edit-dialog/expense-category-edit-dialog.component';
import {RouterModule, Routes} from '@angular/router';
import {FuelStationListComponent} from '../fuel-station/fuel-station-list/fuel-station-list.component';
import {FuelStationDetailComponent} from '../fuel-station/fuel-station-detail/fuel-station-detail.component';
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
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseConfirmDialogModule, FuseHighlightModule, FuseWidgetModule} from '@fuse/components';

const routes: Routes = [
    {
        path: 'expense-category-list',
        component: ExpenseCategoryListComponent
    },
    {
        path: 'expense-category-detail/:guid',
        component: ExpenseCategoryDetailComponent
    }
];

@NgModule({
    declarations: [ExpenseCategoryListComponent, ExpenseCategoryDetailComponent, ExpenseCategoryEditDialogComponent],
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
    ]
})
export class ExpenseCategoryModule {
}
