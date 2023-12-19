'use client'

import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [nav, setNav] = useState(false);

    const links = [
        {
            id: 1,
            link: "/hl7/parser",
            text: "HL7 Parser",
        },
        {
            id: 2,
            link: "/about",
            text: "About",
        },
    ];

    return (
        <div className="flex justify-between items-center w-full h-16 px-10 mb-4 text-white bg-black nav">
            <div>
                <a
                    className="link-underline link-underline-black"
                    href="/"
                >
                    <img
                        src="/parse-hog-white.webp"
                        alt="Parse Hog Logo"
                        style={{ maxWidth: "3.5rem" }}
                    />
                </a>
            </div>

            <ul className="hidden md:flex">
                {links.map(({ id, link, text }) => (
                    <li
                        key={id}
                        className="nav-links px-4 cursor-pointer font-medium text-gray-300 hover:scale-105 hover:text-white duration-100 link-underline"
                    >
                        <Link href={link}>{text}</Link>
                    </li>
                ))}
            </ul>

            <div
                onClick={() => setNav(!nav)}
                className="cursor-pointer pr-4 z-10 text-gray-300 md:hidden"
            >
                {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
            </div>

            {nav && (
                <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-900 text-gray-300">
                    {links.map(({ id, link, text }) => (
                        <li
                            key={id}
                            className="px-4 cursor-pointer py-6 text-4xl"
                        >
                            <Link onClick={() => setNav(!nav)} href={link}>
                                {text}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Navbar;