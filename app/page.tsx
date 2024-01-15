import Link from 'next/link'
import { GiHealthPotion, GiBrain } from "react-icons/gi";
import { RiMentalHealthLine } from "react-icons/ri";



export default function Home() {
  return (
    <main className="flex-1">
      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-900 ">
                HL7 Tools That Don't Suck
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl ">
                Created for healthcare professionals, by healthcare professionals.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12">
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-6">
          <Link
            className="group flex flex-col items-center text-center p-6 rounded-lg shadow-lg transition-colors hover:bg-slate-100 "
            href="/hl7/parser"
          >
            <GiHealthPotion className="h-16 w-16 mb-4 text-gray-900 group-hover:text-green-700 " />
            <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-green-700 ">
              HL7 Parser
            </h2>
            <p className="mt-2 text-gray-500 group-hover:text-green-600 ">
              An interactive, online HL7 parser that runs in your browser.
            </p>
          </Link>
          <Link
            className="group flex flex-col items-center text-center p-6 rounded-lg shadow-lg transition-colors hover:bg-slate-100 "
            href="/hl7/lookup"
          >
            <RiMentalHealthLine className="h-16 w-16 mb-4 text-gray-900 group-hover:text-green-700 " />
            <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-green-700 ">
              HL7 Field Lookup
            </h2>
            <p className="mt-2 text-gray-500 group-hover:text-green-600 ">
              Quickly find a mapping of HL7 fields to their definitions.
            </p>
          </Link>
          <Link
            className="group flex flex-col items-center text-center p-6 rounded-lg shadow-lg transition-colors hover:bg-slate-100 "
            href="/hl7/adt-events"
          >
            <GiBrain className="h-16 w-16 mb-4 text-gray-900 group-hover:text-green-700 " />
            <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-green-700 ">
              ADT Event Codes
            </h2>
            <p className="mt-2 text-gray-500 group-hover:text-green-600 ">
              Map ADT event codes to their definitions.
            </p>
          </Link>
        </div>
      </section>
    </main>
  )
}
