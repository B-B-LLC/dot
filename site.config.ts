/* ====================================================================
   SİTE YAPILANDIRMASI

   Yeni bir klinik demosu çıkarmak için yalnızca "KLİNİĞE ÖZEL" bölümünü
   düzenlemek yeterlidir. Aşağıdaki "ORTAK METİNLER" bölümü şablon
   metinleridir; kliniğe göre değişmesi gerekmez.

   Tasarım değerleri (renk, ölçü, ikon) bu dosyada tutulmaz.
   ==================================================================== */

/* ---------- Site ayarları ---------- */

export const site = {
  /** Sitenin yayınlandığı adres. canonical, sitemap ve OG etiketleri bunu kullanır. */
  adres: 'https://www.zenithras.online',

  /* Demo sürümlerinde true bırakın.

     Aynı metinle birden çok klinik demosu yayınlandığında bunlar birbirinin
     kopyası sayılır; ayrıca demo alan adı arama motoruna "diş kliniği" olarak
     kaydedilirse sonradan düzeltmesi zaman alır. true iken robots.txt tüm
     taramayı kapatır ve sayfalar index dışı işaretlenir.

     Gerçek bir kliniğin sitesi yayına alınırken false yapın. */
  demoModu: true,

  /* İçeriğin son elden geçirildiği gün (YYYY-AA-GG).

     `sitemap.xml`teki `lastModified` buradan gelir. Eskiden derleme anı
     yazılıyordu; o zaman her yayın bütün sayfaların değiştiğini iddia
     ediyordu ve arama motoru bir süre sonra alanı ciddiye almayı bırakıyor.

     Bir sayfanın metni ayrıca elden geçtiyse kendi `guncelleme` alanı
     yazılır, o sayfa için bu tarihin yerine geçer. */
  icerikGuncelleme: '2026-08-29'
};

/* ---------- Ziyaretçi ölçümü ---------- */

export type Olcum = {
  /** 'yok' → hiçbir betik yüklenmez, hiçbir olay gönderilmez.
      'vercel' → Vercel Web Analytics (Vercel panelinde Analytics açılmalıdır).
      'plausible' → Plausible Analytics. */
  saglayici: 'yok' | 'vercel' | 'plausible';

  /** Yalnızca Plausible: paneldeki site adı (ör. 'meseklinik.com').
      Vercel'de gerekmez, betik alan adını kendisi bilir. */
  alan?: string;

  /** Yalnızca Plausible: betiğin adresi. Kendi sunucunuzda barındırıyorsanız
      ya da engelleyicilere takılmamak için kendi alan adınızdan sunuyorsanız
      değiştirin. Boş bırakılırsa plausible.io kullanılır. */
  betik?: string;

  /** Google Search Console'un "HTML etiketi" yönteminde verdiği doğrulama
      kodu (yalnız `content` değeri, etiketin tamamı değil). Yazıldığında
      layout.tsx her sayfaya `google-site-verification` etiketini basar.
      Alan adının DNS'ine erişiminiz varsa TXT kaydı daha kalıcıdır. */
  googleDogrulama?: string;
};

/* Ölçüm çerezsizdir: iki sağlayıcı da ziyaretçiye çerez yazmaz ve parmak izi
   çıkarmaz, bu yüzden çerez onay bandı gerekmez. Kapatmak için 'yok' yazmak
   yeterlidir; yasal metinlerdeki ölçüm maddeleri de kendiliğinden düşer
   (bkz. yasal.config.ts).

   Vercel'de özel olaylar (telefon, WhatsApp, randevu) Pro planla gelir;
   Hobby planında yalnız sayfa görüntülenmesi sayılır. Plausible'da olaylar
   her planda çalışır. */
export const olcum: Olcum = {
  saglayici: 'vercel',
  alan: '',
  betik: '',
  googleDogrulama: ''
};

/* ---------- Tipler ---------- */

export type Klinik = {
  ad: string;
  marka: string;
  /** Alt sayfaların sekme başlığında kullanılan kısa ad.

      Kliniğin resmî tam adı tek başına arama sonucundaki ~60 karakterlik
      alanı doldurduğu için, alt sayfalarda başlığın asıl bilgisi (hangi
      işlem) kesiliyordu. Başlık kalıbı `{Sayfa} | {Kısa ad}, {Şehir}` —
      bkz. sayfaBasligi(). En uzun işlem adıyla birlikte 60 karakteri
      aşmayacak kadar kısa tutun. */
  kisaAd: string;
  telefon: string;
  telHref: string;
  eposta: string;
  whatsapp: string;
  harita: string;
  adresKisa: string;
  adresTam: string;

  /* Arama motorlarına gönderilen yapısal veri (JSON-LD) adresi parça parça
     ister; adresTam tek satır olduğu için ayrıca yazılır. */
  sokak: string;
  ilce: string;
  il: string;
  postaKodu: string;

  /** Sayfa başlıklarında klinik adının yanına gelir. Semt adı ilçeden daha çok
      arandığı için ilçe değil, hastanın kullandığı ad yazılır. */
  konum: string;
  /** Ana sayfadaki büyük başlık — kliniğin tek cümlelik tanımı. */
  tanitim: string;
  /** Başlığın altındaki metin. Dal sayısı cümlesi otomatik eklenir, yazmayın. */
  tanitimAlt: string;
  /** Arama sonuçlarında görünen açıklama. 150-160 karakter idealdir. */
  metaAciklama: string;
  /** Harita kartındaki iki satırlık konum etiketi. */
  haritaEtiketleri: [string, string];
  /** Gömülü haritanın merkezi. Boş bırakılırsa adres metni aranır; binayı tam
      göstermek için Google Haritalar'dan "enlem,boylam" kopyalayıp yazın
      (ör. '38.4345,27.1428'). */
  haritaKoordinat?: string;

  /** Kliniğin kendi hesapları: Instagram, Google işletme kaydı, YouTube …
      Yapısal verideki `sameAs` alanına yazılır ve arama motoruna "bu sayfa
      ile bu hesaplar aynı kliniğe aittir" der. Boş bırakılırsa alan hiç
      basılmaz. Başka bir kliniğin ya da hekimin hesabı yazılmaz.

      Instagram, X ve Facebook adresleri ayrıca altbilgide düğme olur
      (bkz. app/_ortak/sosyal.js). Tanınmayan adres — Google işletme kaydı
      gibi — düğme basmaz ama `sameAs` listesinde durmaya devam eder. */
  sosyal?: string[];

  ruhsat: string;
  editor: string;
  sonGuncelleme: string;
};

/** `gunler`: 0 = Pazar … 6 = Cumartesi */
export type CalismaSaati =
  | { ad: string; gunler: number[]; ac: string; kap: string; kapali?: false }
  | { ad: string; gunler: number[]; kapali: true; ac?: never; kap?: never };

export type Hekim = {
  ad: string;
  unvan: string;
  mezuniyet: string;
  /** Uzmanlık/doktora yoksa '—' yazılır. */
  akademik: string;
  /** Portre görselinin yolu (ör. '/gorseller/hekim-selin.webp'). Boş
      bırakılırsa kartta çizim yer tutucusu kalır. */
  gorsel?: string;
};

/** Bir fotoğraf alanı. `yol` boş bırakıldığında o alanda çizim yer tutucusu
    görünmeye devam eder; görsellerin hepsi hazır olmadan da site bozulmaz. */
export type Gorsel = {
  /** `public/` altındaki yol, başında eğik çizgiyle: '/gorseller/ad.webp' */
  yol: string;
  /** Görmeyen ziyaretçiye ve arama motoruna karenin içeriğini anlatır.
      Kısa ve düz olsun: 'Bekleme alanı, pencere tarafındaki koltuklar'. */
  alt: string;
};

export type Soru = { soru: string; cevap: string };

export type TedaviAsama = { baslik: string; metin: string };

/** `id`, tedavinin ikonunu ve sayfa adresini belirler (/tedaviler/<id>). Değiştirmeyin. */
export type Tedavi = {
  id: 'implantoloji' | 'ortodonti' | 'endodonti' | 'pedodonti' | 'periodontoloji' | 'restoratif';
  ad: string;
  ton: 'emerald' | 'amber';
  /** Ana sayfadaki kartta görünen kısa metin. */
  ozet: string;
  /** Arama sonuçlarında görünen açıklama. 150-160 karakter idealdir. */
  metaAciklama: string;
  /** Tedavi sayfasının açılış paragrafı. */
  giris: string;
  asamalar: TedaviAsama[];
  /** Hastanın süreç boyunca bilmesi gerekenler. */
  /** Bu sayfanın metni en son ne zaman elden geçti (YYYY-AA-GG).
      Yazılmazsa site.icerikGuncelleme kullanılır; site haritası bunu okur. */
  guncelleme?: string;
  notlar: string[];
  sorular: Soru[];
};
export type KoruyucuBilgi = { harf: string; baslik: string; metin: string };

/* ====================================================================
   KLİNİĞE ÖZEL — yeni demo için burayı düzenleyin
   ==================================================================== */

export const klinik: Klinik = {
  ad: 'Özel Meşe Ağız ve Diş Sağlığı Polikliniği',
  marka: 'Meşe.',
  kisaAd: 'Meşe Diş Polikliniği',
  telefon: '0232 000 00 00',
  telHref: 'tel:+902320000000',
  eposta: 'danisma@mesepoliklinik.example',
  whatsapp: 'https://wa.me/902320000000',
  /* Doldurmayın: aşağıdaki haritaYolTarifi() adresten üretir. Elle bir
     bağlantı vermek isterseniz buraya yazın, o zaman o kullanılır. */
  harita: '',
  adresKisa: 'Kıbrıs Şehitleri Cad. No: 148, Konak / İzmir',
  adresTam: 'Kıbrıs Şehitleri Caddesi No: 148, Kat 1 — 35220 Konak / İzmir',

  sokak: 'Kıbrıs Şehitleri Caddesi No: 148, Kat 1',
  ilce: 'Konak',
  il: 'İzmir',
  postaKodu: '35220',

  konum: 'Alsancak, İzmir',
  tanitim: 'Alsancak’ta, zemin katta bir ağız ve diş sağlığı polikliniği.',
  tanitimAlt:
    'Girişte eşik ve merdiven yok. Çocuk hastalar için ayrı bir bekleme ve tedavi bölümü ' +
    'bulunuyor.',
  metaAciklama:
    'Alsancak’ta zemin katta ağız ve diş sağlığı polikliniği. Girişte eşik ve merdiven yok, ' +
    'çocuk hastalar için ayrı bölüm bulunuyor.',
  haritaEtiketleri: ['Kıbrıs Şehitleri Cad.', 'Alsancak Garı'],
  haritaKoordinat: '',

  /* Yer tutucu: gerçek klinikte kendi hesaplarıyla değiştirilir, olmayan
     hesabın satırı silinir — uydurma adres düğmeyi boşa götürür. */
  sosyal: [
    'https://www.instagram.com/mesepoliklinik',
    'https://x.com/mesepoliklinik',
    'https://www.facebook.com/mesepoliklinik'
  ],

  ruhsat: 'İzmir İl Sağlık Müdürlüğü ruhsatlıdır. Ruhsat no: 0000/000',
  editor: 'Site editörü: Ayşe Demir · editor@mesepoliklinik.example',
  sonGuncelleme: 'Son güncelleme: 10.08.2026'
};

/** Kliniğin tam adı ve konumu. Sekme başlığı, paylaşım başlığı ve yapısal
    veri aynı cümleyi kullansın diye burada bir kez kurulur. Yalnız ana
    sayfada geçer: orada aranan şey kliniğin kendisidir. */
export const anaBaslik = `${klinik.ad} — ${klinik.konum}`;

/** Alt sayfaların başlık kuyruğu: ' | {Kısa ad}, {Şehir}'.

    Şehrin başlıkta durması tesadüf değil — hasta "izmir implant" diye arıyor,
    yalnız "implant" diye değil. Kuyruk her alt sayfada aynı olduğu için
    burada bir kez kurulur. */
export const baslikKuyrugu = ` | ${klinik.kisaAd}, ${klinik.il}`;

/** Alt sayfa başlığı. Ana sayfa `anaBaslik`i kullanır, ötekilerin hepsi bunu. */
export function sayfaBasligi(ad: string) {
  return `${ad}${baslikKuyrugu}`;
}

/* --- Harita ---------------------------------------------------------------
   Adres tek bir yerde (klinik.adresTam) durur; hem yol tarifi bağlantıları hem
   de gömülü harita ondan üretilir. Yeni klinik için adresi değiştirmek yeter.
   Koordinat verilmişse ona, verilmemişse adres metnine göre konumlanır. */

function haritaSorgusu(k: Klinik) {
  /* adresTam kat bilgisi ve uzun tire içerdiği için aramada iyi sonuç
     vermiyor; adresKisa zaten ilçe ve ili taşıyor. */
  return encodeURIComponent(k.haritaKoordinat || k.adresKisa);
}

/** Google Haritalar'da yol tarifi ekranını açan bağlantı. */
export function haritaYolTarifi(k: Klinik = klinik) {
  if (k.harita) return k.harita;
  return `https://www.google.com/maps/dir/?api=1&destination=${haritaSorgusu(k)}`;
}

/** Apple Haritalar'da yol tarifi ekranını açan bağlantı. iPhone ve Mac'te
    Haritalar uygulamasını, diğer sistemlerde maps.apple.com'un web sürümünü
    açar. klinik.harita elle doldurulsa bile bu bağlantı adresten üretilir;
    o alan yalnızca Google bağlantısını değiştirir. */
export function haritaYolTarifiApple(k: Klinik = klinik) {
  return `https://maps.apple.com/?daddr=${haritaSorgusu(k)}&dirflg=d`;
}

/** Konumu Google Haritalar'da gösteren bağlantı — yol tarifi ekranı değil.
    Yapısal verideki `hasMap` alanı bunu kullanır. Klinik kendi işletme
    kaydının adresini yazdıysa (`klinik.harita`) o tercih edilir. */
export function haritaKonumu(k: Klinik = klinik) {
  if (k.harita) return k.harita;
  return `https://www.google.com/maps?q=${haritaSorgusu(k)}&hl=tr`;
}

/** Karta gömülen haritanın iframe adresi. Anahtar gerektirmez. */
export function haritaGomme(k: Klinik = klinik) {
  return `https://www.google.com/maps?q=${haritaSorgusu(k)}&hl=tr&z=16&output=embed`;
}

/** Dal sayısını yazıyla verir; hero metnindeki cümle bundan üretilir. */
export function dalSayisiYaziyla(adet: number) {
  const yazi = [
    '', 'bir', 'iki', 'üç', 'dört', 'beş',
    'altı', 'yedi', 'sekiz', 'dokuz', 'on'
  ];
  return yazi[adet] ?? String(adet);
}

/* --- Görseller -------------------------------------------------------------
   Dosyalar `public/gorseller/` klasörüne konur, buraya yolu yazılır. Boş
   bırakılan her alan mevcut çizim yer tutucusunu korur.

   Öneriler: JPEG veya WebP, uzun kenar 1600 piksel civarı, 300 KB altı.
   Hasta fotoğrafı ve tedavi öncesi-sonrası görseli mevzuat gereği yer alamaz;
   yalnızca mekân ve hekim fotoğrafı konur. */

export const gorseller = {
  /** Ana sayfada başlığın yanındaki büyük kart. Dikeye yakın kadraj iyi durur;
      alt kenarın bir bölümü saat kartıyla örtüldüğü için önemli ayrıntıyı
      üstte bırakın. */
  hero: {
    yol: '/gorseller/hero.webp',
    alt: 'Kliniğin girişi: karşılama bankosu ve bekleme koltukları'
  } as Gorsel,

  /** Klinik bölümündeki üç mekân kartı. Kart etiketlerini temel.js'teki
      MEKANLAR listesi belirler; buradaki anahtarlar onlarla eşleşir. */
  mekanlar: {
    bekleme: {
      yol: '/gorseller/klinik-bekleme-alani.webp',
      alt: 'Bekleme alanı: pencere tarafında koltuklar ve karşılama bankosu'
    } as Gorsel,
    muayene: {
      yol: '/gorseller/klinik-muayene-odasi.webp',
      alt: 'Muayene odası: diş üniti, tepe lambası ve görüntüleme ekranı'
    } as Gorsel,
    cocuk: {
      yol: '/gorseller/klinik-cocuk-alani.webp',
      alt: 'Çocuk bölümü: oyun alanı ve refakatçiler için ayrı oturma'
    } as Gorsel
  }
};

export const saatler: CalismaSaati[] = [
  { ad: 'Pazartesi – Cuma', gunler: [1, 2, 3, 4, 5], ac: '09:00', kap: '19:00' },
  { ad: 'Cumartesi', gunler: [6], ac: '09:00', kap: '14:00' },
  { ad: 'Pazar', gunler: [0], kapali: true }
];

export const hekimler: Hekim[] = [
  {
    ad: 'Prof. Dr. Hüseyin Aksoy',
    unvan: 'Protetik diş tedavisi uzmanı',
    mezuniyet: 'İstanbul Üniv. Diş Hek. Fak., 1988',
    akademik: 'Protetik diş tedavisi doktorası, 1994',
    gorsel: '/gorseller/hekim-1.webp'
  },
  {
    ad: 'Uzm. Dt. Ayşe Yılmaz',
    unvan: 'Ortodonti uzmanı',
    mezuniyet: 'Ege Üniv. Diş Hek. Fak., 2011',
    akademik: 'Ortodonti uzmanlığı, 2017',
    gorsel: '/gorseller/hekim-2.webp'
  },
  {
    ad: 'Uzm. Dt. Can Demir',
    unvan: 'Ağız, diş ve çene cerrahisi uzmanı',
    mezuniyet: 'Ankara Üniv. Diş Hek. Fak., 2012',
    akademik: 'Ağız, diş ve çene cerrahisi uzmanlığı, 2018',
    gorsel: '/gorseller/hekim-3.webp'
  },
  {
    ad: 'Uzm. Dt. Elif Yıldız',
    unvan: 'Restoratif diş tedavisi uzmanı',
    mezuniyet: 'Hacettepe Üniv. Diş Hek. Fak., 2013',
    akademik: 'Restoratif diş tedavisi doktorası, 2019',
    gorsel: '/gorseller/hekim-4.webp'
  }
];

/* Tedavi metinleri süreç anlatımıyla sınırlıdır: sonuç vaadi, fiyat bilgisi ve
   öncesi-sonrası görseli mevzuat gereği yer almaz. Süreler kişiden kişiye
   değiştiği için kesin gün sayısı yerine aralık verilir.

   Klinikte hasta kabul edilmeyen bir dal varsa ilgili bloğu silin. */
export const tedaviler: Tedavi[] = [
  {
    id: 'implantoloji',
    ad: 'İmplantoloji',
    ton: 'emerald',
    ozet:
      'Tedaviye panoramik röntgen ve gerektiğinde hacimsel tomografi ile kemik yapısının ' +
      'değerlendirilmesiyle başlanır. Cerrahi aşamayı iyileşme süresi ve ardından üst yapı izler.',
    metaAciklama:
      'İmplant tedavisinde değerlendirme, cerrahi aşama, iyileşme dönemi ve üst yapı adımları. ' +
      'Polikliniğimizde izlenen süreç.',
    giris:
      'İmplant, eksik bir dişin yerine çene kemiğine yerleştirilen ve üzerine protetik bir üst ' +
      'yapı uygulanan titanyum bir kök parçasıdır. Tedavi tek bir işlem değil, birbirini izleyen ' +
      'aşamalardan oluşur; toplam süre kemik yapısına, bölgeye ve iyileşme hızına göre kişiden ' +
      'kişiye değişir.',
    asamalar: [
      {
        baslik: 'Değerlendirme ve planlama',
        metin:
          'Ağız içi muayenenin ardından panoramik röntgen alınır. Kemik yüksekliği ve kalınlığının ' +
          'ayrıntılı ölçülmesi gereken durumlarda hacimsel tomografi istenir. Kullanılan ilaçlar ve ' +
          'sistemik hastalıklar bu aşamada konuşulur.'
      },
      {
        baslik: 'Cerrahi aşama',
        metin:
          'İşlem lokal anestezi altında yapılır. İmplant planlanan bölgeye yerleştirilir ve bölge ' +
          'dikilir. Kemik hacmi yetersizse aynı seansta ya da öncesinde greft uygulaması ' +
          'gerekebilir; bu durum planlama sırasında bildirilir.'
      },
      {
        baslik: 'İyileşme dönemi',
        metin:
          'İmplantın çevresindeki kemikle bütünleşmesi beklenir. Bu süre bölgeye ve kemik yapısına ' +
          'göre değişir, genellikle birkaç ayla ifade edilir. Gerektiğinde bu dönem boyunca geçici ' +
          'bir çözüm uygulanır.'
      },
      {
        baslik: 'Üst yapı',
        metin:
          'İyileşme tamamlandığında ölçü alınır ve implant üstü kron hazırlanır. Uyum ve kapanış ' +
          'kontrol edildikten sonra üst yapı sabitlenir.'
      }
    ],
    notlar: [
      'Sigara kullanımı ve düzensiz kan şekeri iyileşme sürecini etkiler; hekiminize bildirin.',
      'Kanama düzensizliği ya da kemik yoğunluğunu etkileyen ilaç kullanımı planlamayı değiştirir.',
      'İmplant üstü kron da doğal diş gibi düzenli temizlik ve kontrol gerektirir.'
    ],
    sorular: [
      {
        soru: 'İşlem sırasında ağrı hissedilir mi?',
        cevap:
          'Cerrahi aşama lokal anestezi altında yapıldığından işlem sırasında ağrı beklenmez. ' +
          'İşlem sonrası ilk günlerde hassasiyet ve şişlik olabilir; hekiminiz gerekli önerileri verir.'
      },
      {
        soru: 'Eksik dişim uzun süredir yok, implant yapılabilir mi?',
        cevap:
          'Diş eksikliği uzun sürdüğünde bölgedeki kemik hacmi azalabilir. Bu durumda tomografi ile ' +
          'değerlendirme yapılır ve gerekirse greft uygulaması planlanır. Karar muayene sonrası verilir.'
      }
    ]
  },

  {
    id: 'ortodonti',
    ad: 'Ortodonti',
    ton: 'emerald',
    ozet:
      'Diş ve çene ilişkisindeki düzensizlikler değerlendirilir. Kayıt alındıktan sonra sabit ya ' +
      'da hareketli apareylerle plan yapılır; kontroller belirli aralıklarla sürer.',
    metaAciklama:
      'Ortodontik tedavide kayıt alma, aparey uygulaması, kontroller ve pekiştirme dönemi. ' +
      'Çocuk ve yetişkin hastalarda izlenen süreç.',
    giris:
      'Ortodonti, dişlerin ve çenelerin birbirine göre konumundaki düzensizliklerle ilgilenen ' +
      'daldır. Tedavi dişleri kontrollü biçimde hareket ettirmeye dayandığı için zamana yayılır; ' +
      'süre düzensizliğin türüne ve hastanın yaşına göre değişir.',
    asamalar: [
      {
        baslik: 'Değerlendirme ve kayıt',
        metin:
          'Ağız içi muayeneden sonra tedavi kayıtları alınır: ağız içi ve yüz fotoğrafları, dijital ' +
          'tarama ya da ölçü, panoramik ve sefalometrik röntgen. Bu kayıtlar planın dayanağını ' +
          'oluşturur ve tedavi boyunca karşılaştırma için saklanır.'
      },
      {
        baslik: 'Planlama',
        metin:
          'Kayıtlar incelendikten sonra seçenekler ve tahmini süre konuşulur. Sabit apareyler ' +
          '(braket) ya da hareketli/şeffaf plaklar arasından duruma uygun olan planlanır. Bazı ' +
          'durumlarda yer açmak için diş çekimi gündeme gelebilir.'
      },
      {
        baslik: 'Aktif tedavi',
        metin:
          'Aparey uygulandıktan sonra düzenli kontrollerle diş hareketi yönlendirilir. Kontroller ' +
          'genellikle dört ila sekiz hafta aralıklarla planlanır. İlk günlerde basınç hissi ve ' +
          'konuşmada kısa süreli alışma dönemi olağandır.'
      },
      {
        baslik: 'Pekiştirme (retansiyon)',
        metin:
          'Apareyler çıkarıldıktan sonra dişlerin yeni konumunda kalması için pekiştirme apareyi ' +
          'kullanılır. Bu dönem tedavinin ayrılmaz parçasıdır; atlanması durumunda dişlerde geri ' +
          'dönme görülebilir.'
      }
    ],
    notlar: [
      'Sabit aparey takılıyken fırçalama süresi uzar; ara yüz fırçası kullanımı önerilir.',
      'Sert ve yapışkan gıdalar aparey bağlantılarını etkileyebilir.',
      'Kontrollerin aksaması toplam tedavi süresini uzatır.'
    ],
    sorular: [
      {
        soru: 'Yetişkinlikte ortodontik tedavi yapılabilir mi?',
        cevap:
          'Yapılabilir. Diş hareketi yaşa bağlı olarak yavaşlayabilir ancak diş eti ve destek doku ' +
          'sağlığı uygunsa tedavi planlanır. Yetişkinlerde önce diş eti tedavisi gerekebilir.'
      },
      {
        soru: 'Şeffaf plaklar her durumda kullanılabilir mi?',
        cevap:
          'Her düzensizlik şeffaf plakla çözülemez. Uygunluk, kayıtlar değerlendirildikten sonra ' +
          'belirlenir; bazı durumlarda sabit aparey ya da ikisinin birlikte kullanımı planlanır.'
      }
    ]
  },

  {
    id: 'endodonti',
    ad: 'Endodonti',
    ton: 'emerald',
    ozet:
      'Diş içindeki pulpa dokusunun iltihaplandığı durumlarda kanal tedavisi uygulanır. Kanallar ' +
      'temizlenip doldurulur, diş uygun bir üst yapıyla kapatılır.',
    metaAciklama:
      'Kanal tedavisinde tanı, kanalların temizlenmesi, doldurulması ve dişin üst yapıyla ' +
      'kapatılması. Tedavi sonrası dikkat edilecekler.',
    giris:
      'Endodonti, dişin içindeki pulpa dokusu ve kök çevresindeki dokularla ilgilenen daldır. ' +
      'Pulpa derin çürük, kırık ya da darbe sonucu iltihaplandığında kanal tedavisi uygulanır. ' +
      'Amaç dişi çekmeden ağızda tutmaktır.',
    asamalar: [
      {
        baslik: 'Tanı',
        metin:
          'Ağrının niteliği ve süresi sorgulanır. Muayeneye ek olarak röntgen alınır; gerektiğinde ' +
          'dişin canlılığını ölçen testler yapılır. Bulgular ve tedavi seçenekleri anlatılır.'
      },
      {
        baslik: 'Anestezi ve izolasyon',
        metin:
          'İşlem lokal anestezi altında yapılır. Diş, çalışma alanının tükürükten ayrılması için ' +
          'genellikle bir örtü (rubber dam) ile izole edilir.'
      },
      {
        baslik: 'Kanalların temizlenmesi ve şekillendirilmesi',
        metin:
          'Pulpa dokusu uzaklaştırılır, kanallar eğelerle şekillendirilir ve dezenfeksiyon ' +
          'solüsyonlarıyla yıkanır. Enfeksiyonun yaygın olduğu durumlarda kanal içine ilaç konularak ' +
          'işlem ikinci seansa bırakılabilir.'
      },
      {
        baslik: 'Dolum ve üst yapı',
        metin:
          'Kanallar uygun bir dolgu maddesiyle doldurulur ve röntgenle kontrol edilir. Ardından diş ' +
          'kalıcı dolgu ya da madde kaybı fazlaysa kaplama ile kapatılır.'
      }
    ],
    notlar: [
      'Uyuşma geçene kadar yeme ve içmeden kaçınılır.',
      'İlk günlerde çiğnemede hafif hassasiyet olabilir; artan ağrıda hekiminize başvurun.',
      'Kanal tedavisi görmüş diş kırılmaya daha yatkındır; üst yapının zamanında tamamlanması önemlidir.'
    ],
    sorular: [
      {
        soru: 'Kanal tedavisi kaç seans sürer?',
        cevap:
          'Tek seansta tamamlanabildiği gibi, enfeksiyonun durumuna ve kanal sayısına göre birden ' +
          'fazla seans gerekebilir. Seans sayısı ilk değerlendirmede tahmini olarak paylaşılır.'
      },
      {
        soru: 'Ağrım geçti, tedaviyi yarıda bırakabilir miyim?',
        cevap:
          'Ağrının geçmesi enfeksiyonun bittiği anlamına gelmez. Yarım kalan kanal tedavisi zamanla ' +
          'yeniden iltihaba ve diş kaybına yol açabilir; sürecin tamamlanması gerekir.'
      }
    ]
  },

  {
    id: 'pedodonti',
    ad: 'Pedodonti',
    ton: 'emerald',
    ozet:
      'Süt ve karma dişlenme dönemindeki çocuklar için koruyucu uygulamalar ve tedaviler yapılır. ' +
      'Randevular ayrı bölümde ve çocuğun uyum süresi gözetilerek planlanır.',
    metaAciklama:
      'Çocuk diş hekimliğinde ilk ziyaret, koruyucu uygulamalar ve süt dişi tedavileri. ' +
      'Ayrı bekleme ve tedavi bölümü.',
    giris:
      'Pedodonti, süt ve karma dişlenme dönemindeki çocukların ağız ve diş sağlığıyla ilgilenen ' +
      'daldır. Bu dönemde tedavi kadar çocuğun hekim ortamına uyum sağlaması da önemlidir; bu ' +
      'nedenle randevular daha uzun planlanır ve ayrı bir bölümde yapılır.',
    asamalar: [
      {
        baslik: 'Tanışma randevusu',
        metin:
          'İlk ziyaret çoğunlukla muayene ve tanışmadan oluşur. Ağız içi incelenir, beslenme ve ' +
          'fırçalama alışkanlıkları konuşulur. Çocuğun ortama alışması için bu randevuda genellikle ' +
          'işlem yapılmaz.'
      },
      {
        baslik: 'Koruyucu uygulamalar',
        metin:
          'Çürük riskine göre fissür örtücü ve flor uygulaması planlanabilir. Fissür örtücü, arka ' +
          'dişlerin çiğneyici yüzeyindeki girintileri kapatan ince bir örtüdür ve ağrısız uygulanır.'
      },
      {
        baslik: 'Süt dişi tedavileri',
        metin:
          'Çürük bulunan süt dişlerine dolgu yapılır; derin çürüklerde pulpa tedavisi gerekebilir. ' +
          'Süt dişleri çene gelişimi, çiğneme ve konuşma açısından önemlidir, düşeceği düşünülerek ' +
          'tedavisiz bırakılmaz.'
      },
      {
        baslik: 'Yer tutucular ve takip',
        metin:
          'Bir süt dişi erken kaybedilirse, alttaki sürekli dişin yerini koruması için yer tutucu ' +
          'uygulanabilir. Dişlenme dönemi boyunca düzenli kontrollerle gelişim izlenir.'
      }
    ],
    notlar: [
      'Randevu öncesinde çocuğa korkutucu ifadeler kullanılmaması uyumu kolaylaştırır.',
      'Gece biberonla uyuma ve şekerli içecekler erken çocukluk çürüklerinde başlıca etkendir.',
      'Altı yaş dişi süt dişi değildir ve düşmez; sürdüğü dönemde kontrol önerilir.'
    ],
    sorular: [
      {
        soru: 'Çocuğumu ilk kez ne zaman getirmeliyim?',
        cevap:
          'İlk süt dişinin çıkmasından sonraki altı ay içinde, en geç birinci yaş gününde. Erken ' +
          'tanışma, sonraki randevularda uyumu belirgin biçimde kolaylaştırır.'
      },
      {
        soru: 'Çocuğum tedaviye izin vermezse ne olur?',
        cevap:
          'Uyum sağlanamayan durumlarda işlem bölünerek kısa seanslara yayılır. Zorlayıcı bir ' +
          'yaklaşım izlenmez; gerekirse birkaç tanışma randevusu planlanır.'
      }
    ]
  },

  {
    id: 'periodontoloji',
    ad: 'Periodontoloji',
    ton: 'emerald',
    ozet:
      'Diş eti ve dişi çevreleyen dokuların hastalıkları izlenir. Diş taşı temizliği, kök yüzeyi ' +
      'düzleştirmesi ve düzenli kontrollerle sürecin takibi yapılır.',
    metaAciklama:
      'Diş eti tedavisinde muayene, diş taşı temizliği, kök yüzeyi düzleştirmesi ve idame ' +
      'kontrolleri. Diş eti kanamasında izlenen süreç.',
    giris:
      'Periodontoloji, diş etini ve dişi çevreleyen destek dokularını ilgilendiren daldır. Diş eti ' +
      'hastalıkları çoğunlukla ağrısız ilerlediği için fark edilmesi gecikebilir; fırçalama ' +
      'sırasındaki kanama en sık görülen erken belirtidir.',
    asamalar: [
      {
        baslik: 'Muayene ve ölçüm',
        metin:
          'Diş eti ile diş arasındaki cep derinlikleri özel bir sonda ile ölçülür ve kayıt edilir. ' +
          'Kemik seviyesinin değerlendirilmesi için röntgen alınır. Bu kayıtlar sonraki kontrollerde ' +
          'karşılaştırma için kullanılır.'
      },
      {
        baslik: 'Diş taşı temizliği',
        metin:
          'Diş yüzeyindeki bakteri tabakası ve sertleşmiş diş taşı temizlenir. İşlem sonrası kısa ' +
          'süreli hassasiyet görülebilir.'
      },
      {
        baslik: 'Kök yüzeyi düzleştirmesi',
        metin:
          'Cep derinliği artmış bölgelerde, diş eti altındaki kök yüzeyi lokal anestezi altında ' +
          'temizlenir ve düzleştirilir. Genellikle ağız bölgelere ayrılarak birkaç seansta tamamlanır.'
      },
      {
        baslik: 'Yeniden değerlendirme ve idame',
        metin:
          'Belirli bir süre sonra ölçümler tekrarlanır ve iyileşme değerlendirilir. Gerekli ' +
          'görülürse cerrahi seçenekler konuşulur. Sonrasında kişiye göre belirlenen aralıklarla ' +
          'idame kontrolleri sürer.'
      }
    ],
    notlar: [
      'Sigara kullanımı diş eti hastalığının seyrini olumsuz etkiler ve kanamayı baskılayarak ' +
        'belirtileri gizleyebilir.',
      'Düzensiz kan şekeri diş eti iltihabını artırır; iki durum birbirini etkiler.',
      'Tedavinin kalıcılığı büyük ölçüde günlük ev bakımına bağlıdır.'
    ],
    sorular: [
      {
        soru: 'Diş taşı temizliği dişleri aşındırır mı?',
        cevap:
          'Uygun biçimde yapılan temizlik diş yüzeyini aşındırmaz. İşlem sonrası hissedilen ' +
          'hassasiyet, taşla örtülü kalan kök yüzeyinin açığa çıkmasına bağlıdır ve genellikle ' +
          'zamanla azalır.'
      },
      {
        soru: 'Diş etim çekildi, eski hâline döner mi?',
        cevap:
          'Kaybedilen destek dokunun kendiliğinden geri kazanılması beklenmez. Tedavinin amacı ' +
          'ilerlemeyi durdurmak ve mevcut dokuyu korumaktır; bazı durumlarda cerrahi seçenekler ' +
          'değerlendirilir.'
      }
    ]
  },

  {
    id: 'restoratif',
    ad: 'Restoratif diş tedavisi',
    ton: 'emerald',
    ozet:
      'Çürük ve madde kaybı bulunan dişlerde dolgu uygulamaları yapılır. İşlem öncesinde dişin ' +
      'durumu muayene ve gerekirse röntgenle değerlendirilir.',
    metaAciklama:
      'Dolgu tedavisinde muayene, çürüğün temizlenmesi ve dişin yeniden şekillendirilmesi. ' +
      'İşlem sonrası hassasiyet hakkında bilgi.',
    giris:
      'Restoratif diş tedavisi, çürük ya da kırık nedeniyle madde kaybı olan dişlerin işlev ve ' +
      'biçim olarak yeniden düzenlenmesini kapsar. Erken dönemde yapılan küçük bir dolgu, ilerlemiş ' +
      'çürükte gerekebilecek kanal tedavisi ya da kaplama ihtiyacını önleyebilir.',
    asamalar: [
      {
        baslik: 'Muayene ve değerlendirme',
        metin:
          'Diş yüzeyleri incelenir; diş aralarındaki çürüklerin görülebilmesi için gerektiğinde ' +
          'röntgen alınır. Çürüğün derinliğine göre uygulanacak işlem belirlenir.'
      },
      {
        baslik: 'Çürüğün temizlenmesi',
        metin:
          'Gerekli durumlarda lokal anestezi uygulanır. Çürümüş doku uzaklaştırılır ve dolgunun ' +
          'tutunacağı yüzey hazırlanır. Çürük pulpaya çok yaklaşmışsa koruyucu bir alt tabaka konur.'
      },
      {
        baslik: 'Dolgunun uygulanması',
        metin:
          'Diş rengine uygun kompozit malzeme tabakalar hâlinde yerleştirilir ve ışıkla sertleştirilir. ' +
          'Dişin doğal biçimi ve karşı dişlerle kapanışı gözetilerek şekillendirilir.'
      },
      {
        baslik: 'Bitirme ve kontrol',
        metin:
          'Yüzey düzeltilir ve parlatılır. Kapanış kontrol edilir; yüksek kalan noktalar varsa ' +
          'düzeltilir. Gerekirse kısa bir süre sonra kontrol randevusu planlanır.'
      }
    ],
    notlar: [
      'İşlem sonrası birkaç gün soğuk ve sıcağa karşı hassasiyet olabilir.',
      'Kapanışta rahatsızlık hissi sürerse dolgu yüksekliği kontrol edilmelidir.',
      'Madde kaybı çok fazlaysa dolgu yerine onlay ya da kaplama gündeme gelebilir.'
    ],
    sorular: [
      {
        soru: 'Dolgu ne kadar dayanır?',
        cevap:
          'Süre; dolgunun büyüklüğüne, dişin ağızdaki konumuna, çiğneme alışkanlıklarına ve ağız ' +
          'bakımına göre değişir. Düzenli kontrollerde dolgunun kenar uyumu değerlendirilir.'
      },
      {
        soru: 'Çürüğüm ağrımıyor, yine de dolgu gerekir mi?',
        cevap:
          'Çürükler çoğunlukla ağrı vermeden ilerler; ağrı genellikle pulpaya yaklaşıldığında ' +
          'başlar. Erken dönemde yapılan işlem hem daha küçük hem de dişi daha çok korur.'
      }
    ]
  }
];

