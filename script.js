/* =========================================================
   Helper kecil
   ========================================================= */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// Klon <template> berdasarkan id
const klon = (id) => document.getElementById(id).content.cloneNode(true);

// Isi elemen bertanda data-slot="nama"
const slot = (root, nama) => root.querySelector(`[data-slot="${nama}"]`);
const isi = (root, nama, teks) => { slot(root, nama).textContent = teks; };


/* =========================================================
   1. FOOTER: tahun otomatis
   ========================================================= */
const elTahun = $("#year");
if (elTahun) elTahun.textContent = new Date().getFullYear();


/* =========================================================
   2. FORM KONTAK: membuka aplikasi email pengunjung
   ========================================================= */
const EMAIL_TUJUAN = "agungrizkysetiawannn@gmail.com";
const form = $("#form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nama = $("#nama").value;
    const email = $("#email").value;
    const pesan = $("#pesan").value;
    const subjek = encodeURIComponent("Pesan dari " + nama);
    const isiPesan = encodeURIComponent(pesan + "\n\nEmail: " + email);
    window.location.href = `mailto:${EMAIL_TUJUAN}?subject=${subjek}&body=${isiPesan}`;
  });
}


/* =========================================================
   3. SLIDESHOW FOTO PROFIL (otomatis tiap 4 detik)
   ========================================================= */
const slides = $$(".slide");
const dots = $$(".dots button");
let n = 0, timer;

if (slides.length) {
  slides.forEach((img, i) => {
    img.addEventListener("error", () => {
      console.warn("Gambar tidak ditemukan:", img.getAttribute("src"));
      img.dataset.rusak = "1";
      if (dots[i]) dots[i].style.display = "none";
    });
  });

  function tampil(i) {
    const total = slides.length;
    let berikut = (i + total) % total;
    let coba = 0;
    while (slides[berikut].dataset.rusak && coba < total) {
      berikut = (berikut + 1) % total;
      coba++;
    }
    slides[n].classList.remove("active");
    if (dots[n]) dots[n].classList.remove("active");
    n = berikut;
    slides[n].classList.add("active");
    if (dots[n]) dots[n].classList.add("active");
  }

  function mulai() { timer = setInterval(() => tampil(n + 1), 4000); }

  dots.forEach((d, i) => d.addEventListener("click", () => {
    tampil(i);
    clearInterval(timer);
    mulai();
  }));
  mulai();
}


/* =========================================================
   4. SKILL: jika logo gagal dimuat, ganti lencana huruf
   ========================================================= */
$$(".pill img").forEach((img) => {
  const ganti = () => {
    const b = document.createElement("span");
    b.className = "ico";
    b.textContent = img.parentElement.textContent.trim().charAt(0);
    img.replaceWith(b);
  };
  img.addEventListener("error", ganti);
  if (img.complete && img.naturalWidth === 0) ganti();
});


/* =========================================================
   5. PROJEK: data
   ========================================================= */
const label = { ta: "Tugas Akhir", magang: "Magang", akademik: "Akademik" };

