import ContactForm from "@/components/Contact/ContactForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have questions or need assistance? We're here to help! Reach out to us for support, inquiries, or feedback. Connect with Findora and let us know how we can assist you.",
};

const Contact = () => {
  return (
    <div>
      <ContactForm />
    </div>
  );
};

export default Contact;
