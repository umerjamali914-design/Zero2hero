// Curriculum data for ZERO TO HERO
// 12 stages, 300+ progressive micro-levels
// Audio files are in /audio/ with filenames derived from the roman text

function slug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function item(roman, urdu, hint) {
  return { id: slug(roman), roman, urdu, hint };
}

// Helper to generate letter practice levels
function letterLevels() {
  const letters = [
    { key: 'a', name: 'A', sound: 'alif', example: 'ab', urduExample: 'اب', word: 'now' },
    { key: 'b', name: 'B', sound: 'bay', example: 'baba', urduExample: 'بابا', word: 'father' },
    { key: 'c', name: 'C', sound: 'seen', example: 'chai', urduExample: 'چائے', word: 'tea' },
    { key: 'd', name: 'D', sound: 'daal', example: 'din', urduExample: 'دن', word: 'day' },
    { key: 'e', name: 'E', sound: 'ee', example: 'ek', urduExample: 'ایک', word: 'one' },
    { key: 'f', name: 'F', sound: 'fay', example: 'phal', urduExample: 'پھل', word: 'fruit' },
    { key: 'g', name: 'G', sound: 'gaaf', example: 'gaana', urduExample: 'گانا', word: 'song' },
    { key: 'h', name: 'H', sound: 'hay', example: 'haan', urduExample: 'ہاں', word: 'yes' },
    { key: 'i', name: 'I', sound: 'ee (chhoti)', example: 'dil', urduExample: 'دل', word: 'heart' },
    { key: 'j', name: 'J', sound: 'jeem', example: 'jaan', urduExample: 'جان', word: 'life' },
    { key: 'k', name: 'K', sound: 'kaaf', example: 'kaam', urduExample: 'کام', word: 'work' },
    { key: 'l', name: 'L', sound: 'laam', example: 'laal', urduExample: 'لال', word: 'red' },
    { key: 'm', name: 'M', sound: 'meem', example: 'maa', urduExample: 'ماں', word: 'mother' },
    { key: 'n', name: 'N', sound: 'noon', example: 'naam', urduExample: 'نام', word: 'name' },
    { key: 'o', name: 'O', sound: 'wao', example: 'gol', urduExample: 'گول', word: 'round' },
    { key: 'p', name: 'P', sound: 'pay', example: 'paani', urduExample: 'پانی', word: 'water' },
    { key: 'q', name: 'Q', sound: 'qaaf', example: 'qalam', urduExample: 'قلم', word: 'pen' },
    { key: 'r', name: 'R', sound: 'ray', example: 'raat', urduExample: 'رات', word: 'night' },
    { key: 's', name: 'S', sound: 'seen', example: 'saal', urduExample: 'سال', word: 'year' },
    { key: 't', name: 'T', sound: 'tay', example: 'taala', urduExample: 'تالا', word: 'lock' },
    { key: 'u', name: 'U', sound: 'ao', example: 'umr', urduExample: 'عمر', word: 'age' },
    { key: 'v', name: 'V', sound: 'vay', example: 'vardi', urduExample: 'وردی', word: 'uniform' },
    { key: 'w', name: 'W', sound: 'wao', example: 'waqt', urduExample: 'وقت', word: 'time' },
    { key: 'x', name: 'X', sound: 'x', example: 'xyz', urduExample: 'xyz', word: 'xyz' },
    { key: 'y', name: 'Y', sound: 'yay', example: 'yaad', urduExample: 'یاد', word: 'memory' },
    { key: 'z', name: 'Z', sound: 'zay', example: 'zameen', urduExample: 'زمین', word: 'land' },
  ];
  return letters;
}

// ============ STAGE DEFINITIONS ============
export const stages = [
  { id: 1,  name: 'Keyboard Bunyad',       tagline: 'Keyboard kya hai, bara aur chhota harf' },
  { id: 2,  name: 'Haroof ke Naam',        tagline: 'Sab 26 harf, bara aur chhota' },
  { id: 3,  name: 'Haroof ki Awazein',     tagline: 'Har harf ki awaz, misaal ke saath' },
  { id: 4,  name: 'Phonics Master',        tagline: 'Vowels, consonants, shuru aur aakhri awazein' },
  { id: 5,  name: 'Lafz Jodo',             tagline: 'Do, teen aur chaar harf jodo' },
  { id: 6,  name: 'Syllable',              tagline: 'Lafz ko hisson mein todo aur jodo' },
  { id: 7,  name: 'Lafz Master',           tagline: 'Aasan se mushkil Roman Urdu lafz' },
  { id: 8,  name: 'Box Game',              tagline: 'Khali dabbe sahi harfon se bharo' },
  { id: 9,  name: 'Lafz Todo',             tagline: 'Lafz ko todo aur phir jodo' },
  { id: 10, name: 'Jumlay',                tagline: 'Chhote sahi jumlay banao aur likho' },
  { id: 11, name: 'Mazahiya aur Islami',   tagline: 'Hansne wale aur pyare Islami jumlay' },
  { id: 12, name: 'Islami Kahaniyan',      tagline: 'Lambe kissa, sawal aur imla' },
];

// ============ LEVEL DEFINITIONS ============
const levels = [];

// --- STAGE 1: Haroof (Keyboard Introduction) ---
// Levels 1-30: Letter groups + individual letter practice
levels.push({ id: 1, stage: 1, title: 'Keyboard', subtitle: 'Keyboard kya hai?', mode: 'intro',
  intro: 'Keyboard aik aisi machine hai jis se hum likhte hain. Is mein 26 English haroof hote hain — A se Z tak. Aao inse milte hain!',
  letters: letterLevels().slice(0, 6).map(l => ({ key: l.key, sound: l.sound, example: l.example })),
  items: [item('ab', 'اب', 'now'), item('baba', 'بابا', 'father'), item('aap', 'آپ', 'you')] });

levels.push({ id: 2, stage: 1, title: 'Bara Harf', subtitle: 'Capital letters A-Z', mode: 'letter',
  intro: 'Bara harf ya capital letter shuru mein aata hai jaise naam mein. Practice karo: A B C D E F.',
  letters: letterLevels().slice(0, 6),
  items: [item('AB', 'اے بی', 'capital A B'), item('CD', 'سی ڈی', 'capital C D'), item('EF', 'ای ایف', 'capital E F')] });

levels.push({ id: 3, stage: 1, title: 'Chhota Harf', subtitle: 'Small letters a-z', mode: 'letter',
  intro: 'Chhota harf ya small letter baqi jagah use hota hai. Practice karo: a b c d e f.',
  letters: letterLevels().slice(0, 6),
  items: [item('ab', 'اے بی', 'small a b'), item('cd', 'سی ڈی', 'small c d'), item('ef', 'ای ایف', 'small e f')] });

// Individual letter levels (3 letters per level for efficiency, covering A-Z)
const letterGroups = [
  ['a','b','c'], ['d','e','f'], ['g','h','i'], ['j','k','l'], ['m','n','o'],
  ['p','q','r'], ['s','t','u'], ['v','w','x'], ['y','z'],
];
letterGroups.forEach((grp, i) => {
  const letters = letterLevels().filter(l => grp.includes(l.key));
  const itemsList = letters.map(l => item(l.example, l.urduExample, l.word));
  levels.push({
    id: 4 + i, stage: 1,
    title: grp.map(g => g.toUpperCase()).join(' · '),
    subtitle: `Haroof ${grp.join(', ')}`,
    mode: 'copy',
    intro: `Aao ${grp.join(', ')} haroof seekhte hain. Har harf ki awaz suno aur type karo.`,
    letters: letters.map(l => ({ key: l.key, sound: l.sound, example: l.example })),
    items: itemsList,
  });
});

// Extra practice + dictation focus levels for Stage 1
levels.push({ id: 13, stage: 1, title: 'Milke likho', subtitle: 'Bara aur chhota', mode: 'copy',
  intro: 'Bara aur chhota harf ka farq seekho. Naam bara se, baaki chhota se.',
  items: [item('Ammi', 'امی', 'mother'), item('Abbu', 'ابو', 'father'), item('Baba', 'بابا', 'father'), item('Dada', 'دادا', 'grandfather'), item('Chacha', 'چچا', 'uncle')] });

levels.push({ id: 14, stage: 1, title: 'Pehchano', subtitle: 'Haroof pehchanno', mode: 'copy',
  intro: 'Haroof ko pehchanno aur likho. Awaz suno, lafz dekho, aur type karo.',
  items: [item('ab', 'اب', 'now'), item('din', 'دن', 'day'), item('dil', 'دل', 'heart'), item('naam', 'نام', 'name'), item('kaam', 'کام', 'work')] });

levels.push({ id: 15, stage: 1, title: 'Imtihan 1', subtitle: 'Pehla exam', mode: 'exam',
  intro: 'Pehle 14 levels ka imtihan! Pass ho kar agla stage kholo.',
  items: [item('ab', 'اب', 'now'), item('din', 'دن', 'day'), item('naam', 'نام', 'name'), item('kaam', 'کام', 'work'), item('dil', 'دل', 'heart'), item('baba', 'بابا', 'father'), item('haan', 'ہاں', 'yes'), item('gol', 'گول', 'round')] });

// --- STAGE 2: Awazein (Letter Sounds) ---
levels.push({ id: 16, stage: 2, title: 'a · b · p', subtitle: 'Pehli teen awazein', mode: 'copy',
  intro: 'Roman Urdu mein hum Urdu ki awazein English haroof se likhte hain. \'a\' alif ki awaz hai, \'b\' bay ki, aur \'p\' pay ki.',
  letters: [{key:'a',sound:'alif — a',example:'ab'},{key:'b',sound:'bay — b',example:'baba'},{key:'p',sound:'pay — p',example:'paani'}],
  items: [item('ab','اب','now'),item('baba','بابا','father'),item('paani','پانی','water'),item('baap','باپ','father'),item('aap','آپ','you')] });

levels.push({ id: 17, stage: 2, title: 't · d · n', subtitle: 'Zabaan ki awazein', mode: 'copy',
  intro: '\'t\' tay ki awaz hai, \'d\' daal ki, aur \'n\' noon ki. Lambi \'aa\' ke liye do \'a\' likhte hain: naam, taala.',
  letters: [{key:'t',sound:'tay — t',example:'taala'},{key:'d',sound:'daal — d',example:'din'},{key:'n',sound:'noon — n',example:'naam'}],
  items: [item('naam','نام','name'),item('din','دن','day'),item('taala','تالا','lock'),item('dana','دانہ','grain'),item('tan','تن','body')] });

