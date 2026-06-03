// ================================================
//  WebGIS Persebaran SMA Negeri Lampung Tengah
//  Simpan di: Assets/JS_Map/map.js
// ================================================


// ── 1. Inisialisasi Peta ──
var map = L.map('map', {
  center: [-4.9500, 105.2000],
  zoom: 10,
  zoomControl: false
});

L.control.zoom({ position: 'bottomright' }).addTo(map);
L.control.scale({ imperial: false, position: 'bottomright' }).addTo(map);


// ── 2. Basemap ──
var basemaps = {
  street: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap', maxZoom: 19
  }),
  satelit: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© Esri World Imagery', maxZoom: 19
  }),
  topo: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenTopoMap', maxZoom: 17
  })
};

basemaps.street.addTo(map);
var layerAktif = 'street';


// ── 3. Ganti Basemap ──
document.querySelectorAll('.map-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var pilihan = btn.dataset.layer;
    if (pilihan === layerAktif) return;
    map.removeLayer(basemaps[layerAktif]);
    basemaps[pilihan].addTo(map);
    layerAktif = pilihan;
    document.querySelectorAll('.map-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
  });
});


// ── 4. Data SMA Negeri Lampung Tengah ──
var dataSekolah = [
  { no:1,  nama:"SMA Negeri 1 Gunung Sugih",   kecamatan:"Gunung Sugih",    lat:-4.9832, lng:105.2048 },
  { no:2,  nama:"SMA Negeri 1 Terbanggi Besar", kecamatan:"Terbanggi Besar", lat:-4.9832, lng:105.2116 },
  { no:3,  nama:"SMA Negeri 1 Kalirejo",         kecamatan:"Kalirejo",        lat:-5.2005, lng:104.9639 },
  { no:4,  nama:"SMA Negeri 1 Seputih Banyak",  kecamatan:"Seputih Banyak",  lat:-4.8433, lng:105.4446 },
  { no:5,  nama:"SMA Negeri 1 Kota Gajah",      kecamatan:"Kota Gajah",      lat:-4.9835, lng:105.3295 },
  { no:6,  nama:"SMA Negeri 1 Seputih Raman",   kecamatan:"Seputih Raman",   lat:-4.8999, lng:105.3832 },
  { no:7,  nama:"SMA Negeri 1 Punggur",          kecamatan:"Punggur",         lat:-5.0721, lng:105.2812 },
  { no:8,  nama:"SMA Negeri 1 Trimurjo",         kecamatan:"Trimurjo",        lat:-5.1150, lng:105.2523 },
  { no:9,  nama:"SMA Negeri 1 Padang Ratu",      kecamatan:"Padang Ratu",     lat:-5.0628, lng:104.9740 },
  { no:10, nama:"SMA Negeri 1 Bangunrejo",       kecamatan:"Bangunrejo",      lat:-5.1678, lng:105.0132 },
  { no:11, nama:"SMA Negeri 1 Pubian",           kecamatan:"Pubian",          lat:-5.1004, lng:104.9667 },
  { no:12, nama:"SMA Negeri 1 Sendang Agung",    kecamatan:"Sendang Agung",   lat:-5.2029, lng:104.9001 },
  { no:13, nama:"SMA Negeri 1 Anak Tuha",        kecamatan:"Anak Tuha",       lat:-4.9737, lng:105.0668 },
  { no:14, nama:"SMA Negeri 1 Seputih Agung",    kecamatan:"Seputih Agung",   lat:-4.9575, lng:105.1597 },
  { no:15, nama:"SMA Negeri 1 Bandar Mataram",   kecamatan:"Bandar Mataram",  lat:-4.8734, lng:105.4620 },
  { no:16, nama:"SMA Negeri 1 Bumi Nabung",      kecamatan:"Bumi Nabung",     lat:-4.6926, lng:105.5537 },
  { no:17, nama:"SMA Negeri 1 Sendang Agung",    kecamatan:"Sendang Agung",   lat:-5.2029, lng:104.9001 },
  { no:18, nama:"SMA Negeri 1 Way Pengubuan",    kecamatan:"Way Pengubuan",   lat:-4.8734, lng:105.0678 },
  { no:19, nama:"SMA Negeri 1 Anak Ratu Aji",    kecamatan:"Anak Ratu Aji",   lat:-4.9293, lng:104.9377 },
  { no:20, nama:"SMA Negeri 1 Terusan Nunyai",   kecamatan:"Terusan Nunyai",  lat:-4.7661, lng:105.2222 },
  { no:21, nama:"SMA Negeri 1 Seputih Mataram",  kecamatan:"Seputih Mataram", lat:-4.8495, lng:105.3096 },
  { no:22, nama:"SMA Negeri 1 Rumbia",           kecamatan:"Rumbia",          lat:-4.7862, lng:105.5534 },
  { no:23, nama:"SMA Negeri 1 Putra Rumbia",     kecamatan:"Putra Rumbia",    lat:-4.7862, lng:105.5534 },
  { no:24, nama:"SMA Negeri Way Seputih",        kecamatan:"Way Seputih",     lat:-4.8039, lng:105.4141 },
];


