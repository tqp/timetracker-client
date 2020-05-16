import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AutoCompleteComponent} from './auto-complete.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FuseSharedModule} from '../../../../../@fuse/shared.module';
import {FuseHighlightModule, FuseWidgetModule} from '../../../../../@fuse/components';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';

const routes: Routes = [
    {
        path: 'auto-complete',
        component: AutoCompleteComponent
    }
];

@NgModule({
    declarations: [AutoCompleteComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        MatIconModule,
        MatTableModule,
        MatListModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatInputModule,

        FuseSharedModule,
        FuseHighlightModule,
        FuseWidgetModule
    ]
})
export class AutoCompleteModule {
}