levels.push({ id: 18, stage: 2, title: 'm · l · r', subtitle: 'Naram awazein', mode: 'copy',
  intro: '\'m\' meem, \'l\' laam, aur \'r\' ray ki awaz hai. Chhoti \'i\' ke liye sirf \'i\' likhte hain: dil.',
  letters: [{key:'m',sound:'meem — m',example:'mala'},{key:'l',sound:'laam — l',example:'laal'},{key:'r',sound:'ray — r',example:'raat'}],
  items: [item('mala','مالا','necklace'),item('laal','لال','red'),item('raat','رات','night'),item('mor','مور','peacock'),item('dil','دل','heart')] });

levels.push({ id: 19, stage: 2, title: 'k · g · h', subtitle: 'Galay ki awazein', mode: 'copy',
  intro: '\'k\' kaaf, \'g\' gaaf, aur \'h\' hay ki awaz hai. \'o\' ki awaz ke liye \'o\' likhte hain: gol.',
  letters: [{key:'k',sound:'kaaf — k',example:'kaam'},{key:'g',sound:'gaaf — g',example:'gaana'},{key:'h',sound:'hay — h',example:'haan'}],
  items: [item('kaam','کام','work'),item('gaana','گانا','song'),item('haan','ہاں','yes'),item('kal','کل','tomorrow'),item('gol','گول','round')] });

levels.push({ id: 20, stage: 2, title: 's · sh · ch', subtitle: 'Do haroof, aik awaz', mode: 'copy',
  intro: 'Kuch awazein do English haroof se banti hain. \'sh\' sheen ki awaz hai aur \'ch\' chay ki. \'s\' seen ki awaz hai.',
  letters: [{key:'s',sound:'seen — s',example:'saal'},{key:'sh',sound:'sheen — sh',example:'shaam'},{key:'ch',sound:'chay — ch',example:'chaand'}],
  items: [item('saal','سال','year'),item('shaam','شام','evening'),item('chaand','چاند','moon'),item('sach','سچ','truth'),item('shor','شور','noise')] });

levels.push({ id: 21, stage: 2, title: 'kh · gh · z', subtitle: 'Gehri awazein', mode: 'copy',
  intro: '\'kh\' khay ki awaz hai (jaise khaana), \'gh\' ghain ki (jaise ghar), aur \'z\' zay ki awaz hai.',
  letters: [{key:'kh',sound:'khay — kh',example:'khaana'},{key:'gh',sound:'ghain — gh',example:'ghar'},{key:'z',sound:'zay — z',example:'zameen'}],
  items: [item('khaana','کھانا','food'),item('ghar','گھر','home'),item('zameen','زمین','ground'),item('khwaab','خواب','dream'),item('zaroori','ضروری','important')] });

levels.push({ id: 22, stage: 2, title: 'f · v · w', subtitle: 'Honth ki awazein', mode: 'copy',
  intro: '\'f\' fay, \'v\' vay, aur \'w\' wao ki awaz hai.',
  letters: [{key:'f',sound:'fay — f',example:'phal'},{key:'v',sound:'vay — v',example:'vardi'},{key:'w',sound:'wao — w',example:'waqt'}],
  items: [item('phal','پھل','fruit'),item('waqt','وقت','time'),item('fila','فلا','fila'),item('dawa','دوا','medicine'),item('hawa','ہوا','wind')] });

levels.push({ id: 23, stage: 2, title: 'j · q · x', subtitle: 'Baqi awazein', mode: 'copy',
  intro: '\'j\' jeem, \'q\' qaaf, aur \'x\' ki awaz seekhte hain.',
  letters: [{key:'j',sound:'jeem — j',example:'jaan'},{key:'q',sound:'qaaf — q',example:'qalam'},{key:'x',sound:'x — x',example:'tax'}],
  items: [item('jaan','جان','life'),item('qalam','قلم','pen'),item('jaadu','جادو','magic'),item('daqiy','دقیق','exact'),item('jahez','جہیز','dowry')] });

levels.push({ id: 24, stage: 2, title: 'Lambi Awaz', subtitle: 'aa · ee · oo', mode: 'copy',
  intro: 'Lambi awaz ke liye do haroof likhte hain: aa (aam), ee (neend), oo (doodh).',
  letters: [{key:'aa',sound:'lambi alif',example:'aam'},{key:'ee',sound:'lambi yay',example:'neend'},{key:'oo',sound:'lambi wao',example:'doodh'}],
  items: [item('aam','آم','mango'),item('neend','نیند','sleep'),item('doodh','دودھ','milk'),item('meethi','میٹھی','sweet'),item('phool','پھول','flower')] });

levels.push({ id: 25, stage: 2, title: 'Imtihan 2', subtitle: 'Awazoon ka exam', mode: 'exam',
  intro: 'Stage 2 ka imtihan! Sab awazein test hongi.',
  items: [item('naam','نام','name'),item('kaam','کام','work'),item('shaam','شام','evening'),item('chaand','چاند','moon'),item('khaana','کھانا','food'),item('ghar','گھر','home'),item('zameen','زمین','ground'),item('doodh','دودھ','milk')] });

// --- STAGE 3: Phonics Master Class ---
levels.push({ id: 26, stage: 3, title: 'Short Vowels', subtitle: 'a · e · i · o · u', mode: 'copy',
  intro: 'Chhoti awazein: a (ab), e (ek), i (dil), o (gol), u (umr). Inhe short vowels kehte hain.',
  items: [item('ab','اب','now'),item('ek','ایک','one'),item('dil','دل','heart'),item('gol','گول','round'),item('umr','عمر','age')] });

levels.push({ id: 27, stage: 3, title: 'Long Vowels', subtitle: 'aa · ee · oo', mode: 'copy',
  intro: 'Lambi awazein do haroof se: aa (aam), ee (neend), oo (doodh).',
  items: [item('aam','آم','mango'),item('neend','نیند','sleep'),item('doodh','دودھ','milk'),item('kaala','کالا','black'),item('peela','پیلا','yellow')] });

levels.push({ id: 28, stage: 3, title: 'Shuru Awaz', subtitle: 'Beginning sounds', mode: 'copy',
  intro: 'Lafz ke shuru ki awaz pehchano: kaam (k), din (d), raat (r).',
  items: [item('kaam','کام','work'),item('din','دن','day'),item('raat','رات','night'),item('maa','ماں','mother'),item('saal','سال','year')] });

levels.push({ id: 29, stage: 3, title: 'Darmiani Awaz', subtitle: 'Middle sounds', mode: 'copy',
  intro: 'Lafz ke beech ki awaz pehchano: naam (aa), dil (i), gol (o).',
  items: [item('naam','نام','name'),item('dil','دل','heart'),item('gol','گول','round'),item('saal','سال','year'),item('kaam','کام','work')] });

levels.push({ id: 30, stage: 3, title: 'Aakhri Awaz', subtitle: 'Ending sounds', mode: 'copy',
  intro: 'Lafz ke aakhir ki awaz pehchano: kaam (m), din (n), raat (t).',
  items: [item('kaam','کام','work'),item('din','دن','day'),item('raat','رات','night'),item('dil','دل','heart'),item('ghar','گھر','home')] });

levels.push({ id: 31, stage: 3, title: 'Milte Julte', subtitle: 'Similar sounds', mode: 'copy',
  intro: 'Milte julte awazein pehchano: p/b (paani/baani), t/d (taala/daal), k/g (kaam/gaana).',
  items: [item('paani','پانی','water'),item('baani','بانी','creator'),item('taala','تالا','lock'),item('daal','دال','lentils'),item('kaam','کام','work')] });

levels.push({ id: 32, stage: 3, title: 'Awaz Milao', subtitle: 'Sound matching', mode: 'copy',
  intro: 'Awaz suno aur lafz milao. Jo awaz sunoge waisa lafz type karo.',
  items: [item('chaand','چاند','moon'),item('shor','شور','noise'),item('khaana','کھانا','food'),item('saal','سال','year'),item('doodh','دودھ','milk')] });

levels.push({ id: 33, stage: 3, title: 'Imtihan 3', subtitle: 'Phonics exam', mode: 'exam',
  intro: 'Stage 3 ka imtihan! Phonics test hoga.',
  items: [item('aam','آم','mango'),item('neend','نیند','sleep'),item('kaam','کام','work'),item('chaand','چاند','moon'),item('khaana','کھانا','food'),item('dil','دل','heart'),item('gol','گول','round'),item('raat','رات','night')] });

// --- STAGE 4: Lafz Jodo (Joining Letters / Small Words) ---
const stage4Themes = [
  { title: 'Ghar', subtitle: 'Ghar ki cheezein', words: [['darwaza','دروازہ','door'],['chhat','چھت','roof'],['bistar','بستر','bed'],['chaadar','چادر','sheet'],['deewar','دیوار','wall']] },
  { title: 'Khaana', subtitle: 'Dastarkhwan ke lafz', words: [['chai','چائے','tea'],['cheeni','چینی','sugar'],['chawal','چاول','rice'],['doodh','دودھ','milk'],['anda','انڈہ','egg']] },
  { title: 'Rang', subtitle: 'Rangon ke naam', words: [['laal','لال','red'],['neela','نیلا','blue'],['peela','پیلا','yellow'],['kaala','کالا','black'],['safaid','سفید','white']] },
  { title: 'Janwar', subtitle: 'Janwaron ke naam', words: [['billi','بلی','cat'],['kutta','کتا','dog'],['bakri','بکری','goat'],['mor','مور','peacock'],['chooha','چوہا','mouse']] },
  { title: 'Khaad', subtitle: 'Khaad ke lafz', words: [['anda','انڈہ','egg'],['aam','آم','mango'],['angoor','انگور','grapes'],['anaar','انار','pomegranate'],['tarbooz','تربوز','watermelon']] },
  { title: 'Waqt', subtitle: 'Waqt ke lafz', words: [['din','دن','day'],['raat','رات','night'],['subah','صبح','morning'],['shaam','شام','evening'],['saal','سال','year']] },
  { title: 'Ginti', subtitle: 'Numbers', words: [['aik','ایک','one'],['do','دو','two'],['chaar','چار','four'],['aath','آٹھ','eight'],['das','دس','ten']] },
  { title: 'Jism', subtitle: 'Body parts', words: [['aankh','آنکھ','eye'],['dil','دل','heart'],['haath','ہاتھ','hand'],['pair','پیر','foot'],['sar','سر','head']] },
  { title: 'Rishtay', subtitle: 'Family words', words: [['maa','ماں','mother'],['baap','باپ','father'],['bhai','بھائی','brother'],['behen','بہن','sister'],['dada','دادا','grandfather']] },
  { title: 'Mausam', subtitle: 'Weather words', words: [['baarish','بارش','rain'],['dhoop','دھوپ','sunshine'],['thand','ٹھنڈ','cold'],['hawa','ہوا','wind'],['badal','بادل','cloud']] },
];

