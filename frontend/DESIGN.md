# Midnight Meridian Design System

### 1. Overview & Creative North Star

**Creative North Star: The Executive Chronograph**
Midnight Meridian is a high-performance design system built for professional precision and editorial clarity. It moves away from the "app-as-a-tool" aesthetic toward a "digital workspace" feel. By utilizing a heavy reliance on whitespace, crisp Manrope typography, and a "Card-First" architecture, the system prioritizes rapid scanning and cognitive ease. It breaks traditional grid monotony through intentional content density shifts—where high-alert conflicts are given expansive breathing room, while routine list items remain compact and rhythmic.

### 2. Colors

The palette is rooted in a sophisticated "Slate & Sapphire" foundation.

- **The "No-Line" Rule:** Sectioning is achieved through background value shifts (e.g., `#f6f6f8` for the canvas vs. `#ffffff` for cards). 1px solid borders are permitted only for internal component nesting (like the date block within a meeting card) or when using `outline-variant` at 50% opacity to define a ghost boundary.
- **Surface Hierarchy:**
- **Base:** `surface` (#f6f6f8) acts as the global stage.
- **Tier 1:** `surface_container` (#ffffff) for primary content cards.
- **Tier 2:** `surface_container_high` (#f1f5f9) for subtle hover states and internal grouping.
- **The Glass & Gradient Rule:** Floating action footers and "Upcoming" highlights utilize linear gradients (Primary to Deep Blue) to create a focal point that draws the eye without cluttering the interface.

### 3. Typography

The system uses **Manrope** exclusively, leveraging its geometric yet approachable proportions to drive a clear hierarchy.

**Typography Scale (Derived from Source):**

- **Display/Logo:** 1.5rem (24px) - Bold, tight tracking (-0.025em). Used for primary page titles.
- **Conflict Headers:** 1.125rem (18px) - Bold. Reserved for critical alerts.
- **Body Large:** 1rem (16px) - Semibold. Used for card titles.
- **Body Standard:** 0.875rem (14px) - Medium. The workhorse for descriptions and secondary info.
- **Label/Caption:** 0.75rem (12px) - Bold/Uppercase. Used for timestamps and metadata tags.
- **Micro:** 10px - Bold. Used for mobile navigation labels.

The hierarchy is enforced through weight rather than just size; critical information uses `Bold (700)` or `Extrabold (800)` to ensure immediate recognition in a sea of data.

### 4. Elevation & Depth

Depth is communicated through "Tonal Layering" and specialized shadow casting rather than physical borders.

- **The Layering Principle:** Use `surface-container` for the primary card, then nest `surface-container-high` for sub-elements like "Date Badges."
- **Ambient Shadows:**
- **Shadow-SM:** Used for standard cards to create a slight lift from the `#f6f6f8` background.
- **Shadow-LG:** Reserved for floating action buttons or high-priority notifications, featuring a colored tint (Blue 500/20) to ground the element in the brand's primary hue.
- **Glassmorphism:** Elements like sidebar footers or mobile nav utilize high-opacity backgrounds with subtle backdrop blurs to maintain context of what lies beneath.

### 5. Components

- **Buttons:**
- **Primary:** High-contrast sapphire blue with a soft "Shadow-LG" tinted glow.
- **Ghost/Review:** White background with a slate border that transitions to red-300 on hover for conflict states.
- **Meeting Cards:** A complex primitive consisting of a Date Block (left-aligned), Content Cluster (center), and Action/Social Stack (right).
- **Date Badges:** Sharp vertical layouts (Month over Day) using high-contrast red/slate combinations to act as a temporal anchor.
- **Avatar Stacks:** Negative-space overlapping circles (offset: -0.75rem) with a 2px border matching the parent container color to ensure separation.

### 6. Do's and Don'ts

**Do:**

- Use `primary/10` (10% opacity) for active navigation states to create a "tinted" focus.
- Apply `antialiased` font rendering to maintain the crispness of the Manrope typeface.
- Use `rounded-xl` (1rem) for major containers and `rounded-lg` (0.75rem) for internal components.

**Don't:**

- Use pure black (#000000) for text; always use `slate-900` or `slate-800` to maintain the "Midnight" tonal depth.
- Overuse shadows; if three cards are adjacent, their boundaries should be defined by the `outline-variant` or color shift first.
- Center-align text in dashboard cards; always stick to a strong left-aligned axis for readability.
