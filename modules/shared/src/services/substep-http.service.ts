import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { parseResponse } from "../helpers/zod.helper";
import { SubstepCreateDto } from "../models/SubstepCreateDto";
import { Substep, SubstepSchema } from "../zod/Substep.zod";
import { BaseHttpService } from "./base/base-http.service";
import { SubstepUpdateDto } from "../models/SubstepUpdateDto";

@Injectable({
    providedIn: 'root',
})
export class SubstepHttpService extends BaseHttpService {
    constructor(
        private http: HttpClient,
    ) {
        super('sousetape');
    }

    getOne(id: number): Observable<Substep> {
        return this.http.get<Substep>(`${this.apiUrl}/${id}`).pipe(parseResponse(SubstepSchema));
    }

    create(stepCreateDto: SubstepCreateDto): Observable<Substep> {
        return this.http.post<Substep>(`${this.apiUrl}`, stepCreateDto).pipe(parseResponse(SubstepSchema));
    }

    update(stepUpdateDto: SubstepUpdateDto): Observable<Substep> {
        return this.http.put<Substep>(`${this.apiUrl}`, stepUpdateDto).pipe(parseResponse(SubstepSchema));
    }

    delete(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
    }
}