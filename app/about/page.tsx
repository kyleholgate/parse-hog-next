import Heading from "@/app/components/ui/Heading";
import SocialMediaCard from "@/app/components/ui/SocialMediaCard";
import { TbBrandTwitter, TbBrandLinkedin, TbBrandGmail } from "react-icons/tb";


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
            <div className="container mx-auto px-4 pt-6">
                <div className="grid md:grid-cols-3 gap-6 place-items-center">
                    {/* Render two SocialMediaCard components with example props */}
                    <SocialMediaCard
                        icon={<TbBrandTwitter />}
                        headingText="@KyleHolgate"
                        href="https://twitter.com/KyleHolgate"
                        buttonText="Connect on Twitter"
                        descriptionText="(Someday) sharing my experiments."
                    />
                    <SocialMediaCard
                        icon={<TbBrandLinkedin />}
                        headingText="Kyle Holgate"
                        href="https://www.linkedin.com/in/kyleholgate/"
                        buttonText="Connect on LinkedIn"
                        descriptionText="Building your professional network?"
                    />
                    <SocialMediaCard
                        icon={<TbBrandGmail />}
                        headingText="kyle.holgate@gmail.com"
                        href="mailto:kyle.holgate@gmail.com"
                        buttonText="Send me an email"
                        descriptionText="Not social? Send me an email."
                    />
                </div>
            </div>





        </div >
    )
}