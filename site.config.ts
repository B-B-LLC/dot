/* ====================================================================
   SİTE YAPILANDIRMASI

   Yeni bir klinik demosu çıkarmak için yalnızca "KLİNİĞE ÖZEL" bölümünü
   düzenlemek yeterlidir. Aşağıdaki "ORTAK METİNLER" bölümü şablon
   metinleridir; kliniğe göre değişmesi gerekmez.

   Tasarım değerleri (renk, ölçü, ikon) bu dosyada tutulmaz.
   ==================================================================== */

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

/** `id`, tedavinin ikonunu ve ileride sayfa adresini belirler; değiştirmeyin. */
export type Tedavi = {
  id: 'implantoloji' | 'ortodonti' | 'endodonti' | 'pedodonti' | 'periodontoloji' | 'restoratif';
  ad: string;
  ton: 'emerald' | 'amber';
  metin: string;
};

export type Soru = { soru: string; cevap: string };
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

/** Klinikte hasta kabul edilmeyen bir dal varsa satırı silin. */
export const tedaviler: Tedavi[] = [
  {
    id: 'implantoloji',
    ad: 'İmplantoloji',
    ton: 'emerald',
    metin:
      'Tedaviye panoramik röntgen ve gerektiğinde hacimsel tomografi ile kemik yapısının ' +
      'değerlendirilmesiyle başlanır. Cerrahi aşamayı iyileşme süresi ve ardından üst yapı izler.'
  },
  {
    id: 'ortodonti',
    ad: 'Ortodonti',
    ton: 'emerald',
    metin:
      'Diş ve çene ilişkisindeki düzensizlikler değerlendirilir. Kayıt alındıktan sonra sabit ya ' +
      'da hareketli apareylerle plan yapılır; kontroller belirli aralıklarla sürer.'
  },
  {
    id: 'endodonti',
    ad: 'Endodonti',
    ton: 'emerald',
    metin:
      'Diş içindeki pulpa dokusunun iltihaplandığı durumlarda kanal tedavisi uygulanır. Kanallar ' +
      'temizlenip doldurulur, diş uygun bir üst yapıyla kapatılır.'
  },
  {
    id: 'pedodonti',
    ad: 'Pedodonti',
    ton: 'amber',
    metin:
      'Süt ve karma dişlenme dönemindeki çocuklar için koruyucu uygulamalar ve tedaviler yapılır. ' +
      'Randevular ayrı bölümde ve çocuğun uyum süresi gözetilerek planlanır.'
  },
  {
    id: 'periodontoloji',
    ad: 'Periodontoloji',
    ton: 'emerald',
    metin:
      'Diş eti ve dişi çevreleyen dokuların hastalıkları izlenir. Diş taşı temizliği, kök yüzeyi ' +
      'düzleştirmesi ve düzenli kontrollerle sürecin takibi yapılır.'
  },
  {
    id: 'restoratif',
    ad: 'Restoratif diş tedavisi',
    ton: 'emerald',
    metin:
      'Çürük ve madde kaybı bulunan dişlerde dolgu uygulamaları yapılır. İşlem öncesinde dişin ' +
      'durumu muayene ve gerekirse röntgenle değerlendirilir.'
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
