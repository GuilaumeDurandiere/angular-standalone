import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { parseResponse } from "../helpers/zod.helper";
import { StepCreateDto } from "../models/StepCreateDto";
import { StepUpdateDto } from "../models/StepUpdateDto";
import { Step, StepSchema } from "../zod/Step.zod";
import { BaseHttpService } from "./base/base-http.service";

@Injectable({
    providedIn: 'root',
})
export class StepHttpService extends BaseHttpService {
    constructor(
        private http: HttpClient,
    ) {
        super('etape');
    }

    getOne(id: number): Observable<Step> {
        return this.http.get<Step>(`${this.apiUrl}/${id}`).pipe(parseResponse(StepSchema));
    }

    create(stepCreateDto: StepCreateDto): Observable<Step> {
        return this.http.post<Step>(`${this.apiUrl}/create`, stepCreateDto).pipe(parseResponse(StepSchema));
    }

    update(stepUpdateDto: StepUpdateDto): Observable<Step> {
        return this.http.put<Step>(`${this.apiUrl}/update`, stepUpdateDto).pipe(parseResponse(StepSchema));
    }

    delete(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
    }

    getByWorkflow(id: number): Observable<Step[]> {
        return this.http.get<Step[]>(`${this.apiUrl}/getByWorkflow/${id}`);
    }
}