import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout.component';
import { RouterModule } from '@angular/router';

const routes = [
    {
        path: 'logout',
        component: LogoutComponent
    }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ]
})
export class LogoutModule {
}
