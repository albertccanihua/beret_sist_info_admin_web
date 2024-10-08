export interface IDataToUpload {
    id?: number;
    id_cita?: string;
    anio?: string;
    mes?: string;
    dia?: string;
    fecha_atencion?: string;
    lote?: string;
    num_pag?: string;
    num_reg?: string;
    id_ups?: string;
    descripcion_ups?: string;
    descripcion_sector?: string;
    descripcion_disa?: string;
    descripcion_red?: string;
    descripcion_microred?: string;
    codigo_unico?: string;
    nombre_establecimiento?: string;
    abrev_tipo_doc_paciente?: string;
    numero_documento_paciente?: string;
    apellido_paterno_paciente?: string;
    apellido_materno_paciente?: string;
    nombres_paciente?: string;
    fecha_nacimiento_paciente?: string;
    genero?: string;
    id_etnia?: string;
    descripcion_etnia?: string;
    historia_clinica?: string;
    ficha_familiar?: string;
    id_financiador?: string;
    descripcion_financiador?: string;
    descripcion_pais?: string;
    abrev_tipo_doc_personal?: string;
    numero_documento_personal?: string;
    apellido_paterno_personal?: string;
    apellido_materno_personal?: string;
    nombres_personal?: string;
    fecha_nacimiento_personal?: string;
    id_condicion?: string;
    descripcion_condicion?: string;
    id_profesion?: string;
    descripcion_profesion?: string;
    id_colegio?: string;
    descripcion_colegio?: string;
    numero_colegiatura?: string;
    abrev_tipo_doc_registrador?: string;
    numero_document_registrador?: string;
    apellido_paterno_registrador?: string;
    apellido_materno_registrador?: string;
    nombres_registrador?: string;
    fecha_nacimiento_registrador?: string;
    id_condicion_establecimiento?: string;
    id_condicion_servicio?: string;
    edad_reg?: string;
    tipo_edad?: string;
    anio_actual_paciente?: string;
    mes_actual_paciente?: string;
    dia_actual_paciente?: string;
    id_turno?: string;
    codigo_item?: string;
    descripcion_item?: string;
    tipo_diagnostico?: string;
    valor_lab?: string;
    id_correlativo?: string;
    peso?: string;
    talla?: string;
    hemoglobina?: string;
    perimetro_abdominal?: string;
    perimetro_cefalico?: string;
    descripcion_otra_condicion?: string;
    fecha_ultima_regla?: string;
    fecha_solicitud_hb?: string;
    fecha_resultado_hb?: string;
    fecha_registro?: string;
    fecha_modificacion?: string;
}