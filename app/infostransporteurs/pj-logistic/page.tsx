import Link from 'next/link';

export default function PJLogisticPage() {
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
          PJ Logistic
        </h1>

        {/* CONTENU PRINCIPAL */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex gap-10 items-start">
          {/* TEXTE */}
          <div className="w-2/3">
            <p className="text-lg leading-8 mb-6">
              <strong>📦PJ Log</strong> est l’une des filiales de PJ Group. Située à Plelo (22), l’entreprise est spécialisée dans la gestion logistique, le stockage et l’organisation des flux de marchandises.
            </p>

            <p className="text-lg leading-8 mb-6">
             Nous assurons le stockage de différents types de produits ainsi que la préparation et le suivi des expéditions pour plusieurs partenaires et clients professionnels.
            </p>

            <p className="text-lg leading-8 mb-6">
              🚛 PJ Log ne dispose pas de sa propre flotte de transport.
              Les opérations de transport sont principalement réalisées par la filiale PJ Transport, partenaire de PJ Group.
            </p>

            <p className="text-lg leading-8 mb-6">
              Selon les besoins logistiques et les volumes à traiter, nous pouvons également faire appel à des transporteurs partenaires via la bourse de fret B2F.
            </p>

            <p className="text-lg leading-8 mb-6">
              🤝 Grâce à une organisation flexible et réactive, PJ Log accompagne ses partenaires avec des solutions adaptées aux besoins du secteur logistique et industriel.
            </p>

            <p className="text-lg leading-8">
              Cordialement, 
              Jason PJ Log
            </p>
          </div>

          {/* IMAGE */}
          <div className="w-1/3">
            <img
              src="/logos/pj_log_v1_sf.png"
              alt="PJ Logistic"
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