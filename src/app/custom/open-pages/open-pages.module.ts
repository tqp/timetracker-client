import { NgModule } from '@angular/core';
import { LoginModule } from './login/login.module';
import { TokenExchangeModule } from './token-exchange/token-exchange.module';
import { LogoutModule } from './logout/logout.module';

@NgModule({
    declarations: [],
    imports: [
        LoginModule,
        LogoutModule,
        TokenExchangeModule,
    ]
})
export class OpenPagesModule {
}
