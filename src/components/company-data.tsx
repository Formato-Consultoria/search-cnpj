'use client'
export default function BoxCompanyData({ ...props }: any, checked: boolean) {
  return (
    <div
        className={`
            w-auto md:w-[768px] mx-5 ring-1 rounded-md px-5 py-10 overflow-auto
            ${checked ? "text-white bg-green-600 ring-zinc-200" : "text-zinc-900 bg-zinc-100 ring-zinc-300"}`}
    >
      <pre>{JSON.stringify(props.companyData, null, 2)}</pre>
    </div>
  )
}