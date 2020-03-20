import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TokenExchangeComponent} from './token-exchange.component';

const routes = [
    {
        path: 'token-exchange',
        component: TokenExchangeComponent
    }
];

@NgModule({
    declarations: [
        TokenExchangeComponent
    ],
    imports: [
        RouterModule.forChild(routes),
    ]
})
export class TokenExchangeModule {
}