// Opsional per projek: github: "https://...", demo: "https://..."
const projects = [
  {
    id: "distilab", type: "ta", role: "Modeling 3D", name: "DistiLab 3D",
    context: "Proyek Tugas Akhir", period: "Jan 2026 – Aug 2026", location: "Malang, Jawa Timur",
    c1: "#1b3a7a", c2: "#4a2fa0",
    summary: "Aplikasi pembelajaran interaktif berbasis simulasi 3D untuk memahami prosedur dan pengoperasian alat Schott Glaswerke Distillation Unit.",
    desc: [
      "DistiLab 3D adalah proyek tugas akhir berupa aplikasi pembelajaran interaktif berbasis simulasi 3D. Aplikasi ini membantu mahasiswa memahami prosedur dan cara mengoperasikan alat Schott Glaswerke Distillation Unit secara visual, tanpa harus langsung memakai alat aslinya di laboratorium.",
      "Proyek ini juga menjadi bahan penelitian skripsi saya, yaitu membandingkan pembelajaran berbasis simulasi 3D dengan pembelajaran berbasis video."
    ],
    points: [
      "Mengembangkan aplikasi pembelajaran interaktif berbasis simulasi 3D menggunakan Unreal Engine 5 untuk membantu mahasiswa memahami prosedur dan pengoperasian alat Schott Glaswerke Distillation Unit.",
      "Mengimplementasikan model 3D alat Schott Glaswerke Distillation Unit sebagai aset utama dalam aplikasi simulasi pembelajaran."
    ],
    images: ["distilab.png"],
    tags: ["Unreal Engine 5", "Blender"]
  },
  {
    id: "warehouse", type: "magang", role: "Web Developer", name: "Aplikasi Warehouse",
    context: "Proyek Magang – CV Yuki Dharma", period: "Jul 2025 – Dec 2025", location: "Malang, Jawa Timur",
    c1: "#0f4c75", c2: "#1b9aaa",
    summary: "Fitur Stock Opname pada aplikasi Warehouse berbasis web untuk pengelolaan data persediaan.",
    desc: [
      "Aplikasi Warehouse adalah aplikasi berbasis web untuk mengelola persediaan barang di gudang. Selama magang di CV Yuki Dharma, saya mengerjakan fitur Stock Opname agar pengolahan dan pembaruan data persediaan berjalan lebih rapi."
    ],
    points: [
      "Mengembangkan fitur Stock Opname pada aplikasi Warehouse berbasis web menggunakan C#, dan SQL Server.",
      "Menggunakan stored procedure untuk mendukung proses pengolahan dan pembaruan data persediaan."
    ],
    images: ["warehouse.png"],
    tags: ["C#", "SQL Server"]
  },
  {
    id: "fortis", type: "magang", role: "Mobile Developer", name: "FORTIS",
    context: "Proyek Magang – InaTech", period: "Jun 2025", location: "Malang, Jawa Timur",
    c1: "#2b2d7a", c2: "#3a86ff",
    summary: "Antarmuka aplikasi absensi kepegawaian berbasis mobile menggunakan Flutter.",
    desc: [
      "FORTIS adalah aplikasi absensi kepegawaian berbasis mobile. Selama magang di InaTech, saya bertanggung jawab pada sisi tampilan agar aplikasi mudah digunakan oleh pegawai."
    ],
    points: [
      "Menerapkan desain antarmuka (UI) menggunakan Flutter pada aplikasi absensi kepegawaian berbasis mobile.",
      "Menyusun tampilan halaman aplikasi sesuai rancangan UI/UX agar mudah digunakan oleh pegawai."
    ],
    images: ["fortis.png"],
    tags: ["Flutter", "Dart"]
  },
  {
    id: "kodein", type: "magang", role: "Mobile Developer", name: "KODEIN",
    context: "Proyek Magang – InaTech", period: "Apr 2025 – May 2025", location: "Malang, Jawa Timur",
    c1: "#7a2b5e", c2: "#ff6b6b",
    summary: "Fitur Downline dan Edit Profile pada aplikasi mobile Koperasi Digital Ekonomi Indonesia.",
    desc: [
      "KODEIN (Koperasi Digital Ekonomi Indonesia) adalah aplikasi mobile koperasi digital. Saya mengerjakan fitur Downline dan Edit Profile menggunakan Flutter, dengan tampilan yang disesuaikan dengan desain dan kebutuhan pengguna."
    ],
    points: [
      "Mengembangkan fitur Downline, Edit Profile pada Aplikasi Mobile Koperasi Digital Ekonomi Indonesia (KODEIN) menggunakan Flutter.",
      "Mengimplementasikan tampilan aplikasi sesuai dengan desain dan kebutuhan pengguna."
    ],
    images: ["kodein.png", "kodein-preview.png"],
    tags: ["Flutter", "Dart"]
  },
  {
    id: "fluks", type: "magang", role: "Mobile Developer", name: "FLUKS",
    context: "Proyek Magang – InaTech", period: "Feb 2025 – Mar 2025", location: "Malang, Jawa Timur",
    c1: "#065a60", c2: "#2ec4b6",
    summary: "Fitur Koneksi, Detail Petambak, dan SignUp pada aplikasi monitoring tambak udang.",
    desc: [
      "FLUKS adalah aplikasi monitoring tambak udang. Saya mengerjakan fitur Koneksi, Detail Petambak, dan SignUp menggunakan Flutter, dengan tampilan yang disesuaikan dengan desain dan kebutuhan pengguna."
    ],
    points: [
      "Mengembangkan fitur Koneksi, Detail Petambak dan SignUp pada aplikasi Aplikasi Monitoring Tambak Udang (FLUKS) menggunakan Flutter.",
      "Mengimplementasikan tampilan aplikasi sesuai dengan desain dan kebutuhan pengguna."
    ],
    images: ["fluks.png"],
    tags: ["Flutter", "Dart"]
  },
  {
    id: "skinalyze", type: "akademik", role: "Frontend Developer", name: "SKINALYZE",
    context: "Proyek Akademik – Semester 5", period: "Aug 2024 – Dec 2024", location: "Malang, Jawa Timur",
    c1: "#5a189a", c2: "#e0aaff",
    summary: "Antarmuka aplikasi mobile untuk analisis jenis kulit wajah berbasis Convolutional Neural Network (CNN).",
    desc: [
      "SKINALYZE adalah aplikasi mobile untuk menganalisis jenis kulit wajah dengan memanfaatkan teknologi Convolutional Neural Network (CNN). Peran saya ada di sisi antarmuka, supaya proses penggunaan fitur analisis mudah dipahami pengguna."
    ],
    points: [
      "Merancang antarmuka aplikasi mobile untuk analisis jenis kulit wajah dengan memanfaatkan teknologi Convolutional Neural Network (CNN).",
      "Menerapkan desain UI/UX ke dalam tampilan aplikasi agar proses penggunaan fitur analisis lebih mudah dipahami."
    ],
    images: ["skinalyze.png"],
    tags: ["Flutter", "TensorFlow"]
  },
  {
    id: "venus", type: "akademik", role: "Backend Developer", name: "VENUS",
    context: "Proyek Akademik – Semester 4", period: "Feb 2024 – Jun 2024", location: "Malang, Jawa Timur",
    c1: "#3d348b", c2: "#f35b9a",
    summary: "Sistem Informasi Manajemen PKK untuk RW 05 Tlogomas, Kecamatan Lowokwaru, Kota Malang.",
    desc: [
      "VENUS adalah sistem informasi manajemen PKK untuk RW 05 Tlogomas, Kecamatan Lowokwaru, Kota Malang. Saya fokus pada sisi backend, terutama struktur basis data untuk pengelolaan informasi dan kegiatan PKK."
    ],
    points: [
      "Merancang Sistem Informasi Manajemen PKK untuk RW 05 Tlogomas, Kecamatan Lowokwaru, Kota Malang.",
      "Menyusun struktur basis data dan mendukung perancangan sistem untuk pengelolaan informasi serta kegiatan PKK."
    ],
    images: ["venus.jpeg"],
    tags: ["PHP", "Laravel", "MySQL"]
  },
  {
    id: "tampol", type: "akademik", role: "Frontend Developer", name: "TAMPOL",
    context: "Proyek Akademik – Semester 3", period: "Nov 2023 – Dec 2023", location: "Malang, Jawa Timur",
    c1: "#1d3557", c2: "#457b9d",
    summary: "Tampilan aplikasi Tata Tertib Mahasiswa Politeknik Negeri Malang.",
    desc: [
      "TAMPOL adalah aplikasi Tata Tertib Mahasiswa Politeknik Negeri Malang. Saya mengerjakan sisi tampilannya supaya mahasiswa mudah mengakses informasi tata tertib."
    ],
    points: [
      "Merancang tampilan aplikasi Tata Tertib Mahasiswa Politeknik Negeri Malang (TAMPOL).",
      "Menerapkan desain antarmuka ke dalam halaman aplikasi untuk memudahkan mahasiswa mengakses informasi tata tertib."
    ],
    images: ["tampol.png"],
    tags: ["HTML", "CSS", "Bootstrap"]
  },
  {
    id: "pengaduan", type: "akademik", role: "Fullstack Web Developer", name: "Pengaduan Masyarakat",
    context: "Proyek Akademik – SMK", period: "Jan 2022 – May 2022", location: "Malang, Jawa Timur",
    c1: "#6a040f", c2: "#e85d04",
    summary: "Aplikasi pengaduan masyarakat berbasis web untuk Kecamatan Lowokwaru, Kota Malang.",
    desc: [
      "Aplikasi pengaduan masyarakat berbasis web untuk Kecamatan Lowokwaru, Kota Malang. Ini proyek fullstack pertama saya, mulai dari perancangan, pembangunan, sampai pengujian alur pengaduan."
    ],
    points: [
      "Merancang dan membangun aplikasi pengaduan masyarakat berbasis web untuk Kecamatan Lowokwaru, Kota Malang.",
      "Melakukan pengujian aplikasi untuk memastikan fitur dan alur pengaduan berjalan sesuai kebutuhan."
    ],
    images: ["pengaduan.png"],
    tags: ["PHP", "MySQL", "Bootstrap"]
  }
];


