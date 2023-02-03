import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  private routeSub: Subscription | undefined;
  userId: string = '';
  user: User = new User();

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }
// route: ActivatedRoute: es muss das richtige Objekt (id) in der Browserzeile abgerufen werden

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => { // wir holen uns die url parameter und wollen diese dann in einer Variablen (userID) speichern
      this.userId = params['id'];
      console.log('ID is:', this.userId)
      this.getUser(); // Abrufen der Daten
    });
  }

  getUser() {
    this.firestore
      .collection('users') // Abrufen der Daten aus dem Firestore
      .doc(this.userId) // .doc es wird nur ein Element abgerufen: userID
      .valueChanges() // wenn sich etwas änder, ...
      .subscribe((user: any) => { // ... dann aktualisieren!
        this.user = new User(user); // verwandeln das Objekt in ein JSON vom dem Typ User um
        console.log('Retrieved user', this.user)
      })
  }


  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent); // Öffnen der Componenten, dialog = Variable
    dialog.componentInstance.user = new User(this.user.toJSON());  //this.user.toJSON() = holt den alten User und wandelt ihn von einem normalen Objekt in ein JSON um
    // new User(this.user.toJSON()); = Syntax für die Erstellung einer Kopie des Nutzers
    // Zugriff auf die neue Komponente über die Variable, Erstellung eines neuen Nutzer, um die Daten zu kopieren und nicht zu überschreiben
    dialog.componentInstance.userId = this.userId; // Übergabe der userID von oben
  }


  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent); // Öffnen der Componenten, dialog = Variable
    dialog.componentInstance.user = new User(this.user.toJSON()); //this.user.toJSON() = holt den alten User und wandelt ihn von einem normalen Objekt in ein JSON um
    // Zugriff auf die neue Komponente über die Variable, Erstellung eines neuen Nutzer, um die Daten zu kopieren und nicht zu überschreiben
    dialog.componentInstance.userId = this.userId; // Übergabe der userID von oben
  }
}