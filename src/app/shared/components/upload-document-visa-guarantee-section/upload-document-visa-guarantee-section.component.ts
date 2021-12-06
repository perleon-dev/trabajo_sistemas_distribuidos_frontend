import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService, UploadXHRArgs, NzModalService } from 'ng-zorro-antd';
import { forkJoin } from 'rxjs';
import { AdvanceService } from 'src/app/features/services/advanceServices/advance.service';
import { ContractService } from 'src/app/features/services/contractServices/contract.service';
import { StorageService } from 'src/app/features/services/storageServices/storage.service';
import { constants } from '../../utility/constants';
import { Modal } from '../../utility/modal';

@Component({
  selector: 'app-upload-document-visa-guarantee-section',
  templateUrl: './upload-document-visa-guarantee-section.component.html',
  styleUrls: ['./upload-document-visa-guarantee-section.component.scss']
})
export class UploadDocumentVisaGuaranteeSectionComponent {

  @Input() contractTemplate: Array<any> = [];
  @Input() profileId?: number;
  @Input() userId?: number;
  @Input() userCode: string;
  @Input() userFullname: string;
  @Input() profileName: string;

  frmCargarDocumentoVisadoGarantia: FormGroup;

  loadingSping: boolean = false;
  loadintTableUploadDocument: boolean = false;
  loadingApproved: boolean = false;
  loadingObserver: boolean = false;
  loadingRejected: boolean = false;

  contractTemplateId?: number;
  documentType: string;
  documentAllowedExtensions: string;

  documentTypeParameterDetails: Array<any> = [];
  contractUploadDocumentGuaranteeList: Array<any> = [];
  contractGuaranteeDocuments: Array<any> = [];
  observationMotiveList: Array<any> = [];
  documentTypeParameterVisaGuarranteList: Array<any> = [];
  contractTemplateGuarranteDocumentList: Array<any> = [];
  showControl: boolean = true;
  titleChange: string = 'Subir Archivos';

