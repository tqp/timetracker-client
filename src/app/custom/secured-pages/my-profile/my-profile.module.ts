import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyProfileComponent} from './my-profile.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {FuseSharedModule} from '@fuse/shared.module';
import {MyProfileService} from './my-profile.service';
import { TokenInfoComponent } from './token-info/token-info.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { DiagnosticInfoComponent } from './diagnostic-info/diagnostic-info.component';

const routes: Routes = [
    {
        path: 'my-profile',
        component: MyProfileComponent
    }
];

@NgModule({
    declarations: [
        MyProfileComponent,
        TokenInfoComponent,
        UserInfoComponent,
        DiagnosticInfoComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,

        FuseSharedModule
    ],
    providers: [
        MyProfileService
    ]
})
export class MyProfileModule {
}
