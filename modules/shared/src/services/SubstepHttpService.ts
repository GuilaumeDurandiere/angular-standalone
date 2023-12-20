import { Injectable } from "@angular/core";
import { BaseHttpService } from "./base/BaseHttpService";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Substep, SubstepSchema } from "../zod/Substep.zod";
import { parseResponse } from "../helpers/zod.helper";

interface SubstepCreateDto {
    libelle: string;
    description: string;
    etapeId: number;
};

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
        return this.http.post<Substep>(`${this.apiUrl}/create`, substepCreateDto).pipe(parseResponse(SubstepSchema));
    }
}