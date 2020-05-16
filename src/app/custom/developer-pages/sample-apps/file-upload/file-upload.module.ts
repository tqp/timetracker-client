import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadComponent } from './file-upload.component';
import { MatIconModule } from '@angular/material/icon';
import { FuseSharedModule } from '../../../../../@fuse/shared.module';
import { FuseHighlightModule, FuseWidgetModule } from '../../../../../@fuse/components';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';

const routes: Routes = [
    {
        path: 'file-upload',
        component: FileUploadComponent
    }
];

@NgModule({
    declarations: [FileUploadComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        MatIconModule,
        MatTableModule,
        MatListModule,
        MatFormFieldModule,

        FuseSharedModule,
        FuseHighlightModule,
        FuseWidgetModule
    ]
})
export class FileUploadModule {
}
