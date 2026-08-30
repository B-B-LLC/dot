/* ====================================================================
   YASAL METİNLER

   ⚠ ÖNEMLİ: Bu metinler şablondur. Yayına almadan önce kliniğin kendi
   veri işleme uygulamasına göre bir hukukçu tarafından gözden geçirilmesi
   gerekir. Özellikle şu maddeler kliniğe göre değişir:
   - Randevu taleplerinin nerede saklandığı ve ne kadar süreyle tutulduğu
   - Hasta dosyalarının tutulduğu sistem ve saklama süresi
   - Kullanılan üçüncü taraf hizmetler (e-posta, harita, analiz)
   - Yurt dışı aktarımın hukuki dayanağı (bkz. aşağıdaki `altyapi`)

   Metinler klinik künyesinden beslenir; klinik adı ve iletişim bilgisi
   site.config.ts değiştiğinde burada da güncellenir.
   ==================================================================== */

import { altyapi, klinik, olcum } from './site.config';

/* Ölçüm site.config.ts'ten açılıp kapatılır. Kapalıyken (`saglayici: 'yok'`)
   aşağıdaki ölçüm maddeleri metinlerden tamamen düşer; böylece yasal metin
   ile sitenin gerçek davranışı birbirinden ayrılamaz. */
const olcumVar = olcum.saglayici !== 'yok';

const OLCUM_ADI =
  olcum.saglayici === 'plausible' ? 'Plausible Analytics' : 'Vercel Web Analytics';

/** Ölçüm açıkken verilen maddeleri döndürür, kapalıyken hiçbirini. */
function olcumluysa<T>(...ogeler: T[]): T[] {
  return olcumVar ? ogeler : [];
}

/** Aktarım cümleleri: dayanak yazılana kadar iddia edilen bir dayanak
    olmasın diye, o cümle yalnız alan doluyken metne girer. */
function dayanakVarsa<T>(...ogeler: T[]): T[] {
  return altyapi.yurtDisiDayanak.trim() ? ogeler : [];
}

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
        'Site ziyaretiniz sırasında reklam veya profilleme amacıyla veri toplanmaz.',
        ...olcumluysa(
          'Sayfa ziyaretleri ve iletişim düğmelerine yapılan tıklamalar anonim olarak ' +
            'sayılır. Bu sayım için tarayıcınıza çerez yazılmaz, IP adresiniz saklanmaz ve ' +
            'ziyaretçiler arasında sizi tanımlayan kalıcı bir kimlik oluşturulmaz; ' +
            'toplanan veri; görüntülenen sayfanın adresi, siteye hangi bağlantıdan ' +
            'gelindiği, tıklanan düğmenin türü, tarayıcı ve cihaz türü ile ülke–şehir ' +
            'düzeyinde yaklaşık konumdan ibarettir. Bu veriler tek başına ya da başka ' +
            'verilerle eşleştirilerek kimliğinizi belirlemeye elverişli değildir.'
        )
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
          'kamu kurum ve kuruluşlarıyla paylaşılabilir. Bunun dışında üçüncü kişilere veya ' +
          'reklam ortaklarına aktarılmaz, satılmaz.',
        `Randevu talebiniz kliniğin e-posta adresine iletilirken sitenin barındırıldığı ` +
          `${altyapi.barindirma} ve gönderimi yapan ${altyapi.epostaHizmeti} hizmetlerinin ` +
          'sunucularından geçer. Bu hizmetler verilerinizi kendi amaçları için kullanmaz, ' +
          'yalnızca talebinizin kliniğe ulaşmasını sağlar. Sunucuları yurt dışında ' +
          'bulunduğundan, Kanun’un 9. maddesi anlamında yurt dışına aktarım söz konusudur.',
        ...dayanakVarsa(`Bu aktarım ${altyapi.yurtDisiDayanak} gerçekleştirilir.`),
        ...olcumluysa(
          `Yukarıda anlatılan anonim ziyaret sayımı ${OLCUM_ADI} hizmeti üzerinden ` +
            'yapılır ve verileri yurt dışındaki sunucularında işlenir. Bu sayım kişisel ' +
            'veri içermediği için buradaki aktarım kişisel verilerinize ilişkin değildir.'
        )
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

