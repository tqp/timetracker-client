import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntuitTokensComponent } from './intuit-tokens.component';
import { MatIconModule } from '@angular/material/icon';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { ProductionTokenTabComponent } from './production-token-tab/production-token-tab.component';
import { SandboxTokenTabComponent } from './sandbox-token-tab/sandbox-token-tab.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';

const routes: Routes = [
    {
        path: 'intuit-tokens',
        component: IntuitTokensComponent
    }
];

@NgModule({
    declarations: [
        IntuitTokensComponent,
        ProductionTokenTabComponent,
        SandboxTokenTabComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,

        FuseSharedModule
    ]
})
export class IntuitTokensModule {
}
