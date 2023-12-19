import HL7Parser from "@/app/components/forms/HL7ParserForm";
import Heading from "@/app/components/ui/Heading";

export const metadata = {
    title: 'HL7 Parser and Message Viewer',
    description: 'Parse HL7 messages online for free! View HL7 messages and understand what exactly is in your HL7 message.',
}

export default function Page() {
    return (
        <div>
            <Heading level={1} text="HL7 Parser / HL7 Message Viewer" />
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
        </div >
    )
}