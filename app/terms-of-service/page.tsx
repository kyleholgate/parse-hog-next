import Heading from "@/app/components/ui/Heading";

export const metadata = {
    title: 'Terms of Service',
    description: '',
}

export default function Page() {
    return (
        <div className="text-lg">
            <Heading level={1}>Terms of Service</Heading>
            <p>Welcome to ParseHog.com. We provide a specialized HL7 parser and information regarding healthcare data standards for healthcare professionals. By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions.</p>
            <Heading level={2}>User Responsibilities</Heading>
            <p>Users of ParseHog.com agree to use the HL7 parser and information provided for lawful purposes only. Users must respect copyright and data privacy laws and must not use the service for any unauthorized or illegal activities.</p>

            <Heading level={2}>Data Privacy and Security</Heading>
            <p>Your privacy is important to us. We are committed to protecting the security of your data and store no healthcare data submitted to the site. ParseHog is not responsible for any data breaches or leakages associated with your use of the site.</p>

            <Heading level={2}>Limitation of Liability</Heading>
            <p>ParseHog.com provides information and a parsing tool on an "as is" basis. We are not liable for any decisions or actions taken based on the information or tools provided. Users are responsible for the implications of using data obtained from our service.</p>

            <Heading level={2}>Intellectual Property Rights</Heading>
            <p>All content, tools, and resources on ParseHog.com are the intellectual property of the website and are protected by law. Unauthorized use of our resources may be subject to legal action.</p>

            <Heading level={2}>Termination and Modification</Heading>
            <p>ParseHog.com reserves the right to modify or discontinue the service with or without notice. We may also terminate your access to our services for any breach of these terms.</p>

            <Heading level={2}>Governing Law and Dispute Resolution</Heading>
            <p>These terms shall be governed by the laws of Pennsylvania. Any disputes related to these terms will be resolved in the courts of Pennsylvania.</p>

            <Heading level={2}>Acceptance of Terms</Heading>
            <p>By using ParseHog.com, you signify your acceptance of these terms and conditions. If you do not agree, please do not use our services.</p>

            <Heading level={2}>Amendments to Terms</Heading>
            <p>We reserve the right to amend these terms at any time. Continued use of the website after any such changes constitutes your consent to such changes.</p>
        </div>
    )
}

