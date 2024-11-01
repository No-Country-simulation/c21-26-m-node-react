import React from "react";
import { Button } from "../components/ui/button"; // Importing button for CTA

const Pricing: React.FC = () => {
  return (
    <main className="p-4 md:px-8 lg:px-12 min-h-screen gap-10 flex flex-col mt-10">
      <h1 className="text-4xl font-bold mb-6">Pricing - MEDIXX</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Commission Fees</h2>
        <p className="mb-4">
          MEDIXX charges a 20% commission on every consultation. This includes:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            5% fee on the consultation fee (e.g., 30-minute consultation with a
            spine specialist for $300).
          </li>
          <li>15% fee on the reservation fee (e.g., $20 reservation fee).</li>
        </ul>
        <p className="mb-4">
          For example, if you book a 30-minute consultation with a spine doctor
          for $300 and the reservation fee is $20, the breakdown is:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Consultation: $300, with a 5% fee of $15.</li>
          <li>Reservation: $20, with a 15% fee of $3.</li>
          <li>Total fees: $18 (added to the final price).</li>
        </ul>
        <p className="mb-4">
          The final cost for the patient would be $318, which includes the
          consultation and reservation fees plus our service charges.
        </p>
        <Button className="text-white mt-4">Book a Consultation</Button>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Doctor Profile Promotion
        </h2>
        <p className="mb-4">
          MEDIXX offers doctors the option to promote their profiles for greater
          visibility within their specialty. The cost of promoting a profile
          will depend on factors such as:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>The level of competition in the doctor's specialty.</li>
          <li>The geographic location and demand for specialists.</li>
        </ul>
        <p className="mb-4">
          Our pricing for promotions is determined by an internal algorithm or
          set by our team based on these factors. For high-demand specialties
          with significant competition, the cost of promotion may be higher. For
          less competitive fields, the pricing will be more affordable.
        </p>
        <p className="mb-4">
          If you are a doctor looking to increase your visibility and grow your
          patient base, please contact our support team for more information on
          how to promote your profile.
        </p>
        <Button className="text-white mt-4">Promote Your Profile</Button>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Additional Services</h2>
        <p className="mb-4">
          In addition to regular consultations and promotions, MEDIXX offers
          other features that may have separate costs, such as expedited profile
          reviews for doctors, and custom solutions for clinics.
        </p>
        <Button className="text-white mt-4">
          Contact Us for Custom Solutions
        </Button>
      </section>
    </main>
  );
};

export default Pricing;
