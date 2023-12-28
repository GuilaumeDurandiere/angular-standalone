import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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

}