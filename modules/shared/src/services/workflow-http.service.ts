import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { parseResponse } from "../helpers/zod.helper";
import { PaginationDto } from "../models/PaginationDto";
import { WorkflowCreateDto } from "../models/WorkflowCreateDto";
import { WorkflowUpdateDto } from "../models/WorkflowUpdateDto";
import { Workflow, WorkflowSchema } from "../zod/Workflow.zod";
import { BaseHttpService } from "./base/base-http.service";

@Injectable({
    providedIn: 'root',
})
export class WorkflowHttpService extends BaseHttpService {
    constructor(
        private http: HttpClient,
    ) {
        super('workflow');
    }

    getAll(page: number, size: number): Observable<PaginationDto<Workflow>> {
        const requestUrl = this.buildPaginatedRequest(page, size, 'paginated/')
        return this.http.get<PaginationDto<Workflow>>(requestUrl);
    }

    getOne(id: number): Observable<Workflow> {
        return this.http.get<Workflow>(`${this.apiUrl}/${id}`).pipe(parseResponse(WorkflowSchema));
    }

    getActive(): Observable<{ libelle: string, id: number }[]> {
        return this.http.get<{ libelle: string, id: number }[]>(`${this.apiUrl}/getActive`);
    }

    create(workflowCreateDto: WorkflowCreateDto): Observable<Workflow> {
        return this.http.post<Workflow>(`${this.apiUrl}`, workflowCreateDto).pipe(parseResponse(WorkflowSchema));
    }

    update(workflowUpdateDto: WorkflowUpdateDto): Observable<Workflow> {
        return this.http.put<Workflow>(`${this.apiUrl}`, workflowUpdateDto).pipe(parseResponse(WorkflowSchema));
    }

    delete(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
    }
}