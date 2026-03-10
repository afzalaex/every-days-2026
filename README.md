# Every Days 2026

Daily p5.js sketches for the 2026 Every Days collection.

## Structure

- `sketches/733.js`
- `sketches/734.js`
- `sketches/735.js`
- one file per artwork, named by numeric artwork id

## Sketch Format

- Use plain p5.js in global mode.
- Each artwork lives in its own `.js` file inside `sketches/`.
- Keep filenames matched to the artwork id used on the site.
- The site loads these files remotely and runs them inside an isolated iframe.

## Good Defaults

- Prefer `pixelDensity(1)` for stable performance across browsers.
- Keep sketches self-contained.
- Use `setup()`, `draw()`, and p5 mouse/touch handlers as needed.
- If the sketch is static after generation, prefer `noLoop()`.

## Publishing Flow

1. Add the next sketch file in `sketches/`, for example `782.js`.
2. Commit and push this repo.
3. In `aex-site`, add or update the matching entry in `public/data/collection-2026.json`.
4. Deploy `aex-site` so `/every-days` picks up the new metadata.

## Notes

- This repo stores sketch source only.
- Artwork title and description are managed in `aex-site`.
