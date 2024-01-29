import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { parseResponse } from "../helpers/zod.helper";
import { PaginationDto } from "../models/PaginationDto";
import { ThemeCreateDto } from "../models/ThemeCreateDto";
import { ThemeUpdateDto } from "../models/ThemeUpdateDto";
import { Theme, ThemeSchema } from "../zod/Theme.zod";
import { BaseHttpService } from "./base/base-http.service";

@Injectable({
  providedIn: 'root',
})
export class ThemeHttpService extends BaseHttpService {

  constructor(
    private http: HttpClient,
  ) {
    super('theme');
  }

  getPaginated(page: number, size: number, sortField: string, sortOrder: string): Observable<PaginationDto<Theme>> {
    const requestUrl = this.buildPaginatedRequest(page, size, 'paginated', sortField, sortOrder)
    return this.http.get<PaginationDto<Theme>>(requestUrl);
  }

  getAll(): Observable<Theme[]> {
    return this.http.get<Theme[]>(`${this.apiUrl}`);
  }

  get(id: number): Observable<Theme> {
    return this.http.get<Theme>(`${this.apiUrl}/${id}`);
  }

  create(stepCreateDto: ThemeCreateDto): Observable<Theme> {
    return this.http.post<Theme>(`${this.apiUrl}`, stepCreateDto).pipe(parseResponse(ThemeSchema));
  }

  update(stepUpdateDto: ThemeUpdateDto): Observable<Theme> {
    return this.http.put<Theme>(`${this.apiUrl}`, stepUpdateDto).pipe(parseResponse(ThemeSchema));
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}