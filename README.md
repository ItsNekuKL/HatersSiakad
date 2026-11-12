<div align="center">
  <img src="icon128.png" width="200" alt="Ujian Helper Logo" />

  # Ujian Helper — Chrome Extension

  **Bypass copy-paste blocker, anti-cheat tracker, dan visibility snitch di halaman ujian online** — tanpa buka DevTools / F12.

  ![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue?style=flat-square)
  ![Chrome](https://img.shields.io/badge/Browser-Chrome-yellow?style=flat-square)
  ![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
</div>

---

## ✨ Fitur

| Fitur | Keterangan |
|---|---|
| 🫥 **Nipu Visibility** | Halaman selalu dianggap aktif oleh browser, meski kamu pindah tab |
| 🧹 **Kill jQuery Events** | Mematikan event `blur` / `focus` tracking yang dipakai web ujian |
| ⏱️ **Bantai Semua Timer** | `clearInterval` paksa semua timer/interval yang berjalan diam-diam |
| 🧼 **Reset Cheat Counter** | Set ulang `localStorage["cheat"]` ke 0 biar rekam jejak "kecurangan" terhapus |
| 📋 **Bypass Copy-Paste** | Unlock copy, paste, cut, klik kanan, dan seleksi teks yang diblokir |
| 🖱️ **Force User Select** | Inject CSS agar teks di halaman bisa disorot/diblok kembali |

Semua fitur bisa **diaktifkan / dinonaktifkan satu per satu** lewat toggle sebelum dijalankan.

---

## 📦 Instalasi

### Cara 1 — Git Clone

```bash
git clone https://github.com/username/ujian-helper.git
```

Lalu lanjut ke langkah **Load ke Chrome** di bawah.

### Cara 2 — Download ZIP

1. Klik tombol **Code → Download ZIP** di halaman repo ini
2. Extract ZIP ke folder mana saja, misal: `C:\ujian-helper\`

### Load ke Chrome

1. Buka Chrome, pergi ke: **`chrome://extensions`**
2. Aktifkan **Developer mode** (toggle di pojok kanan atas)
3. Klik **"Load unpacked"**
4. Pilih folder hasil clone / extract tadi
5. Extension **Ujian Helper** muncul di toolbar Chrome ✅

> **Pastikan folder yang dipilih adalah folder yang langsung berisi `manifest.json`**, bukan folder induknya.

---

## 🚀 Cara Pakai

1. Buka halaman ujian di Chrome seperti biasa
2. Klik **icon Ujian Helper** di toolbar Chrome (pojok kanan atas)
3. Popup akan muncul — pilih fitur yang ingin diaktifkan
4. Klik tombol **🚀 Jalankan Sekarang**
5. Muncul konfirmasi **✅ Berhasil dijalankan!** — selesai!

> Kalau icon tidak muncul di toolbar, klik ikon **puzzle 🧩** di Chrome lalu pin **Ujian Helper**.

---

## 🔍 Penjelasan Teknis

Extension ini menggunakan **Manifest V3** dengan `chrome.scripting.executeScript` untuk menyuntikkan kode JavaScript langsung ke konteks halaman yang sedang aktif — tanpa perlu membuka DevTools.

### Bagaimana setiap fitur bekerja:

#### 🫥 Nipu Visibility
Web ujian sering memantau `document.visibilityState` dan event `blur` untuk mendeteksi apakah kamu berpindah tab. Extension ini:
- Meng-override property `visibilityState` → selalu `'visible'`
- Meng-override property `hidden` → selalu `false`
- Menambahkan event listener `capture` yang langsung `stopImmediatePropagation()` untuk `visibilitychange`, `blur`, dan `focus`

#### 🧹 Kill jQuery Events
Banyak platform ujian menggunakan jQuery untuk binding event listener. Extension ini memanggil:
```js
$(window).off("blur focus");
$(document).off("visibilitychange");
```
untuk memutus semua listener yang sudah terpasang lewat jQuery.

#### ⏱️ Bantai Semua Timer
Timer (`setInterval`) dipakai untuk polling aktivitas secara berkala. Extension menyapu semua interval dengan:
```js
for (let i = 1; i < 99999; i++) window.clearInterval(i);
```

#### 🧼 Reset Cheat Counter
Beberapa sistem menyimpan hitungan "pelanggaran" di `localStorage`. Extension mereset key `cheat` ke `0`:
```js
localStorage.setItem("cheat", 0);
```

#### 📋 Bypass Copy-Paste
Memblokir event copy/paste biasanya dilakukan dengan `addEventListener`. Extension menambahkan listener di fase **capture** (prioritas tertinggi) yang langsung `stopImmediatePropagation()`:
```js
['copy', 'paste', 'cut', 'contextmenu', 'selectstart'].forEach(event => {
    document.addEventListener(event, e => e.stopImmediatePropagation(), true);
});
```
Listener capture berjalan sebelum listener lain, sehingga efektif membatalkan blokir.

#### 🖱️ Force User Select
Inject CSS global yang memaksa semua elemen agar bisa disorot:
```css
* { -webkit-user-select: text !important; user-select: text !important; }
```

---

## 📁 Struktur File

```
ujian-helper/
├── manifest.json      # Konfigurasi Chrome Extension (Manifest V3)
├── popup.html         # UI popup dengan toggle per-fitur
├── popup.js           # Logic inject script ke tab aktif
├── icon16.png         # Icon 16×16
├── icon48.png         # Icon 48×48
├── icon128.png        # Icon 128×128
└── README.md          # Dokumentasi ini
```

---

## ⚠️ Disclaimer

> Project ini dibuat untuk **keperluan edukasi dan pengujian keamanan web** semata.  
> Penggunaan untuk keperluan akademik yang melanggar aturan institusi adalah tanggung jawab pengguna sepenuhnya.  
> **ijin kompe 😏**

---

## 📄 License

MIT © 2026
