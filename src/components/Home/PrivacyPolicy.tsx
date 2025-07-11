"use client"

import { AnimatePresence , motion } from "motion/react";

const PrivacyPolicy = ({setClose} : {setClose : (value : boolean) => void}) => {
    return (<>
        <AnimatePresence>
            <div className="fixed inset-5 z-[2147483647] overflow-y-auto flex h-[90%] justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50"
                    onClick={()=> setClose(false)}
                />
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="relative w-full overflow-y-auto md:max-w-[60%] max-w-[100%] dark:bg-slate-900 gap-2 text-start flex flex-col rounded-2xl bg-white p-8 shadow-xl"
                >
                    <div className="max-w-full overflow-y-auto flex flex-col items-start mx-auto p-6 bg-white text-gray-800">
                        <h1 className="text-4xl font-bold text-center text-blue-500 mb-6">Privacy Policy</h1>
                        <p className="mb-4">
                            <strong>Effective Date:</strong> July 9, 2025
                        </p>
                        <p className="mb-6">
                            <strong>Findora</strong> values your privacy and is committed to protecting your
                            personal information. This Privacy Policy explains how we collect, use,
                            disclose, and safeguard your information when you visit our website{" "}
                            <a
                            href="https://search.findora.ai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800"
                            >
                            search.findora.ai
                            </a>{" "}
                            or use our services.
                        </p>

                        <section className="mb-6">
                            <h2 className="text-2xl font-semibold text-blue-800 mb-3">
                            1. Information We Collect
                            </h2>
                            <p className="mb-3">We may collect the following types of information:</p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>
                                <strong>Personal Identification Information:</strong> Name, email
                                address, phone number, postal address, etc.
                            </li>
                            <li>
                                <strong>Usage Data:</strong> Information about how you use our
                                website or services, including IP address, browser type, pages
                                visited, and time spent.
                            </li>
                            <li>
                                <strong>Cookies and Tracking Technologies:</strong> We use cookies
                                and similar technologies to enhance your experience and collect
                                usage data.
                            </li>
                            </ul>
                        </section>

                        <section className="mb-6">
                            <h2 className="text-2xl font-semibold text-blue-800 mb-3">
                            2. How We Use Your Information
                            </h2>
                            <p className="mb-3">We use your information to:</p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Provide, operate, and maintain our services</li>
                            <li>Improve, personalize, and expand our services</li>
                            <li>
                                Communicate with you, including sending updates, promotions, and
                                support messages
                            </li>
                            <li>Monitor and analyze usage and trends to improve user experience</li>
                            <li>Detect, prevent, and address technical issues and security threats</li>
                            </ul>
                        </section>

                        <section className="mb-6">
                            <h2 className="text-2xl font-semibold text-blue-800 mb-3">
                            3. How We Share Your Information
                            </h2>
                            <p className="mb-3">We do not sell your personal information. We may share your information with:</p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Service providers and partners who assist us in operating our business</li>
                            <li>Legal authorities if required by law or to protect our rights</li>
                            <li>In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
                            </ul>
                        </section>

                        <section className="mb-6">
                            <h2 className="text-2xl font-semibold text-blue-800 mb-3">
                            4. Your Choices and Rights
                            </h2>
                            <p className="mb-3">Depending on your location, you may have the right to:</p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Access, correct, or delete your personal information</li>
                            <li>Object to or restrict certain processing of your data</li>
                            <li>Withdraw consent at any time where processing is based on consent</li>
                            <li>Opt-out of marketing communications</li>
                            </ul>
                            <p>
                            To exercise these rights, please contact us at{" "}
                            <a
                                href="mailto:youremail@example.com"
                                className="text-blue-600 underline hover:text-blue-800"
                            >
                                youremail@example.com
                            </a>
                            .
                            </p>
                        </section>

                        <section className="mb-6">
                            <h2 className="text-2xl font-semibold text-blue-800 mb-3">
                            5. Security of Your Information
                            </h2>
                            <p>
                            We implement appropriate technical and organizational measures to
                            protect your personal data from unauthorized access, disclosure,
                            alteration, or destruction.
                            </p>
                        </section>

                        <section className="mb-6">
                            <h2 className="text-2xl font-semibold text-blue-800 mb-3">
                            6. Children’s Privacy
                            </h2>
                            <p>
                            Our services are not intended for individuals under the age of 13 (or
                            the applicable age in your jurisdiction). We do not knowingly collect
                            personal information from children under this age.
                            </p>
                        </section>

                        <section className="mb-6">
                            <h2 className="text-2xl font-semibold text-blue-800 mb-3">
                            7. Changes to This Privacy Policy
                            </h2>
                            <p>
                            We may update this Privacy Policy from time to time. We will notify
                            you of any changes by posting the new Privacy Policy on this page with
                            an updated effective date.
                            </p>
                        </section>

                        <section className="mb-6">
                            <h2 className="text-2xl font-semibold text-blue-800 mb-3">8. Contact Us</h2>
                            <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
                            <address className="not-italic mt-2 text-gray-700">
                            <strong>Findora</strong>
                            <br />
                            Email:{" "}
                            <a
                                href="mailto:youremail@example.com"
                                className="text-blue-600 underline hover:text-blue-800"
                            >
                                youremail@example.com
                            </a>
                            <br />
                            Address: 123 Your Street, Your City, Your Country
                            </address>
                        </section>

                        <p className="text-sm italic text-gray-600">
                            Note: This is a general template and may not cover all legal
                            requirements applicable to your business or jurisdiction. For full
                            compliance, especially with regulations like GDPR, CCPA, or others,
                            consult with a legal professional.
                        </p>
                        <div className="flex gap-2 w-full items-center justify-center pt-10">
                            <button onClick={()=> setClose(true)} className="py-2 px-3 rounded-full font-semibold text-white bg-blue-500">Accept Cookies</button>
                            <button className="py-2 px-3 rounded-full font-semibold text-blue-500 bg-white border-2 border-blue-500">Manage Cookies</button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    </>);
}
 
export default PrivacyPolicy;