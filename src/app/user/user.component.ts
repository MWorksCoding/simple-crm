import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/models/user.class'; //muss vorher importiert werden!!
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User = new User();
  allUsers = []; // leeres Array, das immer mit den Änderungen von unten versehen wird
  //Anlegen einer neuen Variablen; Zugriff auf user.class.ts; es wird ein neues JSON erstellt mit den ganzen Feldern drin.

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) { // Zugriff auf Firestore, Abonnieren in dieser Komponente

  }
  ngOnInit(): void {
    this.firestore
      .collection('users') //welche Collection / Datenbank soll abonniert werden?; hier werden auch die IDs der Users abgespeichert
      .valueChanges({ idField: 'customIdName' }) // wenn sich etwas ändert, dann ... (die ID der users wird ebenfalls angezeigt)
      .subscribe((changes: any) => { // ... abonnieren wird etwas
        this.allUsers = changes; // immer wenn eine Änderung eintritt werden die oberen beiden Zeilen aufgerufen
      })
  }
  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
