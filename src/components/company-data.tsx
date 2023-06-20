import { PropsDataCompany } from "@/@types/data-company";

export default function BoxCompanyData(props: PropsDataCompany | any, checked: boolean) {
    return (
        <div
            className={`
                w-full md:w-[768px] mx-5 ring-1 rounded-md px-5 py-10 overflow-auto
                ${checked ?
                    "text-white bg-green-600 ring-green-800"
                :
                    "text-zinc-900 bg-zinc-200 ring-zinc-950"}
            `}
        >
            <pre>{JSON.stringify(props, null, 2)}</pre>
        </div>
    )
}