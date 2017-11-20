import { DataProvider } from './../data/data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserProvider extends DataProvider{

  constructor(http: HttpClient) {
    super('http://jsonplaceholder.typicode.com/users',http);
 
 }

}
