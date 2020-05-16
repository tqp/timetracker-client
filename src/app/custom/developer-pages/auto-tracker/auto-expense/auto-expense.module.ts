import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AutoExpenseListComponent} from './auto-expense-list/auto-expense-list.component';
import {AutoExpenseDetailComponent} from './auto-expense-detail/auto-expense-detail.component';
import {AutoExpenseEditDialogComponent} from './auto-expense-edit-dialog/auto-expense-edit-dialog.component';
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
import {FuseSharedModule} from '../../../../../@fuse/shared.module';
import {FuseConfirmDialogModule, FuseSidebarModule, FuseWidgetModule} from '../../../../../@fuse/components';
import {MatSelectModule} from '@angular/material/select';

const routes: Routes = [
    {
        path: 'auto-expense-list',
        component: AutoExpenseListComponent
    },
    {
        path: 'auto-expense-detail/:guid',
        component: AutoExpenseDetailComponent
    }
];

@NgModule({
    declarations: [AutoExpenseListComponent, AutoExpenseDetailComponent, AutoExpenseEditDialogComponent],
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
        MatSelectModule,
        MatTableModule,
        MatToolbarModule,
        MatTooltipModule,
        MatAutocompleteModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
        FuseWidgetModule
    ],
    entryComponents: [
        AutoExpenseEditDialogComponent
    ]

})
export class AutoExpenseModule {
}
