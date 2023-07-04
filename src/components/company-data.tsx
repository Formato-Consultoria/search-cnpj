'use client'

import { PropsDataCompany } from "@/@types/data-company"
import { useEffect, useState } from "react"
import { cnpj } from 'cpf-cnpj-validator';
import {
  recordsDiagnosticInfoInTheDatabaseInRealTime
} from "@/functions/company.function";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  companyData: PropsDataCompany,
  rowCompanyData?: {},
  className: string,
  classNameRow: {
    tr: string,
    th: string
  }
}

type FormDataType = {
  name_agent: string,
  status_diagnostic: Array<'diagnostico' | 'forms' | 'sebrai play' | 'voltar depois' | 'recusa de diagnostico' | 'nome do agente'>
}

export default function BoxCompanyData({
  companyData,
  rowCompanyData,
  className,
  classNameRow
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset
  } = useForm<FormDataType>();
  const optionCheck = ['Diagnostico', 'Forms', 'Sebrai play', 'Voltar Depois', 'Recusou o Diagnostico'];
  const [tabesChange, setTableChange] = useState({
    table1: true,
    table2: false,
  })

  function changeTable1() {
    setTableChange({
      table1: true,
      table2: false
    })
  }

  function changeTable2() {
    setTableChange({
      table1: false,
      table2: true
    })
  }

  async function onSubmit(data: FormDataType) {
    if (data) {
      const formattedData = {...companyData, ...data}
      await toast.promise(
        recordsDiagnosticInfoInTheDatabaseInRealTime(formattedData),
        {
          loading: 'Registrando...',
          success: <b>Empresa registrada com sucesso!</b>,
          error: <b>Houve algum erro no registro!</b>,
      });

      clearErrors();
      reset();
    }
  }

  if (!rowCompanyData) {
    return (
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
            <tr className={classNameRow.tr}>
              <th scope="row" className={classNameRow.th}>
                Status
              </th>
              <td className="px-6 py-4">
                {companyData?.status_diagnostic?.join(" | ").toUpperCase()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  if (rowCompanyData) {
    return (<>
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
      <div className="border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
          <li className="mr-2">
            <button
              onClick={changeTable1}
              className={`inline-flex p-4 border-b-2 rounded-t-lg ${tabesChange.table1 ? "text-zinc-900 border-zinc-900 active" : "border-transparent hover:text-gray-600 hover:border-gray-300"} group`}
            >
              <svg className={`w-5 h-5 mr-2 ${tabesChange.table1 ? "text-zinc-900" : "text-gray-400 group-hover:text-gray-500"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18"><path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" /><path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" /></svg>Diagnóstico
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={changeTable2}
              className={`inline-flex p-4 border-b-2 rounded-t-lg ${tabesChange.table2 ? "text-zinc-900 border-zinc-900 active" : "border-transparent hover:text-gray-600 hover:border-gray-300"} group`}
              aria-current="page"
              disabled={!rowCompanyData}
            >
              <svg className={`w-5 h-5 mr-2 ${tabesChange.table2 ? "text-zinc-900" : "text-gray-400 group-hover:text-gray-500"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20"><path d="M8 5.625c4.418 0 8-1.063 8-2.375S12.418.875 8 .875 0 1.938 0 3.25s3.582 2.375 8 2.375Zm0 13.5c4.963 0 8-1.538 8-2.375v-4.019c-.052.029-.112.054-.165.082a8.08 8.08 0 0 1-.745.353c-.193.081-.394.158-.6.231l-.189.067c-2.04.628-4.165.936-6.3.911a20.601 20.601 0 0 1-6.3-.911l-.189-.067a10.719 10.719 0 0 1-.852-.34 8.08 8.08 0 0 1-.493-.244c-.053-.028-.113-.053-.165-.082v4.019C0 17.587 3.037 19.125 8 19.125Zm7.09-12.709c-.193.081-.394.158-.6.231l-.189.067a20.6 20.6 0 0 1-6.3.911 20.6 20.6 0 0 1-6.3-.911l-.189-.067a10.719 10.719 0 0 1-.852-.34 8.08 8.08 0 0 1-.493-.244C.112 6.035.052 6.01 0 5.981V10c0 .837 3.037 2.375 8 2.375s8-1.538 8-2.375V5.981c-.052.029-.112.054-.165.082a8.08 8.08 0 0 1-.745.353Z" /></svg>Dados Brutos
            </button>
          </li>
        </ul>
      </div>

      {(tabesChange.table1) && <div>
        <h2 className="text-lg font-semibold">Registro de Diagnóstico</h2>
        <form
          className={"flex flex-col gap-2 md:gap-4 w-full p-2.5"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <label
            htmlFor="name_agent"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >Nome do agente:</label>
          <input
            type="text"
            id="name_agent"
            {...register("name_agent", { required: 'Digite o nome do agente' })}
              className={`
                text-sm rounded-lg block w-full p-2.5
                ${errors.name_agent ? "bg-red-100 border-red-400 text-red-900 placeholder-red-700" : "bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"}
            `}
            placeholder="ex.: Diego C. Silva"
          />
          {errors.name_agent && (<small className="text-xs font-medium text-red-600"> *{`${errors.name_agent?.message}`}</small>)}

          <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
            {optionCheck.map((option, index) => (
              <li
                key={index}
                className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r"
              >
                <div className="flex items-center pl-3">
                  <input
                    id={option.toLowerCase().replace("", "-")}
                    type="checkbox"
                    value={option.toLowerCase()}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    {...register('status_diagnostic', { required: 'Selecione pelo menos uma opção' })}
                  />
                  <label
                    htmlFor={option.toLowerCase().replace("", "-")}
                    className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >{option}</label>
                </div>
              </li>
            ))}
          </ul>
          {errors.status_diagnostic && (<small className="text-xs font-medium text-red-600 dark:text-red-500"> *{`${errors.status_diagnostic?.message}`}</small>)}

          <button
            type="submit"
            className="text-white bg-zinc-900 hover:bg-zinc-900/90 focus:ring-4 focus:outline-none focus:ring-zinc-900/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex w-max items-center"
          >
            Registrar
          </button>
        </form>
      </div>}

      {(rowCompanyData && tabesChange.table2) &&
        <div
          className={`w-full lg:w-[800px] h-5/6 lg:max-h-96 ring-1 rounded-md px-5 py-10 overflow-auto ${className}`}
        >
          <pre>{JSON.stringify(rowCompanyData, null, 2)}</pre>
        </div>}
    </>)
  }
}