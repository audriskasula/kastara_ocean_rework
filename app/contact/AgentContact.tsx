/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'

export default function AgentContact() {
    return (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-5 mt-5'>
            {nomorTelp.map((item, index) => (
                <Link href={item.link} target='_blank' className="rounded-3xl bg-[#F5FFFD] shadow-2xl hover:scale-[1.04] transition-all ease-in-out" key={index}>
                    <div className="px-6 py-9 flex justify-center items-center flex-col">
                        <img src={item?.gender === "female" ? '/femaleAvatar.svg' : '/maleAvatar.svg'} alt="" className='mb-5' />
                        <p className='text-xl font-semibold text-center'>{item?.nama}</p>
                        <p className='text-center'>{item?.nomor}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

const nomorTelp = [
    {
        nama: 'Mr Bastian',
        nomor: '0822-2087-9544',
        gender: 'male',
        link: 'https://api.whatsapp.com/send/?phone=6282220879544'
    },
    {
        nama: 'Miss Ersa',
        nomor: '0895-4230-05119',
        gender: 'female',
        link: 'https://api.whatsapp.com/send/?phone=62895423005119'
    },
    {
        nama: 'Miss Valis',
        nomor: '0882-0032-09563',
        gender: 'female',
        link: 'https://api.whatsapp.com/send/?phone=62882003209563'
    },
    // {
    //     nama: 'Ribka',
    //     nomor: '0812 8070 0776',
    //     gender: 'female',
    //     link: 'https://api.whatsapp.com/send/?phone=6281280700776'
    // },
    // {
    //     nama: 'Joseph',
    //     nomor: '0819 1700 2126',
    //     gender: 'male',
    //     link: 'https://api.whatsapp.com/send/?phone=6281917002126'
    // },
]