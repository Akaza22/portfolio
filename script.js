/* ===== TAMBAH PROJECT DI SINI =====
   Salin satu blok { ... } lalu isi datanya.
   cat: kategori filter | img: URL gambar (opsional) | link: URL project | icon: emoji jika tanpa gambar */
const PROJECTS=[
 {title:"Website Profil SMP Negeri 2 Sukadana",date:"Maret 2026",cat:"Website",icon:"🏫",img:"sukadana.png",
  desc:"Website institusi berbasis Blogger yang mudah dikelola pihak sekolah, berisi berita, program akademik, dan profil sekolah.",link:"https://www.smpn2sukadana.sch.id/",label:"Kunjungi situs"},
  {title:"ExpressSign App",date:"Jun – Jul 2024",cat:"Aplikasi",icon:"🤟",img:"",
   desc:"Aplikasi deteksi bahasa isyarat berbasis machine learning. Saya mengerjakan back-end, dokumentasi API, dan deployment ke Cloud Run.",link:"https://github.com/Akaza22/ExpressSign",label:"Lihat di GitHub"},
  {title:"SAS Fraud Decisioning",date:"Jul 2026 – Sekarang",cat:"Data",icon:"🛡️",img:"sas.png",
   desc:"Sistem fraud decisioning untuk Bank BRI. Saya terlibat dalam pengembangan alur data dan logika pendukung keputusan fraud.",link:"",label:"Lihat project"},
  {title:"VTO Thrift Shop",date:"2026",cat:"Website",icon:"👕",img:"VTO.jpeg",
   desc:"Website thrift fashion dengan Virtual Try-On berbasis image overlay untuk mencoba pakaian, menambah ke keranjang, dan memesan. Admin mengelola produk dan pesanan lewat dashboard.",link:"",label:"Lihat project"},
  {title:"SIM Penjualan PT Surya Timur Makmur",date:"2026",cat:"Website",icon:"🏢",img:"sur.jpeg",
   desc:"SIM penjualan berbasis web untuk PT Surya Timur Makmur (Pascoy, Montiss, Paseo) yang menggantikan laporan manual distributor dengan pelaporan digital real-time. Distributor menginput penjualan, Sales Manager menganalisis tren lewat dashboard, dan Admin mengelola pengguna serta validitas data.",link:"",label:"Lihat project"}
];
const MIN_SLOTS=4; // jumlah kartu minimal; sisanya jadi kartu kosong

/* render projects */
const pg=document.getElementById('pg'),flt=document.getElementById('flt');
let cur='Semua';
function render(){
  const list=PROJECTS.filter(p=>cur==='Semua'||p.cat===cur);
  pg.innerHTML=list.map(p=>`<article class="proj rv in"><div class="thumb">${p.img?`<img src="${p.img}" alt="${p.title}" loading="lazy">`:p.icon||'💻'}</div><div class="pbody"><time>${p.date}</time><h3>${p.title}</h3><p>${p.desc}</p>${p.link?`<a class="btn ghost" href="${p.link}" target="_blank" rel="noopener">${p.label||'Lihat project'}</a>`:''}</div></article>`).join('');
  if(cur==='Semua'){for(let i=list.length;i<MIN_SLOTS;i++)pg.insertAdjacentHTML('beforeend','<article class="proj empty"><span class="plus">+</span><b>Project berikutnya</b><span>Slot kosong, isi lewat array PROJECTS</span></article>');}
}
function filters(){
  const cats=['Semua',...new Set(PROJECTS.map(p=>p.cat))];
  flt.innerHTML=cats.map(c=>`<button class="${c===cur?'on':''}">${c}</button>`).join('');
  flt.querySelectorAll('button').forEach(b=>b.onclick=()=>{cur=b.textContent;filters();render();});
}
filters();render();

/* typing */
const words=["Full-Stack Web Developer","Cloud & API Engineer","QA Tester"];
const tp=document.getElementById('type');let wi=0,ci=0,del=false;
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
(function tick(){
  const w=words[wi];
  if(rm){tp.textContent=w;return}
  tp.textContent=w.slice(0,ci);
  if(!del&&ci===w.length){del=true;return setTimeout(tick,1600)}
  if(del&&ci===0){del=false;wi=(wi+1)%words.length}
  ci+=del?-1:1;setTimeout(tick,del?40:90);
})();

/* nav */
const hd=document.getElementById('hd'),mn=document.getElementById('mn'),bg=document.getElementById('bg');
addEventListener('scroll',()=>hd.classList.toggle('solid',scrollY>20),{passive:true});
bg.onclick=()=>{const o=mn.classList.toggle('open');bg.setAttribute('aria-expanded',o);bg.textContent=o?'✕':'☰'};
mn.querySelectorAll('a').forEach(a=>a.onclick=()=>{mn.classList.remove('open');bg.textContent='☰'});
const links=[...mn.querySelectorAll('a[href^="#"]')];
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('main section[id]').forEach(s=>spy.observe(s));

/* reveal + counters */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('in');io.unobserve(e.target);
  e.target.querySelectorAll('[data-n]').forEach(c=>{const n=+c.dataset.n;let i=0;const t=setInterval(()=>{c.textContent=++i+'+';if(i>=n)clearInterval(t)},300)})
}),{threshold:.15});
document.querySelectorAll('.rv:not(.in)').forEach(el=>io.observe(el));

/* foto: isi src #photo dengan foto kamu, lalu hapus atribut hidden */
const ph=document.getElementById('photo');if(ph.getAttribute('src')){ph.hidden=false;document.querySelector('.ini').hidden=true}
document.getElementById('yr').textContent=new Date().getFullYear();
