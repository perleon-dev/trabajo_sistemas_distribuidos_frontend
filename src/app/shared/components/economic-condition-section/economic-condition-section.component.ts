import { Component, Input, IterableDiffers, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { chargeTypeAmountMock } from 'src/app/core/mocks/charge-type-amount.mock';
import { MonthMock } from 'src/app/core/mocks/month.mock';
import { AdvanceService } from 'src/app/features/services/advanceServices/advance.service';
import { ContractService } from 'src/app/features/services/contractServices/contract.service';
import { DateFormatPipe } from 'src/app/shared/pipes/date-format.pipe';
import { constants } from 'src/app/shared/utility/constants';
import { thousandsSeparator } from 'src/app/shared/utility/functions';

@Component({
  selector: 'app-economic-condition-section',
  templateUrl: './economic-condition-section.component.html',
  styleUrls: ['./economic-condition-section.component.scss']
})
export class EconomicConditionSectionComponent {

  @Input() contractTemplate: Array<any> = [];
  
  contractTemplateId: any;
  frmCondicionEconomica: FormGroup;
  contractTemplateValidityFound: Array<any> = [];
  contractTemplateFixedRentIntegrator: any;
  contractTemplateFixedRentDetailFound: Array<any> = [];
  contractTemplateRentDoubleFound: Array<any> = [];
  contractTemplateVariableRentbySaleFound: Array<any> = [];
  contractTemplateVariableRentbyTypeSaleFound: Array<any> = [];
  contractTemplateVariableRentRangeSaleFound: Array<any> = [];
  contractTemplateVariableRentAccumulatedSaleFound: Array<any> = [];
  contractTemplateCommonExpenseFound: any;
  contractTemplateCommonExpenseDetailFound: Array<any> = [];
  contractTemplateVariableCommonExpenseFound: Array<any> = [];
  contractTemplatePromotionExpenseFound: any;
  contractTemplatePromotionExpenseDetailFound: Array<any> = [];
  contractTemplateVariablePromotionExpenseFound: Array<any> = [];
  economicConditionList: Array<any> = [];
  economicConditionContractList: Array<any> = [];
  currencyList: Array<any> = [];
  sellingTypeList: Array<any> = [];
  loadingTableEconomicCondition: boolean = false;
  loadingTableEconomicCondictionContract: boolean = false;
  chargeTypeAmount: Array<any> = chargeTypeAmountMock;
  month: Array<any> = MonthMock;

  contractValidityFound: Array<any> = [];
  contractFixedRentFound: any;
  contractVariableRentFound: any;
  contractCommonExpenseFound: any;
  contractPromotionExpenseFound: any;

  contractId: any;
  contractVersion: any;
  contractModification: any;
  pageLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private contractService: ContractService,
    private dateFormatPipe: DateFormatPipe,
    private advanceService: AdvanceService
  ) { }

  ngOnChanges(): void {
    this.initForm();
    if(this.contractTemplate[0] === undefined) return;
    this.setProperty();
    this.initList();
  }

  initForm(){
    this.frmCondicionEconomica = this.formBuilder.group({

    })
  }

  setProperty(){
    this.contractTemplateId = this.contractTemplate[0].contPlantIcod;
    this.contractId = this.contractTemplate[0].contCod;
    this.contractVersion = this.contractTemplate[0].contVer;
    this.contractModification = this.contractTemplate[0].contMod;
  }

  initList(){
    this.loadingTableEconomicCondition = true;
    this.loadingTableEconomicCondictionContract = true;
    this.pageLoading = true;
    forkJoin([
      this.contractService.getContractsTemplateValiditySearch({ContractTemplateId: this.contractTemplateId, state: constants.STATE.ACTIVE}),
      this.contractService.getContractsTemplateFixedRentSearchIntegrator(this.contractTemplateId),
      this.advanceService.getCurrencies(0),
      this.contractService.getContractsTemplateVariableRentSearchIntegrator(this.contractTemplateId),
      this.contractService.getContractsTemplateVariableRentSellingType({}),
      this.contractService.getContractsTemplateCommonExpenseSearchIntegrator(this.contractTemplateId),
      this.contractService.getContractsTemplatePromotionExpenseSearchIntegrator(this.contractTemplateId),
      this.contractService.getContractsValiditySearch({ContractId: this.contractId, ContractVersion: this.contractVersion, ContractModification: this.contractModification, state: constants.STATE.ACTIVE}),
      this.contractService.getContractsFixedRentSearchIntegrator({ContractId: this.contractId, ContractVersion: this.contractVersion, ContractModification: this.contractModification}),
      this.contractService.getContractsVariableRentSearchIntegrator({ContractId: this.contractId, ContractVersion: this.contractVersion, ContractModification: this.contractModification}),
      this.contractService.getContractsCommonExpenseSearchIntegrator({ContractId: this.contractId, ContractVersion: this.contractVersion, ContractModification: this.contractModification}),
      this.contractService.getContractsPromotionExpenseSearchIntegrator({ContractId: this.contractId, ContractVersion: this.contractVersion, ContractModification: this.contractModification})
    ]).subscribe(result => {
      this.contractTemplateValidityFound = result[0];
      this.contractTemplateFixedRentIntegrator = result[1];
      this.contractTemplateFixedRentDetailFound = result[1].contractTemplateFixedRent.details;
      this.contractTemplateRentDoubleFound = result[1].contractTemplateDoubleRents;
      this.currencyList = result[2];
      this.contractTemplateVariableRentAccumulatedSaleFound = result[3].contractTemplateVariableRentAccumulatedSales;
      this.contractTemplateVariableRentbyTypeSaleFound = result[3].contractTemplateVariableRentTypeSales;
      this.contractTemplateVariableRentbySaleFound = result[3].contractTemplateVariableRentSales,
      this.contractTemplateVariableRentRangeSaleFound = result[3].contractTemplateVariableRentRangeSales;
      this.sellingTypeList = result[4];
      this.contractTemplateCommonExpenseFound = result[5].contractTemplateCommonExpense;
      this.contractTemplateCommonExpenseDetailFound = result[5].contractTemplateCommonExpense.details;
      this.contractTemplateVariableCommonExpenseFound = result[5].contractTemplateVariableCommonExpenses;
      this.contractTemplatePromotionExpenseFound = result[6].contractTemplatePromotionExpense;
      this.contractTemplatePromotionExpenseDetailFound = result[6].contractTemplatePromotionExpense.details;
      this.contractTemplateVariablePromotionExpenseFound = result[6].contractTemplateVariablePromotionExpenses;
      this.contractValidityFound = result[7];
      this.contractFixedRentFound = result[8];
      this.contractVariableRentFound = result[9];
      this.contractCommonExpenseFound = result[10];
      this.contractPromotionExpenseFound = result[11];
    },
    (error: any) => {
      console.log(error);
      this.pageLoading = false;
    },
    () => {
      this.constructEconomicCondition();
      this.constructEconomicConditionContract();
      this.loadingTableEconomicCondition = false;
      this.loadingTableEconomicCondictionContract = false;
      this.pageLoading = false;
    });
  }

  constructEconomicConditionContract(){
    this.addContractValidity();
    this.addContractFixedRent();
    this.addContractRentDouble();
    this.addContractVariableRent();
    this.addContractCommonExpense();
    this.addContractPromotionExpense();
  }

  addContractValidity(){
    let array: any;
    let index: number = 1;

    array = {
      value: 'Vigencias:',
      from: 'Desde:',
      to: 'Hasta:'
    };
    this.economicConditionContractList.push(array);

    this.contractValidityFound.forEach(item => {
      array = {
        value: '',
        from: 'V' + index.toString() + ": " + this.dateFormatPipe.transform(item.startDate),
        to: this.dateFormatPipe.transform(item.endDate)
      };
      this.economicConditionContractList.push(array);
      index++;
    });
  }

  addContractFixedRent(){
    let array: any;

    array = {
      value: 'Renta Fija:',
      from: 'R.F. Monto',
      to: ''
    };
    this.economicConditionContractList.push(array);
    if(this.contractFixedRentFound !== null){
      let contractFixedRentDetail = this.contractFixedRentFound.fixedRent.contractFixedRentDetails;
      let currencyFound = this.currencyList.find(x => Number(x.currencyId) === Number(this.contractFixedRentFound.fixedRent.contractCurrencyId));
      contractFixedRentDetail.forEach(item => {
        if(parseFloat(item.amount) > 0){
          let value: string = (item.typeFlag) ? 'AREA TOTAL': 'M2';
          array = {
            value: '',
            from: currencyFound.currencySymbol + ' ' + thousandsSeparator(item.amount) + ' x ' + value,
            to: ''
          };
          this.economicConditionContractList.push(array);
        }      
      });
    }else{
      array = {
        value: '',
        from: 'NO APLICA',
        to: ''
      };
      this.economicConditionContractList.push(array);
    }
    
  }

  addContractRentDouble(){
    let array: any;
    let value: string = '';

    if(this.contractFixedRentFound !== null){
      let contractRentDouble = this.contractFixedRentFound.doubleRents;
      if(contractRentDouble.length > 0){

        let monthName: string = '';
        contractRentDouble.forEach(item => {
          monthName = this.month.find(x => Number(x.id) === Number(item.monthNumber)).description;
          value += monthName + ' ' + item.year + ' ,';
        });
        if(value.length > 0) value = value.substring(0, value.length - 1);
        array = {
          value: 'Renta Double:',
          from: value,
          to: ''
        };
        this.economicConditionContractList.push(array);

      }else{
        array = {
          value: 'Renta Double:',
          from: 'NO APLICA',
          to: ''
        };
        this.economicConditionContractList.push(array);
      }
    }else{
      array = {
        value: 'Renta Double:',
        from: 'NO APLICA',
        to: ''
      };
      this.economicConditionContractList.push(array);
    }    
  }

  addContractVariableRent(){
    let array: any;
    let index: number = 1;

    array = {
      value: 'Renta Variable:',
      from: '% R.V',
      to: ''
    };
    this.economicConditionContractList.push(array);

    let variableRent = this.contractVariableRentFound.variableRents;
    if(variableRent !== null){
      variableRent.forEach((item: any) => {
        if(parseFloat(item.percentage) > 0){
          array = {
            value: '',
            from: thousandsSeparator(item.percentage) + ' % de Ventas',
            to: ''
          };
        }else{
          array = {
            value: 'NO APLICA',
            from: '',
            to: ''
          };
        }
        this.economicConditionContractList.push(array);
      });
    }
  }

  addContractCommonExpense(){
    let array: any;
    let index: number = 0;
    let value: string = '';

    array = {
      value: 'Gasto Común:',
      from: '% R.V',
      to: '% G.C.V.'
    };

    if(this.contractCommonExpenseFound !== null){
      let contractCommonExpenseDetail = this.contractCommonExpenseFound.commonExpense.details;
      let currencyFound = this.currencyList.find(x => Number(x.currencyId) === Number(this.contractCommonExpenseFound.commonExpense.contractCurrencyId));
      contractCommonExpenseDetail.forEach((item: any) => {
        if(parseFloat(item.amount) > 0){
          if(parseInt(item.type) == 1) value = 'AREA TOTAL';
          else if (parseInt(item.type) == 2) value = '% RENTA FIJA';
          else value = 'x M2';
          array = {
            value: '',
            from: currencyFound.currencySymbol + ' ' + thousandsSeparator(item.amount) + ' ' + value,
            to: this.addContractVariableCommonExpense(index)
          }
        }else{
          array = {
            value: '',
            from: 'NO APLICA',
            to: this.addContractVariableCommonExpense(index)
          }
        }
        this.economicConditionContractList.push(array);
        index++;
      });
    }else{
      this.economicConditionContractList.push({
        value: '',
        from: 'NO APLICA',
        to: 'NO APLICA'
      });
    }    
  }

  addContractVariableCommonExpense(index: number): string{
    let value: string = 'NO APLICA';
    let type: string = '';
    let variableCommonExpense = this.contractCommonExpenseFound.variableCommonExpenses;
    if(variableCommonExpense.length > 0){
      if(parseFloat(variableCommonExpense[index].percentage) > 0){
        if(Number(variableCommonExpense[index].type) === 1) type = 'DE VENTAS NETAS';
        if(Number(variableCommonExpense[index].type) === 2) type = 'DE RENTA VARIABLE';
        if(Number(variableCommonExpense[index].type) === 3) type = 'DE RENTA TOTAL';
        value = thousandsSeparator(variableCommonExpense[index].percentage) + ' % ' + type;
      }
    }

    return value;
  }

  addContractPromotionExpense(){
    let array: any;
    let index: number = 1;
    let indexArray: number = 0;
    let value: string = '';

    array = {
      value: 'Gasto de Promoción:',
      from: 'Monto G.P.',
      to: '% G.P.V.'
    };
    this.economicConditionContractList.push(array);

    if(this.contractPromotionExpenseFound === null){
      array = {
        value: '',
        from: 'NO APLICA',
        to: 'NO APLICA'
      };
      this.economicConditionContractList.push(array);
      return;
    }

    let contractPromotionExpenseDetails = this.contractPromotionExpenseFound.promotionFund.details;
    let contractVariablePromotionExpense = this.contractPromotionExpenseFound.variablePromotionExpenses;
    if(contractPromotionExpenseDetails.length > 0){
      let value: string = '';
      contractPromotionExpenseDetails.forEach((item: any) => {
        if(parseInt(item.type) === 1){
          value = 'AREA TOTAL';
        }
        else if(parseInt(item.type) === 2){
          value = '% RENTA FIJA';
        }else
          value = 'M2';

        if(parseFloat(item.amount) > 0){
          array = {
            value: '',
            from: 'V' + index.toString() + ': ' + thousandsSeparator(item.amount) + ' x ' + value,
            to: this.addContractVariablePromotionExpense(indexArray)
          };
        }else{
          array = {
            value: '',
            from: 'NO APLICA',
            to: this.addContractVariablePromotionExpense(indexArray)
          };
        }

        this.economicConditionContractList.push(array);
        index++;
        indexArray++;
      });
    }
  }

  addContractVariablePromotionExpense(indexArray: number): string{
    let value: string = 'NO APLICA';
    let type: string = '';
    if(this.contractPromotionExpenseFound.variablePromotionExpenses.length > 0){
      if(parseFloat(this.contractPromotionExpenseFound.variablePromotionExpenses[indexArray].percentage) > 0){
        if(Number(this.contractPromotionExpenseFound.variablePromotionExpenses[indexArray].type) === 1) type = 'DE VENTAS NETAS';
        if(Number(this.contractPromotionExpenseFound.variablePromotionExpenses[indexArray].type) === 2) type = 'DE RENTA VARIABLE';
        if(Number(this.contractPromotionExpenseFound.variablePromotionExpenses[indexArray].type) === 3) type = 'DE RENTA TOTAL';
        value = 'V' + (indexArray + 1) + ': ' + thousandsSeparator(this.contractPromotionExpenseFound.variablePromotionExpenses[indexArray].percentage) + ' % ' + type;
      }
    }
    return value;
  }

  constructEconomicCondition(){
    //Add Validity
    this.addContractTemplateValidity();

    //Add RF
    this.addContractTemplateFixedRent();

    //RD
    this.addRentDouble();
  
    //RV
    this.addContractTemplateVariableRent();

    //GC
    this.addContractTemplateCommonExpense();

    //GP
    this.addContractTemplatePromotionExpense();
    
  }

  addContractTemplateValidity(): void{
    let array: any;
    let index: number = 1;

    array = {
      value: '14. Vigencias:',
      from: 'Desde:',
      to: 'Hasta:'
    };
    this.economicConditionList.push(array);
    this.contractTemplateValidityFound.forEach(item => {
      array = {
        value: '',
        from: 'V' + index.toString() + ': ' + this.dateFormatPipe.transform(item.startDate),
        to: this.dateFormatPipe.transform(item.endDate)
      };
      this.economicConditionList.push(array);
      index++;
    });
  }

  addContractTemplateFixedRent(): void{
    let array: any;
    let index: number = 1;

    array = {
      value: '15. Renta Fija:',
      from: 'R.F. Monto',
      to: ''
    };
    this.economicConditionList.push(array);
    let currencyFound: any;
    let value: String;

    currencyFound = this.currencyList.find(x => Number(x.currencyId) === Number(this.contractTemplateFixedRentIntegrator.contractTemplateFixedRent.contractCurrencyId));
    this.contractTemplateFixedRentDetailFound.forEach(element => {
      if(element.typeFlag) value = 'AREA TOTAL';
      else value = 'M2';
      if(Number(element.amount) > 0){
        array = {
          value: '',
          from: 'V' + index.toString() + ': ' + currencyFound.currencySymbol + ' ' + thousandsSeparator(element.amount) + ' x ' + value,
          to:''
        };
        this.economicConditionList.push(array);
        index++;
      }      
    });
  }

  addRentDouble(): void{
    let array: any;

    if(this.contractTemplateRentDoubleFound.length === 0){
      array = {
        value: '16. Renta Doble:',
        from: 'NO APLICA',
        to: ''
      };
      this.economicConditionList.push(array);
    }else{
      array = {
        value: '16. Renta Doble:',
        from: this.getDataRentDouble(),
        to: ''
      };
      this.economicConditionList.push(array);
    }
  }
  
  addContractTemplateVariableRent(): void{
    let array: any;
    let index: number = 1;

    array = {
      value: '17. Renta Variable:',
      from: '% R.V',
      to: ''
    };
    this.economicConditionList.push(array);
    let found: any;
    found = this.contractTemplateVariableRentbySaleFound.find(x => parseFloat(x.percentage) > 0);
    if(found){
      this.contractTemplateVariableRentbySaleFound.forEach(item => {
        if(parseFloat(item.percentage) > 0){
          array = {
            value: '',
            from: 'V' + index.toString() + ': ' + thousandsSeparator(item.percentage) + ' %  DE VENTAS NETAS'
          }
          index++;
        }else{
          array = {
            value: '',
            from: 'NO APLICA'
          }
        }     
        this.economicConditionList.push(array);
      });
    }

    let groupFound: any;
    let value: string = '';
    found = this.contractTemplateVariableRentbyTypeSaleFound.find(x => parseFloat(x.percentage) > 0);
    if(found){
      index = 1;
      this.contractTemplateVariableRentbyTypeSaleFound.forEach(item => {

        if(groupFound !== undefined){
          if(groupFound.find(x => Number(x.index) === Number(item.index))) return;
        }

        groupFound = this.contractTemplateVariableRentbyTypeSaleFound.filter(x => Number(x.index) === Number(item.index));

        if(groupFound.length > 1){
          groupFound.forEach(element => {
            value += this.sellingTypeList.find(x => Number(x.id) === Number(element.id)).description + ' ' + thousandsSeparator(element.percentage) + ' % |';
          });
          if(value.length > 0) value = value.substring(0, value.length - 1);

          array = {
            value: '',
            from: 'V' + index.toString() + ": " + value,
            to: ''
          };
          this.economicConditionList.push(array);
          index++;
        }else{
          value = this.sellingTypeList.find(x => Number(x.id) === Number(item.id)).description + ' ' + thousandsSeparator(item.percentage) + ' %';
          array = {
            value: '',
            from: 'V' + index.toString() + ": " + value,
            to: ''
          };
          this.economicConditionList.push(array);
          index++;
        }       
      });
    }
    
    index = 1;
    this.contractTemplateVariableRentRangeSaleFound.forEach(item => {
      value = '';
      this.contractTemplateVariableRentRangeSaleFound.forEach(element => {
        value += thousandsSeparator(element.startRange) + ' -- ' + thousandsSeparator(element.endRange) + ' -- ' + thousandsSeparator(element.percentage) + ' % /';
      });
      value = value.substring(0, value.length - 1);
      array = {
        value: '',
        from: 'V' + index.toString() + ': '+ value,
        to: ''
      };
      this.economicConditionList.push(array);
      index++;
    });

    index = 1;
    value = '';
    this.contractTemplateVariableRentAccumulatedSaleFound.forEach(item => {
      value = "";
      this.contractTemplateVariableRentAccumulatedSaleFound.forEach(element => {
        value += thousandsSeparator(element.top) + ' -- ' + thousandsSeparator(element.percentage) + ' % /';
      });
      value = value.substring(0, value.length - 1);
      array = {
        value: '',
        from: 'V' + index.toString() + ': ' + value,
        to: ''
      };
      this.economicConditionList.push(array);
      index++;
    });
    
  }

  addContractTemplateCommonExpense(): void{

    let currencyFound: any;
    let value: String;
    let index = 1;
    let array: any;
    let indexArray: number = 0;
    array = {
      value: '18. Gasto Común:',
      from: 'Monto G.C',
      to: '% G.C.V.'
    };
    this.economicConditionList.push(array);

    currencyFound = this.currencyList.find(x => Number(x.currencyId) === Number(this.contractTemplateCommonExpenseFound.currencyId));
    this.contractTemplateCommonExpenseDetailFound.forEach(item => {
      if(parseFloat(item.amount) > 0){
        if(parseInt(item.commonExpenseType) === 1) value = 'AREA TOTAL';
        else if (parseInt(item.commonExpenseType) == 2) value = '% RENTA FIJA';
        else value = 'M2';
        array = {
          value: '',
          from: 'V' + index.toString() + ': ' + thousandsSeparator(item.amount) + ' x ' + value,
          to: this.getDataContractTemplateVariableCommonExpense(indexArray)
        };
      }else{
        array = {
          value: '',
          from: 'NO APLICA',
          to: this.getDataContractTemplateVariableCommonExpense(indexArray)
        }
      }
      this.economicConditionList.push(array);
      index++;
      indexArray++;
    });
  }

  addContractTemplatePromotionExpense(): void{
    let currencyFound: any;
    let value: String;
    let index = 1;
    let array: any;
    let indexArray: number = 0;
    array = {
      value: '19. Gasto de promoción:',
      from: 'Monto G.P',
      to: '% G.P.V.'
    };
    this.economicConditionList.push(array);
    currencyFound = this.currencyList.find(x => Number(x.currencyId) === Number(this.contractTemplatePromotionExpenseFound.currencyId));
    this.contractTemplatePromotionExpenseDetailFound.forEach(item => {
      if(parseInt(item.promotionExpenseType) === 1) value = 'AREA TOTAL';
      else if(parseInt(item.promotionExpenseType) === 2) value = '% RENTA FIJA';
        else value = 'M2';
      if(parseFloat(item.amount) > 0){
        array = {
          value: '',
          from: 'V' + index.toString() + ': ' + thousandsSeparator(item.amount) + ' x ' + value,
          to: this.getDataContractTemplateVariablePromotionExpense(indexArray)
        };
      }else{
        array = {
          value: '',
          from: 'NO APLICA',
          to: this.getDataContractTemplateVariablePromotionExpense(indexArray)
        };
      }
      this.economicConditionList.push(array);
      index++;
      indexArray++;
    });

  }

  getDataRentDouble(): string{
    let value: string = '';
    let monthName: string = '';
    this.contractTemplateRentDoubleFound.forEach(item => {
      monthName = this.month.find(x => Number(x.id) === Number(item.monthNumber)).description;
      value += monthName + ' ' + item.year + ' ,';
    });
    if(value.length > 0) value = value.substring(0, value.length - 1);
    return value;
  }

  getDataContractTemplateVariableCommonExpense(indexArray: number): string{
    let value: string = 'NO APLICA';
    let type: string = '';
    if(this.contractTemplateVariableCommonExpenseFound.length > 0){
      if(parseFloat(this.contractTemplateVariableCommonExpenseFound[indexArray].percentage) > 0){
        if(Number(this.contractTemplateVariableCommonExpenseFound[indexArray].variableCommonExpenseType) === 1) type = 'DE VENTAS NETAS';
        if(Number(this.contractTemplateVariableCommonExpenseFound[indexArray].variableCommonExpenseType) === 2) type = 'DE RENTA VARIABLE';
        if(Number(this.contractTemplateVariableCommonExpenseFound[indexArray].variableCommonExpenseType) === 3) type = 'DE RENTA TOTAL';
        value = 'V' + this.contractTemplateVariableCommonExpenseFound[indexArray].index + ': ' + thousandsSeparator(this.contractTemplateVariableCommonExpenseFound[indexArray].percentage) + ' % ' + type;
      }   
    }
    return value;
  }

  getDataContractTemplateVariablePromotionExpense(indexArray: number): string{
    let value: string = 'NO APLICA';
    let type: string = '';

    if(this.contractTemplateVariablePromotionExpenseFound.length > 0){
      if(parseFloat(this.contractTemplateVariablePromotionExpenseFound[indexArray].percentage) > 0){
        if(Number(this.contractTemplateVariablePromotionExpenseFound[indexArray].type) === 1) type = 'DE VENTAS NETAS';
        if(Number(this.contractTemplateVariablePromotionExpenseFound[indexArray].type) === 2) type = 'DE RENTA VARIABLE';
        if(Number(this.contractTemplateVariablePromotionExpenseFound[indexArray].type) === 3) type = 'DE RENTA TOTAL';
        value = 'V' + this.contractTemplateVariablePromotionExpenseFound[indexArray].index + ': ' + thousandsSeparator(this.contractTemplateVariablePromotionExpenseFound[indexArray].percentage) + ' % ' + type;
      }
    }

    return value;
  }

}