export const gizlilikMetni: YasalMetin = {
  baslik: 'Gizlilik Politikası',
  ozet:
    'Bu sitede hangi bilgilerin toplandığına, nasıl kullanıldığına ve kimlerle ' +
    'paylaşıldığına ilişkin genel bilgilendirme.',
  bolumler: [
    {
      baslik: 'Kapsam',
      paragraflar: [
        `Bu politika yalnızca ${klinik.ad} tarafından işletilen bu web sitesini kapsar.`,
        'Klinikte yüz yüze gerçekleşen muayene ve tedavi süreçlerinde toplanan sağlık ' +
          'kayıtları bu politikanın konusu değildir; bunlar ilgili sağlık mevzuatına göre ' +
          'klinik kayıt sisteminde tutulur.'
      ]
    },
    {
      baslik: 'Toplanan bilgiler',
      paragraflar: [
        'Site yalnızca randevu formunu doldurduğunuzda bilgi toplar: ad ve soyad, telefon ' +
          'numarası, tercih ettiğiniz tarih ve varsa notunuz.',
        'Sayfaları gezmek için herhangi bir bilgi vermeniz gerekmez. Üyelik, oturum açma ya ' +
          'da profil oluşturma yoktur.',
        olcumVar
          ? 'Reklam ağı veya sosyal medya izleyicisi kullanılmaz. Sitenin kaç kez ' +
            'ziyaret edildiğini ve iletişim düğmelerinin kaç kez kullanıldığını görmek ' +
            'için çerezsiz bir sayaç çalışır; kimseyi tanımaz, kişisel veri toplamaz ' +
            '(ayrıntısı Çerez Politikası’ndadır).'
          : 'Reklam ağı, sosyal medya izleyicisi veya ziyaretçi davranışı ölçen bir araç ' +
            'kullanılmaz.'
      ]
    },
    {
      baslik: 'Bilgilerin kullanımı',
      paragraflar: [
        'Randevu formundaki bilgiler yalnızca size dönüş yapmak ve randevu saatini ' +
          'belirlemek için kullanılır.',
        'Talebiniz site üzerinde bir veri tabanında saklanmaz; doğrudan kliniğin e-posta ' +
          'adresine iletilir.',
        'Bilgileriniz pazarlama amacıyla kullanılmaz ve satılmaz. Yalnızca bilgilendirme ' +
          'kutucuğunu işaretlemeniz hâlinde ağız ve diş sağlığı içerikleri gönderilebilir; ' +
          'bu izni dilediğiniz zaman geri alabilirsiniz.'
      ]
    },
    {
      baslik: 'Paylaşım',
      paragraflar: [
        'Bilgileriniz pazarlama amacıyla üçüncü kişilerle paylaşılmaz ve satılmaz. Yasal ' +
          'yükümlülük gereği yetkili kamu kurumlarından gelen talepler bunun dışındadır.',
        `Talebinizin kliniğe ulaşması için iki hizmet devrede: site ${altyapi.barindirma} ` +
          `üzerinde barındırılır, form gönderimi ${altyapi.epostaHizmeti} ile yapılır. Her ` +
          'ikisi de verileri yalnızca iletim amacıyla işler; sunucuları yurt dışındadır. ' +
          'Ayrıntısı KVKK Aydınlatma Metni’nin “Aktarım” başlığındadır.'
      ]
    },
    {
      baslik: 'Güvenlik',
      paragraflar: [
        'Site şifreli bağlantı (HTTPS) üzerinden sunulur.',
        'Randevu formunda kimlik numarası, sağlık geçmişi veya ödeme bilgisi sorulmaz. ' +
          'Tedaviye ilişkin ayrıntıları form üzerinden değil, muayene sırasında hekiminizle ' +
          'paylaşmanız önerilir.'
      ]
    },
    {
      baslik: 'Çocukların gizliliği',
      paragraflar: [
        'Site çocuklara yönelik değildir. Çocuk hastalar için randevu talebi ebeveyn veya ' +
          'yasal temsilci tarafından oluşturulmalıdır.'
      ]
    },
    {
      baslik: 'Değişiklikler ve iletişim',
      paragraflar: [
        'Bu politika güncellenebilir; geçerli sürüm her zaman bu sayfada yayımlanır.',
        `Sorularınız için ${klinik.eposta} adresine yazabilirsiniz. Kişisel verilerinize ` +
          'ilişkin haklarınız ve başvuru yolu KVKK Aydınlatma Metni’nde ayrıca açıklanmıştır.'
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
    ...olcumluysa({
      baslik: 'Çerezsiz ziyaretçi sayacı',
      paragraflar: [
        `Sitede ${OLCUM_ADI} adlı ölçüm hizmeti çalışır. Hangi sayfaların ne kadar ` +
          'okunduğunu ve telefon, WhatsApp, yol tarifi düğmelerinin kaç kez ' +
          'kullanıldığını saymak için kullanılır.',
        'Bu sayaç tarayıcınıza çerez yazmaz ve cihazınızda hiçbir iz bırakmaz. IP ' +
          'adresiniz kaydedilmez; tekil ziyaretçi sayısı, gün sonunda geçersiz hâle ' +
          'gelen ve geri çevrilemeyen bir özet değerle hesaplanır. Ziyaretiniz ertesi ' +
          'gün yeni bir ziyaretçi sayılır, yani sizi günler boyunca izleyen bir kayıt ' +
          'oluşmaz.',
        'Çerez kullanılmadığı ve kişisel veri işlenmediği için bu ölçüm onayınıza ' +
          'bağlı değildir; sitede çerez onay bandı bulunmamasının nedeni budur. ' +
          'Yine de sayılmak istemezseniz tarayıcınızın izleme engelleyicisi ya da bir ' +
          'reklam engelleyici bu betiği durdurur; site aynı şekilde çalışmaya devam eder.'
      ]
    }),
    {
      baslik: 'Dış bağlantılar',
      paragraflar: [
        'Sayfalardaki yol tarifi ve WhatsApp bağlantıları sizi başka sitelere yönlendirir. Bu ' +
          'sitelerin kendi çerez uygulamaları geçerlidir ve bu politikanın kapsamı dışındadır.'
      ]
    },
    {
      baslik: 'Gömülü harita',
      paragraflar: [
        'İletişim bölümündeki harita Google Haritalar’dan yüklenir. Sayfayı açar açmaz değil, ' +
          'yalnızca kaydırıp o bölüme yaklaştığınızda yüklenir; sayfanın üst kısmında kalırsanız ' +
          'Google’a hiçbir istek gitmez.',
        'Harita yüklendiği andan itibaren Google’ın kendi çerez ve veri uygulamaları geçerli ' +
          'olur; bu politikanın kapsamı dışındadır.'
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
