import { Injectable } from "@angular/core";
import { BaseHttpService } from "./base/BaseHttpService";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Step, StepSchema } from "../zod/Step.zod";
import { parseResponse } from "../helpers/zod.helper";
import { StepUpdateDto } from "../models/StepUpdateDto";
import { StepCreateDto } from "../models/StepCreateDto";

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
        return this.http.post<Step>(`${this.apiUrl}`, stepCreateDto).pipe(parseResponse(StepSchema));
    }

    update(stepUpdateDto: StepUpdateDto): Observable<Step> {
        return this.http.put<Step>(`${this.apiUrl}`, stepUpdateDto).pipe(parseResponse(StepSchema));
    }

    delete(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
    }

    getByWorkflow(id: number): Observable<Step[]> {
        return this.http.get<Step[]>(`${this.apiUrl}/getByWorkflow/${id}`);
    }
}