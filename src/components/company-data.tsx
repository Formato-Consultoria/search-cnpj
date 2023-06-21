'use client'

import { PropsDataCompany } from "@/@types/data-company"
import { useState } from "react"
import { cnpj } from 'cpf-cnpj-validator';

type Props = {
  companyData: PropsDataCompany,
  rowCompanyData?: {},
  className: string,
  classNameRow: {
    tr: string,
    th: string
  }
}

export default function BoxCompanyData({ companyData, rowCompanyData, className, classNameRow }: Props) {
  const [toggleRowCopanyData, setToggleRowCompanyData] = useState(false);
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-white">
          <tbody>
            <tr className={classNameRow.tr}>
              <th scope="row" className={classNameRow.th}>
                CNPJ
              </th>
              <td className="px-6 py-4">
                {cnpj.format(companyData.cnpj)}
              </td>
            </tr>
            <tr className={classNameRow.tr}>
              <th scope="row" className={classNameRow.th}>
                Nome da Empresa
              </th>
              <td className="px-6 py-4">
                {companyData.company_name}
              </td>
            </tr>
            <tr className={classNameRow.tr}>
              <th scope="row" className={classNameRow.th}>
                Nome Fantasia
              </th>
              <td className="px-6 py-4">
                {companyData.fantasy_name}
              </td>
            </tr>
            <tr className={classNameRow.tr}>
              <th scope="row" className={classNameRow.th}>
                Endereço Completo
              </th>
              <td className="px-6 py-4">
                {companyData.company_address}
              </td>
            </tr>
            <tr className={classNameRow.tr}>
              <th scope="row" className={classNameRow.th}>
                Porte
              </th>
              <td className="px-6 py-4">
                {companyData.company_size}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        className="lg:ml-[500px] flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 md:mr-0 focus:ring-4 focus:ring-gray-100"
        type="button"
        onClick={() => setToggleRowCompanyData(!toggleRowCopanyData)}
        disabled={!rowCompanyData}
      >
        DADOS BRUTO
        <svg className="w-4 h-4 mx-1.5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
      </button>
      {(toggleRowCopanyData) &&
        <div
          className={`w-full lg:w-[800px] h-5/6 lg:max-h-96 ring-1 rounded-md px-5 py-10 overflow-auto ${className}`}
        >
          <pre>{JSON.stringify(rowCompanyData, null, 2)}</pre>
        </div>
      }
    </>
  )
}