import Heading from "@/components/ui/Heading";
import ContactGrid from "@/components/ui/ContactGrid";


export const metadata = {
    title: 'About ParseHog',
    description: '',
}

export default function Page() {
    return (
        <div className="text-lg">
            <Heading level={1}>About ParseHog</Heading>
            <p>
                ParseHog is solely created by me, Kyle Holgate. After working with HL7 messages for ~10 years, I always wanted to build a tool that helps quickly parse HL7 messages or look up HL7 fields. Many solutions or the market today are clunky or expensive desktop apps. I wanted to build a tool that was free, fast, and easy to use.
            </p>
            <p>
                If you've enjoyed using ParseHog or have ideas for new features, please reach out to me. I'd love to hear from you!
            </p>
            <ContactGrid />
        </div >
    )
}