stage4Themes.forEach((theme, i) => {
  levels.push({
    id: 34 + i, stage: 4,
    title: theme.title, subtitle: theme.subtitle, mode: 'copy',
    intro: `Ab poore lafz likhte hain. Har lafz ki awaz suno aur dekh kar type karo.`,
    items: theme.words.map(w => item(w[0], w[1], w[2])),
  });
});

levels.push({ id: 44, stage: 4, title: 'Imtihan 4', subtitle: 'Lafz exam', mode: 'exam',
  intro: 'Stage 4 ka imtihan! Sab lafz test honge.',
  items: [item('darwaza','دروازہ','door'),item('chai','چائے','tea'),item('laal','لال','red'),item('billi','بلی','cat'),item('aam','آم','mango'),item('din','دن','day'),item('aankh','آنکھ','eye'),item('maa','ماں','mother'),item('baarish','بارش','rain'),item('doodh','دودھ','milk')] });

// --- STAGE 5: Syllable Building ---
levels.push({ id: 45, stage: 5, title: 'Do Harf', subtitle: 'Two-letter words', mode: 'copy',
  intro: 'Do harf jod kar chhote lafz banao: ab, is, us, do, na.',
  items: [item('ab','اب','now'),item('is','اس','this'),item('us','اس','that'),item('do','دو','two'),item('na','نہ','no')] });

levels.push({ id: 46, stage: 5, title: 'Teen Harf', subtitle: 'Three-letter words', mode: 'copy',
  intro: 'Teen harf jod kar lafz banao: din, dil, naam, kaam, ghar.',
  items: [item('din','دن','day'),item('dil','دل','heart'),item('naam','نام','name'),item('kaam','کام','work'),item('ghar','گھر','home')] });

levels.push({ id: 47, stage: 5, title: 'Chaar Harf', subtitle: 'Four-letter words', mode: 'copy',
  intro: 'Chaar harf ke lafz: paani, baarish, chhat, shaam, rasta.',
  items: [item('paani','پانی','water'),item('baarish','بارش','rain'),item('chhat','چھت','roof'),item('shaam','شام','evening'),item('rasta','راستہ','path')] });

levels.push({ id: 48, stage: 5, title: 'Syllable Todo', subtitle: 'Break into parts', mode: 'copy',
  intro: 'Lafz ko hisson mein todo: paani = paa-ni, baarish = baa-rish. Phir poora likho.',
  items: [item('paani','پانی','water'),item('baarish','بارش','rain'),item('kitab','کتاب','book'),item('kitaab','کتاب','book'),item('saaldi','سردی','cold')] });

levels.push({ id: 49, stage: 5, title: 'Syllable Jodo', subtitle: 'Join parts', mode: 'copy',
  intro: 'Todo hue hisse jod kar poora lafz banao.',
  items: [item('kitaab','کتاب','book'),item('meena','مینا','name'),item('halwa','حلوہ','sweet'),item('jalebi','جلیبی','sweet'),item('barfi','بریفی','sweet')] });

levels.push({ id: 50, stage: 5, title: 'Imtihan 5', subtitle: 'Syllable exam', mode: 'exam',
  intro: 'Stage 5 ka imtihan!',
  items: [item('din','دن','day'),item('paani','پانی','water'),item('kitab','کتاب','book'),item('shaam','شام','evening'),item('dil','دل','heart'),item('kaam','کام','work'),item('ghar','گھر','home'),item('baarish','بارش','rain')] });

// --- STAGE 6: Lafz Master (Word Master) ---
// Easy words
const easyWords = [['Ma','ماں','mother'],['Na','نہ','no'],['Ab','اب','now'],['Is','اس','this'],['Us','اس','that'],['Do','دو','two'],['Ek','ایک','one'],['Haan','ہاں','yes'],['Nahi','نہیں','no'],['Achha','اچھا','good']];
easyWords.forEach((w, i) => {
  levels.push({ id: 51 + i, stage: 6, title: `Aasan ${i+1}`, subtitle: 'Easy words', mode: 'copy',
    intro: `Aasan lafz seekhte hain. Awaz suno aur type karo.`,
    items: [item(w[0], w[1], w[2]), item(easyWords[(i+1)%easyWords.length][0], easyWords[(i+1)%easyWords.length][1], easyWords[(i+1)%easyWords.length][2])] });
});

// Beginner words
const beginnerWords = [['Pani','پانی','water'],['Ghar','گھر','home'],['Dil','دل','heart'],['Naam','نام','name'],['Roti','روٹی','bread'],['Din','دن','day'],['Raat','رات','night'],['Kaam','کام','work'],['Sach','سچ','truth'],['Shor','شور','noise']];
beginnerWords.forEach((w, i) => {
  levels.push({ id: 61 + i, stage: 6, title: `Shuru ${i+1}`, subtitle: 'Beginner words', mode: 'copy',
    intro: `Beginner lafz. Awaz suno aur type karo.`,
    items: [item(w[0], w[1], w[2]), item(beginnerWords[(i+1)%beginnerWords.length][0], beginnerWords[(i+1)%beginnerWords.length][1], beginnerWords[(i+1)%beginnerWords.length][2])] });
});

// Intermediate words
const intermediateWords = [['Kitab','کتاب','book'],['Dost','دوست','friend'],['Khushi','خوشی','happiness'],['School','سکول','school'],['Mohabbat','محبت','love'],['Dost','دوست','friend'],['Wajah','وجہ','reason'],['Safar','سفر','journey'],['Waqt','وقت','time'],['Zameen','زمین','ground']];
intermediateWords.forEach((w, i) => {
  levels.push({ id: 71 + i, stage: 6, title: `Mutasir ${i+1}`, subtitle: 'Intermediate words', mode: 'copy',
    intro: `Intermediate lafz. Thora mushkil hai par koshish karo.`,
    items: [item(w[0], w[1], w[2]), item(intermediateWords[(i+1)%intermediateWords.length][0], intermediateWords[(i+1)%intermediateWords.length][1], intermediateWords[(i+1)%intermediateWords.length][2])] });
});

// Advanced words
const advancedWords = [['Zimmedari','ذمہ داری','responsibility'],['Kamyabi','کامیابی','success'],['Taleem','تعليم','education'],['Mehnat','محنت','hard work'],['Mukammal','مکمل','complete'],['Taraki','ترقی','progress'],['Misaal','مثال','example'],['Samajh','سمجھ','understanding'],['Khidmat','خدمت','service'],['Qurbani','قربانی','sacrifice']];
advancedWords.forEach((w, i) => {
  levels.push({ id: 81 + i, stage: 6, title: `Peshraft ${i+1}`, subtitle: 'Advanced words', mode: 'copy',
    intro: `Advanced lafz. Yeh lambay lafz hain. Dhyan se likho.`,
    items: [item(w[0], w[1], w[2]), item(advancedWords[(i+1)%advancedWords.length][0], advancedWords[(i+1)%advancedWords.length][1], advancedWords[(i+1)%advancedWords.length][2])] });
});

levels.push({ id: 91, stage: 6, title: 'Imtihan 6', subtitle: 'Lafz master exam', mode: 'exam',
  intro: 'Stage 6 ka bara imtihan! Sab lafz test honge.',
  items: [item('paani','پانی','water'),item('kitab','کتاب','book'),item('dost','دوست','friend'),item('kamyabi','کامیابی','success'),item('mehnat','محنت','hard work'),item('ghar','گھر','home'),item('roti','روٹی','bread'),item('waqt','وقت','time'),item('taleem','تعليم','education'),item('zameen','زمین','ground')] });

// --- STAGE 7: Box Game (Interactive Word-Building) ---
const boxWords = ['pani','ghar','dil','naam','roti','kitab','dost','saal','raat','shaam','chaand','baarish','khaana','paani','school','safar','waqt','zameen','mehnat','kamyabi'];
boxWords.forEach((w, i) => {
  const urduMap = { pani:'پانی',ghar:'گھر',dil:'دل',naam:'نام',roti:'روٹی',kitab:'کتاب',dost:'دوست',saal:'سال',raat:'رات',shaam:'شام',chaand:'چاند',baarish:'بارش',khaana:'کھانا',school:'سکول',safar:'سفر',waqt:'وقت',zameen:'زمین',mehnat:'محنت',kamyabi:'کامیابی' };
  const hintMap = { pani:'water',ghar:'home',dil:'heart',naam:'name',roti:'bread',kitab:'book',dost:'friend',saal:'year',raat:'night',shaam:'evening',chaand:'moon',baarish:'rain',khaana:'food',school:'school',safar:'journey',waqt:'time',zameen:'ground',mehnat:'hard work',kamyabi:'success' };
  levels.push({ id: 92 + i, stage: 7, title: `Box ${i+1}`, subtitle: 'Word building game', mode: 'box',
    intro: `Khali dabbe bharo! Sahi harf sahi jagah par rakhdo. Lafz: ${w}.`,
    items: [item(w, urduMap[w] || w, hintMap[w] || w)] });
});

levels.push({ id: 112, stage: 7, title: 'Imtihan 7', subtitle: 'Box game exam', mode: 'exam',
  intro: 'Stage 7 ka imtihan! Word building test.',
  items: [item('pani','پانی','water'),item('kitab','کتاب','book'),item('chaand','چاند','moon'),item('safar','سفر','journey'),item('kamyabi','کامیابی','success')] });

// --- STAGE 8: Lafz Todo (Word Breaking and Rebuilding) ---
const breakWords = ['pani','ghar','dil','naam','kaam','din','raat','shaam','saal','roti','kitab','dost','baarish','khaana','school'];
breakWords.forEach((w, i) => {
  const urduMap = { pani:'پانی',ghar:'گھر',dil:'دل',naam:'نام',kaam:'کام',din:'دن',raat:'رات',shaam:'شام',saal:'سال',roti:'روٹی',kitab:'کتاب',dost:'دوست',baarish:'بارش',khaana:'کھانا',school:'سکول' };
  const hintMap = { pani:'water',ghar:'home',dil:'heart',naam:'name',kaam:'work',din:'day',raat:'night',shaam:'evening',saal:'year',roti:'bread',kitab:'book',dost:'friend',baarish:'rain',khaana:'food',school:'school' };
  levels.push({ id: 113 + i, stage: 8, title: `Todo ${i+1}`, subtitle: 'Break and rebuild', mode: 'break',
    intro: `Lafz ko haroof mein todo aur phir jodo. Lafz: ${w}.`,
    items: [item(w, urduMap[w] || w, hintMap[w] || w)] });
});

