'use client';

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


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
  metresDePlancher: string;

  reserved: boolean;
  reservedBy: string | null;
  dateReservation?: string;
  creatorId: string;
};

type Notification = {
  id: number;
  text: string;
  read: boolean;
};

type User = {
  prenom: string;
  entreprise: string;
  email: string;
};

const transporteurs = [
  'PJ Logistic',
  'PJ AGRO SERVICE',
  'PJ KIG',
  'NOVAPACK',
  'Duval & Fils',
  'BJ TRANSPORT',
  'AgriTrans',
  'Trans Express 51',
  'R.Pellerin Transport',
  'Rosero International',
  'Louna Chevalier Transport',
  'Transport Logistique Clermontoise',
  'MdTrans',
];

const typesPalette = [
  'PENDUE',
  'EPAL',
  'LPR',
  '100x120',
  'BIGBAG',
  'ROLLS',
  'PALOX',
  'PERDU/LOST',
  'RACKS',
  'VRAC/BULK',
  'BACS ALIMENTAIRE 100/120',
  'LONGUEURS',
  'LIQUIDE ALIMENTAIRE',
];

const typesTravail = [
  'Temp dirigée +/-°C',
  'chrgmt quai',
  'chrgmt latéral',
  'Benne et FMA',
  'FMA uniquement',
  'Quai/Latéral',
  'Container',
  'Citerne Alimentaire',
  'Citerne Pulvé',
  'Citerne ADR',
  'Hayon',
  'Vis Aliment',
];

const typesTransport = [
  'Standard',
  'Urgent',
  'Specific',
  'Groupage/Bunding',
  'Promods classique',
];

const CURRENT_USER = 'PJ Logistic';

