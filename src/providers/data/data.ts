import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataProvider {

  constructor(private url: string, private http: HttpClient) {}
  
  
    getAll() {
      return this.http.get(this.url)
        .catch(this.handleError);
    }
  
    create(resource) {
      return this.http.post(this.url, JSON.stringify(resource))
        .catch(this.handleError);
    }
  
/*     update(resource) {
      return this.http.patch(this.url + '/' + resource.id, JSON.stringify({ name: resource.name }))
        .catch(this.handleError);
    } */
  
    update(resource) {
      return this.http.put(this.url + '/' + resource.id, JSON.stringify(resource))
        .catch(this.handleError);
    }
  
    delete(id) {
      return this.http.delete(this.url + '/' + id)
        .catch(this.handleError);
    }
  
    private handleError(error: Response) {
      return Observable.throw(error);
    }

}