levels.push({ id: 128, stage: 8, title: 'Imtihan 8', subtitle: 'Break exam', mode: 'exam',
  intro: 'Stage 8 ka imtihan!',
  items: [item('pani','پانی','water'),item('kitab','کتاب','book'),item('baarish','بارش','rain'),item('school','سکول','school'),item('roti','روٹی','bread')] });

// --- STAGE 9: Jumlay (Roman Urdu Sentences) ---
const sentences = [
  ['main theek hoon', 'میں ٹھیک ہوں', 'I am fine'],
  ['yeh mera ghar hai', 'یہ میرا گھر ہے', 'this is my home'],
  ['paani do', 'پانی دو', 'give water'],
  ['aap kaise hain', 'آپ کیسے ہیں', 'how are you'],
  ['shukriya bhai', 'شکریہ بھائی', 'thank you brother'],
  ['mera naam umer hai', 'میرا نام عمر ہے', 'my name is Umer'],
  ['mujhe pani chahiye', 'مجھے پانی چاہیے', 'I need water'],
  ['aaj mausam acha hai', 'آج موسم اچھا ہے', 'today the weather is nice'],
  ['kitab parho', 'کتاب پڑھو', 'read the book'],
  ['roti kha lo', 'روٹی کھا لو', 'eat the bread'],
  ['bhai school mein hai', 'بھائی سکول میں ہے', 'brother is at school'],
  ['behen kitaab parh rahi hai', 'بہن کتاب پڑھ رہی ہے', 'sister is reading'],
  ['chai bana do', 'چائے بنا دو', 'make some tea'],
  ['darwaza band karo', 'دروازہ بند کرو', 'close the door'],
  ['chalo bahar chalte hain', 'چلو باہر چلیں', 'let us go outside'],
  ['baarish ho rahi hai', 'بارش ہو رہی ہے', 'it is raining'],
  ['dhoop achi hai', 'دھوپ اچھی ہے', 'the sun is nice'],
  ['aap ka naam kya hai', 'آپ کا نام کیا ہے', 'what is your name'],
  ['aap kahan rehte hain', 'آپ کہاں رہتے ہیں', 'where do you live'],
  ['aap ne bohat acha kaam kiya', 'آپ نے بہت اچھا کام کیا', 'you did great work'],
  ['abbu kaam par gaye hain', 'ابو کام پر گئے ہیں', 'father went to work'],
  ['ammi ne kaha jaldi aao', 'امنی نے کہا جلدی آؤ', 'mother said come quickly'],
  ['yeh sau rupay ka hai', 'یہ سو روپے کا ہے', 'this costs 100 rupees'],
  ['yeh kitne ka hai', 'یہ کتنے کا ہے', 'how much is this'],
  ['bus kab aayegi', 'بس کب آئے گی', 'when will the bus come'],
];

sentences.forEach((s, i) => {
  levels.push({ id: 129 + i, stage: 9, title: `Jumla ${i+1}`, subtitle: 'Sentence practice', mode: 'copy',
    intro: `Poora jumla likho. Har lafz ke beech space do.`,
    items: [item(s[0], s[1], s[2])] });
});

levels.push({ id: 154, stage: 9, title: 'Imtihan 9', subtitle: 'Jumlay ka exam', mode: 'exam',
  intro: 'Stage 9 ka imtihan! Jumlay test honge.',
  items: [item('main theek hoon','میں ٹھیک ہوں','I am fine'),item('mujhe pani chahiye','مجھے پانی چاہیے','I need water'),item('aaj mausam acha hai','آج موسم اچھا ہے','today the weather is nice'),item('aap ka naam kya hai','آپ کا نام کیا ہے','what is your name'),item('baarish ho rahi hai','بارش ہو رہی ہے','it is raining')] });

// --- STAGE 10: Mazahiya Jumlay (Funny Sentences) ---
const funnySentences = [
  ['mera dost itna sust hai ke alarm bhi thak jata hai', 'میرا دوست اتنا سست ہے کہ الارم بھی تھک جاتا ہے', 'my friend is so lazy the alarm gets tired'],
  ['billi ne doodh piya aur phir khud ko sher samajhne lagi', 'بلی نے دودھ پیا اور پھر خود کو شیر سمجھنے لگی', 'the cat drank milk and thought she was a lion'],
  ['mera mobile mujh se zyada busy rehta hai', 'میرا موبائل مجھ سے زیادہ مصروف رہتا ہے', 'my phone is busier than me'],
  ['aloo ne pyaaz se kaha tum mujhe rula dete ho', 'آلو نے پیاز سے کہا تم مجھے رلا دیتے ہو', 'potato told onion you make me cry'],
  ['bakri ne meri topi pehen li', 'بکری نے میری ٹوپی پہن لی', 'the goat wore my hat'],
  ['chhota bhai bola main bara ho kar ammi banunga', 'چھوٹا بھائی بولا میں بڑا ہو کر امی بنوں گا', 'little brother said I will become mother when I grow up'],
  ['chooha bola billi mausi salaam', 'چوہا بولا بلی ماؤسی سلام', 'the mouse said cat aunty hello'],
  ['chai bohat garam hai', 'چائے بہت گرم ہے', 'the tea is very hot'],
  ['chacha ki chai itni meethi thi ke cheeni sharma gayi', 'چچا کی چائے اتنی میٹھی تھی کہ چینی شرما گئی', 'uncle\'s tea was so sweet the sugar felt shy'],
  ['chacha ne kaha main jawan hoon bas baal safed hain', 'چچا نے کہا میں جوان ہوں بس بال سفید ہیں', 'uncle said I am young just my hair is white'],
  ['bijli gayi to sab ko sitaare yaad aa gaye', 'بجلی گئی تو سب کو ستارے یاد آ گئے', 'when power went out everyone remembered the stars'],
  ['baarish aayi aur sab ke kapray naach uthay', 'بارش آئی اور سب کے کپڑے ناچ اٹھے', 'rain came and all the clothes started dancing'],
  ['dada abbu ka chashma unke sar par hi tha', 'دادا ابو کا چشمہ انکے سر پر ہی تھا', 'grandpa\'s glasses were on his head'],
  ['bhooka aadmi khwab mein bhi roti dekhta hai', 'بھوکا آدمی خواب میں بھی روٹی دیکھتا ہے', 'a hungry person sees bread even in dreams'],
];

funnySentences.forEach((s, i) => {
  levels.push({ id: 155 + i, stage: 10, title: `Mazahiya ${i+1}`, subtitle: 'Funny sentence', mode: 'copy', long: true,
    intro: `Mazahiya jumla! Hanso aur likho.`,
    items: [item(s[0], s[1], s[2])] });
});

levels.push({ id: 169, stage: 10, title: 'Imtihan 10', subtitle: 'Funny exam', mode: 'exam', long: true,
  intro: 'Stage 10 ka imtihan! Mazahiya jumlay test.',
  items: [item('mera dost itna sust hai ke alarm bhi thak jata hai','میرا دوست اتنا سست ہے کہ الارم بھی تھک جاتا ہے','my friend is so lazy'),item('billi ne doodh piya aur phir khud ko sher samajhne lagi','بلی نے دودھ پیا اور پھر خود کو شیر سمجھنے لگی','the cat thought she was a lion'),item('mera mobile mujh se zyada busy rehta hai','میرا موبائل مجھ سے زیادہ مصروف رہتا ہے','my phone is busier')] });

// --- STAGE 11: Islami Sabaq (Islamic Sentences and Values) ---
const islamicContent = [
  ['sach bolna ek acha akhlaq hai', 'سچ بولنا ایک اچھا اخلاق ہے', 'speaking truth is good character'],
  ['walidain ki izzat karo', 'والدین کی عزت کرو', 'respect your parents'],
  ['namaz parho aur waqt par qayam raho', 'نماز پڑھو اور وقت پر قیام رہو', 'pray and be punctual'],
  ['sabr aur shukar karo', 'صبر اور شکر کرو', 'be patient and grateful'],
  ['ghareebon ki madad karo', 'غریبوں کی مدد کرو', 'help the poor'],
  ['safai iman ka hissa hai', 'صفائی ایمان کا حصہ ہے', 'cleanliness is part of faith'],
  ['reham aur insaniyat sab se barre amal hain', 'رحم اور انسانیت سب سے بڑے عمل ہیں', 'mercy and humanity are the greatest deeds'],
  ['baron ka ehtaram karo', 'بڑوں کا احترام کرو', 'respect elders'],
  ['achay akhlaq wala sab se pyara hai', 'اچھے اخلاق والا سب سے پیارا ہے', 'a person with good character is most loved'],
  ['ghusul kar ke paak raho', 'غسل کر کے پاک رہو', 'stay clean by bathing'],
  ['azan sunkhe baithe raho', 'اذان سن کر بیٹھے رہو', 'sit quietly when you hear the call to prayer'],
  ['hamesha dua maango', 'ہمیشہ دعا مانگو', 'always pray to Allah'],
  ['musaib mein sabar rakho', 'مصیبت میں صبر رکھو', 'be patient in difficulties'],
  ['Allah ka shukar ada karo', 'اللہ کا شکر ادا کرو', 'thank Allah'],
  ['bura kaam chhodo aur acha kaam karo', 'برا کام چھوڑو اور اچھا کام کرو', 'leave bad deeds and do good'],
];

islamicContent.forEach((s, i) => {
  levels.push({ id: 170 + i, stage: 11, title: `Islami ${i+1}`, subtitle: 'Islamic lesson', mode: 'copy', long: i >= 10,
    intro: `Islami sabaq. Seekho aur amal karo.`,
    items: [item(s[0], s[1], s[2])] });
});

levels.push({ id: 185, stage: 11, title: 'Imtihan 11', subtitle: 'Islami exam', mode: 'exam',
  intro: 'Stage 11 ka imtihan! Islami sabaq test.',
  items: [item('sach bolna ek acha akhlaq hai','سچ بولنا ایک اچھا اخلاق ہے','truth is good character'),item('walidain ki izzat karo','والدین کی عزت کرو','respect parents'),item('safai iman ka hissa hai','صفائی ایمان کا حصہ ہے','cleanliness is part of faith'),item('ghareebon ki madad karo','غریبوں کی مدد کرو','help the poor')] });

