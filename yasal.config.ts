/* ====================================================================
   YASAL METİNLER

   ⚠ ÖNEMLİ: Bu metinler şablondur. Yayına almadan önce kliniğin kendi
   veri işleme uygulamasına göre bir hukukçu tarafından gözden geçirilmesi
   gerekir. Özellikle şu maddeler kliniğe göre değişir:
   - Randevu taleplerinin nerede saklandığı ve ne kadar süreyle tutulduğu
   - Hasta dosyalarının tutulduğu sistem ve saklama süresi
   - Kullanılan üçüncü taraf hizmetler (e-posta, harita, analiz)

   Metinler klinik künyesinden beslenir; klinik adı ve iletişim bilgisi
   site.config.ts değiştiğinde burada da güncellenir.
   ==================================================================== */

import { klinik } from './site.config';

export type YasalBolum = { baslik: string; paragraflar: string[] };

export type YasalMetin = {
  baslik: string;
  ozet: string;
  bolumler: YasalBolum[];
};

export const kvkkMetni: YasalMetin = {
  baslik: 'KVKK Aydınlatma Metni',
  ozet:
    '6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında, bu sitede toplanan kişisel ' +
    'verilerin hangi amaçla işlendiğine ve haklarınıza ilişkin bilgilendirme.',
  bolumler: [
    {
      baslik: 'Veri sorumlusu',
      paragraflar: [
        `Kişisel verileriniz, veri sorumlusu sıfatıyla ${klinik.ad} tarafından işlenir.`,
        `Adres: ${klinik.adresTam}`,
        `Telefon: ${klinik.telefon} · E-posta: ${klinik.eposta}`
      ]
    },
    {
      baslik: 'İşlenen kişisel veriler',
      paragraflar: [
        'Bu site üzerinden randevu talebi oluşturduğunuzda yalnızca formda belirttiğiniz veriler ' +
          'işlenir: ad ve soyad, telefon numarası, tercih ettiğiniz tarih ve varsa iletmek ' +
          'istediğiniz not.',
        'Site ziyaretiniz sırasında reklam veya profilleme amacıyla veri toplanmaz.'
      ]
    },
    {
      baslik: 'İşleme amacı ve hukuki sebep',
      paragraflar: [
        'Verileriniz yalnızca randevu talebinizin danışmaya iletilmesi ve size dönüş yapılması ' +
          'amacıyla işlenir.',
        'İşlemenin hukuki sebebi, Kanun’un 5. maddesi kapsamında talebinize istinaden bir ' +
          'sözleşmenin kurulması ile doğrudan ilgili olması ve açık rızanızdır.'
      ]
    },
    {
      baslik: 'Toplama yöntemi ve saklama',
      paragraflar: [
        'Veriler, sitedeki randevu formu aracılığıyla elektronik ortamda toplanır ve kliniğin ' +
          'danışma e-posta adresine iletilir.',
        'Randevu talepleri site üzerinde bir veri tabanında saklanmaz. E-posta kutusundaki ' +
          'kayıtlar, talebin sonuçlanmasının ardından kliniğin saklama politikası doğrultusunda ' +
          'silinir.',
        'Muayene ve tedaviye ilişkin sağlık kayıtları bu sitede tutulmaz; ilgili mevzuatta ' +
          'öngörülen sürelerle klinik kayıt sisteminde saklanır.'
      ]
    },
    {
      baslik: 'Aktarım',
      paragraflar: [
        'Kişisel verileriniz, yalnızca yasal yükümlülüklerin yerine getirilmesi amacıyla yetkili ' +
          'kamu kurum ve kuruluşlarıyla paylaşılabilir.',
        'Bunun dışında üçüncü kişilere, reklam ortaklarına veya yurt dışına aktarılmaz.'
      ]
    },
    {
      baslik: 'Haklarınız',
      paragraflar: [
        'Kanun’un 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, ' +
          'işlenmişse buna ilişkin bilgi talep etme, işlenme amacını öğrenme, eksik veya yanlış ' +
          'işlenmiş olması hâlinde düzeltilmesini isteme, silinmesini veya yok edilmesini isteme ' +
          've işlenmesine itiraz etme haklarına sahipsiniz.',
        `Taleplerinizi ${klinik.eposta} adresine ya da yukarıdaki adrese yazılı olarak ` +
          'iletebilirsiniz. Başvurular en geç otuz gün içinde sonuçlandırılır.'
      ]
    }
  ]
};

export const cerezMetni: YasalMetin = {
  baslik: 'Çerez Politikası',
  ozet:
    'Bu sitede hangi çerezlerin kullanıldığına ve tarayıcı ayarlarınızdan bunları nasıl ' +
    'yönetebileceğinize ilişkin bilgilendirme.',
  bolumler: [
    {
      baslik: 'Çerez nedir?',
      paragraflar: [
        'Çerez, ziyaret ettiğiniz siteler tarafından tarayıcınıza kaydedilen küçük metin ' +
          'dosyasıdır. Sitelerin çalışması, tercihlerinizin hatırlanması veya ziyaretçi ' +
          'davranışının ölçülmesi için kullanılır.'
      ]
    },
    {
      baslik: 'Bu sitede kullanılan çerezler',
      paragraflar: [
        'Bu sitede reklam, profilleme veya üçüncü taraf izleme çerezi kullanılmaz.',
        'Ziyaretiniz sırasında kişisel veri içeren bir çerez oluşturulmaz; sitenin görüntülenmesi ' +
          'için oturum açmanız da gerekmez.',
        'Randevu formunda girdiğiniz bilgiler çerezde saklanmaz, yalnızca gönderim sırasında ' +
          'iletilir.'
      ]
    },
    {
      baslik: 'Dış bağlantılar',
      paragraflar: [
        'Sayfalardaki yol tarifi ve WhatsApp bağlantıları sizi başka sitelere yönlendirir. Bu ' +
          'sitelerin kendi çerez uygulamaları geçerlidir ve bu politikanın kapsamı dışındadır.'
      ]
    },
    {
      baslik: 'Çerezleri yönetme',
      paragraflar: [
        'Tarayıcınızın ayarlar bölümünden çerezleri görüntüleyebilir, silebilir veya ' +
          'engelleyebilirsiniz. Bu sitenin görüntülenmesi çerezlere bağlı olmadığından, ' +
          'engelleme durumunda sayfalar çalışmaya devam eder.'
      ]
    },
    {
      baslik: 'İletişim',
      paragraflar: [
        `Bu politikayla ilgili sorularınızı ${klinik.eposta} adresine iletebilirsiniz.`
      ]
    }
  ]
};
