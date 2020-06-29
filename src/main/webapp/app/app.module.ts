import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { JHipster2020SharedModule } from 'app/shared/shared.module';
import { JHipster2020CoreModule } from 'app/core/core.module';
import { JHipster2020AppRoutingModule } from './app-routing.module';
import { JHipster2020HomeModule } from './home/home.module';
import { JHipster2020EntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    JHipster2020SharedModule,
    JHipster2020CoreModule,
    JHipster2020HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    JHipster2020EntityModule,
    JHipster2020AppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent],
})
export class JHipster2020AppModule {}