// --- STAGE 12: Islami Kahaniyan (Long Islamic Stories) ---
const stories = [
  { title: 'Pyasa Kutta', sub: 'Reham ka inaam', parts: [
    ['aik aadmi registan mein safar kar raha tha aur use sakht pyaas lagi.', 'ایک آدمی ریگستان میں سفر کر رہا تھا اور اسے سخت پیاس لگی۔'],
    ['usay aik kuan mila. wo neeche utra aur pet bhar kar paani piya.', 'اسے ایک کنواں ملا۔ وہ نیچے اترا اور پیٹ بھر کر پانی پیا۔'],
    ['bahar aaya to dekha aik kutta pyaas se geeli mitti chaat raha hai.', 'باہر آیا تو دیکھا ایک کتا پیاس سے گیلی مٹی چاٹ رہا ہے۔'],
    ['wo dobara kuen mein utra aur apne moze mein paani bhar laya.', 'وہ دوبارہ کنویں میں اترا اور اپنے موزے میں پانی بھر لایا۔'],
    ['usne kutte ko paani pilaya. Allah ne us ki yeh neki qubool farmayi aur usay maaf kar diya.', 'اس نے کتے کو پانی پلایا۔ اللہ نے اس کی یہ نیکی قبول فرمائی اور اسے معاف کر دیا۔'],
    ['sabaq: har jaandaar par reham karo, chhoti neki bhi bari hoti hai.', 'سبق: ہر جاندار پر رحم کرو، چھوٹی نیکی بھی بڑی ہوتی ہے۔'],
  ]},
  { title: 'Sacha Bacha', sub: 'Daakuon ke saamne sach', parts: [
    ['aik chhota bacha ilm hasil karne ke liye qaafilay ke saath dusre shehar ja raha tha.', 'ایک چھوٹا بچہ علم حاصل کرنے کے لیے قافلے کے ساتھ دوسرے شہر جا رہا تھا۔'],
    ['ammi ne uski qameez mein chaalees ashrafiyan see di theen aur kaha hamesha sach bolna.', 'امی نے اس کی قمیض میں چالیس اشرفیاں سی دی تھیں اور کہا ہمیشہ سچ بولنا۔'],
    ['raaste mein daakuon ne qaafila loot liya. aik daaku ne bachay se poocha tumhare paas kya hai.', 'راستے میں ڈاکوؤں نے قافلہ لوٹ لیا۔ ایک ڈاکو نے بچے سے پوچھا تمہارے پاس کیا ہے۔'],
    ['bachay ne kaha meri qameez mein chaalees ashrafiyan hain. daaku hairaan reh gaya.', 'بچے نے کہا میری قمیض میں چالیس اشرفیاں ہیں۔ ڈاکو حیران رہ گیا۔'],
    ['sardar ne poocha tumne sach kyun bataya. bacha bola meri ammi ne sach bolne ka wada liya tha.', 'سردار نے پوچھا تم نے سچ کیوں بتایا۔ بچہ بولا میری امی نے سچ بولنے کا وعدہ لیا تھا۔'],
    ['yeh sun kar sardar roya aur tauba kar li. phir saare daakuon ne bhi tauba kar li.', 'یہ سن کر سردار رویا اور توبہ کر لی۔ پھر سارے ڈاکوؤں نے بھی توبہ کر لی۔'],
  ]},
  { title: 'Kashti Wala Paigham', sub: 'Hazrat Nooh alaihis salam', parts: [
    ['Hazrat Nooh alaihis salam ne bohat saal apni qaum ko Allah ki taraf bulaya.', 'حضرت نوح علیہ السلام نے بہت سال اپنی قوم کو اللہ کی طرف بلایا۔'],
    ['lekin zyada tar log nahi maane aur unka mazaq urate rahe.', 'لیکن زیادہ تر لوگ نہیں مانے اور ان کا مذاق اڑاتے رہے۔'],
    ['Allah ke hukm se unhon ne aik bari kashti banayi, jab ke wahan koi samandar nazar nahi aata tha.', 'اللہ کے حکم سے انہوں نے ایک بڑی کشتی بنائی، جب کہ وہاں کوئی سمندر نظر نہیں آتا تھا۔'],
    ['phir bohat bara toofan aaya aur har taraf paani hi paani ho gaya.', 'پھر بہت بڑا طوفان آیا اور ہر طرف پانی ہی پانی ہو گیا۔'],
    ['imaan wale aur jaanwaron ke jore kashti mein mehfooz rahe.', 'ایمان والے اور جانوروں کے جوڑے کشتی میں محفوظ رہے۔'],
    ['sabaq: Allah ki baat par yaqeen rakho, chahe log mazaq hi kyun na urayein.', 'سبق: اللہ کی بات پر یقین رکھو، چاہے لوگ مذاق ہی کیوں نہ اڑائیں۔'],
  ]},
  { title: 'Machhli ke Pet Mein Dua', sub: 'Hazrat Yunus alaihis salam', parts: [
    ['Hazrat Yunus alaihis salam apni qaum se naraz ho kar kashti mein sawar hue.', 'حضرت یونس علیہ السلام اپنی قوم سے ناراض ہو کر کشتی میں سوار ہوئے۔'],
    ['samandar mein toofan aaya aur wo paani mein chale gaye.', 'سمندر میں طوفان آیا اور وہ پانی میں چلے گئے۔'],
    ['aik bari machhli ne unhein nigal liya. andar bilkul andhera tha.', 'ایک بڑی مچھلی نے انہیں نگل لیا۔ اندر بالکل اندھیرا تھا۔'],
    ['andheray mein unhon ne dil se Allah ko yaad kiya aur maafi maangi.', 'اندھیرے میں انہوں نے دل سے اللہ کو یاد کیا اور معافی مانگی۔'],
    ['Allah ne unki dua suni aur machhli ne unhein saahil par chhor diya.', 'اللہ نے ان کی دعا سنی اور مچھلی نے انہیں ساحل پر چھوڑ دیا۔'],
    ['sabaq: mushkil kitni bhi bari ho, Allah se dua karna kabhi na chhoro.', 'سبق: مشکل کتنی بھی بڑی ہو، اللہ سے دعا کرنا کبھی نہ چھوڑو۔'],
  ]},
  { title: 'Aag Thandi Ho Gayi', sub: 'Hazrat Ibrahim alaihis salam', parts: [
    ['Hazrat Ibrahim alaihis salam ne logon ko samjhaya ke but kuch nahi kar sakte.', 'حضرت ابراہیم علیہ السلام نے لوگوں کو سمجھایا کہ بت کچھ نہیں کر سکتے۔'],
    ['badshah naraz ho gaya aur aik bohat bari aag jalwayi.', 'بادشاہ ناراض ہو گیا اور ایک بہت بڑی آگ جلوائی۔'],
    ['unhein aag mein daal diya gaya lekin unka bharosa sirf Allah par tha.', 'انہیں آگ میں ڈال دیا گیا لیکن ان کا بھروسہ صرف اللہ پر تھا۔'],
    ['Allah ne hukm diya aur aag un ke liye thandi aur salamati wali ban gayi.', 'اللہ نے حکم دیا اور آگ ان کے لیے ٹھنڈی اور سلامتی والی بن گئی۔'],
    ['sab log hairaan reh gaye ke wo bilkul theek bahar aa gaye.', 'سب لوگ حیران رہ گئے کہ وہ بالکل ٹھیک باہر آ گئے۔'],
    ['sabaq: jo Allah par bharosa karta hai, Allah uski hifazat karta hai.', 'سبق: جو اللہ پر بھروسہ کرتا ہے، اللہ اس کی حفاظت کرتا ہے۔'],
  ]},
  { title: 'Ghaar Wale Dost', sub: 'Ashab-e-Kahf', parts: [
    ['kuch naujawan Allah par imaan rakhte the lekin unka badshah zaalim tha.', 'کچھ نوجوان اللہ پر ایمان رکھتے تھے لیکن ان کا بادشاہ ظالم تھا۔'],
    ['wo apna imaan bachane ke liye aik ghaar mein chhup gaye. unka kutta bhi saath tha.', 'وہ اپنا ایمان بچانے کے لیے ایک غار میں چھپ گئے۔ ان کا کتا بھی ساتھ تھا۔'],
    ['Allah ne unhein gehri neend sula diya aur wo kai sau saal soye rahe.', 'اللہ نے انہیں گہری نیند سلا دی اور وہ کئی سو سال سوئے رہے۔'],
    ['jaag kar aik dost purane sikke le kar khana khareedne shehar gaya.', 'جاگ کر ایک دوست پرانے سکے لے کر کھانا خریدنے شہر گیا۔'],
    ['dukaandaar purane sikke dekh kar hairaan hua. ab shehar ke log imaan wale the.', 'دکاندار پرانے سکے دیکھ کر حیران ہوا۔ اب شہر کے لوگ ایمان والے تھے۔'],
    ['sabaq: sach par qaim raho, Allah raasta nikaal deta hai.', 'سبق: سچ پر قائم رہو، اللہ راستہ نکال دیتا ہے۔'],
  ]},
  { title: 'Bilal ki Pyari Azaan', sub: 'Sabr aur imaan', parts: [
    ['Hazrat Bilal razi Allah anhu pehle aik ghulam the.', 'حضرت بلال رضی اللہ عنہ پہلے ایک غلام تھے۔'],
    ['jab unhon ne Islam qubool kiya to unka maalik unhein garam ret par litata tha.', 'جب انہوں نے اسلام قبول کیا تو ان کا مالک انہیں گرم ریت پر لٹاتا تھا۔'],
    ['wo har takleef mein bas yahi kehte the ahad ahad, yani Allah aik hai.', 'وہ ہر تکلیف میں بس یہی کہتے تھے احد احد، یعنی اللہ ایک ہے۔'],
    ['Hazrat Abu Bakr razi Allah anhu ne unhein khareed kar azaad kar diya.', 'حضرت ابوبکر رضی اللہ عنہ نے انہیں خرید کر آزاد کر دیا۔'],
    ['phir unhein Islam ka pehla moazzin banne ki izzat mili.', 'پھر انہیں اسلام کا پہلا مؤذن بننے کی عزت ملی۔'],
    ['sabaq: Allah ke haan izzat imaan aur kirdaar se milti hai, rang ya paison se nahi.', 'سبق: اللہ کے ہاں عزت ایمان اور کردار سے ملتی ہے، رنگ یا پیسوں سے نہیں۔'],
  ]},
  { title: 'Mulla aur Degchi ka Bacha', sub: 'Mazahiya kahani', parts: [
    ['Mulla Nasruddin ne parosi se aik degchi udhaar li.', 'ملا نصرالدین نے پڑوسی سے ایک دیگچی ادھار لی۔'],
    ['wapas ki to saath aik chhoti degchi bhi di aur kaha is ne bacha diya hai.', 'واپس کی تو ساتھ ایک چھوٹی دیگچی بھی دی اور کہا اس نے بچہ دیا ہے۔'],
    ['parosi khush ho gaya aur chupchaap dono degchiyan rakh leen.', 'پڑوسی خوش ہو گیا اور چپ چاپ دونوں دیگچیاں رکھ لیں۔'],
    ['kuch din baad Mulla ne phir degchi li aur wapas nahi ki.', 'کچھ دن بعد ملا نے پھر دیگچی لی اور واپس نہیں کی۔'],
    ['parosi ne poocha to Mulla bola afsos, aap ki degchi faut ho gayi.', 'پڑوسی نے پوچھا تو ملا بولا افسوس، آپ کی دیگچی فوت ہو گئی۔'],
    ['parosi chillaya degchi kaise mar sakti hai. Mulla muskuraya jab bacha de sakti hai to mar bhi sakti hai.', 'پڑوسی چلایا دیگچی کیسے مر سکتی ہے۔ ملا مسکرایا جب بچہ دے سکتی ہے تو مر بھی سکتی ہے۔'],
  ]},
  { title: 'Mulla ka Gadha aur Log', sub: 'Sab ko khush nahi kar sakte', parts: [
    ['Mulla aur unka beta gadhe ke saath bazaar ja rahe the.', 'ملا اور ان کا بیٹا گدھے کے ساتھ بازار جا رہے تھے۔'],
    ['Mulla gadhe par baithe to log bole kitna zaalim baap hai, bacha paidal hai.', 'ملا گدھے پر بیٹھے تو لوگ بولے کتنا ظالم باپ ہے، بچہ پیدل ہے۔'],
    ['beta baitha to log bole kaisa beadab beta hai, buddha baap paidal hai.', 'بیٹا بیٹھا تو لوگ بولے کیسا بے ادب بیٹا ہے، بوڑھا باپ پیدل ہے۔'],
    ['dono baith gaye to log bole bechare gadhe par reham karo.', 'دونوں بیٹھ گئے تو لوگ بولے بیچارے گدھے پر رحم کرو۔'],
    ['dono paidal chale to log hanse kitne bewaqoof hain, gadha hote hue paidal hain.', 'دونوں پیدل چلے تو لوگ ہنسے کتنے بیوقوف ہیں، گدھا ہوتے ہوئے پیدل ہیں۔'],
    ['Mulla bola beta, sab ko khush karna na-mumkin hai. sahi kaam karo aur Allah ko khush karo.', 'ملا بولا بیٹا، سب کو خوش کرنا ناممکن ہے۔ صحیح کام کرو اور اللہ کو خوش کرو۔'],
  ]},
  { title: 'Kuen Mein Chaand', sub: 'Mulla ki madad', parts: [
    ['aik raat Mulla paani lene kuen par gaye.', 'ایک رات ملا پانی لینے کنویں پر گئے۔'],
    ['neeche dekha to chaand paani mein chamak raha tha.', 'نیچے دیکھا تو چاند پانی میں چمک رہا تھا۔'],
    ['Mulla ghabra gaye, bechara chaand kuen mein gir gaya hai.', 'ملا گھبرا گئے، بیچارا چاند کنویں میں گر گیا ہے۔'],
    ['unhon ne rassi daali aur zor se kheenchi. rassi toot gayi aur wo peeth ke bal gire.', 'انہوں نے رسی ڈالی اور زور سے کھینچی۔ رسی ٹوٹ گئی اور وہ پیٹھ کے بل گرے۔'],
    ['aankh khuli to aasmaan mein chaand nazar aaya.', 'آنکھ کھلی تو آسمان میں چاند نظر آیا۔'],
    ['Mulla khush ho kar bole shukar hai, chot to lagi lekin chaand wapas apni jagah pohanch gaya.', 'ملا خوش ہو کر بولے شکر ہے، چوٹ تو لگی لیکن چاند واپس اپنی جگہ پہنچ گیا۔'],
  ]},
  { title: 'Kapron ki Daawat', sub: 'Izzat insaan ki ho', parts: [
    ['Mulla purane kapron mein aik daawat mein gaye. kisi ne unki taraf dekha bhi nahi.', 'ملا پرانے کپڑوں میں ایک دعوت میں گئے۔ کسی نے ان کی طرف دیکھا بھی نہیں۔'],
    ['wo ghar gaye aur naya shaandaar choga pehen kar wapas aaye.', 'وہ گھر گئے اور نیا شاندار چوغہ پہن کر واپس آئے۔'],
    ['ab sab ne izzat se unhein sab se aage bithaya aur khana pesh kiya.', 'اب سب نے عزت سے انہیں سب سے آگے بٹھایا اور کھانا پیش کیا۔'],
    ['Mulla ne choge ki aasteen salan mein daal di aur kaha khao mere kapron, khao.', 'ملا نے چوغے کی آستین سالن میں ڈال دی اور کہا کھاؤ میرے کپڑو، کھاؤ۔'],
    ['log hairaan hue to Mulla bole daawat to kapron ki hai, mujh ko kisi ne nahi bulaya.', 'لوگ حیران ہوئے تو ملا بولے دعوت تو کپڑوں کی ہے، مجھ کو کسی نے نہیں بلایا۔'],
    ['sabaq: insaan ki izzat uske akhlaq se karo, kapron se nahi.', 'سبق: انسان کی عزت اس کے اخلاق سے کرو، کپڑوں سے نہیں۔'],
  ]},
  { title: 'Budhiya aur Pyara Akhlaq', sub: 'Hamare Nabi ka husn-e-sulook', parts: [
    ['aik budhiya Makkah chhor kar ja rahi thi aur uska samaan bohat bhaari tha.', 'ایک بڑھیا مکہ چھوڑ کر جا رہی تھی اور اس کا سامان بہت بھاری تھا۔'],
    ['aik meherbaan shakhs ne uska samaan utha liya aur saath chal pare.', 'ایک مہربان شخص نے اس کا سامان اٹھا لیا اور ساتھ چل پڑے۔'],
    ['raaste bhar budhiya kehti rahi us naye deen wale se bach kar rehna.', 'راستے بھر بڑھیا کہتی رہی اس نئے دین والے سے بچ کر رہنا۔'],
    ['manzil par pohanch kar usne naam poocha. jawab mila main Muhammad hoon, sallallahu alaihi wasallam.', 'منزل پر پہنچ کر اس نے نام پوچھا۔ جواب ملا میں محمد ہوں، صلی اللہ علیہ وسلم۔'],
    ['budhiya hairaan reh gayi ke jis se darti thi wohi itne pyaar se madad kar rahe the.', 'بڑھیا حیران رہ گئی کہ جس سے ڈرتی تھی وہی اتنے پیار سے مدد کر رہے تھے۔'],
    ['sabaq: achay akhlaq dil jeet lete hain. burai ka jawab bhalai se do.', 'سبق: اچھے اخلاق دل جیت لیتے ہیں۔ برائی کا جواب بھلائی سے دو۔'],
  ]},
];

