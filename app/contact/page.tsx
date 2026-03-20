import React from "react";
import AgentContact from "./AgentContact";

export default function Contact() {
  return (
    <div>
      <div className="text-center background2">
        <div className="px-6 md:px-20 lg:px-35 py-20 md:py-35">
          <p className="text-4xl md:text-5xl lg:text-7xl font-semibold mb-5 md:mb-7">
            Contact
          </p>
          <p className="px-4 md:px-20 text-base md:text-lg">
            Punya pertanyaan? Kami siap bantu. Hubungi tim kami untuk bantuan
            yang sesuai dengan kebutuhanmu. Kami akan merespons dalam 24 jam.
          </p>
        </div>
      </div>

      <div className="mx-5 mt-14 md:mt-20 md:px-20">
        <div>
          <h3 className="mb-3 uppercase text-gray-500">Kontak Kami</h3>
          <h1 className="text-3xl md:text-5xl font-semibold mb-5 md:mb-7">
            Kami ada untuk anda
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Jika Anda ingin menghubungi kami, kami akan senang mendengar pendapat
            Anda! Kami siap merespon dalam 24 jam.
          </p>
        </div>
        <div>
          <AgentContact />
        </div>
      </div>
    </div>
  );
}