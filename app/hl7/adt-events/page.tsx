import Heading from "@/app/components/ui/Heading";
import { ADTCodes } from "@/app/models/HL7Definitions";

export const metadata = {
    title: 'ADT Event Codes',
    description: '',
}

export default function Page() {
    return (
        <div className="text-lg">
            <Heading level={1}>ADT Events</Heading>
            <div>
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Code</th>
                            <th className="px-4 py-2">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(ADTCodes).map(([code, description]) => (
                            <tr key={code}>
                                <td className="border px-4 py-2">{code}</td>
                                <td className="border px-4 py-2">{description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}