/* =========================================================
   6. PROJEK: pencari gambar otomatis
   ========================================================= */
const FOLDERS = ["assets/projects/", "assets/", "assets/images/", "assets/img/"];
const EXTS = ["png", "jpg", "jpeg", "webp"];

function kandidat(file) {
  const base = file.replace(/\.[^.]+$/, "");
  const list = [];
  FOLDERS.forEach((f) => {
    list.push(f + file);
    EXTS.forEach((e) => list.push(`${f}${base}.${e}`));
  });
  return [...new Set(list)];
}

function pasangGambar(img) {
  const list = kandidat(img.dataset.file);
  const box = img.closest(".proj-img");
  const alt = img.alt;
  img.alt = "";
  img.style.visibility = "hidden";

  let i = 0;
  const probe = new Image();
  probe.onload = () => {
    img.src = probe.src;
    img.alt = alt;
    img.style.visibility = "visible";
    if (box) {
      box.classList.add("ada");
      box.style.setProperty("--img", `url("${probe.src}")`);
    }
  };
  probe.onerror = () => {
    i++;
    if (i < list.length) probe.src = list[i];
    else {
      console.warn("Gambar tidak ditemukan:", img.dataset.file, "| sudah dicoba:", list);
      img.remove();
    }
  };
  probe.src = list[0];
}


