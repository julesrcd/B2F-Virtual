import Link from 'next/link';

export default function BjTransportPage() {
  return (
    <div className="bg-[#CECECE] text-black min-h-screen">
      {/* HEADER */}
      <header className="bg-[#0073B5] text-white flex justify-between items-center px-6 h-18">
        {/* LOGO B2F */}
        <div className="flex items-center gap-5">
          <img
            src="/B2F_VIRTUAL_SF.png"
            alt="logo"
            className="h-28 w-28 object-contain"
          />
        </div>

        {/* NAVIGATION */}
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

        {/* PROFIL */}
        <div className="flex items-center gap-3">
          <label className="cursor-pointer">
            <input type="file" className="hidden" />
            <img
              src="/default-avatar.png"
              alt="Profil"
              className="w-10 h-10 rounded-full object-cover border"
            />
          </label>

          <div className="text-sm leading-tight">
            <div className="font-bold">Prenom</div>
            <div className="text-xs opacity-80">Entreprise</div>
          </div>
        </div>
      </header>

      {/* CONTENU */}
      <div className="p-10">
        <h1 className="text-4xl font-bold mb-10">
          BJ TRANSPORT
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8 flex gap-10 items-start">
          {/* TEXTE */}
          <div className="w-2/3">
            <p className="text-lg leading-8 mb-6">
              <strong>BJ TRANSPORT</strong> est une entreprise de transport et d'une logistique situé à Plélo (Côtes-d'Armor en Bretagne). L'entreprise à été crée en 2026 par Jordan.
            </p>

            <p className="text-lg leading-8 mb-6">
              L'activité principal est le transport de produits alimentaires en frigo, je possède aussi une logistique autour de la boissons.
            </p>

            <p className="text-lg leading-8 mb-6">
             Pour ce faire, je dispose d'un Scania S620 V8 accompagné d'une Chereau
            </p>

            <p className="text-lg leading-8">
              Cordialement, 
              BJ Transport
            </p>
          </div>

          {/* IMAGE */}
          <div className="w-1/3">
            <img
              src="/logos/bj_transport_sf.png"
              alt="BJ TRANSPORT"
              className="w-full max-h-[400px] object-contain"
            />
          </div>
        </div>

        {/* RETOUR */}
        <div className="mt-8">
          <Link
            href="/infostransporteurs"
            className="bg-[#0073B5] text-white px-6 py-3 rounded-lg hover:bg-[#005d93] transition"
          >
            ← Retour aux transporteurs
          </Link>
        </div>
      </div>
    </div>
  );
}