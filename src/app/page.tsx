'use client'
import BoxCompanyData from '@/components/company-data';

import { ChangeEvent, useEffect, useState } from 'react';
import { cnpj } from 'cpf-cnpj-validator';

import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { getCompanyInfoFromRealtimeDatabase } from '@/functions/company.function';

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

  const [companyData, setCompanyData] = useState<any>(null);
  const [checked, setChecked] = useState<any>(false);
  
  function handleChangeSearchElement({ target }: ChangeEvent<HTMLInputElement>) {
    const { value } = target;
    sentCNPJToBeSearched(value);
  }

  const onSubmit = async (data: FormData) => {
    try {
      await schema.validate(data);
      console.log("CNPJ válido:", data.cnpj);
      const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${data.cnpj.replace(/[.-/]/g, '')}`);
      const unregisteredCompanies = await response.json();

      if (unregisteredCompanies) {
        setCompanyData(unregisteredCompanies);
        console.log("ENCONTRADO NO brasilapi: ", unregisteredCompanies);
        setChecked(false);
      } else {
        console.log("NÃO ENCONTRADO NO brasilapi: ", unregisteredCompanies);
      }
    } catch (error: any) {
      console.log("Erro na validação do CNPJ:", error.message);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const registeredCompanies = await getCompanyInfoFromRealtimeDatabase(cnpjSearched);
      if(registeredCompanies) {
        setCompanyData(registeredCompanies);
        setChecked(true);
      }
    }

    fetchData();
  }, [cnpjSearched, CNPJToBeSearched])

  return (
    <main className="flex min-h-screen flex-col gap-10 items-center p-24">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center"
      >
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input
              type="search"
              {...register("cnpj")}
              id="default-search"
              className="block w-96 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="CNPJ (ex: xx.xxx.xxx/0001-xx)"
              required
              maxLength={18}
              value={cnpj.format(CNPJToBeSearched)}
              onChange={handleChangeSearchElement}
            />
            {errors.cnpj && <span className="text-red-500">CNPJ inválido</span>}
        </div>
        <button type="submit" className="p-3 ml-2 text-sm font-medium text-white bg-zinc-900 rounded-xl border border-zinc-900 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <span className="sr-only">Search</span>
        </button>
      </form>
        
      <BoxCompanyData
        companyData={companyData}
        checked={checked}
      />
    </main>
  )
}