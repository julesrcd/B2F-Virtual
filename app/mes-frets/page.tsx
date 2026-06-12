'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

type Fret = {
  id: number;
  numero: string;
  date: string;

  transporteur: string;

  depart: string;
  arrivee: string;

  paysDepart: string;
  paysArrivee: string;

  clientChargement: string;
  clientDechargement: string;

  natureMarchandise: string;

  typePalette: string;
  typeTravail: string;
  typeTransport: string;

  palettes: string;
  poids: string;
  priceKm: string;

  reserved: boolean;
  reservedBy: string | null;
  creatorId: string;
};

type User = {
  prenom: string;
  entreprise: string;
  email: string;
};

export default function MesFretsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [mesFrets, setMesFrets] = useState<Fret[]>([]);

  useEffect(() => {
  async function loadMesFrets() {
    const { data: auth } = await supabase.auth.getUser();

    if (!auth.user) return;

    // récupère le profil (prenom)
    const { data: profile } = await supabase
      .from('profiles')
      .select('prenom')
      .eq('id', auth.user.id)
      .single();

      setUser(profile as User);

    // récupère les frets réservées
    const { data, error } = await supabase
      .from('frets')
      .select('*')
      .eq('reservedBy', profile?.prenom);

    if (!error) {
      setMesFrets(data || []);
    }
  }

  loadMesFrets();
}, []);

async function deleteMyFret(id: number) {
  const ok = window.confirm(
    "Supprimer cette fret ?"
  );

  if (!ok) return;

  const { error } = await supabase
    .from('frets')
    .delete()
    .eq('id', id);

  if (error) {
    alert(error.message);
    return;
  }

  setMesFrets((prev) =>
    prev.filter((f) => f.id !== id)
  );
}

  return (
    <div className="min-h-screen bg-[#CECECE] text-black">
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

    <Link href="/infostransporteurs" className="hover:underline">
      Infos transporteurs
    </Link>

    <Link href="/mes-frets" className="hover:underline font-bold">
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
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Mes frets réservées</h1>

        {mesFrets.length === 0 ? (
          <div className="bg-white rounded shadow p-6 text-gray-500">
            Vous n'avez réservé aucune fret.
          </div>
        ) : (
          mesFrets.map((f) => (
            <div
            key={f.id}
            className="bg-white p-4 mb-4 rounded shadow relative"
            >
            <button
             onClick={() => deleteMyFret(f.id)}
             className="absolute top-2 right-2 text-red-600 text-xl"
             title="Supprimer cette fret"
           >
              🗑️
            </button>

              <div className="text-xs text-gray-500 mb-1">
                Mise en ligne : {f.date}
              </div>

              <div className="font-bold mb-3">
                {f.numero} • {f.paysDepart && `[${f.paysDepart}]`} {f.depart} •{' '}
                {f.clientChargement}
                {' → '}
                {f.paysArrivee && `[${f.paysArrivee}]`} {f.arrivee} •{' '}
                {f.clientDechargement}
              </div>

              <div className="text-sm text-gray-700 grid grid-cols-2 gap-x-6 gap-y-1">
                <div>🚚 Transporteur : {f.transporteur}</div>
                <div>📦 Marchandise : {f.natureMarchandise}</div>
                <div>⚙️ Type travail : {f.typeTravail}</div>
                <div>🚛 Type transport : {f.typeTransport}</div>
                <div>⚖️ Poids : {f.poids}</div>
                <div>📦 Palettes : {f.palettes}</div>
                <div>📦 Type palette : {f.typePalette}</div>
                <div>💶 Prix/km : {f.priceKm}</div>
              </div>

              <div className="mt-4 inline-block bg-green-100 text-green-700 px-3 py-1 rounded font-semibold">
                ✅ Réservée par vous
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}