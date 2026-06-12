'use client';

import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

type User = {
  prenom: string;
  entreprise: string;
  email: string;
};

export default function InfosTransporteurs() {
  const [user, setUser] = useState<User | null>(null);

useEffect(() => {
  const getUser = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      setUser(null);
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profile) {
      setUser({
        prenom: profile.prenom,
        entreprise: profile.entreprise,
        email: profile.email,
      });
    }
  };

  getUser();
}, []);

  return (
    <div className="bg-[#CECECE] text-black min-h-screen">
      {/* HEADER */}
      <header className="bg-[#0073B5] text-white flex justify-between items-center px-6 h-18">
  {/* LOGO */}
  <div className="flex items-center gap-5">
    <img
      src="/B2F_VIRTUAL_SF.png"
      alt="logo"
      className="h-28 w-28 object-contain"
    />
    <div className="font-bold"></div>
  </div>

  {/* MENU CENTRÉ */}
  <nav className="flex gap-6 mx-auto">
    <Link href="/" className="hover:underline">
      Bourse de fret
    </Link>

    <Link href="/infostransporteurs" className="hover:underline font-bold">
      Infos transporteurs
    </Link>

    <Link href="/mes-frets" className="hover:underline ">
      Mes frets
    </Link>
  </nav>

  {/* PROFIL À DROITE */}
  <div className="flex items-center gap-3 relative">
    <label className="cursor-pointer">
      <input type="file" className="hidden" />
      <img
        src="/default-avatar.png"
        alt="Profil"
        className="w-10 h-10 rounded-full object-cover border"
      />
    </label>

   <div className="text-sm leading-tight text-right">
  <div className="font-bold">
  {user?.prenom || "Prenom"}
   </div>

   <div className="text-xs opacity-80">
    {user?.entreprise || "Entreprise"}
    </div>
   </div>
  </div>
</header>

      {/* CONTENU */}
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-8">
          Infos transporteurs
        </h1>

        {/* Grille de logos : 3 logos par ligne */}
<div className="grid grid-cols-3 gap-8">
  <Link
  href="/infostransporteurs/pj-logistic"
  className="block"
>
  <img
    src="/logos/pj_log_v1_sf.png"
    alt="PJ Logistic"
    className="w-full h-52 object-contain cursor-pointer hover:scale-105 transition"
  />
</Link>

<Link
  href="/infostransporteurs/pj-agro-service"
  className="block"
>
  <img
    src="/logos/pj_agro_sf.png"
    alt="PJ AGRO SERVICE"
    className="w-full h-58 object-contain -mt-12 cursor-pointer hover:scale-105 transition"
  />
</Link>

<Link
  href="/infostransporteurs/pj-kig"
  className="block"
>
  <img
    src="/logos/pjkig.png"
    alt="PJ KIG"
   className="w-full h-64 object-contain -mt-12 cursor-pointer hover:scale-105 transition"
  />
</Link>

<Link
  href="/infostransporteurs/novapack"
  className="block"
>
  <img
    src="/logos/Nova_pack_V1_SF.png"
    alt="NOVAPACK"
    className="w-full h-28 object-contain cursor-pointer hover:scale-105 transition"
  />
</Link>

  <Link
    href="/infostransporteurs/duval-fils"
    className="block"
  >
    <img
      src="/logos/dft_logo.png"
      alt="Duval & Fils"
      className="w-full h-54 object-contain cursor-pointer hover:scale-105 transition"
    />
  </Link>

  <Link
    href="/infostransporteurs/bj-transport"
    className="block"
  >
    <img
      src="/logos/bj_transport_sf.png"
      alt="BJ TRANSPORT"
      className="w-full h-54 object-contain -mt-0 cursor-pointer hover:scale-105 transition"
    />
  </Link>

  <Link
    href="/infostransporteurs/agritrans"
    className="block"
  >
    <img
      src="/logos/Agritrans_SF.png"
      alt="AgriTrans"
      className="w-full h-54 object-contain cursor-pointer hover:scale-105 transition"
    />
  </Link>

<Link
    href="/infostransporteurs/trans-express-51"
    className="block"
  >
  <img
    src="/logos/transexpress'51_sf.png"
    alt="Trans Express 51"
    className="w-full h-82 object-contain -mt-16 cursor-pointer hover:scale-105 transition"
  />
</Link>

<Link
    href="/infostransporteurs/r-pellerin"
    className="block"
  >
  <img
  src="/logos/LOGO_R.PLN_SF.png"
  alt="R.Pellerin Transport"
  className="w-full h-84 object-contain -mt-22 cursor-pointer hover:scale-105 transition"
/>
</Link>

<Link
    href="/infostransporteurs/rosero"
    className="block"
  >
  <img
    src="/logos/logo_rosero_vache_2.png"
    alt="Rosero International"
    className="w-full h-66 object-contain -mt-12 cursor-pointer hover:scale-105 transition"
  />
</Link>

<Link
    href="/infostransporteurs/louna-chevalier-transport"
    className="block"
  >
  <img
    src="/logos/louna_transports.png"
    alt="Louna Chevalier Transport"
    className="w-full h-58 object-contain -mt-16 cursor-pointer hover:scale-105 transition"
  />
</Link>

<Link
    href="/infostransporteurs/transport-logistique-clermontoise"
    className="block"
  >
  <img
    src="/logos/TLC_SF.png"
    alt="Transport Logistique Clermontoise"
    className="w-full h-78 object-contain -mt-18 cursor-pointer hover:scale-105 transition"
  />
</Link>

<Link
    href="/infostransporteurs/mdtrans"
    className="block"
  >
  <img
    src="/logos/MdTrans_SF.png"
    alt="MdTrans"
    className="w-full h-38 object-contain cursor-pointer hover:scale-105 transition"
  />
  </Link>
</div>
      </div>
    </div>
  );
}