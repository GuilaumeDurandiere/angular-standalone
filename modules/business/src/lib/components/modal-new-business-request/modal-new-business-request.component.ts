import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-modal-new-business-request',
  standalone: true,
  imports: [CommonModule,FileUploadModule],
  templateUrl: './modal-new-business-request.component.html',
  styleUrl: './modal-new-business-request.component.less',
})
export class ModalNewBusinessRequestComponent {

}
