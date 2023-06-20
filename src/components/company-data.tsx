import { PropsDataCompany } from "@/@types/data-company";
import { getCompanyInfoFromRealtimeDatabase } from "@/functions/company.function";

export default async function BoxCompanyData({ cnpj }: any) {    
    const registeredCompanies = await getCompanyInfoFromRealtimeDatabase(cnpj);

    const responseAPI = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj.replace(/[.-]/g, '')}`);
    const unregisteredCompanies = await responseAPI.json();

    return (
        <div
            className={`
                w-auto md:w-[768px] mx-5 ring-1 rounded-md px-5 py-10 overflow-auto
                ${registeredCompanies ?
                    "text-white bg-green-600 ring-zinc-200"
                : "text-zinc-900 bg-zinc-100 ring-zinc-300"}
            `}
        >
            <pre>{JSON.stringify((registeredCompanies ?? unregisteredCompanies), null, 2)}</pre>
        </div>
    )
}