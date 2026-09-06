# Kurothos — Tides of Ruin

Static browser survival roguelike. Open through an HTTP server; all game code and assets are in `dist/`. No backend or dependency install is required. `npm test` runs the game-model checks using Node.

## Rules

- Ignara, Nyxara, Zephyra, and Amaris start unlocked. A victory unlocks Naia.
- One survivor, one starting attack, automatic targeting, WASD or arrow movement, Escape pause. Pointer drag also moves the survivor.
- Mini-bosses arrive at 300 and 600 active seconds. Naia arrives at 900 seconds. Defeating her ends the run.
- Six attack slots. Each attack has five ranks. Level-ups offer three distinct randomized choices, mixing available attacks and survivor stats. Pauses and level-ups stop the game clock.
- Each survivor has three native attacks. Other attacks are purchased per receiving survivor. The purchase enables the starting-attack selection and in-run level-up pool. Naia's attacks require a victory.
- Permanent health and damage upgrades are per survivor. Gold is shared. Gold, purchases, run records, and victory unlocks use versioned JSON under `kurothos-tides-save-v1` in localStorage. Gold is banked on death, victory, or an explicit retreat. Active runs are not restored after a page reload.

## Assets

Built-in image generation created the three raster assets from the supplied character references and the coastal arena brief. Character atlas: `dist/assets/characters.png`, 1536×1024, five columns (Ignara, Nyxara, Zephyra, Amaris, Naia), two animation rows. Enemy atlas: `dist/assets/enemies.png`, 1536×1024, three columns and two rows. Arena: `dist/assets/arena.png`, 1536×1024.

The atlases returned a neutral checker matte instead of alpha. `render.js` removes edge-connected light-neutral matte during sprite upload, preserves enclosed light details, and downsamples to a pixel grid. Source images remain intact.

Generation briefs: preserve all five character identities in an idle/walk pixel atlas; create three scylla and three goth succubus enemy variants in a 3×2 atlas; create a top-down moonlit ruined coastal plaza with clear battle ground. Palette: navy sea, slate ruins, teal light, muted purple, gold UI accents.

## Validation

Nine model tests cover initial locks, purchases, starting-attack eligibility, level-up choices and caps, pause and milestone timing, reward settlement, save validation, every attack on every survivor, and a 15-minute state simulation. Static asset references and JavaScript syntax are checked. Browser interaction, full manual runs, and difficulty balance have not been playtested.
