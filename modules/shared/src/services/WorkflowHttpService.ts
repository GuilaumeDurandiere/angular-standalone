import { Injectable } from "@angular/core";
import { BaseHttpService } from "./base/BaseHttpService";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { Workflow, WorkflowSchema } from "../zod/Workflow.zod";
import { parseResponse } from "../helpers/zod.helper";
import { WorkflowCreateDto } from "../models/WorkflowCreateDto";
import { WorkflowUpdateDto } from "../models/WorkflowUpdateDto";
import { PaginationWorkflowDto } from "../models/PaginatedWorkflowDto";

@Injectable({
    providedIn: 'root',
})
export class WorkflowHttpService extends BaseHttpService {
    constructor(
        private http: HttpClient,
    ) {
        super('workflow');
    }

    getAll(size: number, page: number): Observable<Workflow[]> {
        return this.http.get<PaginationWorkflowDto>(`${this.apiUrl}?size=${size}&page=${page}`).pipe(map(data => data.results));
    }

    getOne(id: number): Observable<Workflow> {
        return this.http.get<Workflow>(`${this.apiUrl}/${id}`).pipe(parseResponse(WorkflowSchema));
    }
    
    create(workflowCreateDto: WorkflowCreateDto): Observable<Workflow> {
        return this.http.post<Workflow>(`${this.apiUrl}`, workflowCreateDto).pipe(parseResponse(WorkflowSchema));
    }

    update(workflowUpdateDto: WorkflowUpdateDto): Observable<Workflow> {
        return this.http.put<Workflow>(`${this.apiUrl}/update`, workflowUpdateDto).pipe(parseResponse(WorkflowSchema));
    }

    delete(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
    }
}