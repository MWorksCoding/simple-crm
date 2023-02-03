import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
  user: User = new User();
  userId!: string; // neue Variable um auf die ID zuzugreifen und diese der Komponente unten zu übergeben
  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>, private firestore: AngularFirestore) {
    // firestore: AngularFirestore immer holen, wenn Daten geschoben werden sollen
  }

  saveUser() {
    this.loading = true; // Ladebalken anzeigen lassen
    this.firestore
      .collection('users')
      .doc(this.userId) // Variable von oben
      .update(this.user.toJSON()) // Update der Daten
      .then(() => { // wie subscribe
        this.loading = false;
        this.dialogRef.close();
      })
  }
}