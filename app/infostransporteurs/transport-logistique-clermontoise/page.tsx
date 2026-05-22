import Link from 'next/link';

export default function TransportLogistiqueClermontoisePage() {
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
        <nav className="flex gap-6">
          <Link href="/" className="hover:underline">
            Bourse de fret
          </Link>

          <Link
            href="/infostransporteurs"
            className="hover:underline font-bold"
          >
            Infos transporteurs
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
          Transport Logistique Clermontoise
        </h1>

        {/* CONTENU PRINCIPAL */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex gap-10 items-start">
          {/* TEXTE */}
          <div className="w-2/3">
            <p className="text-lg leading-8 mb-6">
              <strong>Transport Logistique Clermontoise</strong> est comme son nom l'indique basé a Clermont Ferrand.
            </p>

            <p className="text-lg leading-8 mb-6">
             Géré par Killian qui est le seul salarié de cette entreprise par choix, de servir ces clients avec rapidité et qualité.
            </p>

            <p className="text-lg leading-8 mb-6">
               Desservant principalement la France, L'Espagne et L'Italie mais toujours ouvert a nouveaux horizon transports en tauliner complet ou groupages, une partie frigo devrais finir par voir le jour 🙂.
            </p>

            <p className="text-lg leading-8">
              Cordialement, 
              Killian TLC
            </p>
          </div>

          {/* IMAGE */}
          <div className="w-1/3">
            <img
              src="/logos/TLC_SF.png"
              alt="Transport Logistique Clermontoise"
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