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
  adres: 'https://www.mesepoliklinik.example',

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
  harita: 'https://www.google.com/maps',
  adresKisa: 'Kıbrıs Şehitleri Cad. No: 148, Konak / İzmir',
  adresTam: 'Kıbrıs Şehitleri Caddesi No: 148, Kat 1 — 35220 Konak / İzmir',
  ruhsat: 'İzmir İl Sağlık Müdürlüğü ruhsatlıdır. Ruhsat no: 0000/000',
  editor: 'Site editörü: Ayşe Demir · editor@mesepoliklinik.example',
  sonGuncelleme: 'Son güncelleme: 10.08.2026'
};

export const saatler: CalismaSaati[] = [
  { ad: 'Pazartesi – Cuma', gunler: [1, 2, 3, 4, 5], ac: '09:00', kap: '19:00' },
  { ad: 'Cumartesi', gunler: [6], ac: '09:00', kap: '14:00' },
  { ad: 'Pazar', gunler: [0], kapali: true }
];

export const hekimler: Hekim[] = [
  {
    ad: 'Dt. Selin Aydın',
    unvan: 'Diş hekimi',
    mezuniyet: 'Ege Üniv. Diş Hek. Fak., 2011',
    akademik: '—'
  },
  {
    ad: 'Uzm. Dt. Mert Koçak',
    unvan: 'Ortodonti uzmanı',
    mezuniyet: 'İstanbul Üniv. Diş Hek. Fak., 2007',
    akademik: 'Ortodonti doktorası, 2013'
  },
  {
    ad: 'Uzm. Dt. Ayşe Doğan',
    unvan: 'Periodontoloji uzmanı',
    mezuniyet: 'Hacettepe Üniv. Diş Hek. Fak., 2009',
    akademik: 'Periodontoloji uzmanlığı, 2015'
  },
  {
    ad: 'Dt. Kaan Şahin',
    unvan: 'Diş hekimi',
    mezuniyet: 'Ankara Üniv. Diş Hek. Fak., 2014',
    akademik: '—'
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
      'Alsancak’taki polikliniğimizde izlenen süreç.',
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
    ton: 'amber',
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
