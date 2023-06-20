import { PropsDataCompany } from "@/@types/data-company";

export default function BoxCompanyData(props: any) {
    return (
        <div
            className={`
                w-full md:w-[768px] mx-5 ring-1 rounded-md px-5 py-10 overflow-auto text-zinc-900
                ${props.checked ?
                    "text-white bg-green-600 ring-zinc-200"
                : "text-zinc-900 bg-zinc-100 ring-zinc-300"}
            `}
        >
            <pre>{JSON.stringify(props, null, 2)}</pre>
        </div>
    )
}