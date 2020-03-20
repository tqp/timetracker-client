import { NgModule } from '@angular/core';
import { LoginModule } from './login/login.module';
import { TokenExchangeModule } from './token-exchange/token-exchange.module';

@NgModule({
    declarations: [],
    imports: [
        LoginModule,
        TokenExchangeModule
    ]
})
export class OpenPagesModule {
}
