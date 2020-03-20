import {NgModule} from '@angular/core';
import {SampleComponent} from './sample.component';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {FuseSharedModule} from '../../../../@fuse/shared.module';
import {FuseHighlightModule, FuseWidgetModule} from '../../../../@fuse/components';

const routes: Routes = [
    {
        path: 'sample-page',
        component: SampleComponent
    }
];

@NgModule({
    declarations: [
        SampleComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,

        MatIconModule,

        FuseSharedModule,
        FuseHighlightModule,
        FuseWidgetModule
    ]
})
export class SampleModule {
}
