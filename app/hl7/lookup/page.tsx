import Heading from "@/app/components/ui/Heading";
import { hl7Fields } from "@/app/models/HL7Definitions";
import SegmentDropdown from "@/app/hl7/lookup/SegmentDropdown";

export const metadata = {
    title: 'HL7 Segment & Field Lookup',
    description: 'Lookup HL7 Segment & Field values by segment type and field number.',
}

export default function Page() {
    return (
        <div className="text-lg">
            <Heading level={1}>HL7 Segment & Field Lookup</Heading>
            <SegmentDropdown />
            <p className="text-xs">Want to search by description? Use Ctrl+F to search with your browser.</p>
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
            <Heading level={2}>Segment Types in HL7</Heading>
            <p>In HL7 messaging, data is organized into segments, each serving a specific purpose in the overall communication structure. A segment is a logical grouping of data fields that convey a particular set of related information. Each segment is identified by a unique segment type code, typically a three-letter abbreviation, which appears at the beginning of the segment line in a message.</p>

            <Heading level={2}>Understanding Fields and Their Mappings</Heading>
            <p>Each segment consists of multiple fields, which are individual pieces of information. Fields are usually separated by a delimiter, such as a pipe "|" character, and are identified by their position within the segment. The content and format of these fields are defined by the HL7 standards, and understanding their mappings is crucial for accurate data interpretation and integration.</p>

            <Heading level={2}>What's an HL7 Lookup Table?</Heading>
            <p>An HL7 lookup table is a reference tool that provides a detailed description of each segment type and its corresponding fields. It is a valuable resource for healthcare professionals and IT experts who need to understand the structure and content of HL7 messages. The lookup table also serves as a crosswalk between HL7 2.x and HL7 FHIR, which is the latest version of the HL7 standard.</p>
        </div>
    )
}