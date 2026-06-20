/* Klasa bohatera (do sortowania na liście kafelkowej).
   Klasy: Tank, Wojownik, Zabójca, Mag, Strzelec, Wsparcie */
const CHAMP_CLASS = {
  "aatrox": "Wojownik", "ahri": "Mag", "akali": "Zabójca", "akshan": "Strzelec",
  "alistar": "Tank", "ambessa": "Wojownik", "amumu": "Tank", "annie": "Mag",
  "ashe": "Strzelec", "aurelion-sol": "Mag", "aurora": "Mag", "bard": "Wsparcie",
  "blitzcrank": "Wsparcie", "brand": "Mag", "braum": "Tank", "caitlyn": "Strzelec",
  "camille": "Wojownik", "corki": "Strzelec", "darius": "Wojownik", "diana": "Zabójca",
  "dr-mundo": "Tank", "draven": "Strzelec", "ekko": "Zabójca", "evelynn": "Zabójca",
  "ezreal": "Strzelec", "fiddlesticks": "Mag", "fiora": "Wojownik", "fizz": "Zabójca",
  "galio": "Tank", "garen": "Wojownik", "gnar": "Wojownik", "gragas": "Mag",
  "graves": "Strzelec", "gwen": "Wojownik", "hecarim": "Wojownik", "heimerdinger": "Mag",
  "irelia": "Wojownik", "janna": "Wsparcie", "jarvan-iv": "Wojownik", "jax": "Wojownik",
  "jayce": "Wojownik", "jhin": "Strzelec", "jinx": "Strzelec", "ksante": "Tank",
  "kaisa": "Strzelec", "kalista": "Strzelec", "karma": "Wsparcie", "kassadin": "Zabójca",
  "katarina": "Zabójca", "kayle": "Wojownik", "kayn": "Zabójca", "kennen": "Mag",
  "khazix": "Zabójca", "kindred": "Strzelec", "kogmaw": "Strzelec", "lee-sin": "Wojownik",
  "leona": "Tank", "lillia": "Mag", "lissandra": "Mag", "lucian": "Strzelec",
  "lulu": "Wsparcie", "lux": "Mag", "malphite": "Tank", "maokai": "Tank",
  "master-yi": "Zabójca", "mel": "Mag", "milio": "Wsparcie", "miss-fortune": "Strzelec",
  "mordekaiser": "Wojownik", "morgana": "Mag", "nami": "Wsparcie", "nasus": "Wojownik",
  "nautilus": "Tank", "nidalee": "Zabójca", "nilah": "Strzelec", "nocturne": "Zabójca",
  "norra": "Mag", "nunu-amp-willump": "Tank", "olaf": "Wojownik", "orianna": "Mag",
  "ornn": "Tank", "pantheon": "Wojownik", "poppy": "Tank", "pyke": "Zabójca",
  "rakan": "Wsparcie", "rammus": "Tank", "rell": "Tank", "renekton": "Wojownik",
  "rengar": "Zabójca", "riven": "Wojownik", "rumble": "Mag", "ryze": "Mag",
  "samira": "Strzelec", "senna": "Strzelec", "seraphine": "Mag", "sett": "Wojownik",
  "shen": "Tank", "shyvana": "Wojownik", "singed": "Tank", "sion": "Tank",
  "sivir": "Strzelec", "skarner": "Wojownik", "smolder": "Strzelec", "sona": "Wsparcie",
  "soraka": "Wsparcie", "swain": "Mag", "syndra": "Mag", "taliyah": "Mag",
  "talon": "Zabójca", "teemo": "Strzelec", "thresh": "Wsparcie", "tristana": "Strzelec",
  "tryndamere": "Wojownik", "twisted-fate": "Mag", "twitch": "Strzelec", "urgot": "Wojownik",
  "varus": "Strzelec", "vayne": "Strzelec", "veigar": "Mag", "velkoz": "Mag",
  "vex": "Mag", "vi": "Wojownik", "viego": "Wojownik", "viktor": "Mag",
  "vladimir": "Mag", "volibear": "Wojownik", "warwick": "Wojownik", "wukong": "Wojownik",
  "xayah": "Strzelec", "xin-zhao": "Wojownik", "yasuo": "Wojownik", "yone": "Wojownik",
  "yuumi": "Wsparcie", "zed": "Zabójca", "zeri": "Strzelec", "ziggs": "Mag",
  "zilean": "Wsparcie", "zoe": "Mag", "zyra": "Mag"
};

/* Awaryjna ikona bohatera z Data Dragon (gdy mobafire nie odpowie) */
const DD_SPECIAL = {
  "wukong": "MonkeyKing", "nunu-amp-willump": "Nunu", "dr-mundo": "DrMundo",
  "jarvan-iv": "JarvanIV", "ksante": "KSante", "kogmaw": "KogMaw",
  "miss-fortune": "MissFortune", "master-yi": "MasterYi", "lee-sin": "LeeSin",
  "twisted-fate": "TwistedFate", "aurelion-sol": "AurelionSol", "xin-zhao": "XinZhao",
  "renata-glasc": "Renata", "bel-veth": "Belveth"
};
function ddragonIconUrl(slug) {
  const id = DD_SPECIAL[slug] ||
    slug.split("-").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join("");
  return `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${id}.png`;
}
/* Łańcuch fallbacku ikony: mobafire -> Data Dragon -> litera */
function attachIconFallback(imgEl, container, slug, letter) {
  let stage = 0;
  imgEl.addEventListener("error", function handler() {
    if (stage === 0) { stage = 1; imgEl.src = ddragonIconUrl(slug); return; }
    container.classList.add("icon-fallback");
    container.textContent = letter;
  });
}
