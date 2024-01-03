import Heading from "@/app/components/ui/Heading";
import { hl7Fields } from "@/app/models/HL7Definitions";
import SegmentDropdown from "@/app/hl7/lookup/SegmentDropdown";

export const metadata = {
    title: 'HL7 Segment & Field Lookup',
    description: '',
}

export default function Page() {
    return (
        <div className="text-lg">
            <Heading level={1}>HL7 Segment & Field Lookup</Heading>
            <SegmentDropdown />
            {Object.entries(hl7Fields).map(([segment, fields]) => (
                <div key={segment}>
                    <Heading level={2} id={segment}>{segment}</Heading>
                    <table className="table-auto w-full text-start">
                        <thead className="text-zinc-700 uppercase bg-zinc-300 px-6 py-3 border-b-2 border-zinc-50">
                            <tr>
                                <th className="w-3/12 lg:w-2/12 px-6 py-3 text-start">Field</th>
                                <th className="w-9/12 lg:w-10/12 px-6 py-3 text-start">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(fields).map(([field, description]) => (
                                <tr key={field} className="border-b border-slate-100 even:bg-zinc-100">
                                    <td className="w-2/12 px-6 py-3">{segment}-{field}</td>
                                    <td className="w-10/12 px-6 py-3">{description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    )
}