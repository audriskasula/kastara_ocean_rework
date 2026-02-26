import React from 'react'
import AgentContact from './AgentContact'

export default function page() {
  return (
    <div className=''>
      <div className='text-center background2'>
        <div className='px-35 py-35'>
          <p className='text-5xl md:text-7xl font-semibold mb-7'>Contact</p>
          <p className='px-5 md:px-20'>Punya pertanyaan? Kami siap bantu. Hubungi tim kami untuk bantuan yang sesuai dengan kebutuhanmu. Kami akan merespons dalam 24 jam.</p>
        </div>
      </div>

      <div className='mx-5 mt-20 md:px-20'>
        <div>
          <h3 className='mb-3 uppercase'>Kontak Kami</h3>
          <h1 className='text-5xl font-semibold mb-7'>Kami ada untuk anda</h1>
          <p>Jika Anda ingin menghubungi kami, kami akan senang mendengar pendapat Anda! Kami siap merespon dalam 24 jam.</p>
        </div>
        <div>
          <AgentContact />
        </div>
      </div>
    </div>
  )
}