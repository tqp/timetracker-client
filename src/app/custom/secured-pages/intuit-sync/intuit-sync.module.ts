import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntuitSyncComponent } from './intuit-sync.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { FuseSharedModule } from '../../../../@fuse/shared.module';

const routes: Routes = [
    {
        path: 'intuit-sync',
        component: IntuitSyncComponent
    }
];

@NgModule({
    declarations: [IntuitSyncComponent],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,

        FuseSharedModule
    ]
})
export class IntuitSyncModule {
}
