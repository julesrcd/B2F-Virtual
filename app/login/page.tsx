'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();

  const [isRegister, setIsRegister] = useState(false);

  const [form, setForm] = useState({
    prenom: '',
    entreprise: '',
    email: '',
    password: '',
  });

async function handleSubmit() {

  if (isRegister) {

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: form.email,
          prenom: form.prenom,
          entreprise: form.entreprise,
        });


      if (profileError) {
        alert(profileError.message);
        return;
      }
    }


    alert("Compte créé avec succès");

const { data: session } = await supabase.auth.getSession();

console.log("SESSION CREATION :", session);

router.push("/");


  } else {


    const { data, error } = await supabase.auth.signInWithPassword({
  email: form.email,
  password: form.password,
});


if (error) {
  alert(error.message);
  return;
}

console.log("SESSION :", data.session);

if (data.session) {
  router.push('/');
    }
  }
}

  return (
    <div className="h-screen flex">

      {/* GAUCHE LOGO */}
      <div className="w-1/2 bg-[#0073B5] flex flex-col items-center justify-center text-white">
        <img
          src="/B2F_VIRTUAL_SF.png"
          className="w-110 h-110 object-contain"
        />
        <h1 className="text-2xl font-bold mt-4">
          
        </h1>
      </div>

      {/* DROITE FORM */}
      <div className="w-1/2 flex flex-col justify-center px-20">

        <h2 className="text-2xl font-bold mb-6">
          {isRegister ? "Créer un compte" : "Connexion"}
        </h2>

        {isRegister && (
          <>
            <input
              placeholder="Prénom"
              className="border p-2 mb-3"
              onChange={(e) =>
                setForm({ ...form, prenom: e.target.value })
              }
            />

            <input
              placeholder="Entreprise"
              className="border p-2 mb-3"
              onChange={(e) =>
                setForm({ ...form, entreprise: e.target.value })
              }
            />
          </>
        )}

        <input
          placeholder="Email"
          className="border p-2 mb-3"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="border p-2 mb-3"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={handleSubmit}
          className="bg-[#0073B5] text-white p-2 rounded"
        >
          {isRegister ? "Créer le compte" : "Se connecter"}
        </button>

        <p
          className="mt-4 text-sm text-blue-600 cursor-pointer"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Déjà un compte ? Se connecter"
            : "Créer un compte"}
        </p>
      </div>
    </div>
  );
}