export default function Home() {

  const router = useRouter();

  const [frets, setFrets] = useState<Fret[]>([]);

  useEffect(() => {
  console.log(supabase);
}, []);

useEffect(() => {
  async function loadFrets() {

    const savedUser = localStorage.getItem('user');

    if (!savedUser) {
      router.push('/login');
      return;
    }

    const { data, error } = await supabase
      .from('frets')
      .select('*')
      .order('numero', { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setFrets(data || []);
  }

  // charger les frets au démarrage
  loadFrets();

  // 🔥 Écouter les changements en direct (dans ton useEffect principal)
const channel = supabase
  .channel('frets-channel')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'frets',
    },
    (payload) => {
      // Recharge la liste complète pour TOUT LE MONDE en direct
      loadFrets();

      // Si c'est une réservation sur un de nos frets
      if (payload.eventType === 'UPDATE') {
        const newRow = payload.new as any;
        const savedUser = localStorage.getItem("user");
        const currentLocalUser = savedUser ? JSON.parse(savedUser) : null;

        if (newRow.reserved && currentLocalUser && newRow.creatorId === currentLocalUser.prenom) {
          // 🔊 SON
          const audio = new Audio('/notif-b2f.mp3');
          audio.play().catch(e => console.log("Audio bloqué", e));

          // 🔔 NOTIFICATION
          setNotifications((prev) => [
            {
              id: Date.now(),
              read: false,
              text: `Votre fret ${newRow.numero} ${newRow.depart} → ${newRow.arrivee} a été réservé par ${newRow.reservedBy}`,
            },
            ...prev,
          ]);
        }
      }
    }
  )
  .subscribe();

  // cleanup
  return () => {
    supabase.removeChannel(channel);
  };
}, [router]);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [openNotif, setOpenNotif] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [filters, setFilters] = useState({
  transporteur: '',
  typeTransport: '',
  typeTravail: '',
  typePalette: '',
  metresMin: '',
  metresMax: '',
});

  useEffect(() => {
  if (typeof window === "undefined") return;

  const savedUser = localStorage.getItem("user");

  if (!savedUser) return;

  try {
    const userData = JSON.parse(savedUser);
    setUser(userData);
    console.log("USER CONNECTÉ :", userData);
  } catch (e) {
    router.push("/login");
  }
}, [router]);

  const [form, setForm] = useState({
    numero: `B2F${Date.now().toString().slice(-4)}`,
    date: new Date().toISOString().split('T')[0],

    transporteur: transporteurs[0],

    depart: '',
    arrivee: '',

    clientChargement: '',
    clientDechargement: '',

    natureMarchandise: '',

    typePalette: typesPalette[0],
    typeTravail: typesTravail[0],
    typeTransport: typesTransport[0],

    palettes: '',
    poids: '',
    priceKm: '',
    metresDePlancher: '',
    paysDepart: '',
    paysArrivee: '',
  });

  function openNotifications() {
    setOpenNotif(!openNotif);
  }

  function markAsRead(id: number) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  async function reserver(id: number, dateReservation: string) {

  const currentUser = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  const { error } = await supabase
    .from('frets')
    .update({
      reserved: true,
      reservedBy: currentUser.prenom,
      dateReservation,
    })
    .eq('id', id);

  if (error) {
    console.error(error);
    alert("Erreur réservation");
  }
}

  async function deleteFret(id: number) {
    const fret = frets.find((f) => f.id === id);
    if (!fret) return;

    if (fret.creatorId !== user?.prenom) {
      alert("Tu n'es pas le créateur de ce fret");
      return;
    }

    const ok = window.confirm(`Supprimer le fret ${fret.numero} ?`);
    if (!ok) return;

    const { error } = await supabase
      .from('frets')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(error);
      alert("Erreur suppression");
    }
  }

  async function createFret() {
    const newFret = {
      numero: form.numero,
      date: form.date,
      transporteur: form.transporteur,
      depart: form.depart,
      arrivee: form.arrivee,
      paysDepart: form.paysDepart,
      paysArrivee: form.paysArrivee,
      clientChargement: form.clientChargement,
      clientDechargement: form.clientDechargement,
      natureMarchandise: form.natureMarchandise,
      typePalette: form.typePalette,
      typeTravail: form.typeTravail,
      typeTransport: form.typeTransport,
      palettes: form.palettes,
      poids: form.poids,
      priceKm: form.priceKm,
      metresDePlancher: form.metresDePlancher,
      reserved: false,
      reservedBy: null,
      creatorId: user?.prenom || 'Anonyme',
    };

    // On envoie à Supabase en arrière-plan
    await supabase
      .from('frets')
      .insert([newFret]);

    // On ferme la fenêtre quoi qu'il arrive, sans message d'erreur
    setOpenCreate(false);
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
  <div className="h-screen flex flex-col text-black">

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

  {/* CENTRE */}
  <nav className="flex gap-6 mx-auto">
    <Link href="/" className="hover:underline font-bold">
      Bourse de fret
    </Link>

    <Link href="/infostransporteurs" className="hover:underline">
      Infos transporteurs
    </Link>

    <Link href="/mes-frets" className="hover:underline">
      Mes frets
    </Link>
  </nav>

  {/* DROITE */}
  <div className="flex items-center gap-3 relative">

    {/* CLÔCHE */}
    <button onClick={openNotifications} className="relative text-xl">
      🔔
      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {unreadCount}
        </span>
      )}
    </button>

    {/* USER INFO */}
  <div className="flex items-center gap-3">
    <label className="cursor-pointer">
      <input type="file" className="hidden" />
      <img
        src="/default-avatar.png"
        className="w-10 h-10 rounded-full object-cover border"
      />
    </label>

    <div className="text-sm leading-tight">
  <div className="font-bold">
    {user?.prenom || "Prenom"}
  </div>

  <div className="text-xs opacity-80">
    {user?.entreprise || "Entreprise"}
  </div>
</div>
  </div>

    {/* DROPDOWN NOTIF */}
    {openNotif && (
      <div className="absolute top-12 right-0 w-80 bg-white text-black rounded shadow-lg z-50">

        <div className="p-2 font-bold border-b">
          Notifications
        </div>

        <div className="max-h-60 overflow-auto">
          {notifications.length === 0 && (
            <div className="p-3 text-sm text-gray-500">
              Aucune notification
            </div>
          )}

          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markAsRead(n.id)}
              className={`p-3 text-sm cursor-pointer border-b hover:bg-gray-100 ${
                n.read ? 'text-gray-500' : 'font-semibold'
              }`}
            >
              {n.text}
            </div>
          ))}
        </div>

      </div>
    )}

  </div>
</header>

      {/* BODY */}
