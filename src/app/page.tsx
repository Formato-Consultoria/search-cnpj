'use client'
import BoxCompanyData from '@/components/company-data';

import { ChangeEvent, useEffect, useState } from 'react';
import { cnpj } from 'cpf-cnpj-validator';

import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { getCompanyInfoFromRealtimeDatabase } from '@/functions/company.function';
import { PropsDataCompany } from '@/@types/data-company';

interface FormData {
  cnpj: string;
}

const schema = yup.object().shape({
  cnpj: yup.string().required("Por favor, informe o CNPJ da empresa")
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "Por favor, informe um CNPJ valido.")
});

export default function Home() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  const [CNPJToBeSearched, sentCNPJToBeSearched] = useState("");
  const cnpjSearched = watch('cnpj');

  const [companyDataChecked, setCompanyDataChecked] = useState<PropsDataCompany | any>(null);
  const [companyDataUnchecked, setCompanyDataUnchecked] = useState<any>(null);

  async function handleChangeSearchElement({ target }: ChangeEvent<HTMLInputElement>) {
    const { value } = target;
    sentCNPJToBeSearched(value);

    console.log(value);
    const registeredCompanies = await getCompanyInfoFromRealtimeDatabase(value);
    if (registeredCompanies) {
      setCompanyDataChecked(registeredCompanies);
    } else {
      setCompanyDataChecked(null);
    }
  }

  const onSubmit = async (data: FormData) => {
    try {
      await schema.validate(data);
      const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${data.cnpj.replace(/[.-/]/g, '')}`);
      const unregisteredCompanies = await response.json();

      if (unregisteredCompanies) {
        setCompanyDataUnchecked(unregisteredCompanies);
      } else {
        setCompanyDataUnchecked(null);
      }
    } catch (error: any) {
      console.log("Erro na validação do CNPJ:", error.message);
    }
  }

  return (
    <main className="flex min-h-screen flex-col gap-8 items-center py-24 px-2.5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center relative"
      >
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input
            type="search"
            {...register("cnpj")}
            id="default-search"
            className="block w-60 md:w-80 lg:w-96 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="CNPJ (ex: xx.xxx.xxx/0001-xx)"
            required
            maxLength={18}
            value={cnpj.format(CNPJToBeSearched)}
            onChange={handleChangeSearchElement}
          />
        </div>
        <button type="submit" className="p-3 ml-2 text-sm font-medium text-white bg-zinc-900 rounded-xl border border-zinc-900 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <span className="sr-only">Search</span>
        </button>

        {errors.cnpj && <p className="text-red-500">CNPJ inválido</p>}
      </form>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center">
          <div className="w-5 h-5 bg-zinc-100"></div>
          <small className="ml-2 font-medium">Não Cadastrado</small>
        </div>
        <div className="flex items-center">
          <div className="w-5 h-5 bg-green-600"></div>
          <small className="ml-2 font-medium">Cadastrado</small>
        </div>
      </div>

      {(companyDataChecked && CNPJToBeSearched != '') ?
        <BoxCompanyData
          companyData={companyDataChecked}
          className={"text-white bg-green-600 ring-zinc-200"}
          classNameRow={{
            tr: "bg-green-600 border-b hover:bg-green-500",
            th: "px-6 py-4 font-medium text-white whitespace-nowrap"
          }}
        /> : (
          (companyDataUnchecked && CNPJToBeSearched != '') ?
            <BoxCompanyData
              companyData={(() => {
                const {
                  cnpj,
                  descricao_tipo_de_logradouro,
                  logradouro,
                  numero,
                  complemento,
                  bairro,
                  municipio, uf,
                  razao_social,
                  nome_fantasia,
                  porte
                } = companyDataUnchecked;

                return {
                  cnpj,
                  company_address: `${descricao_tipo_de_logradouro} ${logradouro}, ${numero}, ${complemento}, ${bairro}, ${municipio} - ${uf}`,
                  company_city: municipio,
                  company_name: razao_social,
                  fantasy_name: nome_fantasia,
                  company_size: porte
                }
              })()}
              rowCompanyData={companyDataUnchecked}
              className={"text-zinc-900 bg-zinc-100 ring-zinc-300"}
              classNameRow={{
                tr: "text-zinc-900 bg-zinc-100 border-b hover:bg-zinc-50",
                th: "px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              }}
            /> :
            (<>
              {/* <div role="status" className="w-full lg:w-[1050px] h-5/6 lg:max-h-96 animate-pulse">
                <div className="h-2.5 bg-gray-50 rounded-full w-48 mb-4"></div>
                <div className="h-2 bg-gray-50 rounded-full max-w-[360px] mb-2.5"></div>
                <div className="h-2 bg-gray-50 rounded-full mb-2.5 w-11/12"></div>
                <div className="h-2 bg-gray-50 rounded-full mb-2.5"></div>
                <div className="h-2 bg-gray-50 rounded-full mb-2.5 w-11/12"></div>
                <div className="h-2 bg-gray-50 rounded-full max-w-[330px] mb-2.5"></div>
                <div className="h-2 bg-gray-50 rounded-full max-w-[340px] mb-2.5"></div>
                <div className="h-2 bg-gray-50 rounded-full max-w-[440px] mb-2.5"></div>
                <div className="h-2 bg-gray-50 rounded-full max-w-[400px] mb-2.5"></div>
                <span className="sr-only">Loading...</span>
              </div> */}

              <div role="status" className="w-full lg:w-[700px] h-5/6 lg:max-h-96 space-y-4 divide-y divide-gray-200 animate-pulse p-2.5 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="h-2.5 bg-gray-100 rounded-full w-36 md:w-80 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-50 rounded-full"></div>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full w-12 md:w-40"></div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <div className="h-2.5 bg-gray-100 rounded-full w-36 md:w-80 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-50 rounded-full"></div>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full w-12 md:w-40"></div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <div className="h-2.5 bg-gray-100 rounded-full w-36 md:w-80 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-50 rounded-full"></div>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full w-12 md:w-40"></div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <div className="h-2.5 bg-gray-100 rounded-full w-36 md:w-80 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-50 rounded-full"></div>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full w-12 md:w-40"></div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <div className="h-2.5 bg-gray-100 rounded-full w-36 md:w-80 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-50 rounded-full "></div>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full w-12 md:w-40"></div>
                </div>
                <span className="sr-only">Loading...</span>
              </div>
            </>
            )
        )}
    </main>
  )
}

