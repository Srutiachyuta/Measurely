# Measurely interface upgrade

This revision gives Measurely a restrained visual identity: ivory surfaces, forest-green accents, editorial headings, quiet borders and a compact wordmark. It uses local system fonts and adds no font downloads or new packages.

## Experience changes

- Replaced the homepage's repeated recently-added, featured and trending tool sections with six essentials, six topics and one useful converter feature. Removed the newsletter promotion from this page.
- Added an interactive EMI illustration to the homepage. It explicitly assumes 8.5% annual interest and excludes fees; it is not a lender quote.
- Homepage search submits an actual query to the calculator library.
- Rebuilt the library with category counts, text search, alphabetical ordering, favorites filtering, a clear empty state and progressive loading. Category controls remain available on small screens.
- Simplified navigation, added direct access to saved results, and replaced the animated menu with an accessible dialog that supports focus management and Escape.
- Rebuilt tool cards without gradients, floating decorations, invented usage counts or entrance animations. Favorites remain stored in this browser.
- Rebuilt shared result panels with readable primary/secondary values, optional charts, copy, download and share actions. Editing inputs hides outdated results. Noncurrency units retain up to 12 fractional digits instead of always rounding to two.
- Reduced the calculator sidebar's repeated recommendations and removed the reading-progress bar from the shared calculator workspace.
- Simplified the footer and button treatments; retained privacy, editorial, contact and legal links.

## Tool decisions

**Added: Unit Converter** (`/unit-converter`). One integrated tool covers length, mass, area, volume, speed and temperature. Unit menus stay within the selected family, switching families resets both units, negative temperatures are supported above absolute zero, and invalid/overflowing values receive feedback. Conversion results use 12 significant digits. This is not a currency converter.

**Consolidated: Watt Calculator into Power Calculator.** These tools used the same electrical power wheel. `/watt-calculator` now permanently redirects to `/power-calculator`, and the duplicate is excluded from public search, categories and the sitemap. The original definition remains in source for review; no article was deleted. Related-tool references resolve to Power Calculator. Its four fields now allow the intended blank values, require exactly two positive known values and explain errors. It models a simple DC resistive circuit; AC power-factor calculations are outside its scope.

There are **80 active calculators**: the original 80 minus one duplicate plus one converter. Other specialist tools remain available because no usage analytics or sufficient evidence justified removing them.

## Verification and release

Run `npm test` and `npm run build`. The numerical tests include 80 calculator examples, independent conversion references, 95 unit round trips, invalid temperature/unit/overflow cases and the combined power tool.

The interface and calculator flows were checked in desktop and mobile browsers, including dark appearance, navigation, filtering, favorites, saved results, downloads, error feedback, redirects and sitemap responses. This is not a full accessibility certification or a measured Core Web Vitals result.

For an isolated local build, `MEASURELY_BUILD_DIR=.next-premium` can be used for both build and start; otherwise Next uses its normal `.next` directory. `.next-premium` is ignored by Git and excluded from source packages.

Production CMS, consent, legal and jurisdiction-specific model requirements from `UPGRADE-GUIDE.md` still apply. No live deployment or merge is included in this revision.
