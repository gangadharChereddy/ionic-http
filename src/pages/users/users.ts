import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage,AlertController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  users: any[];
  constructor(private service: UserProvider,private alertCtrl:AlertController) {
  }

  ionViewWillEnter(){
    this.service.getAll()
    .subscribe(users => this.users = users);
  }

  createUser(input: HTMLInputElement) {
    let user = { name: input.value };
    input.value = '';

    this.service.create(user)
      .subscribe(
        newUser => {
          user['id'] = newUser.id;
            this.users.splice(0, 0, user);
          },
          (error) => {
            throw error;
          });
  }

  updateUser(user) {
    this.alertCtrl.create({
      title:'Update User',
      message :'Enter the updated user name',
      inputs: [
        {
          name: 'name',
          placeholder: 'User Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Update',
          handler: data => {
            console.log(data);
            user['name']=data.name;
            console.log(user);
            this.service.update(user)
            .subscribe(
              updatedUser => {
                console.log(updatedUser);
              },
                (error ) => {
                 alert("Error Message :"+error.message);
                 throw error;
                });
          }
        }
      ]

    }).present();
   
  }

  deleteUser(user) {
    this.service.delete(user.id)
      .subscribe(
        () => {
          let index = this.users.indexOf(user);
          this.users.splice(index, 1);
        },
        (error ) => {
         alert("Error Message :"+error.message);
         throw error;
        });
  }

}