  loadingTemplateLeaseRequest: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private advanceService: AdvanceService,
    private contractService: ContractService,
    private modal: Modal,
    private storageService: StorageService,
    private message: NzMessageService,
    private nzModalService: NzModalService
  ) { }

  ngOnChanges(): void {
    this.initForm();
    if(this.contractTemplate[0] === undefined) return;
    this.setProperty();
    this.initList();
  }

  initForm(){
    this.frmCargarDocumentoVisadoGarantia = this.formBuilder.group({
      rbtexemptattached: [{value: '1', disabled: true}],
      ddlobservationmotive: [null],
      note: [null]
    });
  }

  setProperty(){
    this.contractTemplateId = this.contractTemplate[0].contPlantIcod;
  }

  initList(){
    forkJoin([
      this.advanceService.getParameterDetail(constants.PARAMETER.VISA_GUARANTEE_TYPE),
      this.contractService.getContractsTemplateGuaranteeSearchIntegrator(this.contractTemplateId),
      this.advanceService.getParameterDetail(constants.PARAMETER.OBSERVATION_MOTIVE_VISA_GUARANTEE),
      this.advanceService.getParameterDetail(constants.PARAMETER.GUARANTEE_DOCUMENT_TYPE)
    ]).subscribe(result => {
      this.documentTypeParameterDetails = result[0];
      this.contractUploadDocumentGuaranteeList = result[1].contractUploadDocumentGuarantees;
      this.observationMotiveList = result[2];
      this.documentTypeParameterVisaGuarranteList = result[3];
    },
    (error: any) => {
      console.log(error);
    },
    () => {
      
      this.showControlbyProfile();
      this.setContractUploadDocumentGuarantees();      
    });
  }

  showControlbyProfile(){
    if(this.profileId === constants.PROFILES.CREDIT_COLLECTION_BOSS){
      this.showControl = false;
      this.titleChange = 'Comentarios';
    }
  }

  setContractUploadDocumentGuarantees() {
    this.contractGuaranteeDocuments = [];
    this.documentTypeParameterDetails.forEach(paramDetail => {

      var savedDocument;
      if(this.contractUploadDocumentGuaranteeList.length > 0) savedDocument = this.contractUploadDocumentGuaranteeList.find(x => x.uplo_c_tipo_doc == paramDetail.description);
      var guaranteeDocument: any = {
        parameterDetailId: paramDetail.parameterDetailId,
        documentType: paramDetail.description,
        upload: false,
        allowedExtensions: paramDetail.field2,
        obligatory: (paramDetail.field1 === "1")
      };
      if (savedDocument) {
        guaranteeDocument.documentName = savedDocument.uplo_c_nom_archivo;
        guaranteeDocument.upload = true;
        guaranteeDocument.documentId = savedDocument.uplo_c_yid;
        guaranteeDocument.s3_id = savedDocument.uplo_c_s3_id;
        guaranteeDocument.buttonDelete = true;
      }
      this.contractGuaranteeDocuments.push(guaranteeDocument);
    });

    this.documentTypeParameterVisaGuarranteList.forEach(paramDetail => {
      var savedDocument = this.contractUploadDocumentGuaranteeList.find(x => x.uplo_c_tipo_doc == paramDetail.description);
      var guaranteeDocument: any = {
        parameterDetailId: paramDetail.parameterDetailId,
        documentType: paramDetail.description,
        upload: false,
        allowedExtensions: paramDetail.field2,
        obligatory: (paramDetail.field1 === "1")
      };
      if (savedDocument) {
        guaranteeDocument.documentName = savedDocument.uplo_c_nom_archivo;
        guaranteeDocument.upload = true;
        guaranteeDocument.documentId = savedDocument.uplo_c_yid;
        guaranteeDocument.s3_id = savedDocument.uplo_c_s3_id;
        guaranteeDocument.buttonDelete = false;
      }
      if(guaranteeDocument.upload)
        this.contractGuaranteeDocuments.push(guaranteeDocument);
    });

    if(!this.showControl){
      let listAuxiliar = this.contractGuaranteeDocuments.filter(x => x.upload == true);
      this.contractGuaranteeDocuments = [];
      this.contractGuaranteeDocuments = listAuxiliar;
    }
  }

  setSelectedDocumentType(documentType: any, allowedExtensions: any) {
    this.documentType = documentType;
    this.documentAllowedExtensions = allowedExtensions;
  }

  openDeleteDocument(documentId) {
    this.modal.confirm("¿Desea eliminar el archivo seleccionado?", () => {
      this.deleteDocument(documentId);
    });
  }

  deleteDocument(documentId: any) {
    this.loadintTableUploadDocument = true;

    this.contractService.getGuaranteeUploadDocumentById(documentId)
      .subscribe((document) => {
        document.uplo_c_doc_borrado = true;
        this.contractService.putGuaranteeUploadDocument(document)
          .subscribe(() => {
            this.loadDocuments();
            this.loadintTableUploadDocument = false;
          }, (error: any) => {
            this.message.error(constants.MESSAGE.ERROR);
            this.loadintTableUploadDocument = false;
          });
      }, (error: any) => {

      });
  }

  downloadDocument(s3_id: any) {
    let idModalMessage = this.message.loading('Descargando archivo', { nzDuration: 0 }).messageId;
    this.storageService.getFileStreamById(s3_id)
      .subscribe((response) => {
        window.open(response.urlFile);
        this.message.remove(idModalMessage);
      },
        (err) => {
          this.message.remove(idModalMessage);
          this.message.error(constants.MESSAGE.ERROR);
        });
  }

  loadDocuments() {
    this.contractService.getContractsTemplateGuaranteeSearchIntegrator(this.contractTemplateId)
      .subscribe(result => {
        this.contractUploadDocumentGuaranteeList = result.contractUploadDocumentGuarantees;
        this.setContractUploadDocumentGuarantees();
      });
  }

  uploadDocument = (item: UploadXHRArgs) => {
    let formData = new FormData();

    if (!this.validateUploadDocument(item.file.size, item.file.name)) return;

    let user = JSON.parse(localStorage.getItem('user'));

    this.loadintTableUploadDocument = true;
    formData.append('cont_c_plant_icod', this.contractTemplateId.toString());
    formData.append('perf_c_yid', user.profile_id.toString());
    formData.append('uplo_c_doc_ruta', '');
    formData.append('uplo_c_nom_archivo', item.file.name);
    formData.append('usua_c_cdoc_id', user.user_red);
    formData.append('uplo_c_comentario', "");
    formData.append('uplo_c_doc_obligatorio', "false");
    formData.append('uplo_c_tipo_doc', this.documentType);
    formData.append('uplo_c_doc_borrado', 'false');
    formData.append('file', item.file as any);

    let idModalMessage = this.message.loading('Cargando el archivo', { nzDuration: 0 }).messageId;
    this.contractService.postGuaranteeUploadDocument(formData)
      .subscribe((response: any) => {
        this.loadDocuments();
        this.message.remove(idModalMessage);
        this.message.success('Archivo almacenado de manera correcta');
        this.loadintTableUploadDocument = false;
      }, (error: any) => {
        this.message.remove(idModalMessage);
        this.modal.error(constants.MESSAGE.SUCCESS_SAVE);
        this.loadintTableUploadDocument = false;
      });
  }

  validateUploadDocument(sizeFile: number, fileName: string): boolean {

    let maxSizeFile = 4194304;

    if (sizeFile > maxSizeFile) {
      this.modal.warning("Tamaño de archivo no soportado");
      return false;
    }

    if (this.documentAllowedExtensions) {
      let documentAllowedExtensionArray = this.documentAllowedExtensions.split(',')
      let index = fileName.toString().lastIndexOf('.');
      let extension = fileName.substring(index + 1, fileName.length);

      if (!documentAllowedExtensionArray.includes(extension.toUpperCase())) {
        this.modal.warning("El archivo debe tener unos de las siguientes extensiones permitidas [" + this.documentAllowedExtensions + "]");
        return false;
      }
    }

    return true;
  }

  validateFieldApproved(): boolean{
    let validate: boolean = true;
 
    let obligatoryCount = this.contractGuaranteeDocuments.filter(x => x.obligatory == true).length;
    let uploadCount = this.contractGuaranteeDocuments.filter(x => x.upload == true && x.obligatory == true).length;
    if(obligatoryCount !== uploadCount){
      this.modal.warning('Debe de registrar todos los documentos obligatorios.');
      return false;
    }

    if(this.frmCargarDocumentoVisadoGarantia.value.note === null){
      this.modal.warning('Debe ingresar una nota.');
      return false;
    }

    return validate;
  }

  validateFieldObserver(): boolean{
    let validate: boolean = true;

    if(this.frmCargarDocumentoVisadoGarantia.value.note === null){
      this.modal.warning('Debe ingresar una nota.');
      return false;
    }

    if(this.frmCargarDocumentoVisadoGarantia.value.ddlobservationmotive === null){
      this.modal.warning('debe seleccionar el motivo por el cual se está observando la garantía.');
      return false;
    }

    return validate;
  }

  validateFieldRejected(): boolean{
    let validate: boolean = true;

    if(this.frmCargarDocumentoVisadoGarantia.value.note === null){
      this.modal.warning('Debe ingresar una nota.');
      return false;
    }

    return validate;
  }

  setCommand(state: string, profileId: number): any{
    let command = {
      perf_c_yid: this.profileId,
      cont_c_plant_icod: this.contractTemplateId,
      usua_c_cdoc_id: this.userCode,
      visad_c_comentario: this.frmCargarDocumentoVisadoGarantia.value.note,
      visad_c_estado: state,
      visad_c_fecha_registro: Date.now,
      visad_c_exento: false,
      tipo_objecion: this.frmCargarDocumentoVisadoGarantia.value.ddlobservationmotive,
      perf_c_vnomb: this.profileName,
      user_full_name: this.userFullname,
      perf_jefe_cred_cob: profileId,
      user_id: this.userId,
      cli_raz_soc: this.contractTemplate[0].businessName,
      cli_raz_soc_doc: this.contractTemplate[0].cliDocId
    };

    return command;
  }

  onApproved(){
    if(!this.validateFieldApproved()) return;
    this.modal.confirm(
      constants.MESSAGE.CONFIRM_QUESTION,
      () => {
        this.loadingApproved = true;
        this.contractService.postContractsVisaGuarantee(this.setCommand(constants.STATE_VISA_GUARANTEE.APPROVED, constants.PROFILES.CREDIT_COLLECTION_BOSS))
                            .subscribe((response: any) => {
                              this.loadingApproved = false;
                              this.modal.success(constants.MESSAGE.SUCCESS_SAVE);
                              if(this.profileId === constants.PROFILES.CREDIT_COLLECTION_BOSS ||
                                 this.profileId === constants.PROFILES.CREDIT){
                                window.location.href = constants.ROUTES.TRAY_CREDIT_EVALUATION;
                              }else{
                                window.location.href = constants.ROUTES.TRAY_CONTRACT_TEMPLATE;
                              }
                              
                            },
                            (error: any) => {
                              this.loadingApproved = false;
                              this.modal.error(constants.MESSAGE.ERROR);
                            });
      }
    );
  }

  onObserver(){
    if(!this.validateFieldObserver()) return;
    this.modal.confirm(
      constants.MESSAGE.CONFIRM_QUESTION,
      () => {
        this.loadingObserver = true;
        this.contractService.postContractsVisaGuarantee(this.setCommand(constants.STATE_VISA_GUARANTEE.OBSERVER, constants.PROFILES.EjecutivoComercial))
                            .subscribe(() => {
                              this.loadingObserver = false;
                              this.modal.success(constants.MESSAGE.SUCCESS_SAVE);
                              if(this.profileId === constants.PROFILES.CREDIT_COLLECTION_BOSS ||
                                this.profileId === constants.PROFILES.CREDIT){
                               window.location.href = constants.ROUTES.TRAY_CREDIT_EVALUATION;
                             }else{
                               window.location.href = constants.ROUTES.TRAY_CONTRACT_TEMPLATE;
                             }
                            },
                            (error: any) => {
                              this.loadingObserver = false;
                              this.modal.error(constants.MESSAGE.ERROR);
                            });
      }
    );
  }

  onRejected(){
    if(!this.validateFieldRejected()) return;
    this.modal.confirm(
      constants.MESSAGE.CONFIRM_QUESTION,
      () => {
        this.loadingRejected = true;
        this.contractService.postContractsVisaGuarantee(this.setCommand(constants.STATE_VISA_GUARANTEE.REJECTED, constants.PROFILES.EjecutivoComercial))
                            .subscribe(() => {
                              this.loadingRejected = false;
                              this.modal.success(constants.MESSAGE.SUCCESS_SAVE);
                              if(this.profileId === constants.PROFILES.CREDIT_COLLECTION_BOSS ||
                                this.profileId === constants.PROFILES.CREDIT){
                               window.location.href = constants.ROUTES.TRAY_CREDIT_EVALUATION;
                             }else{
                               window.location.href = constants.ROUTES.TRAY_CONTRACT_TEMPLATE;
                             }
                            },
                            (error: any) => {
                              this.loadingRejected = false;
                              this.modal.error(constants.MESSAGE.ERROR);
                            });
      }
    );
  }


  s2ab(s: string){
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);

    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i);

    return buf;
  }

  onTemplateLeaseRequest(){
    this.loadingTemplateLeaseRequest = true;
    this.contractService.getContractsTemplateDownloadCreditEvaluation(this.contractTemplateId)
      .subscribe((response) => {
        var blob = new Blob([this.s2ab(atob(response.file))], { type: 'application/octet-stream' });
        var a = document.createElement('a');
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = response.fileName;
        a.click();
        window.URL.revokeObjectURL(url);
        this.loadingTemplateLeaseRequest = false;
      },
      error => {
        this.loadingTemplateLeaseRequest = false;
        this.nzModalService.warning({
          nzTitle: '<i>Advance Real State</i>',
          nzContent: '<b>Ha ocurrido un error al descargar la plantilla.</b>'
        });
      });
  }


}
