import Heading from "@/app/components/ui/Heading";
import SocialMediaCard from "@/app/components/ui/SocialMediaCard";
import { TbBrandTwitter, TbBrandLinkedin } from "react-icons/tb";


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

            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-4">
                    {/* Render two SocialMediaCard components with example props */}
                    <SocialMediaCard
                        icon={<TbBrandTwitter />}
                        headingText="@KyleHolgate"
                        buttonText="Connect on LinkedIn"
                        descriptionText="Your Success is Our Business - Business Services - 500+ employees"
                    />
                    <SocialMediaCard
                        icon={<TbBrandLinkedin />}
                        headingText="Kyle Holgate"
                        buttonText="Connect on LinkedIn"
                        descriptionText="Your Success is Our Business - Business Services - 500+ employees"
                    />
                </div>
            </div>





        </div >
    )
}