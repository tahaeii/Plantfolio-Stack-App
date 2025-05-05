// Import Angular-Material
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';


@NgModule({
   imports: [
      MatSelectModule, MatInputModule, MatButtonModule, MatSidenavModule, MatIconModule, MatToolbarModule, MatListModule, CdkAccordionModule, MatPaginatorModule, MatTableModule, MatCardModule, MatTabsModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatStepperModule, MatProgressBarModule, MatExpansionModule, MatChipsModule
   ],

   exports: [
      MatSelectModule, MatInputModule, MatButtonModule, MatSidenavModule, MatIconModule, MatToolbarModule, MatListModule, CdkAccordionModule, MatPaginatorModule, MatTableModule, MatCardModule, MatTabsModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatStepperModule, MatProgressBarModule, MatExpansionModule, MatChipsModule
   ]
})

export class MaterialModule { // AngularMaterialModule

}