import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { parseResponse } from "../helpers/zod.helper";
import { SubthemeCreateDto, SubthemeUpdateDto } from "../models/SubthemeDto";
import { Subtheme, subthemeSchema } from "../zod/subtheme.zod";
import { BaseHttpService } from "./base/base-http.service";

@Injectable({
  providedIn: 'root',
})
export class SubthemeHttpService extends BaseHttpService {

  constructor(
    private http: HttpClient,
  ) {
    super('soustheme');
  }


  get(id: number): Observable<Subtheme> {
    return this.http.get<Subtheme>(`${this.apiUrl}/${id}`);
  }

  getByTheme(themeId: number): Observable<Subtheme[]> {
    return this.http.get<Subtheme[]>(`${this.apiUrl}/getByTheme/${themeId}`);
  }

  create(stepCreateDto: SubthemeCreateDto): Observable<Subtheme> {
    return this.http.post<Subtheme>(`${this.apiUrl}`, stepCreateDto).pipe(parseResponse(subthemeSchema));
  }

  update(stepUpdateDto: SubthemeUpdateDto): Observable<Subtheme> {
    return this.http.put<Subtheme>(`${this.apiUrl}`, stepUpdateDto).pipe(parseResponse(subthemeSchema));
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}