/* --- Üst gezinmedeki "Tedaviler" açılır menüsü -----------------------------
   Bu liste yukarıdaki tedaviler[] dizisinden ayrıdır ve onu etkilemez: orada
   altı ana dalın kendi sayfası vardır, burada kliniğin sunduğu işlemler dal dal
   sayılır. Menüdeki "kategori" ve "tedavi" sayıları buradan hesaplanır, elle
   yazılmaz — kalem ekleyip çıkarmak yeter.

   Kalem düz metin yazıldığında bağlantıya dönüşmez, listede durur. İşlemin
   içeriği yazıldığında kalem nesneye çevrilir; o an /tedaviler/<slug> sayfası,
   site haritası kaydı ve paylaşım görseli kendiliğinden oluşur:

     'Fiber Dolgu'  ->  { ad: 'Fiber Dolgu', slug: 'fiber-dolgu', ozet: …, … }

   Yani menü hem gezinme listesi hem de içerik kuyruğudur: düz metin kalanlar
   "yazılmayı bekleyen" kalemlerdir.

   Kategoriler menüde yazıldıkları sırayla, satır satır dört sütuna dizilir. */

/** İşlem sayfasının gövdesindeki başlıklı bir parça. */
export type IslemBolumu = { baslik: string; metin: string };

/** Tedavinin aşamaları ve her aşamanın ne kadar sürdüğü.

    Hastanın en çok sorduğu şey "ne kadar sürer" olduğu için, bu bilgi metnin
    içinde kaybolmasın diye ayrı bir şerit olarak çizilir. `sure` her zaman
    aralık ya da niteleyici cümledir; kesin gün sayısı yazılmaz. */
export type IslemAsama = { asama: string; sure: string; aciklama: string };

/** İki seçeneği ölçüt ölçüt karşılaştıran tablo.

    Yalnız gerçek bir seçimin olduğu sayfalarda kullanılır (metal/seramik
    braket, açık/kapalı sinüs lifting, köprü/implant …). Birbirine yakın
    başlıkların tekrara düşmemesini de bu tablo sağlar: sayfa, komşusundan
    farkını iddia etmek yerine ölçütle gösterir. */
export type IslemKarsilastirma = {
  baslik: string;
  /** Tablonun iki sütun başlığı. */
  sutunlar: [string, string];
  satirlar: {
    olcut: string;
    /** Ölçütün altına düşen küçük açıklama; neden bakıldığını söyler. */
    olcutAciklama?: string;
    a: string;
    b: string;
  }[];
  /** Tablonun altındaki tek cümlelik uyarı ya da bağlam. */
  dipnot?: string;
};

/** Kendi sayfası olan bir işlem.

    `slug` sayfanın adresidir (/tedaviler/<slug>) ve ana dalların id'leriyle
    çakışamaz; çakışırsa derleme hata vererek durur. `dal` verildiğinde sayfa
    kırıntı gezinmede o dalın altında görünür ve dal sayfasına bağlanır. */
export type Islem = {
  ad: string;
  slug: string;
  /** Listede ve kartta görünen tek cümlelik açıklama. */
  ozet: string;
  /** Arama sonucundaki açıklama. Boş bırakılırsa `ozet` kullanılır. */
  metaAciklama?: string;
  /** Sayfanın açılış paragrafı. */
  giris: string;
  bolumler: IslemBolumu[];
  /** Aşama şeridi. Süreci birden çok randevuya yayılan işlemlerde anlamlıdır;
      tek seansta biten işlemde çizilmez. */
  zamanCizelgesi?: IslemAsama[];
  /** Karşılaştırma tablosu. Sayfada gerçek bir seçim varsa eklenir. */
  karsilastirma?: IslemKarsilastirma;
  /** Hastanın süreç boyunca bilmesi gerekenler. */
  /** Bu sayfanın metni en son ne zaman elden geçti (YYYY-AA-GG).
      Yazılmazsa site.icerikGuncelleme kullanılır; site haritası bunu okur. */
  guncelleme?: string;
  notlar?: string[];
  sorular?: Soru[];
  dal?: Tedavi['id'];
};

export type TedaviMenuKalemi = string | Islem;
export type TedaviMenuKategorisi = { baslik: string; kalemler: TedaviMenuKalemi[] };

