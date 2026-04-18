

## Plan: Blue gradient theme + rescue chain reorder + accident scene update + timer fix + extra polish

### 1. Global theme — gradient blue with white buttons
**File:** `src/index.css`, `tailwind.config.ts`
- Replace warm amber/brown HSL tokens with a cool blue palette:
  - `--background`: deep navy (e.g. `215 45% 10%`)
  - `--primary`: vibrant blue (`210 90% 55%`)
  - `--card`: dark blue-gray (`215 40% 16%`)
  - `--accent`/`--secondary`: mid blues
  - Keep `--success` (green), `--warning` (amber), `--destructive` (red), `--info` (blue) for feedback contrast
- Add a body gradient background: `linear-gradient(135deg, hsl(215,55%,8%) 0%, hsl(220,50%,14%) 50%, hsl(210,60%,18%) 100%)`
- Update `.vr-button` and `.vr-button-primary` to **white background with dark blue text**, with subtle blue shadow on hover. Keep success/destructive variants colored.
- Update `--warm-glow` → `--blue-glow` (cool cyan-blue glow)
- Add new keyframes: `shimmer`, `float`, `glow-pulse`

### 2. Reorder rescue chain (Assess Victim → step 2)
**Files:** `src/hooks/useGameState.ts`, `src/components/game/scenes/RescueChainScene.tsx`, `src/components/game/scenes/MainMenuScene.tsx`
- New order:
  1. Recognize Emergency
  2. **Assess the Victim** (moved up)
  3. Secure Accident Scene
  4. Call Emergency Services
  5. Provide First Aid
  6. Wait for Help
- Update `initialRescueChain` order + redistribute weights (keep totals = 100)
- Update step lists in `RescueChainScene` and `MainMenuScene` rescue chain overlay to match
- Note: gameplay scene order itself stays the same (Driving → Accident → Safety/Call/Victim) — only the **chain display + scoring step order** changes, since `completeRescueChainStep` is called by id, not index

### 3. Accident scene — switch cones → warning triangles at 50m (German law)
**Files:** `src/components/game/scenes/AccidentScene.tsx`, `src/components/game/scenes/SafetyActionsScene.tsx`
- Replace orange cone shapes with red-bordered **warning triangle** SVG icons (▲ with red border, white fill)
- Update distance label everywhere from `~100m` → **`50m (German StVO)`**
- Update dialogue/instruction text: "Place the warning triangle 50m behind the accident (German road safety law)"
- In `SafetyActionsScene`, change positions to a single primary triangle at 50m + optional secondary markers; update labels (`Position 1 (50m)` etc.)
- Add a small info badge: "ℹ German StVO §15 — 50m on roads, 100m on highways"

### 4. First-aid timer — 10s → 60s
**File:** `src/components/game/scenes/VictimAssessmentScene.tsx`
- `const FIRST_AID_TIMER = 60;`
- Adjust `timerColor` thresholds: red ≤10s, warning ≤25s, success otherwise
- Update timeout copy to reflect 60s window

### 5. Extra animations & info polish across scenes
**Files:** various scene components, `src/index.css`
- **DrivingScene:** add animated road lines moving downward (CSS keyframe `road-scroll`), a subtle steering wheel icon overlay, and a "did you know" trivia tile (e.g. "In Germany, failing to render aid is punishable under §323c StGB").
- **AccidentScene:** add a soft pulsing red glow on the victim, animated bystander silhouettes (gentle sway), a hazard light blink on the crashed car, and a mini "scene legend" key.
- **SafetyActionsScene:** triangle drop-in animation on placement, success ripple effect, and a small "Why 50m?" info card.
- **EmergencyCallScene:** typing-dot indicator (`...`) before operator messages appear, a phone vibrate animation while connecting, and an info card showing the EU emergency number 112.
- **VictimAssessmentScene:** pulse on tap target, animated breathing wave (sine-line SVG) during breathing check, soft heart-rate line during bleeding step.
- **FeedbackScene:** count-up animation for the score number, animated progress bars on mount, confetti-style emoji burst if score ≥ 80.
- **ReadinessScene:** floating badge (gentle up/down motion), animated path between Low-Fi → Unity → Real Training nodes.
- **MainMenu:** subtle floating motion on the VR headset image, animated gradient sweep behind the title.
- **Side checklist & top bar:** smooth check-pop already exists; add a brief blue glow when an item completes.

### 6. New shared info component
**File (new):** `src/components/game/InfoTip.tsx`
- Small reusable component for the "Did you know" / law / context tips (icon + title + one-line text). Used in driving, accident, safety, and call scenes.

### Technical notes
- All color changes go through CSS variables, so no per-component refactor needed beyond the small button class restyle.
- Score weights after reorder (sum 100): Recognize 15 / Assess 15 / Secure 20 / Call 20 / First Aid 20 / Wait 10.
- No changes to `GameContainer` flow logic required — scene-to-scene transitions stay identical.

### Summary of files touched
Modified: `src/index.css`, `tailwind.config.ts`, `src/hooks/useGameState.ts`, `src/components/game/scenes/{MainMenuScene,RescueChainScene,DrivingScene,AccidentScene,SafetyActionsScene,EmergencyCallScene,VictimAssessmentScene,FeedbackScene,ReadinessScene}.tsx`, `src/components/game/SideChecklist.tsx`
Created: `src/components/game/InfoTip.tsx`

