'use client';

/* Özel Meşe Ağız ve Diş Sağlığı Polikliniği — site uygulaması.
   Verdant Dental tasarım sistemi (954de0fa) üzerine kurulur.

   Not: içerik ve görünüm kodu tek parça hâlde duruyor. Sayfalara bölme ve
   içeriğin site.config'e taşınması sonraki adımlarda yapılacak. */

import * as React from 'react';
import { NavBar, Card, Button, Field, Input, Checkbox } from '@/ds/bundle';

  var h = React.createElement;
  var Fragment = React.Fragment;
  var useState = React.useState;
  var useEffect = React.useEffect;
  var useRef = React.useRef;
  var useCallback = React.useCallback;


  /* ------------------------------------------------------------------ */
  /* İçerik                                                              */
  /* ------------------------------------------------------------------ */

  var KLINIK = {
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

  var SAATLER = [
    { ad: 'Pazartesi – Cuma', gunler: [1, 2, 3, 4, 5], ac: '09:00', kap: '19:00' },
    { ad: 'Cumartesi', gunler: [6], ac: '09:00', kap: '14:00' },
    { ad: 'Pazar', gunler: [0], kapali: true }
  ];

  var BOLUMLER = [
    { id: 'tedaviler', etiket: 'Tedaviler' },
    { id: 'klinik', etiket: 'Klinik' },
    { id: 'hekimler', etiket: 'Hekimler' },
    { id: 'bilgi', etiket: 'Bilgi' },
    { id: 'ulasim', etiket: 'Ulaşım' }
  ];

  var HEKIMLER = [
    { ad: 'Dt. Selin Aydın', unvan: 'Diş hekimi', mezuniyet: 'Ege Üniv. Diş Hek. Fak., 2011', akademik: '—' },
    { ad: 'Uzm. Dt. Mert Koçak', unvan: 'Ortodonti uzmanı', mezuniyet: 'İstanbul Üniv. Diş Hek. Fak., 2007', akademik: 'Ortodonti doktorası, 2013' },
    { ad: 'Uzm. Dt. Ayşe Doğan', unvan: 'Periodontoloji uzmanı', mezuniyet: 'Hacettepe Üniv. Diş Hek. Fak., 2009', akademik: 'Periodontoloji uzmanlığı, 2015' },
    { ad: 'Dt. Kaan Şahin', unvan: 'Diş hekimi', mezuniyet: 'Ankara Üniv. Diş Hek. Fak., 2014', akademik: '—' }
  ];

  var SORULAR = [
    {
      soru: 'İlk randevuda ne yapılır?',
      cevap: 'Muayene ile başlanır. Gerekirse panoramik röntgen alınır ve ağız içi fotoğraflanır. Bulgular anlatılır, tedavi seçenekleri ve süreleri konuşulur. İlk randevuda çoğunlukla işlem yapılmaz; plan üzerinde anlaşıldıktan sonra sonraki randevu belirlenir.'
    },
    {
      soru: 'İmplant tedavisi kaç aşamadan oluşur?',
      cevap: 'Değerlendirme, cerrahi aşama, iyileşme dönemi ve üst yapı olmak üzere dört aşama vardır. İyileşme dönemi kemik yapısına ve bölgeye göre değişir. Bu süre boyunca gerekirse geçici bir çözüm uygulanır.'
    },
    {
      soru: 'Ortodontik tedaviye kaç yaşında başlanır?',
      cevap: 'Çene gelişimini ilgilendiren bazı durumlarda karma dişlenme döneminde, yaklaşık 7-9 yaş arasında bir ilk değerlendirme önerilir. Diş dizilimine yönelik tedaviler genellikle sürekli dişlerin tamamlanmasından sonra planlanır. Yetişkinlerde de tedavi yapılabilir.'
    },
    {
      soru: 'Kanal tedavisinden sonra nelere dikkat edilir?',
      cevap: 'Uyuşma geçene kadar yeme içmeden kaçınılır. İlk günlerde hafif hassasiyet olabilir. Dişin üzerine gelen sert gıdalar, kalıcı dolgu ya da kaplama tamamlanana kadar sınırlandırılır. Ağrının artması durumunda hekiminizle iletişime geçin.'
    },
    {
      soru: 'Çocuğumu ilk kez ne zaman getirmeliyim?',
      cevap: 'İlk süt dişinin çıkmasından sonraki altı ay içinde, en geç birinci yaş gününde. İlk ziyaret çoğunlukla tanışma ve incelemeden oluşur; çocuk bölümünde randevu süresi bu uyum için daha uzun planlanır.'
    },
    {
      soru: 'Randevumu değiştirmem gerekirse ne yapmalıyım?',
      cevap: 'Çalışma saatleri içinde danışmayı arayarak randevunuzu erteleyebilir veya iptal edebilirsiniz. Mümkünse bir gün önceden haber verilmesi, saatin başka bir hastaya açılabilmesini sağlar.'
    }
  ];

  var STERILIZASYON = [
    'Kullanılan aletler ön dezenfeksiyon solüsyonunda bekletilir ve ultrasonik temizleyicide yıkanır.',
    'Kurutulan aletler tek tek poşetlenir, poşet üzerine tarih ve içerik yazılır.',
    'Buharlı otoklavda 134 °C’de sterilizasyon uygulanır.',
    'Her çevrimde kimyasal ve haftalık biyolojik indikatör kullanılır; sonuçlar kayıt defterine işlenir.'
  ];

  var KORUYUCU_BILGILER = [
    {
      harf: 'A',
      baslik: 'Fırçalama ve diş arası temizliği',
      metin: 'Dişler günde iki kez, en az iki dakika fırçalanır. Fırça, diş eti ile diş yüzeyinin birleştiği çizgiye yaklaşık 45 derece açıyla yerleştirilir ve küçük hareketlerle temizlik yapılır. Fırçanın ulaşamadığı diş aralarında diş ipi veya arayüz fırçası kullanılır. Fırça kılları dağıldığında, ortalama üç ayda bir değiştirilir.'
    },
    {
      harf: 'B',
      baslik: 'Çocuklarda ilk hekim ziyareti',
      metin: 'İlk süt dişi çıktıktan sonraki altı ay içinde, en geç birinci yaş gününde bir diş hekimine görünülmesi önerilir. Bu ziyarette ağız içi incelenir, beslenme ve temizlik alışkanlıkları konuşulur. Süt dişleri çene gelişimi ve konuşma açısından önemlidir; düşeceği düşünülerek tedavisiz bırakılmaz.'
    },
    {
      harf: 'C',
      baslik: 'Diş eti sağlığı',
      metin: 'Fırçalama sırasında görülen kanama, çoğunlukla diş eti iltihabının erken belirtisidir ve fırçalamayı azaltmak için değil, hekime başvurmak için bir nedendir. Diş taşı, fırçayla temizlenemeyen sertleşmiş bakteri tabakasıdır. Sigara kullanımı ve düzensiz kan şekeri diş eti hastalıklarının seyrini etkiler.'
    }
  ];

  /* Tedavi kartlarındaki simgeler — tasarım dosyasındaki yolların birebir aynısı. */
  function simge(yollar) {
    return h('svg', {
      width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
      strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true'
    }, yollar.map(function (d, i) { return h('path', { key: i, d: d }); }));
  }

  var TEDAVILER = [
    {
      ad: 'İmplantoloji',
      ton: 'emerald',
      simge: ['M7.6 6.2c0-2.1 1.7-3.4 3.4-2.7 1.3.5 2.7.5 4 0 1.7-.7 3.4.6 3.4 2.7 0 1.9-.5 3.4-1.3 4.6', 'M12.6 12.4v8', 'M10.3 14.6h4.6', 'M10.7 17.2h3.8', 'M3.4 12.6h5.2'],
      metin: 'Tedaviye panoramik röntgen ve gerektiğinde hacimsel tomografi ile kemik yapısının değerlendirilmesiyle başlanır. Cerrahi aşamayı iyileşme süresi ve ardından üst yapı izler.'
    },
    {
      ad: 'Ortodonti',
      ton: 'emerald',
      simgeOzel: true,
      metin: 'Diş ve çene ilişkisindeki düzensizlikler değerlendirilir. Kayıt alındıktan sonra sabit ya da hareketli apareylerle plan yapılır; kontroller belirli aralıklarla sürer.'
    },
    {
      ad: 'Endodonti',
      ton: 'emerald',
      simge: ['M6.2 6.6c0-2.2 1.8-3.6 3.6-2.9 1.4.5 3 .5 4.4 0 1.8-.7 3.6.7 3.6 2.9 0 2.6-.6 5-1.6 7.3-.5 1.1-.9 2.3-1.1 3.5l-.4 2.3c-.2 1.2-1.9 1.2-2.1 0l-.6-3.4c-.1-.8-1.3-.8-1.4 0l-.6 3.4c-.2 1.2-1.9 1.2-2.1 0l-.4-2.3c-.2-1.2-.6-2.4-1.1-3.5-1-2.3-1.6-4.7-1.6-7.3Z', 'M10.4 9.4v4.4', 'M13.6 9.4v4.4'],
      metin: 'Diş içindeki pulpa dokusunun iltihaplandığı durumlarda kanal tedavisi uygulanır. Kanallar temizlenip doldurulur, diş uygun bir üst yapıyla kapatılır.'
    },
    {
      ad: 'Pedodonti',
      ton: 'amber',
      simge: ['M3.4 8.4c0-1.8 1.4-2.9 2.9-2.3 1.1.4 2.4.4 3.5 0 1.4-.6 2.9.5 2.9 2.3 0 2.1-.5 4-1.3 5.9-.4.9-.7 1.8-.9 2.8l-.3 1.8c-.2 1-1.5 1-1.7 0l-.5-2.7c-.1-.6-1-.6-1.1 0l-.5 2.7c-.2 1-1.5 1-1.7 0l-.3-1.8c-.2-1-.5-1.9-.9-2.8-.8-1.9-1.3-3.8-1.3-5.9Z', 'M16.6 5.4h4.2', 'M18.7 3.3v4.2', 'M15.6 12.4c1.6 1.2 3.2 1.2 4.8 0'],
      metin: 'Süt ve karma dişlenme dönemindeki çocuklar için koruyucu uygulamalar ve tedaviler yapılır. Randevular ayrı bölümde ve çocuğun uyum süresi gözetilerek planlanır.'
    },
    {
      ad: 'Periodontoloji',
      ton: 'emerald',
      simge: ['M7 4.6c0-1.9 1.6-3.1 3.1-2.5 1.2.5 2.6.5 3.8 0 1.5-.6 3.1.6 3.1 2.5 0 2-.5 3.9-1.4 5.7', 'M8.4 10.3c-.4-.8-.8-1.7-1-2.6', 'M2.6 15.4c1.6-1.6 3.2-1.6 4.8 0s3.2 1.6 4.8 0 3.2-1.6 4.8 0 3.2 1.6 4.4.2', 'M12 12.6v3'],
      metin: 'Diş eti ve dişi çevreleyen dokuların hastalıkları izlenir. Diş taşı temizliği, kök yüzeyi düzleştirmesi ve düzenli kontrollerle sürecin takibi yapılır.'
    },
    {
      ad: 'Restoratif diş tedavisi',
      ton: 'emerald',
      simge: ['M6.2 6.6c0-2.2 1.8-3.6 3.6-2.9 1.4.5 3 .5 4.4 0 1.8-.7 3.6.7 3.6 2.9 0 2.6-.6 5-1.6 7.3-.5 1.1-.9 2.3-1.1 3.5l-.4 2.3c-.2 1.2-1.9 1.2-2.1 0l-.6-3.4c-.1-.8-1.3-.8-1.4 0l-.6 3.4c-.2 1.2-1.9 1.2-2.1 0l-.4-2.3c-.2-1.2-.6-2.4-1.1-3.5-1-2.3-1.6-4.7-1.6-7.3Z', 'M8.4 8.2h4.4v3.6H9.2'],
      metin: 'Çürük ve madde kaybı bulunan dişlerde dolgu uygulamaları yapılır. İşlem öncesinde dişin durumu muayene ve gerekirse röntgenle değerlendirilir.'
    }
  ];

  /* Ortodonti simgesi path dışında öğeler de içerir. */
  function ortodontiSimgesi() {
    return h('svg', {
      width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
      strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true'
    },
      h('path', { d: 'M2.8 13.6c6-2.6 12.4-2.6 18.4 0' }),
      h('rect', { x: 9.6, y: 9.4, width: 5, height: 5, rx: 1.4 }),
      h('path', { d: 'M5.4 10.6v2.2' }),
      h('path', { d: 'M18.6 10.6v2.2' }),
      h('path', { d: 'M8 18.4c2.6 1.4 5.4 1.4 8 0' })
    );
  }

  var MEKANLAR = [
    { etiket: 'BEKLEME ALANI', genislik: '52%', oran: '1.2/1', yuvarlak: 'var(--radius-blob)' },
    { etiket: 'MUAYENE ODASI', genislik: '46%', oran: '1/1.3', yuvarlak: '999px' },
    { etiket: 'ÇOCUK BÖLÜMÜ', genislik: '58%', oran: '1.4/1', yuvarlak: 'var(--radius-blob)' }
  ];

  var ULASIM_NOTLARI = [
    'İZBAN ve metro Alsancak durağına 400 m yürüme mesafesinde.',
    'Caddedeki otobüs durağı bina önündedir.',
    'Binanın kapalı otoparkı yoktur; caddede ücretli park alanı bulunur.'
  ];

  /* ------------------------------------------------------------------ */
  /* Ortak stiller                                                       */
  /* ------------------------------------------------------------------ */

  var S = {
    bolum: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: 'clamp(64px,9vw,110px) clamp(20px,5vw,40px) 0'
    },
    baslikSatiri: { display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 14 },
    numara: { fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, color: 'var(--emerald-600)' },
    kas: { fontSize: 12, letterSpacing: '.14em', fontWeight: 700, color: 'var(--text-faint)' },
    cizgi: { flex: 1, height: 1, background: 'var(--line-hairline)' },
    h2: {
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(26px,3.6vw,40px)',
      lineHeight: 1.12,
      letterSpacing: '-.028em',
      fontWeight: 700,
      color: 'var(--text-strong)',
      margin: 0,
      maxWidth: '22ch'
    },
    h3: {
      fontFamily: 'var(--font-display)',
      fontSize: 19,
      letterSpacing: '-.012em',
      color: 'var(--text-strong)',
      margin: 0
    },
    kartMetin: { fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-muted)', margin: '8px 0 0' },
    dipnot: { fontSize: 13, lineHeight: 1.6, color: 'var(--text-faint)', margin: '16px 0 0', maxWidth: '78ch' },
    izgara: function (min) {
      return {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(' + min + 'px,1fr))',
        gap: 20
      };
    },
    ayirici: { height: 1, background: 'var(--line-hairline)' },
    blob: {
      background: 'linear-gradient(150deg,#fff 0%,var(--sand-150) 100%)',
      boxShadow: 'inset -8px -10px 24px rgba(58,45,32,.07),inset 8px 10px 24px #fff'
    }
  };

  function BolumBasligi(props) {
    return h('div', null,
      h('div', { style: S.baslikSatiri },
        h('span', { style: S.numara }, props.numara),
        h('span', { style: S.kas }, props.kas),
        h('span', { style: S.cizgi })
      ),
      h('h2', { style: Object.assign({}, S.h2, props.baslikStil) }, props.baslik),
      props.giris
        ? h('p', {
            style: { fontSize: 16, lineHeight: 1.62, color: 'var(--text-muted)', margin: '14px 0 0', maxWidth: '56ch' }
          }, props.giris)
        : null
    );
  }

  /* ------------------------------------------------------------------ */
  /* Yardımcılar                                                         */
  /* ------------------------------------------------------------------ */

  function iki(n) { return n < 10 ? '0' + n : '' + n; }

  function dakika(s) { return parseInt(s.slice(0, 2), 10) * 60 + parseInt(s.slice(3), 10); }

  function gununKurali(gun) {
    return SAATLER.find(function (s) { return s.gunler.indexOf(gun) > -1; });
  }

  /** Verilen ana göre danışmanın açık/kapalı durumunu ve bir sonraki açılışı döndürür. */
  function durum(now) {
    var adlar = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    var g = now.getDay();
    var dk = now.getHours() * 60 + now.getMinutes();
    var bugun = gununKurali(g);

    if (bugun && !bugun.kapali && dk >= dakika(bugun.ac) && dk < dakika(bugun.kap)) {
      return { acik: true, baslik: 'Danışma şu anda açık', alt: bugun.kap + '’a kadar hasta kabul ediliyor' };
    }
    if (bugun && !bugun.kapali && dk < dakika(bugun.ac)) {
      return { acik: false, baslik: 'Danışma şu anda kapalı', alt: 'Bugün ' + bugun.ac + '’da açılıyor' };
    }
    for (var i = 1; i <= 7; i++) {
      var d = (g + i) % 7;
      var k = gununKurali(d);
      if (k && !k.kapali) {
        return { acik: false, baslik: 'Danışma şu anda kapalı', alt: adlar[d] + ' ' + k.ac + '’da açılıyor' };
      }
    }
    return { acik: false, baslik: 'Danışma şu anda kapalı', alt: '' };
  }

  /** Haftalık şerit: bugün koyu, açık günler yeşil, kapalı günler kum rengi. */
  function hafta(now) {
    var kisa = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
    var sira = [1, 2, 3, 4, 5, 6, 0];
    var bugun = now.getDay();
    return sira.map(function (d, i) {
      var k = gununKurali(d);
      var kapali = !k || k.kapali;
      return {
        kisa: kisa[i],
        renk: d === bugun
          ? (kapali ? 'var(--sand-300)' : 'var(--emerald-600)')
          : (kapali ? 'var(--sand-200)' : 'var(--emerald-200)')
      };
    });
  }

  var CALISMA_SAATLERI = SAATLER.map(function (s) {
    return { ad: s.ad, saat: s.kapali ? 'Kapalı' : s.ac + ' – ' + s.kap };
  });

  function bolumeGit(id) {
    var n = document.getElementById(id);
    if (!n) return;
    window.scrollTo({
      top: n.getBoundingClientRect().top + window.scrollY - 96,
      behavior: 'smooth'
    });
  }

  var DAR_ESIK = 860;

  /** 860 px altını "dar" sayar: mobil eylem çubuğu ve sadeleşen NavBar bunu kullanır.
      Genişliği ResizeObserver ile izler — pencere `resize` olayı üretmeden boyut
      değiştiren gömülü çerçevelerde de doğru sonuç verir. */
  function useDar() {
    /* Sunucuda pencere genişliği bilinmez; aşağıdaki effect mount anında düzeltir. */
    var pair = useState(false);
    var dar = pair[0], setDar = pair[1];

    useEffect(function () {
      var uygula = function () { setDar(document.documentElement.clientWidth < DAR_ESIK); };
      uygula();

      var gozlemci = new ResizeObserver(uygula);
      gozlemci.observe(document.documentElement);
      window.addEventListener('orientationchange', uygula);

      return function () {
        gozlemci.disconnect();
        window.removeEventListener('orientationchange', uygula);
      };
    }, []);

    return dar;
  }

  /* ------------------------------------------------------------------ */
  /* Üst gezinme                                                         */
  /* ------------------------------------------------------------------ */

  function UstGezinme(props) {
    var navRef = useRef(null);

    useEffect(function () {
      var uygula = function () {
        var el = navRef.current;
        if (!el) return;
        var kucult = window.scrollY > 40;
        el.style.paddingTop = kucult ? '8px' : '18px';
        el.style.transform = kucult ? 'scale(.97)' : 'scale(1)';
      };
      uygula();
      window.addEventListener('scroll', uygula, { passive: true });
      return function () { window.removeEventListener('scroll', uygula); };
    }, []);

    return h('div', {
      ref: navRef,
      style: {
        position: 'sticky',
        top: 0,
        zIndex: 40,
        padding: '18px clamp(16px,4vw,40px) 0',
        transformOrigin: 'top center',
        transition: 'padding var(--dur-base) var(--ease-glass),transform var(--dur-base) var(--ease-glass)'
      }
    },
      h('div', { style: { maxWidth: 1180, margin: '0 auto' } },
        h(NavBar, {
          brand: KLINIK.marka,
          /* Dar ekranda bağlantı listesi 68 px’lik çubuğa sığmıyor; gezinme
             alttaki sabit eylem çubuğuna ve altbilgiye bırakılıyor. */
          links: props.dar ? [] : BOLUMLER.map(function (b) { return b.etiket; }),
          active: props.aktif,
          onNavigate: function (etiket) {
            var b = BOLUMLER.find(function (x) { return x.etiket === etiket; });
            if (b) bolumeGit(b.id);
          },
          actions: h(Fragment, null,
            props.dar ? null : h('a', {
              href: KLINIK.telHref,
              style: {
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--text-strong)',
                letterSpacing: '-.01em',
                marginRight: 4
              }
            }, KLINIK.telefon),
            h(Button, { size: 'sm', onClick: function () { bolumeGit('randevu'); } }, 'Randevu talebi')
          )
        })
      )
    );
  }

  /* ------------------------------------------------------------------ */
  /* Hero + canlı saat kartı                                             */
  /* ------------------------------------------------------------------ */

  function SaatKarti() {
    var pair = useState(function () { return new Date(); });
    var now = pair[0], setNow = pair[1];

    useEffect(function () {
      var t = setInterval(function () { setNow(new Date()); }, 15000);
      return function () { clearInterval(t); };
    }, []);

    var d = durum(now);
    var gunler = hafta(now);

    return h('div', { style: { position: 'relative', margin: '-46px 20px 0', zIndex: 3 } },
      h('div', {
        style: {
          borderRadius: 28,
          padding: '20px 22px 18px',
          background: 'rgba(255,255,255,.72)',
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          border: '1px solid rgba(255,255,255,.9)',
          boxShadow: 'var(--shadow-3),var(--inner-glass)'
        }
      },
        h('div', { style: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 } },
          h('div', null,
            h('time', {
              dateTime: iki(now.getHours()) + ':' + iki(now.getMinutes()),
              style: {
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontSize: 38,
                fontWeight: 500,
                letterSpacing: '-.03em',
                color: 'var(--text-strong)',
                lineHeight: 1
              }
            }, iki(now.getHours()) + ':' + iki(now.getMinutes())),
            h('div', { style: { display: 'flex', alignItems: 'center', gap: 7, marginTop: 9 } },
              h('span', {
                style: d.acik
                  ? { width: 7, height: 7, borderRadius: '50%', background: 'var(--emerald-500)', boxShadow: '0 0 0 4px rgba(22,148,106,.16)' }
                  : { width: 7, height: 7, borderRadius: '50%', background: 'var(--sand-300)' }
              }),
              h('span', { style: { fontSize: 13.5, fontWeight: 600, color: 'var(--text-strong)' } }, d.baslik)
            ),
            d.alt ? h('div', { style: { fontSize: 12.5, color: 'var(--text-muted)', marginTop: 3 } }, d.alt) : null
          ),
          h('div', { style: { display: 'flex', gap: 5 }, 'aria-hidden': 'true' },
            gunler.map(function (g) {
              return h('div', {
                key: g.kisa,
                style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 26 }
              },
                h('span', { style: { fontSize: 10.5, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '.02em' } }, g.kisa),
                h('span', { style: { width: 8, height: 26, borderRadius: 999, background: g.renk } })
              );
            })
          )
        )
      )
    );
  }

  function Hero() {
    return h('section', {
      id: 'hero',
      style: {
        maxWidth: 1180,
        margin: '0 auto',
        padding: 'clamp(40px,7vw,86px) clamp(20px,5vw,40px) 0',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
        gap: 'clamp(28px,4vw,52px)',
        alignItems: 'center'
      }
    },
      h('div', null,
        h('div', {
          style: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: 9,
            height: 28,
            padding: '0 14px 0 11px',
            borderRadius: 999,
            background: 'var(--emerald-100)',
            color: 'var(--emerald-700)',
            border: '1px solid var(--emerald-200)',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '.12em',
            marginBottom: 24
          }
        },
          h('span', { style: { width: 6, height: 6, borderRadius: '50%', background: 'currentColor' } }),
          'ÖZEL POLİKLİNİK'
        ),
        h('h1', {
          style: {
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(34px,5.6vw,66px)',
            lineHeight: 1.04,
            letterSpacing: '-.035em',
            fontWeight: 800,
            color: 'var(--text-strong)',
            margin: 0,
            textWrap: 'balance'
          }
        }, 'Alsancak’ta, zemin katta bir ağız ve diş sağlığı polikliniği.'),
        h('p', {
          style: {
            fontSize: 'clamp(16px,1.4vw,18px)',
            lineHeight: 1.62,
            color: 'var(--text-muted)',
            margin: '22px 0 0',
            maxWidth: '46ch',
            textWrap: 'pretty'
          }
        }, 'Girişte eşik ve merdiven yok. Çocuk hastalar için ayrı bir bekleme ve tedavi bölümü bulunuyor. Altı dalda hasta kabul ediliyor.'),
        h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 34 } },
          h(Button, { size: 'lg', onClick: function () { bolumeGit('randevu'); } }, 'Randevu talebi'),
          h(Button, {
            size: 'lg', variant: 'cream', as: 'a',
            href: KLINIK.harita, target: '_blank', rel: 'noopener'
          }, 'Yol tarifi')
        ),
        h('div', {
          style: { display: 'flex', flexWrap: 'wrap', gap: '10px 28px', marginTop: 30, fontSize: 14, color: 'var(--text-muted)' }
        },
          h('span', null, KLINIK.adresKisa),
          h('a', {
            href: KLINIK.telHref,
            style: { fontFamily: 'var(--font-mono)', fontWeight: 500, letterSpacing: '-.01em' }
          }, KLINIK.telefon)
        )
      ),

      h('div', { style: { position: 'relative' } },
        h('div', {
          'aria-hidden': 'true',
          style: {
            position: 'absolute', right: -18, top: -26, width: 96, height: 96,
            borderRadius: 'var(--radius-blob)',
            background: 'linear-gradient(150deg,#fff 0%,var(--sand-150) 100%)',
            boxShadow: 'var(--shadow-3),inset -6px -8px 20px rgba(58,45,32,.07),inset 6px 8px 20px #fff',
            zIndex: 2
          }
        }),
        h(Card, { tone: 'emerald', padding: 'none' },
          h('div', {
            style: { position: 'relative', height: 380, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }
          },
            h('div', {
              'aria-hidden': 'true',
              style: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }
            },
              h('div', {
                style: {
                  width: '56%', aspectRatio: '1/1.05', borderRadius: 'var(--radius-blob)',
                  background: 'linear-gradient(155deg,rgba(255,255,255,.22) 0%,rgba(255,255,255,.05) 100%)',
                  border: '1px solid rgba(255,255,255,.18)'
                }
              })
            ),
            h('div', { style: { position: 'relative', padding: '28px 28px 78px' } },
              h('div', { style: { fontSize: 12, letterSpacing: '.14em', fontWeight: 700, color: 'var(--emerald-300)' } }, 'FOTOĞRAF ALANI'),
              h('p', {
                style: { color: 'var(--text-on-dark-muted)', fontSize: 14, lineHeight: 1.55, margin: '8px 0 0', maxWidth: '34ch' }
              }, 'Kliniğin kendi çekilmiş bekleme alanı fotoğrafı bu kartın tamamını kaplayacak.')
            )
          )
        ),
        h(SaatKarti)
      )
    );
  }

  /* ------------------------------------------------------------------ */
  /* 01 — Tedaviler                                                      */
  /* ------------------------------------------------------------------ */

  function Tedaviler() {
    return h('section', { id: 'tedaviler', style: S.bolum },
      h(BolumBasligi, {
        numara: '01',
        kas: 'TEDAVİ ALANLARI',
        baslik: 'Hasta kabul edilen dallar',
        baslikStil: { maxWidth: '20ch' },
        giris: 'Aşağıdaki başlıklar, poliklinikte hasta kabul edilen alanları ve her birinde izlenen genel süreci anlatır.'
      }),
      h('div', { style: Object.assign({}, S.izgara(268), { marginTop: 36 }) },
        TEDAVILER.map(function (t) {
          return h(Card, { key: t.ad, tone: 'cream', padding: 'md' },
            h('div', {
              style: {
                width: 46, height: 46, borderRadius: 13,
                background: t.ton === 'amber' ? 'var(--amber-100)' : 'var(--emerald-100)',
                color: t.ton === 'amber' ? 'var(--amber-700)' : 'var(--emerald-700)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }
            }, t.simgeOzel ? ortodontiSimgesi() : simge(t.simge)),
            h('h3', { style: Object.assign({}, S.h3, { margin: '18px 0 0' }) }, t.ad),
            h('p', { style: S.kartMetin }, t.metin)
          );
        })
      )
    );
  }

  /* ------------------------------------------------------------------ */
  /* 02 — Klinik                                                         */
  /* ------------------------------------------------------------------ */

  function Klinik() {
    return h('section', { id: 'klinik', style: S.bolum },
      h(BolumBasligi, {
        numara: '02',
        kas: 'KLİNİK',
        baslik: 'Mekân, sterilizasyon ve dijital kayıt',
        baslikStil: { maxWidth: '20ch' }
      }),

      h('div', { style: Object.assign({}, S.izgara(280), { marginTop: 32 }) },
        MEKANLAR.map(function (m) {
          return h(Card, { key: m.etiket, tone: 'plain', padding: 'none' },
            h('div', {
              style: { position: 'relative', height: 240, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }
            },
              h('div', {
                'aria-hidden': 'true',
                style: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--grad-cream)' }
              },
                h('div', {
                  style: Object.assign({ width: m.genislik, aspectRatio: m.oran, borderRadius: m.yuvarlak }, S.blob)
                })
              ),
              h('div', { style: { position: 'relative', padding: 20 } },
                h('span', { style: S.kas }, m.etiket)
              )
            )
          );
        })
      ),

      h('p', { style: S.dipnot }, 'Her cerrahi veya girişimsel işlemde sonuçlar kişiden kişiye değişiklik gösterebilir. İşlem öncesinde hekiminizden detaylı görüş almanız önerilir.'),

      h('div', { style: Object.assign({}, S.izgara(300), { marginTop: 32 }) },
        h(Card, { tone: 'emerald', padding: 'lg' },
          h('div', { style: { fontSize: 12, letterSpacing: '.14em', fontWeight: 700, color: 'var(--emerald-300)' } }, 'STERİLİZASYON'),
          h('h3', {
            style: { fontFamily: 'var(--font-display)', color: '#fff', fontSize: 26, lineHeight: 1.14, letterSpacing: '-.022em', margin: '12px 0 0' }
          }, 'Aletlerin izlediği dört adım'),
          h('ol', {
            style: { listStyle: 'none', margin: '20px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }
          },
            STERILIZASYON.map(function (adim, i) {
              return h('li', { key: i, style: { display: 'flex', gap: 14, alignItems: 'flex-start' } },
                h('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--emerald-300)', paddingTop: 2 } }, iki(i + 1)),
                h('p', { style: { margin: 0, color: 'var(--text-on-dark-muted)', fontSize: 14.5, lineHeight: 1.55 } }, adim)
              );
            })
          )
        ),

        h('div', { style: { display: 'flex', flexDirection: 'column', gap: 20 } },
          h(Card, { tone: 'cream', padding: 'md' },
            h('h3', { style: S.h3 }, 'Görüntüleme ve kayıt'),
            h('p', { style: S.kartMetin }, 'Poliklinikte panoramik röntgen, hacimsel tomografi ve ağız içi tarayıcı bulunur. Görüntüler hasta dosyasına dijital olarak işlenir; istenildiğinde hastaya kopyası verilir.')
          ),
          h(Card, { tone: 'cream', padding: 'md' },
            h('h3', { style: S.h3 }, 'Erişim'),
            h('p', { style: S.kartMetin }, 'Giriş zemin kattadır, eşik ve basamak yoktur. Tekerlekli sandalye ile bekleme alanına ve iki muayene odasına doğrudan geçilir. Refakatçi için oturma alanı bulunur.')
          )
        )
      )
    );
  }

  /* ------------------------------------------------------------------ */
  /* 03 — Hekimler                                                       */
  /* ------------------------------------------------------------------ */

  function Hekimler() {
    return h('section', { id: 'hekimler', style: S.bolum },
      h(BolumBasligi, {
        numara: '03',
        kas: 'HEKİM KADROSU',
        baslik: 'Poliklinikte çalışan hekimler',
        baslikStil: { maxWidth: '20ch' }
      }),
      h('div', { style: Object.assign({}, S.izgara(240), { marginTop: 32 }) },
        HEKIMLER.map(function (hk) {
          return h(Card, { key: hk.ad, tone: 'cream', padding: 'none' },
            h('div', {
              'aria-hidden': 'true',
              style: {
                height: 170, background: 'var(--grad-cream)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                borderBottom: '1px solid var(--line-hairline)'
              }
            },
              h('div', {
                style: {
                  width: 96, height: 110, borderRadius: 'var(--radius-blob)',
                  background: 'linear-gradient(150deg,#fff 0%,var(--sand-150) 100%)',
                  boxShadow: 'inset -6px -8px 20px rgba(58,45,32,.07),inset 6px 8px 20px #fff'
                }
              })
            ),
            h('div', { style: { padding: '20px 22px 24px' } },
              h('h3', { style: Object.assign({}, S.h3, { fontSize: 18 }) }, hk.ad),
              h('div', { style: { fontSize: 13.5, fontWeight: 600, color: 'var(--emerald-700)', marginTop: 5 } }, hk.unvan),
              h('div', { style: Object.assign({}, S.ayirici, { margin: '14px 0' }) }),
              h('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.6, color: 'var(--text-muted)' } }, hk.mezuniyet),
              h('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.6, color: 'var(--text-muted)' } }, hk.akademik)
            )
          );
        })
      ),
      h('p', { style: S.dipnot }, 'Unvanlar 1219 sayılı Kanun kapsamındaki diş hekimliği ana ve yan dal uzmanlıklarına göre yazılmıştır.')
    );
  }

  /* ------------------------------------------------------------------ */
  /* 04 — Koruyucu bilgiler                                              */
  /* ------------------------------------------------------------------ */

  function Bilgi() {
    return h('section', { id: 'bilgi', style: S.bolum },
      h(BolumBasligi, {
        numara: '04',
        kas: 'AĞIZ VE DİŞ SAĞLIĞI BİLGİLERİ',
        baslik: 'Koruyucu bilgiler'
      }),
      h('div', { style: Object.assign({}, S.izgara(280), { marginTop: 32 }) },
        KORUYUCU_BILGILER.map(function (b) {
          return h(Card, { key: b.harf, tone: 'plain', padding: 'md' },
            h('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--emerald-600)' } }, b.harf),
            h('h3', { style: Object.assign({}, S.h3, { margin: '10px 0 0' }) }, b.baslik),
            h('p', { style: { fontSize: 14.5, lineHeight: 1.62, color: 'var(--text-muted)', margin: '10px 0 0' } }, b.metin)
          );
        })
      )
    );
  }

  /* ------------------------------------------------------------------ */
  /* 05 — Sık sorulan sorular                                            */
  /* ------------------------------------------------------------------ */

  function SSS() {
    var pair = useState(null);
    var acik = pair[0], setAcik = pair[1];

    return h('section', { id: 'sss', style: S.bolum },
      h(BolumBasligi, {
        numara: '05',
        kas: 'SIK SORULAN SORULAR',
        baslik: 'Süreç, hazırlık ve iyileşme'
      }),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 860, marginTop: 32 } },
        SORULAR.map(function (s, i) {
          var bu = acik === i;
          var govdeId = 'sss-cevap-' + i;
          return h('div', {
            key: i,
            style: { borderRadius: 22, background: 'rgba(255,255,255,.66)', border: '1px solid var(--line-hairline)', overflow: 'hidden' }
          },
            h('h3', { style: { margin: 0, font: 'inherit' } },
              h('button', {
                type: 'button',
                className: 'sss-baslik',
                'aria-expanded': bu ? 'true' : 'false',
                'aria-controls': govdeId,
                onClick: function () { setAcik(bu ? null : i); }
              },
                h('span', null, s.soru),
                h('span', {
                  'aria-hidden': 'true',
                  style: {
                    flex: 'none', width: 26, height: 26, borderRadius: '50%',
                    background: 'var(--emerald-100)', color: 'var(--emerald-700)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-mono)', fontSize: 15, lineHeight: 1
                  }
                }, bu ? '−' : '+')
              )
            ),
            bu
              ? h('p', {
                  id: govdeId,
                  style: { margin: 0, padding: '0 22px 22px', fontSize: 15, lineHeight: 1.62, color: 'var(--text-muted)', maxWidth: '64ch' }
                }, s.cevap)
              : null
          );
        })
      )
    );
  }

  /* ------------------------------------------------------------------ */
  /* 06 — Ulaşım ve randevu                                              */
  /* ------------------------------------------------------------------ */

  function HaritaKarti() {
    return h(Card, { tone: 'plain', padding: 'none' },
      h('div', {
        'aria-hidden': 'true',
        style: { position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#f6f0e6 0%,#efe6d9 100%)' }
      },
        h('div', { style: { position: 'absolute', left: 0, right: 0, top: '38%', height: 14, background: '#fff', opacity: .85 } }),
        h('div', { style: { position: 'absolute', top: 0, bottom: 0, left: '62%', width: 10, background: '#fff', opacity: .7 } }),
        h('div', { style: { position: 'absolute', left: '8%', top: '62%', width: '34%', height: 8, background: '#fff', opacity: .6, transform: 'rotate(-6deg)' } }),
        h('div', {
          style: {
            position: 'absolute', left: 'calc(62% - 62px)', top: 'calc(38% - 44px)',
            width: 44, height: 44, borderRadius: '50% 50% 50% 6px', transform: 'rotate(-45deg)',
            background: 'var(--grad-emerald)', boxShadow: 'var(--shadow-brand)'
          }
        }),
        h('span', {
          style: { position: 'absolute', left: 12, top: 'calc(38% + 20px)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)' }
        }, 'Kıbrıs Şehitleri Cad.'),
        h('span', {
          style: { position: 'absolute', left: 'calc(62% + 16px)', top: 14, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)' }
        }, 'Alsancak Garı')
      ),
      h('div', {
        style: { position: 'relative', padding: '16px 18px', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', height: 230, boxSizing: 'border-box' }
      },
        h(Button, {
          size: 'sm', variant: 'glass', as: 'a',
          href: KLINIK.harita, target: '_blank', rel: 'noopener'
        }, 'Yol tarifi')
      )
    );
  }

  function AdresKarti() {
    return h(Card, { tone: 'cream', padding: 'md' },
      h('h3', { style: S.h3 }, 'Adres ve ulaşım'),
      h('p', { style: Object.assign({}, S.kartMetin, { margin: '10px 0 0' }) }, KLINIK.adresTam),
      h('div', { style: Object.assign({}, S.ayirici, { margin: '16px 0' }) }),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: 9, fontSize: 14, color: 'var(--text-muted)' } },
        ULASIM_NOTLARI.map(function (n, i) { return h('div', { key: i }, n); })
      ),
      h('div', { style: Object.assign({}, S.ayirici, { margin: '16px 0' }) }),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
        CALISMA_SAATLERI.map(function (c) {
          return h('div', { key: c.ad, style: { display: 'flex', justifyContent: 'space-between', gap: 16, fontSize: 14 } },
            h('span', { style: { color: 'var(--text-body)' } }, c.ad),
            h('span', { style: { fontFamily: 'var(--font-mono)', fontWeight: 500, color: 'var(--text-strong)' } }, c.saat)
          );
        })
      )
    );
  }

  function RandevuFormu() {
    var f = useState({ ad: '', tel: '', tarih: '', not: '', bulten: false });
    var form = f[0], setForm = f[1];
    var e = useState({});
    var hatalar = e[0], setHatalar = e[1];
    var g = useState(false);
    var gonderildi = g[0], setGonderildi = g[1];

    var alan = useCallback(function (anahtar) {
      return function (ev) {
        var deger = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
        setForm(function (onceki) {
          var yeni = Object.assign({}, onceki);
          yeni[anahtar] = deger;
          return yeni;
        });
      };
    }, []);

    function gonder() {
      var yeni = {};
      if (!form.ad.trim()) yeni.ad = 'Ad ve soyadınızı yazın.';
      if (form.tel.replace(/[^0-9]/g, '').length < 10) yeni.tel = 'Telefon numarası eksik görünüyor.';
      setHatalar(yeni);
      if (Object.keys(yeni).length > 0) return;

      /* Sunucu ucu bağlanana kadar talep yalnızca arayüzde onaylanır.
         Gerçek gönderim buraya eklenecek (bkz. README). */
      setGonderildi(true);
    }

    function yeniTalep() {
      setForm({ ad: '', tel: '', tarih: '', not: '', bulten: false });
      setHatalar({});
      setGonderildi(false);
    }

    if (gonderildi) {
      return h(Card, { tone: 'glass', padding: 'lg', id: 'randevu' },
        h('div', {
          role: 'status',
          style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', minHeight: 420 }
        },
          h('div', {
            'aria-hidden': 'true',
            style: {
              width: 52, height: 52, borderRadius: 16, background: 'var(--emerald-100)', color: 'var(--emerald-700)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }
          },
            h('svg', {
              width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
              strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round'
            }, h('path', { d: 'M4.5 12.5 9.5 17.5 19.5 7' }))
          ),
          h('h3', {
            style: { fontFamily: 'var(--font-display)', fontSize: 26, letterSpacing: '-.022em', color: 'var(--text-strong)', margin: '20px 0 0' }
          }, 'Randevu talebiniz alındı.'),
          h('p', { style: { fontSize: 15, lineHeight: 1.62, color: 'var(--text-muted)', margin: '10px 0 0', maxWidth: '40ch' } },
            'Danışma çalışma saatleri içinde sizi arayacak. Bu arada bir şey sormak isterseniz ',
            h('a', { href: KLINIK.telHref }, KLINIK.telefon),
            ' numarasından ulaşabilirsiniz.'
          ),
          h('div', { style: { marginTop: 24 } },
            h(Button, { variant: 'cream', onClick: yeniTalep }, 'Yeni talep oluştur')
          )
        )
      );
    }

    return h(Card, { tone: 'glass', padding: 'lg', id: 'randevu' },
      h('form', {
        noValidate: true,
        onSubmit: function (ev) { ev.preventDefault(); gonder(); }
      },
        h('h3', {
          style: { fontFamily: 'var(--font-display)', fontSize: 26, lineHeight: 1.14, letterSpacing: '-.022em', color: 'var(--text-strong)', margin: 0 }
        }, 'Randevu talebi'),
        h('p', { style: Object.assign({}, S.kartMetin, { margin: '10px 0 0', maxWidth: '44ch' }) },
          'Formu ilettiğinizde danışma sizi arar ve uygun saati birlikte belirlersiniz. Tedavi bilgisi bu formda sorulmaz.'),

        h('div', { style: { display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 } },
          h(Field, { label: 'Ad Soyad', required: true, htmlFor: 'f-ad', error: hatalar.ad || '' },
            h(Input, {
              id: 'f-ad', name: 'ad', autoComplete: 'name',
              value: form.ad, onChange: alan('ad'),
              placeholder: 'Elif Yılmaz', invalid: !!hatalar.ad,
              'aria-invalid': hatalar.ad ? 'true' : undefined
            })
          ),
          h(Field, {
            label: 'Telefon', required: true, htmlFor: 'f-tel',
            hint: 'Danışma yalnızca randevunuzu belirlemek için arar.',
            error: hatalar.tel || ''
          },
            h(Input, {
              id: 'f-tel', name: 'tel', type: 'tel', autoComplete: 'tel',
              value: form.tel, onChange: alan('tel'),
              placeholder: '0532 000 00 00', invalid: !!hatalar.tel,
              'aria-invalid': hatalar.tel ? 'true' : undefined
            })
          ),
          h(Field, { label: 'Tercih edilen tarih', htmlFor: 'f-tarih' },
            h(Input, { id: 'f-tarih', name: 'tarih', type: 'date', value: form.tarih, onChange: alan('tarih') })
          ),
          h(Field, { label: 'Not', htmlFor: 'f-not', hint: 'İsterseniz kısa bir not bırakabilirsiniz.' },
            h(Input, {
              id: 'f-not', name: 'not', multiline: true, rows: 3,
              value: form.not, onChange: alan('not'),
              placeholder: 'Sabah saatleri benim için daha uygun.'
            })
          )
        ),

        h('p', { style: { fontSize: 13, lineHeight: 1.6, color: 'var(--text-muted)', margin: '20px 0 0' } },
          'Kişisel verileriniz ', h('a', { href: '#kvkk' }, 'Aydınlatma Metni'), ' kapsamında işlenecektir.'),

        h('div', { style: { marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line-hairline)' } },
          h(Checkbox, {
            checked: form.bulten,
            onChange: alan('bulten'),
            label: 'Ağız ve diş sağlığı bilgilendirmeleri almak istiyorum.',
            description: 'İsteğe bağlıdır. İşaretlemeseniz de randevu talebiniz iletilir.'
          })
        ),

        h('div', { style: { marginTop: 22 } },
          h(Button, { size: 'lg', fullWidth: true, type: 'submit' }, 'Randevu talebi gönder')
        )
      )
    );
  }

  function Ulasim() {
    return h('section', { id: 'ulasim', style: S.bolum },
      h(BolumBasligi, {
        numara: '06',
        kas: 'ULAŞIM VE RANDEVU',
        baslik: 'Nasıl gelinir, nasıl randevu alınır'
      }),
      h('div', { style: Object.assign({}, S.izgara(320), { marginTop: 32 }) },
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: 20 } },
          h(HaritaKarti),
          h(AdresKarti)
        ),
        h(RandevuFormu)
      )
    );
  }

  /* ------------------------------------------------------------------ */
  /* Altbilgi                                                            */
  /* ------------------------------------------------------------------ */

  function Altbilgi() {
    var sutunBasligi = { fontSize: 12, letterSpacing: '.14em', fontWeight: 700, color: 'var(--emerald-300)', marginBottom: 14 };
    var sutunGovde = { display: 'flex', flexDirection: 'column', gap: 9, fontSize: 14, color: 'var(--text-on-dark-muted)' };

    return h('footer', {
      style: { marginTop: 'clamp(64px,9vw,110px)', background: 'var(--emerald-900)', color: 'var(--text-on-dark)' }
    },
      h('div', { style: { maxWidth: 1180, margin: '0 auto', padding: 'clamp(44px,6vw,72px) clamp(20px,5vw,40px)' } },
        h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 36 } },

          h('div', null,
            h('div', {
              style: { fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, letterSpacing: '-.035em', color: '#fff' }
            }, 'Meşe', h('span', { style: { color: 'var(--amber-500)' } }, '.')),
            h('p', { style: { fontSize: 14, lineHeight: 1.6, color: 'var(--text-on-dark-muted)', margin: '14px 0 0', maxWidth: '32ch' } }, KLINIK.ad),
            h('p', { style: { fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,.5)', margin: '10px 0 0', maxWidth: '32ch' } }, KLINIK.ruhsat)
          ),

          h('div', null,
            h('div', { style: sutunBasligi }, 'İLETİŞİM'),
            h('div', { style: sutunGovde },
              h('a', { href: KLINIK.telHref, style: { fontFamily: 'var(--font-mono)', color: '#fff' } }, KLINIK.telefon),
              h('a', { className: 'footer-link', href: 'mailto:' + KLINIK.eposta }, KLINIK.eposta),
              h('span', null, 'Kıbrıs Şehitleri Cad. No: 148, Kat 1', h('br'), '35220 Konak / İzmir')
            )
          ),

          h('div', null,
            h('div', { style: sutunBasligi }, 'ÇALIŞMA SAATLERİ'),
            h('div', { style: sutunGovde },
              CALISMA_SAATLERI.map(function (c) {
                return h('div', { key: c.ad, style: { display: 'flex', justifyContent: 'space-between', gap: 14 } },
                  h('span', null, c.ad),
                  h('span', { style: { fontFamily: 'var(--font-mono)', color: '#fff' } }, c.saat)
                );
              })
            )
          ),

          h('div', null,
            h('div', { style: sutunBasligi }, 'YASAL'),
            h('div', { style: { display: 'flex', flexDirection: 'column', gap: 9, fontSize: 14 } },
              h('a', { className: 'footer-link', href: '#kvkk' }, 'KVKK Aydınlatma Metni'),
              h('a', { className: 'footer-link', href: '#gizlilik' }, 'Gizlilik Politikası'),
              h('a', { className: 'footer-link', href: '#cerez' }, 'Çerez Politikası')
            )
          )
        ),

        h('div', { style: { height: 1, background: 'var(--line-on-dark)', margin: '36px 0 20px' } }),
        h('div', {
          style: { display: 'flex', flexWrap: 'wrap', gap: '8px 28px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,.55)' }
        },
          h('span', null, KLINIK.sonGuncelleme),
          h('span', null, KLINIK.editor)
        ),
        h('p', { style: { fontSize: 12, lineHeight: 1.6, color: 'rgba(255,255,255,.45)', margin: '16px 0 0', maxWidth: '84ch' } },
          'Bu site bilgilendirme amaçlıdır ve tıbbi tavsiye yerine geçmez. Sayfadaki içerikler Sağlık Hizmetlerinde Tanıtım ve Bilgilendirme Faaliyetleri Hakkında Yönetmelik kapsamında hazırlanmıştır.')
      )
    );
  }

  /* ------------------------------------------------------------------ */
  /* Mobil eylem çubuğu                                                  */
  /* ------------------------------------------------------------------ */

  function MobilBar() {
    function ikon(yollar, ekler) {
      return h('svg', {
        width: 19, height: 19, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
        strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true'
      }, yollar.map(function (d, i) { return h('path', { key: i, d: d }); }), ekler);
    }

    return h('nav', {
      className: 'mobil-bar',
      'aria-label': 'Hızlı iletişim',
      style: {
        position: 'fixed', left: 12, right: 12, bottom: 12, zIndex: 50,
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, padding: 7,
        borderRadius: 999,
        background: 'rgba(255,255,255,.72)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
        border: '1px solid rgba(255,255,255,.9)',
        boxShadow: 'var(--shadow-3),var(--inner-glass)'
      }
    },
      h('a', { className: 'mobil-bar-link mobil-bar-link--ara', href: KLINIK.telHref },
        ikon(['M6.2 3.6h3l1.5 3.7-2 1.3a12 12 0 0 0 5.4 5.4l1.3-2 3.7 1.5v3a1.8 1.8 0 0 1-2 1.8A16.4 16.4 0 0 1 4.4 5.6a1.8 1.8 0 0 1 1.8-2Z']),
        'Ara'
      ),
      h('a', { className: 'mobil-bar-link', href: KLINIK.harita, target: '_blank', rel: 'noopener' },
        ikon(
          ['M12 21c4.2-4.4 6.3-7.7 6.3-10.4A6.3 6.3 0 0 0 5.7 10.6C5.7 13.3 7.8 16.6 12 21Z'],
          h('circle', { cx: 12, cy: 10.4, r: 2.3 })
        ),
        'Yol tarifi'
      ),
      h('a', { className: 'mobil-bar-link', href: KLINIK.whatsapp, target: '_blank', rel: 'noopener' },
        ikon([
          'M20.4 11.6a8.4 8.4 0 0 1-12.3 7.5L3.6 20.4l1.3-4.5A8.4 8.4 0 1 1 20.4 11.6Z',
          'M9.3 9.1c.4 2.6 2.3 4.5 4.9 5.2l1-1.4 1.8.8v1.4c-2.9.5-6.4-2.4-7.5-5.3l1.4-.7Z'
        ]),
        'WhatsApp'
      )
    );
  }

  /* ------------------------------------------------------------------ */
  /* Uygulama                                                            */
  /* ------------------------------------------------------------------ */

  function App() {
    var dar = useDar();
    var a = useState(BOLUMLER[0].etiket);
    var aktif = a[0], setAktif = a[1];

    /* Kaydırma takibi: üstten 220 px’in üzerine çıkan son bölüm etkin sayılır. */
    useEffect(function () {
      var uygula = function () {
        var bulunan = BOLUMLER[0].etiket;
        BOLUMLER.forEach(function (b) {
          var n = document.getElementById(b.id);
          if (n && n.getBoundingClientRect().top < 220) bulunan = b.etiket;
        });
        setAktif(bulunan);
      };
      uygula();
      window.addEventListener('scroll', uygula, { passive: true });
      return function () { window.removeEventListener('scroll', uygula); };
    }, []);

    return h('div', { style: { minHeight: '100vh', paddingBottom: dar ? 140 : 0, overflowX: 'hidden' } },
      h('a', { className: 'skip-link', href: '#icerik' }, 'İçeriğe geç'),
      h(UstGezinme, { dar: dar, aktif: aktif }),
      h('main', { id: 'icerik' },
        h(Hero),
        h(Tedaviler),
        h(Klinik),
        h(Hekimler),
        h(Bilgi),
        h(SSS),
        h(Ulasim)
      ),
      h(Altbilgi),
      dar ? h(MobilBar) : null
    );
  }

export default App;
