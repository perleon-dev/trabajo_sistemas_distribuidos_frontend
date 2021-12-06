import { appAdvanceNet } from "src/environments/environment";

export const constants = {

    PAGINATION: {
        PAGE_SIZE: 10,
        NO_PAGE_SIZE: 0,
        PAGE_INDEX: 1,
        NO_PAGE_INDEX: 0
    },
    PARAMETER: {
        TIPO_DESPACHO: 118,
        SEGMENTOS_PROSPECTO: 113,
        TIPO_CUENTA: 101,
        TIPO_BANCOS: 103,
        RANGO_VENTAS: 115,
        TIPO_DIRECCION: 65,
        RUBRO_PROSPECTO: 114,
        PLATAFORMA_PROSPECTO: 116,
        PLATAFORMA_PROSPECTO_RPGO: "REAL PLAZA GO",
        DAYS: 1000 * 60 * 60 * 24,
        YEARS_DAYS: 1096,
        TIPO_FUENTE_PROSPECTO: 123,
        ENTITIES: "1,2",
        PARAMETER_ID: 8,
        PARAMETER_FIELD1: "0",
        COMMERCIAL_EXECUTIVE: 20,
        STATE_ACTIVE: "A",
        ESTADOS_CONTRATO_MKT: 102,
        TIPO_SELLER: 100,
        MOTIVE_ADDENDUM: 9,
        LIQUIDATION_TYPE: 5,
        IPC_TYPE: 6,
        MOTIF_CHANGE_AREA: 84,
        DAY_VALIDATE_FIXED_RENT_DOUBLE: 28,
        PERIODICITY_DEFAULT: 12,
        REVISION_PROJECT_AMOUNT: 151,
        OPERATION_CONCEPT_AIR_CONDITIONER: 140,
        GUARANTEE_DOCUMENT_TYPE: 150,
        MOTIVE_DISCOUNT: 49,
        ACCORDING_TO_CONSUMPTION: 'SEGÚN CONSUMO',
        ACTION: 18,
        VISA_GUARANTEE_TYPE: 152,
        OBSERVATION_MOTIVE_VISA_GUARANTEE: 66,
        DISAPPROVAL_MOTIVE: 133,
        IGV: 1.18,
        GENERATED_STATE_MULTIPLE_ADDENDUM: 52,
        STATE_MULTIPLE_ADDENDUM_ANULLED: 56
    },
    MONEDA: {
        SOLES: 1
    },
    CONTACT: {
        JOB_TITLE_REPRESENTANTE_LEGAL: 1,
        JOB_TITLE_GENERAL_MANAGER: 2,
        ORDER_REPRESENTATIVE_LEGAL: '1,2',
        ORDER_ONE: 1,
        ORDER_TWO: 2
    },
    STATE: {
        ACTIVE: 1,
        INACTIVE: 0,
        LETTERACTIVE: 'A'
    },
    STATES_WORKFLOW: {
        COMMERCIAL_TEMPLATE_RPGO_STATE_ID: 10,
    },
    PROSPECT_DOCUMENT_TYPE: {
        LEGAL: '1',
        CONTENT_DATA: '2'
    },
    STATES_COMMERCIAL_TEMPLATE: {
        PENDIENTE_EJECUTIVO_COMERCIAL: 214
    },
    ADDRESS_TYPE: {
        FISCAL: 1
    },
    PROFILES:{
        EjecutivoComercial : 20,
        EjecutivoComercialRpGo : 151,
        COMMERCIAL_PRACTITIONER: 21,
        COORDINATOR_GI: 33,
        CREDIT_COLLECTION_BOSS: 54,
        COMMERCIAL_BOSS: 22,
        CREDIT: 10,
        COMMERCIAL_ASSISTANT: 53,
        COMMERCIAL_MANAGER: 23,
        COMMERCIAL_MARKETING_DIRECTOR: 24,
        LEGAL_REPRESENTATIVE: 26
    },
    ROUTES: {
        COMMERCIAL_TEMPLATES_INBOX: '/contratos/plantillas-rpgo/bandeja',
        MARKETPLACE_INBOX: '/contratos/marketplace/bandeja',
        ADDENDUM_TEMPLATE: '/contratos/bandeja-plantilla/plantilla-adenda',
        CONTRACT_TEMPLATE_DETAIL: 'contratos/bandeja-plantilla/vista-preliminar',
        TRAY_CONTRACT_TEMPLATE: appAdvanceNet + 'Interfaces/CreditosYCobranzas/frmCreYCobAprobEval.aspx',
        VISA_GUARANTEE_DETAIL: 'credito-cobranza/visado-garantia/bandeja-visado-garantia/vista-preliminar',
        TRAY_CREDIT_EVALUATION: appAdvanceNet + 'Interfaces/CreditosYCobranzas/frmCreYCobBandejaVisadoGarantias.aspx'
    },
    SELLER_TYPE: {
        SELLER: 1,
        VTEX: 2,
        VTEX_TO_VTEX: 3
    },
    STATE_CONTRACT: {
        VALIDITY: "1",
        MODIFIED: "2",
        STATE_TEMPLATE_ADDENDUM: '1,3,8'
    },
    MESSAGE: {
        SUCCESS_SAVE: 'Datos guardados correctamente.',
        ERROR: 'Lo sentimos, ocurrió un error inesperado.',
        ERROR_GET_DATA: 'Ocurrió un error al obtener los datos.',
        CONFIRM_QUESTION: '¿Esta seguro de realizar la acción?',
        COMPLETE_FORM: 'Por favor completar los datos del formulario.',
        SUCCESS_UPDATE: 'Datos actualizado correctamente.',
        CONFIMR_QUESTION_PROCESS_ONETOONE: '¿Desea iniciar el proceso de registro 1 a 1?',
        INVALID_CODE_OR_ERROR: 'Hubo un error al obtener los datos, verifique que el link sea el correcto',
        VALIDATE_DATE_DEADLINE: 'La fecha entrega de proyecto y arquitectura de espacio, debe ser anterior al inicio de operaciones y posterior a la fecha de suscripción del contrato',
        VALIDATE_CREDIT_EVALUATION: 'Debe actualizar la información crediticia antes de guardar o modificar la plantilla',
        VALIDATE_VALIDITY_DATE: 'Fecha de entrega de proyecto y arquitectura de espacio debe ser menor a la fecha de vigencia de la adenda',
        VALIDATE_CONTRACT_AREA: 'El área a ser registrada en la plantilla no puede ser mayor al área del local',
        VALIDATE_MOTIF_CHANGE_AREA: 'Debe de seleccionar el motivo de cambio de área de contrato',
        VALIDATE_CONTRACT_END_DATE: 'Fecha de fin de contrato debe ser el último día del mes',
        VALIDATE_ADDENDUM_DATE: 'La fecha de suscripción de la adenda no debe ser mayor a la fecha de vigencia de la adenda',
        ERROR_SENTINEL_SERVICE: 'Ocurrió un error al obtener la información del Servicio del Proveedor',
        VALIDATE_CONTRACT_END_DATE_ND: 'Fecha de fin de contrato no debe ser Noviembre ó Diciembre',
        VALIDATE_CONTRACT_END_DATE_OND: 'Fecha de fin de contrato no debe ser Octubre, Noviembre ó Diciembre',
        VALIDATE_ADD_VALIDITY: 'La fecha fin de la Vigencia {0} es igual a la fecha fin de contrato, no se pude agregar más vigencias',
        VALIDATE_DATE_TO_MINOR_VALIDITY: 'La fecha hasta no puede ser menor que la fecha desde de la Vigencia {0}',
        VALIDATE_DATE_TO_LAST_DAY_MONTH_VALIDITY: 'La fecha fin de la Vigencia {0} debe ser el último día del mes',
        VALIDATE_DATE_FROM_NEXT_DAY_VALIDITY: 'La fecha de inicio de la Vigencia {0}, debe ser el siguiente día de la fecha final de la Vigencia {1}',
        VALIDATE_DATE_TO_EQUAL_CONTRACT_END_DATE_VALIDITY: 'La fecha fin de la Vigencia {0}, debe ser igual a la fecha fin de contrato',
        VALIDATE_DATE_FIXED_RENT_DOUBLE_MINOR_START_DATE_OPERATION: 'La renta doble debe encontrarse dentro de la fecha de inicio y fin de la plantilla contrato',
        VALIDATE_DATE_FIXED_RENT_DOUBLE_MAJOR_CONTRACT_END_DATE: 'La renta doble debe encontrarse dentro de la fecha de inicio y fin de la plantilla contrato',
        VALIDATE_AMOUNT_TOP_VARIABLE_RENT: 'El tope {0} debe ser mayor que el tope {1}',
        VALIDATE_AMOUNT_TO_VARIABLE_RENT: 'El monto hasta del registro {0} debe ser mayor que el monto desde',
        VALIDATE_CONTRACT_TEMPLATE_ADDENDUM: 'No se registro el descuento para el contrato {0}. Antes debe ingresar una adenda de ampliación de plazo o una renovación de contrato.',
        VALIDATE_CONTRACT_TEMPLATE_DISCOUNT_START_VALIDITY: 'La fecha de inicio de vigencia ya se encuentra en un rango registrado',
        VALIDATE_CONTRACT_TEMPLATE_DISCOUNT_END_VALIDITY: 'La fecha de fin de vigencia ya se encuentra en un rango registrado'
    },
    PARAMETERCATEGORY: {
        TYPESELLER: 1,
        LEVEL: 1,
    },
    PROSPECT_VALIDATOR: {
        COMISSION: 7
    },
    TAB_TEMPLATE_ADDENDUM: {
        HOME: 0,
        VALIDITY: 1,
        FIXED_RENT: 2,
        VARIABLE_RENT: 3,
        COMMON_EXPENSE: 4,
        PROMOTION_EXPENSE: 5,
        GUARANTEE: 6,
        CONSUMPTION: 7,
        DISCOUNT: 8,
        OTHER_CONCEPT: 9
    },
    MENU_WITH_PARAMETER: {
        TEMPLATE_ADDENDUM: 2392,
        CONTRACT_TEMPLATE_DETAIL: 2393,
        VISA_GUARANTEE_DETAIL: 2394
    },
    CURRENT_SITUATION_TYPE: {
        WITH_TEMPLATE: 1,
        WITH_CONTRACT: 2,
        DEFAULT: 3
    },
    SENTINEL_DOCUMENT_TYPE: {
        RUC: 'R'
    },
    MODAL_TITLE: {
        VALIDITY_MODAL: 'Fechas de Vigencias',
        FIXED_RENT_PERIOD_MODAL: 'Renta Fija Periodo',
        FIXED_RENT_ECONOMIC_CONDITION_MODAL: 'Condiciones Económicas',
        VARIABLE_RENT_BY_SALE: 'Renta Variable por Venta',
        VARIABLE_RENT_TYPE_SALE: 'Renta Variable por Tipo de Venta',
        VARIABLE_RENT_SALE_RANGE: 'Renta Variable por Rango de Venta',
        VARIABLE_RENT_SALE_ACCUMULATED: 'Renta Variable por Venta Acumulada',
        COMMON_EXPENSE_ECONOMIC_CONDITION_MODAL: 'Condición Económica',
        VARIABLE_COMMON_EXPENSE_MODAL: 'Gasto Común Variable',
        PROMOTION_EXPENSE_ECONOMIC_CONDITION_MODAL: 'Condición Económica',
        VARIABLE_PROMOTION_EXPENSE_MODAL: 'Gasto Promoción Variable',
        KEY_RIGHT_MODAL: 'Derecho de Llave',
        DISCOUNT_MODAL: 'Descuentos',
        KEY_RIGHT_DETAIL: 'Detalle Derecho de Llave',
        ADD_GUARANTEE_MODAL: 'Agregar Garantia'
    },
    TEMPLATE_ADDENDUM: {
        MAXIMUM_NUMBER_YEAR: 3
    },
    CONTRACT: {
        CONTRACT_ID_DEFAULT: 99999
    },
    LOCAL_STATE: {
        NOT_LEASED: 1,
        REJECTED: 5,
        APPROVAL: 6
    },
    LOCAL_TYPE: {
        ATM: 8,
        MODULE: 7,
        VENDING_MACHINE: 13
    },
    REPORT_SALE: {
        YES: '1',
        NO: '0'
    },
    FIXED_RENT_DOUBLE_APPLY: {
        YES: '1',
        NO: '0'
    },
    TEMPLATE_TYPE: {
        ADDENDUM_REGULAR: 43,
        CONTRACT_RENEWAL: 41,
        MULTIPLE_EXCEPTION_ADDENDUM: 787
    },
    ADJUSTMENTIPC: {
        YES: 1,
        NO: 0
    },
    IPC_TYPE: {
        NORMAL: 0,
        SUBJACENT: 1
    },
    CONTRACT_TEMPLATE_STATE: {
        GENERATED: 52,
        PENDING_APPROVAL: 39
    },
    VARIABLE_RENT_TYPE_SALE: {
        BY_SALE: 1,
        TYPE_SALE: 2,
        SALE_RANGE: 3,
        ACCUMULATED_SALE: 4
    },
    COMMERCIAL_TYPE_LOAD: {
        BY_CONSUMPTION: 2,        
        FLAT: 5,
        WATER: 6
    },
    COMMERCIAL_TYPE_LOAD_DETAIL: {
        BT4: 2,
        BT5: 3,       
        FLAT: 7,
        M3: 8
    },
    STATUS_CODE: {
        OK: 200,
        BAD_REQUEST: 400,
        INTERNAL_ERROR: 500
    },
    CONCEPT:{
        WATER: 12,
        FIXED_RENT: 1,
        VARIABLE_RENT: 2,
        FIXED_COMMON_EXPENSE: 3,
        VARIABLE_COMMON_EXPENSE: 4,
        FIXED_PROMOTION_COMMON_EXPENSE: 5,
        VARIABLE_PROMOTION_EXPENSE: 6
    },
    WATER_CONSUMPTION: {
        VARIABLE: 0,
        FIXED: 1
    },
    TYPE_GUARANTEE_RENEWAL: {
        NONE: 0,
        NEW: 1,
        PREVIOUS: 2
    },
    EXEMPT_ATTACHED: {
        YES: 1,
        NO: 0
    },
    STATE_VISA_GUARANTEE: {
        APPROVED: 'Aprobado',
        OBSERVER: 'Observado',
        REJECTED: 'Rechazado'
    },
    EQUIVALANCE_STATE_VISA_GUARANTEE: {
        COMMERCIAL_APPROVED: 167,
        CREDIT_APPROVED: 168,
        APPROVED_CHIEF_CREDIT: 169,
        OBSERVER_CREDIT: 170,
        OBSERVER_CREDIT_BOSS: 171,
        REJECTED: 172,
        COMMERCIAL_OBSERVER: 173
    },
    SCREEN: {
        TRAY_TEMPLATE: 1
    },
    STATE_PRE_CONTRACT: {
        PENDING: 1,
        SATISFACTIONPROCESS: 2,
        INPROCESS: 3,
        INACTIVE: 0
    },
    STATE_TRADENAMEITEMS:{
        PENDING: 227,
        APPROVE: 228
    }
}