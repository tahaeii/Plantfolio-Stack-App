import { NgModule } from '@angular/core';
import { HomeRoutes } from './home.routing';
import { HomeComponent } from 'src/app/views/home/pages/home/home.component';
import { LayoutModule } from 'src/app/shared/layout/layout.module';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { SharedComponentsModule } from 'src/app/shared/module/shared.components.module';
import { HeroAreaComponent } from './components/hero-area/hero-area.component';
import { AboutAreaComponent } from './components/about-area/about-area.component';
import { CategoryAreaComponent } from './components/category-area/category-area.component';
import { ProductsAreaComponent } from './components/products-area/products-area.component';
import { BlogAreaComponent } from './components/blog-area/blog-area.component';
import { NewsletterAreaComponent } from './components/newsletter-area/newsletter-area.component';
import { ProductsAllComponent } from './pages/products-all/products-all.component';

@NgModule({
  imports: [
    HomeRoutes,
    LayoutModule,
    SharedModule,
    SharedComponentsModule
  ],
  declarations: [
    // Declare and export components here
    HomeComponent,
    HeroAreaComponent,
    CategoryAreaComponent,
    AboutAreaComponent,
    ProductsAreaComponent,
    BlogAreaComponent,
    NewsletterAreaComponent,

    // Pages
    ProductsAllComponent,
  ],
  exports: [ // Export Home Components For Perview in CMS
    HomeComponent,
  ],
})

export class HomeModule { }