export const tedaviMenusu: {
  ustBaslik: string;
  panel: { baslik: string; aciklama: string; eylem: string; tumu: string };
  kategoriler: TedaviMenuKategorisi[];
} = {
  ustBaslik: 'Tedavi kategorileri',
  panel: {
    baslik: 'Tedavilerimiz',
    /* Başına kategori sayısı eklenir: "9 kategori · kişiye özel tedavi planı." */
    aciklama: 'kişiye özel tedavi planı.',
    eylem: 'Randevu talebi',
    tumu: 'Tüm tedaviler'
  },
  kategoriler: [
    {
      baslik: 'Tedavi ve endodonti',
      kalemler: [
        {
          ad: 'Fiber Dolgu',
          slug: 'fiber-dolgu',
          dal: 'restoratif',
          ozet:
            'Madde kaybı büyük olan dişin, kök içine yerleştirilen fiber destekle yeniden yapılandırılması.',
          metaAciklama:
            'Fiber dolgu nedir, hangi dişlerde uygulanır, kaç seans sürer? Alsancak’taki kliniğimizde ' +
            'uygulanan süreç adım adım anlatılıyor.',
          giris:
            'Fiber dolgu, geriye kalan diş dokusunun tek başına bir dolguyu taşıyamayacağı durumlarda ' +
            'kullanılan bir yapılandırma yöntemidir. Kök kanalının içine yerleştirilen fiber bir çubuk ' +
            'desteği üstlenir, görünen kısım kompozitle diş biçiminde şekillendirilir.',
          bolumler: [
            {
              baslik: 'Hangi dişlerde gündeme gelir',
              metin:
                'Çoğunlukla kanal tedavisi görmüş, çürük ya da kırık yüzünden üst kısmının büyük bölümü ' +
                'kaybedilmiş dişlerde konuşulur. Karar muayene ve röntgenle verilir; kalan dokunun ne ' +
                'kadarının sağlam olduğu belirleyicidir.'
            },
            {
              baslik: 'İşlem sırası',
              metin:
                'Çürük ve zayıflamış doku temizlenir, kök kanalının içinde fiber çubuk için yer açılır. ' +
                'Çubuk yapıştırıcıyla sabitlenir ve üzeri kompozitle katman katman şekillendirilir. ' +
                'İşlem genellikle bir ya da iki seansta tamamlanır.'
            },
            {
              baslik: 'Kaplamayla ilişkisi',
              metin:
                'Fiber dolgu çoğu zaman tek başına bir bitiş değil, üzerine gelecek kaplamanın zeminidir. ' +
                'Dişin arka bölgede olması ve çiğneme yükünü taşıması gerekiyorsa hekim üstüne kaplama ' +
                'önerebilir; bu karar dolgu tamamlandıktan sonra birlikte konuşulur.'
            }
          ],
          notlar: [
            'Kanal tedavisi görmüş diş uyuşmadığı için işlem sırasında ağrı beklenmez.',
            'İlk saatlerde o bölgeyle sert gıda çiğnenmemelidir.',
            'Fındık, ceviz kırmak gibi zorlayıcı alışkanlıklar dişin ömrünü kısaltır.'
          ],
          sorular: [
            {
              soru: 'Fiber yerine metal destek kullanılamaz mı?',
              cevap:
                'Kullanılabilir; hangisinin uygun olduğu dişin konumuna, kalan doku miktarına ve üzerine ' +
                'gelecek restorasyona göre değişir. Seçenekler muayenede birlikte değerlendirilir.'
            },
            {
              soru: 'Normal dolgudan farkı ne?',
              cevap:
                'Normal dolgu yalnız dişin üst kısmına tutunur. Fiber dolguda destek kök içinden alınır, ' +
                'bu yüzden dokusu çok azalmış dişlerde tercih edilir.'
            }
          ]
        },
        {
          ad: 'Kanal Tedavisi',
          slug: 'kanal-tedavisi',
          dal: 'endodonti',
          ozet: 'İltihaplanan diş özünün temizlenip kanalların doldurulması; diş çekilmeden ağızda tutulur.',
          metaAciklama:
            'Kanal tedavisi nasıl yapılır, kaç seans sürer, sonrasında ne olur? Alsancak’taki kliniğimizde ' +
            'uygulanan süreç adım adım anlatılıyor.',
          giris:
            'Kanal tedavisi, çürük ya da darbe yüzünden iltihaplanan diş özünün alınması, kanalların ' +
            'temizlenip şekillendirilmesi ve boşluğun kalıcı bir dolgu maddesiyle doldurulması işlemidir. ' +
            'Amaç yalnızca ağrıyı geçirmek değil, dişi çekmeden ağızda tutmaktır.',
          bolumler: [
            {
              baslik: 'Hangi bulgularla gündeme gelir',
              metin:
                'Sıcak ve soğukla uzun süren ağrı, kendiliğinden başlayan zonklama, diş etinde şişlik ya ' +
                'da dişin renginin koyulaşması sık görülen bulgulardır. Kesin karar muayene ve röntgenle ' +
                'verilir; bazı dişler hiç ağrı vermeden de kanal tedavisi gerektirebilir.'
            },
            {
              baslik: 'İşlem sırası',
              metin:
                'Diş uyuşturulur, çürük doku temizlenir ve özün bulunduğu boşluğa ulaşılır. Kanallar eğe ' +
                've yıkama çözeltileriyle temizlenip şekillendirilir, kurutulur ve doldurulur. Kanal ' +
                'sayısına ve iltihabın durumuna göre işlem tek seansta ya da iki seansta tamamlanır.'
            },
            {
              baslik: 'Sonrasında dişin üstü',
              metin:
                'Kanal tedavisi görmüş diş beslenmesini yitirdiği için zamanla daha kırılgan olur. ' +
                'Özellikle çiğneme yükünü taşıyan arka dişlerde üstünün kaplamayla korunması önerilir; ' +
                'madde kaybı azsa dolgu yeterli olabilir.'
            }
          ],
          notlar: [
            'İlk birkaç gün dişe basınca hafif hassasiyet olması beklenir ve kendiliğinden geçer.',
            'Tedavi bitene kadar o taraf sert yiyeceklerle zorlanmamalıdır.',
            'Ağrının artması ya da yüzde şişlik olması durumunda klinik aranmalıdır.'
          ],
          sorular: [
            {
              soru: 'Kanal tedavisi ağrılı mıdır?',
              cevap:
                'İşlem uyuşturma altında yapılır, bu yüzden sırasında ağrı beklenen bir durum değildir. ' +
                'Tedaviden önceki iltihaba bağlı ağrı çoğunlukla ilk seanstan sonra azalır.'
            },
            {
              soru: 'Kanal tedavili diş ne kadar dayanır?',
              cevap:
                'Üstü doğru şekilde kapatılan ve düzenli kontrole gelen bir diş uzun yıllar kullanılabilir. ' +
                'Dayanıklılığı belirleyen asıl etken kalan diş dokusunun miktarıdır.'
            }
          ]
        },
        {
          ad: 'Kanal Yenileme',
          slug: 'kanal-yenileme',
          dal: 'endodonti',
          ozet:
            'Daha önce kanal tedavisi görmüş ama sorun çıkaran dişin eski dolgusundan arındırılıp yeniden tedavisi.',
          metaAciklama:
            'Kanal yenileme (retreatment) neden gerekir, nasıl yapılır, kaç seans sürer? Sürecin ' +
            'tamamı hasta gözünden anlatılıyor.',
          giris:
            'Kanal tedavisi görmüş bir diş yıllar sonra yeniden ağrıyabilir ya da çevresinde iltihap ' +
            'gelişebilir. Kanal yenileme, eski kök dolgusunun çıkarılıp kanalların yeniden temizlenmesi ve ' +
            'doldurulması işlemidir. Amaç dişi çekmeden korumaktır.',
          bolumler: [
            {
              baslik: 'Neden gerekir',
              metin:
                'Kanalın dallarından biri ilk tedavide gözden kaçmış olabilir, dolgu zamanla sızdırmaya ' +
                'başlayabilir ya da üstteki dolgu kırıldığında bakteri kanala yeniden ulaşabilir. Bulgu ' +
                'çoğu zaman basmakla ağrı, diş etinde şişlik ya da röntgende kök ucundaki karartıdır.'
            },
            {
              baslik: 'İşlem sırası',
              metin:
                'Diş uyuşturulur, üstteki dolgu ya da kaplama kaldırılır ve eski kök dolgusu sökülür. ' +
                'Kanallar aletlerle ve yıkama solüsyonlarıyla yeniden temizlenir. İltihap varsa kanala ' +
                'ilaç konur ve bir süre beklenir. Temizlik tamamlandığında kanallar yeniden doldurulur.'
            },
            {
              baslik: 'Ne kadar sürer',
              metin:
                'İlk kanal tedavisinden daha uzun sürer, çünkü önce eski dolgunun çıkarılması gerekir. ' +
                'Genellikle iki ile dört seans arasında tamamlanır; ilaç bekletilen durumlarda seanslar ' +
                'arasına birkaç hafta girebilir.'
            },
            {
              baslik: 'Sonuç alınamazsa',
              metin:
                'Kanal yoluyla ulaşılamayan bir iltihap kaldığında sıradaki seçenek kök ucunun cerrahi ' +
                'olarak temizlenmesidir (apikal rezeksiyon). Bu, yenileme denenmeden gündeme gelmez.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'Eski dolgunun sökülmesi',
              sure: 'Tek seans',
              aciklama:
                'Önceki kanal tedavisinin materyalleri çıkarılır ve enfekte doku temizlenir.'
            },
            {
              asama: 'Kanalların temizlenmesi',
              sure: '1-2 randevu',
              aciklama:
                'Kanallar aletler ve solüsyonlarla temizlenir; gerekirse ilaç konup beklenir.'
            },
            {
              asama: 'Doldurma ve kapatma',
              sure: 'Tek seans',
              aciklama:
                'İltihap gerilediğinde kanallar kalıcı olarak doldurulur ve diş üstten kapatılır.'
            }
          ],
          notlar: [
            'Seanslar arasında ve tedaviden sonraki birkaç gün hafif hassasiyet olağandır.',
            'Tedavi sürerken o bölgeyle sert gıda çiğnenmemelidir.',
            'Geçici dolgu düşerse beklenmeden klinik aranmalıdır.'
          ],
          sorular: [
            {
              soru: 'İlk kanal tedavisi başarısız mı oldu demek?',
              cevap:
                'Her zaman değil. Kanal anatomisi kişiden kişiye değişir ve yıllar içinde dolgunun ' +
                'sızdırması, dişin kırılması gibi yeni durumlar ortaya çıkabilir.'
            },
            {
              soru: 'Diş çekilse daha kolay olmaz mı?',
              cevap:
                'Çekim boşluğun sonradan implant ya da köprüyle kapatılmasını gerektirir. Kendi dişinin ' +
                'korunabildiği durumlarda önce yenileme değerlendirilir.'
            }
          ]
        },
        {
          ad: 'Kompozit Dolgu',
          slug: 'kompozit-dolgu',
          guncelleme: '2026-08-29',
          dal: 'restoratif',
          ozet: 'Diş rengindeki dolgu maddesiyle çürük boşluğunun tek seansta kapatılması.',
          metaAciklama:
            'Kompozit dolgu nasıl yapılır, ne kadar sürer, ne kadar dayanır? Uygulama süreci ve sonrasında ' +
            'dikkat edilecekler.',
          giris:
            'Kompozit dolgu, çürük temizlendikten sonra kalan boşluğun diş rengindeki bir maddeyle ' +
            'doldurulmasıdır. Madde katman katman yerleştirilip ışıkla sertleştirildiği için işlem aynı ' +
            'seansta biter ve diş hemen kullanılabilir.',
          bolumler: [
            {
              baslik: 'İşlem sırası',
              metin:
                'Gerekiyorsa diş uyuşturulur, çürük doku tamamen temizlenir ve yüzey dolgunun tutunacağı ' +
                'şekilde hazırlanır. Kompozit ince katmanlar hâlinde yerleştirilir, her katman ışıkla ' +
                'sertleştirilir. Son adımda dolgu çiğneme yüzeyine göre şekillendirilip parlatılır.'
            },
            {
              baslik: 'Renk uyumu',
              metin:
                'Kompozitin tonu dişin kendi rengine göre seçilir. Ön bölgede birden çok ton bir arada ' +
                'kullanılarak dişin doğal geçişleri taklit edilir; bu yüzden ön diş dolguları arka diş ' +
                'dolgularına göre daha uzun sürer.'
            },
            {
              baslik: 'Neden katman katman',
              metin:
                'Kompozit ışıkla sertleşirken hafifçe büzülür. Boşluk tek seferde doldurulursa bu ' +
                'büzülme dolgu ile diş arasındaki bağı zorlar ve kenarda mikroskobik bir aralık ' +
                'bırakabilir. O aralıktan sızan bakteri, dolgunun altında yeni çürük başlatır. ' +
                'İnce katmanlar hâlinde çalışmak gerilimi dağıtır; işlemin biraz uzun sürmesinin ' +
                'sebebi budur.'
            },
            {
              baslik: 'Hassasiyet ne zaman beklenir',
              metin:
                'Derin çürüklerde dolgu sonrası birkaç günlük soğuk hassasiyeti olağandır: çürük ' +
                'sinire yaklaştıkça diş uyarana daha duyarlı hâle gelir ve toparlanması zaman alır. ' +
                'Hassasiyetin günler içinde azalması beklenir. Artıyorsa, sıcakla ortaya çıkıyorsa ' +
                'ya da kendiliğinden zonklama başladıysa değerlendirilmesi gerekir — bu, kanal ' +
                'tedavisinin gündeme gelebileceği bir bulgudur.'
            },
            {
              baslik: 'Ömrünü belirleyen şeyler',
              metin:
                'Dolgunun ömrü boşluğun büyüklüğüne, dişe binen çiğneme yüküne ve ağız bakımına bağlıdır. ' +
                'Kenarından sızıntı başlayan bir dolgu yenilenir; büyük madde kaybında dolgu yerine ' +
                'inley/onley ya da kaplama önerilebilir. Belirleyici ölçüt, geriye kalan diş ' +
                'duvarlarının çiğneme yükünü taşıyıp taşıyamayacağıdır: dolgu dişi doldurur, ' +
                'ama dişi ayakta tutmaz.'
            },
            {
              baslik: 'Renk uyumu neden zaman alır',
              metin:
                'Kompozitin tonu dişin kendi rengine göre seçilir. Ön bölgede birden çok ton bir ' +
                'arada kullanılarak dişin doğal geçişleri taklit edilir; bu yüzden ön diş ' +
                'dolguları arka diş dolgularına göre daha uzun sürer. Renk, diş kurumadan ' +
                'seçilir: uzun süre açık kalan diş geçici olarak matlaşıp açılır ve o an ' +
                'seçilen ton sonradan koyu kalır.'
            },
            {
              baslik: 'Dolgu sonrası ısırma ayarı',
              metin:
                'Dolgu bittiğinde çiğneme yüzeyinin karşı dişle ilişkisi kontrol edilir. Uyuşturma ' +
                'nedeniyle hasta o an yüksekliği doğru hissedemeyebilir; bu yüzden his geçtikten ' +
                'sonra fark edilen bir yükseklik bekletilmeden bildirilmelidir. Yüksek kalan bir ' +
                'dolgu hem dişin hassaslaşmasına hem malzemenin kırılmasına yol açar ve ' +
                'düzeltilmesi birkaç dakika sürer.'
            }
          ],
          karsilastirma: {
            baslik: 'Kompozit dolgu ile inley/onley',
            sutunlar: ['Kompozit dolgu', 'İnley / onley'],
            satirlar: [
              {
                olcut: 'Nerede hazırlanır',
                a: 'Doğrudan ağızda, aynı seansta.',
                b: 'Ölçü alınıp laboratuvarda üretilir.'
              },
              {
                olcut: 'Seans sayısı',
                a: 'Tek seans.',
                b: 'En az iki seans; arada geçici dolgu kullanılır.'
              },
              {
                olcut: 'Hangi madde kaybında',
                olcutAciklama: 'Seçimi belirleyen ana ölçüt',
                a: 'Küçük ve orta boşluklarda.',
                b: 'Duvarların zayıfladığı geniş boşluklarda.'
              },
              {
                olcut: 'Büzülme',
                a: 'Ağızda sertleştiği için katman katman çalışmak gerekir.',
                b: 'Ağız dışında üretildiği için bu sorun yaşanmaz.'
              },
              {
                olcut: 'Onarım',
                a: 'Kenar kırığı çoğunlukla yerinde onarılır.',
                b: 'Genellikle yenilenmesi gerekir.'
              }
            ],
            dipnot:
              'Daha büyük restorasyon her zaman daha iyi değildir: küçük bir boşluk için inley yapmak gereksiz diş kesimi demektir. Ölçüt boşluğun büyüklüğü ve kalan diş duvarlarının sağlamlığıdır.'
          },
          notlar: [
            'Uyuşturma yapıldıysa his geçene kadar sıcak içecek ve çiğneme dudak ısırmaya yol açabilir.',
            'Dolgu ilk günlerde soğuğa karşı hassas olabilir.',
            'Isırışta yükseklik hissi kalırsa dolgu birkaç dakikada düzeltilir; alışmayı beklemeyin.',
            'Hassasiyet günler içinde azalmıyor ya da artıyorsa kontrol gerekir.',
            'Ön diş dolgularında renk uyumu için işlem daha uzun sürer; randevu buna göre planlanır.'
          ],
          sorular: [
            {
              soru: 'Dolgudan sonra ne zaman yemek yiyebilirim?',
              cevap:
                'Kompozit ışıkla sertleştiği için hemen yenebilir. Uyuşturma yapıldıysa hissin geçmesini ' +
                'beklemek yanaktan ısırmayı önler.'
            },
            {
              soru: 'Gümüş (amalgam) dolgular kompozitle değiştirilebilir mi?',
              cevap:
                'Değiştirilebilir. Sağlam duran bir dolguyu yalnızca görüntü için değiştirmek diş dokusu ' +
                'kaybına yol açtığından, karar muayenede birlikte verilir.'
            },
            {
              soru: 'Dolgu yaptırdım ama hâlâ hassas, normal mi?',
              cevap:
                'Derin çürüklerden sonra birkaç günlük soğuk hassasiyeti beklenir ve azalarak geçer. ' +
                'Hassasiyetin artması, sıcakla ortaya çıkması ya da kendiliğinden zonklamaya ' +
                'dönüşmesi beklenen seyir değildir; bu durumda dişin yeniden değerlendirilmesi gerekir.'
            },
            {
              soru: 'Dolgunun altında çürük ilerler mi?',
              cevap:
                'Çürük tamamen temizlenip dolgu kenarları sızdırmaz biçimde kapatıldığında ilerlemez. ' +
                'Zamanla kenarda sızıntı başlarsa altında yeni çürük gelişebilir; bu, kontrollerde ' +
                've gerektiğinde röntgenle takip edilen bir durumdur.'
            },
            {
              soru: 'Kaç dolgu aynı seansta yapılabilir?',
              cevap:
                'Birden çok dolgu aynı randevuda yapılabilir; sınırı çoğunlukla uyuşturulan bölge ' +
                've randevu süresi belirler. Aynı taraftaki dişler birlikte planlanır, böylece ' +
                'daha az sayıda uyuşturma yeter.'
            }
          ]
        },
        {
          ad: 'İnley / Onley Dolgu',
          slug: 'inley-onley-dolgu',
          dal: 'restoratif',
          ozet:
            'Ölçüsü alınıp laboratuvarda üretilen, dişe sonradan yapıştırılan porselen ya da kompozit dolgu.',
          metaAciklama:
            'İnley ve onley dolgu nedir, normal dolgudan ve kaplamadan farkı ne, kaç seans sürer? ' +
            'Süreç adım adım anlatılıyor.',
          giris:
            'İnley ve onley, dişteki boşluğun ağızda değil laboratuvarda üretilen bir parçayla ' +
            'kapatılmasıdır. Madde kaybı normal dolgu için fazla, kaplama için ise dişin sağlam kısmı ' +
            'hâlâ çok olduğunda gündeme gelir.',
          bolumler: [
            {
              baslik: 'İnley ile onley arasındaki fark',
              metin:
                'İnley dişin tepesindeki çukur alanı doldurur, tümsekleri örtmez. Onley ise bir ya da ' +
                'daha çok tümseği de kaplayacak biçimde uzanır. Hangisinin uygun olduğu, çürüğün ' +
                'tümseklere ulaşıp ulaşmadığına bakılarak belirlenir.'
            },
            {
              baslik: 'İşlem sırası',
              metin:
                'İlk seansta çürük temizlenir, dişin ölçüsü alınır ve geçici dolgu yapılır. Parça ' +
                'laboratuvarda üretilir. İkinci seansta uyumu kontrol edilip yapıştırıcıyla sabitlenir. ' +
                'İki seans arası genellikle birkaç gün ile bir hafta arasındadır.'
            },
            {
              baslik: 'Kaplamayla karşılaştırınca',
              metin:
                'Kaplamada diş çepeçevre küçültülür; inley ve onleyde yalnız kaybedilen bölge ' +
                'tamamlanır, sağlam doku yerinde kalır. Bu yüzden dişin büyük kısmı ayaktayken tercih ' +
                'edilir.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'Dişin hazırlanması',
              sure: 'Tek seans',
              aciklama:
                'Çürük temizlenir, ölçü alınır ve geçici dolgu yapılır.'
            },
            {
              asama: 'Laboratuvar üretimi',
              sure: 'Yaklaşık 1 hafta',
              aciklama:
                'Parça alınan ölçüye göre porselen ya da kompozitten kişiye özel üretilir.'
            },
            {
              asama: 'Yapıştırma',
              sure: 'Tek seans',
              aciklama:
                'Gelen parçanın uyumu kontrol edilir ve dişe kalıcı olarak yapıştırılır.'
            }
          ],
          karsilastirma: {
            baslik: 'İnley ile onley arasındaki fark',
            sutunlar: ['İnley', 'Onley'],
            satirlar: [
              {
                olcut: 'Kapsadığı alan',
                a: 'Dişin tepesindeki çiğneme çukurunu doldurur.',
                b: 'Çukurla birlikte bir ya da daha çok tümseği örter.'
              },
              {
                olcut: 'Hasarın boyutu',
                a: 'Orta boyutlu madde kayıpları.',
                b: 'Daha geniş kayıplar; henüz tam kaplama gerekmiyor.'
              },
              {
                olcut: 'Tümsek koruması',
                olcutAciklama: 'Kırılma riskini belirleyen ölçüt',
                a: 'Tümsekler açıkta kalır.',
                b: 'Zayıflamış tümsekler örtülerek desteklenir.'
              },
              {
                olcut: 'Sağlam dokuya müdahale',
                a: 'Yalnız çürük bölge hazırlanır.',
                b: 'Örtülecek tümsekler hafifçe şekillendirilir.'
              },
              {
                olcut: 'Yapısal destek',
                a: 'Standart dolguya göre daha fazla destek.',
                b: 'Dişin büyük bölümünü taşıyacak destek.'
              }
            ],
            dipnot:
              'Hangisinin uygulanacağı çürüğün genişliğine ve sağlam kalan tümsek sayısına bakılarak belirlenir.'
          },
          notlar: [
            'Yapıştırma sonrası birkaç saat o bölgeyle çiğneme yapılmaz.',
            'İlk günlerde sıcak ve soğuğa karşı geçici hassasiyet görülebilir.',
            'Geçici dolgu takılıyken yapışkan ve sert gıdalardan kaçınılmalıdır.'
          ],
          sorular: [
            {
              soru: 'Neden tek seansta bitmiyor?',
              cevap:
                'Parça ağızda değil, alınan ölçüye göre laboratuvarda üretiliyor. Bu üretim süresi ' +
                'iki seans arasındaki beklemenin sebebidir.'
            },
            {
              soru: 'Rengi dişime uyar mı?',
              cevap:
                'Porselen ve kompozit seçenekleri diş rengine göre belirlenir. Renk seçimi ölçü ' +
                'alınırken birlikte yapılır.'
            }
          ]
        }
      ]
    },
    {
      baslik: 'Pedodonti',
      kalemler: [
        {
          ad: 'Çocuk Diş Tedavisi',
          slug: 'cocuk-dis-tedavisi',
          dal: 'pedodonti',
          ozet: 'Süt ve karışık dişlenme döneminde çürük tedavisi, koruyucu uygulamalar ve alışkanlık takibi.',
          metaAciklama:
            'Çocuklarda diş tedavisi nasıl ilerler, ilk randevuda ne yapılır? Alsancak’taki kliniğimizin ' +
            'çocuk hastalar için ayrı bölümü bulunur.',
          giris:
            'Çocuk diş hekimliği yalnızca küçük ölçekte erişkin tedavisi değildir: süt dişlerinin yapısı, ' +
            'çürüğün ilerleme hızı ve çocuğun tedaviye uyumu ayrı bir yaklaşım gerektirir. İlk randevunun ' +
            'amacı çoğu zaman tedavi değil, tanışmadır.',
          bolumler: [
            {
              baslik: 'İlk randevu',
              metin:
                'İlk görüşmede diş sayılır, ağız içi gösterilir ve kullanılacak aletler çocuğa tanıtılır. ' +
                'Acil bir durum yoksa işleme aynı gün başlanmaz; amaç çocuğun koltuğu tanıdık bir yer ' +
                'olarak hatırlamasıdır.'
            },
            {
              baslik: 'Süt dişi neden tedavi edilir',
              metin:
                'Süt dişi düşecek diye bırakılan çürük ağrıya, iltihaba ve altındaki kalıcı diş tomurcuğunun ' +
                'etkilenmesine yol açabilir. Erken kaybedilen süt dişi ayrıca kalıcı dişe yer bırakmadığı ' +
                'için yer tutucu gerekebilir.'
            },
            {
              baslik: 'Koruyucu uygulamalar',
              metin:
                'Çürük görülmeden önce yapılan flor uygulaması ve fissür örtücü, arka dişlerin derin ' +
                'çukurlarını kapatarak çürük riskini azaltır. Bu işlemler kısa sürer ve uyuşturma gerektirmez.'
            }
          ],
          notlar: [
            'Randevudan önce çocuğa "acımayacak" gibi sözler vermek yerine ne yapılacağını sade anlatmak yeterlidir.',
            'Kliniğimizde çocuk hastalar için ayrı bekleme ve tedavi bölümü bulunur.',
            'Sabah saatleri küçük çocuklarda uyum açısından genellikle daha rahat geçer.'
          ],
          sorular: [
            {
              soru: 'İlk diş hekimi randevusu kaç yaşında olmalı?',
              cevap:
                'İlk dişin çıkmasından sonraki altı ay içinde, en geç bir yaş civarında bir tanışma ' +
                'randevusu önerilir. Bu randevu hem çürük riskini değerlendirir hem alışkanlıkları konuşur.'
            },
            {
              soru: 'Çocuğum tedaviye izin vermiyor, ne olur?',
              cevap:
                'Uyum bir seansta kurulmayabilir; işlem bölünerek ve kısa tutularak ilerlenir. Gerekli ' +
                'durumlarda tedavi planı hekimle birlikte yeniden düzenlenir.'
            }
          ]
        },
        {
          ad: 'Flor Uygulaması',
          slug: 'flor-uygulamasi',
          dal: 'pedodonti',
          ozet:
            'Diş minesini çürüğe karşı güçlendirmek için diş yüzeyine uygulanan koruyucu flor jeli ya da cilası.',
          metaAciklama:
            'Çocuklarda flor uygulaması nedir, nasıl yapılır, ne sıklıkla tekrarlanır? Uygulamanın ' +
            'tamamı ve sonrasında dikkat edilecekler.',
          giris:
            'Flor uygulaması, çürük başlamadan önce devreye giren koruyucu bir işlemdir. Diş yüzeyine ' +
            'sürülen flor, minenin asitlere karşı direncini artırmayı hedefler. Çocuğun çürük riski ' +
            'muayenede değerlendirilir ve uygulamanın gerekip gerekmediğine birlikte karar verilir.',
          bolumler: [
            {
              baslik: 'Uygulama nasıl geçer',
              metin:
                'Diş yüzeyleri temizlenip kurutulur, ardından flor jeli ya da cilası fırçayla sürülür. ' +
                'Uyuşturma gerekmez, iğne yoktur ve çocuk işlem boyunca oturur durumdadır. Tek seansta, ' +
                'genellikle on beş dakikanın altında biter.'
            },
            {
              baslik: 'Uygulamadan sonra',
              metin:
                'Kullanılan malzemeye göre yaklaşık yarım saat ile bir saat arasında yiyip içilmemesi ' +
                'istenir. Hekim o gün dişlerin fırçalanmamasını da söyleyebilir; bu, florun mineyle ' +
                'temas süresini uzatmak içindir.'
            },
            {
              baslik: 'Ne sıklıkla tekrarlanır',
              metin:
                'Çocuğun çürük riskine göre değişir. Sık aralık gerektiren durumlar da vardır, yılda ' +
                'bir kez yeterli olan durumlar da. Aralık her kontrolde yeniden değerlendirilir.'
            }
          ],
          notlar: [
            'Flor uygulaması diş fırçalamanın yerini tutmaz, ona ek olarak düşünülür.',
            'Evde kullanılan diş macununun flor içeriği hekime söylenmelidir.',
            'Uygulama sonrası dişlerde geçici bir renk ya da parlaklık farkı görülebilir.'
          ],
          sorular: [
            {
              soru: 'Çocuğum florü yutarsa ne olur?',
              cevap:
                'Klinikte kullanılan malzeme diş yüzeyinde kalacak kıvamdadır ve kontrollü miktarda ' +
                'uygulanır. Yine de uygulama sırasında tükürük emici kullanılır.'
            },
            {
              soru: 'Fissür örtücüden farkı ne?',
              cevap:
                'Fissür örtücü, arka dişlerin çiğneme yüzeyindeki dar olukları fiziksel olarak kapatır. ' +
                'Flor ise bir dolgu maddesi değildir; mineyi dışarıdan güçlendirmeyi amaçlar. İkisi çoğu ' +
                'zaman birlikte planlanır.'
            }
          ]
        },
        {
          ad: 'Fissür Örtücü',
          slug: 'fissur-ortucu',
          guncelleme: '2026-08-29',
          dal: 'pedodonti',
          ozet: 'Arka dişlerin derin çukurlarının akıcı bir maddeyle kapatılarak çürükten korunması.',
          metaAciklama:
            'Fissür örtücü nedir, hangi dişlere ve hangi yaşta uygulanır? İşlem sırası, ömrü ve ' +
            'flor uygulamasından farkı.',
          giris:
            'Fissür örtücü, azı dişlerinin çiğneme yüzeyindeki dar ve derin oluklara akıcı bir maddenin ' +
            'yerleştirilip sertleştirilmesidir. Bu oluklar fırça kılından dar olduğu için temizlenmesi zordur ' +
            've çürük çoğunlukla oradan başlar. Uygulama diş dokusundan madde kaldırmaz; yalnızca ' +
            'fırçanın giremediği yüzeyi kapatarak orada plak birikmesini engeller.',
          bolumler: [
            {
              baslik: 'Fissür nedir, neden çürüğün başladığı yerdir',
              metin:
                'Azı dişlerinin çiğneme yüzeyi düz değildir; tepecikler ve aralarındaki oluklardan oluşur. ' +
                'Bu oluklara fissür denir. Bazı dişlerde fissür sığ ve genişken, bazılarında dar bir yarık ' +
                'biçimindedir. Dar olanların dibine fırça kılı ulaşamaz, tükürüğün temizleyici etkisi de ' +
                'sınırlı kalır. Besin artığı ve plak orada birikince çürük süreci diğer yüzeylerden daha ' +
                'erken başlar.'
            },
            {
              baslik: 'Kimlere uygulanır',
              metin:
                'Yeni sürmüş kalıcı azı dişleri en uygun adaylardır; süt azılarına da uygulanabilir. ' +
                'Dişin çürüksüz ve tamamen sürmüş olması gerekir — diş eti hâlâ çiğneme yüzeyinin bir ' +
                'kısmını örtüyorsa yüzey kuru tutulamaz ve örtücü tutunmaz, bu durumda sürme tamamlanana ' +
                'kadar beklenir. Fissürü sığ ve geniş olan dişlerde uygulama gerekmeyebilir; karar ' +
                'muayenede dişe bakılarak verilir.'
            },
            {
              baslik: 'İşlem sırası',
              metin:
                'Diş temizlenip kurutulur, yüzey hazırlanır ve örtücü madde oluklara akıtılarak ışıkla ' +
                'sertleştirilir. Uyuşturma ve diş kesme gerekmez, tek diş için birkaç dakika sürer. ' +
                'İşlemin en kritik adımı yüzeyin kuru tutulmasıdır: tükürük bulaşırsa örtücü tutunmaz. ' +
                'Bu yüzden çocuk işlem boyunca ağzını açık tutabilmeli, gerekirse tükürük emici ve ' +
                'yanak ekartörü kullanılır.'
            },
            {
              baslik: 'Sonrasında ne olur',
              metin:
                'Uyuşturma yapılmadığı için çocuk işlemden hemen sonra normal hayatına döner ve yemek ' +
                'yiyebilir. İlk gün ısırma hissinde hafif bir yükseklik duygusu olabilir; bu genellikle ' +
                'birkaç saatte kaybolur, geçmezse örtücü inceltilir. Ağrı, hassasiyet veya renk değişikliği ' +
                'beklenen bulgular değildir.'
            },
            {
              baslik: 'Ömrü ve takip',
              metin:
                'Örtücü zamanla aşınabilir ya da kenarından ayrılabilir. Altı aylık kontrollerde durumu ' +
                'değerlendirilir, gerekirse tazelenir. Kısmen ayrılmış bir örtücü, hiç yapılmamış olmasından ' +
                'daha risklidir: kenarından sızan plak fark edilmeden birikir. Bu yüzden kontrol randevuları ' +
                'uygulamanın kendisi kadar önemlidir.'
            },
            {
              baslik: 'Örtücü mü, dolgu mu',
              metin:
                'Fissür örtücü koruyucu bir uygulamadır ve yalnız çürüksüz dişe yapılır. Oluğun dibinde ' +
                'çürük başlamışsa örtücü onu kapatmakla kalmaz, ilerlemesini gizler. Bu durumda çürük ' +
                'temizlenip dolgu yapılır; oluğun geri kalanı aynı seansta örtücüyle kapatılabilir. ' +
                'Hangisinin gerektiği muayenede ve gerekirse röntgenle belirlenir — dışarıdan bakınca ' +
                'renk değişikliği gösteren her oluk çürük değildir, her sağlam görünen oluk da temiz ' +
                'değildir.'
            },
            {
              baslik: 'Çocuğun işleme hazırlanması',
              metin:
                'Fissür örtücü, çocuğun diş hekimiyle ilk tanışması için elverişli bir ' +
                'işlemdir: iğne yok, diş kesilmiyor, birkaç dakika sürüyor. Bu deneyimin ' +
                'olumlu geçmesi sonraki randevuları kolaylaştırır. Evde ağrıyı gündeme ' +
                'getiren cümleler yerine ne yapılacağının basitçe anlatılması yeterlidir. ' +
                'Tek beklenen şey, çocuğun kısa süre ağzını açık tutabilmesidir; yüzey ' +
                'kuru kalmazsa örtücü tutunmaz.'
            }
          ],
          karsilastirma: {
            baslik: 'Fissür örtücü ile flor uygulaması',
            sutunlar: ['Fissür örtücü', 'Flor uygulaması'],
            satirlar: [
              {
                olcut: 'Ne yapar',
                olcutAciklama: 'İki yöntemin çalışma biçimi farklıdır',
                a: 'Oluğu fiziksel olarak kapatır, plağın girmesini engeller.',
                b: 'Mine yüzeyini güçlendirir, asit karşısındaki direncini artırır.'
              },
              {
                olcut: 'Hangi yüzeyi korur',
                a: 'Yalnız uygulandığı dişin çiğneme yüzeyini.',
                b: 'Ağızdaki bütün diş yüzeylerini.'
              },
              {
                olcut: 'Uygulama',
                a: 'Diş diş uygulanır, yüzeyin kuru kalması gerekir.',
                b: 'Jel veya vernik olarak tüm ağza uygulanır.'
              },
              {
                olcut: 'Tekrarı',
                a: 'Aşındıkça tazelenir; kontrolde değerlendirilir.',
                b: 'Belirli aralıklarla tekrarlanır.'
              },
              {
                olcut: 'Birbirinin yerine geçer mi',
                a: 'Hayır — arayüz çürüğüne etkisi yoktur.',
                b: 'Hayır — derin fissürün dibine ulaşamaz.'
              }
            ],
            dipnot:
              'İkisi seçenek değil, birbirini tamamlayan uygulamalardır; hangisinin gerekli olduğu çocuğun çürük riskine ve diş yüzeylerinin yapısına göre belirlenir.'
          },
          notlar: [
            'Uygulamadan hemen sonra yemek yenebilir.',
            'Örtücü fırçalama ihtiyacını ortadan kaldırmaz; yalnız ulaşılamayan oluğu kapatır.',
            'Dişler arasındaki yüzeyler örtücüyle korunmaz; diş ipi kullanımı sürmelidir.',
            'Örtücünün düştüğü fark edilirse kontrol randevusu beklenmeden bildirilmelidir.'
          ],
          sorular: [
            {
              soru: 'Fissür örtücü dişi keser mi?',
              cevap: 'Hayır. Diş dokusundan madde kaldırılmaz, yüzeye ek yapılır.'
            },
            {
              soru: 'Hangi yaşta yaptırmak gerekir?',
              cevap:
                'Belirli bir yaş değil, dişin sürme durumu belirleyicidir. Kalıcı azı dişi ağızda tamamen ' +
                'göründükten sonra uygulanabilir. Erken dönemde yapılması, çürük henüz başlamadan oluğun ' +
                'kapatılması anlamına gelir.'
            },
            {
              soru: 'Örtücünün altında çürük ilerler mi?',
              cevap:
                'Örtücü yalnız çürüksüz dişe uygulanır, bu yüzden altında ilerleyecek bir çürük olmaz. ' +
                'Kenarından ayrılma olursa oradan sızıntı başlayabilir; kontrollerde bakılan şey de budur.'
            },
            {
              soru: 'Ne kadar dayanır?',
              cevap:
                'Kişiden kişiye ve dişten dişe değişir. Çiğneme kuvvetinin yüksek olduğu dişlerde daha ' +
                'hızlı aşınır. Kesin bir süre verilemez; altı aylık kontrollerde durumuna bakılır.'
            },
            {
              soru: 'Süt dişine de yapılır mı?',
              cevap:
                'Yapılabilir. Süt azısının çiğneme yüzeyi de derin oluklu olabilir ve o diş birkaç yıl ' +
                'daha ağızda kalacaksa korunması anlamlıdır.'
            }
          ]
        },
        {
          ad: 'Yer Tutucu',
          slug: 'yer-tutucu',
          dal: 'pedodonti',
          ozet:
            'Erken kaybedilen süt dişinin boşluğunu, alttan gelecek kalıcı diş için açık tutan aparey.',
          metaAciklama:
            'Çocuklarda yer tutucu ne işe yarar, nasıl takılır, ne zaman çıkarılır? Ebeveynler için ' +
            'süreç anlatımı.',
          giris:
            'Süt dişleri yalnız çiğnemeye yaramaz; alttan gelecek kalıcı dişin yerini de saklar. Bir süt ' +
            'dişi zamanından önce kaybedildiğinde komşu dişler boşluğa doğru eğilebilir ve kalıcı dişe ' +
            'yer kalmayabilir. Yer tutucu, o boşluğu açık tutmak için takılan basit bir apareydir.',
          bolumler: [
            {
              baslik: 'Ne zaman gündeme gelir',
              metin:
                'Süt dişi çürük, darbe ya da iltihap yüzünden düşme zamanından çok önce çekildiğinde ' +
                'konuşulur. Kalıcı dişin sürmesine ne kadar kaldığı röntgenle değerlendirilir; süre ' +
                'kısaysa yer tutucu gerekmeyebilir.'
            },
            {
              baslik: 'Nasıl hazırlanır ve takılır',
              metin:
                'Çekim bölgesi iyileştikten sonra ağızdan ölçü alınır ve aparey laboratuvarda çocuğa ' +
                'özel hazırlanır. Sabit tipte komşu dişe yapıştırılır, hareketli tipte takılıp ' +
                'çıkarılabilir. Süreç genellikle iki üç seans ve birkaç hafta içinde tamamlanır.'
            },
            {
              baslik: 'Alışma ve bakım',
              metin:
                'İlk günlerde ağızda yabancı bir cisim hissi olur, çocuklar buna genellikle birkaç gün ' +
                'içinde alışır. Sakız ve lokum gibi yapışkan gıdalar apareyi yerinden oynatabilir. ' +
                'Çevresinde yemek birikmemesi için fırçalamaya özen gösterilmelidir.'
            },
            {
              baslik: 'Ne zaman çıkarılır',
              metin:
                'Alttaki kalıcı diş ağızda görünmeye başladığında hekim apareyi çıkarır. Bu yüzden ' +
                'aradaki kontrol randevuları aksatılmamalıdır; diş sürerken aparey yerinde kalırsa ' +
                'sürmeyi engelleyebilir.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'Çekim ve ölçü',
              sure: 'Tek seans',
              aciklama:
                'Süt dişi çekilir; bölge iyileştikten sonra ölçü alınır.'
            },
            {
              asama: 'Apareyin hazırlanması',
              sure: 'Birkaç gün',
              aciklama:
                'Çocuğun çene yapısına uygun yer tutucu laboratuvarda üretilir.'
            },
            {
              asama: 'Uygulama',
              sure: 'Tek seans',
              aciklama:
                'Aparey yapıştırılır ya da hareketliyse kullanımı anlatılır.'
            },
            {
              asama: 'Kontroller',
              sure: 'Birkaç ayda bir',
              aciklama:
                'Alttan gelen kalıcı dişin sürme durumu izlenir; sürünce aparey çıkarılır.'
            }
          ],
          notlar: [
            'Aparey gevşer ya da kırılırsa beklenmeden klinik aranmalıdır.',
            'Yer tutucu dişleri hareket ettirmez; ortodontik tedavi değildir.',
            'Kontroller genellikle birkaç ayda bir planlanır.'
          ],
          sorular: [
            {
              soru: 'Süt dişi zaten düşecekti, boşluk neden önemli?',
              cevap:
                'Düşme zamanı geldiğinde alttaki kalıcı diş sürmeye hazırdır ve boşluk hemen kapanır. ' +
                'Erken kayıpta ise arada aylar hatta yıllar olabilir; bu sürede komşu dişler yer ' +
                'değiştirebilir.'
            },
            {
              soru: 'Konuşmasını ya da yemesini etkiler mi?',
              cevap:
                'İlk birkaç gün hafif bir alışma dönemi olur. Sonrasında çocuklar apareyle rahatça ' +
                'yiyip konuşur.'
            }
          ]
        }
      ]
    },
    {
      baslik: 'Protez',
      kalemler: [
        {
          ad: 'Zirkonyum Kaplama',
          slug: 'zirkonyum-kaplama',
          guncelleme: '2026-08-29',
          dal: 'restoratif',
          ozet: 'Metal desteksiz, ışığı doğal dişe yakın geçiren dayanıklı bir kaplama seçeneği.',
          metaAciklama:
            'Zirkonyum kaplama nasıl yapılır, kaç seansta biter, hangi durumlarda tercih edilir? Süreç ve ' +
            'sonrasında dikkat edilecekler.',
          giris:
            'Zirkonyum kaplama, dişin üstüne geçirilen ve alt yapısında metal bulunmayan bir restorasyondur. ' +
            'Işığı doğal dişe yakın geçirdiği için diş etinde koyu bir sınır bırakmaz; bu yüzden özellikle ' +
            'gülüşte görünen dişlerde tercih edilir.',
          bolumler: [
            {
              baslik: 'Hangi durumlarda gündeme gelir',
              metin:
                'Büyük madde kaybı olan, kanal tedavisi görmüş ya da kırılmış dişlerde; renk ve biçim ' +
                'düzensizliğinin dolguyla giderilemediği durumlarda; köprü ayağı olarak kullanılacak dişlerde ' +
                'değerlendirilir.'
            },
            {
              baslik: 'İşlem sırası',
              metin:
                'Diş kaplama kalınlığı kadar inceltilir, ölçü alınır ve geçici kaplama takılır. Laboratuvarda ' +
                'hazırlanan kaplama provada renk ve uyum açısından denenir, uygun bulunduğunda yapıştırılır. ' +
                'Süreç çoğunlukla iki ile dört seans arasında tamamlanır.'
            },
            {
              baslik: 'Prova aşaması neden önemli',
              metin:
                'Kaplama yapıştırılmadan önce ağızda denenir. Bu aşamada renk, biçim, dişlerin ' +
                'birbirine oranı ve ısırma ilişkisi değerlendirilir. Yapıştırma işlemi geri dönüşü ' +
                'zor bir adımdır: kaplama söküldüğünde çoğunlukla yenilenmesi gerekir. Bu yüzden ' +
                'beklentiler prova sırasında, ayna karşısında ve gün ışığında konuşulmalıdır — ' +
                '"sonra alışırım" diye bırakılan bir ayrıntı sonradan düzeltilemez.'
            },
            {
              baslik: 'Bakımı',
              metin:
                'Kaplama çürümez ama altındaki diş ve çevresindeki diş eti çürüyebilir, iltihaplanabilir. ' +
                'Fırçalama, arayüz fırçası ve düzenli kontrol kaplamanın ömrünü doğrudan belirler. ' +
                'Kaplamanın en kırılgan noktası diş etiyle buluştuğu sınırdır: orada biriken plak ' +
                'hem diş etini iltihaplandırır hem altındaki dişte çürük başlatır. Çürük başladığında ' +
                'kaplamanın altında olduğu için geç fark edilir.'
            },
            {
              baslik: 'Ne zaman uygun değildir',
              metin:
                'Madde kaybı sınırlıysa kaplama gereksiz kesim demektir; bu durumda dolgu, inley/onley ' +
                'ya da lamina gibi daha az doku eksilten seçenekler değerlendirilir. Diş eti hastalığı ' +
                'tedavi edilmeden kaplama yapılmaz, çünkü diş eti sınırı iyileşme sırasında yer ' +
                'değiştirir ve kaplamanın kenarı açıkta kalır. Gece diş sıkma varsa kaplama ' +
                'planlanabilir ama koruyucu plak da planın parçası olur.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'Muayene ve planlama',
              sure: 'Tek seans',
              aciklama:
                'Dişin durumu ve diş eti sağlığı değerlendirilir; kaplamanın uygun seçenek olup olmadığı konuşulur.'
            },
            {
              asama: 'Hazırlık ve ölçü',
              sure: 'Tek seans',
              aciklama:
                'Diş kaplama kalınlığı kadar inceltilir, ölçü alınır ve geçici kaplama takılır.'
            },
            {
              asama: 'Laboratuvar ve prova',
              sure: '1-2 randevu',
              aciklama:
                'Kaplama hazırlanır ve ağızda denenir; renk, biçim ve ısırma ilişkisi bu aşamada değerlendirilir.'
            },
            {
              asama: 'Yapıştırma',
              sure: 'Tek seans',
              aciklama:
                'Uygun bulunan kaplama yapıştırılır ve son ısırma ayarı yapılır.'
            }
          ],
          karsilastirma: {
            baslik: 'Zirkonyum ile cam seramik (E-max)',
            sutunlar: ['Zirkonyum', 'Cam seramik (E-max)'],
            satirlar: [
              {
                olcut: 'Dayanıklılık',
                olcutAciklama: 'Arka dişlerde belirleyici ölçüt',
                a: 'Yüksek; çiğneme yükünün fazla olduğu bölgelerde tercih edilir.',
                b: 'İyi, ancak yüksek yük altında zirkonyumun gerisinde kalır.'
              },
              {
                olcut: 'Işık geçirgenliği',
                olcutAciklama: 'Ön dişlerde belirleyici ölçüt',
                a: 'İyi; metal desteklinin aksine koyu sınır bırakmaz.',
                b: 'Daha yüksek; doğal mineye en yakın görüntüyü verir.'
              },
              {
                olcut: 'Tipik kullanım yeri',
                a: 'Arka dişler, uzun köprüler, implant üstü.',
                b: 'Ön dişler, tek diş restorasyonları, lamina.'
              },
              {
                olcut: 'Gereken kesim',
                a: 'Kaplama kalınlığı kadar.',
                b: 'Benzer; lamina biçiminde daha az.'
              },
              {
                olcut: 'Köprüde kullanım',
                a: 'Uzun açıklıklarda kullanılabilir.',
                b: 'Uzun açıklıklarda tercih edilmez.'
              }
            ],
            dipnot:
              'Seçim malzemenin "daha iyi" olmasına değil dişin konumuna bağlıdır: gülüşte görünen tek dişte ışık geçirgenliği, arka azıda dayanıklılık öne çıkar.'
          },
          notlar: [
            'Geçici kaplama takılıyken çok sert ve yapışkan yiyeceklerden kaçınılmalıdır.',
            'Prova aşaması renk ve biçimin konuşulacağı aşamadır; beklentiler orada söylenmelidir.',
            'Gece diş sıkma varsa koruyucu plak önerilebilir.',
            'Geçici kaplama düşerse bekletilmeden takılmalıdır; diş hassaslaşır ve komşu dişler kayabilir.',
            'Kaplamanın diş etiyle birleştiği sınır günlük temizlikte atlanmamalıdır.'
          ],
          sorular: [
            {
              soru: 'Zirkonyum kaplama için diş çok kesilir mi?',
              cevap:
                'Kaplamanın oturması için belirli bir kalınlık gerekir; kesim miktarı dişin durumuna göre ' +
                'değişir. Madde kaybı azsa kaplama yerine daha az kesim gerektiren seçenekler değerlendirilir.'
            },
            {
              soru: 'Renk zamanla değişir mi?',
              cevap:
                'Zirkonyumun kendi rengi kahve ve çay gibi içeceklerden doğal diş kadar etkilenmez. ' +
                'Çevresindeki doğal dişlerin rengi zamanla değişebilir.'
            },
            {
              soru: 'Kaplamanın altındaki diş çürür mü?',
              cevap:
                'Kaplama çürümez ama altındaki diş çürüyebilir. Çürük çoğunlukla kaplamanın diş etiyle ' +
                'birleştiği sınırdan başlar. Kaplamanın altında kaldığı için gözle görülmez; ' +
                'kontrollerde ve gerektiğinde röntgenle takip edilir.'
            },
            {
              soru: 'Kaç seansta biter?',
              cevap:
                'Çoğunlukla iki ile dört seans arasında tamamlanır. Süreyi belirleyen şey laboratuvar ' +
                'aşaması ve prova sayısıdır; renk uyumunun kritik olduğu ön diş çalışmalarında ' +
                'ek prova randevusu gerekebilir.'
            },
            {
              soru: 'Kaplama düşerse ne yapmalıyım?',
              cevap:
                'Düşen kaplamayı saklayın ve bekletmeden randevu alın. Altındaki diş açıkta ' +
                'kaldığında hassaslaşır ve kısa sürede komşu dişler hafifçe kayarak kaplamanın ' +
                'yeniden oturmasını zorlaştırabilir.'
            }
          ]
        },
        {
          ad: 'Porselen Kaplama',
          slug: 'porselen-kaplama',
          dal: 'restoratif',
          ozet:
            'Metal altyapı üzerine porselen işlenen, çiğneme yükünün yüksek olduğu dişlerde kullanılan kaplama.',
          metaAciklama:
            'Metal destekli porselen kaplama nedir, hangi dişlerde tercih edilir, kaç seans sürer? ' +
            'Süreç ve diğer kaplama türlerinden farkı.',
          giris:
            'Porselen kaplama, içte dayanıklılığı sağlayan bir metal altyapı ile dışta diş biçimini ve ' +
            'rengini veren porselen tabakadan oluşur. Madde kaybı dolguyla karşılanamayacak kadar büyük ' +
            'olduğunda ve dişin ciddi çiğneme yükü taşıması gerektiğinde gündeme gelir.',
          bolumler: [
            {
              baslik: 'Hangi dişlerde tercih edilir',
              metin:
                'Çoğunlukla arka bölgede, önceliğin görünüm değil dayanıklılık olduğu dişlerde konuşulur. ' +
                'Ön bölgede de kullanılabilir, ancak orada ışık geçirgenliği yüksek seçenekler öne çıkar.'
            },
            {
              baslik: 'İşlem sırası',
              metin:
                'Diş uyuşturulur ve kaplamanın oturacağı kadar küçültülür, ardından ölçü alınır. ' +
                'Laboratuvar üretimi sürerken geçici kaplama takılır. Gelen kaplama provada uyum ve renk ' +
                'yönünden kontrol edilir, sonra yapıştırılır. Süreç genellikle üç dört seans sürer.'
            },
            {
              baslik: 'Zamanla ne değişir',
              metin:
                'Diş eti yıllar içinde çekilirse metal altyapı diş eti sınırında ince gri bir çizgi olarak ' +
                'belirebilir. Bu, kaplamanın bozulduğu anlamına gelmez ama görünüm önemliyse baştan ' +
                'metalsiz seçenekler konuşulmalıdır.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'Kesim ve ölçü',
              sure: 'Tek seans',
              aciklama:
                'Diş kaplama kalınlığı kadar küçültülür, ölçü alınır ve geçici kaplama takılır.'
            },
            {
              asama: 'Altyapı provası',
              sure: '1-2 randevu',
              aciklama:
                'Porselene destek olacak metal altyapının dişe oturması denenir.'
            },
            {
              asama: 'Porselen provası',
              sure: '1-2 randevu',
              aciklama:
                'Porselenin rengi ve biçimi ağızda değerlendirilir, gerekirse düzeltilir.'
            },
            {
              asama: 'Kalıcı yapıştırma',
              sure: 'Tek seans',
              aciklama:
                'Uyum onaylandıktan sonra kaplama dişe yapıştırılır.'
            }
          ],
          karsilastirma: {
            baslik: 'Metal destekli porselen ile zirkonyum arasındaki fark',
            sutunlar: ['Metal destekli porselen', 'Zirkonyum'],
            satirlar: [
              {
                olcut: 'Altyapı',
                a: 'Porselenin altında gri metal alaşım.',
                b: 'Porselenin altında beyaz zirkonyum.'
              },
              {
                olcut: 'Işık geçirgenliği',
                a: 'Metal ışığı engeller, görünüm daha mat.',
                b: 'Işığı daha iyi geçirir, doğal dişe yakın durur.'
              },
              {
                olcut: 'Diş eti sınırı',
                olcutAciklama: 'Yıllar içinde fark edilen ölçüt',
                a: 'Diş eti çekilirse ince gri çizgi belirebilir.',
                b: 'Gri yansıma sorunu görülmez.'
              },
              {
                olcut: 'Ağırlık',
                a: 'Metal nedeniyle daha ağır.',
                b: 'Belirgin biçimde daha hafif.'
              },
              {
                olcut: 'Doku uyumu',
                a: 'Alaşıma duyarlılık bildirilmişse dikkate alınır.',
                b: 'Doku uyumu yüksektir.'
              },
              {
                olcut: 'Öne çıktığı yer',
                a: 'Çiğneme yükü yüksek arka dişler.',
                b: 'Görünen ön bölge ve estetik beklentinin yüksek olduğu dişler.'
              }
            ],
            dipnot:
              'Seçim, dişin ağızdaki konumuna ve görünüm ile dayanıklılık arasındaki önceliğe göre yapılır.'
          },
          notlar: [
            'İlk günlerde sıcak ve soğuğa karşı geçici hassasiyet görülebilir.',
            'Sert kabuklu gıdaları kaplamayla kırmaktan kaçınılmalıdır.',
            'Kaplama kenarı ile diş eti sınırı fırçalamada atlanmamalıdır.'
          ],
          sorular: [
            {
              soru: 'MR çektirmeme engel olur mu?',
              cevap:
                'Diş hekimliğinde kullanılan alaşımlar genellikle sorun çıkarmaz. Yine de görüntüleme ' +
                'öncesinde ağzınızdaki kaplama ve protezleri ilgili birime bildirin.'
            },
            {
              soru: 'Zirkonyumdan farkı ne?',
              cevap:
                'Zirkonyumda altyapı metal değil beyaz seramiktir, bu yüzden ışığı daha doğal geçirir ve ' +
                'diş eti sınırında gri çizgi sorunu yaşanmaz. Hangisinin uygun olduğu dişin yerine ve ' +
                'beklentiye göre belirlenir.'
            }
          ]
        },
        {
          ad: 'E-Max Kaplama',
          slug: 'e-max-kaplama',
          dal: 'restoratif',
          ozet:
            'Metal altyapısı olmayan, güçlendirilmiş cam seramikten üretilen ve ışığı doğala yakın geçiren kaplama.',
          metaAciklama:
            'E-Max kaplama nedir, hangi dişlerde uygulanır, metal destekli kaplamadan farkı ne? ' +
            'Süreç adım adım anlatılıyor.',
          giris:
            'E-Max, içinde metal bulunmayan bir cam seramik türüdür. Altyapı opak bir metal olmadığı için ' +
            'ışık kaplamanın içinden doğal dişe benzer biçimde geçer. Bu yüzden çoğunlukla gülüşte ' +
            'görünen ön dişlerde konuşulur.',
          bolumler: [
            {
              baslik: 'Hangi durumlarda gündeme gelir',
              metin:
                'Beyazlatmayla açılmayan kalıcı renklenmeler, biçim bozuklukları ve hafif düzensizlikler ' +
                'için değerlendirilir. Dişte büyük yapısal kayıp varsa laminadan çok tam kaplama biçiminde ' +
                'planlanır.'
            },
            {
              baslik: 'İşlem sırası',
              metin:
                'Diş, kaplamanın kalınlığı kadar aşındırılır ve ölçü alınır. Geçici kaplama takılır. ' +
                'Laboratuvardan gelen seramik önce provada denenir; renk ve biçim onaylandıktan sonra ' +
                'yapıştırılır. Genellikle iki üç seans sürer.'
            },
            {
              baslik: 'Arka dişlerde durum',
              metin:
                'Arka bölgedeki çiğneme kuvvetleri daha yüksektir. Bu bölge için zirkonyum gibi başka ' +
                'seçenekler de değerlendirilir; karar dişin konumuna ve kapanışa bakılarak verilir.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'Hazırlık ve ölçü',
              sure: 'Tek seans',
              aciklama:
                'Diş yüzeyi kaplama için hazırlanır, ölçü alınır ve geçici kaplama takılır.'
            },
            {
              asama: 'Estetik prova',
              sure: '1-2 randevu',
              aciklama:
                'Seramiğin rengi, saydamlığı ve biçimi ağızda kontrol edilir.'
            },
            {
              asama: 'Kalıcı yapıştırma',
              sure: 'Tek seans',
              aciklama:
                'Onaylanan kaplama özel yapıştırıcıyla dişe sabitlenir.'
            }
          ],
          notlar: [
            'Buz, sert şeker ya da kalem gibi cisimleri ön dişlerle ısırmaktan kaçınılmalıdır.',
            'Gece diş sıkma varsa hekime söylenmeli, gerekirse koruyucu plak planlanmalıdır.',
            'Diş arası temizliği kaplamanın kenar sağlığı için önemlidir.'
          ],
          sorular: [
            {
              soru: 'Zamanla sararır mı?',
              cevap:
                'Seramik yüzey doğal mineye göre renklenmeye daha dirençlidir. Yine de kaplama kenarındaki ' +
                'kendi diş dokunuz ve diş eti sınırı renklenebilir; düzenli temizlik farkı korur.'
            },
            {
              soru: 'Beyazlatma yaptırsam kaplama da açılır mı?',
              cevap:
                'Hayır, beyazlatma yalnız doğal dişe etki eder. Bu yüzden beyazlatma düşünülüyorsa ' +
                'kaplamadan önce yapılır ve kaplama rengi ona göre seçilir.'
            }
          ]
        },
        {
          ad: 'Lamina Kaplama',
          slug: 'lamina-kaplama',
          dal: 'restoratif',
          ozet:
            'Yalnız dişin ön yüzeyine yapıştırılan, yaprak inceliğinde porselen tabaka.',
          metaAciklama:
            'Lamina (veneer) kaplama nedir, hangi durumlarda uygulanır, tam kaplamadan farkı ne? ' +
            'Süreç ve sonrasında dikkat edilecekler.',
          giris:
            'Lamina, dişi çepeçevre sarmayan, yalnız görünen ön yüzeye yapıştırılan ince porselen ' +
            'tabakadır. Dişin arka ve yan yüzeyleri kendi dokusuyla kaldığı için, yapısal kayıp ' +
            'olmayan ama görünümü değiştirilmek istenen dişlerde konuşulur.',
          bolumler: [
            {
              baslik: 'Hangi durumlarda konuşulur',
              metin:
                'Diş aralarındaki boşluklar, ön yüzeydeki biçim bozuklukları ve beyazlatmayla ' +
                'açılmayan kalıcı renklenmeler başlıca nedenlerdir. Çapraşıklık belirginse önce ' +
                'ortodontik tedavi değerlendirilir; laminayla diş düzeltilmez, örtülür.'
            },
            {
              baslik: 'Ne kadar aşındırma gerekir',
              metin:
                'Ön yüzeyden milimetrenin altında ince bir tabaka kaldırılır; bazı durumlarda hiç ' +
                'aşındırma yapılmadan da planlanabilir. Ne kadar kaldırılacağı dişin mevcut konumuna ve ' +
                'hedeflenen biçime bağlıdır.'
            },
            {
              baslik: 'İşlem sırası',
              metin:
                'Aşındırma sonrası ölçü alınır ve gerekirse geçici lamina takılır. Laboratuvardan gelen ' +
                'parçalar önce kuru provada denenir, biçim ve renk onaylandıktan sonra yapıştırılır. ' +
                'Genellikle iki üç seans sürer.'
            },
            {
              baslik: 'Tam kaplamadan farkı',
              metin:
                'Tam kaplamada diş her yönden küçültülür. Laminada yalnız ön yüzey hazırlanır, sağlam ' +
                'doku büyük ölçüde korunur. Buna karşılık lamina, kırılmış ya da çok zayıflamış dişlerde ' +
                'yeterli desteği bulamaz.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'Planlama',
              sure: 'Tek seans',
              aciklama:
                'Gülüş tasarımı yapılır ve dişlere ne kadar dokunulacağı belirlenir.'
            },
            {
              asama: 'Yüzey hazırlığı',
              sure: 'Tek seans',
              aciklama:
                'Ön yüzeyden ince bir tabaka kaldırılır ve ölçü alınır.'
            },
            {
              asama: 'Prova',
              sure: '1-2 randevu',
              aciklama:
                'Yaprak porselenlerin ağızdaki duruşu ve uyumu denenir.'
            },
            {
              asama: 'Kalıcı yapıştırma',
              sure: 'Tek seans',
              aciklama:
                'Laminalar dişlerin ön yüzeyine tek tek yapıştırılır.'
            }
          ],
          karsilastirma: {
            baslik: 'Lamina ile bonding arasındaki fark',
            sutunlar: ['Lamina', 'Bonding'],
            satirlar: [
              {
                olcut: 'Malzeme',
                a: 'Laboratuvarda üretilen ince porselen.',
                b: 'Hekimin ağızda işlediği kompozit.'
              },
              {
                olcut: 'Diş dokusundan kaldırılan',
                olcutAciklama: 'Geri dönüşü belirleyen ölçüt',
                a: 'Ön yüzeyden milimetrenin altında bir tabaka.',
                b: 'Çoğu durumda aşındırma yapılmaz.'
              },
              {
                olcut: 'Seans',
                a: 'Ölçü ve laboratuvar için 2-3 seans.',
                b: 'Çoğunlukla tek seans.'
              },
              {
                olcut: 'Renklenme',
                a: 'Renklenmeye belirgin biçimde daha dirençlidir.',
                b: 'Zamanla yüzeysel renklenebilir; cilayla tazelenir.'
              },
              {
                olcut: 'Aşınma',
                a: 'Aşınma ve çizilmeye daha dayanıklı.',
                b: 'Zamanla aşınabilir, kenarları kırılabilir.'
              },
              {
                olcut: 'Onarım',
                a: 'Kırılan parça genellikle yenilenir.',
                b: 'Çoğu zaman yerinde onarılabilir.'
              }
            ],
            dipnot:
              'Seçim, dişteki değişimin boyutuna ve dokudan ne kadar ödün verilmek istendiğine göre yapılır.'
          },
          notlar: [
            'Elma, havuç gibi sert gıdalar ön dişlerle koparılmamalı, dilimlenerek yenmelidir.',
            'Tırnak yeme ve kalem ısırma alışkanlıkları laminanın ömrünü kısaltır.',
            'Diş sıkma şikâyeti varsa gece plağı planlanabilir.'
          ],
          sorular: [
            {
              soru: 'Laminalar düşer mi?',
              cevap:
                'Yapıştırma kimyasal bağla yapılır ve günlük kullanımda yerinde kalması beklenir. ' +
                'Darbe, sert ısırma ya da diş sıkma bu bağı zorlayabilir; böyle bir durumda parça ' +
                'saklanıp klinik aranmalıdır.'
            },
            {
              soru: 'Geri dönüşü var mı?',
              cevap:
                'Aşındırma yapılmışsa diş eski hâline dönmez. Bu yüzden karar öncesinde prova ' +
                '(mock-up) ile sonucun önizlemesi yapılır.'
            }
          ]
        },
        {
          ad: 'Köprü Protezi',
          slug: 'kopru-protezi',
          dal: 'restoratif',
          ozet:
            'Eksik dişin boşluğunu, iki yanındaki dişlerden destek alan sabit bir gövdeyle kapatan protez.',
          metaAciklama:
            'Köprü protezi nedir, implanttan farkı ne, kaç seans sürer? Süreç ve köprü altının ' +
            'temizliği anlatılıyor.',
          giris:
            'Köprü, eksik dişin yerine gelen gövdenin komşu dişlere bağlanmasıyla kurulan sabit bir ' +
            'protezdir. Hasta takıp çıkaramaz. İmplantın uygun olmadığı ya da tercih edilmediği ' +
            'durumlarda boşluğu kapatmanın yerleşik yoludur.',
          bolumler: [
            {
              baslik: 'Karar nasıl verilir',
              metin:
                'Boşluğun iki yanındaki dişlerin sağlamlığı ve kemik durumu belirleyicidir. Komşu dişler ' +
                'zaten kaplama gerektiriyorsa köprü daha kolay gerekçelendirilir; sapasağlam dişlerin ' +
                'küçültülmesi gerekiyorsa önce implant konuşulur.'
            },
            {
              baslik: 'İşlem sırası',
              metin:
                'Destek dişler kaplama yapılacakmış gibi küçültülür ve ölçü alınır. Geçici köprü takılır. ' +
                'Laboratuvarda üretilen gövde provada kapanış yönünden denenir, ardından yapıştırılır. ' +
                'Süreç genellikle üç dört seans sürer.'
            },
            {
              baslik: 'Köprü altının temizliği',
              metin:
                'Gövdenin altı diş ipiyle normal yoldan temizlenemez; ara yüz fırçası ya da köprü altından ' +
                'geçirilen özel diş ipi gerekir. Bu bölge temiz tutulmazsa diş eti iltihabı ve destek ' +
                'dişlerde çürük riski artar. Temizlik yöntemi teslimde gösterilir.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'Destek dişlerin hazırlanması',
              sure: 'Tek seans',
              aciklama:
                'Komşu dişler küçültülür, ölçü alınır ve geçici köprü takılır.'
            },
            {
              asama: 'Altyapı ve estetik prova',
              sure: '2-3 randevu',
              aciklama:
                'Köprünün oturması, çiğneme dengesi ve rengi kontrol edilir.'
            },
            {
              asama: 'Kalıcı yapıştırma',
              sure: 'Tek seans',
              aciklama:
                'Köprü destek dişlerin üzerine sabitlenir ve temizliği anlatılır.'
            }
          ],
          karsilastirma: {
            baslik: 'Köprü ile tek implant arasındaki fark',
            sutunlar: ['Köprü protezi', 'Tek implant'],
            satirlar: [
              {
                olcut: 'Komşu dişlere etki',
                olcutAciklama: 'Kararın en belirleyici yanı',
                a: 'Boşluğun iki yanındaki dişler küçültülür.',
                b: 'Komşu dişlere dokunulmaz.'
              },
              {
                olcut: 'Cerrahi',
                a: 'Cerrahi işlem gerekmez.',
                b: 'İmplantın yerleştirilmesi cerrahi bir işlemdir.'
              },
              {
                olcut: 'Süre',
                a: 'Ölçü ve provalarla birkaç hafta içinde tamamlanır.',
                b: 'Kemikle kaynaşma için birkaç ay beklenir.'
              },
              {
                olcut: 'Çene kemiği',
                a: 'Boşluktaki kemik zamanla erimeye devam edebilir.',
                b: 'Yapay kök kemiğin uyarılmasını sürdürür.'
              },
              {
                olcut: 'Temizlik',
                a: 'Gövde altı özel diş ipi ya da ara yüz fırçası ister.',
                b: 'Doğal diş gibi fırçalanır, diş ipi kullanılır.'
              },
              {
                olcut: 'Onarım',
                a: 'Sorun çıkarsa köprü blok hâlinde sökülür.',
                b: 'Genellikle yalnız üstteki kaplama değiştirilir.'
              }
            ],
            dipnot:
              'Seçim komşu dişlerin sağlığına, bölgedeki kemik hacmine ve cerrahi istenip istenmediğine göre yapılır.'
          },
          notlar: [
            'Destek dişlerin sağlığı köprünün ömrünü doğrudan belirler.',
            'Kontroller aksatılmamalı, kenar uyumu düzenli olarak değerlendirilmelidir.',
            'Köprü altında koku ya da kanama başlarsa klinik aranmalıdır.'
          ],
          sorular: [
            {
              soru: 'Sağlam dişlerimin küçültülmesi şart mı?',
              cevap:
                'Köprünün doğası gereği gövdeyi taşıyacak destek gerekir, bu yüzden komşu dişler belirli ' +
                'oranda küçültülür. Bunu istemiyorsanız implant seçeneği değerlendirilmelidir.'
            },
            {
              soru: 'İmplantla köprü arasında nasıl seçim yapılır?',
              cevap:
                'Kemik miktarı, komşu dişlerin durumu, genel sağlık ve cerrahi istenip istenmediği ' +
                'birlikte değerlendirilir. İkisinin de uygun olduğu durumlarda seçenekler karşılaştırılarak ' +
                'karar verilir.'
            }
          ]
        },
        {
          ad: 'Hareketli Protez',
          slug: 'hareketli-protez',
          ozet:
            'Çok sayıda diş eksikliğinde dokudan ve kalan dişlerden destek alan, takılıp çıkarılabilen protez.',
          metaAciklama:
            'Hareketli protez nedir, nasıl hazırlanır, nasıl temizlenir? Alışma süreci ve bakımı ' +
            'anlatılıyor.',
          giris:
            'Hareketli protez, sabit bir çözümün kurulamadığı geniş diş eksikliklerinde kullanılır. ' +
            'Hasta tarafından takılıp çıkarılır; desteğini diş etinden, damaktan ve varsa kalan ' +
            'dişlerden alır.',
          bolumler: [
            {
              baslik: 'Ne zaman gündeme gelir',
              metin:
                'Eksik diş sayısı köprüyle kapatılamayacak kadar fazlaysa, kalan dişler sabit bir protezi ' +
                'taşıyacak konumda değilse ya da implant uygun değilse konuşulur. Tam dişsizlikte tüm ' +
                'çeneyi kapsayan biçimde de yapılır.'
            },
            {
              baslik: 'Hazırlanma aşamaları',
              metin:
                'Ölçü tek seferde bitmez: önce ön ölçü, sonra kişiye özel kaşıkla hassas ölçü alınır. ' +
                'Kapanış seviyesi belirlenir, dişler mumdan bir modelde dizilip provada denenir. Onay ' +
                'sonrası protez bitirilir. Süreç genellikle dört ile altı seans arasındadır.'
            },
            {
              baslik: 'Alışma dönemi',
              metin:
                'İlk günlerde konuşmada ve çiğnemede zorlanma olağandır; dil ve yanak kaslarının uyum ' +
                'sağlaması zaman alır. Vuran noktalar için düzeltme randevuları planlanır — ağrıyan bir ' +
                'protezle beklenmemeli, düzeltilmelidir.'
            },
            {
              baslik: 'Temizlik ve saklama',
              metin:
                'Protez ana yemeklerden sonra çıkarılıp fırçayla temizlenir. Diş macunundaki aşındırıcılar ' +
                'yüzeyi çizebildiği için sıvı sabun ya da protez temizleme tabletleri tercih edilir. ' +
                'Gece çıkarılıp dokuların dinlenmesi önerilir.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'İlk ölçü',
              sure: 'Tek seans',
              aciklama:
                'Çenenin genel yapısını kaydetmek için başlangıç ölçüsü alınır.'
            },
            {
              asama: 'Hassas ölçü ve kapanış',
              sure: '2-3 randevu',
              aciklama:
                'Kişiye özel kaşıkla hassas ölçü alınır, alt-üst çene ilişkisi belirlenir.'
            },
            {
              asama: 'Dişli prova',
              sure: '1-2 randevu',
              aciklama:
                'Mum model üzerine dizilen dişlerle görünüm ve kapanış denenir.'
            },
            {
              asama: 'Teslim',
              sure: 'Tek seans',
              aciklama:
                'Bitirilen protez takılır, kullanımı ve bakımı anlatılır.'
            },
            {
              asama: 'Uyum kontrolleri',
              sure: 'Birkaç randevu',
              aciklama:
                'Vuran noktalar düzeltilir; ağrıyan protezle beklenmez.'
            }
          ],
          karsilastirma: {
            baslik: 'Kancalı hareketli protez ile hassas tutuculu protez',
            sutunlar: ['Hareketli protez', 'Hassas tutuculu protez'],
            satirlar: [
              {
                olcut: 'Tutunma',
                a: 'Kalan dişlere metal kancayla tutunur.',
                b: 'Kaplamaların içine gizlenmiş kilitlerle tutunur.'
              },
              {
                olcut: 'Görünüm',
                a: 'Kancalar gülerken görünebilir.',
                b: 'Görünür metal parça bulunmaz.'
              },
              {
                olcut: 'Destek dişlere müdahale',
                olcutAciklama: 'Karşılığı olan ölçüt',
                a: 'Sağlam dişlere dokunulmadan uygulanabilir.',
                b: 'Destek dişlerin küçültülüp kaplanması gerekir.'
              },
              {
                olcut: 'Ağızdaki oturma',
                a: 'Çiğnerken bir miktar hareket olabilir.',
                b: 'Kilitler sayesinde daha az hareket eder.'
              },
              {
                olcut: 'Takıp çıkarma',
                a: 'Kancalar esnediği için görece kolay.',
                b: 'Kilidin yönüne dikkat etmek gerekir; alışkanlıkla kolaylaşır.'
              },
              {
                olcut: 'Bakım',
                a: 'Kancaların çevresi özenle temizlenir.',
                b: 'Kilit parçaları zamanla aşınabilir, kontrolde yenilenir.'
              }
            ],
            dipnot:
              'Seçim, ağızda kalan dişlerin konumuna ve destek dişlerin kaplanmasının kabul edilip edilmediğine göre yapılır.'
          },
          notlar: [
            'Protez kendiliğinden gevşerse ya da vurmaya başlarsa evde düzeltilmeye çalışılmamalıdır.',
            'Çene kemiği yıllar içinde değişir; protezin astarlanması gerekebilir.',
            'Kalan dişlerin bakımı, protezin bakımından daha önemlidir.'
          ],
          sorular: [
            {
              soru: 'Yemek yerken oynar mı?',
              cevap:
                'Özellikle alt çenede doku desteği sınırlı olduğu için bir miktar hareket olabilir. ' +
                'Alışma süreci ve gerektiğinde yapılan düzeltmeler bunu azaltır; implant destekli ' +
                'seçenekler de değerlendirilebilir.'
            },
            {
              soru: 'Geceleri takmam gerekir mi?',
              cevap:
                'Genellikle çıkarılması önerilir; diş eti ve damak dokusunun dinlenmesi için. Hekiminiz ' +
                'sizin durumunuz için farklı bir öneride bulunabilir.'
            }
          ]
        },
        {
          ad: 'Hassas Tutuculu Protez',
          slug: 'hassas-tutuculu-protez',
          ozet:
            'Görünen metal kanca yerine, kaplamaların içine gizlenmiş kilitlerle tutunan hareketli protez.',
          metaAciklama:
            'Hassas tutuculu protez nedir, standart hareketli protezden farkı ne, nasıl hazırlanır? ' +
            'Süreç ve bakımı anlatılıyor.',
          giris:
            'Hassas tutuculu protez, hareketli protezin tutunma biçimi değiştirilmiş hâlidir. Kalan ' +
            'dişlere yapılan kaplamaların içine gizli kilit yuvaları yerleştirilir; protez bu kilitlere ' +
            'oturur. Dışarıdan metal kanca görünmez.',
          bolumler: [
            {
              baslik: 'Kimde gündeme gelir',
              metin:
                'Arka dişleri kaybedilmiş, boşluk köprüyle kapatılamayacak kadar geniş olan ve standart ' +
                'protezdeki kanca görünümünü istemeyen hastalarda konuşulur. Kilitleri taşıyacak destek ' +
                'dişlerin sağlam olması gerekir.'
            },
            {
              baslik: 'İki aşamalı yapılır',
              metin:
                'Önce destek dişlere, kilit yuvasını içinde barındıran sabit kaplamalar hazırlanır. ' +
                'Ardından bu kilitlere oturan hareketli parça yapılır. İki aşama birlikte planlandığı ' +
                'için süreç genellikle dört ile altı seans arasındadır.'
            },
            {
              baslik: 'Standart protezden farkı',
              metin:
                'Standart hareketli protez dişe metal kancayla tutunur ve bu kancalar gülerken ' +
                'görünebilir. Burada tutuculuk kaplamanın içindedir; hem görünüm hem de ağızdaki ' +
                'oturma açısından fark yaratır. Karşılığında destek dişlerin kaplanması gerekir.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'Sabit parçaların hazırlığı',
              sure: '2-3 randevu',
              aciklama:
                'Destek dişlere, kilit yuvasını taşıyan kaplamalar yapılır.'
            },
            {
              asama: 'Hareketli parça ölçüsü',
              sure: 'Tek seans',
              aciklama:
                'Sabitlenen kaplamalar üzerinden hassas ölçü alınır.'
            },
            {
              asama: 'Prova ve uyum',
              sure: '1-2 randevu',
              aciklama:
                'Hareketli bölümün kilitlere tam oturup oturmadığı denenir.'
            },
            {
              asama: 'Teslim',
              sure: 'Tek seans',
              aciklama:
                'Protez takılır ve takıp çıkarma yönü birlikte çalışılır.'
            }
          ],
          notlar: [
            'Kilit parçaları zamanla aşınabilir; kontrollerde değerlendirilir ve gerekirse yenilenir.',
            'Takıp çıkarma yönü bellidir, zorlanarak değil gösterildiği gibi yapılmalıdır.',
            'Destek dişlerin çevresi özenle temizlenmelidir.'
          ],
          sorular: [
            {
              soru: 'Takıp çıkarması zor mu?',
              cevap:
                'İlk günlerde kilitler sıkı gelebilir. Doğru yön alışkanlık hâline geldiğinde işlem ' +
                'kolaylaşır; teslimde birlikte denenir.'
            },
            {
              soru: 'Protez olduğu belli olur mu?',
              cevap:
                'Görünür metal kanca bulunmadığı için gülüşte tutucu parçalar dışarıdan seçilmez.'
            }
          ]
        }
      ]
    },
    {
      baslik: 'Ağız-diş ve çene cerrahisi',
      kalemler: [
        {
          ad: 'Diş Çekimi',
          slug: 'dis-cekimi',
          guncelleme: '2026-08-29',
          ozet: 'Kurtarılamayan dişin uyuşturma altında alınması ve iyileşme sürecinin yönetilmesi.',
          metaAciklama:
            'Diş çekimi nasıl yapılır, sonrasında nelere dikkat edilir, iyileşme ne kadar sürer?',
          giris:
            'Diş çekimi, dişin tedaviyle korunamayacağı durumlarda uygulanan son adımdır. Karar röntgen ve ' +
            'muayene sonrasında verilir; çekimden önce dişin kurtarılabileceği seçenekler konuşulur.',
          bolumler: [
            {
              baslik: 'Karar nasıl verilir',
              metin:
                'Çekim ilk seçenek değil son adımdır. Kanal tedavisi, kanal yenileme, kök ucu cerrahisi ' +
                've protetik onarım gibi dişi yerinde tutan yollar önce değerlendirilir. Kökte ' +
                'onarılamayacak bir kırık varsa, diş eti hastalığı dişi tutan kemiği büyük ölçüde ' +
                'eritmişse ya da geride kurtarılabilir yeterli diş dokusu kalmamışsa çekim gündeme ' +
                'gelir. Karar röntgen ve muayeneyle birlikte verilir.'
            },
            {
              baslik: 'İşlem sırası',
              metin:
                'Bölge uyuşturulur ve dişin bağ dokusundan ayrılması sağlanır. İşlem sırasında ağrı değil ' +
                'basınç hissedilir. Çekim sonrası bölgeye tampon konur ve gerekirse dikiş atılır. ' +
                'Kökün biçimine ve konumuna göre diş bölünerek parça parça alınabilir; bu, işlemin ' +
                'zorlaştığı anlamına gelmez, çevredeki kemiği korumak için tercih edilen bir yoldur.'
            },
            {
              baslik: 'Basit çekim ile cerrahi çekim',
              metin:
                'Ağızda görünen ve tutamak verecek kadar sağlam bir diş, sarsma hareketleriyle alınabilir; ' +
                'buna basit çekim denir. Diş kırıksa, diş eti altında kalmışsa ya da kökleri ayrık ve ' +
                'eğriyse diş etine küçük bir kesi yapılıp diş görünür hâle getirilir. İkisi arasındaki ' +
                'fark ağrı değil, erişim yöntemidir — her ikisinde de bölge uyuşturulur.'
            },
            {
              baslik: 'İlk yirmi dört saat',
              metin:
                'Pıhtının yerinde kalması iyileşmenin tamamıdır. Bu yüzden ilk gün ağız çalkalanmaz, ' +
                'tükürülmez, pipet kullanılmaz ve sigara içilmez. Soğuk uygulama şişliği azaltır. ' +
                'Bu kuralların hepsi tek bir amaca hizmet eder: boşlukta oluşan pıhtı, altındaki kemiği ' +
                've siniri örten geçici bir örtüdür. Emme hareketi ya da çalkalama onu yerinden ' +
                'çıkarabilir.'
            },
            {
              baslik: 'İyileşme nasıl ilerler',
              metin:
                'İlk günlerde şişlik ve hafif rahatsızlık beklenir, genellikle ikinci günden sonra ' +
                'azalmaya başlar. Diş eti boşluğun üzerini birkaç hafta içinde kapatır; altındaki ' +
                'kemiğin dolması ise aylar sürer. Bu yüzden implant ya da köprü planı, diş etinin ' +
                'kapanmasına değil kemiğin durumuna göre zamanlanır.'
            },
            {
              baslik: 'Boşluğun geleceği',
              metin:
                'Çekilen dişin boşluğu uzun süre boş bırakılırsa komşu dişler eğilir, karşı diş uzar. ' +
                'İmplant ya da köprü planı iyileşme tamamlandıktan sonra konuşulur. Bu hareketler ' +
                'yavaş ama geri dönüşsüzdür: dişler kaydıktan sonra boşluğa protez yapmak için ' +
                'önce ortodontik düzeltme gerekebilir. Planın çekim anında konuşulmasının sebebi budur.'
            }
          ],
          karsilastirma: {
            baslik: 'Basit çekim ile cerrahi çekim',
            sutunlar: ['Basit çekim', 'Cerrahi çekim'],
            satirlar: [
              {
                olcut: 'Hangi durumda',
                olcutAciklama: 'Yöntemi belirleyen ölçüt',
                a: 'Diş ağızda görünür ve tutunacak kadar sağlam.',
                b: 'Diş kırık, gömülü ya da kökleri ayrık ve eğri.'
              },
              {
                olcut: 'Erişim',
                a: 'Diş eti kesilmeden, doğrudan.',
                b: 'Diş etine küçük bir kesi yapılarak.'
              },
              {
                olcut: 'Dikiş',
                a: 'Çoğunlukla gerekmez.',
                b: 'Genellikle atılır ve kontrolde alınır.'
              },
              {
                olcut: 'Uyuşturma',
                a: 'Bölgesel uyuşturma.',
                b: 'Bölgesel uyuşturma; kapsam daha geniş tutulabilir.'
              },
              {
                olcut: 'İyileşme',
                a: 'Şişlik sınırlı, birkaç günde geriler.',
                b: 'Şişlik ve rahatsızlık daha belirgin olabilir.'
              }
            ],
            dipnot:
              'Hangi yöntemin gerekeceği çoğunlukla röntgende görülür, ancak işlem sırasında da değişebilir; ikisi arasındaki fark hastanın hissettiği ağrı değil hekimin kullandığı erişim yoludur.'
          },
          notlar: [
            'Verilen ilaçlar tarif edildiği şekilde kullanılmalıdır.',
            'İkinci günden sonra ılık tuzlu suyla yumuşak gargara yapılabilir.',
            'Şiddetli ağrı, durmayan kanama ya da artan şişlikte klinik aranmalıdır.',
            'Çekim sonrası ilk gün sigara içilmemelidir; pıhtının yerinden çıkması riskini artırır.',
            'Dikiş atıldıysa kontrol randevusu atlanmamalıdır.'
          ],
          sorular: [
            {
              soru: 'Çekimden sonra ne zaman yemek yiyebilirim?',
              cevap:
                'Uyuşturmanın etkisi geçtikten sonra ılık ve yumuşak gıdalarla başlanır. İlk gün çok sıcak ' +
                've sert yiyeceklerden kaçınılır.'
            },
            {
              soru: 'Kan sulandırıcı kullanıyorum, çekim yapılabilir mi?',
              cevap:
                'Çoğu durumda yapılabilir, ancak ilaç düzeni hekiminizle birlikte planlanmalıdır. ' +
                'Kullandığınız bütün ilaçları randevudan önce bildirin.'
            },
            {
              soru: 'Kaç gün ağrır?',
              cevap:
                'Rahatsızlık genellikle ilk iki gün en belirgindir ve sonrasında azalır. Ağrının ' +
                'azalmak yerine üçüncü günden sonra artması beklenen bir seyir değildir; bu durumda ' +
                'klinik aranmalıdır.'
            },
            {
              soru: 'Çekim yerine dolgu yapılamaz mıydı?',
              cevap:
                'Dolgu, geride sağlam diş dokusu kaldığında ve kök bütünlüğü korunduğunda yapılabilir. ' +
                'Kök kırıksa ya da dişi tutan kemik büyük ölçüde erimişse dolgu dişi ayakta tutamaz. ' +
                'Bu ayrım röntgen ve muayeneyle netleşir.'
            },
            {
              soru: 'Boşluğu ne zaman tamamlatmalıyım?',
              cevap:
                'Diş etinin kapanması birkaç hafta, kemiğin dolması aylar sürer. Plan bu iyileşmeye ' +
                'göre zamanlanır. Beklemek gerekse bile planın çekim anında konuşulması önemlidir, ' +
                'çünkü komşu dişlerin hareketi bekleme süresine bağlıdır.'
            }
          ]
        },
        {
          ad: 'Gömülü 20 Yaş Dişi',
          slug: 'gomulu-20-yas-disi',
          guncelleme: '2026-08-29',
          ozet: 'Sürmeyen ya da yan yatmış yirmi yaş dişinin cerrahi olarak çıkarılması.',
          metaAciklama:
            'Gömülü 20 yaş dişi ne zaman çekilir, işlem nasıl yapılır, iyileşme süreci nasıl geçer?',
          giris:
            'Yirmi yaş dişleri çenede yer kalmadığında gömülü kalabilir ya da yan yatarak sürebilir. ' +
            'Her gömülü diş çekilmez; karar, dişin komşu dişe verdiği zarara ve tekrarlayan şikâyetlere ' +
            'göre röntgen üzerinden verilir.',
          bolumler: [
            {
              baslik: 'Ne zaman çekim gerekir',
              metin:
                'Tekrarlayan diş eti iltihabı, komşu azı dişinde çürük ya da kök erimesi, kist oluşumu ve ' +
                'sık tekrarlayan ağrı çekim gerekçeleridir. Şikâyet vermeyen ve komşusuna zarar vermeyen ' +
                'dişler takibe alınabilir.'
            },
            {
              baslik: 'İşlem sırası',
              metin:
                'Bölge uyuşturulur, diş etine küçük bir kesi yapılır ve gerekirse dişin üzerindeki kemik ' +
                'sınırlı biçimde kaldırılır. Diş parçalara ayrılarak çıkarılabilir; bu, çevre dokuya daha az ' +
                'zarar verdiği için tercih edilen yoldur. İşlem dikişle tamamlanır.'
            },
            {
              baslik: 'Görüntüleme neden gerekir',
              metin:
                'Alt çenede yirmi yaş dişinin kökleri, dudağı ve çeneyi besleyen sinir kanalına yakın ' +
                'geçebilir. Panoramik röntgende bu iki yapı üst üste düştüğü için aradaki gerçek ' +
                'mesafe görülemez. Yakınlık şüphesi varsa üç boyutlu tomografi istenir; kökün sinire ' +
                'göre konumu buradan ölçülür ve cerrahi plan ona göre kurulur. Görüntüleme, işlemin ' +
                'nasıl yapılacağını belirleyen adımdır.'
            },
            {
              baslik: 'İyileşme',
              metin:
                'İlk iki üç gün şişlik ve ağız açmada kısıtlılık beklenen bulgulardır; üçüncü günden sonra ' +
                'azalmaya başlar. Dikişler genellikle bir hafta sonra alınır. Bu dönemde ağzın tam ' +
                'açılamaması çiğneme kaslarının işleme verdiği geçici tepkidir, kalıcı değildir. ' +
                'Boşluğun kemikle dolması aylar sürer ama günlük hayatı etkilemez.'
            },
            {
              baslik: 'Beklenmeyen bulgular',
              metin:
                'Ağrının üçüncü günden sonra azalmak yerine artması, ağızda kötü tat ve boşluğun ' +
                'boşalmış görünmesi pıhtının yerinden çıktığına işaret edebilir; bu durum ' +
                'değerlendirilmesi gereken bir gelişmedir. Dudakta ya da dilde uyuşukluğun ' +
                'uyuşturmanın etkisi geçtikten sonra sürmesi de bildirilmelidir. İkisi de ' +
                'beklenmedik durumlardır ve randevu beklenmeden aranmalıdır.'
            },
            {
              baslik: 'Çekmemek de bir karar',
              metin:
                'Her gömülü diş çekilmez. Şikâyet vermeyen, komşu dişe zarar vermeyen ve çevresinde ' +
                'kist bulgusu olmayan bir diş takibe alınabilir. Takip, "bir şey yapmamak" değildir: ' +
                'düzenli kontrolde röntgenle komşu dişin kök yüzeyi ve çevredeki kemik izlenir. ' +
                'Durum değiştiğinde çekim yeniden gündeme gelir.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'Muayene ve görüntüleme',
              sure: 'Tek seans',
              aciklama:
                'Dişin konumu ve sinire yakınlığı değerlendirilir; gerekirse üç boyutlu tomografi istenir.'
            },
            {
              asama: 'Cerrahi çekim',
              sure: 'Tek seans',
              aciklama:
                'Bölge uyuşturulur, diş gerekirse parçalara ayrılarak çıkarılır ve dikişle tamamlanır.'
            },
            {
              asama: 'İlk iyileşme',
              sure: 'Birkaç gün',
              aciklama:
                'Şişlik ve ağız açmada kısıtlılık beklenir; üçüncü günden sonra azalmaya başlar.'
            },
            {
              asama: 'Dikiş alımı ve kontrol',
              sure: '1 randevu',
              aciklama:
                'Dikişler alınır, bölgenin iyileşmesi değerlendirilir.'
            }
          ],
          karsilastirma: {
            baslik: 'Çekim ile takip',
            sutunlar: ['Çekim', 'Takip'],
            satirlar: [
              {
                olcut: 'Hangi durumda',
                olcutAciklama: 'Kararı belirleyen ana ölçüt',
                a: 'Tekrarlayan iltihap, komşu dişte çürük veya kök erimesi, kist bulgusu.',
                b: 'Şikâyet yok, komşu dişe zarar yok, kist bulgusu yok.'
              },
              {
                olcut: 'Ne yapılır',
                a: 'Cerrahi olarak çıkarılır.',
                b: 'Düzenli kontrolde röntgenle izlenir.'
              },
              {
                olcut: 'Riski',
                a: 'Cerrahi işleme bağlı şişlik ve iyileşme dönemi.',
                b: 'Durum sessizce değişebilir; kontrol aksarsa geç fark edilir.'
              },
              {
                olcut: 'Zamanlama',
                a: 'Genç yaşta kökler tam gelişmemişken iyileşme daha rahat seyreder.',
                b: 'Şikâyet ortaya çıktığında çekim yeniden gündeme gelir.'
              },
              {
                olcut: 'Kalıcılık',
                a: 'Sorun tekrarlamaz.',
                b: 'Karar ertelenmiştir, ortadan kalkmamıştır.'
              }
            ],
            dipnot:
              'Takip, çekimden kaçınmak değil kontrollü bekleme kararıdır; kontroller aksadığında bu karar geçerliliğini yitirir.'
          },
          notlar: [
            'İşlemden sonraki gün için yoğun bir program yapmamak rahat eder.',
            'İlk gün soğuk uygulama, sonraki günlerde ılık uygulama önerilir.',
            'Sigara iyileşmeyi belirgin biçimde geciktirir.',
            'Ağrının üçüncü günden sonra artması beklenen seyir değildir, klinik aranmalıdır.',
            'Uyuşturmanın etkisi geçtikten sonra süren uyuşukluk bildirilmelidir.'
          ],
          sorular: [
            {
              soru: 'Yüzüm ne kadar şişer?',
              cevap:
                'Şişlik dişin konumuna ve işlemin süresine göre değişir; genellikle ikinci gün en yüksek ' +
                'noktasına ulaşır ve sonra geriler.'
            },
            {
              soru: 'İki taraf aynı anda çekilebilir mi?',
              cevap:
                'Aynı taraftaki alt ve üst diş çoğunlukla birlikte alınır. İki tarafın aynı seansta ' +
                'çekilmesi beslenmeyi zorlaştırdığı için genellikle ayrı randevulara bölünür.'
            },
            {
              soru: 'Şikâyetim yok, yine de çektirmeli miyim?',
              cevap:
                'Zorunlu değil. Komşu dişe zarar vermeyen ve kist bulgusu olmayan bir diş takibe ' +
                'alınabilir. Ancak takip düzenli kontrol demektir; kontrol aksadığında komşu azı ' +
                'dişindeki çürük ya da kök erimesi fark edilmeden ilerleyebilir.'
            },
            {
              soru: 'Yirmi yaş dişi çekilince diğer dişler bozulur mu?',
              cevap:
                'Yirmi yaş dişinin ön dişlerdeki çapraşıklığa yol açtığı yönündeki yaygın inanış ' +
                'kesinleşmiş değildir; çekim de ön dişleri düzeltmez. Çekim kararı, bu dişin ' +
                'kendisinin ya da komşusunun durumuna bakılarak verilir.'
            },
            {
              soru: 'Ne kadar süre işten uzak kalmalıyım?',
              cevap:
                'Çoğu kişi ertesi gün günlük hayatına döner. Şişlik ve ağız açmadaki kısıtlılık ' +
                'ilk iki üç günde en belirgindir, bu yüzden işlem sonrası güne yoğun bir program ' +
                'koymamak rahatlatır. Ağır fiziksel aktivite ilk günlerde ertelenir.'
            }
          ]
        },
        {
          ad: 'Apikal Rezeksiyon',
          slug: 'apikal-rezeksiyon',
          dal: 'endodonti',
          ozet:
            'Kanal yoluyla giderilemeyen kök ucu iltihabının, diş eti üzerinden cerrahi olarak temizlenmesi.',
          metaAciklama:
            'Apikal rezeksiyon ne zaman gerekir, nasıl yapılır, iyileşme ne kadar sürer? Kanal ' +
            'tedavisinden farkıyla birlikte anlatılıyor.',
          giris:
            'Apikal rezeksiyon, kök ucundaki iltihabın kanal içinden temizlenemediği durumlarda ' +
            'başvurulan cerrahi bir adımdır. Dişe üstten değil, diş eti aralanarak kök ucundan ' +
            'ulaşılır. Amaç dişi çekmeden korumaktır.',
          bolumler: [
            {
              baslik: 'Ne zaman gündeme gelir',
              metin:
                'Kanal tedavisi ve kanal yenilemesi denendiği hâlde kök ucundaki iltihap sürüyorsa ya da ' +
                'orada kist geliştiyse konuşulur. Karar röntgen ve gerektiğinde üç boyutlu görüntülemeyle ' +
                'verilir; ilk seçenek değildir.'
            },
            {
              baslik: 'İşlem sırası',
              metin:
                'Bölge uyuşturulur ve diş eti dikkatlice aralanır. Kök ucunun iltihaplı birkaç ' +
                'milimetresi çıkarılır, çevresindeki doku temizlenir ve kesilen uç uygun bir dolguyla ' +
                'kapatılır. Diş eti dikilir. Cerrahi kısım genellikle bir saatin altındadır.'
            },
            {
              baslik: 'İyileşme',
              metin:
                'İlk günlerde bölgede şişlik ve hafif ağrı olağandır; soğuk uygulama ve reçete edilen ' +
                'ilaçlar bunu yönetir. Dikişler genellikle bir hafta içinde alınır. Kemiğin dolması ise ' +
                'aylar sürer ve kontrol röntgenleriyle izlenir.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'Cerrahi',
              sure: 'Tek seans',
              aciklama:
                'Kök ucundaki iltihaplı doku temizlenir ve kesilen uç dolguyla kapatılır.'
            },
            {
              asama: 'Dikişlerin alınması',
              sure: 'Yaklaşık 1 hafta',
              aciklama:
                'İlk iyileşme değerlendirilir ve dikişler alınır.'
            },
            {
              asama: 'İyileşme takibi',
              sure: 'Birkaç ay',
              aciklama:
                'Kök ucundaki kemiğin dolup dolmadığı röntgenle izlenir.'
            }
          ],
          notlar: [
            'İşlem sonrası ilk günlerde sert gıdalardan ve o bölgeyle çiğnemekten kaçınılmalıdır.',
            'Sigara iyileşmeyi belirgin biçimde yavaşlatır.',
            'Artan şişlik, durmayan kanama ya da ateşte klinik aranmalıdır.'
          ],
          sorular: [
            {
              soru: 'Kanal tedavisinden farkı ne?',
              cevap:
                'Kanal tedavisinde dişe tepesinden girilir ve kanallar içeriden temizlenir. Apikal ' +
                'rezeksiyonda ise diş eti üzerinden doğrudan kök ucuna ulaşılır.'
            },
            {
              soru: 'Bu işlemden sonra diş kesin kurtulur mu?',
              cevap:
                'Kesin bir sonuç söylenemez. İşlem dişi ağızda tutmak için yapılan bir adımdır; ' +
                'iyileşme kontrollerle izlenir ve sonuç alınamazsa çekim gündeme gelebilir.'
            }
          ]
        },
        {
          ad: 'Sinüs Lifting',
          slug: 'sinus-lifting',
          dal: 'implantoloji',
          ozet:
            'Üst çene arka bölgede implant için kemik yüksekliği yetmediğinde sinüs tabanının yükseltilmesi.',
          metaAciklama:
            'Sinüs lifting neden gerekir, açık ve kapalı teknik arasında nasıl seçim yapılır? ' +
            'Karar ölçütleri ve süreç anlatılıyor.',
          giris:
            'Üst çenenin arka bölgesinde, dişlerin üzerinde sinüs adı verilen hava boşlukları bulunur. ' +
            'Diş kaybından sonra bu boşluk aşağı doğru genişleyebilir ve implant için gereken kemik ' +
            'yüksekliği kalmayabilir. Sinüs lifting, sinüs zarını yukarı iterek altındaki alanı kemik ' +
            'greftiyle doldurma işlemidir.',
          bolumler: [
            {
              baslik: 'Karar nasıl verilir',
              metin:
                'Belirleyici ölçü, kalan kemik yüksekliğidir ve bu üç boyutlu tomografiyle ölçülür. ' +
                'Kemik implantı başlangıçta tutabilecek kadar varsa ve yalnız birkaç milimetre yükseltme ' +
                'gerekiyorsa kapalı teknik; kemik belirgin biçimde azsa ve daha çok hacim gerekiyorsa ' +
                'açık teknik değerlendirilir.'
            },
            {
              baslik: 'Açık mı kapalı mı',
              metin:
                'Kapalı teknikte implant yuvasının içinden çalışılır, ayrı bir kesi yapılmaz ve iyileşme ' +
                'daha rahat geçer. Açık teknikte yanak tarafından küçük bir pencere açılır; çalışma alanı ' +
                'geniş olduğu için çok daha fazla kemik eklenebilir. İkisi rakip değil, farklı ' +
                'durumların çözümüdür.'
            },
            {
              baslik: 'İmplantla aynı seansta olur mu',
              metin:
                'Kalan kemik implantı ilk anda sabit tutabiliyorsa ikisi aynı seansta planlanabilir. ' +
                'Aksi hâlde önce greftin kemikleşmesi beklenir, implant sonraki aşamada yerleştirilir. ' +
                'Bekleme genellikle birkaç aydır.'
            }
          ],
          karsilastirma: {
            baslik: 'İki teknik hangi ölçütlerle ayrılır',
            sutunlar: ['Kapalı teknik', 'Açık teknik'],
            satirlar: [
              {
                olcut: 'Kalan kemik yüksekliği',
                olcutAciklama: 'Kararı belirleyen ana ölçüt',
                a: 'İmplantı ilk anda tutabilecek düzeyde',
                b: 'Belirgin biçimde yetersiz'
              },
              {
                olcut: 'Nereden çalışılır',
                a: 'İmplant yuvasının içinden',
                b: 'Yanakta açılan küçük pencereden'
              },
              {
                olcut: 'Eklenebilen kemik',
                a: 'Birkaç milimetreyle sınırlı',
                b: 'Çok daha fazla hacim'
              },
              {
                olcut: 'Çalışılan alanın görünürlüğü',
                a: 'Görülmez, aletle hissedilerek ilerlenir',
                b: 'Doğrudan gözle görülür'
              },
              {
                olcut: 'İyileşme dönemi',
                a: 'Doku az zedelendiği için genellikle daha rahat',
                b: 'Şişlik ve morluk daha belirgin olabilir'
              },
              {
                olcut: 'İmplantın aynı seansta konması',
                a: 'Koşullar uygunsa sık',
                b: 'Çoğunlukla greft olgunlaştıktan sonra'
              }
            ],
            dipnot:
              'Biri diğerinin üstünü değildir. Hangisinin uygulanacağı tomografideki kemik ölçümüne ' +
              'bakılarak belirlenir; karar hastanın tercihine değil anatomiye bağlıdır.'
          },
          notlar: [
            'İşlem sonrası birkaç hafta sert sümkürmekten kaçınılmalıdır.',
            'Hapşırırken ağız açık tutulmalı, sinüste basınç oluşturulmamalıdır.',
            'Uçak yolculuğu ve dalış için hekimin vereceği süre beklenmelidir.',
            'Sigara greftin tutunmasını olumsuz etkiler.'
          ],
          sorular: [
            {
              soru: 'Sinüzitim var, işlem yapılabilir mi?',
              cevap:
                'Aktif sinüs enfeksiyonu varken planlanmaz; önce o tablonun tedavi edilmesi beklenir. ' +
                'Gerekirse kulak burun boğaz değerlendirmesi istenir.'
            },
            {
              soru: 'Kemik grefti ile aynı şey mi?',
              cevap:
                'Sinüs lifting bir greft uygulamasıdır ama yeri özeldir: üst çene arka bölgedeki sinüs ' +
                'tabanına yöneliktir. Genel kemik grefti çenenin başka bölgelerinde de yapılır.'
            }
          ]
        },
        {
          ad: 'Kemik Grefti',
          slug: 'kemik-grefti',
          dal: 'implantoloji',
          ozet:
            'İmplant için yetersiz kalan çene kemiğinin greft malzemesiyle desteklenip hacimce artırılması.',
          metaAciklama:
            'Kemik grefti nedir, neden gerekir, iyileşmesi ne kadar sürer? Kullanılan malzemeler ve ' +
            'süreç anlatılıyor.',
          giris:
            'Diş çekildikten sonra o bölgedeki kemik zamanla erir. Erime ilerlediğinde implantın ' +
            'tutunacağı kalınlık ya da yükseklik kalmayabilir. Kemik grefti, eksik kalan hacmi ' +
            'tamamlamak için uygulanan bir hazırlık işlemidir.',
          bolumler: [
            {
              baslik: 'Neden gerekir',
              metin:
                'Uzun süre boş kalmış çekim boşlukları, ilerlemiş diş eti hastalığı ve geçirilmiş ' +
                'enfeksiyonlar kemik kaybının başlıca nedenleridir. Ne kadar kayıp olduğu tomografiyle ' +
                'ölçülür ve greft gerekip gerekmediğine buna göre karar verilir.'
            },
            {
              baslik: 'İşlem sırası',
              metin:
                'Bölge uyuşturulur, diş eti aralanır ve eksik alana greft malzemesi yerleştirilir. Üzeri ' +
                'koruyucu bir zarla örtülür ve diş eti dikilir. Cerrahi kısım genellikle bir saatin ' +
                'altındadır; kemiğin olgunlaşması ise aylar alır.'
            },
            {
              baslik: 'Kullanılan malzemeler',
              metin:
                'Kişinin kendi kemiğinden alınan, hayvan kaynaklı ya da laboratuvarda üretilen sentetik ' +
                'malzemeler kullanılabilir. Hangisinin uygun olduğu eksiğin büyüklüğüne ve bölgeye göre ' +
                'belirlenir; seçenekler işlem öncesinde anlatılır.'
            },
            {
              baslik: 'Sonraki adım',
              metin:
                'Greft yerleştikten sonra implant için beklenir. Bekleme süresi genellikle birkaç aydır ' +
                've kontrol görüntülemesiyle kemikleşmenin yeterli olup olmadığına bakılır.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'Cerrahi yerleştirme',
              sure: 'Tek seans',
              aciklama:
                'Eksik alana greft konur, üzeri zarla örtülür ve diş eti dikilir.'
            },
            {
              asama: 'Dikiş alımı',
              sure: 'Yaklaşık 1 hafta',
              aciklama:
                'Bölgenin ilk iyileşmesi değerlendirilir ve dikişler alınır.'
            },
            {
              asama: 'Kaynaşma',
              sure: 'Birkaç ay',
              aciklama:
                'Greftin kendi kemiğinize dönüşmesi beklenir, görüntülemeyle izlenir.'
            }
          ],
          notlar: [
            'İlk günlerde bölgeye baskı yapılmamalı, o tarafla çiğnenmemelidir.',
            'Sigara greftin tutunmasını belirgin biçimde olumsuz etkiler.',
            'Çok sıcak yiyecek ve içeceklerden ilk günlerde kaçınılmalıdır.',
            'Verilen antibiyotik ve ağız gargarası tarif edildiği gibi kullanılmalıdır.'
          ],
          sorular: [
            {
              soru: 'Vücut greft malzemesini reddeder mi?',
              cevap:
                'Kullanılan malzemeler doku uyumu gözetilerek seçilir. Yine de iyileşme kişiden kişiye ' +
                'değişir; süreç kontrollerle izlenir.'
            },
            {
              soru: 'Grefti yaptırmadan implant olamaz mıyım?',
              cevap:
                'Kemik yetersizken yerleştirilen implantın tutunması beklenmez. Bazı durumlarda kısa ' +
                'implant ya da farklı yerleşim planı seçenek olabilir; bu muayenede değerlendirilir.'
            }
          ]
        },
        {
          ad: 'Açık Sinüs Lifting',
          slug: 'acik-sinus-lifting',
          dal: 'implantoloji',
          ozet:
            'Yanak tarafından açılan küçük bir pencereden sinüs zarına ulaşılarak yapılan kemik yükseltme.',
          metaAciklama:
            'Açık sinüs lifting nasıl yapılır, hangi durumda tercih edilir, iyileşmesi ne kadar sürer? ' +
            'Tekniğin tamamı anlatılıyor.',
          giris:
            'Açık teknik, sinüs tabanına yanak tarafındaki kemikte açılan küçük bir pencereden ulaşma ' +
            'yöntemidir. Çalışma alanı doğrudan görülebildiği için, kalan kemiğin çok az olduğu ve ' +
            'belirgin miktarda hacim eklenmesi gereken durumlarda seçilir.',
          bolumler: [
            {
              baslik: 'Hangi durumda seçilir',
              metin:
                'Üst çene arka bölgede kalan kemik yüksekliği implantı taşıyamayacak kadar azaldığında ' +
                'gündeme gelir. Kapalı teknikle güvenle yükseltilebilecek miktarın üzerinde bir ekleme ' +
                'gerekiyorsa açık teknik tercih edilir. Karar tomografiyle verilir.'
            },
            {
              baslik: 'İşlem sırası',
              metin:
                'Bölge uyuşturulur, yanak tarafındaki diş eti aralanır ve kemikte küçük oval bir pencere ' +
                'açılır. Sinüs zarı özel aletlerle dikkatlice yukarı sıyrılır. Oluşan boşluğa greft ' +
                'yerleştirilir, üzeri zarla örtülür ve diş eti dikilir.'
            },
            {
              baslik: 'İyileşme ve bekleme',
              metin:
                'İlk günlerde şişlik ve zaman zaman morluk olağandır; soğuk uygulama ve başı yüksekte ' +
                'tutarak uyumak rahatlatır. Greftin implant taşıyacak olgunluğa ulaşması genellikle ' +
                'altı ay civarında bir süre alır ve görüntülemeyle izlenir.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'Cerrahi',
              sure: 'Tek seans',
              aciklama:
                'Yanaktan açılan pencereden sinüs zarı yukarı sıyrılır ve greft yerleştirilir.'
            },
            {
              asama: 'Dikiş alımı',
              sure: 'Yaklaşık 1 hafta',
              aciklama:
                'Yara yerinin kapanması kontrol edilir, dikişler alınır.'
            },
            {
              asama: 'Kemik oluşumu',
              sure: 'Birkaç ay',
              aciklama:
                'Bölgenin implant taşıyacak hacim ve sertliğe ulaşması beklenir.'
            }
          ],
          notlar: [
            'İlk haftalarda sert sümkürmek ve burnu tıkayarak hapşırmak kesinlikle önlenmelidir.',
            'Uçak yolculuğu ve dalış için hekimin izni beklenmelidir.',
            'Sigara bu işlemde iyileşmeyi en çok bozan etkendir.',
            'Şişlik birkaç gün sonra artıyorsa klinik aranmalıdır.'
          ],
          sorular: [
            {
              soru: 'Açılan pencere açık mı kalıyor?',
              cevap:
                'Hayır. Üzeri koruyucu bir zarla kapatılır ve diş eti dikişle örtülür; bölge kendi ' +
                'iyileşmesini tamamlar.'
            },
            {
              soru: 'Kapalı teknik bana neden uygulanmadı?',
              cevap:
                'Kapalı teknikte yükseltme miktarı sınırlıdır. Kalan kemiğiniz o yöntemin güvenle ' +
                'çalışabileceğinden azsa açık teknik seçilir.'
            }
          ]
        },
        {
          ad: 'Kapalı Sinüs Lifting',
          slug: 'kapali-sinus-lifting',
          dal: 'implantoloji',
          ozet:
            'İmplant yuvasının içinden çalışılarak sinüs zarının birkaç milimetre yukarı itilmesi.',
          metaAciklama:
            'Kapalı sinüs lifting nasıl yapılır, hangi durumda uygulanır, açık teknikten farkı ne? ' +
            'Süreç anlatılıyor.',
          giris:
            'Kapalı teknikte ayrı bir pencere açılmaz. İmplantın yerleştirileceği yuvanın tabanından ' +
            'çalışılarak sinüs zarı sınırlı bir miktar yukarı itilir ve açılan boşluğa greft konur. ' +
            'Daha az girişim gerektirdiği için iyileşmesi açık tekniğe göre rahat geçer.',
          bolumler: [
            {
              baslik: 'Hangi durumda uygulanır',
              metin:
                'Kalan kemik implantı ilk anda tutabilecek düzeydeyse ve yalnız birkaç milimetrelik bir ' +
                'yükseltme yetiyorsa seçilir. Gereken ekleme bunun üzerindeyse açık teknik konuşulur.'
            },
            {
              baslik: 'İşlem sırası',
              metin:
                'Bölge uyuşturulur ve diş etinin tepesinden implant yuvası hazırlanır. Yuvanın ' +
                'tabanından özel aletlerle sinüs zarı yavaşça yukarı esnetilir, oluşan boşluğa az ' +
                'miktarda greft yerleştirilir. Uygunsa implant aynı seansta konur.'
            },
            {
              baslik: 'Açık teknikten farkı',
              metin:
                'Açık teknikte yanaktan pencere açılır ve çalışılan alan gözle görülür. Kapalı teknikte ' +
                'ise dar yuvanın içinden, aletle hissederek ilerlenir. Bu yüzden eklenebilecek kemik ' +
                'miktarı sınırlıdır ama doku daha az zedelenir.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'Değerlendirme',
              sure: '1 randevu',
              aciklama:
                'Tomografiyle kalan kemik yüksekliği ölçülür ve kapalı tekniğin yeterli olup olmayacağına karar verilir.'
            },
            {
              asama: 'Cerrahi',
              sure: 'Tek seans',
              aciklama:
                'İmplant yuvası hazırlanır, sinüs zarı yukarı esnetilir ve greft yerleştirilir. Uygunsa implant aynı seansta konur.'
            },
            {
              asama: 'İlk iyileşme',
              sure: 'Yaklaşık 1 hafta',
              aciklama:
                'Şişlik ve hassasiyetin gerilediği dönem. Basınç yaratan hareketlerden kaçınılır, kontrol randevusu yapılır.'
            },
            {
              asama: 'Kaynaşma',
              sure: 'Birkaç ay',
              aciklama:
                'Greft ve implantın kemikle bütünleşmesi beklenir. Süre görüntülemeyle izlenir.'
            },
            {
              asama: 'Protez',
              sure: '2-3 randevu',
              aciklama:
                'Kaynaşma tamamlandığında ölçü alınır ve üst yapı hazırlanıp takılır.'
            }
          ],
          notlar: [
            'İlk günlerde hapşırma, sümkürme ve pipetle içme gibi basınç yaratan hareketlerden kaçınılmalıdır.',
            'Şişlik açık tekniğe göre daha azdır ama yine görülebilir.',
            'Verilen ilaçlar tarif edildiği gibi kullanılmalıdır.'
          ],
          sorular: [
            {
              soru: 'Sinüs zarı yırtılırsa ne olur?',
              cevap:
                'İşlem kontrollü ilerletilir; yine de zarın zedelendiği durumlar olabilir. Böyle bir ' +
                'durumda hekim onarımı yapabilir ya da işlemi başka bir seansa erteleyebilir.'
            },
            {
              soru: 'İmplantım aynı gün konur mu?',
              cevap:
                'Kalan kemik implantı sabit tutabiliyorsa aynı seansta yerleştirilebilir. Bu karar ' +
                'işlem sırasındaki tutuculuğa bakılarak verilir.'
            }
          ]
        }
      ]
    },
    {
      baslik: 'İmplant tedavisi',
      kalemler: [
        {
          ad: 'All-On-Four',
          slug: 'all-on-four',
          dal: 'implantoloji',
          ozet:
            'Dişsiz çeneye yerleştirilen dört implant üzerine kurulan sabit protez düzeni.',
          metaAciklama:
            'All-on-four tedavisi nedir, kimlere uygundur, ne kadar sürer? Açılı implant mantığı ve ' +
            'süreç anlatılıyor.',
          giris:
            'All-on-four, tamamen dişsiz bir çenede sabit protezin dört implantla taşınması yaklaşımıdır. ' +
            'Arkadaki iki implant açılı yerleştirilir; böylece kemiğin daha sağlam olduğu ön bölgeden ' +
            'destek alınır ve arka bölgede kemik ekleme ihtiyacı çoğu durumda ortadan kalkar.',
          bolumler: [
            {
              baslik: 'Kimde gündeme gelir',
              metin:
                'Çenesinde hiç dişi kalmamış, arka bölgede belirgin kemik erimesi olan ve ek cerrahi ' +
                'işlemlerden kaçınmak isteyen hastalarda konuşulur. Uygunluk üç boyutlu görüntülemeyle ' +
                'değerlendirilir.'
            },
            {
              baslik: 'Açılı implantın mantığı',
              metin:
                'Arka bölgede kemik eridiğinde dik implant için yer kalmayabilir. İmplantlar açılı ' +
                'yerleştirildiğinde ön bölgedeki daha yoğun kemikten yararlanılır ve protezin arka ' +
                'desteği uzatılır. Bu, sinüs lifting gibi ek işlemlere gerek kalmadan sabit protez ' +
                'kurulabilmesini sağlar.'
            },
            {
              baslik: 'Tedavi akışı',
              metin:
                'Planlama sonrası implantlar yerleştirilir ve uygunsa aynı süreçte geçici sabit protez ' +
                'takılır. Kemikle kaynaşma beklenirken geçici protez kullanılır. Kaynaşma tamamlandığında ' +
                'kalıcı protez yapılır; bu bekleme genellikle birkaç aydır.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'İmplantların yerleştirilmesi',
              sure: 'Tek seans',
              aciklama:
                'Gereken çekimler yapılır, dört implant belirlenen açılarla yerleştirilir.'
            },
            {
              asama: 'Geçici protez',
              sure: 'Tek seans',
              aciklama:
                'Tutuculuk uygunsa implantlara sabit geçici protez takılır.'
            },
            {
              asama: 'Kaynaşma',
              sure: 'Birkaç ay',
              aciklama:
                'İmplantların kemikle bütünleşmesi beklenir; bu dönemde yumuşak gıda önerilir.'
            },
            {
              asama: 'Kalıcı protez',
              sure: '2-3 randevu',
              aciklama:
                'Ölçü alınır ve kalıcı üst yapı hazırlanıp takılır.'
            }
          ],
          karsilastirma: {
            baslik: 'Dört implantlı düzen ile altı implantlı düzen',
            sutunlar: ['All-on-four', 'All-on-six'],
            satirlar: [
              {
                olcut: 'İmplant sayısı',
                a: 'Çene başına dört implant.',
                b: 'Çene başına altı implant.'
              },
              {
                olcut: 'Gereken kemik',
                olcutAciklama: 'Kararı belirleyen ana ölçüt',
                a: 'Arka bölgede daha az kemikle uygulanabilir.',
                b: 'Arka bölgede de yeterli kemik hacmi gerekir.'
              },
              {
                olcut: 'Yerleşim',
                a: 'Arkadaki iki implant açılı yerleştirilir.',
                b: 'İmplantlar çeneye dengeli biçimde dağıtılır.'
              },
              {
                olcut: 'Yük dağılımı',
                a: 'Yük dört noktaya dağılır.',
                b: 'Yük altı noktaya dağılır, taban genişler.'
              },
              {
                olcut: 'Ek cerrahi',
                a: 'Çoğu durumda kemik ekleme gerekmeden planlanabilir.',
                b: 'Kemik yetersizse önce greft gündeme gelebilir.'
              },
              {
                olcut: 'Cerrahi süre',
                a: 'Daha az implant, daha kısa işlem.',
                b: 'İki ek implant nedeniyle daha uzun.'
              }
            ],
            dipnot:
              'Hangisinin uygulanacağı tomografideki kemik ölçümüne bağlıdır; daha çok implant her durumda daha iyi anlamına gelmez.'
          },
          notlar: [
            'Geçici protez dönemi boyunca yumuşak gıda önerisine uyulmalıdır.',
            'İmplant çevresinin temizliği protezin ömrünü doğrudan etkiler; ara yüz fırçası ve ağız duşu gösterilir.',
            'Sigara implant kaynaşmasını olumsuz etkiler.',
            'Gece diş sıkma varsa mutlaka bildirilmelidir.'
          ],
          sorular: [
            {
              soru: 'Aynı gün dişli çıkar mıyım?',
              cevap:
                'Çoğu durumda geçici sabit protez erken dönemde takılabilir, ancak bu implantların ilk ' +
                'tutuculuğuna bağlıdır. Uygun değilse kısa bir bekleme gerekebilir.'
            },
            {
              soru: 'All-on-six ile arasındaki fark ne?',
              cevap:
                'İmplant sayısı ve gereken kemik miktarı farklıdır. Kemik uygunsa altı implant yükü daha ' +
                'geniş alana dağıtır; kemik sınırlıysa dört implantlı açılı düzen öne çıkar.'
            }
          ]
        },
        {
          ad: 'All-On-Six',
          slug: 'all-on-six',
          guncelleme: '2026-08-29',
          dal: 'implantoloji',
          ozet:
            'Dişsiz çeneye altı implant yerleştirilerek çiğneme yükünün daha geniş alana dağıtıldığı sabit protez.',
          metaAciklama:
            'All-on-six tedavisi nedir, all-on-four ile farkı ne, kimlere uygundur? Süreç ve ' +
            'iyileşme anlatılıyor.',
          giris:
            'All-on-six, tam dişsiz bir çenede sabit protezin altı implantla taşınmasıdır. Dört ' +
            'implantlı düzene göre daha fazla kemik gerektirir; karşılığında yük daha geniş bir tabana ' +
            'dağılır ve arka bölgede destek artar.',
          bolumler: [
            {
              baslik: 'Kimde tercih edilir',
              metin:
                'Çenesi tamamen dişsiz olan ve altı implantı taşıyacak kemik hacmine sahip hastalarda ' +
                'konuşulur. Kemik yeterliyse hekim çoğu zaman bu düzeni önerir; yeterli değilse dört ' +
                'implantlı açılı çözüm ya da önce kemik grefti gündeme gelir.'
            },
            {
              baslik: 'Dört implantlı düzenden farkı',
              metin:
                'Fark yalnız sayı değildir. Altı implantla protezin arka desteği uzar ve tek bir ' +
                'implantta sorun çıkması hâlinde düzenin geri kalanı daha korunaklı olur. Buna karşılık ' +
                'daha çok kemik ve daha geniş bir cerrahi alan gerekir.'
            },
            {
              baslik: 'Tedavi akışı',
              metin:
                'Tomografiyle planlama yapılır, implantlar dengeli biçimde yerleştirilir ve geçici ' +
                'protezle kapatılır. Kaynaşma süresi genellikle birkaç aydır; ardından kalıcı protez ' +
                'hazırlanır. Geçici protez sadece görüntü için değildir: diş eti bu dönemde ' +
                'protezin biçimine göre şekillenir ve kalıcı protezin oturacağı yatak hazırlanır.'
            },
            {
              baslik: 'Neden altı implant',
              metin:
                'Sabit bir protezin çiğneme yükünü taşıyabilmesi için destek noktalarının çeneye ' +
                'dengeli dağılması gerekir. Destek sayısı arttıkça her bir implanta düşen yük azalır ' +
                've protezin arkaya doğru desteksiz uzayan kısmı kısalır. Bu, protezin daha geniş ' +
                'bir tabana oturması demektir. Ancak fazladan implant her zaman daha iyi değildir: ' +
                'implantın kemik içinde yeterli hacme oturması, yan yana gelen implantlar arasında ' +
                'yeterli mesafenin kalması gerekir.'
            },
            {
              baslik: 'Kemik yeterli değilse',
              metin:
                'Arka bölgede kemik yüksekliği yetersizse iki yol vardır: önce kemik hacmini ' +
                'artıran işlemler yapılır (greft ya da sinüs lifting) ve ardından altı implant ' +
                'yerleştirilir; ya da mevcut kemiğe uygun, açılı yerleştirmeye dayanan dört ' +
                'implantlı düzen tercih edilir. Hangisinin seçileceği tomografideki ölçüme, ' +
                'hastanın ek cerrahi istekliliğine ve genel sağlık durumuna göre birlikte konuşulur.'
            },
            {
              baslik: 'Uzun dönemde bakım',
              metin:
                'Sabit protezin altı, doğal dişlerin arası gibi temizlenmesi gereken bir bölgedir. ' +
                'Protez ile diş eti arasındaki boşluğa ara yüz fırçası ve ağız duşu ile ulaşılır; ' +
                'bu temizlik yapılmadığında implant çevresinde iltihap başlar ve kemik kaybı ' +
                'sessizce ilerler. Düzenli kontrollerde protez gerektiğinde sökülüp altı ' +
                'temizlenebilir.'
            },
            {
              baslik: 'Geçici protez dönemi',
              metin:
                'Kaynaşma beklenirken kullanılan geçici protez, kalıcı protezin küçültülmüş bir ' +
                'provası gibidir: konuşma, çiğneme ve dudak desteği bu dönemde değerlendirilir. ' +
                'Rahatsız eden noktalar not edilir ve kalıcı protez tasarlanırken dikkate alınır. ' +
                'Bu dönemde yumuşak gıda önerisine uyulması yalnız konfor meselesi değildir; ' +
                'sert gıdaların ürettiği yük henüz kaynaşmamış implantları zorlayabilir.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'Planlama',
              sure: '1-2 randevu',
              aciklama:
                'Tomografiyle kemik ölçülür, implant sayısı ve konumları planlanır.'
            },
            {
              asama: 'İmplantların yerleştirilmesi',
              sure: 'Tek seans',
              aciklama:
                'Gereken çekimler yapılır, altı implant çeneye dengeli biçimde yerleştirilir.'
            },
            {
              asama: 'Geçici protez',
              sure: 'Tek seans',
              aciklama:
                'Tutuculuk uygunsa sabit geçici protez takılır; diş eti bu dönemde şekillenir.'
            },
            {
              asama: 'Kaynaşma',
              sure: 'Birkaç ay',
              aciklama:
                'İmplantların kemikle bütünleşmesi beklenir. Bu dönemde yumuşak gıda önerilir.'
            },
            {
              asama: 'Kalıcı protez',
              sure: '2-3 randevu',
              aciklama: 'Ölçü alınır, kalıcı üst yapı hazırlanıp takılır.'
            }
          ],
          notlar: [
            'Kaynaşma döneminde sert gıdalardan kaçınılmalıdır.',
            'İmplant çevresi temizliği düzenli olmalı, kontroller aksatılmamalıdır.',
            'Şeker hastalığı gibi iyileşmeyi etkileyen durumlar önceden bildirilmelidir.',
            'Sigara implant kaynaşmasını olumsuz etkiler.',
            'Gece diş sıkma varsa bildirilmelidir; protez tasarımı buna göre planlanır.'
          ],
          sorular: [
            {
              soru: 'Daha çok implant daha mı iyi demek?',
              cevap:
                'Her zaman değil. Belirleyici olan kemiğin implantları taşıyıp taşıyamayacağıdır. ' +
                'Kemik yetersizken zorlamak yerine uygun düzen seçilir.'
            },
            {
              soru: 'Kalıcı dişlere ne zaman geçilir?',
              cevap:
                'Kemikle kaynaşmanın tamamlanması beklenir; bu genellikle birkaç aylık bir süredir ve ' +
                'kontrollerle izlenir.'
            },
            {
              soru: 'Bir implantta sorun çıkarsa protezin tamamı gider mi?',
              cevap:
                'Hayır. Destek sayısı fazla olduğu için kalan implantlar yükü taşımayı sürdürebilir. ' +
                'Sorunlu implant değerlendirilir; gerekirse çıkarılıp iyileşme sonrası yenisi ' +
                'planlanır. Protezin tamamen yenilenmesi her durumda gerekmez.'
            },
            {
              soru: 'Protezi kendim çıkarabilir miyim?',
              cevap:
                'Hayır, sabit protez hasta tarafından çıkarılmaz. Kontrollerde hekim tarafından ' +
                'sökülüp altı temizlenebilir ve yerine takılır. Bu yüzden günlük temizlikte ' +
                'protezin altına ulaşan araçların kullanımı öğretilir.'
            },
            {
              soru: 'İyileşme dönemi boyunca dişsiz mi kalacağım?',
              cevap:
                'Tutuculuk uygunsa implantlar yerleştirildiği seansta sabit geçici protez takılabilir. ' +
                'Uygun değilse hareketli geçici bir çözüm planlanır. Kaynaşma dönemi boyunca ' +
                'dişsiz kalınması amaçlanan bir durum değildir.'
            },
            {
              soru: 'Alt ve üst çene aynı anda yapılabilir mi?',
              cevap:
                'Yapılabilir, ancak karar tek başına cerrahi imkâna değil iyileşme dönemine göre ' +
                'verilir: iki çene aynı anda yapıldığında geçici protez dönemi boyunca beslenme ' +
                'daha çok kısıtlanır. Bu yüzden bazı planlarda çeneler ayrı seanslara bölünür.'
            }
          ]
        },
        {
          ad: 'Tek İmplant Tedavisi',
          slug: 'tek-implant-tedavisi',
          guncelleme: '2026-08-29',
          dal: 'implantoloji',
          ozet: 'Tek bir eksik dişin, komşu dişlere dokunmadan implantla tamamlanması.',
          metaAciklama:
            'Tek diş eksikliğinde implant tedavisi nasıl ilerler, kaç ay sürer, hangi durumlarda uygundur?',
          giris:
            'Tek diş eksikliğinde implant, komşu dişleri kesmeden boşluğu tamamlayan seçenektir. ' +
            'Köprüden farkı budur: yandaki sağlam dişlere dokunulmaz. İmplant, kemiğe yerleştirilen ' +
            'bir vida ile onun üzerine gelen kaplamadan oluşur; yani tek parça değil, iki aşamada ' +
            'tamamlanan bir bütündür.',
          bolumler: [
            {
              baslik: 'Boşluk neden bırakılmaz',
              metin:
                'Eksik diş yalnız çiğneme sorunu değildir. Karşı çenedeki diş desteksiz kalınca boşluğa ' +
                'doğru uzar, yandaki dişler zamanla boşluğa yatmaya başlar. Bu hareketler ısırma ' +
                'düzenini bozar ve ileride yapılacak tedaviyi zorlaştırır. Ayrıca diş kökünün ' +
                'uyardığı kemik, uyarı kalkınca erimeye başlar; boşluk ne kadar uzun beklerse ' +
                'implant için gereken kemik hacmi o kadar azalır.'
            },
            {
              baslik: 'Planlama',
              metin:
                'Kemik yüksekliği ve kalınlığı üç boyutlu görüntüyle değerlendirilir. Kemik yetersizse ' +
                'greft ya da sinüs işlemi aynı planın parçası olur. Genel sağlık durumu ve kullanılan ' +
                'ilaçlar bu aşamada konuşulur. Kan sulandırıcılar, kemik erimesi ilaçları ve kontrolsüz ' +
                'şeker hastalığı planı doğrudan etkiler; bu yüzden ilaç listesinin eksiksiz ' +
                'paylaşılması gerekir.'
            },
            {
              baslik: 'Cerrahi aşama',
              metin:
                'İmplant, uyuşturma altında kemik içine yerleştirilir. İşlem tek diş için genellikle ' +
                'yarım saatin altındadır. Üzerine geçici bir çözüm planlanabilir. Bölge dikişle ' +
                'kapatılır ve iyileşme başlar; ilk günlerde hafif şişlik ve rahatsızlık beklenen ' +
                'bulgulardır.'
            },
            {
              baslik: 'Kaynama ve üst yapı',
              metin:
                'İmplantın kemikle bütünleşmesi çoğunlukla iki ile dört ay arasında sürer. Bu süre sonunda ' +
                'ölçü alınır ve üst yapı (kaplama) hazırlanıp yerleştirilir. Kaynaşma, vidanın kemiğe ' +
                'yapışması değil kemik hücrelerinin yüzeyine büyümesidir; bu yüzden beklenmesi gereken ' +
                'biyolojik bir süredir ve kısaltılamaz. Bekleme süresini kemiğin yoğunluğu ve ' +
                'bölgenin konumu belirler.'
            },
            {
              baslik: 'İmplant çevresinin bakımı',
              metin:
                'İmplant çürümez, ama çevresindeki diş eti ve kemik hastalanabilir. Doğal dişte kökü ' +
                'saran bağ dokusu implantta yoktur; bu yüzden implant çevresindeki iltihap doğal dişe ' +
                'göre daha hızlı ilerleyebilir. Günlük temizlikte arayüz fırçası ve diş ipi ' +
                'kullanımı, düzenli kontrollerde de implant çevresinin ölçülmesi bu yüzden gerekir.'
            },
            {
              baslik: 'Her durumda uygun mudur',
              metin:
                'Yaş tek başına engel değildir; belirleyici olan kemik gelişiminin tamamlanmış olması ' +
                've genel sağlık durumudur. Kontrolsüz şeker hastalığı, ağır sigara kullanımı, bazı ' +
                'kemik ilaçları ve tedavi edilmemiş diş eti hastalığı implantın kaynaşmasını olumsuz ' +
                'etkiler. Bu durumların bir kısmı engel değil, önce çözülmesi gereken adımdır — ' +
                'örneğin diş eti hastalığı tedavi edilmeden implant planlanmaz.'
            },
            {
              baslik: 'Cerrahi sonrası ilk günler',
              metin:
                'İlk gün bölgeye soğuk uygulanır ve ağız çalkalanmaz. Şişliğin ikinci gün en ' +
                'belirgin hâline ulaşıp sonra gerilemesi beklenir. Verilen ilaçlar tarif ' +
                'edildiği gibi kullanılır; ağrının azalmak yerine artması, durmayan kanama ya ' +
                'da yükselen ateş beklenen seyir değildir ve bildirilmelidir. Fırçalama ' +
                'işlem bölgesi dışında sürdürülür — temizliğin tamamen bırakılması ' +
                'iyileşmeyi kolaylaştırmaz, zorlaştırır.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'Muayene ve görüntüleme',
              sure: 'Tek seans',
              aciklama:
                'Üç boyutlu görüntüyle kemik ölçülür, genel sağlık durumu ve ilaçlar değerlendirilir.'
            },
            {
              asama: 'İmplantın yerleştirilmesi',
              sure: 'Tek seans',
              aciklama:
                'Uyuşturma altında implant kemiğe yerleştirilir, bölge dikişle kapatılır.'
            },
            {
              asama: 'Kaynaşma',
              sure: 'Birkaç ay',
              aciklama:
                'Kemiğin implant yüzeyine büyümesi beklenir. Süre kemiğin yoğunluğuna ve bölgeye göre değişir.'
            },
            {
              asama: 'Üst yapı',
              sure: '2-3 randevu',
              aciklama: 'Ölçü alınır, kaplama hazırlanır ve implantın üzerine yerleştirilir.'
            }
          ],
          notlar: [
            'Sigara implant çevresindeki iyileşmeyi ve uzun dönem başarısını olumsuz etkiler.',
            'İmplant çürümez ama çevresindeki diş eti hastalanabilir; düzenli kontrol şarttır.',
            'Şeker hastalığı gibi durumlarda tedavi planı hekiminizle birlikte düzenlenir.',
            'Kullandığınız bütün ilaçları, özellikle kan sulandırıcı ve kemik ilaçlarını bildirin.',
            'Gece diş sıkma varsa üst yapı planlanırken koruyucu plak da değerlendirilir.'
          ],
          sorular: [
            {
              soru: 'İmplant ağrılı mıdır?',
              cevap:
                'Cerrahi uyuşturma altında yapılır. Sonrasında birkaç gün sürebilen hafif bir rahatsızlık ' +
                'beklenir, çoğunlukla basit ağrı kesicilerle geçer.'
            },
            {
              soru: 'Diş çekildiği gün implant yapılabilir mi?',
              cevap:
                'Kemik ve diş eti uygunsa aynı seansta yapılabilir. İltihabın yaygın olduğu durumlarda ' +
                'iyileşme beklenir.'
            },
            {
              soru: 'Kaynaşma süresi neden kısaltılamıyor?',
              cevap:
                'Kaynaşma bir yapıştırma işlemi değil, kemik hücrelerinin implant yüzeyine büyümesidir. ' +
                'Bu biyolojik bir süreçtir ve kendi hızında ilerler. Süre dolmadan yük bindirilirse ' +
                'implantın kemikle bütünleşmesi bozulabilir.'
            },
            {
              soru: 'Boşluk kaldığı sürede ne değişir?',
              cevap:
                'Diş kökünün uyarısı kalktığı için o bölgedeki kemik zamanla erir; komşu ve karşı ' +
                'dişler de boşluğa doğru hareket eder. İkisi de implantı zorlaştırır: kemik azalırsa ' +
                'greft gerekebilir, dişler kaydıysa üst yapı için yeterli yer kalmayabilir.'
            },
            {
              soru: 'Ne kadar dayanır?',
              cevap:
                'Kesin bir süre söylenemez. Ömrünü belirleyen şey implantın kendisinden çok çevresindeki ' +
                'dokunun sağlığıdır: günlük temizlik, düzenli kontrol, sigara kullanımı ve diş sıkma ' +
                'alışkanlığı doğrudan etkiler.'
            }
          ]
        },
        {
          ad: 'Bir Günde İmplant',
          slug: 'bir-gunde-implant',
          dal: 'implantoloji',
          ozet:
            'İmplantın yerleştirildiği seansta üzerine geçici sabit dişin takılabildiği tedavi düzeni.',
          metaAciklama:
            'Bir günde implant gerçekten mümkün mü, ön koşulları neler, takılan diş kalıcı mı? ' +
            'Sürecin tamamı anlatılıyor.',
          giris:
            'Bu yaklaşımda implant yerleştirildiği gün üzerine geçici bir sabit diş vidalanır; hasta ' +
            'dişsiz kalmadan klinikten ayrılır. Adı yanıltıcı olabilir: bir günde biten şey tedavinin ' +
            'tamamı değil, görünen dişin takılmasıdır.',
          bolumler: [
            {
              baslik: 'Ön koşullar',
              metin:
                'Herkese uygulanamaz. İmplantın yerleştirildiği anda yeterince sabit durması, kemik ' +
                'kalitesinin ve hacminin uygun olması, bölgede aktif iltihap bulunmaması gerekir. ' +
                'Bunlar sağlanmıyorsa geleneksel akış izlenir ve bekleme yapılır.'
            },
            {
              baslik: 'İşlem sırası',
              metin:
                'Varsa kurtarılamayan diş çekilir ve aynı seansta implant yerleştirilir. Tutuculuk ' +
                'yeterliyse önceden hazırlanan ya da o gün üretilen geçici diş implanta vidalanır. ' +
                'Cerrahi ve geçici protez genellikle bir iki seansta tamamlanır.'
            },
            {
              baslik: 'Geçici dişin rolü',
              metin:
                'İlk gün takılan diş kalıcı protez değildir. Görünümü ve günlük işlevi karşılar, ama ' +
                'implanta tam çiğneme yükü bindirmeyecek biçimde tasarlanır. Kalıcı protez, kemikle ' +
                'kaynaşma tamamlandıktan sonra yapılır.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'Çekim ve implant',
              sure: 'Tek seans',
              aciklama:
                'Varsa kurtarılamayan diş çekilir, aynı seansta implant yerleştirilir.'
            },
            {
              asama: 'Geçici diş',
              sure: 'Tek seans',
              aciklama:
                'Tutuculuk yeterliyse implanta o gün geçici bir diş vidalanır.'
            },
            {
              asama: 'Kaynaşma',
              sure: 'Birkaç ay',
              aciklama:
                'İmplantın kemikle bütünleşmesi beklenir, geçici diş kullanılmaya devam edilir.'
            },
            {
              asama: 'Kalıcı üst yapı',
              sure: '1-2 randevu',
              aciklama:
                'Kaynaşma tamamlandığında kalıcı kaplama hazırlanıp takılır.'
            }
          ],
          karsilastirma: {
            baslik: 'Geleneksel akış ile hemen yükleme',
            sutunlar: ['Geleneksel implant', 'Bir günde implant'],
            satirlar: [
              {
                olcut: 'İlk tutuculuk',
                olcutAciklama: 'Yöntemi mümkün kılan koşul',
                a: 'Standart tutuculuk yeterlidir.',
                b: 'İmplantın ilk anda çok sıkı durması şarttır.'
              },
              {
                olcut: 'Diş ne zaman takılır',
                a: 'Kaynaşma sonrası, birkaç ay içinde.',
                b: 'İmplantın konduğu gün geçici diş takılır.'
              },
              {
                olcut: 'Ara dönem',
                a: 'Genellikle hareketli geçici protez kullanılır.',
                b: 'İmplanta vidalanmış sabit geçici diş kullanılır.'
              },
              {
                olcut: 'Aşama sayısı',
                a: 'İmplant ve üst yapı ayrı aşamalarda.',
                b: 'İmplant ve geçici diş tek aşamada.'
              },
              {
                olcut: 'Çiğneme',
                a: 'Kaynaşma bitene kadar o bölge yüklenmez.',
                b: 'Yumuşak gıdayla sınırlı çiğnemeye izin verilir.'
              },
              {
                olcut: 'Kimde uygulanabilir',
                a: 'Geniş bir hasta aralığı.',
                b: 'Kemik kalitesi ve hacmi uygun olanlar.'
              }
            ],
            dipnot:
              'Hemen yükleme bir tercih değil, koşula bağlıdır; implant ilk anda yeterince sıkı durmuyorsa geleneksel akış izlenir.'
          },
          notlar: [
            'Geçici dönemde hekimin verdiği yumuşak gıda listesine uyulmalıdır.',
            'O bölgeyle ısırma ve koparma hareketlerinden kaçınılmalıdır.',
            'Geçici diş gevşerse beklenmeden klinik aranmalıdır.',
            'Sigara bu dönemde kaynaşmayı en çok bozan etkendir.'
          ],
          sorular: [
            {
              soru: 'Bana da uygulanabilir mi?',
              cevap:
                'Bunu ancak muayene ve tomografi sonrası söyleyebiliriz. Kemik durumu uygun değilse ' +
                'zorlanmaz; implantın erken yüklenmesi ancak koşullar elverdiğinde güvenlidir.'
            },
            {
              soru: 'Geleneksel implanttan farkı ne?',
              cevap:
                'Geleneksel akışta implant yerleştirildikten sonra kaynaşma beklenir ve bu dönemde ' +
                'genellikle hareketli geçici kullanılır. Burada ise sabit geçici diş ilk günden takılır.'
            }
          ]
        }
      ]
    },
    {
      baslik: 'Periodontoloji',
      kalemler: [
        {
          ad: 'Diş Eti Tedavisi',
          slug: 'dis-eti-tedavisi',
          guncelleme: '2026-08-29',
          dal: 'periodontoloji',
          ozet: 'Kanayan ve çekilen diş etinde iltihabın kontrol altına alınması, kaybın durdurulması.',
          metaAciklama:
            'Diş eti tedavisi nasıl ilerler, kanama neden olur, hangi durumlarda cerrahi gerekir?',
          giris:
            'Diş eti hastalığı çoğunlukla kanamayla başlar ve ağrı vermeden ilerler. Tedavinin amacı ' +
            'iltihabı kontrol altına almak ve dişi tutan dokunun kaybını durdurmaktır; kaybedilen kemik ' +
            'kendiliğinden geri gelmez.',
          bolumler: [
            {
              baslik: 'Neden ağrısız ilerler',
              metin:
                'Diş eti hastalığının en zor yanı, ilerlediği dönemde şikâyet üretmemesidir. Çürükte ' +
                'olduğu gibi keskin bir ağrı yoktur; kanama ise çoğu kişi tarafından "fırçayı sert ' +
                'kullandım" diye yorumlanır. Kemik kaybı sessizce ilerler ve fark edildiğinde ' +
                'geri alınamaz. Bu yüzden tedavinin başlangıç noktası şikâyet değil, düzenli ' +
                'muayenede yapılan ölçümdür.'
            },
            {
              baslik: 'Değerlendirme',
              metin:
                'Diş eti cebinin derinliği ölçülür, röntgenle kemik seviyesi değerlendirilir. Bu ölçüm ' +
                'hastalığın hangi aşamada olduğunu ve tedavinin kapsamını belirler. Ölçüm diş diş ve ' +
                'her dişin çevresinde birkaç noktadan yapılır; tek bir bölgedeki derinlik bütün ağzı ' +
                'temsil etmez. Kanama olan noktalar ayrıca kaydedilir, çünkü tedavi sonrası ' +
                'karşılaştırma bu kayda göre yapılır.'
            },
            {
              baslik: 'Başlangıç tedavisi',
              metin:
                'Diş taşı ve plak, diş eti üstünde ve altında temizlenir; kök yüzeyleri düzleştirilir. ' +
                'Bölge bölge, birkaç seansta yapılır. Çoğu hastada asıl iyileşme bu aşamada sağlanır. ' +
                'Amaç iltihabı sürdüren pürüzlü yüzeyi ortadan kaldırmaktır: kök yüzeyi temizlendiğinde ' +
                'diş eti yeniden dişe yapışabilir ve cep sığlaşır.'
            },
            {
              baslik: 'Yeniden değerlendirme',
              metin:
                'Başlangıç tedavisinden birkaç hafta sonra ölçümler tekrarlanır. Bu ara kontrol ' +
                'tedavinin en belirleyici adımıdır: cep derinlikleri azaldıysa ve kanama durduysa ' +
                'idame dönemine geçilir. Bazı bölgelerde derinlik sürüyorsa, orada kök yüzeyine ' +
                'kapalı yöntemle ulaşılamadığı anlaşılır ve bir sonraki adım konuşulur.'
            },
            {
              baslik: 'Cerrahi gerekirse',
              metin:
                'Derin ceplerin kapanmadığı durumlarda küretaj ya da flep işlemi gündeme gelir. Karar, ' +
                'başlangıç tedavisinden sonraki kontrol ölçümlerine göre verilir. Cerrahi, tedavinin ' +
                'başarısızlığı değil, ulaşılamayan bölgeye görerek ulaşma yöntemidir; kapsamı da ' +
                'bütün ağız değil yalnız sorunlu bölgelerle sınırlı tutulur.'
            },
            {
              baslik: 'İdame: tedavinin bitmeyen kısmı',
              metin:
                'Diş eti hastalığı bir kez geçirildikten sonra tekrarlamaya yatkındır. Bu yüzden ' +
                'tedavi bittiğinde takip başlar: belirli aralıklarla ölçüm tekrarlanır ve birikim ' +
                'temizlenir. Aralık herkes için aynı değildir, hastalığın şiddetine ve kişinin günlük ' +
                'temizlik alışkanlığına göre belirlenir. İdame aksadığında kayıp kaldığı yerden devam eder.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'Muayene ve ölçüm',
              sure: 'Tek seans',
              aciklama:
                'Cep derinlikleri ölçülür, röntgenle kemik seviyesi değerlendirilir, kanama noktaları kaydedilir.'
            },
            {
              asama: 'Başlangıç tedavisi',
              sure: 'Birkaç randevu',
              aciklama:
                'Diş eti üstü ve altındaki birikim bölge bölge temizlenir, kök yüzeyleri düzleştirilir.'
            },
            {
              asama: 'Yeniden değerlendirme',
              sure: 'Birkaç hafta sonra',
              aciklama:
                'Ölçümler tekrarlanır; cerrahi gerekip gerekmediği bu karşılaştırmayla belirlenir.'
            },
            {
              asama: 'İdame',
              sure: 'Düzenli aralıklarla',
              aciklama:
                'Takip randevularında ölçüm tekrarlanır ve birikim temizlenir. Aralık kişiye göre belirlenir.'
            }
          ],
          karsilastirma: {
            baslik: 'Cerrahisiz tedavi ile cerrahi tedavi',
            sutunlar: ['Cerrahisiz (başlangıç)', 'Cerrahi'],
            satirlar: [
              {
                olcut: 'Nasıl ulaşılır',
                a: 'Kök yüzeyine diş etinin altından, görmeden çalışılır.',
                b: 'Diş eti kaldırılır, kök yüzeyi görülerek temizlenir.'
              },
              {
                olcut: 'Hangi derinlikte yeterli',
                olcutAciklama: 'Kararı belirleyen ana ölçüt',
                a: 'Sığ ve orta derinlikteki ceplerde.',
                b: 'Başlangıç tedavisine rağmen kapanmayan derin ceplerde.'
              },
              {
                olcut: 'Kapsam',
                a: 'Genellikle bütün ağız, bölge bölge.',
                b: 'Yalnız sorunlu bölgelerle sınırlı.'
              },
              {
                olcut: 'İyileşme',
                a: 'Birkaç gün hassasiyet; günlük hayat aksamaz.',
                b: 'Dikiş ve birkaç günlük ödem beklenir.'
              },
              {
                olcut: 'Kararın verildiği an',
                a: 'Tedavinin ilk adımıdır, herkeste yapılır.',
                b: 'Yeniden değerlendirme ölçümlerinden sonra.'
              }
            ],
            dipnot:
              'Cerrahi, cerrahisiz tedavinin alternatifi değil devamıdır: başlangıç tedavisi yapılmadan cerrahiye geçilmez.'
          },
          notlar: [
            'Tedaviden sonra diş etleri sıkılaştıkça geçici hassasiyet olabilir.',
            'Arayüz fırçası ya da diş ipi kullanılmadan sonucun korunması güçtür.',
            'Sigara diş eti hastalığının seyrini belirgin biçimde kötüleştirir.',
            'Şeker hastalığı ve bazı ilaçlar diş eti dokusunu etkiler; kullandığınız ilaçları bildirin.',
            'Diş etleri iyileştikçe dişler arasında boşluk görünür olabilir; bu, şişliğin çekilmesidir.'
          ],
          sorular: [
            {
              soru: 'Diş eti çekilmesi geri döner mi?',
              cevap:
                'Çekilen diş eti kendiliğinden eski yerine gelmez. Tedavinin amacı ilerlemeyi durdurmaktır; ' +
                'uygun durumlarda örtme amaçlı cerrahi seçenekler değerlendirilebilir.'
            },
            {
              soru: 'Kanama neden oluyor?',
              cevap:
                'Kanama çoğunlukla iltihabın belirtisidir, fırçalamanın sert olmasının değil. Fırçalamayı ' +
                'bırakmak iltihabı artırır.'
            },
            {
              soru: 'Gargara kullanmak yeterli olur mu?',
              cevap:
                'Hayır. Gargara plağın yüzeyine etki eder, sertleşmiş taşı ve diş eti altındaki birikimi ' +
                'kaldıramaz. Belirli dönemlerde destekleyici olarak önerilebilir ama tedavinin yerini ' +
                'tutmaz ve sürekli kullanımı önerilmez.'
            },
            {
              soru: 'Tedaviden sonra dişlerim sallanmaya devam eder mi?',
              cevap:
                'İltihap geçtikçe dokular sıkılaşır ve hafif sallanmalar azalabilir. Kemik kaybı ileriyse ' +
                'sallanma sürebilir; bu durumda dişleri birbirine bağlayan uygulamalar ya da protetik ' +
                'çözümler değerlendirilir.'
            },
            {
              soru: 'Kaç seans sürer?',
              cevap:
                'Hastalığın yaygınlığına bağlıdır. Yalnız diş etiyle sınırlı iltihapta bir ya da iki ' +
                'seans yeterli olabilir; kemik kaybı başlamışsa ağız bölgelere ayrılarak birkaç randevuda ' +
                'çalışılır ve arada yeniden değerlendirme yapılır.'
            }
          ]
        },
        {
          ad: 'Diş Taşı Temizliği',
          slug: 'dis-tasi-temizligi',
          guncelleme: '2026-08-29',
          dal: 'periodontoloji',
          ozet: 'Sertleşmiş plağın diş yüzeyinden ve diş eti sınırından temizlenmesi.',
          metaAciklama:
            'Diş taşı temizliği nasıl yapılır, dişi aşındırır mı, ne sıklıkla gerekir? İşlem sırası ' +
            've sonrasında beklenenler.',
          giris:
            'Diş taşı, zamanla sertleşen ve fırçayla kaldırılamayan plaktır. Diş etinin kanamasına ve ' +
            'ağız kokusuna yol açar; temizlenmediğinde alttaki kemiğin erimesine giden süreci başlatır. ' +
            'Temizlik, diş eti tedavisinin ilk basamağıdır: taş kaldırılmadan diş etinin iyileşmesi ' +
            'beklenemez, çünkü iltihabı sürdüren yüzey ortadan kalkmamış olur.',
          bolumler: [
            {
              baslik: 'Plak nasıl taşa dönüşür',
              metin:
                'Ağızdaki bakteriler diş yüzeyinde yumuşak, renksiz bir tabaka oluşturur. Bu tabaka ' +
                'fırçalanmadığında tükürükteki mineralleri çekerek sertleşir ve diş taşına dönüşür. ' +
                'Sertleştikten sonra fırça, ip veya gargarayla kaldırılamaz; yüzeyi pürüzlü olduğu için ' +
                'üzerine yeni plak daha kolay tutunur. Süreç bu yüzden kendi kendini hızlandırır.'
            },
            {
              baslik: 'Nerelerde birikir',
              metin:
                'Taş en çok tükürük bezlerinin ağıza açıldığı bölgelerde toplanır: alt ön dişlerin dil ' +
                'tarafı ve üst azıların yanak tarafı. Diş eti sınırının altında, cepte biriken taş ' +
                'gözle görünmez; varlığı sonda ile muayenede ya da röntgende anlaşılır. Görünen taşın ' +
                'temizlenmiş olması, altta taş kalmadığı anlamına gelmez.'
            },
            {
              baslik: 'İşlem sırası',
              metin:
                'Taş, ultrasonik uçla titreşim yoluyla kırılarak kaldırılır; ardından yüzeyler parlatılır. ' +
                'Diş kazınmaz, aşındırılmaz. İşlem çoğunlukla tek seansta biter. Ucun ürettiği su ' +
                'soğutma içindir ve işlem sırasında emiciyle alınır. Diş eti sınırının altına inen ' +
                'birikim varsa el aletleriyle de çalışılır.'
            },
            {
              baslik: 'Sonrasında',
              metin:
                'Taşın örttüğü kök yüzeyi açığa çıktığı için birkaç gün soğuk hassasiyeti olabilir. ' +
                'Diş etleri iltihaplıysa temizlik sırasında kanama görülür, bu beklenen bir durumdur. ' +
                'Taşın doldurduğu aralıklar boşaldığı için dişler arasında boşluk hissi oluşabilir; ' +
                'bu yeni açılmış bir boşluk değil, zaten var olan aralığın fark edilmesidir.'
            },
            {
              baslik: 'Sıklık ve sonrasının bakımı',
              metin:
                'Genel öneri altı ayda bir kontroldür. Taş oluşum hızı kişiden kişiye değiştiği için ' +
                'aralık muayenede belirlenir; tükürük yapısı, sigara ve diş dizilimi bu hızı etkiler. ' +
                'Temizlik tek başına kalıcı sonuç vermez: aralar diş ipi veya arayüz fırçasıyla günlük ' +
                'temizlenmezse plak birikimi kaldığı yerden devam eder.'
            },
            {
              baslik: 'Diş eti tedavisinin neresinde durur',
              metin:
                'Temizlik, diş eti tedavisinin ilk basamağıdır ve çoğu durumda tek başına yeterlidir: ' +
                'iltihap yalnız diş etiyle sınırlıysa taş kaldırıldığında doku birkaç hafta içinde ' +
                'toparlanır. Kemik kaybı başlamış ve diş eti ile diş arasında cep oluşmuşsa, cebin ' +
                'içindeki kök yüzeyine ulaşmak için küretaj gerekir. Hangisinin gerektiği temizlik ' +
                'sonrası kontrolde belli olur; bu yüzden ilk seansın ardından bir değerlendirme ' +
                'randevusu verilir.'
            },
            {
              baslik: 'Temizlik sonrası günlük bakım',
              metin:
                'Fırça diş yüzeylerinin yaklaşık üçte ikisine ulaşır; kalan kısım dişlerin ' +
                'birbirine bakan yüzleridir ve taş çoğunlukla orada başlar. Bu yüzden diş ipi ' +
                'ya da arayüz fırçası günlük bakımın ayrılmaz parçasıdır. Aralıklar genişse ' +
                'ip yerine arayüz fırçası daha etkilidir; hangisinin uygun olduğu ve ölçüsü ' +
                'temizlik sonrası gösterilir. Yeni başlayanlarda ilk günlerde hafif kanama ' +
                'olabilir, bu kullanımı bırakma sebebi değildir.'
            }
          ],
          notlar: [
            'İşlem dişleri beyazlatmaz; yalnız yüzeydeki renklenmeleri ve taşı kaldırır.',
            'Hassasiyet birkaç gün içinde azalır.',
            'Kanama azalana kadar fırçalamayı bırakmak süreci uzatır; yumuşak fırçayla devam edilir.',
            'Kan sulandırıcı kullanılıyorsa randevu öncesinde bildirilmelidir.'
          ],
          sorular: [
            {
              soru: 'Diş taşı temizliği dişleri aşındırır mı?',
              cevap:
                'Hayır. Uç, taşı kırarak kaldırır; diş yüzeyi kazınmaz. Aralarındaki boşluk hissi, taşın ' +
                'kalktığı yerin fark edilmesinden kaynaklanır.'
            },
            {
              soru: 'Dişlerim temizlikten sonra sallanıyor gibi, normal mi?',
              cevap:
                'İleri birikimde taş, sallanan dişleri geçici olarak birbirine bağlayan bir kabuk gibi ' +
                'davranır. Kaldırıldığında dişin gerçek durumu ortaya çıkar. Bu, temizliğin dişi ' +
                'gevşettiği anlamına gelmez; altta zaten var olan kemik kaybının fark edilmesidir ve ' +
                'değerlendirilmesi gerekir.'
            },
            {
              soru: 'Acır mı, uyuşturma gerekir mi?',
              cevap:
                'Diş eti sınırının üstündeki temizlik çoğunlukla uyuşturmasız yapılır. Birikim diş eti ' +
                'altına iniyorsa ya da kök yüzeyi belirgin hassassa bölgesel uyuşturma tercih edilebilir.'
            },
            {
              soru: 'Ne sıklıkla yaptırmalıyım?',
              cevap:
                'Herkes için tek bir aralık yoktur. Taşı hızlı oluşan kişilerde daha sık, yavaş oluşanlarda ' +
                'daha seyrek gerekir. Aralık, ilk temizlikten sonraki kontrolde ağızdaki birikime bakılarak ' +
                'belirlenir.'
            },
            {
              soru: 'Ağız kokum geçer mi?',
              cevap:
                'Kokunun kaynağı diş taşı ve diş eti iltihabıysa temizlikten sonra belirgin biçimde ' +
                'azalır. Kaynak başka bir yerdeyse — dil sırtı, sinüs, mide veya ilaç kullanımı — ' +
                'temizlik tek başına yeterli olmaz ve nedenin araştırılması gerekir.'
            },
            {
              soru: 'Temizlikten sonra dişlerim daha beyaz olur mu?',
              cevap:
                'Diş taşının ve yüzeydeki çay, kahve, sigara renklenmesinin kalkmasıyla dişler ' +
                'kendi doğal tonuna döner; birçok kişi bunu beyazlama olarak algılar. Ama işlem ' +
                'dişin kendi rengini açmaz. Doğal tondan daha açık bir sonuç isteniyorsa ' +
                'beyazlatma ayrı bir uygulamadır ve temizlikten sonra planlanır.'
            }
          ]
        },
        {
          ad: 'Küretaj',
          slug: 'kuretaj',
          dal: 'periodontoloji',
          ozet:
            'Diş eti çizgisinin altındaki kök yüzeyinde biriken taş ve iltihaplı dokunun temizlenmesi.',
          metaAciklama:
            'Diş eti küretajı nedir, diş taşı temizliğinden farkı ne, kaç seans sürer? İşlem ve ' +
            'sonrası anlatılıyor.',
          giris:
            'Diş eti iltihabı ilerlediğinde diş ile diş eti arasında cep denen bir boşluk oluşur ve bu ' +
            'cebin içinde, kök yüzeyinde taş birikir. Fırça oraya ulaşamaz. Küretaj, bu bölgenin özel ' +
            'aletlerle temizlenmesi işlemidir.',
          bolumler: [
            {
              baslik: 'Diş taşı temizliğinden farkı',
              metin:
                'Olağan diş taşı temizliği dişin görünen kısmını kapsar. Küretajda ise diş eti çizgisinin ' +
                'altına inilir ve kök yüzeyi temizlenir. Bu yüzden genellikle uyuşturma yapılır ve ' +
                'bölge bölge çalışılır.'
            },
            {
              baslik: 'İşlem sırası',
              metin:
                'Çalışılacak bölge uyuşturulur. El aletleri ve ultrasonik uçlarla cebin içindeki taş ve ' +
                'iltihaplı doku uzaklaştırılır, kök yüzeyi düzleştirilir. Ağzın tamamı genellikle ' +
                'birkaç seansa bölünerek tamamlanır.'
            },
            {
              baslik: 'Sonrasında ne olur',
              metin:
                'Diş etinin iltihabı gerilerken bir miktar çekilme fark edilebilir; bu, şişliğin inmesiyle ' +
                'ortaya çıkan gerçek seviyedir. Dişlerde geçici hassasiyet ve hafif hareketlilik hissi ' +
                'olabilir. İyileşme kontrol randevusunda değerlendirilir.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'Muayene ve ölçüm',
              sure: 'Tek seans',
              aciklama:
                'Diş eti ceplerinin derinliği ölçülür ve tedavi bölgelere ayrılır.'
            },
            {
              asama: 'Temizlik seansları',
              sure: '1-2 randevu',
              aciklama:
                'Uyuşturma altında cep içindeki taş ve iltihaplı doku temizlenir.'
            },
            {
              asama: 'İyileşme kontrolü',
              sure: 'Yaklaşık 1 ay',
              aciklama:
                'Cep derinliklerindeki azalma ve diş eti iyileşmesi yeniden değerlendirilir.'
            }
          ],
          karsilastirma: {
            baslik: 'Diş taşı temizliği ile küretaj arasındaki fark',
            sutunlar: ['Diş taşı temizliği', 'Küretaj'],
            satirlar: [
              {
                olcut: 'Temizlenen bölge',
                olcutAciklama: 'İki işlemi ayıran ana ölçüt',
                a: 'Diş eti sınırının üstündeki görünen yüzeyler.',
                b: 'Diş eti altındaki kök yüzeyi ve cep içi.'
              },
              {
                olcut: 'Amaç',
                a: 'Yüzeydeki plak, taş ve lekeleri almak.',
                b: 'Cepteki iltihaplı dokuyu temizleyip hastalığı durdurmak.'
              },
              {
                olcut: 'Uyuşturma',
                a: 'Genellikle gerekmez.',
                b: 'Kök yüzeyine inildiği için uygulanır.'
              },
              {
                olcut: 'Seans',
                a: 'Çoğunlukla tek seans.',
                b: 'Ağız bölgelere ayrılır, birkaç seans sürer.'
              },
              {
                olcut: 'Kime uygulanır',
                a: 'Rutin kontrol ve yüzeysel diş eti şikâyeti.',
                b: 'Cep oluşmuş, ilerlemiş diş eti hastalığı.'
              }
            ],
            dipnot:
              'Hangisinin gerektiği cep derinliği ölçülerek belirlenir; küretaj, taş temizliğinin daha kapsamlısı değil, farklı bir işlemdir.'
          },
          notlar: [
            'Uyuşturmanın etkisi geçene kadar yiyip içilmemelidir.',
            'İlk günlerde nazik fırçalamaya devam edilmeli, bölge atlanmamalıdır.',
            'Önerilen gargara belirtilen süre boyunca kullanılmalıdır.',
            'Sigara diş eti iyileşmesini doğrudan olumsuz etkiler.'
          ],
          sorular: [
            {
              soru: 'İşlemden sonra dişlerim sallanır mı?',
              cevap:
                'Yoğun taşın verdiği yapay destek kalktığı için başlangıçta hafif hareketlilik ' +
                'hissedilebilir. Diş eti iyileştikçe bu hissin azalması beklenir ve kontrollerde izlenir.'
            },
            {
              soru: 'Tekrarlaması gerekir mi?',
              cevap:
                'Diş eti hastalığı bakım gerektiren bir tablodur. Evdeki temizlik ve düzenli kontroller ' +
                'sürdürülmezse cepler yeniden derinleşebilir; aralık kişiye göre belirlenir.'
            }
          ]
        },
        {
          ad: 'Diş Eti Çekilmesi Tedavisi',
          slug: 'dis-eti-cekilmesi-tedavisi',
          dal: 'periodontoloji',
          ozet:
            'Açığa çıkmış kök yüzeyinin, greft dokusuyla cerrahi olarak yeniden örtülmesi.',
          metaAciklama:
            'Diş eti çekilmesi neden olur, greftle kök kapama nasıl yapılır, iyileşme ne kadar sürer? ' +
            'Süreç anlatılıyor.',
          giris:
            'Diş eti geriledikçe kökün üst kısmı açığa çıkar. Bu hem sıcak-soğuk hassasiyeti yaratır ' +
            'hem de görünümü değiştirir. Kök kapama, ağzın başka bir bölgesinden alınan ya da hazır ' +
            'greft dokusuyla açıkta kalan yüzeyin örtülmesi işlemidir.',
          bolumler: [
            {
              baslik: 'Neden çekilir',
              metin:
                'Sert fırçalama, yanlış fırça seçimi, diş eti hastalığı, diş sıkma ve dişlerin ' +
                'konumu başlıca nedenlerdir. Tedaviden önce sebebin bulunması gerekir; sebep sürerse ' +
                'sonuç kalıcı olmaz.'
            },
            {
              baslik: 'İşlem sırası',
              metin:
                'Bölge uyuşturulur, açıkta kalan kök yüzeyi temizlenerek hazırlanır. Genellikle damaktan ' +
                'uygun boyutta bir doku alınır ve çekilme olan bölgeye ince dikişlerle yerleştirilir. ' +
                'Cerrahi tek seansta yapılır; dikişler genellikle bir iki hafta içinde alınır.'
            },
            {
              baslik: 'Damaktaki bölge',
              metin:
                'Greft alınan damak bölgesi kendi iyileşmesini yapar ve birkaç hafta içinde toparlanır. ' +
                'İlk günlerde orada da hassasiyet olur; koruyucu plak kullanılması istenebilir.'
            },
            {
              baslik: 'Pembe estetikten farkı',
              metin:
                'Pembe estetikte fazla diş eti alınarak diş daha uzun gösterilir. Burada ise tam tersi ' +
                'yapılır: eksilen diş eti yerine konur ve açıkta kalan kök örtülür.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'Cerrahi',
              sure: 'Tek seans',
              aciklama:
                'Greft dokusu alınıp çekilme olan bölgeye ince dikişlerle yerleştirilir.'
            },
            {
              asama: 'Dikiş alımı',
              sure: 'Yaklaşık 1 hafta',
              aciklama:
                'İki bölgenin de ilk iyileşmesi izlenir ve dikişler alınır.'
            },
            {
              asama: 'Doku olgunlaşması',
              sure: 'Birkaç ay',
              aciklama:
                'Eklenen dokunun kanlanıp yerleşmesi beklenir; sonuç bu sürede belirginleşir.'
            }
          ],
          notlar: [
            'Ameliyat bölgesi birkaç hafta fırçalanmaz; hekim ne zaman başlanacağını söyler.',
            'Sert ve kabuklu gıdalardan bu dönemde kaçınılmalıdır.',
            'Fırçalama alışkanlığı düzeltilmezse çekilme yeniden başlayabilir.',
            'Diş sıkma varsa gece plağı planlanmalıdır.'
          ],
          sorular: [
            {
              soru: 'Diş etim eski hâline tam döner mi?',
              cevap:
                'Ne kadar örtülebileceği çekilmenin derinliğine, kemik durumuna ve bölgeye göre değişir. ' +
                'Beklenen sonuç işlem öncesinde muayeneyle birlikte konuşulur.'
            },
            {
              soru: 'Tekrar çekilir mi?',
              cevap:
                'Çekilmeye yol açan alışkanlık sürerse tekrarlayabilir. Bu yüzden fırçalama tekniği ve ' +
                'varsa diş sıkma tedavinin parçası olarak ele alınır.'
            }
          ]
        }
      ]
    },
    {
      baslik: 'Ortodonti',
      kalemler: [
        {
          ad: 'Şeffaf Plak',
          slug: 'seffaf-plak',
          guncelleme: '2026-08-29',
          dal: 'ortodonti',
          ozet: 'Çıkarılabilen şeffaf plaklarla dişlerin adım adım hizalanması.',
          metaAciklama:
            'Şeffaf plak tedavisi nasıl ilerler, ne kadar sürer, kimlere uygundur? Süreç ve günlük kullanım.',
          giris:
            'Şeffaf plak tedavisi, dijital planla hazırlanan bir dizi plağın sırayla kullanılmasıyla ' +
            'dişlerin hedeflenen konuma taşınmasıdır. Plaklar çıkarılabildiği için yeme ve fırçalama ' +
            'alışkanlığı değişmez. Buna karşılık tedaviyi yürüten şey plağın kendisi değil, günde kaç ' +
            'saat ağızda kaldığıdır — çıkarılabilir olmak hem en büyük kolaylığı hem en büyük riski ' +
            'aynı anda getirir.',
          bolumler: [
            {
              baslik: 'Nasıl çalışır',
              metin:
                'Her plak, dişlerin o anki konumundan bir sonraki adıma göre biraz farklı üretilir. ' +
                'Takıldığında plak ile diş arasındaki bu küçük fark sürekli ve hafif bir kuvvet ' +
                'oluşturur; diş bu kuvvet yönünde yavaşça hareket eder ve çevresindeki kemik yeniden ' +
                'şekillenir. Hareketi sağlayan büyük kuvvet değil, kuvvetin kesintisiz olmasıdır. ' +
                'Plak çıkarıldığında hareket durur, bu yüzden takılı kalma süresi doğrudan tedavi ' +
                'süresine dönüşür.'
            },
            {
              baslik: 'Planlama',
              metin:
                'Ağız içi tarama ve röntgenlerle dijital model çıkarılır, hareket sırası planlanır. ' +
                'Planlama sonunda tedavinin kaç plak süreceği ve hedef konum önceden görülebilir. ' +
                'Bazı hareketler için dişin yüzeyine küçük şeffaf tutucular (ataçman) yapıştırılır: ' +
                'plağın dişi kavrayabilmesi için tutunacak bir yüzey gerekir. Bunlar tedavi sonunda ' +
                'diş kesilmeden kaldırılır.'
            },
            {
              baslik: 'Günlük kullanım',
              metin:
                'Plakların günde yaklaşık yirmi iki saat takılı kalması beklenir; yalnız yemek ve fırçalama ' +
                'için çıkarılır. Her plak belirlenen süre kullanıldıktan sonra sıradaki plağa geçilir. ' +
                'Yeni plağa geçilen ilk gün baskı hissi ve hafif hassasiyet olağandır, birkaç günde ' +
                'azalır. Plak takılıyken su dışında bir şey içilmemesinin sebebi de budur: şekerli ya da ' +
                'asitli içecek plağın altında kalır ve doğrudan mineye temas eder.'
            },
            {
              baslik: 'Kontroller ve plan güncellemesi',
              metin:
                'Belirli aralıklarla yapılan kontrollerde dişlerin gerçek konumu planlanan konumla ' +
                'karşılaştırılır. Dişler plandan geride kaldıysa — çoğunlukla kullanım süresi yetersiz ' +
                'kaldığı için — plan yeniden kurgulanır ve ek plak seti üretilir. Bu, tedavinin ' +
                'başarısız olduğu anlamına gelmez; süreç boyunca beklenen bir ayar adımıdır.'
            },
            {
              baslik: 'Pekiştirme',
              metin:
                'Dişler yeni konumlarında kemik yeniden şekillenene kadar geri dönme eğilimindedir. ' +
                'Bu yüzden tedavi sonunda pekiştirme (retansiyon) aşaması gelir ve ihmal edilirse sonuç korunmaz. ' +
                'Pekiştirme, tedavinin isteğe bağlı bir devamı değil parçasıdır: geri dönme eğilimi ' +
                'yıllar boyunca sürer, bu yüzden pekiştirme apareyinin kullanımı da uzun vadelidir.'
            },
            {
              baslik: 'Temizlik',
              metin:
                'Plaklar her çıkarıldığında soğuk suyla durulanır ve içi yumuşak fırçayla temizlenir; ' +
                'sıcak su plağı deforme eder. Yemekten sonra dişler fırçalanmadan plak takılırsa besin ' +
                'artığı plağın altında kapalı kalır ve çürük riski artar. Dişleri fırçalayacak imkân ' +
                'yoksa en azından ağzın suyla çalkalanması gerekir.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'Kayıt ve planlama',
              sure: '1-2 randevu',
              aciklama:
                'Ağız içi tarama, röntgen ve fotoğraflar alınır; dijital plan hazırlanır.'
            },
            {
              asama: 'Plakların üretimi',
              sure: 'Birkaç hafta',
              aciklama: 'Plan onaylandıktan sonra plak seti üretilir ve teslim alınır.'
            },
            {
              asama: 'Aktif tedavi',
              sure: 'Aylar',
              aciklama:
                'Plaklar sırayla kullanılır, belirli aralıklarla kontrole gelinir. Süre vakanın ' +
                'karmaşıklığına ve günlük kullanım süresine bağlıdır.'
            },
            {
              asama: 'Pekiştirme',
              sure: 'Uzun vadeli',
              aciklama:
                'Hedef konuma ulaşıldığında pekiştirme apareyine geçilir; kullanım süresi hekim ' +
                'tarafından belirlenir.'
            }
          ],
          karsilastirma: {
            baslik: 'Şeffaf plak ile sabit tel',
            sutunlar: ['Şeffaf plak', 'Sabit tel (braket)'],
            satirlar: [
              {
                olcut: 'Ağızda kalma',
                olcutAciklama: 'Sonucu en çok belirleyen fark',
                a: 'Hasta çıkarıp takar; süre hastanın kullanımına bağlıdır.',
                b: 'Tedavi boyunca sabittir, kullanım süresi hastaya bağlı değildir.'
              },
              {
                olcut: 'Görünüm',
                a: 'Uzaktan belli olmaz.',
                b: 'Braketler görünür; seramik braket daha az belirgindir.'
              },
              {
                olcut: 'Yeme ve temizlik',
                a: 'Çıkarılır; fırçalama ve diş ipi alışkanlığı değişmez.',
                b: 'Takılıyken temizlik yapılır, arayüz fırçası gerekir.'
              },
              {
                olcut: 'Hareket öngörülebilirliği',
                a: 'Çoğu hareket planlanabilir; bazı kök hareketlerinde sınırlıdır.',
                b: 'Karmaşık hareketlerde daha geniş kontrol sağlar.'
              },
              {
                olcut: 'Kontrol sıklığı',
                a: 'Daha seyrek; plak setleri önceden teslim edilir.',
                b: 'Tel ayarı için daha düzenli randevu gerekir.'
              },
              {
                olcut: 'Acil durum',
                a: 'Plak kırılırsa bir öncekine dönülebilir.',
                b: 'Braket düştüğünde randevu gerekir.'
              }
            ],
            dipnot:
              'Hangisinin uygun olduğu estetik tercihe değil, yapılması gereken diş hareketlerine bağlıdır; karar muayene ve kayıtlar sonrasında verilir.'
          },
          notlar: [
            'Takılı kalma süresi tedavinin süresini doğrudan belirler.',
            'Plaklar takılıyken su dışında bir şey içilmemelidir.',
            'Her kontrolde ilerleme planla karşılaştırılır; gerekirse plan güncellenir.',
            'Kaybedilen ya da kırılan plak bekletilmeden bildirilmelidir; dişler eski konumuna dönmeye başlar.',
            'Plaklar sıcak suyla yıkanmaz, ısıyla şekli bozulur.'
          ],
          sorular: [
            {
              soru: 'Şeffaf plak her vakada kullanılabilir mi?',
              cevap:
                'Birçok çapraşıklıkta kullanılabilir, ancak bazı hareketler için sabit tel daha öngörülebilir ' +
                'sonuç verir. Uygunluk muayene ve kayıtlar sonrasında belirlenir.'
            },
            {
              soru: 'Konuşmayı etkiler mi?',
              cevap:
                'İlk günlerde hafif bir alışma dönemi olur, çoğu kişide birkaç gün içinde geçer.'
            },
            {
              soru: 'Bir plağı takmayı unutursam ne olur?',
              cevap:
                'Kısa süreli aksamalar telafi edilebilir; hekiminiz o plağın kullanım süresini uzatabilir. ' +
                'Aksama tekrarlanırsa dişler plandan geri kalır ve set yenilenmek zorunda kalınır.'
            },
            {
              soru: 'Tedavi ne kadar sürer?',
              cevap:
                'Kesin bir süre baştan verilemez. Süreyi vakanın karmaşıklığı ve plakların günde kaç ' +
                'saat takılı kaldığı birlikte belirler. Planlama sonunda öngörülen plak sayısı ' +
                'paylaşılır, ancak bu bir taahhüt değil tahmindir.'
            },
            {
              soru: 'Plaklar dişleri sarartır mı?',
              cevap:
                'Plağın kendisi renklendirmez. Renklenme, plak takılıyken çay, kahve gibi içeceklerin ' +
                'tüketilmesi ya da yetersiz temizlik sonucu plağın altında kalan artıklardan kaynaklanır.'
            }
          ]
        },
        {
          ad: 'Metal Diş Teli',
          slug: 'metal-dis-teli',
          dal: 'ortodonti',
          ozet:
            'Dişlere yapıştırılan çelik braketler ve aralarından geçen telle yürütülen klasik ortodontik tedavi.',
          metaAciklama:
            'Metal diş teli tedavisi nasıl ilerler, ne kadar sürer, nelere dikkat edilir? Seramik ' +
            'braketle farkıyla anlatılıyor.',
          giris:
            'Metal braket, ortodontinin en yerleşik yöntemidir. Her dişe küçük bir braket yapıştırılır ' +
            've aralarından geçen tel dişleri hedeflenen konuma doğru yavaşça hareket ettirir. ' +
            'Dayanıklılığı ve geniş vaka aralığında kullanılabilmesi öne çıkan yanıdır.',
          bolumler: [
            {
              baslik: 'Takılması',
              metin:
                'Diş yüzeyleri temizlenir, braketler tek tek yapıştırılır ve tel takılarak bağlanır. ' +
                'Takma işlemi ağrılı değildir ve genellikle bir iki saat sürer. İlk günlerde dişlerde ' +
                'basınç hissi ve hassasiyet olağandır.'
            },
            {
              baslik: 'Tedavi süresi ve kontroller',
              metin:
                'Süre çapraşıklığın derecesine ve kapanışa göre değişir; genellikle bir ila üç yıl ' +
                'arasında bir aralıktan söz edilir. Kontroller birkaç haftada bir yapılır ve her ' +
                'randevuda tel ayarlanır.'
            },
            {
              baslik: 'Seramik braketle farkı',
              metin:
                'Metal braket dışarıdan daha belirgindir ama daha dayanıklıdır ve kırılma ihtimali ' +
                'düşüktür. Seramik braket görünüm açısından öne çıkar; hangisinin uygun olduğu vakanın ' +
                'zorluğuna ve beklentiye göre birlikte belirlenir.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'Braketlerin takılması',
              sure: 'Tek seans',
              aciklama:
                'Braketler dişlere yapıştırılır ve aralarından tel geçirilir.'
            },
            {
              asama: 'Aktif hareket dönemi',
              sure: 'Her 1-2 ayda bir',
              aciklama:
                'Randevularda tel ayarlanır ya da değiştirilir; dişler kademeli hareket eder.'
            },
            {
              asama: 'Braketlerin sökülmesi',
              sure: 'Tek seans',
              aciklama:
                'Hedeflenen dizilime ulaşıldığında braketler ve tel sökülür.'
            },
            {
              asama: 'Pekiştirme',
              sure: 'Yıllarca',
              aciklama:
                'Dişlerin yeni yerinde kalması için pekiştirme aşamasına geçilir.'
            }
          ],
          karsilastirma: {
            baslik: 'Metal braket ile seramik braket arasındaki fark',
            sutunlar: ['Metal braket', 'Seramik braket'],
            satirlar: [
              {
                olcut: 'Görünürlük',
                a: 'Metalik renktedir, dışarıdan belirgindir.',
                b: 'Diş rengine yakındır, uzaktan daha az fark edilir.'
              },
              {
                olcut: 'Dayanıklılık',
                a: 'Kırılma ve esnemeye karşı yüksek direnç.',
                b: 'Metale kıyasla daha kırılgandır.'
              },
              {
                olcut: 'Renklenme',
                olcutAciklama: 'Braketin kendisi mi, lastikler mi',
                a: 'Braket renk değiştirmez.',
                b: 'Braket direnclidir; çevresindeki lastikler boyanabilir, her kontrolde yenilenir.'
              },
              {
                olcut: 'Vaka aralığı',
                a: 'Zorlu kapanış bozuklukları dâhil geniş aralıkta kullanılır.',
                b: 'Aşırı kuvvet gerektirmeyen çoğu vakada kullanılır.'
              },
              {
                olcut: 'Tedavi süresi',
                a: 'Sürtünme düşük olduğu için hareket bir miktar hızlı olabilir.',
                b: 'Bazı vakalarda küçük bir süre farkı doğabilir.'
              }
            ],
            dipnot:
              'Seçim, ortodontik sorunun zorluk derecesi ile görünüm beklentisinin birlikte değerlendirilmesiyle yapılır.'
          },
          notlar: [
            'Kuruyemiş, cips gibi sert ve sakız, karamel gibi yapışkan gıdalardan kaçınılmalıdır.',
            'Ara yüz fırçası tedavinin ayrılmaz parçasıdır; braket çevresi temizlenmezse mine lekelenir.',
            'Braket koparsa parça saklanmalı ve randevu beklenmeden klinik aranmalıdır.',
            'Randevuların aksaması tedavi süresini uzatır.'
          ],
          sorular: [
            {
              soru: 'Tel takınca çok ağrır mı?',
              cevap:
                'Takma sırasında ağrı olmaz. Sonraki birkaç gün dişlerde basınç ve hassasiyet hissedilir; ' +
                'bu her tel ayarından sonra daha hafif biçimde tekrarlar.'
            },
            {
              soru: 'Şeffaf plakla yapılamaz mı?',
              cevap:
                'Bazı vakalarda yapılabilir. Ancak karmaşık hareketler gerektiren durumlarda sabit ' +
                'braketler daha öngörülebilir sonuç verir; karar muayenede verilir.'
            }
          ]
        },
        {
          ad: 'Seramik Diş Teli',
          slug: 'seramik-dis-teli',
          guncelleme: '2026-08-29',
          dal: 'ortodonti',
          ozet:
            'Diş rengine yakın, yarı saydam seramik braketlerle yürütülen ve uzaktan daha az belli olan tedavi.',
          metaAciklama:
            'Seramik diş teli nedir, metal braketten farkı ne, renk değiştirir mi? Tedavi süreci ' +
            'anlatılıyor.',
          giris:
            'Seramik braketler metal olanlarla aynı işi yapar; fark malzemededir. Diş rengine yakın ve ' +
            'yarı saydam oldukları için uzaktan bakıldığında daha az fark edilirler. Tedavi mantığı, ' +
            'kontrol düzeni ve bakım gereksinimleri metal braketle aynıdır.',
          bolumler: [
            {
              baslik: 'Kimde tercih edilir',
              metin:
                'Ortodontik tedaviye ihtiyacı olan ama tedavi boyunca braketlerin görünmesini istemeyen ' +
                'hastalarda konuşulur. Vakanın zorluğu seçimde belirleyicidir; çok kuvvet gerektiren ' +
                'hareketlerde hekim metal braket önerebilir.'
            },
            {
              baslik: 'Malzemenin getirdiği farklar',
              metin:
                'Seramik metale göre daha kırılgandır, bu yüzden sert gıdaları ısırarak koparmamaya ' +
                'daha çok özen gerekir. Braketleri bağlayan şeffaf lastikler çay, kahve ve sigarayla ' +
                'boyanabilir; bu lastikler zaten her kontrolde yenilenir.'
            },
            {
              baslik: 'Şeffaf plakla karıştırılmamalı',
              metin:
                'Seramik braket dişe sabitlenir, hasta çıkaramaz ve sürekli kuvvet uygular. Şeffaf plak ' +
                'ise takılıp çıkarılabilir. İkisi farklı yöntemlerdir; hangisinin uygun olduğu vakaya ' +
                'göre değişir. Seramik braket "görünmeyen tel" değildir: uzaktan az fark edilir ama ' +
                'yakından bakıldığında braketler ve tel görülür.'
            },
            {
              baslik: 'Tedavi nasıl ilerler',
              metin:
                'Braketler dişlere yapıştırıldıktan sonra aralarından geçen tel, dişleri hedeflenen ' +
                'konuma doğru zorlar. Tedavi boyunca teller kademeli olarak değiştirilir: ilk ' +
                'aşamada ince ve esnek teller hizalamayı yapar, sonraki aşamalarda daha kalın teller ' +
                'ince ayarları verir. Bu yüzden kontroller belirli aralıklarla ve düzenli olmalıdır; ' +
                'randevu aksadığında tedavi o kadar uzar.'
            },
            {
              baslik: 'İlk günler ve alışma',
              metin:
                'Braketler takıldıktan sonraki ilk günlerde dişlerde baskı hissi ve hafif hassasiyet ' +
                'olağandır; genellikle birkaç günde azalır. Braketlerin dudak ve yanak içine sürtmesi ' +
                'rahatsızlık verebilir, bunun için mum verilir. Aynı durum her tel değişiminden ' +
                'sonra daha hafif biçimde tekrarlanabilir.'
            },
            {
              baslik: 'Temizlik neden daha önemli',
              metin:
                'Braketler diş yüzeyinde plağın tutunabileceği yeni köşeler oluşturur. Yetersiz ' +
                'temizlikte braketin çevresinde kalıcı beyaz lekeler — mine kaybının ilk aşaması — ' +
                'oluşabilir ve bunlar braket söküldükten sonra da kalır. Bu yüzden ortodontik tedavide ' +
                'arayüz fırçası, diş ipi geçirici ve düzenli kontrol tedavinin parçasıdır, ek bir ' +
                'öneri değil.'
            },
            {
              baslik: 'Tedavi bittiğinde ne olur',
              metin:
                'Braketler özel bir uçla, diş kesilmeden sökülür; yüzeyde kalan yapıştırıcı ' +
                'temizlenip diş cilalanır. Aynı randevuda ölçü alınarak pekiştirme apareyi ' +
                'hazırlanır. Sökümden sonra dişlerin yüzeyi ilk günlerde farklı hissedilebilir ' +
                've diş etleri hafif hassas olabilir; ikisi de kısa sürede geçer. Braket ' +
                'altındaki mine tedavi boyunca kapalı kaldığı için çevresine göre biraz daha ' +
                'açık görünebilir, bu fark zamanla dengelenir.'
            },
            {
              baslik: 'Pekiştirme neden bırakılamaz',
              metin:
                'Dişler yeni konumlarına taşındığında çevrelerindeki lif ve kemik hâlâ eski ' +
                'konumun izini taşır. Bu dokuların yeniden şekillenmesi aylar sürer ve o süre ' +
                'boyunca dişler geri dönme eğilimindedir. Pekiştirme apareyi bu eğilimi ' +
                'karşılar. Kullanım süresi kısaltıldığında kaybedilen şey birkaç haftalık ' +
                'rahatlık değil, aylarca süren tedavinin sonucudur.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'Kayıt ve planlama',
              sure: '1-2 randevu',
              aciklama:
                'Röntgen, fotoğraf ve ölçüler alınır; tedavi planı ve braket tipi birlikte kararlaştırılır.'
            },
            {
              asama: 'Braketlerin yapıştırılması',
              sure: 'Tek seans',
              aciklama:
                'Braketler dişlere yapıştırılır ve ilk tel takılır. Diş kesilmez, uyuşturma gerekmez.'
            },
            {
              asama: 'Aktif tedavi',
              sure: 'Aylar',
              aciklama:
                'Düzenli kontrollerde teller değiştirilir ve ilerleme değerlendirilir. Süre vakanın ' +
                'karmaşıklığına göre değişir.'
            },
            {
              asama: 'Pekiştirme',
              sure: 'Uzun vadeli',
              aciklama:
                'Braketler söküldükten sonra sonucun korunması için pekiştirme apareyi kullanılır.'
            }
          ],
          notlar: [
            'Sert ve yapışkan gıdalardan metal braketteki gibi kaçınılmalıdır.',
            'Lastiklerin renklenmemesi için koyu içecekler sınırlandırılabilir.',
            'Ara yüz fırçası ve diş ipi düzenli kullanılmalıdır.',
            'Braket düştüğünde ya da tel battığında kontrol randevusu beklenmeden aranmalıdır.',
            'Kontrollerin aksaması tedavi süresini doğrudan uzatır.'
          ],
          sorular: [
            {
              soru: 'Braketlerin kendisi sararır mı?',
              cevap:
                'Seramik braketin kendisi renk değişimine dirençlidir. Renklenme genellikle çevresindeki ' +
                'şeffaf lastiklerde olur ve kontrollerde değiştirilir.'
            },
            {
              soru: 'Tedavi metal telden uzun mu sürer?',
              cevap:
                'Bazı vakalarda küçük bir süre farkı olabilir. Bu fark tedavinin genel uzunluğu yanında ' +
                'sınırlıdır ve planlamada dikkate alınır.'
            },
            {
              soru: 'Seramik braket kırılırsa ne olur?',
              cevap:
                'Kırılan ya da düşen braket kontrol randevusunda yenilenir. Bu, tedavinin baştan ' +
                'başlaması anlamına gelmez ama o dişin hareketi braket takılana kadar durur; bu ' +
                'yüzden bekletilmeden bildirilmesi gerekir.'
            },
            {
              soru: 'Braket söküldüğünde dişte iz kalır mı?',
              cevap:
                'Braket doğru sökülüp yüzey cilalandığında iz kalmaz, çünkü diş kesilmemiştir. ' +
                'Kalıcı iz, tedavi boyunca yetersiz temizlik nedeniyle braket çevresinde oluşan ' +
                'beyaz mine lekeleridir; bunlar sökümle geçmez.'
            },
            {
              soru: 'Her vakada seramik braket kullanılabilir mi?',
              cevap:
                'Çoğu vakada kullanılabilir. Çok yüksek kuvvet gerektiren hareketlerde ya da ' +
                'braketin kırılma riskinin arttığı durumlarda hekim metal braket önerebilir; ' +
                'karar kayıtlar incelendikten sonra verilir.'
            }
          ]
        },
        {
          ad: 'Pekiştirme Tedavisi',
          slug: 'pekistirme-tedavisi',
          dal: 'ortodonti',
          ozet:
            'Ortodontik tedavi bittikten sonra dişlerin yeni konumunda kalmasını destekleyen koruma aşaması.',
          metaAciklama:
            'Pekiştirme (retansiyon) nedir, ne kadar sürer, plak günde kaç saat takılır? Tedavinin ' +
            'son ve en çok atlanan aşaması.',
          giris:
            'Diş teli çıktığında tedavi bitmez. Dişler yeni konumlarına yerleşene kadar eski yerlerine ' +
            'dönme eğilimi taşır. Pekiştirme, bu dönüşü engellemek için uygulanan ve tedavinin ayrılmaz ' +
            'parçası olan aşamadır.',
          bolumler: [
            {
              baslik: 'Neden gerekir',
              metin:
                'Dişleri çevreleyen lif ve kemik dokusu yeni konuma uyum sağlamak için zamana ihtiyaç ' +
                'duyar. Bu süre içinde koruma yapılmazsa çapraşıklığın bir bölümü geri gelebilir. ' +
                'Pekiştirme atlanırsa yıllarca süren tedavi boşa gidebilir.'
            },
            {
              baslik: 'İki yöntem birlikte kullanılır',
              metin:
                'Dişlerin arka yüzeyine yapıştırılan ince sabit tel dışarıdan görünmez ve sürekli ' +
                'çalışır. Buna ek olarak laboratuvarda hazırlanan şeffaf pekiştirme plağı verilebilir. ' +
                'Hangi düzenin uygun olduğu vakaya göre belirlenir.'
            },
            {
              baslik: 'Ne kadar sürer',
              metin:
                'İlk dönemde plağın tam zamanlı kullanılması istenir, sonrasında süre kademeli olarak ' +
                'azaltılır. Toplam süre aylarla değil yıllarla ifade edilir ve bazı durumlarda gece ' +
                'kullanımı uzun süre önerilir.'
            },
            {
              baslik: 'Aktif plaktan farkı',
              metin:
                'Şeffaf plak tedavisinde plak dişi hareket ettirmek için kuvvet uygular. Pekiştirme ' +
                'plağı ise kuvvet uygulamaz; dişlerin mevcut hâlini kalıp gibi sarar ve yerinde tutar.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'Sabit tel',
              sure: 'Tek seans',
              aciklama:
                'Braketler söküldüğü seansta dişlerin arka yüzeyine ince tel yapıştırılır.'
            },
            {
              asama: 'Şeffaf plak teslimi',
              sure: 'Tek seans',
              aciklama:
                'Laboratuvarda hazırlanan pekiştirme plağı teslim edilir ve kullanımı anlatılır.'
            },
            {
              asama: 'Takip',
              sure: 'Yılda 1-2 randevu',
              aciklama:
                'Dişlerin konumunu koruyup korumadığı ve telin sağlamlığı kontrol edilir.'
            }
          ],
          notlar: [
            'Plak yalnız yemek yerken ve sıcak içecek içerken çıkarılmalıdır.',
            'Çıkarıldığında kendi kutusunda saklanmalı, peçeteye sarılmamalıdır.',
            'Sıcak suyla yıkanmamalıdır; plak deforme olur.',
            'Arkadaki sabit tel koparsa vakit kaybetmeden klinik aranmalıdır.'
          ],
          sorular: [
            {
              soru: 'Ne zaman tamamen bırakabilirim?',
              cevap:
                'Bunu kontrollerdeki duruma bakarak hekiminiz söyler. Kendi kararınızla bırakmak, ' +
                'dişlerin yer değiştirmesiyle sonuçlanabilir.'
            },
            {
              soru: 'Plağı bir süre takmadım, ne yapmalıyım?',
              cevap:
                'Zorlamadan takmayı deneyin; sıkı geliyorsa ya da hiç oturmuyorsa zorlamayın ve klinik ' +
                'arayın. Dişler bir miktar hareket etmiş olabilir.'
            }
          ]
        }
      ]
    },
    {
      baslik: 'Estetik diş hekimliği',
      kalemler: [
        {
          ad: 'Gülüş Tasarımı',
          slug: 'gulus-tasarimi',
          guncelleme: '2026-08-29',
          ozet:
            'Diş, diş eti ve dudak ilişkisinin bir bütün olarak planlandığı estetik tedavi yaklaşımı.',
          metaAciklama:
            'Gülüş tasarımı nedir, hangi tedavileri kapsar, nasıl planlanır? Süreç ve kapsamı ' +
            'anlatılıyor.',
          giris:
            'Gülüş tasarımı tek bir işlemin adı değil, birden çok tedavinin ortak bir hedefe göre ' +
            'planlanmasıdır. Dişlerin biçimi ve rengi kadar diş eti seviyesi, orta hat ve dudakla ' +
            'ilişkisi de birlikte değerlendirilir.',
          bolumler: [
            {
              baslik: 'Neyi kapsar',
              metin:
                'Kapsam kişiye göre değişir. Kimi durumda beyazlatma ve birkaç küçük dolgu yeterlidir; ' +
                'kimi durumda kaplama, ortodonti ve diş eti düzenlemesi birlikte planlanır. Ne kadarının ' +
                'gerektiği muayenede belirlenir.'
            },
            {
              baslik: 'Planlama nasıl yapılır',
              metin:
                'Ağız içi ve yüz fotoğrafları çekilir, dişlerin oranları ve gülüş hattı incelenir. ' +
                'Hedeflenen sonuç hastayla birlikte konuşulur ve hangi tedavilerin hangi sırayla ' +
                'yapılacağı belirlenir. Planlama tedavinin kendisinden önce gelir.'
            },
            {
              baslik: 'Bütünlük neden önemli',
              metin:
                'Tek bir dişi ayrı ele almak, komşularıyla uyumsuz bir sonuç doğurabilir. Bu yüzden ' +
                'renk, biçim ve diş eti seviyesi baştan birlikte kararlaştırılır; örneğin beyazlatma ' +
                'yapılacaksa kaplama rengi ondan sonra seçilir.'
            },
            {
              baslik: 'Sıra neden önemli',
              metin:
                'Gülüş tasarımında işlemlerin sırası sonucu doğrudan etkiler ve geri alınamayan ' +
                'adımlar en sona bırakılır. Önce diş eti sağlığı ve çürükler ele alınır. Dişlerin ' +
                'konumu düzeltilecekse ortodonti kaplamadan önce gelir — dişler yerine oturmadan ' +
                'yapılan kaplama, konum bozukluğunu malzemeyle kapatmaya çalışmak olur ve gereksiz ' +
                'kesim demektir. Beyazlatma kaplamadan önce yapılır, çünkü kaplama beyazlamaz ve ' +
                'rengi son tona göre seçilmelidir.'
            },
            {
              baslik: 'Neyin değişebileceğinin sınırı',
              metin:
                'Tasarımın sınırlarını dişler değil yüz belirler: dudak hattı, gülerken görünen diş eti ' +
                'miktarı, orta hat ve çenenin kapanış ilişkisi. Bu yapıların bir kısmı diş hekimliğiyle ' +
                'değiştirilebilir, bir kısmı değiştirilemez. Planlamanın ilk işi neyin mümkün ' +
                'olduğunu değil, neyin mümkün olmadığını da açıkça ortaya koymaktır.'
            },
            {
              baslik: 'Önizleme aşaması',
              metin:
                'Planlanan biçim, dişlere dokunulmadan önce geçici bir malzemeyle ağızda denenebilir. ' +
                'Bu deneme aynanın karşısında konuşma ve gülme sırasında değerlendirilir; fotoğraf ' +
                'üzerindeki plan ile ağızdaki his farklı olabilir. Önizleme, tedavinin başlamadan ' +
                'önce değiştirilebildiği son aşamadır.'
            },
            {
              baslik: 'Sonucun korunması',
              metin:
                'Estetik tedavi bittiğinde bakım başlar. Diş eti sağlığının sürdürülmesi, gece diş ' +
                'sıkma varsa koruyucu plak kullanımı ve düzenli kontroller sonucun ne kadar ' +
                'korunacağını belirler. Beyazlatma yapıldıysa rengin zamanla geri dönmesi beklenir ' +
                've tazeleme planlanır.'
            },
            {
              baslik: 'Beklentinin konuşulması',
              metin:
                'Estetik tedavide sonucu belirleyen şeylerden biri, hastanın ne beklediğinin ' +
                'baştan açıkça konuşulmuş olmasıdır. Beklenti çoğu zaman genel bir cümleyle ' +
                'başlar; planlamanın işi onu ölçülebilir hâle getirmektir — hangi diş, hangi ' +
                'yönde, ne kadar. Fotoğraf ve önizleme bu konuşmanın aracıdır. ' +
                'Uygulanamayacak bir beklenti varsa bunun uygulama başlamadan söylenmesi gerekir.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'Muayene ve kayıt',
              sure: '1-2 randevu',
              aciklama:
                'Ağız içi ve yüz fotoğrafları, röntgen ve ölçüler alınır; diş eti sağlığı değerlendirilir.'
            },
            {
              asama: 'Hazırlık tedavileri',
              sure: 'Değişken',
              aciklama:
                'Çürükler, diş eti tedavisi ve gerekiyorsa ortodonti önce tamamlanır.'
            },
            {
              asama: 'Planlama ve önizleme',
              sure: '1-2 randevu',
              aciklama:
                'Hedeflenen biçim hazırlanır ve ağızda denenerek birlikte değerlendirilir.'
            },
            {
              asama: 'Uygulama',
              sure: 'Değişken',
              aciklama:
                'Onaylanan plana göre beyazlatma, kompozit düzenleme ya da kaplama sırayla uygulanır.'
            },
            {
              asama: 'Kontrol ve bakım',
              sure: 'Düzenli aralıklarla',
              aciklama:
                'Sonucun korunması için kontroller sürdürülür; gerekirse tazeleme planlanır.'
            }
          ],
          notlar: [
            'Diş eti sağlığı ve çürükler estetik tedaviden önce ele alınır.',
            'Diş sıkma alışkanlığı sonucun kalıcılığını etkiler, baştan bildirilmelidir.',
            'Tedavi sonrası bakım düzeni sonucun korunmasının parçasıdır.',
            'Beyazlatma planlanıyorsa kaplama ve dolgu renkleri ondan sonra seçilir.',
            'Ortodontik düzeltme gerekiyorsa kaplamadan önce yapılır; sıra değişirse gereksiz diş kesimi olur.'
          ],
          sorular: [
            {
              soru: 'Mutlaka kaplama gerekir mi?',
              cevap:
                'Hayır. Bazı durumlarda beyazlatma ve kompozit düzenlemelerle de hedeflenen sonuca ' +
                'yaklaşılabilir. En az müdahaleyle çözülebilen seçenek önce değerlendirilir.'
            },
            {
              soru: 'Sonucu önceden görebilir miyim?',
              cevap:
                'Dijital gülüş tasarımı ile tarama ve prova şablonu üzerinden önizleme yapılabilir; ' +
                'böylece dişlere dokunulmadan önce sonuç ağızda denenir.'
            },
            {
              soru: 'Ne kadar sürer?',
              cevap:
                'Kapsamına bağlıdır. Yalnız beyazlatma ve birkaç kompozit düzenleme birkaç randevuda ' +
                'tamamlanabilirken, ortodonti gereken bir planda süre aylara yayılır. Süre planlama ' +
                'aşamasında, hangi tedavilerin gerektiği belirlendikten sonra konuşulur.'
            },
            {
              soru: 'Gülerken diş etim çok görünüyor, bu düzelir mi?',
              cevap:
                'Nedenine bağlı. Diş eti seviyesi dişin üzerinde fazla kalıyorsa diş eti düzenlemesiyle ' +
                'ele alınabilir. Kaynağı dudak hareketi ya da çene yapısıysa çözüm diş hekimliğinin ' +
                'sınırlarını aşabilir. Ayrım muayenede yapılır.'
            },
            {
              soru: 'Tedaviye başladıktan sonra vazgeçebilir miyim?',
              cevap:
                'Beyazlatma ve önizleme aşamaları geri dönüşlüdür. Diş kesimi gerektiren adımlar ' +
                'ise geri alınamaz; bu yüzden plan onaylanmadan ve önizleme değerlendirilmeden ' +
                'kesim aşamasına geçilmez.'
            }
          ]
        },
        {
          ad: 'Diş Beyazlatma',
          slug: 'dis-beyazlatma',
          guncelleme: '2026-08-29',
          dal: 'restoratif',
          ozet: 'Diş renginin, dokuya zarar vermeyen jellerle birkaç ton açılması.',
          metaAciklama:
            'Diş beyazlatma nasıl yapılır, kalıcılığı ne kadardır, kimlere uygun değildir?',
          giris:
            'Beyazlatma, diş yüzeyindeki ve içindeki renklenmelerin özel jellerle açılmasıdır. Klinikte ' +
            'tek seansta ya da eve verilen kişiye özel plaklarla evde uygulanabilir; ikisi birlikte de ' +
            'planlanabilir.',
          bolumler: [
            {
              baslik: 'Renklenme nereden gelir',
              metin:
                'Renklenme iki katmanda olur. Yüzeydeki dış renklenme çay, kahve, sigara ve renkli ' +
                'yiyeceklerin mine üzerinde bıraktığı tabakadır; bunun bir kısmı temizlikle kalkar. ' +
                'İç renklenme ise dişin kendi dokusundadır: yaşla birlikte dentinin koyulaşması, ' +
                'geçirilmiş travma ya da kanal tedavisi sonrası renk değişimi bu gruba girer. ' +
                'Beyazlatma jeli asıl olarak ikinci gruba etki eder, çünkü mineden geçerek dokunun ' +
                'içindeki renk moleküllerini parçalar.'
            },
            {
              baslik: 'Öncesinde yapılması gerekenler',
              metin:
                'Çürük, kırık dolgu ve diş eti iltihabı beyazlatmadan önce tedavi edilir. Yüzeydeki taş ve ' +
                'renklenme temizlenmeden yapılan beyazlatma dengesiz sonuç verir. Çürük ya da açık ' +
                'kenarlı dolgu varsa jel doğrudan iç dokuya sızabilir ve şiddetli hassasiyete yol ' +
                'açar; bu yüzden ön muayene isteğe bağlı bir adım değildir.'
            },
            {
              baslik: 'Uygulama',
              metin:
                'Diş etleri koruyucu bariyerle örtülür ve jel dişlere uygulanır. Klinik uygulaması ' +
                'genellikle bir seansta biter; ev tipi uygulamada plaklar birkaç gün boyunca belirlenen ' +
                'süre takılır. Ev tipinde kullanılan jelin yoğunluğu daha düşüktür, bu yüzden etkisi ' +
                'daha uzun sürede ortaya çıkar. İki yöntem birlikte de planlanabilir: klinikte ' +
                'başlanıp evde sürdürülür.'
            },
            {
              baslik: 'Hassasiyet neden olur',
              metin:
                'Jel mineden geçerken dentindeki mikroskobik kanalları geçici olarak açar; soğuk uyaran ' +
                'bu kanallar üzerinden sinire daha kolay ulaşır. Hassasiyet bu yüzden beklenen bir ' +
                'yan etkidir, dişin zarar gördüğü anlamına gelmez ve genellikle birkaç gün içinde ' +
                'kendiliğinden geçer. Uygulama aralıkları açılarak ya da hassasiyet giderici diş ' +
                'macunuyla azaltılabilir.'
            },
            {
              baslik: 'Kimlerde uygun değildir',
              metin:
                'Hamilelik ve emzirme döneminde, gelişimini tamamlamamış dişlerde ve tedavi edilmemiş ' +
                'çürük ya da diş eti hastalığı varlığında ertelenir. Aşırı hassas dişlerde ve belirgin ' +
                'mine aşınması olan kişilerde önce bu sorun ele alınır. Dişlerin ön yüzünde kaplama ' +
                'ya da geniş dolgu varsa beklenen sonucun sınırlı olacağı baştan konuşulur.'
            },
            {
              baslik: 'Kalıcılığı',
              metin:
                'Sonuç kalıcı değildir; kahve, çay, sigara ve kırmızı şarap rengin geri dönmesini hızlandırır. ' +
                'Aralıklı tazeleme uygulamalarıyla korunur. Ne kadar süreyle korunacağı kişinin ' +
                'beslenme ve sigara alışkanlığına bağlıdır, bu yüzden baştan bir süre verilemez. ' +
                'Tazeleme çoğunlukla ilk uygulamadan daha kısa sürer.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'Muayene ve hazırlık',
              sure: 'Tek seans',
              aciklama:
                'Çürük, dolgu ve diş eti durumu değerlendirilir; gereken tedaviler önce tamamlanır.'
            },
            {
              asama: 'Temizlik',
              sure: 'Tek seans',
              aciklama:
                'Yüzeydeki taş ve dış renklenme kaldırılır; beyazlatma temiz yüzeyde eşit sonuç verir.'
            },
            {
              asama: 'Beyazlatma',
              sure: 'Klinikte tek seans ya da evde birkaç gün',
              aciklama:
                'Seçilen yönteme göre klinikte uygulanır ya da kişiye özel plaklarla evde sürdürülür.'
            },
            {
              asama: 'Değerlendirme ve tazeleme',
              sure: 'Aralıklı',
              aciklama:
                'Sonuç kontrolde değerlendirilir; renk zamanla geri döndüğünde tazeleme planlanır.'
            }
          ],
          karsilastirma: {
            baslik: 'Klinik uygulaması ile ev tipi uygulama',
            sutunlar: ['Klinikte', 'Evde'],
            satirlar: [
              {
                olcut: 'Jel yoğunluğu',
                olcutAciklama: 'İki yöntemi ayıran temel fark',
                a: 'Yüksek; hekim denetiminde uygulanır.',
                b: 'Düşük; uzun sürede etki eder.'
              },
              {
                olcut: 'Süre',
                a: 'Tek seansta tamamlanır.',
                b: 'Birkaç gün boyunca, belirlenen sürelerle.'
              },
              {
                olcut: 'Diş eti koruması',
                a: 'Bariyerle örtülür.',
                b: 'Kişiye özel plak jeli diş etinden uzak tutar.'
              },
              {
                olcut: 'Hassasiyet',
                a: 'Daha yoğun ama kısa süreli olabilir.',
                b: 'Daha hafif; ara verilerek yönetilebilir.'
              },
              {
                olcut: 'Kontrol',
                a: 'Süreç boyunca hekim gözlemi altında.',
                b: 'Kullanım hastanın tarifine uymasına bağlı.'
              }
            ],
            dipnot:
              'İkisi rakip yöntem değildir; sıkça birlikte planlanır — klinikte başlanır, evde sürdürülür. Hangisinin seçileceği renklenmenin nedenine ve dişlerin hassasiyetine göre belirlenir.'
          },
          notlar: [
            'Uygulamadan sonraki iki gün renk veren yiyecek ve içecekler sınırlandırılmalıdır.',
            'Geçici soğuk hassasiyeti sık görülür ve kendiliğinden geçer.',
            'Dolgu ve kaplamalar beyazlamaz; renk farkı oluşursa yenilenmeleri gerekebilir.',
            'İnternetten alınan hazır plak ve şeritler diş etine zarar verebilir, denetimsiz kullanılmamalıdır.',
            'Hamilelik ve emzirme döneminde uygulama ertelenir.'
          ],
          sorular: [
            {
              soru: 'Beyazlatma dişe zarar verir mi?',
              cevap:
                'Hekim denetiminde ve uygun yoğunlukta yapılan uygulamada mine dokusunda kalıcı bir zarar ' +
                'beklenmez. Denetimsiz ürünler diş eti yanığına ve dengesiz renge yol açabilir.'
            },
            {
              soru: 'Kaç ton açılır?',
              cevap:
                'Sonuç dişin başlangıç rengine ve renklenmenin nedenine bağlıdır; bu yüzden önceden kesin ' +
                'bir ton sayısı söylenmez.'
            },
            {
              soru: 'Dolgularım ve kaplamalarım da beyazlar mı?',
              cevap:
                'Hayır. Jel yalnız doğal diş dokusuna etki eder. Ön dişlerde görünen dolgu ya da ' +
                'kaplama varsa beyazlatmadan sonra renk farkı belirginleşebilir; bu durumda ' +
                'onların yenilenmesi gündeme gelir. Bu yüzden beyazlatma, planlanan dolgu ' +
                'yenilemelerinden önce yapılır.'
            },
            {
              soru: 'Kanal tedavisi görmüş koyu dişimde işe yarar mı?',
              cevap:
                'Tek dişin iç renklenmesinde farklı bir yöntem kullanılır: jel dişin içine, kanal ' +
                'boşluğuna yerleştirilir ve dışarıdan değil içeriden etki eder. Uygunluğu dişin ' +
                'kanal tedavisinin durumuna bakılarak değerlendirilir.'
            },
            {
              soru: 'Ne sıklıkla tekrarlanabilir?',
              cevap:
                'Sık tekrar hassasiyeti artırır. Tazeleme aralığı rengin geri dönme hızına göre ' +
                'kişiye özel belirlenir; kendi başına, tarif edilenden sık uygulama önerilmez.'
            }
          ]
        },
        {
          ad: 'Bonding',
          slug: 'bonding',
          guncelleme: '2026-08-29',
          dal: 'restoratif',
          ozet:
            'Dişe kompozit malzemenin katman katman işlenmesiyle biçim ve aralık düzeltmesi.',
          metaAciklama:
            'Bonding nedir, laminadan farkı ne, tek seansta biter mi? Uygulama ve sonrasında ' +
            'dikkat edilecekler.',
          giris:
            'Bonding, diş renginde kompozit malzemenin doğrudan ağızda dişe işlenmesidir. Laboratuvar ' +
            'aşaması yoktur; hekim malzemeyi katmanlar hâlinde yerleştirip şekillendirir ve ışıkla ' +
            'sertleştirir. Çoğu durumda tek seansta biter.',
          bolumler: [
            {
              baslik: 'Hangi durumlarda uygulanır',
              metin:
                'Ön dişler arasındaki küçük boşluklar, kenar kırıkları, biçim düzensizlikleri ve ' +
                'aşınmış kesici kenarlar başlıca nedenlerdir. Büyük madde kaybı ya da yaygın renklenme ' +
                'varsa başka seçenekler değerlendirilir.'
            },
            {
              baslik: 'İşlem sırası',
              metin:
                'Diş yüzeyi temizlenip hafifçe pürüzlendirilir. Kompozit katmanlar hâlinde uygulanır, ' +
                'her katman ışıkla sertleştirilir. Son aşamada biçim verilip cilalanır. Çoğu durumda ' +
                'uyuşturma gerekmez.'
            },
            {
              baslik: 'Laminadan farkı',
              metin:
                'Lamina laboratuvarda üretilir ve dişe yapıştırılır; bonding ağızda, o seansta ' +
                'şekillendirilir. Bonding geri dönüşü daha kolay bir yöntemdir çünkü diş dokusundan ' +
                'genellikle bir şey eksiltilmez. Buna karşılık yüzey renklenmesine daha açıktır.'
            },
            {
              baslik: 'Malzeme neden katman katman konur',
              metin:
                'Kompozit ışıkla sertleşirken hafifçe büzülür. Malzeme tek seferde kalın bir kütle ' +
                'olarak konursa bu büzülme dişle kompozit arasındaki bağda gerilim yaratır ve kenarda ' +
                'mikroskobik aralık oluşabilir. İnce katmanlar hâlinde uygulanıp her katman ayrı ' +
                'sertleştirildiğinde gerilim dağılır. Aynı yöntem, doğal dişin farklı derinlikteki ' +
                'renk geçişlerinin taklit edilmesine de imkân verir.'
            },
            {
              baslik: 'Sonrasında ne beklenir',
              metin:
                'Uyuşturma yapılmadıysa işlemden hemen sonra normal hayata dönülür. İlk günlerde ' +
                'yeni yüzeyin dile farklı gelmesi olağandır. Isırma sırasında yükseklik hissediliyorsa ' +
                'bu ayarlanması gereken bir durumdur ve alışmayı beklemek yerine bildirilmelidir; ' +
                'yüksek kalan bir yüzey hem kırılır hem karşı dişi zorlar.'
            },
            {
              baslik: 'Bakımı ve tazelenmesi',
              metin:
                'Kompozit yüzeyi doğal mineye göre daha gözeneklidir; zamanla parlaklığını kaybedebilir ' +
                've kenarlarında renklenme görülebilir. Bunların çoğu kontrol randevusunda cilalama ' +
                'ile giderilir. Kenardan küçük bir kırık olursa genellikle tamamı sökülmeden aynı ' +
                'malzemeyle onarılır — yöntemin en pratik yanlarından biri budur.'
            },
            {
              baslik: 'Renk nasıl seçilir',
              metin:
                'Doğal diş tek bir renk değildir: kesici kenara doğru saydamlaşır, diş etine doğru ' +
                'koyulaşır. Bu geçişi taklit etmek için farklı saydamlıkta kompozitler bir arada ' +
                'kullanılır. Renk seçimi dişler kurumadan, gün ışığına yakın aydınlatmada yapılır; ' +
                'uzun süre açık kalan diş geçici olarak matlaşıp açılır ve o an seçilen ton ' +
                'sonradan koyu kalır. Beyazlatma planlanıyorsa renk seçimi ona göre ertelenir.'
            },
            {
              baslik: 'Hangi durumlarda yetmez',
              metin:
                'Bonding, kalan diş dokusuna tutunarak çalışır. Madde kaybı büyükse ya da kesici ' +
                'kenarın tamamı yenilenecekse malzemenin kendisi çiğneme ve ısırma yükünü taşımak ' +
                'zorunda kalır; bu durumda kırılma riski artar. Yaygın iç renklenmede de sınırlıdır: ' +
                'kompozit yarı saydam olduğu için altındaki koyu renk bir ölçüde vurur. Bu ' +
                'durumlarda lamina ya da kaplama değerlendirilir.'
            }
          ],
          notlar: [
            'İlk günlerde çay, kahve ve kırmızı şarap gibi renklendiriciler sınırlandırılmalıdır.',
            'Sert gıdalar ön dişlerle kırılmamalıdır.',
            'Tırnak yeme ve kalem ısırma bonding kenarlarını kırar.',
            'Yüzey zamanla matlaşırsa cilayla tazelenebilir.',
            'Gece diş sıkma varsa bildirilmelidir; koruyucu plak kenar kırıklarını azaltır.',
            'Isırmada yükseklik hissi geçmesi beklenmez, ayarlanması gerekir.'
          ],
          sorular: [
            {
              soru: 'Dişimden bir şey kesilir mi?',
              cevap:
                'Çoğu durumda aşındırma yapılmaz ya da yüzeyde çok sınırlı bir pürüzlendirmeyle ' +
                'yetinilir. Bu, yöntemin geri dönüşü kolay olmasının nedenidir.'
            },
            {
              soru: 'Ne kadar dayanır?',
              cevap:
                'Kullanım alışkanlıklarına ve bakıma göre değişir. Kenar kırığı ya da renklenme ' +
                'olduğunda çoğu zaman tamamı yenilenmeden onarılabilir.'
            },
            {
              soru: 'Tek seansta biter mi?',
              cevap:
                'Çoğu durumda evet. Laboratuvar aşaması olmadığı için ölçü alınıp beklenmez; ' +
                'işlem aynı randevuda tamamlanır. Aynı seansta çok sayıda diş yapılacaksa ' +
                'randevu bölünebilir.'
            },
            {
              soru: 'Beyazlatma yaptırırsam bonding de beyazlar mı?',
              cevap:
                'Hayır. Beyazlatma yalnız doğal diş dokusuna etki eder. Bu yüzden ikisi birlikte ' +
                'planlanıyorsa önce beyazlatma yapılır, bonding malzemesinin rengi de yeni ton ' +
                'esas alınarak seçilir.'
            },
            {
              soru: 'Renklenirse ne yapılır?',
              cevap:
                'Yüzeysel renklenme çoğunlukla cilalama ile giderilir. Renklenme malzemenin ' +
                'içine işlemişse ilgili katman yenilenir; bu da genellikle tek seansta yapılan ' +
                'bir onarımdır.'
            },
            {
              soru: 'Dişlerimin arasındaki boşluk bondingle kapatılabilir mi?',
              cevap:
                'Küçük ve orta boşluklar kapatılabilir. Sınırı belirleyen şey, boşluk kapatıldığında ' +
                'dişlerin oranının doğal görünüp görünmeyeceğidir: geniş bir aralığı yalnız malzeme ' +
                'ekleyerek kapatmak dişleri gereğinden geniş gösterir. Aralık büyükse önce ' +
                'ortodontik yaklaştırma değerlendirilir, bonding son rötuş olarak kullanılır.'
            },
            {
              soru: 'Bonding sonrası özel bir bakım gerekir mi?',
              cevap:
                'Ayrı bir ürün gerekmez; günlük fırçalama ve diş ipi yeterlidir. Tek fark, ' +
                'yüzeyin renklenmeye doğal mineden daha açık olmasıdır. Kontrollerde yapılan ' +
                'cilalama parlaklığı geri getirir ve yüzeyin yeniden renklenmesini yavaşlatır.'
            }
          ]
        },
        {
          ad: 'Pembe Estetik',
          slug: 'pembe-estetik',
          dal: 'periodontoloji',
          ozet:
            'Gülüşte diş etinin ne kadar göründüğünü, seviyesini ve simetrisini ele alan planlama yaklaşımı.',
          metaAciklama:
            'Pembe estetik nedir, diş eti görünürlüğü nasıl değerlendirilir, hangi yöntemler ' +
            'kullanılır? Planlamanın çerçevesi.',
          giris:
            'Gülüşte yalnız dişler görünmez; diş eti de kadrajın parçasıdır. Pembe estetik, diş etinin ' +
            'nerede durması gerektiğini hesaplayan planlama katmanıdır. Uygulanacak işlemin kendisi ' +
            'değil, hangi işlemin neden gerektiğini belirleyen çerçevedir.',
          bolumler: [
            {
              baslik: 'Neye bakılır',
              metin:
                'Gülerken diş etinin ne kadar göründüğü, iki taraf arasındaki simetri, diş boylarının ' +
                'birbirine oranı ve üst dudağın hareketi değerlendirilir. Bunlar birlikte ele alınmadan ' +
                'yapılan bir müdahale dengeyi bozabilir.'
            },
            {
              baslik: 'Sık karşılaşılan tablolar',
              metin:
                'Gülerken diş etinin gereğinden fazla görünmesi, iki yandaki diş eti seviyelerinin ' +
                'eşit olmaması ve dişlerin kısa görünmesi başlıca başlıklardır. Nedeni her zaman diş ' +
                'eti fazlalığı değildir; dudak hareketi ya da dişlerin konumu da rol oynayabilir.'
            },
            {
              baslik: 'Nedene göre yöntem',
              metin:
                'Sebep diş eti fazlalığıysa cerrahi şekillendirme, dişlerin konumuysa ortodonti, ' +
                'dudak hareketiyse başka yaklaşımlar gündeme gelir. Doğru yöntem ancak sebep ' +
                'belirlendikten sonra seçilir.'
            }
          ],
          karsilastirma: {
            baslik: 'Planlama ile uygulama arasındaki fark',
            sutunlar: ['Pembe estetik', 'Pembe diş eti estetiği'],
            satirlar: [
              {
                olcut: 'Ne olduğu',
                a: 'Diş eti, diş ve dudak uyumunu belirleyen planlama.',
                b: 'Bu plana ulaşmak için yapılan fiziksel işlemler.'
              },
              {
                olcut: 'Yapılan iş',
                a: 'Fotoğraf, ölçü ve gülüş hattı analizi.',
                b: 'Diş etinin lazer ya da cerrahi aletle şekillendirilmesi.'
              },
              {
                olcut: 'Çıktısı',
                a: 'Diş etinin nerede durması gerektiğine karar.',
                b: 'Ağızda o seviyenin oluşturulması.'
              },
              {
                olcut: 'Uyuşturma',
                a: 'Gerekmez.',
                b: 'Uygulanır.'
              },
              {
                olcut: 'İyileşme',
                a: 'İyileşme dönemi yoktur.',
                b: 'Birkaç günlük kısa bir iyileşme beklenir.'
              }
            ],
            dipnot:
              'İkisi rakip değil, birbirinin devamıdır: planlama yapılmadan uygulanan bir diş eti kesimi dengeyi bozabilir.'
          },
          notlar: [
            'Diş eti iltihabı varken estetik planlama yapılmaz; önce sağlık sağlanır.',
            'Planlama beyaz (diş) ve pembe (diş eti) estetiğin birlikte ele alınmasını gerektirir.',
            'Sonuç beklentisi işlem öncesinde açıkça konuşulmalıdır.'
          ],
          sorular: [
            {
              soru: 'Pembe diş eti estetiğiyle aynı şey mi?',
              cevap:
                'Aynı değil, birbirini tamamlar. Pembe estetik neyin neden yapılması gerektiğini ' +
                'belirleyen planlamadır; pembe diş eti estetiği ise bu planı uygulayan somut ' +
                'işlemlerdir.'
            },
            {
              soru: 'Sadece diş etine mi bakılır?',
              cevap:
                'Hayır. Dişlerin biçimi, rengi ve dudakla ilişkisi de aynı değerlendirmenin parçasıdır; ' +
                'gülüş bir bütün olarak ele alınır.'
            }
          ]
        },
        {
          ad: 'Dijital Gülüş Tasarımı',
          slug: 'dijital-gulus-tasarimi',
          ozet:
            'Gülüşün dijital tarama ve yazılımla planlanıp, dişlere dokunulmadan ağızda önizlenmesi.',
          metaAciklama:
            'Dijital gülüş tasarımı nedir, mock-up nasıl denenir, klasik planlamadan farkı ne? ' +
            'Süreç anlatılıyor.',
          giris:
            'Dijital gülüş tasarımı, planlamanın tarayıcı ve yazılım üzerinden yapılması ve sonucun ' +
            'tedaviye başlamadan önce ağızda denenmesidir. En belirgin yanı şudur: dişlerinize hiçbir ' +
            'işlem yapılmadan, sonucu kendi yüzünüzde görebilirsiniz.',
          bolumler: [
            {
              baslik: 'Nasıl ilerler',
              metin:
                'Ağız içi dijital tarayıcıyla ölçü alınır ve fotoğraflarla birlikte yazılıma aktarılır. ' +
                'Tasarım hazırlandıktan sonra geçici bir şablona (mock-up) dönüştürülür ve bu şablon ' +
                'dişlerin üzerine oturtularak denenir.'
            },
            {
              baslik: 'Önizlemenin değeri',
              metin:
                'Şablon ağızdayken konuşabilir, gülebilir ve aynada bakabilirsiniz. Beğenmediğiniz bir ' +
                'nokta varsa henüz hiçbir dişe dokunulmadığı için tasarım değiştirilebilir. Onay ' +
                'verildikten sonra asıl tedaviye geçilir.'
            },
            {
              baslik: 'Klasik planlamadan farkı',
              metin:
                'Klasik gülüş tasarımında plan hekimin klinik değerlendirmesi ve fotoğraflar üzerinden ' +
                'yürür; dijital önizleme zorunlu değildir. Burada ise tarama, yazılım ve ağızda ' +
                'prototip denemesi sürecin merkezindedir.'
            }
          ],
          zamanCizelgesi: [
            {
              asama: 'Kayıtların alınması',
              sure: 'Tek seans',
              aciklama:
                'Ağız içi tarama, fotoğraf ve video kayıtları alınır.'
            },
            {
              asama: 'Dijital planlama',
              sure: 'Birkaç gün',
              aciklama:
                'Veriler yazılımda işlenir ve yüz hatlarına göre tasarım hazırlanır.'
            },
            {
              asama: 'Mock-up provası',
              sure: 'Tek seans',
              aciklama:
                'Tasarım geçici şablonla ağızda denenir; dişlere henüz dokunulmaz.'
            }
          ],
          karsilastirma: {
            baslik: 'Klasik planlama ile dijital planlama',
            sutunlar: ['Klasik gülüş tasarımı', 'Dijital gülüş tasarımı'],
            satirlar: [
              {
                olcut: 'Ölçü',
                a: 'Ölçü maddesiyle fiziksel kalıp alınır.',
                b: 'Ağız içi tarayıcıyla dijital tarama yapılır.'
              },
              {
                olcut: 'Planlama',
                a: 'Fiziksel model üzerinde yürütülür.',
                b: 'Yazılımda, fotoğraf ve tarama verisiyle yürütülür.'
              },
              {
                olcut: 'Önizleme',
                olcutAciklama: 'Yöntemin asıl farkı',
                a: 'Sonuç genellikle laboratuvar aşamasından sonra provada görülür.',
                b: 'Dişlere dokunulmadan şablonla ağızda denenir.'
              },
              {
                olcut: 'Değişiklik',
                a: 'Yeni ölçü ya da yeni model gerekebilir.',
                b: 'Tasarım üzerinde düzeltme yapılıp yeniden basılabilir.'
              },
              {
                olcut: 'Süreç',
                a: 'Fiziksel taşıma ve el işçiliği süreyi uzatabilir.',
                b: 'Veri doğrudan aktarıldığı için akış daha kısadır.'
              }
            ],
            dipnot:
              'İki yol da aynı hedefe çalışır; dijital olan, sonucu önceden görmek isteyen hastada öne çıkar.'
          },
          notlar: [
            'Önizleme geçicidir; kalıcı sonucun kendisi değil, ona hazırlıktır.',
            'Şablon takılıyken sert gıda ısırılmaz.',
            'Tasarım üzerinde değişiklik istemek sürecin olağan parçasıdır.'
          ],
          sorular: [
            {
              soru: 'Tasarımı beğenmezsem ne olur?',
              cevap:
                'Şablon aşamasında dişlerde kalıcı bir işlem yapılmadığı için değişiklik istenebilir. ' +
                'Bu, yöntemin başlıca amacıdır.'
            },
            {
              soru: 'Ne kadar sürede hazır olur?',
              cevap:
                'Tarama sonrası tasarımın hazırlanıp ağızda denenmesi genellikle birkaç gün ile bir ' +
                'hafta arasında planlanır.'
            }
          ]
        },
        {
          ad: 'Pembe Diş Eti Estetiği',
          slug: 'pembe-dis-eti-estetigi',
          dal: 'periodontoloji',
          ozet:
            'Diş etinin lazer ya da cerrahi aletlerle şekillendirilmesi, kron boyu uzatma ve doku ekleme işlemleri.',
          metaAciklama:
            'Diş eti estetiği işlemleri nelerdir, gingivektomi ve kron boyu uzatma nasıl yapılır? ' +
            'İyileşme süreci anlatılıyor.',
          giris:
            'Bu sayfa, pembe estetik planlamasında belirlenen hedefe ulaşmak için yapılan somut ' +
            'işlemleri anlatır. Fazla diş eti alınabilir, diş eti seviyesi eşitlenebilir ya da eksik ' +
            'olan bölgeye doku eklenebilir. Hangisinin yapılacağı planlamada belirlenir.',
          bolumler: [
            {
              baslik: 'Diş eti kesimi ve şekillendirme',
              metin:
                'Dişleri gereğinden fazla örten diş eti dokusu lazer ya da cerrahi aletle uzaklaştırılır ' +
                've kenar biçimi düzenlenir. Dişler böylece kendi gerçek boylarında görünür. Bölge ' +
                'uyuşturulur, işlem genellikle bir ya da iki seansta tamamlanır.'
            },
            {
              baslik: 'Kron boyu uzatma',
              metin:
                'Yalnız diş eti değil, altındaki kemik seviyesi de görünen diş boyunu belirler. Gerekli ' +
                'durumlarda diş eti ile birlikte kemik seviyesi de düzenlenir. Bu, sadece görünüm için ' +
                'değil, kaplama yapılabilmesi için de gerekebilir.'
            },
            {
              baslik: 'Doku ekleme',
              metin:
                'Diş eti çekilmiş ve kök açığa çıkmışsa yapılan iş tersidir: doku alınıp eksik bölgeye ' +
                'eklenir. Bunun ayrıntısı diş eti çekilmesi tedavisi sayfasında anlatılır.'
            },
            {
              baslik: 'Lazer mi, cerrahi alet mi',
              metin:
                'Seçim dokunun kalınlığına, işlem alanının genişliğine ve kemiğe müdahale gerekip ' +
                'gerekmediğine göre yapılır. İkisi de yerleşik yöntemlerdir; biri diğerinin her ' +
                'durumda üstünü değildir.'
            }
          ],
          notlar: [
            'İlk bir iki hafta sert, çok sıcak ve baharatlı gıdalardan kaçınılmalıdır.',
            'Ameliyat bölgesinde hekimin tarif ettiği yumuşak fırçalama uygulanır.',
            'Önerilen gargara belirtilen süre boyunca kullanılmalıdır.',
            'Diş eti sağlığı bozukken bu işlemler planlanmaz.'
          ],
          sorular: [
            {
              soru: 'Diş eti kesilince geri uzar mı?',
              cevap:
                'Sonucun kalıcılığı işlemin kemik seviyesini de kapsayıp kapsamadığına ve diş eti ' +
                'sağlığının korunmasına bağlıdır. Bu yüzden karar öncesinde ölçüm yapılır.'
            },
            {
              soru: 'İşlem ağrılı mı?',
              cevap:
                'Bölge uyuşturulduğu için işlem sırasında ağrı beklenmez. Sonrasındaki hafif sızlama ' +
                'için basit ağrı kesiciler önerilebilir.'
            }
          ]
        }
      ]
    },
    {
      baslik: 'Diğer',
      kalemler: [
        {
          ad: '3D Tomografi',
          slug: '3d-tomografi',
          guncelleme: '2026-08-29',
          ozet: 'Çene ve dişlerin üç boyutlu görüntülenmesi; implant ve cerrahi planlamanın temeli.',
          metaAciklama:
            'Diş hekimliğinde 3D tomografi ne işe yarar, hangi durumlarda çekilir, ne kadar sürer?',
          giris:
            'Üç boyutlu tomografi (konik ışınlı bilgisayarlı tomografi), çene kemiğini ve dişleri ' +
            'katman katman gösteren bir görüntüleme yöntemidir. İki boyutlu röntgende üst üste binen ' +
            'yapılar burada ayrı ayrı değerlendirilebilir. Tedavi değil, tedavi kararını veren bir ' +
            'inceleme adımıdır: kemiğin kalınlığı, sinirin yeri ve komşu yapıların ilişkisi ancak ' +
            'burada ölçülebilir.',
          bolumler: [
            {
              baslik: 'İki boyutlu röntgenden farkı',
              metin:
                'Panoramik röntgende çene tek bir düzleme yansıtılır; önde ve arkada duran yapılar üst ' +
                'üste biner. Bu görüntüde kemiğin yüksekliği görülür ama kalınlığı görülemez. Tomografi ' +
                'ise bölgeyi kesitler hâlinde verir, yani hem yükseklik hem kalınlık ölçülebilir. ' +
                'İmplant planlamasında belirleyici olan ölçü çoğunlukla kalınlıktır.'
            },
            {
              baslik: 'Hangi durumlarda çekilir',
              metin:
                'İmplant planlaması, gömülü diş ve kist değerlendirmesi, sinüs ilişkisi, kanal tedavisinde ' +
                'karmaşık kök yapısı ve ortodontik planlama başlıca gerekçelerdir. Gömülü yirmi yaş ' +
                'dişinin köküyle alt çene siniri arasındaki ilişki de bu görüntüyle değerlendirilir; ' +
                'cerrahi planı doğrudan etkilediği için sık istenen gerekçelerden biridir.'
            },
            {
              baslik: 'Nasıl çekilir',
              metin:
                'Hasta cihazın içinde hareketsiz durur ve kaynak baş çevresinde bir tur atar. Görüntüleme ' +
                'genellikle bir dakikanın altında sürer, hazırlık dâhil birkaç dakikada tamamlanır. ' +
                'Kapalı bir tüpe girilmez, hasta ayakta veya oturur konumdadır. Hareket görüntüyü ' +
                'bulanıklaştırdığı için tek istenen şey o kısa süre boyunca sabit durmaktır.'
            },
            {
              baslik: 'Işın miktarı',
              metin:
                'Doz, tıbbi tomografiye göre belirgin biçimde düşüktür ve alan yalnızca gereken bölgeyle ' +
                'sınırlandırılır. Yine de her görüntüleme gibi ancak tıbbi gerekçe varsa çekilir. ' +
                'Görüntülenecek alanın küçük tutulması dozu doğrudan düşürür; bu yüzden tek bir diş ' +
                'için bütün çene taranmaz.'
            },
            {
              baslik: 'Görüntü size aittir',
              metin:
                'Çekilen veri hastanın kendi sağlık kaydıdır. Dijital dosya olarak verilebilir ve başka ' +
                'bir hekim tarafından da değerlendirilebilir. Yakın tarihli bir tomografi varsa yeni ' +
                'çekim yapılmadan önce o görüntünün yeterli olup olmadığına bakılır — gereksiz tekrar ' +
                'çekim, gereksiz ışın demektir.'
            },
            {
              baslik: 'Görüntü nasıl değerlendirilir',
              metin:
                'Tomografi tek bir resim değil, bölgenin yüzlerce kesitten oluşan hacimsel kaydıdır. ' +
                'Hekim bu kaydı yazılım üzerinde istediği düzlemde keserek inceler: implant düşünülen ' +
                'noktada kemiğin yüksekliği ve kalınlığı milimetre olarak ölçülür, alt çene siniri ' +
                'işaretlenir, sinüs tabanının yeri belirlenir. Planlama bu ölçülerden çıkar; işlemin ' +
                'yapılabilir olup olmadığı da çoğu zaman burada anlaşılır.'
            },
            {
              baslik: 'Görüntülemenin sınırı',
              metin:
                'Tomografi sert dokuyu, yani kemiği ve dişi çok iyi gösterir; yumuşak dokuyu ' +
                'aynı ayrıntıda göstermez. Diş eti hastalığının derecesi, çürüğün yüzeydeki ' +
                'yayılımı ve dişin canlılığı gibi bilgiler görüntüden değil muayeneden ' +
                'gelir. Ayrıca metal dolgu ve kaplamalar görüntüde parlama oluşturarak ' +
                'çevrelerini okunmaz hâle getirebilir. Bu yüzden tomografi tek başına ' +
                'tanı koymaz, muayeneyle birlikte değerlendirilir.'
            }
          ],
          karsilastirma: {
            baslik: 'Panoramik röntgen ile üç boyutlu tomografi',
            sutunlar: ['Panoramik röntgen', 'Üç boyutlu tomografi'],
            satirlar: [
              {
                olcut: 'Ne gösterir',
                a: 'Bütün çeneyi tek düzlemde, genel bir bakış olarak.',
                b: 'Bölgeyi kesit kesit, üç boyutlu olarak.'
              },
              {
                olcut: 'Kemik kalınlığı',
                olcutAciklama: 'İmplant kararını belirleyen ölçü',
                a: 'Ölçülemez.',
                b: 'Ölçülebilir.'
              },
              {
                olcut: 'Sinir ve sinüs ilişkisi',
                a: 'Yaklaşık olarak değerlendirilir.',
                b: 'Konumu ve uzaklığı ölçülerek değerlendirilir.'
              },
              {
                olcut: 'Işın dozu',
                a: 'Daha düşük.',
                b: 'Daha yüksek; alan daraltılarak azaltılır.'
              },
              {
                olcut: 'Ne zaman yeterli',
                a: 'Genel tarama, çürük ve kemik seviyesinin gözden geçirilmesi.',
                b: 'Cerrahi ve implant planlaması, gömülü diş, kist değerlendirmesi.'
              }
            ],
            dipnot:
              'Tomografi panoramiğin gelişmiş hâli değil, farklı bir soruya cevap veren ayrı bir incelemedir; genel kontrolde panoramik yeterliyken cerrahi planlamada kesit görüntü gerekir.'
          },
          notlar: [
            'Çekim öncesinde takı, gözlük ve hareketli protezler çıkarılır.',
            'Hamilelik durumu randevudan önce mutlaka bildirilmelidir.',
            'Elinizde varsa daha önce çekilmiş görüntüleri getirin; tekrar çekim gerekmeyebilir.',
            'Görüntüleme tanı koymaz, tanıya yardımcı olur; değerlendirme muayeneyle birlikte yapılır.'
          ],
          sorular: [
            {
              soru: 'Görüntüyü başka hekime götürebilir miyim?',
              cevap:
                'Evet. Görüntü dijital olarak verilebilir ve başka bir hekim tarafından da değerlendirilebilir.'
            },
            {
              soru: 'Kapalı bir cihaza giriyor muyum?',
              cevap:
                'Hayır. Tıbbi tomografideki gibi bir tünel yoktur. Cihaz açıktır, hasta ayakta ya da ' +
                'oturur konumda durur ve kaynak baş çevresinde tek tur atar.'
            },
            {
              soru: 'Panoramik röntgenim var, yine de tomografi gerekir mi?',
              cevap:
                'Yapılacak işleme bağlı. Genel kontrol ve çürük değerlendirmesi için panoramik çoğu ' +
                'zaman yeterlidir. İmplant, gömülü diş cerrahisi veya kist değerlendirmesi söz konusuysa ' +
                'kemik kalınlığı ve komşu yapıların konumu gerekir; bunlar panoramikte ölçülemez.'
            },
            {
              soru: 'Çocuğuma çekilebilir mi?',
              cevap:
                'Tıbbi gerekçe varsa çekilebilir; gömülü diş ve ortodontik planlama başlıca ' +
                'gerekçelerdir. Çocukta alan olabildiğince dar tutulur ve gerekçe daha sıkı ' +
                'değerlendirilir.'
            },
            {
              soru: 'Sonuç ne zaman çıkar?',
              cevap:
                'Görüntü çekimden hemen sonra hazır olur ve aynı randevuda birlikte incelenebilir. ' +
                'Ayrı bir bekleme süresi yoktur.'
            }
          ]
        }
      ]
    }
  ]
};

