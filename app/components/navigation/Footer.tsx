import Link from "next/link"

export default function Component() {
    return (
        <footer className="mt-12 py-4 px-6 border-t">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h2 className="text-xl font-bold mb-2">About ParseHog</h2>
                        <p className="text-sm text-gray-500">
                            ParseHog is an independant, U.S.-based website that provides tools for healthcare data professionals. No data is saved, stored, or shared.
                        </p>
                        <ul className="space-y-2">
                            <li>
                                <Link className="underline text-sm text-gray-500 hover:text-gray-900" href="#">
                                    More Info
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-2">Policies</h2>
                        <ul className="space-y-2">
                            <li>
                                <Link className="underline text-sm text-gray-500 hover:text-gray-900" href="/privacy-policy">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link className="underline text-sm text-gray-500 hover:text-gray-900" href="/terms-of-service">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-2">Contact Us</h2>
                        <ul className="space-y-2">
                            <li>
                                <Link className="underline text-sm text-gray-500 hover:text-gray-900" href="#">
                                    Support
                                </Link>
                            </li>
                            <li>
                                <Link className="underline text-sm text-gray-500 hover:text-gray-900" href="#">
                                    Sales
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

