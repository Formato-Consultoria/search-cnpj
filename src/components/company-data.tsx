'use client'
type Props = {
  companyData: {},
  className: string
}

export default function BoxCompanyData({ companyData, className }: Props) {
  return (
    <>
      <div
        className={`w-full lg:w-[1050px] h-5/6 lg:max-h-96 ring-1 rounded-md px-5 py-10 overflow-auto ${className}`}
      >
        <pre>{JSON.stringify(companyData, null, 2)}</pre>
      </div>
    </>
  )
}