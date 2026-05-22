import Link from 'next/link';

export default function NovapackPage() {
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
        {/* TITRE */}
        <h1 className="text-4xl font-bold mb-10">
          Novapack
        </h1>

        {/* CONTENU PRINCIPAL */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex gap-10 items-start">
          {/* TEXTE */}
          <div className="w-2/3">
            <p className="text-lg leading-8 mb-6">
              <strong>Novapack</strong> est aussi une filiale de PJ Group. Basé à Bourges (18), créé en 2025.
            </p>

            <p className="text-lg leading-8 mb-6">
             NovaPack c’est un apport de matière premières en fruits (oranges, bananes, pommes, raisins, kiwi etc) qui passent sur nos lignes de production pour être mis en bouteilles produits finis (jus de fruits, rosé, champagne).
            </p>

            <p className="text-lg leading-8 mb-6">
             Pour l'apport de matière premières nous avons un grand nombre de clients primeurs sur la France.
            </p>

            <p className="text-lg leading-8 mb-6">
             Et pour l'expédition nous ravitaillons plusieurs enseigne de supermarchés français ainsi que quelques clients frontaliers.
             Avec tout ça nous organisons les frets avec le partenariat B2F
            </p>

            <p className="text-lg leading-8">
              Cordialement, 
              Damien NOVAPACK
            </p>
          </div>

          {/* IMAGE */}
          <div className="w-1/3">
            <img
              src="/logos/Nova_pack_V1_SF.png"
              alt="Novapack"
              className="w-full max-h-[400px] object-contain"
            />
          </div>
        </div>

        {/* BOUTON RETOUR */}
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