import Heading from "@/app/components/ui/Heading";
import { ADTCodes } from "@/app/models/HL7Definitions";

export const metadata = {
    title: 'ADT Event Codes',
    description: '',
}

export default function Page() {
    return (
        <div className="text-lg">
            <Heading level={1}>HL7 ADT Events</Heading>
            <p>
                HL7 ADT (Admission, Discharge, Transfer) event codes are a crucial component of the Health Level Seven International (HL7) standards, which play a pivotal role in the healthcare industry's information exchange. These codes specifically facilitate the effective communication of patient admission, discharge, and transfer information between various healthcare systems.
            </p>
            <p>
                These ADT event codes are up to date with HL7 2.8.2 standards. The event code should be sent in <strong>MSH-9.2</strong> and <strong>EVN-1</strong> (if EVN segment is sent).
            </p>
            <div>
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="w-2/12 px-4 py-2 border-b-2 border-gray-200 text-start">Code</th>
                            <th className="w-10/12 px-4 py-2 border-b-2 border-gray-200 text-start">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(ADTCodes).map(([code, description]) => (
                            <tr key={code} className="border-b border-slate-100 even:bg-zinc-100">
                                <td className="w-2/12 px-4 py-2">{code}</td>
                                <td className="w-10/12 px-4 py-2">{description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <Heading level={2}>Most Important ADT Event Codes</Heading>
                <p>While there are over 60 ADT event codes, not all of them have equal significance in modern healthcare systems. Based on my experience, here's a list of the most important ADT event codes to know, and why they're important.</p>
                <ul className="list-disc ps-4">
                    <li><strong>A01</strong>: admiting a patient is key event, and along with it the PV1-44 admit date.</li>
                    <li><strong>A02</strong>: transfering a patient to a new location is important for understanding where patients are. It's also important to understand where the correct transfer date & time is in the message as well - often the EVN-2.</li>
                    <li><strong>A03</strong>: discharging a patient is another key event, and along with it the PV1-45 discharge date.</li>
                    <li><strong>A08</strong>: "update patient information" should be a relatively straightforward and unimportant, but some health information systems use A08's as a sort of "catchall" due to system design or end-user error. For example, an A08 may need to be considered the same as an A08 if the patient location given is different from the previous!</li>
                    <li><strong>A11/A12</strong>: cancel admit & cancel transfers can have big implications downstream if you're working with an application that needs to track patient movements.</li>
                </ul>
            </div>
        </div>
    )
}