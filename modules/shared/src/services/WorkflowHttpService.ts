import { Injectable } from "@angular/core";
import { BaseHttpService } from "./base/BaseHttpService";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Workflow, WorkflowSchema } from "../zod/Workflow.zod";
import { parseResponse } from "../helpers/zod.helper";
import { StepCreateDto, StepUpdateDto } from "./StepHttpService";

export interface WorkflowCreateDto {
    libelle: string;
    etapes: StepCreateDto;
};

export interface WorkflowUpdateDto {
    id: number;
    libelle: string;
    actif: boolean;
    etapes: StepUpdateDto;
}

@Injectable({
    providedIn: 'root',
})
export class WorkflowHttpService extends BaseHttpService {
    constructor(
        private http: HttpClient,
    ) {
        super('workflow');
    }

    getAll(): Observable<Workflow[]> {
        return this.http.get<Workflow[]>(`${this.apiUrl}/getall`);
    }

    getOne(id: number): Observable<Workflow> {
        return this.http.get<Workflow>(`${this.apiUrl}/${id}`).pipe(parseResponse(WorkflowSchema));
    }
    
    create(workflowCreateDto: WorkflowCreateDto): Observable<Workflow> {
        return this.http.post<Workflow>(`${this.apiUrl}/create`, workflowCreateDto).pipe(parseResponse(WorkflowSchema));
    }

    update(workflowUpdateDto: WorkflowUpdateDto): Observable<Workflow> {
        return this.http.put<Workflow>(`${this.apiUrl}/update`, workflowUpdateDto).pipe(parseResponse(WorkflowSchema));
    }

    delete(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
    }
}