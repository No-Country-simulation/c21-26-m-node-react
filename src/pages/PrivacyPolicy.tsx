import React from "react";
import { CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";

const PrivacyPolicy: React.FC = () => {
  return (
    <main className="p-4 md:px-8 lg:px-12 min-h-screen gap-10 flex flex-col mt-10">
      <h1 className="text-4xl font-bold">Privacy Policy - MEDIXX</h1>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="mb-4">
          MEDIXX is a platform designed to serve as an intermediary between
          patients and doctors. Our platform allows patients to maintain and
          store their medical history securely. Doctors and patients contribute
          to this medical history, which is encrypted and adheres to data
          treatment regulations.
        </p>
        <p className="mb-4">
          Patients have full control over their medical data and can export it
          for use with other healthcare providers. MEDIXX complies with
          international privacy laws, ensuring that your data is protected.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Fees and Services</h2>
        <p className="mb-4">
          As part of our service, MEDIXX charges a platform fee in the following
          scenarios:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>When users reserve a doctor's time.</li>
          <li>When payments for consultations are processed.</li>
          <li>
            Doctors can pay to expedite the review and approval process of their
            profiles.
          </li>
          <li>
            Doctors may also pay for enhanced visibility within their specialty
            or location on the platform.
          </li>
        </ul>
        <p className="mb-4">
          MEDIXX also offers the ability to hire doctors from different parts of
          the world, providing a global network of medical professionals at your
          fingertips.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          Data Security and Encryption
        </h2>
        <p className="mb-4">
          All medical data stored on MEDIXX is encrypted and handled in
          compliance with data protection laws (such as HIPAA, GDPR, etc.). We
          prioritize the security of your personal health information and ensure
          that only authorized personnel have access to it.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Exporting Your Data</h2>
        <p className="mb-4">
          Patients have the right to export their medical records at any time.
          This functionality allows users to share their history with other
          healthcare providers or systems as needed.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Disclaimer - AI Chatbot</h2>
        <p className="mb-4">
          MEDIXX offers an AI-powered chatbot designed to assist users in
          identifying the appropriate type of specialist for their medical
          concerns. However, this chatbot is not intended to replace a clinical
          diagnosis or treatment by a licensed healthcare provider.
        </p>
        <p className="mb-4">
          The chatbot provides guidance based on general information, but for
          any medical conditions or emergencies, users must always consult with
          a qualified doctor.
        </p>
        <p className="mb-4">
          In jurisdictions where it is not illegal, we recommend using the
          chatbot to help determine which category of healthcare provider to
          contact.
        </p>
      </section>

      <CardFooter className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="text-white">View Terms and Conditions</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Terms and Conditions</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              By using MEDIXX, you agree to our terms and conditions. MEDIXX is
              not responsible for medical advice given by doctors through our
              platform. We provide a platform for interaction and facilitate
              appointments, but medical consultations and treatments are the
              responsibility of the healthcare provider.
            </DialogDescription>
            <Button className="mt-4 text-white">Accept Terms</Button>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </main>
  );
};

export default PrivacyPolicy;
