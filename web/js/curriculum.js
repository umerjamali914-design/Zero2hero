/* ========================================
   CURRICULUM — Zero to Hero
   130+ levels across 6 phases:
   1. Haroof (Individual Sounds)     L1-30
   2. 2-Haroof Jodna (Blending)      L31-50
   3. 3-Haroof Lafz (Word Building)  L51-70
   4. Lafz (Words by Category)       L71-95
   5. Jumlay (Sentences)             L96-115
   6. Kahaniyan (Stories)            L116-130+

   Every 5 levels: Milestone "Umer Jamali Beautiful"
   Every 10 levels: Assessment exam
   Every level: ends with dictation
   ======================================== */

const Curriculum = (() => {

  // Helper to create a word item
  const W = (text, urdu, english, emoji, syllables) => ({ text, urdu, english, emoji, syllables: syllables || splitSyllables(text) });

  // Simple syllable splitter for Roman Urdu
  function splitSyllables(word) {
    word = word.toLowerCase().replace(/[^a-z]/g, '');
    if (word.length <= 2) return [word];
    const syllables = [];
    let current = '';
    const vowels = 'aeiou';
    for (let i = 0; i < word.length; i++) {
      current += word[i];
      if (vowels.includes(word[i]) && i < word.length - 1) {
        // Look ahead - if next char is a vowel too (like 'aa', 'ee', 'oo'), include it
        if (vowels.includes(word[i + 1]) && i + 1 < word.length) {
          current += word[i + 1];
          i++;
        }
        syllables.push(current);
        current = '';
      }
    }
    if (current) syllables.push(current);
    // Merge very short syllables
    const merged = [];
    for (let s of syllables) {
      if (s.length === 1 && merged.length > 0 && merged[merged.length - 1].length <= 2) {
        merged[merged.length - 1] += s;
      } else {
        merged.push(s);
      }
    }
    return merged.length > 0 ? merged : [word];
  }

  // Helper for sentence items
  const S = (text, urdu, english) => ({ text, urdu, english });

  // Helper for story items
  const Story = (title, lines, isIslamic) => ({ title, lines, isIslamic });

  const phases = [
    { id: 1, name: 'Haroof', tagline: 'Aik aik awaz seekho' },
    { id: 2, name: 'Do Haroof Jodna', tagline: 'Aawazein milao' },
    { id: 3, name: 'Lafz Banao', tagline: 'Teen haroof se lafz' },
    { id: 4, name: 'Lafz', tagline: 'Cheezon ke naam' },
    { id: 5, name: 'Jumlay', tagline: 'Baatein seekho' },
    { id: 6, name: 'Kahaniyan', tagline: ' kahaniyaan aur deeni baatein' },
  ];

  const levels = [
    // ===== PHASE 1: INDIVIDUAL SOUNDS (Levels 1-30) =====
    { id: 1, phase: 1, title: 'a', subtitle: 'Alif ki awaz', mode: 'letter',
      intro: 'Yeh "a" hai. Iski awaz "aa" hai. Jaise: ab, aam, aankh.',
      items: [
        { key: 'a', sound: 'aa', urdu: 'alif', example: 'ab', emoji: '🅰️' },
        { key: 'a', sound: 'aa', urdu: 'alif', example: 'aam', emoji: '🅰️' },
        { key: 'a', sound: 'aa', urdu: 'alif', example: 'aankh', emoji: '👁️' },
      ]},

    { id: 2, phase: 1, title: 'b', subtitle: 'Bay ki awaz', mode: 'letter',
      intro: 'Yeh "b" hai. Iski awaz "ba" hai. Jaise: baba, barf, balla.',
      items: [
        { key: 'b', sound: 'ba', urdu: 'bay', example: 'baba', emoji: '👨' },
        { key: 'b', sound: 'ba', urdu: 'bay', example: 'barf', emoji: '❄️' },
        { key: 'b', sound: 'ba', urdu: 'bay', example: 'billa', emoji: '🐱' },
      ]},

    { id: 3, phase: 1, title: 'p', subtitle: 'Pay ki awaz', mode: 'letter',
      intro: 'Yeh "p" hai. Iski awaz "pa" hai. Jaise: pani, phal, panja.',
      items: [
        { key: 'p', sound: 'pa', urdu: 'pay', example: 'pani', emoji: '💧' },
        { key: 'p', sound: 'pa', urdu: 'pay', example: 'phal', emoji: '🍎' },
        { key: 'p', sound: 'pa', urdu: 'pay', example: 'panja', emoji: '✋' },
      ]},

    { id: 4, phase: 1, title: 't', subtitle: 'Tay ki awaz', mode: 'letter',
      intro: 'Yeh "t" hai. Iski awaz "ta" hai. Jaise: taala, taare, taaza.',
      items: [
        { key: 't', sound: 'ta', urdu: 'tay', example: 'taala', emoji: '🔒' },
        { key: 't', sound: 'ta', urdu: 'tay', example: 'taare', emoji: '⭐' },
        { key: 't', sound: 'ta', urdu: 'tay', example: 'tan', emoji: '💪' },
      ]},

    // Level 5: Milestone + Dictation review
    { id: 5, phase: 1, title: 'Mashq 1', subtitle: 'Pehle charo awazein', mode: 'dictation',
      intro: 'Ab jo seekha uska imtehaan! Awaz suno aur type karo.',
      items: [
        W('ab', 'اب', 'now', '⏰'),
        W('baba', 'بابا', 'father', '👨'),
        W('pani', 'پانی', 'water', '💧'),
        W('taala', 'تالا', 'lock', '🔒'),
      ]},

    { id: 6, phase: 1, title: 'd', subtitle: 'Daal ki awaz', mode: 'letter',
      intro: 'Yeh "d" hai. Iski awaz "da" hai. Jaise: darwaza, dhoop, das.',
      items: [
        { key: 'd', sound: 'da', urdu: 'daal', example: 'darwaza', emoji: '🚪' },
        { key: 'd', sound: 'da', urdu: 'daal', example: 'das', emoji: '🔟' },
        { key: 'd', sound: 'da', urdu: 'daal', example: 'dana', emoji: '🌾' },
      ]},

    { id: 7, phase: 1, title: 'n', subtitle: 'Noon ki awaz', mode: 'letter',
      intro: 'Yeh "n" hai. Iski awaz "na" hai. Jaise: naam, nadi, neend.',
      items: [
        { key: 'n', sound: 'na', urdu: 'noon', example: 'naam', emoji: '📛' },
        { key: 'n', sound: 'na', urdu: 'noon', example: 'nadi', emoji: '🏞️' },
        { key: 'n', sound: 'na', urdu: 'noon', example: 'neend', emoji: '😴' },
      ]},

    { id: 8, phase: 1, title: 'm', subtitle: 'Meem ki awaz', mode: 'letter',
      intro: 'Yeh "m" hai. Iski awaz "ma" hai. Jaise: ammi, mausam, mala.',
      items: [
        { key: 'm', sound: 'ma', urdu: 'meem', example: 'ammi', emoji: '👩' },
        { key: 'm', sound: 'ma', urdu: 'meem', example: 'mausam', emoji: '🌤️' },
        { key: 'm', sound: 'ma', urdu: 'meem', example: 'mala', emoji: '📿' },
      ]},

    { id: 9, phase: 1, title: 'l', subtitle: 'Laam ki awaz', mode: 'letter',
      intro: 'Yeh "l" hai. Iski awaz "la" hai. Jaise: laal, larka, loha.',
      items: [
        { key: 'l', sound: 'la', urdu: 'laam', example: 'laal', emoji: '🔴' },
        { key: 'l', sound: 'la', urdu: 'laam', example: 'larka', emoji: '👦' },
        { key: 'l', sound: 'la', urdu: 'laam', example: 'loha', emoji: '🔩' },
      ]},

    // Level 10: Assessment
    { id: 10, phase: 1, title: 'Imtehaan 1', subtitle: 'Pehla bara imtehaan', mode: 'assessment',
      intro: 'Yeh pehla bara imtehaan hai! Jo 9 levels mein seekha usko yaad karke type karo.',
      items: [
        W('ab', 'اب', 'now', '⏰'),
        W('pani', 'پانی', 'water', '💧'),
        W('taala', 'تالا', 'lock', '🔒'),
        W('naam', 'نام', 'name', '📛'),
        W('ammi', 'امی', 'mother', '👩'),
        W('laal', 'لال', 'red', '🔴'),
        W('baba', 'بابا', 'father', '👨'),
        W('darwaza', 'دروازہ', 'door', '🚪'),
      ]},

    { id: 11, phase: 1, title: 'r', subtitle: 'Ray ki awaz', mode: 'letter',
      intro: 'Yeh "r" hai. Iski awaz "ra" hai. Jaise: roti, raasta, rang.',
      items: [
        { key: 'r', sound: 'ra', urdu: 'ray', example: 'roti', emoji: '🫓' },
        { key: 'r', sound: 'ra', urdu: 'ray', example: 'raasta', emoji: '🛤️' },
        { key: 'r', sound: 'ra', urdu: 'ray', example: 'rang', emoji: '🎨' },
      ]},

    { id: 12, phase: 1, title: 'k', subtitle: 'Kaaf ki awaz', mode: 'letter',
      intro: 'Yeh "k" hai. Iski awaz "ka" hai. Jaise: kaam, kitaab, kaan.',
      items: [
        { key: 'k', sound: 'ka', urdu: 'kaaf', example: 'kaam', emoji: '💼' },
        { key: 'k', sound: 'ka', urdu: 'kaaf', example: 'kitaab', emoji: '📚' },
        { key: 'k', sound: 'ka', urdu: 'kaaf', example: 'kaan', emoji: '👂' },
      ]},

    { id: 13, phase: 1, title: 'g', subtitle: 'Gaaf ki awaz', mode: 'letter',
      intro: 'Yeh "g" hai. Iski awaz "ga" hai. Jaise: ghar, gaari, garm.',
      items: [
        { key: 'g', sound: 'ga', urdu: 'gaaf', example: 'ghar', emoji: '🏠' },
        { key: 'g', sound: 'ga', urdu: 'gaaf', example: 'gaari', emoji: '🚗' },
        { key: 'g', sound: 'ga', urdu: 'gaaf', example: 'garm', emoji: '🔥' },
      ]},

    { id: 14, phase: 1, title: 'h', subtitle: 'Hay ki awaz', mode: 'letter',
      intro: 'Yeh "h" hai. Iski awaz "ha" hai. Jaise: hawa, haath, haseen.',
      items: [
        { key: 'h', sound: 'ha', urdu: 'hay', example: 'hawa', emoji: '💨' },
        { key: 'h', sound: 'ha', urdu: 'hay', example: 'haath', emoji: '🤚' },
        { key: 'h', sound: 'ha', urdu: 'hay', example: 'hara', emoji: '💚' },
      ]},

    // Level 15: Milestone + Dictation
    { id: 15, phase: 1, title: 'Mashq 2', subtitle: 'Awazon ka imtehaan', mode: 'dictation',
      intro: 'Jo naye awazein seekha unka imtehaan! Dhyan se suno.',
      items: [
        W('roti', 'روٹی', 'bread', '🫓'),
        W('kaam', 'کام', 'work', '💼'),
        W('ghar', 'گھر', 'home', '🏠'),
        W('hawa', 'ہوا', 'wind', '💨'),
      ]},

    { id: 16, phase: 1, title: 's', subtitle: 'Seen ki awaz', mode: 'letter',
      intro: 'Yeh "s" hai. Iski awaz "sa" hai. Jaise: saal, sarak, suraj.',
      items: [
        { key: 's', sound: 'sa', urdu: 'seen', example: 'saal', emoji: '📅' },
        { key: 's', sound: 'sa', urdu: 'seen', example: 'sarak', emoji: '🛣️' },
        { key: 's', sound: 'sa', urdu: 'seen', example: 'suraj', emoji: '☀️' },
      ]},

    { id: 17, phase: 1, title: 'sh', subtitle: 'Sheen ki awaz', mode: 'letter',
      intro: 'Yeh "sh" hai — do haroof milkar aik awaz. Iski awaz "sha" hai. Jaise: shabnam, sheher, shakhs.',
      items: [
        { key: 'sh', sound: 'sha', urdu: 'sheen', example: 'shabnam', emoji: '💧' },
        { key: 'sh', sound: 'sha', urdu: 'sheen', example: 'sheher', emoji: '🏙️' },
        { key: 'sh', sound: 'sha', urdu: 'sheen', example: 'shakhs', emoji: '🧑' },
      ]},

    { id: 18, phase: 1, title: 'ch', subtitle: 'Chay ki awaz', mode: 'letter',
      intro: 'Yeh "ch" hai — do haroof, aik awaz. Iski awaz "cha" hai. Jaise: chai, chhat, chand.',
      items: [
        { key: 'ch', sound: 'cha', urdu: 'chay', example: 'chai', emoji: '🍵' },
        { key: 'ch', sound: 'cha', urdu: 'chay', example: 'chhat', emoji: '🏠' },
        { key: 'ch', sound: 'cha', urdu: 'chay', example: 'chaand', emoji: '🌙' },
      ]},

    { id: 19, phase: 1, title: 'j', subtitle: 'Jeem ki awaz', mode: 'letter',
      intro: 'Yeh "j" hai. Iski awaz "ja" hai. Jaise: jaan, joota, jungle.',
      items: [
        { key: 'j', sound: 'ja', urdu: 'jeem', example: 'jaan', emoji: '❤️' },
        { key: 'j', sound: 'ja', urdu: 'jeem', example: 'joota', emoji: '👟' },
        { key: 'j', sound: 'ja', urdu: 'jeem', example: 'jungle', emoji: '🌴' },
      ]},

    // Level 20: Assessment
    { id: 20, phase: 1, title: 'Imtehaan 2', subtitle: 'Doosra bara imtehaan', mode: 'assessment',
      intro: 'Doosra bara imtehaan! Sare naye awazein yaad karke likho.',
      items: [
        W('saal', 'سال', 'year', '📅'),
        W('sheher', 'شہر', 'city', '🏙️'),
        W('chai', 'چائے', 'tea', '🍵'),
        W('jaan', 'جان', 'life', '❤️'),
        W('roti', 'روٹی', 'bread', '🫓'),
        W('ghar', 'گھر', 'home', '🏠'),
        W('hawa', 'ہوا', 'wind', '💨'),
        W('kaam', 'کام', 'work', '💼'),
      ]},

    { id: 21, phase: 1, title: 'kh', subtitle: 'Khay ki awaz', mode: 'letter',
      intro: 'Yeh "kh" hai. Iski awaz "kha" hai. Jaise: khaana, khwab, khidmat.',
      items: [
        { key: 'kh', sound: 'kha', urdu: 'khay', example: 'khaana', emoji: '🍽️' },
        { key: 'kh', sound: 'kha', urdu: 'khay', example: 'khwab', emoji: '💭' },
        { key: 'kh', sound: 'kha', urdu: 'khay', example: 'khidmat', emoji: '🤝' },
      ]},

    { id: 22, phase: 1, title: 'gh', subtitle: 'Ghain ki awaz', mode: 'letter',
      intro: 'Yeh "gh" hai. Iski awaz "gha" hai. Jaise: ghalat, ghaas, ghari.',
      items: [
        { key: 'gh', sound: 'gha', urdu: 'ghain', example: 'ghalat', emoji: '❌' },
        { key: 'gh', sound: 'gha', urdu: 'ghain', example: 'ghaas', emoji: '🌱' },
        { key: 'gh', sound: 'gha', urdu: 'ghain', example: 'ghari', emoji: '⏰' },
      ]},

    { id: 23, phase: 1, title: 'z', subtitle: 'Zay ki awaz', mode: 'letter',
      intro: 'Yeh "z" hai. Iski awaz "za" hai. Jaise: zameen, zaroori, zindagi.',
      items: [
        { key: 'z', sound: 'za', urdu: 'zay', example: 'zameen', emoji: '🌍' },
        { key: 'z', sound: 'za', urdu: 'zay', example: 'zaroori', emoji: '⚠️' },
        { key: 'z', sound: 'za', urdu: 'zay', example: 'zindagi', emoji: '🌟' },
      ]},

    { id: 24, phase: 1, title: 'f', subtitle: 'Fay ki awaz', mode: 'letter',
      intro: 'Yeh "f" hai. Iski awaz "fa" hai. Jaise: faqat, faasla, faisla.',
      items: [
        { key: 'f', sound: 'fa', urdu: 'fay', example: 'faasla', emoji: '📏' },
        { key: 'f', sound: 'fa', urdu: 'fay', example: 'faisla', emoji: '⚖️' },
        { key: 'f', sound: 'fa', urdu: 'fay', example: 'falda', emoji: '🌱' },
      ]},

    // Level 25: Milestone + Dictation
    { id: 25, phase: 1, title: 'Mashq 3', subtitle: 'Mushkil awazein', mode: 'dictation',
      intro: 'Mushkil awazon ka imtehaan! Dhyan se suno aur type karo.',
      items: [
        W('khaana', 'کھانا', 'food', '🍽️'),
        W('ghalat', 'غلط', 'wrong', '❌'),
        W('zameen', 'زمین', 'earth', '🌍'),
        W('faasla', 'فاصلہ', 'distance', '📏'),
      ]},

    { id: 26, phase: 1, title: 'q', subtitle: 'Qaaf ki awaz', mode: 'letter',
      intro: 'Yeh "q" hai. Iski awaz "qa" hai — gala thoda dab kar. Jaise: qalam, qaum, qurbat.',
      items: [
        { key: 'q', sound: 'qa', urdu: 'qaaf', example: 'qalam', emoji: '✏️' },
        { key: 'q', sound: 'qa', urdu: 'qaaf', example: 'qaum', emoji: '👥' },
        { key: 'q', sound: 'qa', urdu: 'qaaf', example: 'qurb', emoji: '📍' },
      ]},

    { id: 27, phase: 1, title: 'y', subtitle: 'Yay ki awaz', mode: 'letter',
      intro: 'Yeh "y" hai. Iski awaz "ya" hai. Jaise: yaar, yaad, yeh.',
      items: [
        { key: 'y', sound: 'ya', urdu: 'yay', example: 'yaar', emoji: '🤝' },
        { key: 'y', sound: 'ya', urdu: 'yay', example: 'yaad', emoji: '🧠' },
        { key: 'y', sound: 'ya', urdu: 'yay', example: 'yeh', emoji: '👉' },
      ]},

    { id: 28, phase: 1, title: 'w', subtitle: 'Wao ki awaz', mode: 'letter',
      intro: 'Yeh "w" hai. Iski awaz "wa" hai. Jaise: waqt, wuzu, wapas.',
      items: [
        { key: 'w', sound: 'wa', urdu: 'wao', example: 'waqt', emoji: '⏰' },
        { key: 'w', sound: 'wa', urdu: 'wao', example: 'wuzu', emoji: '💧' },
        { key: 'w', sound: 'wa', urdu: 'wao', example: 'wapas', emoji: '↩️' },
      ]},

    { id: 29, phase: 1, title: 'bh · th · dh · ph', subtitle: 'Bhaari awazein', mode: 'letter',
      intro: 'Yeh bhaari awazein hain. "bh" (bhara), "th" (thand), "dh" (dhoop), "ph" (phal).',
      items: [
        { key: 'bh', sound: 'bha', urdu: 'bhay', example: 'bhara', emoji: '⚖️' },
        { key: 'th', sound: 'tha', urdu: 'thay', example: 'thand', emoji: '🧊' },
        { key: 'dh', sound: 'dha', urdu: 'dhal', example: 'dhoop', emoji: '☀️' },
        { key: 'ph', sound: 'pha', urdu: 'phay', example: 'phool', emoji: '🌸' },
      ]},

    // Level 30: Assessment
    { id: 30, phase: 1, title: 'Imtehaan 3', subtitle: 'Teesra bara imtehaan', mode: 'assessment',
      intro: 'Teesra bara imtehaan! Phase 1 khatam hone wala hai!',
      items: [
        W('qalam', 'قلم', 'pen', '✏️'),
        W('yaad', 'یاد', 'memory', '🧠'),
        W('waqt', 'وقت', 'time', '⏰'),
        W('khaana', 'کھانا', 'food', '🍽️'),
        W('zameen', 'زمین', 'earth', '🌍'),
        W('sheher', 'شہر', 'city', '🏙️'),
        W('bhara', 'بھرا', 'full', '⚖️'),
        W('phool', 'پھول', 'flower', '🌸'),
      ]},

    // ===== PHASE 2: TWO-LETTER BLENDING (Levels 31-50) =====
    { id: 31, phase: 2, title: 'a + b', subtitle: 'ab banao', mode: 'blend2',
      intro: 'Ab do awazein jodte hain! "a" + "b" = "ab". Pehle dono alag suno, phir milkar.',
      items: [
        { letters: ['a', 'b'], result: 'ab', urdu: 'اب', emoji: '⏰' },
        { letters: ['a', 'm'], result: 'am', urdu: 'ام', emoji: '🤫' },
        { letters: ['a', 'n'], result: 'an', urdu: 'ان', emoji: '🥭' },
      ]},

    { id: 32, phase: 2, title: 'a + t/d', subtitle: 'at, ad banao', mode: 'blend2',
      intro: '"a" + "t" = "at". "a" + "d" = "ad". Dono awazein milkar naya lafz.',
      items: [
        { letters: ['a', 't'], result: 'at', urdu: 'ات', emoji: '📌' },
        { letters: ['a', 'd'], result: 'ad', urdu: 'اد', emoji: '📊' },
        { letters: ['a', 'l'], result: 'al', urdu: 'ال', emoji: '🅰️' },
      ]},

    { id: 33, phase: 2, title: 'i + consonants', subtitle: 'is, id, il', mode: 'blend2',
      intro: 'Choti "i" ki awaz. "i" + "s" = "is". "i" + "d" = "id".',
      items: [
        { letters: ['i', 's'], result: 'is', urdu: 'اس', emoji: '👉' },
        { letters: ['i', 'd'], result: 'id', urdu: 'اڈ', emoji: '🪪' },
        { letters: ['i', 'l'], result: 'il', urdu: 'ال', emoji: '📍' },
      ]},

    { id: 34, phase: 2, title: 'u + consonants', subtitle: 'us, ud, ul', mode: 'blend2',
      intro: '"u" ki awaz. "u" + "s" = "us". "u" + "n" = "un".',
      items: [
        { letters: ['u', 's'], result: 'us', urdu: 'اس', emoji: '👇' },
        { letters: ['u', 'n'], result: 'un', urdu: 'ان', emoji: '✌️' },
        { letters: ['u', 'l'], result: 'ul', urdu: 'ال', emoji: '🔄' },
      ]},

    // Level 35: Milestone + Dictation
    { id: 35, phase: 2, title: 'Mashq 4', subtitle: 'Do haroof imtehaan', mode: 'dictation',
      intro: 'Do haroof wale lafzon ka imtehaan!',
      items: [
        W('ab', 'اب', 'now', '⏰'),
        W('am', 'ام', 'hush', '🤫'),
        W('is', 'اس', 'this', '👉'),
        W('un', 'ان', 'those', '✌️'),
      ]},

    { id: 36, phase: 2, title: 'aa + consonants', subtitle: 'Lambi awaz jodna', mode: 'blend2',
      intro: 'Lambi "aa" awaz. "a" + "a" = "aa". Phir "aa" + "b" = "aab".',
      items: [
        { letters: ['aa', 'b'], result: 'aab', urdu: 'آب', emoji: '💧' },
        { letters: ['aa', 'm'], result: 'aam', urdu: 'آم', emoji: '🥭' },
        { letters: ['aa', 'n'], result: 'aan', urdu: 'آن', emoji: '🚪' },
      ]},

    { id: 37, phase: 2, title: 'ee + consonants', subtitle: 'Lambi ee jodna', mode: 'blend2',
      intro: 'Lambi "ee" awaz. "ee" + "r" = "eer". "ee" + "n" = "een".',
      items: [
        { letters: ['ee', 'r'], result: 'eer', urdu: 'یر', emoji: '🦌' },
        { letters: ['ee', 'n'], result: 'een', urdu: 'ین', emoji: '📝' },
        { letters: ['ee', 'd'], result: 'eed', urdu: 'اید', emoji: '💥' },
      ]},

    { id: 38, phase: 2, title: 'oo + consonants', subtitle: 'Lambi oo jodna', mode: 'blend2',
      intro: 'Lambi "oo" awaz. "oo" + "n" = "oon". "oo" + "r" = "oor".',
      items: [
        { letters: ['oo', 'n'], result: 'oon', urdu: 'ون', emoji: '🌙' },
        { letters: ['oo', 'r'], result: 'oor', urdu: 'ور', emoji: '🚪' },
        { letters: ['oo', 't'], result: 'oot', urdu: 'وت', emoji: '👢' },
      ]},

    { id: 39, phase: 2, title: 'sh/ch + vowels', subtitle: 'Do haroof awaz + vowel', mode: 'blend2',
      intro: '"sh" + "a" = "sha". "ch" + "a" = "cha". Do haroof wali awaz ko vowel ke saath jodo.',
      items: [
        { letters: ['sh', 'a'], result: 'sha', urdu: 'شا', emoji: '🌆' },
        { letters: ['ch', 'a'], result: 'cha', urdu: 'چا', emoji: '🍵' },
        { letters: ['kh', 'a'], result: 'kha', urdu: 'کھا', emoji: '🍽️' },
      ]},

    // Level 40: Assessment
    { id: 40, phase: 2, title: 'Imtehaan 4', subtitle: 'Jodna imtehaan', mode: 'assessment',
      intro: 'Chotha bara imtehaan! Do haroof jodne ki practice.',
      items: [
        W('aab', 'آب', 'water', '💧'),
        W('aam', 'آم', 'mango', '🥭'),
        W('is', 'اس', 'this', '👉'),
        W('sha', 'شا', 'sha', '🌆'),
        W('cha', 'چا', 'cha', '🍵'),
        W('ab', 'اب', 'now', '⏰'),
        W('oon', 'ون', 'oon', '🌙'),
        W('kha', 'کھا', 'kha', '🍽️'),
      ]},

    { id: 41, phase: 2, title: 'Consonant + aa', subtitle: 'baa, saa, raa', mode: 'blend2',
      intro: 'Ab consonant pehle, phir lambi "aa". "b" + "aa" = "baa". "s" + "aa" = "saa".',
      items: [
        { letters: ['b', 'aa'], result: 'baa', urdu: 'با', emoji: '🍺' },
        { letters: ['s', 'aa'], result: 'saa', urdu: 'سا', emoji: '🐍' },
        { letters: ['r', 'aa'], result: 'raa', urdu: 'را', emoji: '☀️' },
      ]},

    { id: 42, phase: 2, title: 'Consonant + ee', subtitle: 'bee, see, lee', mode: 'blend2',
      intro: 'Consonant + lambi "ee". "b" + "ee" = "bee". "s" + "ee" = "see".',
      items: [
        { letters: ['b', 'ee'], result: 'bee', urdu: 'بی', emoji: '🐝' },
        { letters: ['s', 'ee'], result: 'see', urdu: 'سی', emoji: '👀' },
        { letters: ['l', 'ee'], result: 'lee', urdu: 'لی', emoji: '🛏️' },
      ]},

    { id: 43, phase: 2, title: 'Consonant + oo', subtitle: 'boo, soo, roo', mode: 'blend2',
      intro: 'Consonant + lambi "oo". "b" + "oo" = "boo". "s" + "oo" = "soo".',
      items: [
        { letters: ['b', 'oo'], result: 'boo', urdu: 'بو', emoji: '👻' },
        { letters: ['s', 'oo'], result: 'soo', urdu: 'سو', emoji: '💯' },
        { letters: ['r', 'oo'], result: 'roo', urdu: 'رو', emoji: '🛣️' },
      ]},

    { id: 44, phase: 2, title: 'Mix practice', subtitle: 'Sab mila ke', mode: 'blend2',
      intro: 'Ab sab mix karke practice! Har combination dhyan se suno.',
      items: [
        { letters: ['m', 'aa'], result: 'maa', urdu: 'ما', emoji: '👩' },
        { letters: ['p', 'aa'], result: 'paa', urdu: 'پا', emoji: '🦶' },
        { letters: ['n', 'ee'], result: 'nee', urdu: 'نی', emoji: '🔵' },
        { letters: ['t', 'oo'], result: 'too', urdu: 'تو', emoji: '👉' },
      ]},

    // Level 45: Milestone + Dictation
    { id: 45, phase: 2, title: 'Mashq 5', subtitle: 'Blend imtehaan', mode: 'dictation',
      intro: 'Blending ka imtehaan! Awaz suno aur type karo.',
      items: [
        W('baa', 'با', 'baa', '🍺'),
        W('see', 'سی', 'see', '👀'),
        W('maa', 'ما', 'mother', '👩'),
        W('too', 'تو', 'too', '👉'),
      ]},

    { id: 46, phase: 2, title: 'Consonant + ai', subtitle: 'bai, sai, nai', mode: 'blend2',
      intro: '"ai" ki awaz. "b" + "ai" = "bai". "s" + "ai" = "sai".',
      items: [
        { letters: ['b', 'ai'], result: 'bai', urdu: 'بائی', emoji: '👋' },
        { letters: ['s', 'ai'], result: 'sai', urdu: 'سائی', emoji: '🧘' },
        { letters: ['n', 'ai'], result: 'nai', urdu: 'نائی', emoji: '✂️' },
      ]},

    { id: 47, phase: 2, title: 'Consonant + au', subtitle: 'bau, sau', mode: 'blend2',
      intro: '"au" ki awaz. "b" + "au" = "bau". "s" + "au" = "sau".',
      items: [
        { letters: ['b', 'au'], result: 'bau', urdu: 'بو', emoji: '📦' },
        { letters: ['s', 'au'], result: 'sau', urdu: 'سو', emoji: '💯' },
        { letters: ['k', 'au'], result: 'kau', urdu: 'کو', emoji: '🦆' },
      ]},

    { id: 48, phase: 2, title: 'Complex blends', subtitle: 'sh/ch + vowels mix', mode: 'blend2',
      intro: 'Ab mushkil blends! "sh" + "oo" = "shoo". "ch" + "ee" = "chee".',
      items: [
        { letters: ['sh', 'oo'], result: 'shoo', urdu: 'شو', emoji: '👟' },
        { letters: ['ch', 'ee'], result: 'chee', urdu: 'چی', emoji: '🐭' },
        { letters: ['kh', 'aa'], result: 'khaa', urdu: 'کھا', emoji: '🍽️' },
      ]},

    { id: 49, phase: 2, title: 'All blends review', subtitle: 'Sab blend', mode: 'blend2',
      intro: 'Sab blends ka review! Har awaz dhyan se suno.',
      items: [
        { letters: ['g', 'aa'], result: 'gaa', urdu: 'گا', emoji: '🎵' },
        { letters: ['sh', 'aa'], result: 'shaa', urdu: 'شا', emoji: '🌆' },
        { letters: ['d', 'ee'], result: 'dee', urdu: 'ڈی', emoji: '🎲' },
        { letters: ['m', 'oo'], result: 'moo', urdu: 'مو', emoji: '🐄' },
      ]},

    // Level 50: Assessment
    { id: 50, phase: 2, title: 'Imtehaan 5', subtitle: 'Phase 2 khatam', mode: 'assessment',
      intro: 'Paanchwa bara imtehaan! Phase 2 khatam! Sab blends yaad karke likho.',
      items: [
        W('baa', 'با', 'baa', '🍺'),
        W('see', 'سی', 'see', '👀'),
        W('maa', 'ما', 'mother', '👩'),
        W('shoo', 'شو', 'shoe', '👟'),
        W('chee', 'چی', 'chee', '🐭'),
        W('gaa', 'گا', 'sing', '🎵'),
        W('bai', 'بائی', 'bye', '👋'),
        W('khaa', 'کھا', 'eat', '🍽️'),
      ]},

    // ===== PHASE 3: THREE-LETTER WORD BUILDING (Levels 51-70) =====
    { id: 51, phase: 3, title: 'p-a-n', subtitle: 'Pehla 3-haroof lafz', mode: 'wordbox',
      intro: 'Ab teen haroof milkar lafz banate hain! "p" + "a" + "n" = "pan". Har box mein sahi harf rakhdo.',
      items: [
        W('pan', 'پن', 'pan', '🍳'),
        W('man', 'من', 'man', '👨'),
        W('tan', 'تن', 'body', '💪'),
      ]},

    { id: 52, phase: 3, title: 'm-a-l', subtitle: 'Mala, mal', mode: 'wordbox',
      intro: 'Teen haroof wale lafz. Har harf sahi box mein rakhdo.',
      items: [
        W('mal', 'مل', 'mala', '📿'),
        W('dal', 'دل', 'lentil', '🍲'),
        W('kal', 'کل', 'tomorrow', '📅'),
      ]},

    { id: 53, phase: 3, title: 'b-a-t', subtitle: 'Bat, bet', mode: 'wordbox',
      intro: 'Box-filling game! Har lafz ke harf sahi jagah par rakhdo.',
      items: [
        W('bat', 'بت', 'bat', '🦇'),
        W('kat', 'کت', 'cut', '✂️'),
        W('rat', 'رت', 'rate', '⭐'),
      ]},

    { id: 54, phase: 3, title: 's-a-t', subtitle: 'Sat, sit', mode: 'wordbox',
      intro: 'Aur teen haroof wale lafz. Dhyan se har harf rakhdo.',
      items: [
        W('sat', 'ست', 'sat', '🪑'),
        W('mat', 'مت', 'don\'t', '🚫'),
        W('nat', 'نت', 'nat', '🧶'),
      ]},

    // Level 55: Milestone + Dictation
    { id: 55, phase: 3, title: 'Mashq 6', subtitle: '3-haroof imtehaan', mode: 'dictation',
      intro: 'Teen haroof wale lafzon ka imtehaan!',
      items: [
        W('pan', 'پن', 'pan', '🍳'),
        W('mal', 'مل', 'mala', '📿'),
        W('bat', 'بت', 'bat', '🦇'),
        W('sat', 'ست', 'sat', '🪑'),
      ]},

    { id: 56, phase: 3, title: 'n-a-m', subtitle: 'Nam, ram', mode: 'wordbox',
      intro: 'Aur 3-haroof lafz. "n" + "a" + "m" = "nam".',
      items: [
        W('nam', 'نام', 'name', '📛'),
        W('ram', 'رم', 'ram', '🐏'),
        W('kam', 'کم', 'less', '📉'),
      ]},

    { id: 57, phase: 3, title: 'r-a-t', subtitle: 'Rat, run', mode: 'wordbox',
      intro: 'Box mein harf rakhdo. "r" + "a" + "t" = "rat".',
      items: [
        W('rat', 'رت', 'rat', '🐀'),
        W('fan', 'پنکھا', 'fan', '🌀'),
        W('kan', 'کان', 'ear', '👂'),
      ]},

    { id: 58, phase: 3, title: 'd-a-r', subtitle: 'Dar, kar', mode: 'wordbox',
      intro: 'Teen haroof wale lafz. Har box mein sahi harf.',
      items: [
        W('dar', 'در', 'door', '🚪'),
        W('kar', 'کر', 'do', '✅'),
        W('bar', 'بر', 'gate', '🚪'),
      ]},

    { id: 59, phase: 3, title: '4 haroof', subtitle: 'Char haroof wale lafz', mode: 'wordbox',
      intro: 'Ab char haroof wale lafz! "p" + "a" + "n" + "i" = "pani".',
      items: [
        W('pani', 'پانی', 'water', '💧'),
        W('roti', 'روٹی', 'bread', '🫓'),
        W('sara', 'سڑا', 'road', '🛣️'),
      ]},

    // Level 60: Assessment
    { id: 60, phase: 3, title: 'Imtehaan 6', subtitle: 'Lafz banao imtehaan', mode: 'assessment',
      intro: 'Chatha bara imtehaan! Lafz banane ki practice.',
      items: [
        W('pan', 'پن', 'pan', '🍳'),
        W('nam', 'نام', 'name', '📛'),
        W('rat', 'رت', 'rat', '🐀'),
        W('dar', 'در', 'door', '🚪'),
        W('pani', 'پانی', 'water', '💧'),
        W('roti', 'روٹی', 'bread', '🫓'),
        W('mal', 'مل', 'mala', '📿'),
        W('kar', 'کر', 'do', '✅'),
      ]},

    { id: 61, phase: 3, title: 'd-a-na', subtitle: 'Dana, rana', mode: 'wordbox',
      intro: 'Char haroof wale lafz shuru. "d" + "a" + "n" + "a" = "dana".',
      items: [
        W('dana', 'دانہ', 'grain', '🌾'),
        W('mana', 'مانا', 'accepted', '🤝'),
        W('nada', 'نہیں', 'never', '🚫'),
      ]},

    { id: 62, phase: 3, title: 'k-a-m-a', subtitle: 'Kama, nama', mode: 'wordbox',
      intro: 'Lafz ko harfon mein todo aur box mein bharo.',
      items: [
        W('kama', 'کما', 'earn', '💰'),
        W('nama', 'نما', 'posture', '🧘'),
        W('rama', 'رما', 'spread', '📐'),
      ]},

    { id: 63, phase: 3, title: 'b-i-l-i', subtitle: 'Bili, pili', mode: 'wordbox',
      intro: '"i" wale lafz. "b" + "i" + "l" + "i" = "bili".',
      items: [
        W('bili', 'بلی', 'cat', '🐱'),
        W('pili', 'پیلی', 'yellow', '🟡'),
        W('nili', 'نیلی', 'blue', '🔵'),
      ]},

    { id: 64, phase: 3, title: 'm-u-la', subtitle: 'Mula, phula', mode: 'wordbox',
      intro: '"u" wale lafz. Box mein sahi harf rakhdo.',
      items: [
        W('mula', 'مولا', 'lord', '👑'),
        W('phula', 'پھولا', 'flower', '🌸'),
        W('khula', 'کھلا', 'open', '📂'),
      ]},

    // Level 65: Milestone + Dictation
    { id: 65, phase: 3, title: 'Mashq 7', subtitle: '4-haroof imtehaan', mode: 'dictation',
      intro: 'Char haroof wale lafzon ka imtehaan!',
      items: [
        W('dana', 'دانہ', 'grain', '🌾'),
        W('bili', 'بلی', 'cat', '🐱'),
        W('khula', 'کھلا', 'open', '📂'),
        W('pani', 'پانی', 'water', '💧'),
      ]},

    { id: 66, phase: 3, title: 'k-h-a-a', subtitle: 'Khaana type karo', mode: 'wordbox',
      intro: 'Do-haroof wali awaz wale lafz. "kh" + "aa" + "n" + "a" = "khaana".',
      items: [
        W('khaana', 'کھانا', 'food', '🍽️'),
        W('roti', 'روٹی', 'bread', '🫓'),
        W('cheeni', 'چینی', 'sugar', '🧂'),
      ]},

    { id: 67, phase: 3, title: 'ch-a-i', subtitle: 'Chai, chawal', mode: 'wordbox',
      intro: '"ch" wale lafz. Box mein har harf sahi jagah par.',
      items: [
        W('chai', 'چائے', 'tea', '🍵'),
        W('chawal', 'چاول', 'rice', '🍚'),
        W('chamach', 'چمچہ', 'spoon', '🥄'),
      ]},

    { id: 68, phase: 3, title: 'g-h-a-r', subtitle: 'Ghar, gaari', mode: 'wordbox',
      intro: '"gh" wale lafz. "gh" + "a" + "r" = "ghar".',
      items: [
        W('ghar', 'گھر', 'home', '🏠'),
        W('gaari', 'گاڑی', 'car', '🚗'),
        W('ghari', 'گھڑی', 'watch', '⏰'),
      ]},

    { id: 69, phase: 3, title: 'sh + words', subtitle: 'Sheher, shakhs', mode: 'wordbox',
      intro: '"sh" wale lafz. "sh" + "e" + "h" + "e" + "r" = "sheher".',
      items: [
        W('shahar', 'شہر', 'city', '🏙️'),
        W('shabnam', 'شبنم', 'dew', '💧'),
        W('shakhs', 'شخص', 'person', '🧑'),
      ]},

    // Level 70: Assessment
    { id: 70, phase: 3, title: 'Imtehaan 7', subtitle: 'Phase 3 khatam', mode: 'assessment',
      intro: 'Satwa bara imtehaan! Phase 3 khatam! Lafz banane ki practice.',
      items: [
        W('khaana', 'کھانا', 'food', '🍽️'),
        W('chai', 'چائے', 'tea', '🍵'),
        W('ghar', 'گھر', 'home', '🏠'),
        W('bili', 'بلی', 'cat', '🐱'),
        W('dana', 'دانہ', 'grain', '🌾'),
        W('cheeni', 'چینی', 'sugar', '🧂'),
        W('shahar', 'شہر', 'city', '🏙️'),
        W('pani', 'پانی', 'water', '💧'),
      ]},

    // ===== PHASE 4: WORDS BY CATEGORY (Levels 71-95) =====
    { id: 71, phase: 4, title: 'Ghar', subtitle: 'Ghar ki cheezein', mode: 'copy',
      intro: 'Ab asli lafz! Ghar ki cheezein. Awaz suno, dekho, aur type karo.',
      items: [
        W('ghar', 'گھر', 'home', '🏠'),
        W('darwaza', 'دروازہ', 'door', '🚪'),
        W('chhat', 'چھت', 'roof', '🏠'),
        W('deewar', 'دیوار', 'wall', '🧱'),
        W('bistar', 'بستر', 'bed', '🛏️'),
      ]},

    { id: 72, phase: 4, title: 'Khaana', subtitle: 'Dastarkhwan', mode: 'copy',
      intro: 'Khaane peene ki cheezein. "ch" aur "ee" ka khayal rakhna.',
      items: [
        W('roti', 'روٹی', 'bread', '🫓'),
        W('chai', 'چائے', 'tea', '🍵'),
        W('cheeni', 'چینی', 'sugar', '🧂'),
        W('chawal', 'چاول', 'rice', '🍚'),
        W('pani', 'پانی', 'water', '💧'),
      ]},

    { id: 73, phase: 4, title: 'Rang', subtitle: 'Rangon ke naam', mode: 'copy',
      intro: 'Rang! Lambi awaz par double haroof: neela, peela, kaala.',
      items: [
        W('laal', 'لال', 'red', '🔴'),
        W('neela', 'نیلا', 'blue', '🔵'),
        W('peela', 'پیلا', 'yellow', '🟡'),
        W('hara', 'ہرا', 'green', '💚'),
        W('kaala', 'کالا', 'black', '⚫'),
      ]},

    { id: 74, phase: 4, title: 'Ginti 1-5', subtitle: 'Aik se paanch', mode: 'copy',
      intro: 'Ginti shuru! "aik" mein "ai" ki awaz aur "paanch" mein "aa" ka dhyan rakho.',
      items: [
        W('aik', 'ایک', 'one', '1️⃣'),
        W('do', 'دو', 'two', '2️⃣'),
        W('teen', 'تین', 'three', '3️⃣'),
        W('chaar', 'چار', 'four', '4️⃣'),
        W('paanch', 'پانچ', 'five', '5️⃣'),
      ]},

    // Level 75: Milestone + Dictation
    { id: 75, phase: 4, title: 'Mashq 8', subtitle: 'Lafz imtehaan', mode: 'dictation',
      intro: 'Lafzon ka imtehaan! Sirf awaz suno aur type karo.',
      items: [
        W('ghar', 'گھر', 'home', '🏠'),
        W('roti', 'روٹی', 'bread', '🫓'),
        W('laal', 'لال', 'red', '🔴'),
        W('aik', 'ایک', 'one', '1️⃣'),
      ]},

    { id: 76, phase: 4, title: 'Ginti 6-10', subtitle: 'Chhe se das', mode: 'copy',
      intro: '"chhe" aur "aath" mein bhaari awazein hain — "chh" aur "th".',
      items: [
        W('chhe', 'چھ', 'six', '6️⃣'),
        W('saat', 'سات', 'seven', '7️⃣'),
        W('aath', 'آٹھ', 'eight', '8️⃣'),
        W('nau', 'نو', 'nine', '9️⃣'),
        W('das', 'دس', 'ten', '🔟'),
      ]},

    { id: 77, phase: 4, title: 'Jaanwar', subtitle: 'Jaanwaron ke naam', mode: 'copy',
      intro: 'Jaanwar! Double haroof ka khayal rakho: billi, kutta.',
      items: [
        W('billi', 'بلی', 'cat', '🐱'),
        W('kutta', 'کتا', 'dog', '🐶'),
        W('bakri', 'بکری', 'goat', '🐐'),
        W('ghora', 'گھوڑا', 'horse', '🐴'),
        W('chooha', 'چوہا', 'mouse', '🐭'),
      ]},

    { id: 78, phase: 4, title: 'Jism', subtitle: 'Jism ke hissay', mode: 'copy',
      intro: '"aankh" aur "haath" jaise lafzon mein "kh" aur "th" hai.',
      items: [
        W('aankh', 'آنکھ', 'eye', '👁️'),
        W('haath', 'ہاتھ', 'hand', '🤚'),
        W('kaan', 'کان', 'ear', '👂'),
        W('naak', 'ناک', 'nose', '👃'),
        W('pair', 'پیر', 'foot', '🦶'),
      ]},

    { id: 79, phase: 4, title: 'Khandaan', subtitle: 'Ghar walay', mode: 'copy',
      intro: 'Ghar walon ke naam. "bhai" mein "bh" aur "behen" mein "h" par ghaur karo.',
      items: [
        W('ammi', 'امی', 'mother', '👩'),
        W('abbu', 'ابو', 'father', '👨'),
        W('bhai', 'بھائی', 'brother', '👦'),
        W('behen', 'بہن', 'sister', '👧'),
        W('dada', 'ددا', 'grandpa', '👴'),
      ]},

    // Level 80: Assessment
    { id: 80, phase: 4, title: 'Imtehaan 8', subtitle: 'Lafz imtehaan', mode: 'assessment',
      intro: 'Athwa bara imtehaan! Sare lafz yaad karke likho.',
      items: [
        W('darwaza', 'دروازہ', 'door', '🚪'),
        W('cheeni', 'چینی', 'sugar', '🧂'),
        W('neela', 'نیلا', 'blue', '🔵'),
        W('chhe', 'چھ', 'six', '6️⃣'),
        W('billi', 'بلی', 'cat', '🐱'),
        W('aankh', 'آنکھ', 'eye', '👁️'),
        W('bhai', 'بھائی', 'brother', '👦'),
        W('aik', 'ایک', 'one', '1️⃣'),
      ]},

    { id: 81, phase: 4, title: 'Mausam', subtitle: 'Mausam ke lafz', mode: 'copy',
      intro: '"dh" aur "th" bhaari awazein hain: dhoop, thand.',
      items: [
        W('baarish', 'بارش', 'rain', '🌧️'),
        W('dhoop', 'دھوپ', 'sunshine', '☀️'),
        W('thand', 'ٹھنڈ', 'cold', '🧊'),
        W('hawa', 'ہوا', 'wind', '💨'),
        W('badal', 'بادل', 'cloud', '☁️'),
      ]},

    { id: 82, phase: 4, title: 'Waqt', subtitle: 'Waqt ke lafz', mode: 'copy',
      intro: 'Waqt ke lafz. "subah" mein "h" aakhir mein aata hai.',
      items: [
        W('subah', 'صبح', 'morning', '🌅'),
        W('dupahar', 'دوپہر', 'noon', '🕛'),
        W('shaam', 'شام', 'evening', '🌆'),
        W('raat', 'رات', 'night', '🌙'),
        W('waqt', 'وقت', 'time', '⏰'),
      ]},

    { id: 83, phase: 4, title: 'Phal', subtitle: 'Phalon ke naam', mode: 'copy',
      intro: 'Phal ke naam. "angoor" aur "tarbooz" mein "oo" hai.',
      items: [
        W('aam', 'آم', 'mango', '🥭'),
        W('seb', 'سیب', 'apple', '🍎'),
        W('angoor', 'انگور', 'grapes', '🍇'),
        W('tarbooz', 'تربوز', 'watermelon', '🍉'),
        W('anaar', 'انار', 'pomegranate', '🍊'),
      ]},

    { id: 84, phase: 4, title: 'Sun kar likho', subtitle: 'Sirf awaz par bharosa', mode: 'listen',
      intro: 'Ab lafz nazar nahi aayega! Sirf awaz suno aur type karo.',
      items: [
        W('ghar', 'گھر', 'home', '🏠'),
        W('roti', 'روٹی', 'bread', '🫓'),
        W('laal', 'لال', 'red', '🔴'),
        W('billi', 'بلی', 'cat', '🐱'),
        W('aankh', 'آنکھ', 'eye', '👁️'),
      ]},

    // Level 85: Milestone + Dictation
    { id: 85, phase: 4, title: 'Mashq 9', subtitle: 'Sun kar likho imtehaan', mode: 'dictation',
      intro: 'Sirf awaz par bharosa karo! Type karo.',
      items: [
        W('baarish', 'بارش', 'rain', '🌧️'),
        W('subah', 'صبح', 'morning', '🌅'),
        W('aam', 'آم', 'mango', '🥭'),
        W('kutta', 'کتا', 'dog', '🐶'),
      ]},

    { id: 86, phase: 4, title: 'School', subtitle: 'Parhai ke lafz', mode: 'copy',
      intro: 'Lambe lafz shuru. "q" qaaf ki awaz hai (qalam) aur "gh" ghain ki (kaghaz).',
      items: [
        W('kitaab', 'کتاب', 'book', '📚'),
        W('qalam', 'قلم', 'pen', '✏️'),
        W('takhta', 'تختہ', 'board', '📋'),
        W('ustaad', 'استاد', 'teacher', '👨‍🏫'),
        W('sabaq', 'سبق', 'lesson', '📖'),
      ]},

    { id: 87, phase: 4, title: 'Kaam', subtitle: 'Karne ke lafz', mode: 'copy',
      intro: 'Kaam batane walay lafz aksar "na" par khatam hote hain: sona, jaana, likhna.',
      items: [
        W('sona', 'سونا', 'sleep', '😴'),
        W('jaana', 'جانا', 'go', '🚶'),
        W('likhna', 'لکھنا', 'write', '✍️'),
        W('parhna', 'پڑھنا', 'read', '📖'),
        W('khelna', 'کھیلنا', 'play', '🎮'),
      ]},

    { id: 88, phase: 4, title: 'Sifat', subtitle: 'Kaisa hai?', mode: 'copy',
      intro: 'Cheezon ki khoobi batane walay lafz. "acha" aur "chhota" mein "ch" aur "chh" ka farq dekho.',
      items: [
        W('acha', 'اچھا', 'good', '👍'),
        W('bura', 'برا', 'bad', '👎'),
        W('bara', 'بڑا', 'big', '📐'),
        W('chhota', 'چھوٹا', 'small', '📏'),
        W('thanda', 'ٹھنڈا', 'cold', '🧊'),
      ]},

    { id: 89, phase: 4, title: 'Ehsaas', subtitle: 'Dil ki baatein', mode: 'copy',
      intro: 'Jazbaat ke lafz. "bhooka" mein "bh" aur "oo", "pyaasa" mein "py" aur "aa".',
      items: [
        W('khushi', 'خوشی', 'happiness', '😊'),
        W('gham', 'غم', 'sadness', '😢'),
        W('bhooka', 'بھوکا', 'hungry', '🍽️'),
        W('pyaasa', 'پیاسا', 'thirsty', '🥤'),
        W('thaka', 'تھکا', 'tired', '😫'),
      ]},

    // Level 90: Assessment
    { id: 90, phase: 4, title: 'Imtehaan 9', subtitle: 'Lafz bara imtehaan', mode: 'assessment',
      intro: 'Nohwa bara imtehaan! Sare lafz yaad karke likho.',
      items: [
        W('baarish', 'بارش', 'rain', '🌧️'),
        W('kitaab', 'کتاب', 'book', '📚'),
        W('sona', 'سونا', 'sleep', '😴'),
        W('acha', 'اچھا', 'good', '👍'),
        W('khushi', 'خوشی', 'happiness', '😊'),
        W('subah', 'صبح', 'morning', '🌅'),
        W('aam', 'آم', 'mango', '🥭'),
        W('bhooka', 'بھوکا', 'hungry', '🍽️'),
      ]},

    { id: 91, phase: 4, title: 'Shehar', subtitle: 'Bahar ki duniya', mode: 'copy',
      intro: 'Shehar ke lafz. "gaari" mein "aa" aur "haspataal" lamba lafz hai.',
      items: [
        W('sarak', 'سڑک', 'road', '🛣️'),
        W('gaari', 'گاڑی', 'car', '🚗'),
        W('bazaar', 'بازار', 'market', '🏬'),
        W('haspataal', 'ہسپتال', 'hospital', '🏥'),
        W('zameen', 'زمین', 'land', '🌍'),
      ]},

    { id: 92, phase: 4, title: 'Do Lafz', subtitle: 'Space ka istemaal', mode: 'copy',
      intro: 'Ab do lafz aik saath. Dono ke beech space zaroor do: meri ammi.',
      items: [
        S('meri ammi', 'میری امی', 'my mother'),
        S('mera bhai', 'میرا بھائی', 'my brother'),
        S('acha bacha', 'اچھا بچہ', 'good child'),
        S('bara kutta', 'بڑا کتا', 'big dog'),
      ]},

    { id: 93, phase: 4, title: 'Sifat + cheez', subtitle: 'Do lafz aur sifat', mode: 'copy',
      intro: 'Sifat pehle, cheez baad mein: bara kutta, naya joota.',
      items: [
        S('naya joota', 'نیا جوتا', 'new shoe'),
        S('thanda paani', 'ٹھنڈا پانی', 'cold water'),
        S('meetha aam', 'میٹھا آم', 'sweet mango'),
        S('chhoti billi', 'چھوٹی بلی', 'small cat'),
      ]},

    { id: 94, phase: 4, title: 'Salaam', subtitle: 'Milne ke lafz', mode: 'copy',
      intro: 'Rozmarra ke salaam. "assalam o alaikum" teen hisson mein likha jata hai.',
      items: [
        S('assalam o alaikum', 'السلام علیکم', 'peace be upon you'),
        S('walaikum assalam', 'وعلیکم السلام', 'and peace to you'),
        S('aap kaise hain', 'آپ کیسے ہیں', 'how are you'),
        S('shukriya bhai', 'شکریہ بھائی', 'thank you brother'),
      ]},

    // Level 95: Milestone + Dictation
    { id: 95, phase: 4, title: 'Mashq 10', subtitle: 'Do lafz imtehaan', mode: 'dictation',
      intro: 'Do lafz wale jumlon ka imtehaan! Space yaad rakho.',
      items: [
        S('meri ammi', 'میری امی', 'my mother'),
        S('thanda paani', 'ٹھنڈا پانی', 'cold water'),
        S('assalam o alaikum', 'السلام علیکم', 'peace be upon you'),
        S('meetha aam', 'میٹھا آم', 'sweet mango'),
      ]},

    // ===== PHASE 5: SENTENCES (Levels 96-115) =====
    { id: 96, phase: 5, title: 'Pehle Jumlay', subtitle: 'Chhote aur aasan', mode: 'copy',
      intro: 'Ab poore jumlay! Har lafz ke beech space do. Nuqta ya sawalia nishan likhna zaroori nahi.',
      items: [
        S('main theek hoon', 'میں ٹھیک ہوں', 'I am fine'),
        S('yeh mera ghar hai', 'یہ میرا گھر ہے', 'this is my home'),
        S('paani do', 'پانی دو', 'give water'),
        S('aap kaise hain', 'آپ کیسے ہیں', 'how are you'),
        S('shukriya bhai', 'شکریہ بھائی', 'thank you brother'),
      ]},

    // Level 97: Funny sentence
    { id: 97, phase: 5, title: 'Mazedaar 1', subtitle: 'Funny jumla', mode: 'copy',
      intro: 'Ab thora maza! Funny jumlay. Hansi aayegi aur seekhna bhi hoga!',
      items: [
        S('bakri ne meri topi pehen li', 'بکری نے میری ٹوپی پہن لی', 'the goat wore my hat'),
        S('aloo ne pyaaz se kaha tum mujhe rula dete ho', 'آلو نے پیاز سے کہا تم مجھے رلا دیتے ہو', 'potato told onion you make me cry'),
        S('chooha bola billi mausi salaam', 'چوہا بولا بلی ماسی سلام', 'mouse said cat aunty hello'),
        S('chhota bhai bola main bara ho kar ammi banunga', 'چھوٹا بھائی بولا میں بڑا ہو کر امی بنوں گا', 'little brother said I will become mom when I grow up'),
      ]},

    // Level 98: Islamic sentence
    { id: 98, phase: 5, title: 'Islami 1', subtitle: 'Deeni jumla', mode: 'copy',
      intro: 'Ab deeni baatein. Islami jumlay seekho aur samjho.',
      items: [
        S('assalam o alaikum pyare dost', 'السلام علیکم پیارے دوست', 'peace be upon you dear friend'),
        S('baron ka ehtaram karo', 'بڑوں کا احترام کرو', 'respect your elders'),
        S('waqt ki qadar karo', 'وقت کی قدر کرو', 'value your time'),
        S('mehnat karne wala kamyaab hota hai', 'محنت کرنے والا کامیاب ہوتا ہے', 'the hardworking person succeeds'),
      ]},

    { id: 99, phase: 5, title: 'Rozmarra', subtitle: 'Ghar ki baatein', mode: 'copy',
      intro: 'Rozmarra ke jumlay. "raha hoon" larkon ke liye, "rahi hoon" larkiyon ke liye.',
      items: [
        S('mujhe bhook lagi hai', 'مجھے بھوک لگی ہے', 'I am hungry'),
        S('chai bana do', 'چائے بنا دو', 'make tea'),
        S('main school ja raha hoon', 'میں سکول جا رہا ہوں', 'I am going to school'),
        S('aaj mausam acha hai', 'آج موسم اچھا ہے', 'the weather is nice today'),
        S('darwaza band karo', 'دروازہ بند کرو', 'close the door'),
      ]},

    // Level 100: Assessment + Milestone
    { id: 100, phase: 5, title: 'Imtehaan 10', subtitle: 'Jumlay bara imtehaan', mode: 'assessment',
      intro: 'Duswa bara imtehaan! Jumlon ka bara imtehaan! Aadha safar mukammal!',
      items: [
        S('main theek hoon', 'میں ٹھیک ہوں', 'I am fine'),
        S('bakri ne meri topi pehen li', 'بکری نے میری ٹوپی پہن لی', 'goat wore my hat'),
        S('baron ka ehtaram karo', 'بڑوں کا احترام کرو', 'respect elders'),
        S('mujhe bhook lagi hai', 'مجھے بھوک لگی ہے', 'I am hungry'),
        S('assalam o alaikum', 'السلام علیکم', 'peace be upon you'),
        S('darwaza band karo', 'دروازہ بند کرو', 'close the door'),
        S('mehnat karne wala kamyaab hota hai', 'محنت کرنے والا کامیاب ہوتا ہے', 'hardworking succeeds'),
        S('chooha bola billi mausi salaam', 'چوہا بولا بلی ماسی سلام', 'mouse said cat aunty hello'),
      ]},

    // Level 101: Funny
    { id: 101, phase: 5, title: 'Mazedaar 2', subtitle: 'Aur funny jumlay', mode: 'copy',
      intro: 'Aur mazedaar jumlay! Hanso aur seekho!',
      items: [
        S('chacha ki chai itni meethi thi ke cheeni sharma gayi', 'چacha کی چائے اتن میٹھی تھی کہ چینی شرما گئی', 'uncle\'s tea was so sweet the sugar felt shy'),
        S('dada abbu ka chashma unke sar par hi tha', 'ددا ابو کا چشمہ انکے سر پر ہی تھا', 'grandpa\'s glasses were on his head'),
        S('billi ne kaha aaj mood nahi hai nikalne ka', 'بلی نے کہا آج موڈ نہیں ہے نکلنے کا', 'cat said not in the mood to go out today'),
      ]},

    // Level 102: Islamic
    { id: 102, phase: 5, title: 'Islami 2', subtitle: 'Achhi baatein', mode: 'copy',
      intro: 'Islami aqeedar ke jumlay. Acchi baatein seekho.',
      items: [
        S('sach bolne wala kaamyab hota hai', 'سچ بولنے والا کامیاب ہوتا ہے', 'the truthful person succeeds'),
        S('Allah mehnat karne walon ka sath deta hai', 'اللہ محنت کرنے والوں کا ساتھ دیتا ہے', 'Allah supports those who work hard'),
        S('apne maa baap ki izzat karo', 'اپنے ماں باپ کی عزت کرو', 'respect your parents'),
        S('sabr ka phal meetha hota hai', 'صبر کا پھل میٹھا ہوتا ہے', 'the fruit of patience is sweet'),
      ]},

    { id: 103, phase: 5, title: 'Sawal', subtitle: 'Poochna seekho', mode: 'copy',
      intro: 'Sawal poochne ke jumlay. "kya" shuru mein ho to jawab haan ya nahi hota hai.',
      items: [
        S('aap ka naam kya hai', 'آپ کا نام کیا ہے', 'what is your name'),
        S('aap kahan rehte hain', 'آپ کہاں رہتے ہیں', 'where do you live'),
        S('yeh kitne ka hai', 'یہ کتنے کا ہے', 'how much is this'),
        S('kya tum theek ho', 'کیا تم ٹھیک ہو', 'are you okay'),
      ]},

    // Level 104: Funny
    { id: 104, phase: 5, title: 'Mazedaar 3', subtitle: 'Mazak aur seekho', mode: 'copy',
      intro: 'Aur mazedaar jumlay! Hansi ke saath seekho.',
      items: [
        S('ustaad ne poocha kahan ho aur main ne kaha khwaab mein', 'استاد نے پوچھا کہاں ہو اور میں نے کہا خواب میں', 'teacher asked where are you I said in a dream'),
        S('ustaad hans diye aur kaha jhoot ki chhutti kar do', 'استاد ہنس دیۓ اور کہا جھوٹ کی چھٹی کر دو', 'teacher laughed and said stop lying'),
        S('bijli gayi to sab ko sitaare yaad aa gaye', 'بجلی گئی تو سب کو ستارے یاد آ گۓ', 'power went out everyone remembered the stars'),
      ]},

    // Level 105: Milestone + Dictation
    { id: 105, phase: 5, title: 'Mashq 11', subtitle: 'Funny aur Islami imtehaan', mode: 'dictation',
      intro: 'Jumlon ka imtehaan! Funny aur Islami dono!',
      items: [
        S('billi ne kaha aaj mood nahi hai', 'بلی نے کہا آج موڈ نہیں ہے', 'cat said not in mood'),
        S('sach bolne wala kaamyab hota hai', 'سچ بولنے والا کامیاب ہوتا ہے', 'truthful person succeeds'),
        S('aap ka naam kya hai', 'آپ کا نام کیا ہے', 'what is your name'),
        S('bijli gayi to sab ko sitaare yaad aa gaye', 'بجلی گئی تو سب کو ستارے یاد آ گۓ', 'power out stars remembered'),
      ]},

    // Level 106: Islamic
    { id: 106, phase: 5, title: 'Islami 3', subtitle: 'Zindagi ke jumlay', mode: 'copy',
      intro: 'Zindagi ke bare mein Islami soch.',
      items: [
        S('yaad rakho har hero aik din zero tha', 'یاد رکھو ہر ہیرو ایک دن زیرو تھا', 'remember every hero was once a zero'),
        S('agar tum mehnat karo ge to kamyaab ho jao ge', 'اگر تم محنت کرو گے تو کامیاب ہو جاؤ گے', 'if you work hard you will succeed'),
        S('Allah kareem hai aur meharban hai', 'اللہ کریم ہے اور مہربان ہے', 'Allah is generous and merciful'),
        S('doosron ki madad karo', 'دوسروں کی مدد کرو', 'help others'),
      ]},

    // Level 107: Funny
    { id: 107, phase: 5, title: 'Mazedaar 4', subtitle: 'Aur mazak', mode: 'copy',
      intro: 'Aur mazak! Seekho aur hanso.',
      items: [
        S('ghari ne kaha mujhe bhi chutti chahiye', 'گھڑی نے کہا مجھے بھی چھٹی چاہیے', 'clock said I need a break too'),
        S('baqi paise rakh lein', 'باقی پیسے رکھ لیں', 'keep the rest of the money'),
        S('thora sasta kar dein', 'تھورا سستا کر دیں', 'make it a bit cheaper please'),
      ]},

    { id: 108, phase: 5, title: 'Jawab', subtitle: 'Jawab dena seekho', mode: 'copy',
      intro: 'Pichlay sawalon ke jawab. "mein" ka matlab "andar" hai: Lahore mein.',
      items: [
        S('mera naam ali hai', 'میرا نام علی ہے', 'my name is Ali'),
        S('main lahore mein rehta hoon', 'میں لاہور میں رہتا ہوں', 'I live in Lahore'),
        S('yeh sau rupay ka hai', 'یہ سو روپے کا ہے', 'this is for 100 rupees'),
        S('haan main theek hoon', 'ہاں میں ٹھیک ہوں', 'yes I am fine'),
      ]},

    // Level 109: Funny
    { id: 109, phase: 5, title: 'Mazedaar 5', subtitle: 'Last funny batch', mode: 'copy',
      intro: 'Aur funny jumlay! Hansi khushi seekho.',
      items: [
        S('baarish aayi aur sab ke kapray naach uthay', 'بارش آئی اور سب کے کپڑے ناچ اٹھے', 'rain came and all clothes started dancing'),
        S('yeh bohat mazedaar hai', 'یہ بہت مزیدار ہے', 'this is very funny'),
        S('tum mere ache dost ho', 'تم میرے اچھے دوست ہو', 'you are my good friends'),
      ]},

    // Level 110: Assessment
    { id: 110, phase: 5, title: 'Imtehaan 11', subtitle: 'Jumlay imtehaan', mode: 'assessment',
      intro: 'Gayara wa bara imtehaan! Jumlon ka imtehaan!',
      items: [
        S('yaad rakho har hero aik din zero tha', 'یاد رکھو ہر ہیرو ایک دن زیرو تھا', 'every hero was once zero'),
        S('ghari ne kaha mujhe bhi chutti chahiye', 'گھڑی نے کہا مجھے بھی چھٹی چاہیے', 'clock said I need a break'),
        S('mera naam ali hai', 'میرا نام علی ہے', 'my name is Ali'),
        S('baarish aayi aur sab ke kapray naach uthay', 'بارش آئی اور سب کے کپڑے ناچ اٹھے', 'rain came clothes danced'),
        S('sabr ka phal meetha hota hai', 'صبر کا پھل میٹھا ہوتا ہے', 'patience fruit is sweet'),
        S('aap ka naam kya hai', 'آپ کا نام کیا ہے', 'what is your name'),
        S('doosron ki madad karo', 'دوسروں کی مدد کرو', 'help others'),
        S('yeh bohat mazedaar hai', 'یہ بہت مزیدار ہے', 'this is very funny'),
      ]},

    // Level 111: Islamic
    { id: 111, phase: 5, title: 'Islami 4', subtitle: 'Achhi baatein', mode: 'copy',
      intro: 'Aur Islami aqeedar ke jumlay.',
      items: [
        S('waqt sab se qeemti cheez hai', 'وقت سب سے قیمتی چیز ہے', 'time is the most precious thing'),
        S('jo waqt ki qadar karta hai who aage barhta hai', 'جو وقت کی قدر کرتا ہے وہ آگے بڑھتا ہے', 'who values time moves forward'),
        S('isliye main roz apna kaam waqt par karta hoon', 'اسلیے میں روز اپنا کام وقت پر کرتا ہوں', 'so I do my work on time daily'),
        S('aap ne bohat acha kaam kiya', 'آپ نے بہت اچھا کام کیا', 'you did a very good job'),
      ]},

    // Level 112: Funny
    { id: 112, phase: 5, title: 'Mazedaar 6', subtitle: 'School ke mazak', mode: 'copy',
      intro: 'School ke mazak wale jumlay!',
      items: [
        S('aaj main thak gaya hoon', 'آج میں تھک گیا ہوں', 'I am tired today'),
        S('ammi ne kaha jaldi aao aur main kal aaya', 'امی نے کہا جلدی آؤ اور میں کل آیا', 'mom said come quick I came tomorrow'),
        S('ustaad hans diye aur kaha jhoot ki chhutti kar do phir zabaan roz chalegi', 'استاد ہنس دیے اور کہا جھوٹ کی چھٹی کر دو پھر زبان روز چلے گی', 'teacher laughed said stop lying then tongue runs daily'),
      ]},

    // Level 113: Islamic
    { id: 113, phase: 5, title: 'Islami 5', subtitle: 'Dua aur shukr', mode: 'copy',
      intro: 'Dua aur shukr ke jumlay.',
      items: [
        S('aik larka pehle aik harf bhi nahi likh sakta tha', 'ایک لڑکا پہلے ایک حرف بھی نہیں لکھ سکتا تھا', 'a boy could not write a single letter before'),
        S('us ne roz thora thora likhna shuru kiya', 'اس نے روز تھورا تھورا لکھنا شروع کیا', 'he started writing a little daily'),
        S('ab aap roman urdu likh sakte hain', 'اب آپ رومن اردو لکھ سکتے ہیں', 'now you can write Roman Urdu'),
        S('yeh safar yahan khatam nahi hota', 'یہ سفر یہاں ختم نہیں ہوتا', 'this journey does not end here'),
      ]},

    // Level 114: Funny + Islamic mix
    { id: 114, phase: 5, title: 'Mix Jumlay', subtitle: 'Sab mila ke', mode: 'copy',
      intro: 'Ab sab mila ke! Funny aur Islami dono.',
      items: [
        S('ticket kitne ki hai', 'ٹکٹ کتنے کی ہے', 'how much is the ticket'),
        S('bus kab aayegi', 'بس کب آۓگی', 'when will the bus come'),
        S('school ka rasta lamba hai lekin dost saath hon to pata hi na', 'سکول کا راستہ لمبا ہے لیکن دوست ساتھ ہوں تو پتہ ہی نہ', 'school road is long but with friends no idea'),
        S('hamare ghar mein paanch log hain', 'ہمارے گھر میں پانچ لوگ ہیں', 'there are five people in our house'),
      ]},

    // Level 115: Milestone + Dictation
    { id: 115, phase: 5, title: 'Mashq 12', subtitle: 'Final jumla imtehaan', mode: 'dictation',
      intro: 'Jumlon ka aakhri imtehaan phase 5 ke liye!',
      items: [
        S('waqt sab se qeemti cheez hai', 'وقت سب سے قیمتی چیز ہے', 'time is most precious'),
        S('aaj main thak gaya hoon', 'آج میں تھک گیا ہوں', 'I am tired today'),
        S('ab aap roman urdu likh sakte hain', 'اب آپ رومن اردو لکھ سکتے ہیں', 'now you can write Roman Urdu'),
        S('ticket kitne ki hai', 'ٹکٹ کتنے کی ہے', 'how much is ticket'),
      ]},

    // ===== PHASE 6: STORIES & PARAGRAPHS (Levels 116-130) =====
    { id: 116, phase: 6, title: 'Funny Kahani 1', subtitle: 'Gadha aur Mulla', mode: 'story',
      intro: 'Ab kahaniyan! Pehli funny kahani. Har line suno aur type karo.',
      items: [
        Story('Mulla aur Gadha', [
          'aik gaon mein mulla nasiruddin rehte thay un ke paas aik chhota gadha tha',
          'aik din gadha gum ho gaya mulla ne shukar ada karna shuru kar diya',
          'sub ne kaha gadha gum hua to shukar kyun',
          'mulla ne kaha kya pata kal main khud gum ho jata',
        ], false),
      ]},

    // Level 117: Islamic story
    { id: 117, phase: 6, title: 'Islami Kahani 1', subtitle: 'Dua aur Mehnat', mode: 'story',
      intro: 'Islami kahani. Dua aur mehnat ki taqat.',
      items: [
        Story('Dua aur Mehnat', [
          'aik aadmi ne raat ko darwaza khula chhor diya aur dua ki ke Allah meri hifazat kare',
          'raat ko chor aa gaya lekin darwaze ke kache se us ke pao mein chubh gaya',
          'wo chilla utha aur aadmi jaag gaya chor bhaag gaya',
          'aadmi hansa aur samajh gaya ke dua ke saath mehnat aur ehtiyaat bhi zaroori hai',
        ], true),
      ]},

    // Level 118: Funny story
    { id: 118, phase: 6, title: 'Funny Kahani 2', subtitle: 'Naye Joote', mode: 'story',
      intro: 'Aur funny kahani! Hanso aur seekho.',
      items: [
        Story('Naye Joote', [
          'aik larka roz apni ammi se kehta tha ke main ne saara sabaq yaad kar liya hai',
          'aik din ustaad ghar aa gaye ammi ne kaha zara is se sabaq sun lein',
          'ustaad ne poocha kahan ho aur main ne kaha khwaab mein',
          'subah dekha to us ki naye joote gaayab thay wo shikayat karne mulla ke paas gaya',
        ], false),
      ]},

    // Level 119: Islamic story
    { id: 119, phase: 6, title: 'Islami Kahani 2', subtitle: 'Aadhi Roti', mode: 'story',
      intro: 'Islami kahani. Ghareeb ki madad ka ajr.',
      items: [
        Story('Aadhi Roti', [
          'aik ghareeb bhai ke paas sirf aik roti thi raste mein aik musafir ne kaha mujhe bhook lagi hai',
          'us ne aadhi roti musafir ko de di musafir ne dua di ke Allah tumhe barkat de',
          'us ne hans kar kaha aadhi roti ka sauda bohat nafa mand raha',
          'sabr aur dene wala kabhi khaali nahi rehta',
        ], true),
      ]},

    // Level 120: Assessment + Milestone
    { id: 120, phase: 6, title: 'Imtehaan 12', subtitle: 'Kahani imtehaan', mode: 'assessment',
      intro: 'Bara wa bara imtehaan! Kahaniyon ka imtehaan! Phase 5 aur 6!',
      items: [
        S('aik gaon mein mulla nasiruddin rehte thay', 'ایک گاؤں میں ملا نصرالدین رہتے تھے', 'in a village lived Mulla Nasiruddin'),
        S('aik aadmi ne raat ko darwaza khula chhor diya', 'ایک آدمی نے رات کو دروازہ کھلا چھوڑ دیا', 'a man left the door open at night'),
        S('us ne aadhi roti musafir ko de di', 'اس نے آدھی روٹی مسافر کو دے دی', 'he gave half the bread to the traveler'),
        S('sabr aur dene wala kabhi khaali nahi rehta', 'صبر اور دینے والا کبھی خالی نہیں رہتا', 'patient and giver never stays empty'),
        S('subah dekha to us ke naye joote gaayab thay', 'صبح دیکھا تو اس کے نۓ جوتے غائب تھے', 'morning saw his new shoes were gone'),
        S('aadmi hansa aur samajh gaya ke dua ke saath mehnat bhi zaroori hai', 'آدمی ہنسا اور سمجھ گیا کہ دعا کے ساتھ محنت بھی ضروری ہے', 'man laughed and understood with prayer effort needed too'),
        S('mulla ne kaha kya pata kal main khud gum ho jata', 'ملا نے کہا کیا پتہ کل میں خود گم ہو جاتا', 'Mulla said who knows I would be lost tomorrow'),
        S('chor bhaag gaya aur aadmi jaag gaya', 'چور بھاگ گیا اور آدمی جاگ گیا', 'thief ran away and man woke up'),
      ]},

    // Level 121: Funny story
    { id: 121, phase: 6, title: 'Funny Kahani 3', subtitle: 'Chacha aur Chai', mode: 'story',
      intro: 'Aur funny kahani! Chacha ki meethi chai.',
      items: [
        Story('Chacha ki Chai', [
          'chacha ki chai itni meethi thi ke cheeni sharma gayi',
          'chacha ne kaha main jawan hoon bas baal safed hain',
          'phir unho ne chai mein aur cheeni daal di',
          'sab ne kaha chacha aap ki chai se to cheeni bhi darrati hai',
        ], false),
      ]},

    // Level 122: Islamic story
    { id: 122, phase: 6, title: 'Islami Kahani 3', subtitle: 'Larka aur Parhai', mode: 'story',
      intro: 'Islami kahani. Mehnat aur sabr ki nateeja.',
      items: [
        Story('Mehnat ka Phal', [
          'aik larka pehle aik harf bhi nahi likh sakta tha',
          'us ne roz thora thora likhna shuru kiya',
          'aik din us ne poora naam likh diya ammi khush ho gayi',
          'yaad rakho har hero aik din zero tha bas us ne rukna chhod diya tha',
        ], true),
      ]},

    // Level 123: Funny story
    { id: 123, phase: 6, title: 'Funny Kahani 4', subtitle: 'Aloo aur Pyaaz', mode: 'story',
      intro: 'Funny kahani! Aloo aur pyaaz ki dosti.',
      items: [
        Story('Aloo aur Pyaaz', [
          'aloo ne pyaaz se kaha tum mujhe rula dete ho',
          'pyaaz ne kaha mera to maqsad hi yeh hai',
          'aloo ne kaha tum bilkul badtameez ho',
          'phir dono chai mein gir gaye aur sab ne kaha mazedaar',
        ], false),
      ]},

    // Level 124: Islamic story
    { id: 124, phase: 6, title: 'Islami Kahani 4', subtitle: 'Ustaad aur Sabaq', mode: 'story',
      intro: 'Islami kahani. Ustaad ki mehnat aur shagrid ki yadaasht.',
      items: [
        Story('Ustaad ki Mehnat', [
          'aik din ustaad ghar aa gaye ammi ne kaha zara is se sabaq sun lein',
          'ustaad ne poocha kahan ho aur main ne kaha khwaab mein',
          'ustaad hans diye aur kaha jhoot ki chhutti kar do',
          'phir zabaan roz chalegi kehna seekho aur parhna seekho',
        ], true),
      ]},

    // Level 125: Milestone + Dictation
    { id: 125, phase: 6, title: 'Mashq 13', subtitle: 'Kahani imtehaan', mode: 'dictation',
      intro: 'Kahaniyon ka imtehaan! Dhyan se suno aur type karo.',
      items: [
        S('chacha ki chai itni meethi thi ke cheeni sharma gayi', 'چacha کی چائے اتن میٹھی تھی کہ چینی شرما گئی', 'uncle\'s tea was so sweet sugar felt shy'),
        S('us ne roz thora thora likhna shuru kiya', 'اس نے روز تھورا تھورا لکھنا شروع کیا', 'he started writing a little daily'),
        S('aloo ne pyaaz se kaha tum mujhe rula dete ho', 'آلو نے پیاز سے کہا تم مجھے رلا دیتے ہو', 'potato told onion you make me cry'),
        S('ustaad hans diye aur kaha jhoot ki chhutti kar do', 'استاد ہنس دیے اور کہا جھوٹ کی چھٹی کر دو', 'teacher laughed said stop lying'),
      ]},

    // Level 126: Funny story
    { id: 126, phase: 6, title: 'Funny Kahani 5', subtitle: 'Bakra aur Topi', mode: 'story',
      intro: 'Funny kahani! Bakri aur topi ki kahani.',
      items: [
        Story('Bakri aur Topi', [
          'bakri ne meri topi pehen li aur gaon mein ghumne nikal gayi',
          'sab ne kaha bakri to officer ban gayi',
          'main bhagta hua gaya aur kaha topi wapas karo',
          'bakri ne bola main ab officer hoon topi meri hai',
        ], false),
      ]},

    // Level 127: Islamic story
    { id: 127, phase: 6, title: 'Islami Kahani 5', subtitle: 'Ghareeb ki Roti', mode: 'story',
      intro: 'Islami kahani. Ghareeb ki barkat.',
      items: [
        Story('Ghareeb ki Barkat', [
          'aik ghareeb bhai ke paas sirf aik roti thi raste mein aik musafir ne kaha mujhe bhook lagi hai',
          'us ne aadhi roti musafir ko de di musafir ne dua di ke Allah tumhe barkat de',
          'ghar ja kar dekha to anaj ke bartan bharay huay thay',
          'Allah kareem hai jo deta hai us ko aur deta hai',
        ], true),
      ]},

    // Level 128: Funny story
    { id: 128, phase: 6, title: 'Funny Kahani 6', subtitle: 'Garmi ka Din', mode: 'story',
      intro: 'Aur funny kahani! Garmi ka din.',
      items: [
        Story('Garmi ka Din', [
          'aaj mausam acha hai lekin main thak gaya hoon',
          'dhoop itni tez thi ke chamakti cheezein bhi sharma gayi',
          'main ne kaha chalo bahar chalte hain',
          'phir socha nahi garmi mein thanda paani behtar hai',
        ], false),
      ]},

    // Level 129: Islamic story
    { id: 129, phase: 6, title: 'Islami Kahani 6', subtitle: 'Sach ka Safar', mode: 'story',
      intro: 'Aakhri Islami kahani phase 6 mein. Sach aur mehnat.',
      items: [
        Story('Sach ka Safar', [
          'yaad rakho har hero aik din zero tha bas us ne rukna chhod diya tha',
          'agar tum mehnat karo ge to kamyaab ho jao ge',
          'Allah mehnat karne walon ka sath deta hai',
          'isliye main roz apna kaam waqt par karta hoon',
        ], true),
      ]},

    // Level 130: Final Assessment + Graduation
    { id: 130, phase: 6, title: 'Final Imtehaan', subtitle: 'Aakhri imtehaan!', mode: 'assessment',
      intro: 'AAKHRI IMTEHAAN! Tum Zero se Hero ban chuke ho! Yeh sab kuch yaad karke likho.',
      items: [
        S('yaad rakho har hero aik din zero tha bas us ne rukna chhod diya tha', 'یاد رکھو ہر ہیرو ایک دن زیرو تھا بس اس نے رکنا چھوڑ دیا تھا', 'remember every hero was once zero just did not stop'),
        S('agar tum mehnat karo ge to kamyaab ho jao ge', 'اگر تم محنت کرو گے تو کامیاب ہو جاؤ گے', 'if you work hard you will succeed'),
        S('aik gaon mein mulla nasiruddin rehte thay', 'ایک گاؤں میں ملا نصرالدین رہتے تھے', 'in a village lived Mulla Nasiruddin'),
        S('sabr aur dene wala kabhi khaali nahi rehta', 'صبر اور دینے والا کبھی خالی نہیں رہتا', 'patient and giver never stays empty'),
        S('waqt sab se qeemti cheez hai', 'وقت سب سے قیمتی چیز ہے', 'time is most precious thing'),
        S('ab aap roman urdu likh sakte hain', 'اب آپ رومن اردو لکھ سکتے ہیں', 'now you can write Roman Urdu'),
        S('baron ka ehtaram karo', 'بڑوں کا احترام کرو', 'respect your elders'),
        S('yeh safar yahan khatam nahi hota', 'یہ سفر یہاں ختم نہیں ہوتا', 'this journey does not end here'),
      ]},
  ];

  function getLevel(id) {
    return levels.find(l => l.id === id);
  }

  function getLevelsByPhase(phaseId) {
    return levels.filter(l => l.phase === phaseId);
  }

  function isMilestone(levelId) {
    return levelId > 0 && levelId % 5 === 0;
  }

  function isAssessment(levelId) {
    const level = getLevel(levelId);
    return level && level.mode === 'assessment';
  }

  function getTotalLevels() {
    return levels.length;
  }

  return {
    phases,
    levels,
    getLevel,
    getLevelsByPhase,
    isMilestone,
    isAssessment,
    getTotalLevels,
    splitSyllables,
  };
})();
