import { PropsDataCompany } from "@/@types/data-company";

export default function BoxCompanyData(props: PropsDataCompany | any, dontChecked: boolean) {
    return (
        <div className={`${dontChecked ? "bg-green-500"  : "bg-zinc-200"}`}>
            {props}
        </div>
    )
}