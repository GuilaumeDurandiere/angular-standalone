import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RequestFormDto } from "../models/RequestFormDto";
import { BaseHttpService } from "./base/base-http.service";

@Injectable({
    providedIn: 'root',
})
export class MailHttpService extends BaseHttpService {
    constructor(
        private http: HttpClient,
    ) {
        super('formulaireSimplifie');
    }

    formulaireSimplifie(data: RequestFormDto): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}`, data);
    }

}