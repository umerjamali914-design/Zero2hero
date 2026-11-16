/* ========================================
   GAME ENGINE — Zero to Hero
   Handles: routing, rendering, gameplay,
   input validation, auto-next, milestones
   ======================================== */

const Game = (() => {
  let state = Storage.load();
  let currentScreen = 'loading';
  let currentLevel = null;
  let currentItemIdx = 0;
  let currentStars = 0;
  let levelStartTime = 0;
  let itemStartTime = 0;
  let errorCount = 0;
  let boxFillState = null;

  const app = document.getElementById('app');

  // === INIT ===
  function init() {
    // Loading screen animation
    const fill = document.getElementById('loading-bar-fill');
    const status = document.getElementById('loading-status');
    let progress = 0;
    const messages = [
      'Awazein tayar ho rahi hain...',
      'Haroof load ho rahe hain...',
      'Lafz bane rahe hain...',
      'Kahaniyan aa rahi hain...',
      'Aapka safar shuru hone wala hai...',
    ];

    const loadInterval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(loadInterval);
        status.textContent = 'Tayar hai! Shuru karein...';
        setTimeout(showHome, 500);
      } else {
        const msgIdx = Math.min(Math.floor(progress / 20), messages.length - 1);
        status.textContent = messages[msgIdx];
      }
      fill.style.width = progress + '%';
    }, 250);

    // Apply saved settings
    AudioEngine.setBgmEnabled(state.settings.bgm);
    AudioEngine.setSfxEnabled(state.settings.sfx);

    // Unlock audio on first interaction
    const unlockHandler = () => {
      AudioEngine.unlock();
      if (state.settings.bgm) AudioEngine.setBgmEnabled(true);
      document.removeEventListener('click', unlockHandler);
      document.removeEventListener('touchstart', unlockHandler);
    };
    document.addEventListener('click', unlockHandler);
    document.addEventListener('touchstart', unlockHandler);

    // Handle hash routing
    window.addEventListener('hashchange', handleRoute);
    // Handle initial route if hash is present
    if (window.location.hash && window.location.hash !== '#/') {
      setTimeout(handleRoute, 100);
    }
  }

  function hideLoading() {
    const ls = document.getElementById('loading-screen');
    ls.classList.add('hidden');
    setTimeout(() => ls.style.display = 'none', 600);
  }

  function handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    if (hash === '/') showHome();
    else if (hash === '/levels') showLevels();
    else if (hash.startsWith('/play/')) {
      const id = parseInt(hash.split('/play/')[1]);
      if (id) startLevel(id);
    }
  }

  // === RENDERING ===
  function render(html) {
    app.innerHTML = html;
    app.className = 'fade-in';
  }

  function showHome() {
    hideLoading();
    currentScreen = 'home';
    const completedCount = Object.keys(state.completedLevels).filter(k => state.completedLevels[k].stars > 0).length;
    const totalLevels = Curriculum.getTotalLevels();
    const progressPct = Math.round((completedCount / totalLevels) * 100);

    render(`
      <div class="screen home-screen">
        <div class="home-logo">Z2H</div>
        <h1 class="home-title">ZERO to HERO</h1>
        <p class="home-subtitle">Roman Urdu Likhna Seekho</p>
        <div class="home-progress">
          <div class="home-progress-item">
            <div class="home-progress-num">${state.currentLevel}</div>
            <div class="home-progress-label">Level</div>
          </div>
          <div class="home-progress-item">
            <div class="home-progress-num">${state.xp}</div>
            <div class="home-progress-label">XP</div>
          </div>
          <div class="home-progress-item">
            <div class="home-progress-num">${completedCount}/${totalLevels}</div>
            <div class="home-progress-label">Done</div>
          </div>
        </div>
        <div class="home-buttons">
          <button class="btn btn-primary" onclick="Game.startLevel(${state.currentLevel})">
            ▶ ${completedCount > 0 ? 'Jari Rakho' : 'Shuru Karo'}
          </button>
          <button class="btn btn-ghost" onclick="location.hash='/levels'">
            📋 Sare Levels
          </button>
        </div>
        <div class="home-settings">
          <button class="btn-icon ${state.settings.bgm ? 'active' : ''}" onclick="Game.toggleBgm()" title="Background Music">🎵</button>
          <button class="btn-icon ${state.settings.sfx ? 'active' : ''}" onclick="Game.toggleSfx()" title="Sound Effects">🔊</button>
          <button class="btn-icon" onclick="Game.confirmReset()" title="Reset">🗑️</button>
        </div>
      </div>
    `);
  }

  function showLevels() {
    currentScreen = 'levels';
    let html = '<div class="screen">';

    // Header
    html += `
      <div class="levels-header">
        <button class="btn btn-ghost" onclick="location.hash='/'">← Wapas</button>
        <h2>LEVELS</h2>
        <span style="font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--neon-gold)">${state.xp} XP</span>
      </div>
    `;

    // Phase sections
    for (const phase of Curriculum.phases) {
      const phaseLevels = Curriculum.getLevelsByPhase(phase.id);
      html += `
        <div class="phase-section">
          <div class="phase-title">Phase ${phase.id}: ${phase.name}</div>
          <div class="phase-sub">${phase.tagline}</div>
          <div class="level-grid">
      `;
      for (const level of phaseLevels) {
        const completed = Storage.isLevelCompleted(state, level.id);
        const unlocked = Storage.isLevelUnlocked(state, level.id);
        const stars = Storage.getStars(state, level.id);
        const isCurrent = level.id === state.currentLevel;

        let nodeClass = 'node-locked';
        if (completed) nodeClass = 'node-done';
        else if (unlocked) nodeClass = isCurrent ? 'node-current' : 'node-open';

        const starsHtml = stars > 0 ?
          `<div class="stars">${[1,2,3].map(s => `<span class="${s <= stars ? 'star-on' : 'star-off'}">★</span>`).join('')}</div>` : '';

        const lockIcon = unlocked ? '' : '🔒';

        if (unlocked) {
          html += `<a class="level-node ${nodeClass}" onclick="Game.startLevel(${level.id})">${level.id}${starsHtml}</a>`;
        } else {
          html += `<div class="level-node ${nodeClass}" title="Pehle pichla level mukammal karo">${lockIcon}</div>`;
        }
      }
      html += '</div></div>';
    }

    html += '</div>';
    render(html);
  }

  // === LEVEL START ===
  function startLevel(id) {
    const level = Curriculum.getLevel(id);
    if (!level) { showHome(); return; }
    if (!Storage.isLevelUnlocked(state, id) && id !== state.currentLevel) {
      showLevels();
      return;
    }

    currentLevel = level;
    currentItemIdx = 0;
    currentStars = 3;
    errorCount = 0;
    levelStartTime = Date.now();
    AudioEngine.unlock();

    // Check if this is a milestone level (every 5th)
    if (Curriculum.isMilestone(id) && !Storage.isLevelCompleted(state, id)) {
      // Show milestone first, then start the level
      showMilestone(id, () => {
        renderLevel();
      });
    } else {
      renderLevel();
    }
  }

  // === LEVEL RENDERING ===
  function renderLevel() {
    if (!currentLevel) return;
    const level = currentLevel;
    const item = level.items[currentItemIdx];

    // Progress dots
    let dotsHtml = '<div class="progress-dots">';
    for (let i = 0; i < level.items.length; i++) {
      dotsHtml += `<div class="progress-dot ${i < currentItemIdx ? 'done' : ''} ${i === currentItemIdx ? 'active' : ''}"></div>`;
    }
    dotsHtml += '</div>';

    let content = '';

    if (level.mode === 'letter') {
      content = renderLetterMode(item, level);
    } else if (level.mode === 'blend2') {
      content = renderBlendMode(item, level);
    } else if (level.mode === 'wordbox') {
      content = renderWordboxMode(item, level);
    } else if (level.mode === 'copy') {
      content = renderCopyMode(item, level, false);
    } else if (level.mode === 'listen') {
      content = renderCopyMode(item, level, true);
    } else if (level.mode === 'dictation') {
      content = renderDictationMode(item, level);
    } else if (level.mode === 'assessment') {
      content = renderAssessmentMode(item, level);
    } else if (level.mode === 'story') {
      content = renderStoryMode(item, level);
    }

    let badge = '';
    if (level.mode === 'dictation') {
      badge = '<div class="dic-badge">✍️ Dictation</div>';
    } else if (level.mode === 'assessment') {
      badge = '<div class="assessment-badge">📝 Imtehaan</div>';
    }

    render(`
      <div class="screen play-screen">
        <div class="play-header">
          <button class="btn-icon" onclick="location.hash='/levels'">←</button>
          <div class="play-level-info">
            <div class="play-level-num">Level ${level.id}</div>
            <div class="play-level-title">${level.title}</div>
          </div>
          <button class="btn-icon" onclick="Game.speakCurrent()">🔊</button>
        </div>
        ${badge}
        ${dotsHtml}
        ${content}
      </div>
    `);

    // Auto-speak the first item
    setTimeout(() => speakItem(item, level.mode), 300);
  }

  // === MODE RENDERERS ===

  function renderLetterMode(item, level) {
    itemStartTime = Date.now();
    return `
      <div class="play-intro slide-up">
        <p>${currentLevel.intro}</p>
      </div>
      <div class="visual-img">${item.emoji}</div>
      <div class="play-prompt">
        <div class="play-prompt-text">${item.key}</div>
        <div class="play-prompt-urdu">آواز: ${item.sound}</div>
        <div class="play-prompt-urdu">مثال: ${item.example}</div>
      </div>
      <button class="audio-btn" onclick="Game.speakCurrent()">🔊</button>
      <div class="text-input-area">
        <input type="text" class="text-input" id="answer-input"
          placeholder="Yahan type karo..." autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"
          onkeydown="Game.onInputKey(event)">
      </div>
      <div class="feedback" id="feedback"></div>
      <div class="next-btn-container">
        <button class="btn btn-primary" onclick="Game.checkAnswer()">Check</button>
      </div>
    `;
  }

  function renderBlendMode(item, level) {
    itemStartTime = Date.now();
    const lettersHtml = item.letters.map(l =>
      `<span class="phonetic-syllable" data-letter="${l}">${l}</span>`
    ).join(' + ');

    return `
      <div class="play-intro slide-up">
        <p>${currentLevel.intro}</p>
      </div>
      <div class="visual-img">${item.emoji}</div>
      <div class="play-prompt">
        <div class="phonetic-breakdown">${lettersHtml}</div>
        <div class="play-prompt-text" style="margin-top:12px">= ${item.result}</div>
        <div class="play-prompt-urdu">${item.urdu}</div>
      </div>
      <button class="audio-btn" onclick="Game.speakCurrent()">🔊</button>
      <div class="text-input-area">
        <input type="text" class="text-input" id="answer-input"
          placeholder="Nateeja type karo..." autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"
          onkeydown="Game.onInputKey(event)">
      </div>
      <div class="feedback" id="feedback"></div>
      <div class="next-btn-container">
        <button class="btn btn-primary" onclick="Game.checkAnswer()">Check</button>
      </div>
    `;
  }

  function renderWordboxMode(item, level) {
    itemStartTime = Date.now();
    const word = item.text;
    const letters = word.split('');
    // Scramble letters for the box-filling game
    const scrambled = [...letters].sort(() => Math.random() - 0.5);
    // Make sure scrambled isn't same as original
    if (scrambled.join('') === word && letters.length > 1) {
      scrambled.reverse();
    }

    boxFillState = { word, letters: [...letters], filled: [], scrambled: [...scrambled] };

    let boxesHtml = '';
    for (let i = 0; i < letters.length; i++) {
      boxesHtml += `<div class="letter-box" id="box-${i}" data-idx="${i}"></div>`;
    }

    let scrambledHtml = '';
    scrambled.forEach((l, i) => {
      scrambledHtml += `<div class="scrambled-letter" id="scrambled-${i}" data-letter="${l}" data-idx="${i}" onclick="Game.pickLetter(${i})">${l}</div>`;
    });

    return `
      <div class="play-intro slide-up">
        <p>${currentLevel.intro}</p>
      </div>
      <div class="visual-img">${item.emoji}</div>
      <div class="play-prompt">
        <div class="play-prompt-text">${word}</div>
        <div class="play-prompt-urdu">${item.urdu} · ${item.english}</div>
      </div>
      <button class="audio-btn" onclick="Game.speakCurrent()">🔊</button>
      <div class="box-fill-container">${boxesHtml}</div>
      <div class="scrambled-letters">${scrambledHtml}</div>
      <div class="feedback" id="feedback"></div>
      <div class="next-btn-container">
        <button class="btn btn-ghost" onclick="Game.resetBoxes()">🔄 Reset</button>
      </div>
    `;
  }

  function renderCopyMode(item, level, isListen) {
    itemStartTime = Date.now();
    const showText = !isListen;

    const textDisplay = showText ?
      `<div class="play-prompt-text">${item.text}</div>` :
      '<div class="play-prompt-text" style="opacity:0.3">🔊 Sirf awaz suno</div>';

    return `
      <div class="play-intro slide-up">
        <p>${currentLevel.intro}</p>
      </div>
      ${item.emoji ? `<div class="visual-img">${item.emoji}</div>` : ''}
      <div class="play-prompt">
        ${textDisplay}
        ${showText && item.urdu ? `<div class="play-prompt-urdu">${item.urdu}</div>` : ''}
      </div>
      <button class="audio-btn" onclick="Game.speakCurrent()">🔊</button>
      <div class="text-input-area">
        <input type="text" class="text-input" id="answer-input"
          placeholder="Yahan type karo..." autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"
          onkeydown="Game.onInputKey(event)">
      </div>
      <div class="feedback" id="feedback"></div>
      <div class="next-btn-container">
        <button class="btn btn-primary" onclick="Game.checkAnswer()">Check</button>
      </div>
    `;
  }

  function renderDictationMode(item, level) {
    itemStartTime = Date.now();
    return `
      <div class="play-intro slide-up">
        <p>${currentLevel.intro}</p>
      </div>
      <div class="play-prompt">
        <div class="play-prompt-text" style="opacity:0.3">✍️ Sirf awaz suno</div>
      </div>
      <button class="audio-btn" onclick="Game.speakCurrent()">🔊</button>
      <div class="text-input-area">
        <input type="text" class="text-input" id="answer-input"
          placeholder="Awaz suno aur type karo..." autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"
          onkeydown="Game.onInputKey(event)">
      </div>
      <div class="feedback" id="feedback"></div>
      <div class="next-btn-container">
        <button class="btn btn-primary" onclick="Game.checkAnswer()">Check</button>
      </div>
    `;
  }

  function renderAssessmentMode(item, level) {
    itemStartTime = Date.now();
    return `
      <div class="play-intro slide-up">
        <p>${currentLevel.intro}</p>
      </div>
      <div class="play-prompt">
        <div class="play-prompt-text" style="opacity:0.3">📝 Sirf awaz suno</div>
      </div>
      <button class="audio-btn" onclick="Game.speakCurrent()">🔊</button>
      <div class="text-input-area">
        <input type="text" class="text-input" id="answer-input"
          placeholder="Awaz suno aur type karo..." autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"
          onkeydown="Game.onInputKey(event)">
      </div>
      <div class="feedback" id="feedback"></div>
      <div class="next-btn-container">
        <button class="btn btn-primary" onclick="Game.checkAnswer()">Check</button>
      </div>
    `;
  }

  function renderStoryMode(item, level) {
    itemStartTime = Date.now();
    const story = item;
    const linesHtml = story.lines.map((line, i) =>
      `<div class="phonetic-syllable story-line" style="display:block;text-align:center;padding:12px 16px;margin:4px 0;cursor:pointer" onclick="Game.speakText('${line.replace(/'/g, "\\'")}')">${line}</div>`
    ).join('');

    const storyBadge = story.isIslamic ?
      '<div class="dic-badge" style="border-color:var(--neon-green);color:var(--neon-green)">🕌 Islami Kahani</div>' :
      '<div class="dic-badge" style="border-color:var(--neon-gold);color:var(--neon-gold)">😄 Funny Kahani</div>';

    return `
      <div class="play-intro slide-up">
        <p>${currentLevel.intro}</p>
      </div>
      ${storyBadge}
      <h2 style="text-align:center;margin:12px 0;color:var(--neon-cyan);font-size:18px">${story.title}</h2>
      <button class="audio-btn" onclick="Game.speakCurrent()">🔊</button>
      <div style="margin:16px 0">${linesHtml}</div>
      <div class="text-input-area">
        <input type="text" class="text-input" id="answer-input"
          placeholder="Aakhri line type karo..." autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"
          onkeydown="Game.onInputKey(event)">
      </div>
      <div class="feedback" id="feedback"></div>
      <div class="next-btn-container">
        <button class="btn btn-primary" onclick="Game.checkAnswer()">Check</button>
      </div>
    `;
  }

  // === AUDIO ===
  async function speakItem(item, mode) {
    if (!item) return;
    const btn = document.querySelector('.audio-btn');
    if (btn) btn.classList.add('playing');

    if (mode === 'letter') {
      // Speak the key sound, then the example
      await AudioEngine.speak(item.key, { rate: 0.6 });
      await new Promise(r => setTimeout(r, 200));
      await AudioEngine.speak(item.example, { rate: 0.75 });
    } else if (mode === 'blend2') {
      // Speak each letter, then the result
      const letters = item.letters;
      for (let i = 0; i < letters.length; i++) {
        const el = document.querySelector(`[data-letter="${letters[i]}"]`);
        if (el) el.classList.add('speaking');
        await AudioEngine.speak(letters[i], { rate: 0.6 });
        if (el) el.classList.remove('speaking');
        await new Promise(r => setTimeout(r, 200));
      }
      await new Promise(r => setTimeout(r, 300));
      await AudioEngine.speak(item.result, { rate: 0.75 });
    } else if (mode === 'story') {
      // Speak the whole story
      for (const line of item.lines) {
        await AudioEngine.speak(line, { rate: 0.8 });
        await new Promise(r => setTimeout(r, 300));
      }
    } else {
      // Words, sentences, dictation, assessment - try MP3 first, then TTS
      const text = item.text || item.result || '';
      if (text) {
        await AudioEngine.speakWord(text, { rate: 0.8 });
      }
    }

    if (btn) btn.classList.remove('playing');
  }

  function speakCurrent() {
    if (!currentLevel) return;
    const item = currentLevel.items[currentItemIdx];
    speakItem(item, currentLevel.mode);
  }

  function speakText(text) {
    AudioEngine.speak(text, { rate: 0.8 });
  }

  // === INPUT HANDLING ===
  function onInputKey(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      checkAnswer();
    } else if (e.key.match(/[a-zA-Z ]/)) {
      AudioEngine.sfx.key();
    }
  }

  function normalizeAnswer(text) {
    return text.toLowerCase().trim().replace(/\s+/g, ' ').replace(/[.?!،,]/g, '');
  }

  function checkAnswer() {
    if (!currentLevel) return;
    const item = currentLevel.items[currentItemIdx];
    const input = document.getElementById('answer-input');

    if (!input) {
      // For wordbox mode, check box fill
      return;
    }

    const userAnswer = normalizeAnswer(input.value);
    let correctAnswer = '';

    if (currentLevel.mode === 'letter') {
      correctAnswer = normalizeAnswer(item.key);
    } else if (currentLevel.mode === 'blend2') {
      correctAnswer = normalizeAnswer(item.result);
    } else if (currentLevel.mode === 'copy' || currentLevel.mode === 'listen' ||
               currentLevel.mode === 'dictation' || currentLevel.mode === 'assessment') {
      correctAnswer = normalizeAnswer(item.text);
    } else if (currentLevel.mode === 'story') {
      // For story, check the last line
      correctAnswer = normalizeAnswer(item.lines[item.lines.length - 1]);
    }

    const feedback = document.getElementById('feedback');

    if (userAnswer === correctAnswer) {
      // Correct!
      AudioEngine.sfx.correct();
      feedback.className = 'feedback correct';
      feedback.textContent = '✅ Sahi! Acha kaam!';

      if (errorCount === 0) {
        // No errors = 3 stars
      } else if (errorCount === 1) {
        currentStars = Math.min(currentStars, 2);
      } else {
        currentStars = Math.min(currentStars, 1);
      }

      // Auto-next after short delay
      setTimeout(() => nextItem(), 800);
    } else {
      // Wrong
      errorCount++;
      AudioEngine.sfx.wrong();
      feedback.className = 'feedback wrong';
      feedback.textContent = `❌ Ghalti! Sahi jawab: ${correctAnswer}`;
      input.classList.add('wrong');
      setTimeout(() => input.classList.remove('wrong'), 400);

      // After 2 errors, show the answer and let them continue
      if (errorCount >= 2) {
        input.value = correctAnswer;
        feedback.textContent = `Sahi jawab: ${correctAnswer} — Ab type karke yaad karo`;
        currentStars = Math.min(currentStars, 1);
        // Allow them to continue after seeing the answer
        setTimeout(() => nextItem(), 1500);
      }
    }
  }

  // === BOX-FILL GAME ===
  function pickLetter(scrambledIdx) {
    if (!boxFillState) return;
    const el = document.getElementById(`scrambled-${scrambledIdx}`);
    if (!el || el.classList.contains('used')) return;

    AudioEngine.sfx.key();

    const letter = boxFillState.scrambled[scrambledIdx];
    const fillIdx = boxFillState.filled.length;

    if (fillIdx < boxFillState.letters.length) {
      boxFillState.filled.push({ letter, scrambledIdx });
      el.classList.add('used');

      const box = document.getElementById(`box-${fillIdx}`);
      box.textContent = letter;
      box.classList.add('filled');

      // Check if all boxes filled
      if (boxFillState.filled.length === boxFillState.letters.length) {
        checkBoxAnswer();
      }
    }
  }

  function checkBoxAnswer() {
    const filledWord = boxFillState.filled.map(f => f.letter).join('');
    const correctWord = boxFillState.word;
    const feedback = document.getElementById('feedback');

    if (filledWord === correctWord) {
      AudioEngine.sfx.correct();
      feedback.className = 'feedback correct';
      feedback.textContent = '✅ Sahi!';

      // Mark boxes as correct
      for (let i = 0; i < boxFillState.letters.length; i++) {
        document.getElementById(`box-${i}`).classList.add('correct');
      }

      if (errorCount === 0) {
      } else if (errorCount === 1) {
        currentStars = Math.min(currentStars, 2);
      } else {
        currentStars = Math.min(currentStars, 1);
      }

      setTimeout(() => nextItem(), 800);
    } else {
      AudioEngine.sfx.wrong();
      feedback.className = 'feedback wrong';
      feedback.textContent = `❌ Ghalti! Sahi: ${correctWord}`;
      errorCount++;
      currentStars = Math.min(currentStars, 1);

      // Show correct then continue
      setTimeout(() => {
        for (let i = 0; i < boxFillState.letters.length; i++) {
          const box = document.getElementById(`box-${i}`);
          box.textContent = boxFillState.letters[i];
          box.classList.remove('filled');
          box.classList.add('correct');
        }
        feedback.textContent = `Sahi jawab: ${correctWord}`;
      }, 500);

      setTimeout(() => nextItem(), 1800);
    }
  }

  function resetBoxes() {
    if (!boxFillState) return;
    boxFillState.filled = [];
    for (let i = 0; i < boxFillState.letters.length; i++) {
      const box = document.getElementById(`box-${i}`);
      if (box) {
        box.textContent = '';
        box.classList.remove('filled', 'correct', 'wrong');
      }
    }
    document.querySelectorAll('.scrambled-letter').forEach(el => el.classList.remove('used'));
    AudioEngine.sfx.key();
  }

  // === PROGRESSION ===
  function nextItem() {
    if (!currentLevel) return;
    currentItemIdx++;
    errorCount = 0;

    if (currentItemIdx >= currentLevel.items.length) {
      // Level complete!
      completeLevel();
    } else {
      renderLevel();
    }
  }

  function completeLevel() {
    const timeMs = Date.now() - levelStartTime;
    const xpGain = Storage.completeLevel(state, currentLevel.id, currentStars, timeMs);

    AudioEngine.sfx.levelUp();

    // Check if next level is a milestone (every 5th)
    const nextId = currentLevel.id + 1;
    const showMilestoneNext = Curriculum.isMilestone(nextId) &&
                              !Storage.isLevelCompleted(state, nextId) &&
                              nextId <= Curriculum.getTotalLevels();

    const isLastLevel = currentLevel.id >= Curriculum.getTotalLevels();

    let html = `
      <div class="screen complete-screen">
        <div class="complete-stars">${'★'.repeat(currentStars)}${'☆'.repeat(3 - currentStars)}</div>
        <div class="complete-msg">Level ${currentLevel.id} Mukammal!</div>
        <div class="complete-xp">+${xpGain} XP</div>
    `;

    if (isLastLevel) {
      html += `
        <h1 style="font-family:'Rubik Mono One',sans-serif;font-size:28px;margin:20px 0;background:linear-gradient(90deg,var(--neon-gold),var(--neon-pink));-webkit-background-clip:text;background-clip:text;color:transparent">GRADUATION!</h1>
        <p style="color:var(--fg);font-size:18px;text-align:center">Mubarak Ho! Tum Zero se Hero ban gaye!<br>Ab tum Roman Urdu likh sakte ho!</p>
        <button class="btn btn-gold" onclick="location.hash='/'">🏠 Ghar</button>
      `;
    } else {
      html += `
        <button class="btn btn-primary" onclick="Game.nextLevel()">Agla Level →</button>
        <button class="btn btn-ghost" onclick="location.hash='/levels'">Sare Levels</button>
      `;
    }

    html += '</div>';
    render(html);
  }

  function nextLevel() {
    const nextId = currentLevel.id + 1;
    if (nextId > Curriculum.getTotalLevels()) {
      showHome();
      return;
    }

    // Check if next is a milestone
    if (Curriculum.isMilestone(nextId) && !Storage.isLevelCompleted(state, nextId)) {
      showMilestone(nextId, () => {
        startLevel(nextId);
      });
    } else {
      startLevel(nextId);
    }
  }

  // === MILESTONE ===
  function showMilestone(levelId, callback) {
    AudioEngine.sfx.milestone();
    const phase = Curriculum.phases.find(p => {
      const phaseLevels = Curriculum.getLevelsByPhase(p.id);
      return phaseLevels.some(l => l.id === levelId);
    });

    const milestoneNum = levelId / 5;

    const overlay = document.createElement('div');
    overlay.className = 'milestone-overlay';
    overlay.id = 'milestone-overlay';

    // Create confetti
    let confettiHtml = '';
    const colors = ['#4af0d0', '#ff5fa8', '#ffcc4a', '#6affa0', '#a87aff'];
    for (let i = 0; i < 30; i++) {
      const left = Math.random() * 100;
      const delay = Math.random() * 1;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = 6 + Math.random() * 8;
      confettiHtml += `<div class="confetti-piece" style="left:${left}%;animation-delay:${delay}s;background:${color};width:${size}px;height:${size}px;border-radius:${Math.random() > 0.5 ? '50%' : '0'}"></div>`;
    }

    overlay.innerHTML = `
      ${confettiHtml}
      <div class="milestone-card">
        <div class="milestone-icon">🏆</div>
        <div class="milestone-title">Umer Jamali Beautiful</div>
        <div class="milestone-subtitle">Milestone ${milestoneNum} · Level ${levelId}!</div>
        <div class="milestone-msg">Aap ne ${levelId - 4} se ${levelId} levels mukammal kiye!<br>MashaAllah! Bohat acha kaam!</div>
        <button class="btn btn-gold" id="milestone-continue">Jari Rakho →</button>
      </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('milestone-continue').onclick = () => {
      overlay.remove();
      if (callback) callback();
    };

    // Auto-continue after 5 seconds
    setTimeout(() => {
      if (document.getElementById('milestone-overlay')) {
        overlay.remove();
        if (callback) callback();
      }
    }, 6000);
  }

  // === SETTINGS ===
  function toggleBgm() {
    state.settings.bgm = !state.settings.bgm;
    AudioEngine.setBgmEnabled(state.settings.bgm);
    Storage.updateSettings(state, { bgm: state.settings.bgm });
    showHome();
  }

  function toggleSfx() {
    state.settings.sfx = !state.settings.sfx;
    AudioEngine.setSfxEnabled(state.settings.sfx);
    Storage.updateSettings(state, { sfx: state.settings.sfx });
    showHome();
  }

  function confirmReset() {
    if (confirm('Kya aap really sab reset karna chahte hain? Saara progress khatam ho jayega.')) {
      Storage.reset();
      state = Storage.load();
      showHome();
    }
  }

  // === PUBLIC API ===
  return {
    init,
    startLevel,
    showHome,
    showLevels,
    nextLevel,
    checkAnswer,
    onInputKey,
    speakCurrent,
    speakText,
    pickLetter,
    resetBoxes,
    toggleBgm,
    toggleSfx,
    confirmReset,
  };
})();

// === START ===
document.addEventListener('DOMContentLoaded', () => {
  Game.init();
});
