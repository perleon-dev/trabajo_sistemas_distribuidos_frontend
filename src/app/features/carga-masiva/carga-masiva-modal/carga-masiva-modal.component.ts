import { Component, OnInit,Input } from '@angular/core';
import { UploadFile } from 'ng-zorro-antd/upload';
import { GenerarExcel } from '../../../shared/utility/functions';
import { Global } from '../../../shared/utility/global';
import { NzModalRef } from 'ng-zorro-antd';
import { Modal } from '../../../shared/utility/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ContractService } from '../../services/contractServices/contract.service';

@Component({
  selector: 'app-carga-masiva-modal',
  templateUrl: './carga-masiva-modal.component.html',
  styleUrls: ['./carga-masiva-modal.component.scss']
})

export class CargaMasivaModalComponent implements OnInit {
  
  @Input() ListOption: any;

  fileList: UploadFile[] = [];
  formGroup: FormGroup;
  user: any;
  userid:any;
  OptionId: string;
  
  isLoading:boolean = false;

  constructor(private ContractService: ContractService,
              private modalRef: NzModalRef,
              private global: Global,
              private modal: Modal,
              private message: NzMessageService) { }
  

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('identity'));
    this.userid = JSON.parse(localStorage.getItem('user'));
  }
  
  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  DownloadSellerCenter(){

    this.ContractService.getPreContractDownloadTemplateSellerCenter().subscribe((response:any) => {
      GenerarExcel(response)
    });
  }

  DownloadVTEX(){

    this.ContractService.getPreContractDownloadTemplateVtex().subscribe((response:any) => {
      GenerarExcel(response)
    });
  }
  
  DownloadVTexToVTex(){

    this.ContractService.getPreContractDownloadTemplateVtexToVtex().subscribe((response:any) => {
      GenerarExcel(response)
    });
  }

  onCancel(): void {
    this.modalRef.destroy();
  }

  onSave(): void {
   if(!this.OptionId){
    this.message.warning("Seleccionar un Tipo de Contrato");
    return;
   }
  
   if(this.fileList.length == 0){
    this.message.warning("Seleccionar un archivo");
    return;
   }
    
   const formData = new FormData();
   this.fileList.forEach((file: any) => {
     formData.append('document', file);
   });

   formData.append('contractType', this.OptionId);
   formData.append('userId', this.userid.user_id);
   formData.append( 'userFullname', this.user.user_lastname + ' ' + this.user.user_mother_lastname + ' '+ this.user.user_names);
   

    this.modal.confirm('¿Esta seguro de realizar la acción?', () => {
      this.isLoading = true;
        this.ContractService.postPreContractCreateMasive(formData).subscribe((data:any)=>{

          if(data.codeStatus == 200)
          {
            this.message.success(data.message);
            this.onCancel();
          }
          else
            this.message.error(data.message);

            this.isLoading = false;
        })
     
    });

  }

}
