// configuracion del sitio
var PREFIJO_SERVICIO =  "/api/"; //"http://localhost:3000/api/"; // relativo al mismo servidor

var dt_i18n_es_PE = {
    search: "Buscar:",
    lengthMenu: "Mostrar _MENU_ registros",
    zeroRecords: "La búsqueda no contiene ningún resultado.",
    info: "Página _PAGE_ de _PAGES_",
    infoEmpty: "Tabla en blanco",
    infoFiltered: "(_TOTAL_ registros)",
    paginate: {
        first: "Primero",
        last: "Ultimo",
        previous: "Anterior",
        next: "Siguiente"
    }
};

var TM_ESTADOS = "1";
var TM_GIROS = "2";
var TM_PERFILES = "3";
var TM_LOG_TABLAS = "4";
var TM_TIPO_DOC_IDENT = "5";
var TM_CONTACTO_CARGO = "6"; // no usado
var TM_MONEDA = "7";
var TM_CONTACTO_AREA = "8";

var tst_Duration = 700;

// mensajes de error
var ERROR_NO_SERVICIO = "El servicio no está disponible en este momento.";
var ERROR_NO_RESULTADO = "No tiene los permisos para realizar esta acción";
