import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import { CcRole } from '../types';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ChainService {
  private apiURL = "http://bctb1.sensorlab.tno.nl:8081";
  private headers = new Headers({'Content-Type': 'application/json'});
  private opts = new RequestOptions({headers:this.headers, withCredentials: true });

  constructor(private http: Http) {}

  login(enrollId: string, enrollSecret: string): Promise<boolean> {
    let url = `${this.apiURL}/enroll`;

    let params = {
      "enrollId": enrollId,
      "enrollSecret": enrollSecret
    };

    return this.http.post(url, JSON.stringify(params), this.opts)
      .toPromise()
      .then((response:any) => {
        return response.text()
      })
      .catch(ChainService.handleError);
  }

  logout(): Promise<boolean> {
    let url = `${this.apiURL}/logout`;

    return this.http.post(url,{},this.opts)
      .toPromise()
      .then((response:any) => {
        return response.text()
      })
      .catch(ChainService.handleError);
  }

  get_enrollment(): Promise<string> {
    let url = `${this.apiURL}/enrollment`;

    return this.http.get(url,this.opts)
      .toPromise()
      .then(response => {
        return response.text()
      })
      .catch(ChainService.handleError);
  }

  deploy(): Promise<String> {
    let url = `${this.apiURL}/deploy`;

    return this.http.post(url, {}, this.opts)
      .toPromise()
      .then(response => response.text() as string)
      .catch(ChainService.handleError);

  }

  get_ccid(): Promise<string> {
    let url = `${this.apiURL}/ccid`;

    return this.http.get(url, this.opts)
      .toPromise()
      .then(response => response.text() as string)
      .catch(ChainService.handleError);
  }

  get_caller_role(): Promise<CcRole> {
    let url = `${this.apiURL}/role`;

    return this.http.get(url, this.opts)
      .toPromise()
      .then(response => response.json() as CcRole)
      .catch(ChainService.handleError)
  }

  get_roles(): Promise<string[]> {
    let url = `${this.apiURL}/roles`;

    return this.http.get(url, this.opts)
      .toPromise()
      .then(response => response.json() as string[])
      .catch(ChainService.handleError)
  }

  add_party(id:string,role:string): Promise<string> {
    let url = `${this.apiURL}/add_party`;

    let args:any = {id:id,role:role};

    return this.http.post(url,args,this.opts)
      .toPromise()
      .then(response => response.text() as string)
      .catch(ChainService.handleError)
  }

  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
