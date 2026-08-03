const team = [
  {
    name: "Dt. Elif Kaya",
    role: "Kurucu Hekim · Estetik Diş Hekimliği",
    bio: "İstanbul Üniversitesi mezunu. 15 yıldır gülüş tasarımı ve laminate veneer uygulamaları yapıyor.",
    initials: "EK",
  },
  {
    name: "Dr. Dt. Mert Aydın",
    role: "Ağız, Diş ve Çene Cerrahisi",
    bio: "İmplantoloji doktorası. Zorlu vakalarda sinüs lifting ve kemik greftleme uzmanı.",
    initials: "MA",
  },
  {
    name: "Dt. Selin Demir",
    role: "Ortodonti Uzmanı",
    bio: "Şeffaf plak tedavisinde sertifikalı. 1.200'ün üzerinde tamamlanmış ortodonti vakası.",
    initials: "SD",
  },
];

export default function Team() {
  return (
    <section id="ekip" className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
          Ekibimiz
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Size kimin bakacağını önceden bilin
        </h2>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((m) => (
          <article
            key={m.name}
            className="rounded-2xl border border-brand-100 bg-white p-7"
          >
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-100 text-xl font-semibold text-brand-700">
              {m.initials}
            </div>
            <h3 className="mt-5 text-lg font-semibold">{m.name}</h3>
            <p className="mt-1 text-sm font-medium text-brand-600">{m.role}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/65">{m.bio}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