/** Kategorisiyle birlikte tek bir işlem kaydı. */
export type IslemKaydi = Islem & { kategori: string };

/** Menüde nesneye çevrilmiş, yani sayfası yazılmış işlemler.
    Rota (`generateStaticParams`), site haritası, dizin sayfası ve paylaşım
    görselleri bu listeden beslenir. */
export const islemler: IslemKaydi[] = tedaviMenusu.kategoriler.flatMap((kategori) =>
  kategori.kalemler
    .filter((kalem): kalem is Islem => typeof kalem !== 'string')
    .map((islem) => ({ ...islem, kategori: kategori.baslik }))
);

/* Adres çakışması sessizce geçmesin: iki işlem aynı slug'ı kullanırsa ya da bir
   slug ana dalın id'siyle çakışırsa sayfalardan biri diğerini gölgeler. Derleme
   burada durur ve hangi kalemin sorunlu olduğunu söyler. */
{
  const kullanilan = new Set<string>(tedaviler.map((tedavi) => tedavi.id));
  for (const islem of islemler) {
    if (kullanilan.has(islem.slug)) {
      throw new Error(
        `site.config: /tedaviler/${islem.slug} adresi iki kez tanımlı ("${islem.ad}"). ` +
          'Her işlemin slug değeri benzersiz olmalı ve tedaviler[] id\'leriyle çakışmamalıdır.'
      );
    }
    kullanilan.add(islem.slug);
  }
}

