// ===== EDIT YOUR CONTENT HERE =====
const CFG = {
  captions: ["Our first trip","Coffee date","Sunset with you","Silly us"],
  // Paste your Spotify link here (track, album or playlist). Leave "" to use song.mp3 instead.
  spotifyUrl: "https://open.spotify.com/track/7syPkLWA4AjH2jto6FDjEC",
  songTitle: "PORZAX \u2013 New Remix",
  letter: [
    "Dear Love,",
    "Today is all about you… and I just want you to know how grateful I am to have you in my life.",
    "You make ordinary moments feel special just by being you. With you, I feel understood, supported, and deeply loved.",
    "I love you more than words can say."
  ],
  signature: "Forever yours"
};
// Photos: put your images in the img/ folder and list them here
const PHOTOS = ["img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg"];
// ==================================

const $ = s => document.querySelector(s);
const no = $('#no'), yes = $('#yes');
const lines = ["Do you love me? \u2764\uFE0F","try again \uD83D\uDE1D","okay now you\u2019re just playing\u2026","really?! click YES \uD83D\uDE24","fine, there is only YES now \uD83D\uDE0C"];
let tries = 0, scale = 1;

no.onclick = () => {
  tries++; scale += 0.45;
  yes.style.transform = 'scale(' + scale + ')';
  yes.style.margin = (tries * 10) + 'px ' + (tries * 18) + 'px';
  $('#title').textContent = lines[Math.min(tries, lines.length - 1)];
  $('#mouth').setAttribute('d', 'M67 104 Q75 96 83 104');
  if (tries >= 4) no.classList.add('hidden');
  else { no.style.transform = 'scale(' + Math.max(.5, 1 - tries * .15) + ')'; }
};

yes.onclick = () => {
  $('#ask').classList.add('hidden');
  $('#after').classList.remove('hidden');
  $('#title').textContent = 'I knew you\u2019d say yes \uD83D\uDC95';
  $('#mouth').setAttribute('d', 'M62 96 Q75 114 88 96Z');
  $('#eyes').innerHTML = '<path d="M48 84 Q55 76 62 84M88 84 Q95 76 102 84" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/>';
  for (let i = 0; i < 24; i++) setTimeout(heart, i * 120);
};

function heart() {
  const h = document.createElement('div');
  h.className = 'heart';
  h.textContent = ['\u2764\uFE0F','\uD83D\uDC96','\uD83D\uDC97'][Math.floor(Math.random() * 3)];
  h.style.left = Math.random() * 95 + 'vw';
  h.style.fontSize = (16 + Math.random() * 20) + 'px';
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 5200);
}

const SONG = "song.mp3"; // your song file, in the same folder as index.html
let audio, playing = false;
function stopMusic() {
  playing = false;
  if (audio) audio.pause();
  const v = $('.vinyl'); if (v) v.classList.remove('spin');
  const b = $('#play'); if (b) b.textContent = '\u25B6';
}
function startMusic() {
  if (!audio) { audio = new Audio(SONG); audio.loop = true; }
  audio.play().then(() => {
    playing = true;
    const v = $('.vinyl'); if (v) v.classList.add('spin');
    const b = $('#play'); if (b) b.textContent = '\u275A\u275A';
  }).catch(() => {});
}

function photoSVG(i) {
  const c = ['#8fd3f4','#ffd1a9','#c3a6f5','#a8e6cf'][i % 4];
  return '<svg viewBox="0 0 120 150"><rect width="120" height="150" fill="' + c + '"/><circle cx="92" cy="30" r="12" fill="#fff6a8"/><path d="M0 150 L0 100 Q30 78 60 100 T120 96 L120 150Z" fill="#6fcf97"/></svg>';
}

// Turns a normal Spotify link into an embeddable player link
function spotifyEmbed(url) {
  const m = (url || '').match(/open\.spotify\.com\/(?:intl-[a-z-]+\/)?(track|album|playlist|episode|show)\/([A-Za-z0-9]+)/);
  return m ? 'https://open.spotify.com/embed/' + m[1] + '/' + m[2] : '';
}

function show(g) {
  stopMusic();
  const v = $('#view');
  if (g === '1') {
    const rot = ['-4deg','3deg','2deg','-3deg'];
    v.innerHTML = '<div class="panel"><div class="photos">' + CFG.captions.map((c, i) =>
      '<figure style="--r:' + rot[i % 4] + '">' + (PHOTOS[i] ? '<img src="' + PHOTOS[i] + '" style="width:100%;display:block" alt="">' : photoSVG(i)) +
      '<figcaption style="font-size:.7rem;color:#555;margin-top:6px">' + c + '</figcaption></figure>').join('') +
      '</div><p class="cap">Captured memories</p></div>';
  } else if (g === '2') {
    const sp = spotifyEmbed(CFG.spotifyUrl);
    if (sp) {
      v.innerHTML = '<div class="panel"><p style="margin:0 0 12px;color:var(--ink);font-weight:600">' + CFG.songTitle + '</p>' +
        '<iframe title="Spotify" src="' + sp + '" width="100%" height="152" style="border:0;border-radius:12px" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>';
    } else {
      v.innerHTML = '<div class="panel"><p style="margin:0 0 12px;color:var(--ink);font-weight:600">' + CFG.songTitle + '</p>' +
        '<div class="player"><div class="vinyl"></div><button id="play">\u25B6</button></div></div>';
      $('#play').onclick = () => playing ? stopMusic() : startMusic();
    }
  } else {
    const lips = Array.from({length: 8}, () => '<span class="lips" style="left:' + Math.random() * 90 + '%;top:' + Math.random() * 90 + '%;transform:rotate(' + (Math.random() * 60 - 30) + 'deg)">\uD83D\uDC8B</span>').join('');
    v.innerHTML = '<div class="letter">' + lips + CFG.letter.map(t => '<p>' + t + '</p>').join('') + '<p class="sig">' + CFG.signature + '</p></div>';
  }
  v.scrollIntoView({behavior: 'smooth', block: 'nearest'});
}

document.querySelectorAll('.gift').forEach(b => b.onclick = () => { b.classList.add('done'); show(b.dataset.g); });