<div className="flex-1 bg-[#CECECE] p-4 overflow-auto">
  <div className="flex gap-4 h-full">

    {/* GAUCHE - FILTRES */}
    <div className="w-1/4 bg-white rounded shadow p-4 h-fit">
      <h2 className="text-lg font-bold mb-4">Filtres</h2>

      {/* Transporteur */}
      <div className="mb-3">
        <label className="text-sm font-semibold">Transporteur</label>
        <select
          className="w-full border p-2 rounded mt-1"
          value={filters.transporteur}
          onChange={(e) =>
            setFilters({ ...filters, transporteur: e.target.value })
          }
        >
          <option value="">Tous</option>
          {transporteurs.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Type transport */}
      <div className="mb-3">
        <label className="text-sm font-semibold">Type de transport</label>
        <select
          className="w-full border p-2 rounded mt-1"
          value={filters.typeTransport}
          onChange={(e) =>
            setFilters({ ...filters, typeTransport: e.target.value })
          }
        >
          <option value="">Tous</option>
          {typesTransport.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Type travail */}
      <div className="mb-3">
        <label className="text-sm font-semibold">Type de travail</label>
        <select
          className="w-full border p-2 rounded mt-1"
          value={filters.typeTravail}
          onChange={(e) =>
            setFilters({ ...filters, typeTravail: e.target.value })
          }
        >
          <option value="">Tous</option>
          {typesTravail.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Type palette */}
      <div className="mb-3">
        <label className="text-sm font-semibold">Type de palette</label>
        <select
          className="w-full border p-2 rounded mt-1"
          value={filters.typePalette}
          onChange={(e) =>
            setFilters({ ...filters, typePalette: e.target.value })
          }
        >
          <option value="">Tous</option>
          {typesPalette.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Mètres min */}
      <div className="mb-3">
        <label className="text-sm font-semibold">Mètres min</label>
        <input
          type="number"
          className="w-full border p-2 rounded mt-1"
          value={filters.metresMin}
          onChange={(e) =>
            setFilters({ ...filters, metresMin: e.target.value })
          }
        />
      </div>

      {/* Mètres max */}
      <div className="mb-3">
        <label className="text-sm font-semibold">Mètres max</label>
        <input
          type="number"
          className="w-full border p-2 rounded mt-1"
          value={filters.metresMax}
          onChange={(e) =>
            setFilters({ ...filters, metresMax: e.target.value })
          }
        />
      </div>

      <button
        onClick={() =>
          setFilters({
            transporteur: '',
            typeTransport: '',
            typeTravail: '',
            typePalette: '',
            metresMin: '',
            metresMax: '',
          })
        }
        className="w-full bg-gray-200 hover:bg-gray-300 p-2 rounded mt-2"
      >
        Réinitialiser
      </button>
    </div>

    {/* CENTRE - FRETS */}
    <div className="w-2/4 p-4 overflow-auto">
      <div className="flex justify-between mb-3">
        <h2 className="text-xl font-bold">Bourse de Fret</h2>

        <button
          onClick={() => setOpenCreate(true)}
          className="bg-[#0073B5] text-white px-3 py-1 rounded"
        >
          + Créer
        </button>
      </div>

      {frets
        .filter((f) => !f.reserved)
        .filter(
          (f) =>
            (!filters.transporteur || f.transporteur === filters.transporteur) &&
            (!filters.typeTransport || f.typeTransport === filters.typeTransport) &&
            (!filters.typeTravail || f.typeTravail === filters.typeTravail) &&
            (!filters.typePalette || f.typePalette === filters.typePalette) &&
            (!filters.metresMin || Number(f.metresDePlancher) >= Number(filters.metresMin)) &&
            (!filters.metresMax || Number(f.metresDePlancher) <= Number(filters.metresMax))
        )
        .map((f) => (
          <div key={f.id} className="bg-gray-50 p-4 mb-3 rounded shadow relative">
            <div className="text-xs text-gray-500">Mise en ligne : {f.date}</div>

{f.creatorId === user?.prenom && (
  <button
    onClick={() => deleteFret(f.id)}
    className="absolute top-2 right-2 text-red-600 text-xl hover:scale-110 transition"
    title="Supprimer ce fret"
  >
    🗑️
  </button>
)}

            <div className="font-bold"> 
              {f.numero} • [{f.paysDepart}] {f.depart} • {f.clientChargement} → [{f.paysArrivee}] {f.arrivee} • {f.clientDechargement}
            </div>

            <div className="text-sm text-gray-700 mt-3 grid grid-cols-2 gap-x-6 gap-y-1">
  <div>🚚 Transporteur : {f.transporteur}</div>
  <div>📦 Marchandise : {f.natureMarchandise}</div>

  <div>⚙️ Type travail : {f.typeTravail}</div>
  <div>🚛 Type transport : {f.typeTransport}</div>

  <div>📦 Type palette : {f.typePalette}</div>
  <div>📦 Palettes : {f.palettes}</div>

  <div>⚖️ Poids : {f.poids}</div>
  <div>📏 Mètres : {f.metresDePlancher}</div>

  <div>💶 Prix/km : {f.priceKm}</div>

</div>

{f.reserved ? (
  <div className="mt-2 text-sm text-green-700 font-semibold">
    Réservé par vous
    {f.dateReservation && ` le ${f.dateReservation}`}
  </div>
) : (
  <button
    onClick={() => {
      const dateReservation = prompt(
        'Entrez la date de réservation (ex: 22/05/2026)'
      );

      if (!dateReservation) return;

      reserver(f.id, dateReservation);
    }}
    className="mt-2 px-3 py-1 rounded text-white bg-[#0073B5]"
  >
    Réserver
  </button>
)}
          </div>
        ))}
    </div>
  </div>
  </div>

      {/* MODAL */}
      {openCreate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

          <div className="absolute inset-0" onClick={() => setOpenCreate(false)} />

          <div className="relative bg-white w-[850px] rounded-2xl p-6 shadow-xl">

            <h2 className="text-xl font-bold mb-4">
              Créer une fret
            </h2>

            <div className="grid grid-cols-2 gap-3">

              <input className="border p-2 rounded" placeholder="Numéro"
                value={form.numero}
                onChange={(e) => setForm({ ...form, numero: e.target.value })}
              />

              <input type="date" className="border p-2 rounded"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />

              <select className="border p-2 rounded"
                value={form.transporteur}
                onChange={(e) => setForm({ ...form, transporteur: e.target.value })}
              >
                {transporteurs.map(t => <option key={t}>{t}</option>)}
              </select>

              <input placeholder="Départ" className="border p-2 rounded"
                onChange={(e) => setForm({ ...form, depart: e.target.value })}
              />

              <input placeholder="Arrivée" className="border p-2 rounded"
                onChange={(e) => setForm({ ...form, arrivee: e.target.value })}
              />

            <input
            placeholder="Initiales pays départ (FR, DE, ES...)"
            className="border p-2 rounded"
            onChange={(e) => setForm({ ...form, paysDepart: e.target.value })}
            />

             <input
              placeholder="Initiales pays arrivée (FR, DE, ES...)"
            className="border p-2 rounded"
              onChange={(e) => setForm({ ...form, paysArrivee: e.target.value })}
             />

              <input placeholder="Client chargement" className="border p-2 rounded"
                onChange={(e) => setForm({ ...form, clientChargement: e.target.value })}
              />

              <input placeholder="Client déchargement" className="border p-2 rounded"
                onChange={(e) => setForm({ ...form, clientDechargement: e.target.value })}
              />

              <input placeholder="Nature marchandise" className="border p-2 rounded"
                onChange={(e) => setForm({ ...form, natureMarchandise: e.target.value })}
              />

              <select className="border p-2 rounded"
                value={form.typePalette}
                onChange={(e) => setForm({ ...form, typePalette: e.target.value })}
              >
                {typesPalette.map(t => <option key={t}>{t}</option>)}
              </select>

              <select className="border p-2 rounded"
                value={form.typeTravail}
                onChange={(e) => setForm({ ...form, typeTravail: e.target.value })}
              >
                {typesTravail.map(t => <option key={t}>{t}</option>)}
              </select>

              {/* TYPE DE TRANSPORT */}
              <select className="border p-2 rounded"
                value={form.typeTransport}
                onChange={(e) => setForm({ ...form, typeTransport: e.target.value })}
              >
                {typesTransport.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <input placeholder="Poids" className="border p-2 rounded"
                onChange={(e) => setForm({ ...form, poids: e.target.value })}
              />

              <input placeholder="Palettes" className="border p-2 rounded"
                onChange={(e) => setForm({ ...form, palettes: e.target.value })}
              />

              <input placeholder="Prix/km" className="border p-2 rounded"
                onChange={(e) => setForm({ ...form, priceKm: e.target.value })}
              />

              <input
             placeholder="Nombre de mètres de plancher"
             className="border p-2 rounded"
             onChange={(e) =>
             setForm({ ...form, metresDePlancher: e.target.value })
             }
             />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setOpenCreate(false)} className="px-4 py-2 bg-gray-300 rounded">
                Annuler
              </button>

              <button onClick={createFret} className="px-4 py-2 bg-[#0073B5] text-white rounded">
                Créer
              </button>
            </div>

           </div>
           </div>

            )}
      
    </div>

  );
}