/** Tüm tedaviler dizin sayfasının metinleri. */
export const tedavilerSayfasi = {
  kas: 'TÜM TEDAVİLER',
  baslik: 'Kliniğin sunduğu işlemler',
  /** Arama sonuçlarında görünen açıklama. 150-160 karakter idealdir. */
  metaAciklama:
    'Alsancak’taki kliniğimizde uygulanan işlemler: dolgu ve kanal tedavisinden implanta, ' +
    'ortodontiden diş eti tedavisine kadar bütün başlıklar tek listede.',
  giris:
    'Aşağıdaki liste kliniğimizde uygulanan işlemleri kategori kategori gösterir. ' +
    'Her işlemin kendi sayfasında süreç adım adım anlatılır.',
  dallarBaslik: 'Ana tedavi alanları',
  dallarGiris: 'Altı ana dal, kliniğin çalışma alanlarını topluca anlatır.',
  /* Kalemlerin bir kısmının sayfası henüz yazılmamışsa listenin üstünde çıkar;
     hepsi yazıldığında satır kendiliğinden görünmez olur. */
  hazirlanan:
    'Altında açıklama duran başlıkların sayfası hazırdır. Diğerleri hazırlanıyor; ' +
    'o işlemler için danışmadan bilgi alabilirsiniz.'
};

