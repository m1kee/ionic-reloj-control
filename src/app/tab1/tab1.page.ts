import { Component } from '@angular/core';
import { Entry } from '../domain/entry';
import { StorageService } from '../services/storage.service';
import { Dialog } from '@capacitor/dialog';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  today: Date = new Date();
  entry: Entry = {
    start: null,
    startLunch: null,
    endLunch: null, 
    end: null
  };
  entryComplete: boolean = false;
  
  constructor(private storageService: StorageService) {

  }

  async ionViewDidEnter () {
    console.log('ionViewDidEnter');
    // get saved times for actual date and preload into the variables
    let entry = await this.storageService.get<Entry>(this.getKey(null))
    console.log('entry', entry);
    if (entry) {
      this.entry = entry;
      this.checkIfEntryIsCompleted();
    }
  }

  async onTick() {
    const { value } = await Dialog.confirm({
      title: 'Atención',
      message: 'Estás segura que deseas marcar?'
    });

    if (value) {
      if (!this.entry.start) {
        this.entry.start = new Date();
      } else if (!this.entry.startLunch) {
        this.entry.startLunch = new Date();
      } else if (!this.entry.endLunch) {
        this.entry.endLunch = new Date();
      } else if (!this.entry.end) {
        this.entry.end = new Date();
      }
  
      this.updateEntryInLocalStorage();
      this.checkIfEntryIsCompleted();
    }
  }

  checkIfEntryIsCompleted() {
    if (this.entry.end !== null) {
      this.entryComplete = true;
    }
  }
  
  updateEntryInLocalStorage() {
    this.storageService.set(this.getKey(null), this.entry);
  }

  getKey(date: Date | null): string {
    if (date == null) 
      date = this.today;

    let key = `${date!.getFullYear()}${date!.getMonth() + 1}${date!.getDate()}`;
    console.log('key: ', key);
    return key;
  }

}
