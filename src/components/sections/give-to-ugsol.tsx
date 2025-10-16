import React from 'react';

const GIVE_TO_UGSOL_IMAGE = '/give-to-ugsol-flyer.jpg.jpeg';

export const GiveToUGSoLSection: React.FC = () => (
  <section className="w-full bg-[#f7f9fc] py-12 flex justify-center px-4" id="give-to-ugsol">
    <div className="flex flex-col md:flex-row items-center justify-center max-w-5xl w-full gap-10">
      <div className="max-w-xl w-full flex-shrink-0">
        <img
          src={GIVE_TO_UGSOL_IMAGE}
          alt="Give to UGSoL Flyer"
          className="rounded-xl shadow-md w-full h-auto object-contain"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col items-center md:items-start w-full md:max-w-lg">
        <h2 className="text-3xl font-bold text-primary mb-2 text-center md:text-left">Give to UGSOL</h2>
        <p className="text-lg max-w-xl mb-6 text-muted-foreground text-center md:text-left">
          Show us some love and support the construction of the new University of Ghana School of Law building!<br />
          Help us realize a modern campus for legal education in Ghana.<br />
          <span className="font-medium">Every donation counts!</span>
        </p>
        <a
          href="tel:*447*7272#"
          className="inline-block px-8 py-3 text-lg font-bold rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 transition duration-150 mb-3"
          style={{ letterSpacing: 2 }}
        >
          *447*7272#
        </a>
        <div className="text-sm text-gray-600">
          <span>#GivetoUGSoL</span>
        </div>
      </div>
    </div>
  </section>
);