export const ulasimNotlari: string[] = [
  'İZBAN ve metro Alsancak durağına 400 m yürüme mesafesinde.',
  'Caddedeki otobüs durağı bina önündedir.',
  'Binanın kapalı otoparkı yoktur; caddede ücretli park alanı bulunur.'
];

/* ====================================================================
   ORTAK METİNLER — şablon metinleri, kliniğe göre değişmesi gerekmez
   ==================================================================== */

export const sterilizasyon: string[] = [
  'Kullanılan aletler ön dezenfeksiyon solüsyonunda bekletilir ve ultrasonik temizleyicide yıkanır.',
  'Kurutulan aletler tek tek poşetlenir, poşet üzerine tarih ve içerik yazılır.',
  'Buharlı otoklavda 134 °C’de sterilizasyon uygulanır.',
  'Her çevrimde kimyasal ve haftalık biyolojik indikatör kullanılır; sonuçlar kayıt defterine işlenir.'
];

export const koruyucuBilgiler: KoruyucuBilgi[] = [
  {
    harf: 'A',
    baslik: 'Fırçalama ve diş arası temizliği',
    metin:
      'Dişler günde iki kez, en az iki dakika fırçalanır. Fırça, diş eti ile diş yüzeyinin ' +
      'birleştiği çizgiye yaklaşık 45 derece açıyla yerleştirilir ve küçük hareketlerle temizlik ' +
      'yapılır. Fırçanın ulaşamadığı diş aralarında diş ipi veya arayüz fırçası kullanılır. Fırça ' +
      'kılları dağıldığında, ortalama üç ayda bir değiştirilir.'
  },
  {
    harf: 'B',
    baslik: 'Çocuklarda ilk hekim ziyareti',
    metin:
      'İlk süt dişi çıktıktan sonraki altı ay içinde, en geç birinci yaş gününde bir diş hekimine ' +
      'görünülmesi önerilir. Bu ziyarette ağız içi incelenir, beslenme ve temizlik alışkanlıkları ' +
      'konuşulur. Süt dişleri çene gelişimi ve konuşma açısından önemlidir; düşeceği düşünülerek ' +
      'tedavisiz bırakılmaz.'
  },
  {
    harf: 'C',
    baslik: 'Diş eti sağlığı',
    metin:
      'Fırçalama sırasında görülen kanama, çoğunlukla diş eti iltihabının erken belirtisidir ve ' +
      'fırçalamayı azaltmak için değil, hekime başvurmak için bir nedendir. Diş taşı, fırçayla ' +
      'temizlenemeyen sertleşmiş bakteri tabakasıdır. Sigara kullanımı ve düzensiz kan şekeri diş ' +
      'eti hastalıklarının seyrini etkiler.'
  }
];

