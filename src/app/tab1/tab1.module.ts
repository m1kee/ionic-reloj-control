import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { StorageService } from '../services/storage.service';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [Tab1Page],
  providers: [StorageService]
})
export class Tab1PageModule {}
