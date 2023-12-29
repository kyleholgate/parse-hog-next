import HL7Parser from "@/app/components/forms/HL7ParserForm";
import Heading from "@/app/components/ui/Heading";

export const metadata = {
    title: 'HL7 Parser and Message Viewer',
    description: 'Parse HL7 messages online for free! View HL7 messages and understand what exactly is in your HL7 message.',
}

export default function Page() {
    return (
        <div className="text-lg">
            <Heading level={1}>HL7 Parser / HL7 Message Viewer</Heading>
            <p>
                This HL7 parser utilizes HL7 2.8.1 definitions which are backwards compatible with all HL7 2.X versions. After parsing a message you can easily navigate the message by hovering over a field or expanding the definition table. This lets you easily parse, read, and view HL7 messages.
            </p>
            <p>
                Please note, <b>we do not store any data</b> from this parser. In fact, no data is sent to our servers at all. This is a client-side only application.
            </p>
            <p>
                Paste in a message below or choose from a sample message to parse.
            </p>
            <HL7Parser />
            <Heading level={2}>Quick Guide to Reading an HL7 Message</Heading>
            <p>Health Level 7 (HL7) messages are a standard format for the exchange of electronic health information. Here's a quick guide to help you understand and read these messages effectively.
            </p>
            <Heading level={3}>Understanding the Structure of HL7 Messages</Heading>
            <p>An HL7 message is composed of a heirarchy of segments, fields, components, and subcomponents. Here's a quick breakdown of each of these:</p>
            <ul className="list-disc ps-6">
                <li><strong>Segments</strong>: HL7 messages are composed of segments, each serving a specific purpose. Segments start with a three-letter code identifying their type (e.g., MSH for Message Header).</li>
                <li><strong>Fields</strong>: Each segment is further divided into fields, separated by a delimiter (usually a pipe |). Fields contain the actual data.</li>
                <li><strong>Components and Subcomponents</strong>: Fields can be broken down into components (separated by a caret ^) and subcomponents (separated by an ampersand &).</li>
                <li><strong>Repetition</strong>: A tilde ~ is used to separate repeated fields.</li>
                <li><strong>Escape Characters</strong>: Certain characters, like ^, &, and ~, are used for special formatting. To use these as data, they are preceded by an escape character (\).</li>
            </ul>
            <Heading level={3}>Reading HL7 Messages</Heading>
            <ul className="list-disc ps-6">
                <li>
                    <strong>Identify the Segment Types:</strong>
                    Look at the first three letters of each line. For example, MSH (Message Header), PID (Patient Identification), OBR (Observation Request), etc.
                </li>
                <li>
                    <strong>Read the Message Header (MSH):</strong>
                    This segment contains meta-information about the message, like the sending and receiving application, date/time of message, and message type.
                </li>
                <li>
                    <strong>Understand Fields in Each Segment:</strong>
                    Refer to the HL7 standards for detailed descriptions of each field in a segment. For example, in the PID segment, the patient's name, date of birth, and patient ID are included.
                </li>
                <li>
                    <strong>Follow the Sequence:</strong>
                    HL7 messages have a typical flow, usually starting with the MSH segment, followed by patient information (PID), and then clinical data segments like OBR.
                </li>
                <li>
                    <strong>Look for Key Clinical Data:</strong>
                    In segments like OBR (laboratory order information) or OBX (observation/result), you can find the most relevant clinical data.
                </li>
                <li>
                    <strong>Check for Repeated Fields or Multiple Entries:</strong>
                    Some segments may repeat or contain multiple sets of data (like multiple allergies in a single message).
                </li>
                <li>
                    <strong>Note Special Characters and Encoding:</strong>
                    Be aware of escape characters and special formatting, especially in fields containing complex data.
                </li>
            </ul>
            <Heading level={3}>Tips for Effective Reading</Heading>
            <ul className="list-disc ps-6">
                <li>
                    <strong>Use a Reference Guide:</strong>
                    Keep an HL7 specification guide handy for reference to understand what each segment and field represents.
                </li>
                <li>
                    <strong>Use HL7 Parsing Tools:</strong>
                    There are software tools available that can parse HL7 messages for easier reading and analysis.
                </li>
                <li>
                    <strong>Practice with Examples:</strong>
                    Familiarize yourself with various types of HL7 messages by reviewing example messages.
                </li>
            </ul>
        </div >
    )
}