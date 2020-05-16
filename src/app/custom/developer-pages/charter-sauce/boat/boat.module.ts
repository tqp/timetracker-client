import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BoatListComponent} from './boat-list/boat-list.component';
import {BoatDetailComponent} from './boat-detail/boat-detail.component';
import {BoatEditDialogComponent} from './boat-edit-dialog/boat-edit-dialog.component';
import {RouterModule, Routes} from '@angular/router';
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

const routes: Routes = [
    {
        path: 'boat-list',
        component: BoatListComponent
    },
    {
        path: 'boat-detail/:guid',
        component: BoatDetailComponent
    }
];

@NgModule({
    declarations: [BoatListComponent, BoatDetailComponent, BoatEditDialogComponent],
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
    entryComponents: [
        BoatEditDialogComponent
    ]
})
export class BoatModule {
}
