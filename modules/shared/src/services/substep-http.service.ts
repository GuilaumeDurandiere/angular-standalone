import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { parseResponse } from "../helpers/zod.helper";
import { SubstepCreateDto } from "../models/SubstepCreateDto";
import { Substep, SubstepSchema } from "../zod/Substep.zod";
import { BaseHttpService } from "./base/base-http.service";

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

    create(substepCreateDto: SubstepCreateDto): Observable<Substep> {
        return this.http.post<Substep>(`${this.apiUrl}`, substepCreateDto).pipe(parseResponse(SubstepSchema));
    }
}