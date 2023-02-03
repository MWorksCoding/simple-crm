import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class'; // muss vorher importiert werden

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  user: User = new User(); //Anlegen einer neuen Variablen; Zugriff auf user.class.ts; es wird ein neues JSON erstellt mit den ganzen Feldern drin.
  birthDate: Date | undefined;

  loading: boolean = false; //Wenn es die Varibale loading true ist, dann wird es angezeigt, hier wird die Variable definiert

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private firestore: AngularFirestore) { // Firestore zum Speichern der Daten importieren (muss auch in app.module.ts)
  } // public = auch in html ; private = nur in der Komponente ; public dialogRef: MatDialogRef in den Constructor, um das Fenster weiter unten zu schließen

  ngOnInit(): void {
  }
  
  saveUser() { //Funktion aus HTML 
    this.user.birthDate = this.birthDate?.getTime();
    this.loading = true; // sobald geladen wird, soll der Balken angezeigt werden
    console.log('Current user is:', this.user); // Abrufen der eingegebenen Daten in der Konsole
    this.firestore // Zugriff auf Collection / Sammlung  (Datenbank)
      .collection('users') // Sammlung (JSON) soll users heissen, diese muss auf console.firebase.google.com zunächst angelegt werden!
      .add(this.user.toJSON()) // Zugriff auf module/user.class.ts -> wie soll das JSON aussehen?
      .then((result: any) => { // was soll passieren, wenn die Funktion fertig ist?
        console.log('User is added now', result);
        this.loading = false; // sobald fertig geladen wird, soll der Balken verschwinden
        this.dialogRef.close()
      });
  }
}