export const sorular: Soru[] = [
  {
    soru: 'İlk randevuda ne yapılır?',
    cevap:
      'Muayene ile başlanır. Gerekirse panoramik röntgen alınır ve ağız içi fotoğraflanır. ' +
      'Bulgular anlatılır, tedavi seçenekleri ve süreleri konuşulur. İlk randevuda çoğunlukla ' +
      'işlem yapılmaz; plan üzerinde anlaşıldıktan sonra sonraki randevu belirlenir.'
  },
  {
    soru: 'İmplant tedavisi kaç aşamadan oluşur?',
    cevap:
      'Değerlendirme, cerrahi aşama, iyileşme dönemi ve üst yapı olmak üzere dört aşama vardır. ' +
      'İyileşme dönemi kemik yapısına ve bölgeye göre değişir. Bu süre boyunca gerekirse geçici ' +
      'bir çözüm uygulanır.'
  },
  {
    soru: 'Ortodontik tedaviye kaç yaşında başlanır?',
    cevap:
      'Çene gelişimini ilgilendiren bazı durumlarda karma dişlenme döneminde, yaklaşık 7-9 yaş ' +
      'arasında bir ilk değerlendirme önerilir. Diş dizilimine yönelik tedaviler genellikle ' +
      'sürekli dişlerin tamamlanmasından sonra planlanır. Yetişkinlerde de tedavi yapılabilir.'
  },
  {
    soru: 'Kanal tedavisinden sonra nelere dikkat edilir?',
    cevap:
      'Uyuşma geçene kadar yeme içmeden kaçınılır. İlk günlerde hafif hassasiyet olabilir. Dişin ' +
      'üzerine gelen sert gıdalar, kalıcı dolgu ya da kaplama tamamlanana kadar sınırlandırılır. ' +
      'Ağrının artması durumunda hekiminizle iletişime geçin.'
  },
  {
    soru: 'Çocuğumu ilk kez ne zaman getirmeliyim?',
    cevap:
      'İlk süt dişinin çıkmasından sonraki altı ay içinde, en geç birinci yaş gününde. İlk ziyaret ' +
      'çoğunlukla tanışma ve incelemeden oluşur; çocuk bölümünde randevu süresi bu uyum için daha ' +
      'uzun planlanır.'
  },
  {
    soru: 'Randevumu değiştirmem gerekirse ne yapmalıyım?',
    cevap:
      'Çalışma saatleri içinde danışmayı arayarak randevunuzu erteleyebilir veya iptal ' +
      'edebilirsiniz. Mümkünse bir gün önceden haber verilmesi, saatin başka bir hastaya ' +
      'açılabilmesini sağlar.'
  }
];