// ── 5. Custom Marker ──
function buatIcon(aktif) {
  var warna = aktif ? '#f59e0b' : '#7c3aed';
  return L.divIcon({
    className: '',
    html:
      '<div style="' +
        'width:28px;height:28px;' +
        'background:' + warna + ';' +
        'border:3px solid white;' +
        'border-radius:50% 50% 50% 0;' +
        'transform:rotate(-45deg);' +
        'box-shadow:0 2px 8px rgba(0,0,0,0.3);' +
      '"></div>',
    iconSize:    [28, 28],
    iconAnchor:  [14, 28],
    popupAnchor: [0, -30]
  });
}


// ── 6. Variabel Global ──
var semuaMarker = [];
var markerAktif = null;
var listEl      = document.getElementById('school-list');
var tabelEl     = document.getElementById('tabel-body');


// ── 7. Update Statistik Header ──
document.getElementById('total-sekolah').textContent = dataSekolah.length;
var kecUnik = dataSekolah.map(function(s){ return s.kecamatan; })
  .filter(function(v, i, a){ return a.indexOf(v) === i; });
document.getElementById('total-kec').textContent = kecUnik.length;


// ── 8. Render Marker, Sidebar & Tabel ──
dataSekolah.forEach(function(s, i) {

  // Marker
  var marker = L.marker([s.lat, s.lng], { icon: buatIcon(false) })
    .addTo(map)
    .bindPopup(
      '<div class="isi-popup">' +
        '<strong>🏫 ' + s.nama + '</strong>' +
        '<span>📍 Kec. ' + s.kecamatan + '</span>' +
      '</div>'
    );

  // Klik marker
  marker.on('click', function() {
    semuaMarker.forEach(function(m) { m.setIcon(buatIcon(false)); });
    marker.setIcon(buatIcon(true));
    markerAktif = marker;

    document.querySelectorAll('#school-list li').forEach(function(li) { li.classList.remove('aktif'); });
    var liAktif = document.querySelector('#school-list li[data-i="' + i + '"]');
    if (liAktif) {
      liAktif.classList.add('aktif');
      liAktif.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    document.getElementById('dp-nama').textContent = s.nama;
    document.getElementById('dp-body').innerHTML =
      '<div class="dp-row"><span class="dp-lbl">No. Urut</span><span class="dp-val">'  + s.no        + '</span></div>' +
      '<div class="dp-row"><span class="dp-lbl">Kecamatan</span><span class="dp-val">' + s.kecamatan + '</span></div>' +
      '<div class="dp-row"><span class="dp-lbl">Latitude</span><span class="dp-val">'  + s.lat       + '</span></div>' +
      '<div class="dp-row"><span class="dp-lbl">Longitude</span><span class="dp-val">' + s.lng       + '</span></div>';

    document.getElementById('detail-panel').classList.remove('hidden');
  });

  semuaMarker.push(marker);

  // Sidebar
  var li = document.createElement('li');
  li.dataset.i = i;
  li.innerHTML = '🏫 ' + s.nama + '<span class="nama-kec">Kec. ' + s.kecamatan + '</span>';
  li.addEventListener('click', function() {
    map.setView([s.lat, s.lng], 15);
    marker.openPopup();
    marker.fire('click');
  });
  listEl.appendChild(li);

  // Tabel
  tabelEl.innerHTML +=
    '<tr>' +
    '<td>' + s.no + '</td>' +
    '<td><strong>' + s.nama + '</strong></td>' +
    '<td>' + s.kecamatan + '</td>' +
    '<td>' + s.lat + '</td>' +
    '<td>' + s.lng + '</td>' +
    '</tr>';
});

// Fit bounds ke semua marker
var group = new L.featureGroup(semuaMarker);
map.fitBounds(group.getBounds().pad(0.12));


// ── 9. Tutup Panel ──
document.getElementById('close-panel').addEventListener('click', function() {
  document.getElementById('detail-panel').classList.add('hidden');
  if (markerAktif) { markerAktif.setIcon(buatIcon(false)); markerAktif = null; }
  document.querySelectorAll('#school-list li').forEach(function(li) { li.classList.remove('aktif'); });
});


// ── 10. Pencarian ──
document.getElementById('search-input').addEventListener('input', function() {
  var keyword = this.value.toLowerCase();
  document.querySelectorAll('#school-list li').forEach(function(li) {
    li.classList.toggle('tersembunyi', !li.textContent.toLowerCase().includes(keyword));
  });
});


// ── 11. Koordinat Klik Peta ──
map.on('click', function(e) {
  document.getElementById('koordinat-bar').textContent =
    '📌 Lat: ' + e.latlng.lat.toFixed(5) + ' | Lng: ' + e.latlng.lng.toFixed(5);
});
