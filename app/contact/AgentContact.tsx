import Image from "next/image";
import Link from "next/link";

export default function AgentContact() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5">
      {nomorTelp.map((item, index) => (
        <Link
          href={item.link}
          target="_blank"
          className="rounded-2xl bg-[#F5FFFD] shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300 ease-in-out"
          key={index}
        >
          <div className="px-6 py-8 flex justify-center items-center flex-col">
            <Image
              src={
                item.gender === "female"
                  ? "/femaleAvatar.svg"
                  : "/maleAvatar.svg"
              }
              alt={item.nama}
              width={80}
              height={80}
              className="mb-4"
            />
            <p className="text-lg font-semibold text-center text-gray-800">
              {item.nama}
            </p>
            <p className="text-center text-gray-500">{item.nomor}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

const nomorTelp = [
  {
    nama: "Mr Bastian",
    nomor: "0822-2087-9544",
    gender: "male",
    link: "https://api.whatsapp.com/send/?phone=6282220879544",
  },
  {
    nama: "Miss Ersa",
    nomor: "0895-4230-05119",
    gender: "female",
    link: "https://api.whatsapp.com/send/?phone=62895423005119",
  },
  {
    nama: "Miss Valis",
    nomor: "0882-0032-09563",
    gender: "female",
    link: "https://api.whatsapp.com/send/?phone=62882003209563",
  },
  {
    nama: "Mr Audris",
    nomor: "0812-2147-0700",
    gender: "male",
    link: "https://api.whatsapp.com/send/?phone=6281221470700",
  },
];