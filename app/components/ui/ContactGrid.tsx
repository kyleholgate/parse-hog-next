import SocialMediaCard from "@/app/components/ui/SocialMediaCard";
import { TbBrandTwitter, TbBrandLinkedin, TbBrandGmail } from "react-icons/tb";


const ContactGrid = () => {
    return (
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
    );
};

export default ContactGrid;