let storyLevelId = 186;
stories.forEach((story, si) => {
  const storyItems = story.parts.map(([roman, urdu], pi) => ({
    id: `story-${si}-${pi}`,
    roman, urdu,
    hint: `${story.title} · hissa ${pi + 1}`,
  }));
  levels.push({
    id: storyLevelId, stage: 12,
    title: story.title, subtitle: story.sub, mode: 'copy', long: true,
    intro: `Kahani: ${story.title}. ${story.parts.length} hisson mein. Parho, suno aur likho.`,
    items: storyItems,
  });
  storyLevelId++;
});

// Final hero exam
levels.push({
  id: storyLevelId, stage: 12,
  title: 'Hero Imtihan', subtitle: 'Aakhri bara exam', mode: 'exam', long: true,
  intro: 'Aakhri imtihan! Pass kar lo to aap Hero ho!',
  items: stories.slice(0, 4).map((s, i) => ({
    id: `story-${i}-0`, roman: s.parts[0][0], urdu: s.parts[0][1], hint: s.title,
  })),
});

// After-dictation-world levels (extended word categories)
const extraCategories = [
  { title: 'School', subtitle: 'Parhai ke lafz', words: [['kitaab','کتاب','book'],['qalam','قلم','pen'],['ustaad','استاد','teacher'],['bachay','بچے','children'],['sabaq','سبق','lesson'],['chutti','چھٹی','holiday']] },
  { title: 'Bazaar', subtitle: 'Market ke lafz', words: [['dukaan','دکان','shop'],['paisay','پیسے','money'],['sabzi','سبزی','vegetable'],['mehnga','مہنگا','expensive'],['sasta','سستا','cheap'],['thaila','تھیلا','bag']] },
  { title: 'Kitchen', subtitle: 'Kitchen ke lafz', words: [['handi','ہانڈی','pot'],['chamach','چمچ','spoon'],['pyala','پیالہ','bowl'],['chulha','چولہا','stove'],['chaku','چاقو','knife'],['thali','تھالی','plate']] },
  { title: 'Safar', subtitle: 'Journey ke lafz', words: [['bus','بس','bus'],['train','ٹرین','train'],['hawaai jahaaz','ہوائی جہاز','airplane'],['rasta','راستہ','path'],['ticket','ٹکٹ','ticket'],['station','اسٹیشن','station']] },
  { title: 'Kheil', subtitle: 'Games ke lafz', words: [['balla','بلہ','bat'],['ball','بال','ball'],['kheil','کھیل','game'],['team','ٹیم','team'],['jeet','جیت','win'],['haara','ہارا','lost']] },
  { title: 'Aqaaid', subtitle: 'Belief words', words: [['Allah','اللہ','Allah'],['Nabi','نبی','prophet'],['iman','ایمان','faith'],['dua','دعا','prayer'],['quran','قرآن','Quran'],['masjid','مسجد','mosque']] },
];

// Insert these as additional stages 4-5 word categories (IDs after stories)
extraCategories.forEach((cat, i) => {
  levels.push({
    id: storyLevelId + 1 + i, stage: 4,
    title: cat.title, subtitle: cat.subtitle, mode: 'copy',
    intro: `Naye lafz dekh kar likho.`,
    items: cat.words.map(w => item(w[0], w[1], w[2])),
  });
});

// Final motivational levels
levels.push({ id: storyLevelId + 7, stage: 12, title: 'Aakhri Sabaq', subtitle: 'Final message', mode: 'copy', long: true,
  intro: 'Aap ne safar mukammal kiya! Ab aap ek Hero hain.',
  items: [
    item('ab aap roman urdu likh sakte hain', 'اب آپ رومن اردو لکھ سکتے ہیں', 'now you can write Roman Urdu'),
    item('mubarak ho aap champion hain', 'مبارک ہو آپ چیمپیئن ہیں', 'congratulations you are a champion'),
    item('yeh safar yahan khatam nahi hota', 'یہ سفر یہاں ختم نہیں ہوتا', 'this journey does not end here'),
  ] });

// ============ ADDITIONAL LEVELS FOR 300+ TOTAL ============
let extraId = 210;

