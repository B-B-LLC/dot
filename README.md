# Özel Meşe Ağız ve Diş Sağlığı Polikliniği — web sitesi

`Klinik Sitesi.dc.html` tasarım dosyasının uygulanmış hâli. Verdant Dental tasarım
sistemi (`954de0fa`) üzerine kurulu, derleme adımı olmayan statik bir site.

## Çalıştırma

```bash
node tools/serve.js 4173
```

Ardından `http://localhost:4173`. Dosyalar doğrudan `file://` üzerinden de açılabilir,
ancak yerel sunucu ile çalışmak önerilir.

## Yayına alma (Vercel)

Site statiktir; derleme adımı yoktur. `vercel.json` bunu Vercel'e açıkça
bildirir (`framework: null`, derleme ve kurulum komutu yok, çıktı dizini kök).

Bu dosya gerekli: proje daha önce Next.js olarak yapılandırıldığı için Vercel
aksi hâlde `next build` çalıştırmayı deniyor ve *"No Next.js version detected"*
hatası veriyor. `vercel.json` içindeki ayarlar panel ayarlarını ezer.

## Dosya düzeni

| Yol | İçerik |
| --- | --- |
| `index.html` | Sayfa iskeleti, meta/SEO etiketleri, JSON-LD (`schema.org/Dentist`), betik sırası |
| `assets/app.js` | Sitenin tamamı — içerik verisi, bölümler, randevu formu, mobil çubuk |
| `assets/site.css` | Yalnızca satır içi stille yazılamayanlar: `:hover`, `:focus-visible`, `@media print` |
| `_ds/verdant-dental-…/` | Tasarım sistemi: jetonlar (`tokens/*.css`) ve React bileşen paketi |
| `Klinik Sitesi.dc.html` | Kaynak tasarım dosyası — referans olarak durur, siteye dâhil değildir |
| `support.js` | Tasarım dosyasının çalışma zamanı — yalnızca `.dc.html` için gerekir |
| `tools/serve.js` | Bağımlılıksız yerel statik sunucu |

## Yapı notları

- **Derleme yok.** React ve `react-dom` UMD olarak `unpkg`ten yüklenir, ardından
  tasarım sistemi paketi gelir. Paket `window.React`e ihtiyaç duyduğu için betik
  sırası `index.html` içinde korunmalıdır. Yayına almadan önce bu iki dosyanın
  yerel kopyalarını sunmak (CDN bağımlılığını kaldırmak) önerilir.
- **İçerik `assets/app.js` başındaki sabitlerde.** `KLINIK`, `SAATLER`, `HEKIMLER`,
  `SORULAR`, `TEDAVILER` ve benzeri diziler düzenlendiğinde sayfa güncellenir.
- **Çalışma saatleri tek kaynaktan gelir.** `SAATLER` hem hero’daki canlı saat
  kartını, hem ulaşım kartını, hem de altbilgiyi besler. Danışmanın açık/kapalı
  durumu istemci saatine göre hesaplanır ve 15 saniyede bir tazelenir.
- **Renk, boşluk, yuvarlaklık ve gölge değerleri jetonlardan okunur** (`var(--…)`).
  Sabit renk kodu yazmaktan kaçının.

## Tasarım dosyasından ayrılan noktalar

Üçü bilinçli karar, biri düzeltme:

1. **Dar ekranda üst gezinme sadeleşir.** Tasarım sisteminin `NavBar` bileşeni
   68 px sabit yüksekliktedir ve beş bağlantı 375 px’e sığmaz. 860 px altında
   bağlantı listesi gizlenir; marka ve “Randevu talebi” düğmesi kalır, gezinme
   alttaki sabit eylem çubuğuna bırakılır.
2. **Randevu alanı gerçek bir `<form>`.** Enter tuşuyla gönderim ve tarayıcı
   otomatik doldurması (`autocomplete`) böylece çalışır. Doğrulama kuralları
   tasarımdakiyle aynı: ad boş olamaz, telefon en az 10 rakam.
3. **`lucide` ikon kütüphanesi çıkarıldı.** Tasarım dosyası yüklüyordu ancak
   sayfada hiç kullanılmıyordu; tüm ikonlar satır içi SVG.
4. **Erişilebilirlik eklemeleri.** SSS başlıkları `aria-expanded`/`aria-controls`
   ile eşlendi ve `<h3>` içine alındı; dekoratif blob ve şerit öğeleri
   `aria-hidden`; onay ekranı `role="status"`; sterilizasyon adımları `<ol>`.

## Tamamlanmayı bekleyenler

Bunlar tasarım dosyasında da yer tutucu olarak duruyordu:

- **Form gönderimi bir uca bağlı değil.** `RandevuFormu` içindeki `gonder()`
  doğrulamayı yapar ve onay ekranını gösterir; talep hiçbir yere iletilmez.
  Sunucu ucu bağlanana kadar site randevu topluyormuş gibi yayına alınmamalı.
- **Fotoğraflar yer tutucu.** Hero kartı, mekân kartları ve hekim portreleri
  soyut blob’larla temsil ediliyor; kliniğin kendi çekimleri gelince
  değiştirilecek.
- **Yasal sayfalar yok.** `#kvkk`, `#gizlilik`, `#cerez` bağlantılarının hedefi
  bulunmuyor.
- **Örnek veriler gerçek değil:** telefon `0232 000 00 00`, e-posta ve ruhsat
  numarası (`0000/000`) yer tutucudur. `index.html` içindeki JSON-LD ve
  `canonical` adresi de birlikte güncellenmeli.
- **Yazı tipleri Google Fonts’tan geliyor.** `_ds/…/tokens/fonts.css` dosyasındaki
  nota göre gerçek font dosyaları geldiğinde kendi sunucunuzdan sunun.

## Doğrulanan davranışlar

Yerel tarayıcıda sınandı: sayfa konsol hatasız yükleniyor; canlı saat ve
açık/kapalı rozeti doğru; SSS akordeonu tek seferde tek soru açıyor ve
`aria-expanded` doğru; form boş gönderimde iki hatayı, eksik telefonda yalnızca
telefon hatasını gösteriyor; geçerli veride onay ekranına geçiyor ve “Yeni talep
oluştur” alanları temizliyor; 375 px’te mobil çubuk çıkıyor, yatay taşma yok;
1280 px’te tam gezinme dönüyor; altı gezinme bağlantısı da doğru bölüm ofsetini
hesaplıyor.

Kaydırmaya bağlı iki davranış — etkin bölümün üst gezinmede işaretlenmesi ve
gezinme çubuğunun kaydırınca küçülmesi — test ortamı kaydırmayı işlemediği için
tarayıcıda doğrulanamadı; kod tasarım dosyasındaki mantığın birebir aynısıdır.
