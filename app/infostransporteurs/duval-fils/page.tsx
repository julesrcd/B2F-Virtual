import Link from 'next/link';

export default function DuvalFilsPage() {
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
          Duval & Fils Transport
        </h1>

        {/* CONTENU PRINCIPAL */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex gap-10 items-start">
          {/* TEXTE */}
          <div className="w-2/3">
            <p className="text-lg leading-8 mb-6">
              <strong>Duval & Fils</strong> est une entreprise de transport et d'une petite logistique situé à Cossé Le Vivien. L'entreprise à été crée en 2023 par  Timéo & Enzo, deux frères qui souhaite réaliser leurs rêves et partager leur passion. 
            </p>

            <p className="text-lg leading-8 mb-6">
              Notre activité principal est le transport de produits alimentaires en frigo et tautliner, nous avons aussi une activité transport de matériaux et plus récemment transport de céréales en benne.
            </p>

            <p className="text-lg leading-8 mb-6">
              Pour ce faire nous disposons de deux véhicules moteurs, un Scania T770 et un Scania S540, et quatre semis, une benne Stas et une Bizien ainsi que une Kogel et une citerne à carburant. 

            </p>

            <p className="text-lg leading-8">
              Cordialement, 
              L'équipe Duval & Fils
            </p>
          </div>

          {/* IMAGE */}
          <div className="w-1/3">
            <img
              src="/logos/dft_logo.png"
              alt="Duval & Fils"
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