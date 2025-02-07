import Heading from "@/components/ui/Heading";
import ContactGrid from "@/components/ui/ContactGrid";


export const metadata = {
    title: 'Contact',
    description: '',
}

export default function Page() {
    return (
        <div className="text-lg">
            <Heading level={1}>Contact</Heading>
            <p>
                If you have any questions, comments, or suggestions, please reach out to me on any of the following platforms.
            </p>
            <ContactGrid />
        </div >
    )
}