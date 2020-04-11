import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FuelDashboardComponent} from './fuel-dashboard.component';

const routes: Routes = [
    {
        path: 'fuel-dashboard',
        component: FuelDashboardComponent
    }
];

@NgModule({
    declarations: [FuelDashboardComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class FuelDashboardModule {
}
