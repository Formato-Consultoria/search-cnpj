import { PropsDataCompany } from "@/@types/data-company";

export default function BoxCompanyData(props: PropsDataCompany | any, dontChecked: boolean) {
    return (
        <div className={`ring-1 rounded-md px-5 py-10 ${dontChecked ? "text-white bg-green-700 ring-green-950"  : "text-zinc-900 bg-zinc-200 ring-zinc-950"}`}>
            <pre>{JSON.stringify(props, null, 2)}</pre>
        </div>
    )
}