// --- More Stage 1: Individual letter dictation levels ---
const letterDict = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o'];
letterDict.forEach((letter, i) => {
  const ll = letterLevels().find(l => l.key === letter);
  if (ll) {
    levels.push({ id: extraId++, stage: 1, title: `${letter.toUpperCase()} practice`, subtitle: `Harf ${letter}`, mode: 'copy',
      intro: `Harf '${letter}' ki practice. Awaz suno aur type karo.`,
      letters: [{ key: ll.key, sound: ll.sound, example: ll.example }],
      items: [item(ll.example, ll.urduExample, ll.word), item('ab','اب','now'), item('din','دن','day')] });
  }
});

// --- More Stage 3: Phonics combinations ---
const phonicsExtra = [
  { title: 'Consonant Blends', subtitle: 'bl · cl · fl · gl', words: [['bla','بلا','blow'],['cla','کلا','class'],['fla','لا','flag'],['gla','گلا','glass']] },
  { title: 'More Blends', subtitle: 'br · cr · dr · fr', words: [['bari','بڑی','big'],['chhoti','چھوٹی','small'],['dara','ڈرا','fear'],['phool','پھول','flower']] },
  { title: 'Vowel Teams', subtitle: 'ai · ea · oa', words: [['chai','چائے','tea'],['neend','نیند','sleep'],['doodh','دودھ','milk']] },
  { title: 'Silent Letters', subtitle: 'Hidden sounds', words: [['khaana','کھانا','food'],['ghar','گھر','home'],['zameen','زمین','ground']] },
  { title: 'Double Consonants', subtitle: 'bb · cc · dd', words: [['abbu','ابو','father'],['dadda','دادا','grandfather'],['batta','بتا','tell']] },
  { title: 'Nasal Sounds', subtitle: 'n · m · ng', words: [['naam','نام','name'],['kaam','کام','work'],['rang','رنگ','color']] },
  { title: 'Sound Sorting', subtitle: 'Same or different', words: [['paani','پانی','water'],['baani','بانئ','creator'],['taala','تالا','lock'],['daal','دال','lentils']] },
  { title: 'Phonics Review', subtitle: 'Mixed practice', words: [['chaand','چاند','moon'],['shor','شور','noise'],['khaana','کھانا','food'],['saal','سال','year']] },
];
phonicsExtra.forEach(p => {
  levels.push({ id: extraId++, stage: 3, title: p.title, subtitle: p.subtitle, mode: 'copy',
    intro: `${p.title}. Awaz suno aur type karo.`,
    items: p.words.map(w => item(w[0], w[1], w[2])) });
});

// --- More Stage 5: Syllable practice ---
const syllableExtra = [
  { title: 'Two-Syllable Words', subtitle: 'pa-ni, cha-and', words: [['paani','پانی','water'],['chaand','چاند','moon'],['shaam','شام','evening'],['kitab','کتاب','book']] },
  { title: 'Three-Syllable Words', subtitle: 'baa-ri-sh, ka-mya-bi', words: [['baarish','بارش','rain'],['kamyabi','کامیابی','success'],['taleem','تعليم','education'],['mohabbat','محبت','love']] },
  { title: 'Syllable Patterns', subtitle: 'CV · CVC · CVCC', words: [['ma','ما','mother'],['din','دن','day'],['ghar','گھر','home'],['khaana','کھانا','food']] },
  { title: 'Break & Match', subtitle: 'Find the parts', words: [['roti','روٹی','bread'],['doodh','دودھ','milk'],['school','سکول','school'],['safar','سفر','journey']] },
  { title: 'Syllable Speed', subtitle: 'Quick recognition', words: [['dil','دل','heart'],['naam','نام','name'],['kaam','کام','work'],['raat','رات','night']] },
];
syllableExtra.forEach(s => {
  levels.push({ id: extraId++, stage: 5, title: s.title, subtitle: s.subtitle, mode: 'copy',
    intro: `${s.title}. Lafz ko hisson mein todo aur phir jodo.`,
    items: s.words.map(w => item(w[0], w[1], w[2])) });
});

// --- More Stage 9: Sentence variations ---
const moreSentences = [
  ['mera ghar', 'میرا گھر', 'my home'],
  ['tumhara naam', 'تمہارا نام', 'your name'],
  ['wo acha hai', 'وہ اچھا ہے', 'he is good'],
  ['ham sab khush hain', 'ہم سب خوش ہیں', 'we are all happy'],
  ['yeh kitab mera hai', 'یہ کتاب میرا ہے', 'this book is mine'],
  ['aaj kaunsa din hai', 'آج کونسا دن ہے', 'what day is today'],
  ['mera dost acha hai', 'میرا دوست اچھا ہے', 'my friend is good'],
  ['kya tum theek ho', 'کیا تم ٹھیک ہو', 'are you okay'],
  ['main school jata hoon', 'میں سکول جاتا ہوں', 'I go to school'],
  ['paani bohat zaroori hai', 'پانی بہت ضروری ہے', 'water is very important'],
];
moreSentences.forEach((s, i) => {
  levels.push({ id: extraId++, stage: 9, title: `Jumla ${26 + i + 1}`, subtitle: 'Sentence practice', mode: 'copy',
    intro: `Poora jumla likho. Space aur spelling dhyan se.`,
    items: [item(s[0], s[1], s[2])] });
});

// --- More Stage 10: Funny sentences ---
const moreFunny = [
  ['ustaad ne poocha kahan ho aur main ne kaha khwaab mein', 'استاد نے پوچھا کہاں ہو اور میں نے کہا خواب میں', 'teacher asked where are you and I said in a dream'],
  ['aaj main thak gaya hoon', 'آج میں تھک گیا ہوں', 'today I got tired'],
  ['ammi ne kaha jaldi aao aur main kal aaya', 'امنی نے کہا جلدی آؤ اور میں کل آیا', 'mom said come quick and I came tomorrow'],
  ['mulla kehti hain ke waqt sab se qeemti cheez hai', 'ملا کہتے ہیں کہ وقت سب سے قیمتی چیز ہے', 'Mulla says time is the most precious thing'],
  ['agar tum mehnat karo ge to kamyaab ho jao ge', 'اگر تم محنت کرو گے تو کامیاب ہو جاؤ گے', 'if you work hard you will succeed'],
  ['aik larka pehle aik harf bhi nahi likh sakta tha', 'ایک لڑکا پہلے ایک حرف بھی نہیں لکھ سکتا تھا', 'a boy could not write a single letter before'],
  ['us ne roz thora thora likhna shuru kiya', 'اس نے روز تھوڑا تھوڑا لکھنا شروع کیا', 'he started writing a little every day'],
  ['aik din ustaad ghar aa gaye ammi ne kaha zara is se sabaq sun lein', 'ایک دن استاد گھر آ گئے امی نے کہا ذرا اس سے سبق سن لیں', 'one day teacher came home mom said listen to his lesson'],
  ['log hanste the lekin us ne himmat nahi haari', 'لوگ ہنستے تھے لیکن اس نے ہمت نہیں ہاری', 'people laughed but he did not lose courage'],
  ['aaj wohi larka sab ko likhna sikhata hai', 'آج وہی لڑکا سب کو لکھنا سکھاتا ہے', 'today that same boy teaches everyone to write'],
];
moreFunny.forEach((s, i) => {
  levels.push({ id: extraId++, stage: 10, title: `Mazahiya ${15 + i + 1}`, subtitle: 'Funny sentence', mode: 'copy', long: true,
    intro: `Mazahiya jumla! Hanso aur likho.`,
    items: [item(s[0], s[1], s[2])] });
});

// --- More Stage 11: Islamic content ---
const moreIslamic = [
  ['Hazrat Adam pehle Nabi the', 'حضرت آدم پہلے نبی تھے', 'Hazrat Adam was the first prophet'],
  ['Hazrat Nuh ne kashti banayi', 'حضرت نوح نے کشتی بنائی', 'Hazrat Nuh built the ark'],
  ['Hazrat Ibrahim Allah ke dost the', 'حضرت ابراہیم اللہ کے دوست تھے', 'Hazrat Ibrahim was Allah\'s friend'],
  ['Hazrat Musa ne Firaun ko haraya', 'حضرت موسیٰ نے فرعون کو ہرایا', 'Hazrat Musa defeated Firaun'],
  ['Hazrat Yunus machli ke pet mein gaye', 'حضرت یونس مچھلی کے پیٹ میں گئے', 'Hazrat Yunus went in the fish belly'],
  ['Hazrat Muhammad sallallahu alaihi wasallam sab se aakhri Nabi hain', 'حضرت محمد صلی اللہ علیہ وسلم سب سے آخری نبی ہیں', 'Hazrat Muhammad is the last prophet'],
  ['namaz roz parho', 'نماز روز پڑھو', 'pray daily'],
  ['quran parhna acha amal hai', 'قرآن پڑھنا اچھا عمل ہے', 'reading Quran is a good deed'],
  ['ramzan mein roza rakho', 'رمضان میں روزہ رکھو', 'keep fast in Ramadan'],
  ['masjid ja kar namaz parho', 'مسجد جا کر نماز پڑھو', 'go to mosque and pray'],
];
moreIslamic.forEach((s, i) => {
  levels.push({ id: extraId++, stage: 11, title: `Islami ${16 + i + 1}`, subtitle: 'Islamic lesson', mode: 'copy',
    intro: `Islami sabaq. Seekho aur amal karo.`,
    items: [item(s[0], s[1], s[2])] });
});

// --- More Stage 4: Additional word categories ---
const moreCategories = [
  { title: 'Asmaan', subtitle: 'Sky words', words: [['suraj','سورج','sun'],['chaand','چاند','moon'],['tara','تارا','star'],['badal','بادل','cloud'],['aasmaan','آسمان','sky'],['hawa','ہوا','wind']] },
  { title: 'Paani', subtitle: 'Water words', words: [['paani','پانی','water'],['darya','دریا','river'],['samandar','سمندر','sea'],['baarish','بارش','rain'],['meetha','میٹھا','sweet'],['kachha','کچھا','raw']] },
  { title: 'Darakht', subtitle: 'Tree words', words: [['darakht','درخت','tree'],['phal','پھل','fruit'],['pattha','پتہ','leaf'],['jad','جد','root'],['shakh','شاخ','branch'],['beej','بیج','seed']] },
  { title: 'Kapray', subtitle: 'Clothing words', words: [['kapra','کپڑا','cloth'],['qameez','قمیض','shirt'],['shalwar','شلوار','trousers'],['joota','جوتا','shoe'],['topi','ٹوپی','cap'],['dupatta','دوپٹہ','scarf']] },
  { title: 'Zameen', subtitle: 'Land words', words: [['zameen','زمین','land'],['pahar','پہاڑ','mountain'],['regaistan','ریگستان','desert'],['ghas','گھاس','grass'],['raasta','راستہ','path'],['gaon','گاؤں','village']] },
  { title: 'Aza', subtitle: 'Senses', words: [['aankh','آنکھ','eye'],['kaan','کان','ear'],['naak','ناک','nose'],['zabaan','زبان','tongue'],['haath','ہاتھ','hand'],['pair','پیر','foot']] },
  { title: 'Khushi', subtitle: 'Emotions', words: [['khushi','خوشی','happiness'],['gham','غم','sadness'],['ghussa','غصہ','anger'],['dara','ڈرا','fear'],['pyar','پیار','love'],['umeed','امید','hope']] },
];
moreCategories.forEach((cat) => {
  levels.push({ id: extraId++, stage: 4, title: cat.title, subtitle: cat.subtitle, mode: 'copy',
    intro: `${cat.title} ke lafz. Awaz suno aur type karo.`,
    items: cat.words.map(w => item(w[0], w[1], w[2])) });
});

