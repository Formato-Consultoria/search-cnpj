export interface PropsDataCompany {
    cnpj: string
    company_name: string,
    fantasy_name: string
    company_address: string
    company_city: string,
    company_size: string,
    status_diagnostic?: Array<'diagnostico' | 'forms' | 'sebrai play' | 'voltar depois' | 'recusa de diagnostico' | 'nome do agente'>,
    name_agent?: string
}