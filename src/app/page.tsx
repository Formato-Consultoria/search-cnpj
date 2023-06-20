'use client'
import BoxCompanyData from '@/components/company-data';
import { ChangeEvent, useEffect, useState } from 'react';
import { cnpj } from 'cpf-cnpj-validator';
import { PropsDataCompany } from '@/@types/data-company';
import { getCompanyInfoFromRealtimeDatabase } from '@/functions/company.function';

export default function Home() {
  const [CNPJToBeSearched, sentCNPJToBeSearched] = useState("");
  const [datasCompany, setDatasCompany] = useState<PropsDataCompany | any>(null);
  const [datasCompanyNotChecked, setDatasCompanyNotChecked] = useState<any>(null);
  const [checked, setChecked] = useState(false);
  
  function handleChangeSearchElement({ target }: ChangeEvent<HTMLInputElement>) {
    const { value } = target;
    sentCNPJToBeSearched(value);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const company = await getCompanyInfoFromRealtimeDatabase(CNPJToBeSearched);
        if (company) {
          setDatasCompany(company);
          setChecked(true);
        } else {
          setChecked(false);

          const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${CNPJToBeSearched.replace(/[.-]/g, '')}`);
          const companyNotChecked = await response.json();
          if(companyNotChecked) {
            setDatasCompanyNotChecked(companyNotChecked);
          }
        }
      } catch(error: any) {
        console.error(error);
      }
    }

    fetchData();
  }, [CNPJToBeSearched]);

  return (
    <main className="flex min-h-screen flex-col gap-10 items-center p-24">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-96 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="CNPJ (ex: xx.xxx.xxx/0001-xx)"
              required
              value={cnpj.format(CNPJToBeSearched)}
              onChange={handleChangeSearchElement}
            />
        </div>
        <div className="flex flex-col gap-3">
          <BoxCompanyData
            {...(datasCompany ? datasCompany : datasCompanyNotChecked)}
            checked={checked}
          />
        </div>
    </main>
  )
}