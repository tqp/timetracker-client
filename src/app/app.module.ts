import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {TranslateModule} from '@ngx-translate/core';
import 'hammerjs';

import {FuseModule} from '@fuse/fuse.module';
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule} from '@fuse/components';

import {fuseConfig} from 'app/fuse-config';

import {FakeDbService} from 'app/fake-db/fake-db.service';
import {AppComponent} from 'app/app.component';
import {AppStoreModule} from 'app/store/store.module';
import {LayoutModule} from 'app/layout/layout.module';
import {SecuredPageResolverService} from './custom/services/secured-page-resolver.service';
import {HighchartsChartModule} from 'highcharts-angular';

const appRoutes: Routes = [
    // Custom App Routes
    {
        path: 'open-pages',
        loadChildren: () => import('./custom/open-pages/open-pages.module').then(m => m.OpenPagesModule)
    },
    {
        path: 'secured-pages',
        loadChildren: () => import('./custom/secured-pages/secured-pages.module').then(m => m.SecuredPagesModule),
        resolve: {
            securedPageResolver: SecuredPageResolverService
        }
    },
    {
        path: 'developer-pages',
        loadChildren: () => import('./custom/developer-pages/developer-pages.module').then(m => m.DeveloperPagesModule),
        resolve: {
            securedPageResolver: SecuredPageResolverService
        }
    },

    // Default Fuse Routes
    {
        path: 'apps',
        loadChildren: () => import('./main/apps/apps.module').then(m => m.AppsModule)
    },
    {
        path: 'pages',
        loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
    },
    {
        path: 'ui',
        loadChildren: () => import('./main/ui/ui.module').then(m => m.UIModule)
    },
    {
        path: 'documentation',
        loadChildren: () => import('./main/documentation/documentation.module').then(m => m.DocumentationModule)
    },
    // {
    //     path: '**',
    //     redirectTo: 'apps/dashboards/analytics'
    // },

    // Default App Route
    {
        path: '**',
        redirectTo: 'secured-pages/my-dashboard'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        HighchartsChartModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        AppStoreModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
