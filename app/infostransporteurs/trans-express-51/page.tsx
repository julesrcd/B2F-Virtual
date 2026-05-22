import Link from 'next/link';

export default function TransExpress51Page() {
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
          Trans-Express' 51
        </h1>

        {/* CONTENU PRINCIPAL */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex gap-10 items-start">
          {/* TEXTE */}
          <div className="w-2/3">
            <p className="text-lg leading-8 mb-6">
             La société <strong>Trans-Express' 51</strong> basé à Reims et à Limoge a été créer en Décembre 2011 sous Euro Truck Simulator 1, depuis ses 14 ans d'existences, Trans Express'51 fait partie maintenant de la Holding LBL Group, qui accueillait auparavant 2 autres sociétés,  Milazena , usine de plat préparé ainsi que Le Petit Marnais , garage poids lourds , toutes deux re-vendue à ce jour.
            </p>

            <p className="text-lg leading-8 mb-6">
             La société se concentre aujourd'hui sur 2 pôles :

             La logistique :
              La gestion globale de palette bac PVC , de l'acheminement , du lavage et de la re-livraison sur site .
              Le stockage et la gestion d'export de champagne Marnais à l'international .
            </p>

            <p className="text-lg leading-8 mb-6">
              Le transport : 
              Avec un parc varié d'un Scania et Volvo torpedo, un Daf XF510, et 2 Scania S560 pour la partie tracteur, nous sommes aussi polyvalent avec 3 tautliners, 3 bi-températures, 2 FMA et 2 bennes céréalieres ainsi qu'une citerne à carburant et une alimentaire pour honoré le partenariat avec AgriTrans.
            </p>

            <p className="text-lg leading-8 mb-6">
             Nous travaillons aussi avec R.Pellerin Transports pour l'export en containers de champagnes stockés sur le site de Reims.
            </p>

            <p className="text-lg leading-8">
              Merci de votre lecture 
              Claude B.
              PDG Holding & Trans Express'51
            </p>
          </div>

          {/* IMAGE */}
          <div className="w-1/3">
            <img
              src="/logos/transexpress'51_sf.png"
              alt="Trans-Express' 51"
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