/* =========================================================
   7. PROJEK: logo teknologi, link, dan kartu
   ========================================================= */
const DEV = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/";
const ICONS = {
  "Unreal Engine 5": "unrealengine/unrealengine-original.svg",
  "Blender": "blender/blender-original.svg",
  "C#": "csharp/csharp-original.svg",
  "SQL Server": "microsoftsqlserver/microsoftsqlserver-plain.svg",
  "Flutter": "flutter/flutter-original.svg",
  "Dart": "dart/dart-original.svg",
  "TensorFlow": "tensorflow/tensorflow-original.svg",
  "PHP": "php/php-original.svg",
  "Laravel": "laravel/laravel-original.svg",
  "MySQL": "mysql/mysql-original.svg",
  "HTML": "html5/html5-original.svg",
  "CSS": "css3/css3-original.svg",
  "JavaScript": "javascript/javascript-original.svg",
  "Bootstrap": "bootstrap/bootstrap-original.svg",
  "Figma": "figma/figma-original.svg"
};

// Lencana huruf pertama (dipakai jika logo tidak ada / gagal dimuat)
function lencana(nama) {
  const b = document.createElement("b");
  b.textContent = nama.charAt(0);
  return b;
}

function buatTech(nama) {
  const node = klon("tpl-tech");
  const wadah = $(".tech", node);
  const img = $("img", wadah);
  $(".tname", wadah).textContent = nama;
  wadah.title = nama;

  const ic = ICONS[nama];
  if (ic) {
    img.addEventListener("error", () => img.replaceWith(lencana(nama)));
    img.src = DEV + ic;
  } else {
    img.replaceWith(lencana(nama));
  }
  return node;
}

function isiTechs(wadah, tags) {
  tags.forEach((t) => wadah.appendChild(buatTech(t)));
}

