import Heading from "@/app/components/ui/Heading";
import { hl7Fields } from "@/app/models/HL7Definitions";
import SegmentDropdown from "@/app/hl7/lookup/SegmentDropdown";

export const metadata = {
    title: 'HL7 Segment & Field Lookup',
    description: '',
}

export default function Page() {
    const handleSelectChange = (e) => {
        const selectedSegment = e.target.value;
        if (selectedSegment) {
            const element = document.getElementById(selectedSegment);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="text-lg">
            <SegmentDropdown />
            <Heading level={1}>HL7 Segment & Field Lookup</Heading>
            {Object.entries(hl7Fields).map(([segment, fields]) => (
                <div key={segment}>
                    <Heading level={2} id={segment}>{segment}</Heading>
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="w-2/12 px-4 py-2 border-b-2 border-gray-200 text-start">Field</th>
                                <th className="w-10/12 px-4 py-2 border-b-2 border-gray-200 text-start">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(fields).map(([field, description]) => (
                                <tr key={field} className="border-b border-slate-100 even:bg-zinc-100">
                                    <td className="w-2/12 px-4 py-2">{segment}-{field}</td>
                                    <td className="w-10/12 px-4 py-2">{description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    )
}