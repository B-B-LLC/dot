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
  demoModu: true
};

/* ---------- Tipler ---------- */

export type Klinik = {
  ad: string;
  marka: string;
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
  /** Portre görselinin yolu (ör. '/gorseller/hekim-selin.jpg'). Boş
      bırakılırsa kartta çizim yer tutucusu kalır. */
  gorsel?: string;
};

/** Bir fotoğraf alanı. `yol` boş bırakıldığında o alanda çizim yer tutucusu
    görünmeye devam eder; görsellerin hepsi hazır olmadan da site bozulmaz. */
export type Gorsel = {
  /** `public/` altındaki yol, başında eğik çizgiyle: '/gorseller/ad.jpg' */
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

  ruhsat: 'İzmir İl Sağlık Müdürlüğü ruhsatlıdır. Ruhsat no: 0000/000',
  editor: 'Site editörü: Ayşe Demir · editor@mesepoliklinik.example',
  sonGuncelleme: 'Son güncelleme: 10.08.2026'
};

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
    yol: '/gorseller/Hero.jpg',
    alt: 'Kliniğin girişi: karşılama bankosu ve bekleme koltukları'
  } as Gorsel,

  /** Klinik bölümündeki üç mekân kartı. Kart etiketlerini temel.js'teki
      MEKANLAR listesi belirler; buradaki anahtarlar onlarla eşleşir. */
  mekanlar: {
    bekleme: {
      yol: '/gorseller/Klinik Bekleme Alanı.jpg',
      alt: 'Bekleme alanı: pencere tarafında koltuklar ve karşılama bankosu'
    } as Gorsel,
    muayene: {
      yol: '/gorseller/Klinik Muayene Odası.jpg',
      alt: 'Muayene odası: diş üniti, tepe lambası ve görüntüleme ekranı'
    } as Gorsel,
    cocuk: {
      yol: '/gorseller/Klinik Çocuk Alanı.jpg',
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
    gorsel: '/gorseller/Doktor1.jpg'
  },
  {
    ad: 'Uzm. Dt. Ayşe Yılmaz',
    unvan: 'Ortodonti uzmanı',
    mezuniyet: 'Ege Üniv. Diş Hek. Fak., 2011',
    akademik: 'Ortodonti uzmanlığı, 2017',
    gorsel: '/gorseller/Doktor2.jpg'
  },
  {
    ad: 'Uzm. Dt. Can Demir',
    unvan: 'Ağız, diş ve çene cerrahisi uzmanı',
    mezuniyet: 'Ankara Üniv. Diş Hek. Fak., 2012',
    akademik: 'Ağız, diş ve çene cerrahisi uzmanlığı, 2018',
    gorsel: '/gorseller/Doktor3.jpg'
  },
  {
    ad: 'Uzm. Dt. Elif Yıldız',
    unvan: 'Restoratif diş tedavisi uzmanı',
    mezuniyet: 'Hacettepe Üniv. Diş Hek. Fak., 2013',
    akademik: 'Restoratif diş tedavisi doktorası, 2019',
    gorsel: '/gorseller/Doktor4.jpg'
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
  /** Hastanın süreç boyunca bilmesi gerekenler. */
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
        'Fiber Dolgu',
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
        'Kanal Yenileme',
        {
          ad: 'Kompozit Dolgu',
          slug: 'kompozit-dolgu',
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
              baslik: 'Ömrünü belirleyen şeyler',
              metin:
                'Dolgunun ömrü boşluğun büyüklüğüne, dişe binen çiğneme yüküne ve ağız bakımına bağlıdır. ' +
                'Kenarından sızıntı başlayan bir dolgu yenilenir; büyük madde kaybında dolgu yerine ' +
                'inley/onley ya da kaplama önerilebilir.'
            }
          ],
          notlar: [
            'Uyuşturma yapıldıysa his geçene kadar sıcak içecek ve çiğneme dudak ısırmaya yol açabilir.',
            'Dolgu ilk günlerde soğuğa karşı hassas olabilir.',
            'Isırışta yükseklik hissi kalırsa dolgu birkaç dakikada düzeltilir; alışmayı beklemeyin.'
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
            }
          ]
        },
        'İnley / Onley Dolgu'
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
        'Flor Uygulaması',
        {
          ad: 'Fissür Örtücü',
          slug: 'fissur-ortucu',
          dal: 'pedodonti',
          ozet: 'Arka dişlerin derin çukurlarının akıcı bir maddeyle kapatılarak çürükten korunması.',
          giris:
            'Fissür örtücü, azı dişlerinin çiğneme yüzeyindeki dar ve derin oluklara akıcı bir maddenin ' +
            'yerleştirilip sertleştirilmesidir. Bu oluklar fırça kılından dar olduğu için temizlenmesi zordur ' +
            've çürük çoğunlukla oradan başlar.',
          bolumler: [
            {
              baslik: 'Kimlere uygulanır',
              metin:
                'Yeni sürmüş kalıcı azı dişleri en uygun adaylardır; süt azılarına da uygulanabilir. ' +
                'Dişin çürüksüz ve tamamen sürmüş olması gerekir.'
            },
            {
              baslik: 'İşlem sırası',
              metin:
                'Diş temizlenip kurutulur, yüzey hazırlanır ve örtücü madde oluklara akıtılarak ışıkla ' +
                'sertleştirilir. Uyuşturma ve diş kesme gerekmez, tek diş için birkaç dakika sürer.'
            },
            {
              baslik: 'Takip',
              metin:
                'Örtücü zamanla aşınabilir ya da kenarından ayrılabilir. Altı aylık kontrollerde durumu ' +
                'değerlendirilir, gerekirse tazelenir.'
            }
          ],
          notlar: [
            'Uygulamadan hemen sonra yemek yenebilir.',
            'Örtücü fırçalama ihtiyacını ortadan kaldırmaz; yalnız ulaşılamayan oluğu kapatır.'
          ],
          sorular: [
            {
              soru: 'Fissür örtücü dişi keser mi?',
              cevap: 'Hayır. Diş dokusundan madde kaldırılmaz, yüzeye ek yapılır.'
            }
          ]
        },
        'Yer Tutucu'
      ]
    },
    {
      baslik: 'Protez',
      kalemler: [
        {
          ad: 'Zirkonyum Kaplama',
          slug: 'zirkonyum-kaplama',
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
              baslik: 'Bakımı',
              metin:
                'Kaplama çürümez ama altındaki diş ve çevresindeki diş eti çürüyebilir, iltihaplanabilir. ' +
                'Fırçalama, arayüz fırçası ve düzenli kontrol kaplamanın ömrünü doğrudan belirler.'
            }
          ],
          notlar: [
            'Geçici kaplama takılıyken çok sert ve yapışkan yiyeceklerden kaçınılmalıdır.',
            'Prova aşaması renk ve biçmin konuşulacağı aşamadır; beklentiler orada söylenmelidir.',
            'Gece diş sıkma varsa koruyucu plak önerilebilir.'
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
            }
          ]
        },
        'Porselen Kaplama',
        'E-Max Kaplama',
        'Lamina Kaplama',
        'Köprü Protezi',
        'Hareketli Protez',
        'Hassas Tutuculu Protez'
      ]
    },
    {
      baslik: 'Ağız-diş ve çene cerrahisi',
      kalemler: [
        {
          ad: 'Diş Çekimi',
          slug: 'dis-cekimi',
          ozet: 'Kurtarılamayan dişin uyuşturma altında alınması ve iyileşme sürecinin yönetilmesi.',
          metaAciklama:
            'Diş çekimi nasıl yapılır, sonrasında nelere dikkat edilir, iyileşme ne kadar sürer?',
          giris:
            'Diş çekimi, dişin tedaviyle korunamayacağı durumlarda uygulanan son adımdır. Karar röntgen ve ' +
            'muayene sonrasında verilir; çekimden önce dişin kurtarılabileceği seçenekler konuşulur.',
          bolumler: [
            {
              baslik: 'İşlem sırası',
              metin:
                'Bölge uyuşturulur ve dişin bağ dokusundan ayrılması sağlanır. İşlem sırasında ağrı değil ' +
                'basınç hissedilir. Çekim sonrası bölgeye tampon konur ve gerekirse dikiş atılır.'
            },
            {
              baslik: 'İlk yirmi dört saat',
              metin:
                'Pıhtının yerinde kalması iyileşmenin tamamıdır. Bu yüzden ilk gün ağız çalkalanmaz, ' +
                'tükürülmez, pipet kullanılmaz ve sigara içilmez. Soğuk uygulama şişliği azaltır.'
            },
            {
              baslik: 'Boşluğun geleceği',
              metin:
                'Çekilen dişin boşluğu uzun süre boş bırakılırsa komşu dişler eğilir, karşı diş uzar. ' +
                'İmplant ya da köprü planı iyileşme tamamlandıktan sonra konuşulur.'
            }
          ],
          notlar: [
            'Verilen ilaçlar tarif edildiği şekilde kullanılmalıdır.',
            'İkinci günden sonra ılık tuzlu suyla yumuşak gargara yapılabilir.',
            'Şiddetli ağrı, durmayan kanama ya da artan şişlikte klinik aranmalıdır.'
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
            }
          ]
        },
        {
          ad: 'Gömülü 20 Yaş Dişi',
          slug: 'gomulu-20-yas-disi',
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
              baslik: 'İyileşme',
              metin:
                'İlk iki üç gün şişlik ve ağız açmada kısıtlılık beklenen bulgulardır; üçüncü günden sonra ' +
                'azalmaya başlar. Dikişler genellikle bir hafta sonra alınır.'
            }
          ],
          notlar: [
            'İşlemden sonraki gün için yoğun bir program yapmamak rahat eder.',
            'İlk gün soğuk uygulama, sonraki günlerde ılık uygulama önerilir.',
            'Sigara iyileşmeyi belirgin biçimde geciktirir.'
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
            }
          ]
        },
        'Apikal Rezeksiyon',
        'Sinüs Lifting',
        'Kemik Grefti',
        'Açık Sinüs Lifting',
        'Kapalı Sinüs Lifting'
      ]
    },
    {
      baslik: 'İmplant tedavisi',
      kalemler: [
        'All-On-Four',
        'All-On-Six',
        {
          ad: 'Tek İmplant Tedavisi',
          slug: 'tek-implant-tedavisi',
          dal: 'implantoloji',
          ozet: 'Tek bir eksik dişin, komşu dişlere dokunmadan implantla tamamlanması.',
          metaAciklama:
            'Tek diş eksikliğinde implant tedavisi nasıl ilerler, kaç ay sürer, hangi durumlarda uygundur?',
          giris:
            'Tek diş eksikliğinde implant, komşu dişleri kesmeden boşluğu tamamlayan seçenektir. ' +
            'Köprüden farkı budur: yandaki sağlam dişlere dokunulmaz.',
          bolumler: [
            {
              baslik: 'Planlama',
              metin:
                'Kemik yüksekliği ve kalınlığı üç boyutlu görüntüyle değerlendirilir. Kemik yetersizse ' +
                'greft ya da sinüs işlemi aynı planın parçası olur. Genel sağlık durumu ve kullanılan ' +
                'ilaçlar bu aşamada konuşulur.'
            },
            {
              baslik: 'Cerrahi aşama',
              metin:
                'İmplant, uyuşturma altında kemik içine yerleştirilir. İşlem tek diş için genellikle ' +
                'yarım saatin altındadır. Üzerine geçici bir çözüm planlanabilir.'
            },
            {
              baslik: 'Kaynama ve üst yapı',
              metin:
                'İmplantın kemikle bütünleşmesi çoğunlukla iki ile dört ay arasında sürer. Bu süre sonunda ' +
                'ölçü alınır ve üst yapı (kaplama) hazırlanıp yerleştirilir.'
            }
          ],
          notlar: [
            'Sigara implant çevresindeki iyileşmeyi ve uzun dönem başarısını olumsuz etkiler.',
            'İmplant çürümez ama çevresindeki diş eti hastalanabilir; düzenli kontrol şarttır.',
            'Şeker hastalığı gibi durumlarda tedavi planı hekiminizle birlikte düzenlenir.'
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
            }
          ]
        },
        'Bir Günde İmplant'
      ]
    },
    {
      baslik: 'Periodontoloji',
      kalemler: [
        {
          ad: 'Diş Eti Tedavisi',
          slug: 'dis-eti-tedavisi',
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
              baslik: 'Değerlendirme',
              metin:
                'Diş eti cebinin derinliği ölçülür, röntgenle kemik seviyesi değerlendirilir. Bu ölçüm ' +
                'hastalığın hangi aşamada olduğunu ve tedavinin kapsamını belirler.'
            },
            {
              baslik: 'Başlangıç tedavisi',
              metin:
                'Diş taşı ve plak, diş eti üstünde ve altında temizlenir; kök yüzeyleri düzleştirilir. ' +
                'Bölge bölge, birkaç seansta yapılır. Çoğu hastada asıl iyileşme bu aşamada sağlanır.'
            },
            {
              baslik: 'Cerrahi gerekirse',
              metin:
                'Derin ceplerin kapanmadığı durumlarda küretaj ya da flep işlemi gündeme gelir. Karar, ' +
                'başlangıç tedavisinden sonraki kontrol ölçümlerine göre verilir.'
            }
          ],
          notlar: [
            'Tedaviden sonra diş etleri sıkılaştıkça geçici hassasiyet olabilir.',
            'Arayüz fırçası ya da diş ipi kullanılmadan sonucun korunması güçtür.',
            'Sigara diş eti hastalığının seyrini belirgin biçimde kötüleştirir.'
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
            }
          ]
        },
        {
          ad: 'Diş Taşı Temizliği',
          slug: 'dis-tasi-temizligi',
          dal: 'periodontoloji',
          ozet: 'Sertleşmiş plağın diş yüzeyinden ve diş eti sınırından temizlenmesi.',
          giris:
            'Diş taşı, zamanla sertleşen ve fırçayla kaldırılamayan plaktır. Diş etinin kanamasına ve ' +
            'ağız kokusuna yol açar; temizlenmediğinde alttaki kemiğin erimesine giden süreci başlatır.',
          bolumler: [
            {
              baslik: 'İşlem sırası',
              metin:
                'Taş, ultrasonik uçla titreşim yoluyla kırılarak kaldırılır; ardından yüzeyler parlatılır. ' +
                'Diş kazınmaz, aşındırılmaz. İşlem çoğunlukla tek seansta biter.'
            },
            {
              baslik: 'Sonrasında',
              metin:
                'Taşın örttüğü kök yüzeyi açığa çıktığı için birkaç gün soğuk hassasiyeti olabilir. ' +
                'Diş etleri iltihaplıysa temizlik sırasında kanama görülür, bu beklenen bir durumdur.'
            },
            {
              baslik: 'Sıklık',
              metin:
                'Genel öneri altı ayda bir kontroldür. Taş oluşum hızı kişiden kişiye değiştiği için ' +
                'aralık muayenede belirlenir.'
            }
          ],
          notlar: [
            'İşlem dişleri beyazlatmaz; yalnız yüzeydeki renklenmeleri ve taşı kaldırır.',
            'Hassasiyet birkaç gün içinde azalır.'
          ],
          sorular: [
            {
              soru: 'Diş taşı temizliği dişleri aşındırır mı?',
              cevap:
                'Hayır. Uç, taşı kırarak kaldırır; diş yüzeyi kazınmaz. Aralarındaki boşluk hissi, taşın ' +
                'kalktığı yerin fark edilmesinden kaynaklanır.'
            }
          ]
        },
        'Küretaj',
        'Diş Eti Çekilmesi Tedavisi'
      ]
    },
    {
      baslik: 'Ortodonti',
      kalemler: [
        {
          ad: 'Şeffaf Plak',
          slug: 'seffaf-plak',
          dal: 'ortodonti',
          ozet: 'Çıkarılabilen şeffaf plaklarla dişlerin adım adım hizalanması.',
          metaAciklama:
            'Şeffaf plak tedavisi nasıl ilerler, ne kadar sürer, kimlere uygundur? Süreç ve günlük kullanım.',
          giris:
            'Şeffaf plak tedavisi, dijital planla hazırlanan bir dizi plağın sırayla kullanılmasıyla ' +
            'dişlerin hedeflenen konuma taşınmasıdır. Plaklar çıkarılabildiği için yeme ve fırçalama ' +
            'alışkanlığı değişmez.',
          bolumler: [
            {
              baslik: 'Planlama',
              metin:
                'Ağız içi tarama ve röntgenlerle dijital model çıkarılır, hareket sırası planlanır. ' +
                'Planlama sonunda tedavinin kaç plak süreceği ve hedef konum önceden görülebilir.'
            },
            {
              baslik: 'Günlük kullanım',
              metin:
                'Plakların günde yaklaşık yirmi iki saat takılı kalması beklenir; yalnız yemek ve fırçalama ' +
                'için çıkarılır. Her plak belirlenen süre kullanıldıktan sonra sıradaki plağa geçilir.'
            },
            {
              baslik: 'Pekiştirme',
              metin:
                'Dişler yeni konumlarında kemik yeniden şekillenene kadar geri dönme eğilimindedir. ' +
                'Bu yüzden tedavi sonunda pekiştirme (retansiyon) aşaması gelir ve ihmal edilirse sonuç korunmaz.'
            }
          ],
          notlar: [
            'Takılı kalma süresi tedavinin süresini doğrudan belirler.',
            'Plaklar takılıyken su dışında bir şey içilmemelidir.',
            'Her kontrolde ilerleme planla karşılaştırılır; gerekirse plan güncellenir.'
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
            }
          ]
        },
        'Metal Diş Teli',
        'Seramik Diş Teli',
        'Pekiştirme Tedavisi'
      ]
    },
    {
      baslik: 'Estetik diş hekimliği',
      kalemler: [
        'Gülüş Tasarımı',
        {
          ad: 'Diş Beyazlatma',
          slug: 'dis-beyazlatma',
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
              baslik: 'Öncesinde yapılması gerekenler',
              metin:
                'Çürük, kırık dolgu ve diş eti iltihabı beyazlatmadan önce tedavi edilir. Yüzeydeki taş ve ' +
                'renklenme temizlenmeden yapılan beyazlatma dengesiz sonuç verir.'
            },
            {
              baslik: 'Uygulama',
              metin:
                'Diş etleri koruyucu bariyerle örtülür ve jel dişlere uygulanır. Klinik uygulaması ' +
                'genellikle bir seansta biter; ev tipi uygulamada plaklar birkaç gün boyunca belirlenen ' +
                'süre takılır.'
            },
            {
              baslik: 'Kalıcılığı',
              metin:
                'Sonuç kalıcı değildir; kahve, çay, sigara ve kırmızı şarap rengin geri dönmesini hızlandırır. ' +
                'Aralıklı tazeleme uygulamalarıyla korunur.'
            }
          ],
          notlar: [
            'Uygulamadan sonraki iki gün renk veren yiyecek ve içecekler sınırlandırılmalıdır.',
            'Geçici soğuk hassasiyeti sık görülür ve kendiliğinden geçer.',
            'Dolgu ve kaplamalar beyazlamaz; renk farkı oluşursa yenilenmeleri gerekebilir.'
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
            }
          ]
        },
        'Bonding',
        'Pembe Estetik',
        'Dijital Gülüş Tasarımı',
        'Pembe Diş Eti Estetiği'
      ]
    },
    {
      baslik: 'Diğer',
      kalemler: [
        {
          ad: '3D Tomografi',
          slug: '3d-tomografi',
          ozet: 'Çene ve dişlerin üç boyutlu görüntülenmesi; implant ve cerrahi planlamanın temeli.',
          metaAciklama:
            'Diş hekimliğinde 3D tomografi ne işe yarar, hangi durumlarda çekilir, ne kadar sürer?',
          giris:
            'Üç boyutlu tomografi (konik ışınlı bilgisayarlı tomografi), çene kemiğini ve dişleri ' +
            'katman katman gösteren bir görüntüleme yöntemidir. İki boyutlu röntgende üst üste binen ' +
            'yapılar burada ayrı ayrı değerlendirilebilir.',
          bolumler: [
            {
              baslik: 'Hangi durumlarda çekilir',
              metin:
                'İmplant planlaması, gömülü diş ve kist değerlendirmesi, sinüs ilişkisi, kanal tedavisinde ' +
                'karmaşık kök yapısı ve ortodontik planlama başlıca gerekçelerdir.'
            },
            {
              baslik: 'Nasıl çekilir',
              metin:
                'Hasta cihazın içinde hareketsiz durur ve kaynak baş çevresinde bir tur atar. Görüntüleme ' +
                'genellikle bir dakikanın altında sürer, hazırlık dâhil birkaç dakikada tamamlanır.'
            },
            {
              baslik: 'Işın miktarı',
              metin:
                'Doz, tıbbi tomografiye göre belirgin biçimde düşüktür ve alan yalnızca gereken bölgeyle ' +
                'sınırlandırılır. Yine de her görüntüleme gibi ancak tıbbi gerekçe varsa çekilir.'
            }
          ],
          notlar: [
            'Çekim öncesinde takı, gözlük ve hareketli protezler çıkarılır.',
            'Hamilelik durumu randevudan önce mutlaka bildirilmelidir.'
          ],
          sorular: [
            {
              soru: 'Görüntüyü başka hekime götürebilir miyim?',
              cevap:
                'Evet. Görüntü dijital olarak verilebilir ve başka bir hekim tarafından da değerlendirilebilir.'
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
    'Sayfası hazırlanmış işlemlerde süreç adım adım anlatılır; hazırlanmakta olanlar için ' +
    'danışmadan bilgi alabilirsiniz.',
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