// --- More Stage 7: Additional box game levels ---
const moreBoxWords = ['kitaab','shaam','raat','doodh','roti','saal','baarish','khaana','school','safar'];
moreBoxWords.forEach((w) => {
  const urduMap = { kitaab:'کتاب',shaam:'شام',raat:'رات',doodh:'دودھ',roti:'روٹی',saal:'سال',baarish:'بارش',khaana:'کھانا',school:'سکول',safar:'سفر' };
  const hintMap = { kitaab:'book',shaam:'evening',raat:'night',doodh:'milk',roti:'bread',saal:'year',baarish:'rain',khaana:'food',school:'school',safar:'journey' };
  levels.push({ id: extraId++, stage: 7, title: `Box ${w}`, subtitle: 'Word building', mode: 'box',
    intro: `Khali dabbe bharo! Lafz: ${w}.`,
    items: [item(w, urduMap[w] || w, hintMap[w] || w)] });
});

// --- Revision exams (every 10 additional levels) ---
levels.push({ id: extraId++, stage: 3, title: 'Phonics Imtihan', subtitle: 'Revision exam', mode: 'exam',
  intro: 'Phonics ka bara imtihan!',
  items: [item('chai','چائے','tea'),item('neend','نیند','sleep'),item('khaana','کھانا','food'),item('saal','سال','year'),item('chaand','چاند','moon')] });

levels.push({ id: extraId++, stage: 5, title: 'Syllable Imtihan', subtitle: 'Revision exam', mode: 'exam',
  intro: 'Syllable ka imtihan!',
  items: [item('paani','پانی','water'),item('kamyabi','کامیابی','success'),item('school','سکول','school'),item('doodh','دودھ','milk')] });

levels.push({ id: extraId++, stage: 9, title: 'Jumla Imtihan', subtitle: 'Revision exam', mode: 'exam',
  intro: 'Jumlay ka imtihan!',
  items: [item('mera ghar','میرا گھر','my home'),item('aaj mausam acha hai','آج موسم اچھا ہے','today the weather is nice'),item('mujhe pani chahiye','مجھے پانی چاہیے','I need water')] });

levels.push({ id: extraId++, stage: 10, title: 'Mazahiya Imtihan', subtitle: 'Revision exam', mode: 'exam', long: true,
  intro: 'Mazahiya jumlon ka imtihan!',
  items: [item('aaj main thak gaya hoon','آج میں تھک گیا ہوں','today I got tired'),item('ustaad ne poocha kahan ho','استاد نے پوچھا کہاں ہو','teacher asked where are you')] });

levels.push({ id: extraId++, stage: 11, title: 'Islami Imtihan', subtitle: 'Revision exam', mode: 'exam',
  intro: 'Islami sabaq ka imtihan!',
  items: [item('sach bolna ek acha akhlaq hai','سچ بولنا ایک اچھا اخلاق ہے','truth is good character'),item('namaz roz parho','نماز روز پڑھو','pray daily')] });

// --- Final motivation paragraphs ---
levels.push({ id: extraId++, stage: 12, title: 'Mehnat ka Sabaq', subtitle: 'Motivational', mode: 'copy', long: true,
  intro: 'Mehnat karne wala kabhi na kaam yaad nahi rehta.',
  items: [item('mehnat karne wala kabhi na kaam yaad nahi rehta. har roz thora thora seekho. aik din tum bohat aage nikal jao ge.', 'محنت کرنے والا کبھی ناکام یاد نہیں رہتا۔ ہر روز تھوڑا تھوڑا سیکھو۔ ایک دن تم بہت آگے نکل جاؤ گے۔', 'hard work pays off')] });

levels.push({ id: extraId++, stage: 12, title: 'Waqt ki Qadar', subtitle: 'Motivational', mode: 'copy', long: true,
  intro: 'Waqt sab se qeemti cheez hai.',
  items: [item('waqt sab se qeemti cheez hai jo waqt ki qadar karta hai wohi aage barhta hai isliye main roz apna kaam waqt par karta hoon', 'وقت سب سے قیمتی چیز ہے جو وقت کی قدر کرتا ہے وہی آگے بڑھتا ہے اس لیے میں روز اپنا کام وقت پر کرتا ہوں', 'time is precious')] });

levels.push({ id: extraId++, stage: 12, title: 'Meethi Zabaan', subtitle: 'Motivational', mode: 'copy', long: true,
  intro: 'Meethi zabaan sab se sasta tohfa hai.',
  items: [item('doosre ne poocha yeh jadoo kya tha us ne kaha meethi zabaan sab se sasta tohfa hai', 'دوسرے نے پوچھا یہ جادو کیا تھا اس نے کہا میٹھی زبان سب سے سستا تحفہ ہے', 'sweet words are the cheapest gift')] });

levels.push({ id: extraId++, stage: 12, title: 'Aadhi Roti', subtitle: 'Motivational', mode: 'copy', long: true,
  intro: 'Sabr aur deny wala kabhi khaali nahi rehta.',
  items: [item('us ne hans kar kaha aadhi roti ka sauda bohat nafa mand raha sabr aur deny wala kabhi khaali nahi rehta', 'اس نے ہنس کر کہا آدھی روٹی کا سودا بہت نفع مند رہا صبر اور دینے والا کبھی خالی نہیں رہتا', 'patience and giving never go empty')] });

levels.push({ id: extraId++, stage: 12, title: 'Do Dost', subtitle: 'Motivational', mode: 'copy', long: true,
  intro: 'Do dost bazaar gaye.',
  items: [item('do dost bazaar gaye aik dukandaar se sakht lehje mein baat karta tha', 'دو دوست بازار گئے ایک دکاندار سےخت لہجے میں بات کرتا تھا', 'two friends went to market')] });

// --- More Stage 2: Sound practice ---
const soundExtra = [
  { title: 'p vs b', subtitle: 'Similar sounds', words: [['paani','پانی','water'],['baani','بانئ','creator'],['phal','پھل','fruit'],['bal','بل','strength']] },
  { title: 't vs d', subtitle: 'Similar sounds', words: [['taala','تالا','lock'],['daal','دال','lentils'],['tum','تم','you'],['din','دن','day']] },
  { title: 'k vs g', subtitle: 'Similar sounds', words: [['kaam','کام','work'],['gaana','گانا','song'],['kal','کل','tomorrow'],['gol','گول','round']] },
  { title: 's vs sh', subtitle: 'Similar sounds', words: [['saal','سال','year'],['shaam','شام','evening'],['sach','سچ','truth'],['shor','شور','noise']] },
  { title: 'Sound Review', subtitle: 'All sounds', words: [['naam','نام','name'],['kaam','کام','work'],['chaand','چاند','moon'],['khaana','کھانا','food'],['doodh','دودھ','milk']] },
];
soundExtra.forEach(s => {
  levels.push({ id: extraId++, stage: 2, title: s.title, subtitle: s.subtitle, mode: 'copy',
    intro: `${s.title}. Awazein pehchano aur type karo.`,
    items: s.words.map(w => item(w[0], w[1], w[2])) });
});

// --- More Stage 8: Word breaking ---
const moreBreakWords = ['chaand','shaam','saal','doodh','roti','kitaab','mohabbat','kamyabi','taleem','zimmedari'];
moreBreakWords.forEach((w) => {
  const urduMap = { chaand:'چاند',shaam:'شام',saal:'سال',doodh:'دودھ',roti:'روٹی',kitaab:'کتاب',mohabbat:'محبت',kamyabi:'کامیابی',taleem:'تعليم',zimmedari:'ذمہ داری' };
  const hintMap = { chaand:'moon',shaam:'evening',saal:'year',doodh:'milk',roti:'bread',kitaab:'book',mohabbat:'love',kamyabi:'success',taleem:'education',zimmedari:'responsibility' };
  levels.push({ id: extraId++, stage: 8, title: `Todo ${w}`, subtitle: 'Break and rebuild', mode: 'break',
    intro: `Lafz ko haroof mein todo aur phir jodo. Lafz: ${w}.`,
    items: [item(w, urduMap[w] || w, hintMap[w] || w)] });
});

// --- Additional revision exams ---
levels.push({ id: extraId++, stage: 2, title: 'Awaz Imtihan', subtitle: 'Revision exam', mode: 'exam',
  intro: 'Awazoon ka imtihan!',
  items: [item('naam','نام','name'),item('chaand','چاند','moon'),item('khaana','کھانا','food'),item('doodh','دودھ','milk'),item('saal','سال','year')] });

levels.push({ id: extraId++, stage: 4, title: 'Lafz Imtihan', subtitle: 'Revision exam', mode: 'exam',
  intro: 'Lafz ka bara imtihan!',
  items: [item('suraj','سورج','sun'),item('darakht','درخت','tree'),item('kapra','کپڑا','cloth'),item('aankh','آنکھ','eye'),item('khushi','خوشی','happiness')] });

levels.push({ id: extraId++, stage: 7, title: 'Box Imtihan', subtitle: 'Revision exam', mode: 'exam',
  intro: 'Box game ka imtihan!',
  items: [item('doodh','دودھ','milk'),item('kitaab','کتاب','book'),item('mohabbat','محبت','love'),item('kamyabi','کامیابی','success')] });

levels.push({ id: extraId++, stage: 8, title: 'Break Imtihan', subtitle: 'Revision exam', mode: 'exam',
  intro: 'Word breaking ka imtihan!',
  items: [item('chaand','چاند','moon'),item('roti','روٹی','bread'),item('taleem','تعليم','education'),item('zimmedari','ذمہ داری','responsibility')] });

export { levels as allLevels };
export default { stages, allLevels: levels };