function isiLinks(wadah, p) {
  [["⌥ GitHub", p.github], ["↗ Live Demo", p.demo]].forEach(([teks, url]) => {
    if (!url) return;
    const node = klon("tpl-link");
    const a = $("a", node);
    a.textContent = teks;
    a.href = url;
    wadah.appendChild(node);
  });
}

/* ----- Tampilkan kartu ----- */
const grid = $("#proj-grid");
if (grid) {
  projects.forEach((p) => {
    const node = klon("tpl-card");
    const kartu = $(".proj", node);
    kartu.dataset.id = p.id;
    kartu.setAttribute("aria-label", "Lihat detail " + p.name);

    const box = $(".proj-img", node);
    box.style.setProperty("--a", p.c1);
    box.style.setProperty("--b", p.c2);

    isi(node, "ph", p.name);
    isi(node, "badge", label[p.type]);
    isi(node, "period", p.period);
    isi(node, "name", p.name);
    isi(node, "role", p.role);
    isi(node, "summary", p.summary);
    isiTechs(slot(node, "techs"), p.tags);
    isiLinks(slot(node, "links"), p);

    const img = slot(node, "img");
    img.alt = "Tampilan " + p.name;
    img.dataset.file = p.images[0];

    grid.appendChild(node);
  });

  $$("img[data-file]", grid).forEach(pasangGambar);
}


/* =========================================================
   8. PROJEK: jendela detail (modal)
   ========================================================= */
const modal = $("#modal");
const modalContent = $("#modal-content");
const tutup = $("#modal-close");

function bukaModal(id) {
  const p = projects.find((x) => x.id === id);
  if (!p) return;

  const node = klon("tpl-modal");
  isi(node, "badge", label[p.type]);
  isi(node, "name", p.name);
  isi(node, "context", p.context);
  isi(node, "role", p.role);
  isi(node, "period", p.period);
  isi(node, "location", p.location);

  p.images.forEach((f) => {
    const g = klon("tpl-gallery-img");
    const img = $("img", g);
    img.alt = p.name;
    img.dataset.file = f;
    slot(node, "gallery").appendChild(g);
  });

  p.desc.forEach((d) => {
    const par = document.createElement("p");
    par.textContent = d;
    slot(node, "desc").appendChild(par);
  });

  p.points.forEach((x) => {
    const li = document.createElement("li");
    li.textContent = x;
    slot(node, "points").appendChild(li);
  });

  isiTechs(slot(node, "techs"), p.tags);
  isiLinks(slot(node, "links"), p);

  modalContent.replaceChildren(node);
  $$("img[data-file]", modalContent).forEach(pasangGambar);

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  tutup.focus();
}

function tutupModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

if (grid && modal) {
  grid.addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    const c = e.target.closest(".proj");
    if (c) bukaModal(c.dataset.id);
  });
  grid.addEventListener("keydown", (e) => {
    const c = e.target.closest(".proj");
    if (c && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); bukaModal(c.dataset.id); }
  });
  tutup.addEventListener("click", tutupModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) tutupModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") tutupModal(); });
}


/* =========================================================
   9. NAVBAR: tandai menu sesuai bagian yang sedang dilihat
   ========================================================= */
const navLinks = $$(".nav nav a");
const navSections = navLinks
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

function setMenuAktif() {
  const batas = window.scrollY + window.innerHeight * 0.35;
  let aktif = navSections[0];

  navSections.forEach((s) => {
    if (s.getBoundingClientRect().top + window.scrollY <= batas) aktif = s;
  });

  // Jika sudah di dasar halaman, aktifkan menu terakhir (Contact)
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
    aktif = navSections[navSections.length - 1];
  }

  navLinks.forEach((a) => {
    const cocok = a.getAttribute("href") === "#" + aktif.id;
    a.classList.toggle("active", cocok);
    if (cocok) a.setAttribute("aria-current", "true");
    else a.removeAttribute("aria-current");
  });
}

let menuTunggu = false;
window.addEventListener("scroll", () => {
  if (menuTunggu) return;
  menuTunggu = true;
  requestAnimationFrame(() => { setMenuAktif(); menuTunggu = false; });
}, { passive: true });
window.addEventListener("resize", setMenuAktif);
setMenuAktif();