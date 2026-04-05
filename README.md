# Every Days 2026

Daily p5.js sketches for the 2026 Every Days collection.

## Usage
The artworks in this repo are released under [CC0](https://creativecommons.org/public-domain/cc0/).
No rights reserved. Use, remix, and build freely.

## What This Repo Does
- stores the live sketch source files used by `/every-days`
- one sketch file per artwork id
- GitHub `main` is the runtime source that `aex-site` fetches from

Important:
- `aex-site` does not bundle these sketch files
- the website fetches them live from `https://raw.githubusercontent.com/afzalaex/every-days-2026/main/sketches/<id>.js`
- if `aex-site` metadata points to a file that is not yet on `main`, the latest sketch will fail to load

## Structure
- `sketches/733.js`
- `sketches/734.js`
- `sketches/735.js`
- one file per artwork, named by numeric artwork id

## Sketch Compatibility Rules
Keep sketches compatible with the loader in `aex-site`.

Use:
- plain JavaScript
- p5.js global mode
- `setup()`, `draw()`, and standard p5 handlers when needed
- self-contained logic inside the single file

Avoid:
- imports or bundler-only syntax
- dependencies on local files from this repo
- assumptions that the sketch is hosted on the same origin as the website

Good defaults:
- prefer `pixelDensity(1)` when performance matters
- call `noLoop()` if the piece is static after generation
- handle `windowResized()` if the canvas should adapt to viewport changes

## Daily Publishing Flow
This repo and `aex-site` must be published in order.

### 1. Start Clean
```powershell
Set-Location C:\Users\AMD\projects\every-days-2026
git pull --ff-only origin main
git status --short --branch
```

### 2. Create The Next Sketch File
Example for artwork `783`:
```powershell
Copy-Item .\sketches\782.js .\sketches\783.js
# edit .\sketches\783.js
```

If you are not cloning the previous sketch, just create `.\sketches\783.js` directly.

### 3. Commit And Push This Repo First
```powershell
git add .\sketches\783.js
git commit -m "add artwork 783"
git push origin main
```

Do this before touching `aex-site` metadata.

### 4. Update `aex-site` Metadata Second
From the sibling repo:
```powershell
Set-Location C:\Users\AMD\projects\aex-site
git pull --ff-only origin main
npm run sync:collection-2026 -- 783
# edit .\public\data\collection-2026.json
```

The matching entry must include:
- `id`
- `file`
- `name`
- `description`

### 5. Test Through The Site
```powershell
Set-Location C:\Users\AMD\projects\aex-site
npm run dev
```

Then open:
```text
http://localhost:3000/every-days
```

Verify:
- the latest selector entry exists
- the new sketch renders
- the title and description are correct

### 6. Push `aex-site`
```powershell
Set-Location C:\Users\AMD\projects\aex-site
npm run typecheck
npm run build
git add .\public\data\collection-2026.json
git commit -m "add every-days 783 metadata"
git push origin main
```

## Fast Fix For "Latest Sketch Is Broken"
Symptom:
- `/every-days` shows the newest title and count
- the newest sketch fails to load

Cause:
- `aex-site` metadata references `783.js`
- this repo either does not have `sketches/783.js`, or it exists locally but was never pushed

Check this repo:
```powershell
Set-Location C:\Users\AMD\projects\every-days-2026
Test-Path .\sketches\783.js
git status --short --branch
git log --oneline --decorate -5
```

If `sketches/783.js` exists locally but is missing remotely:
```powershell
git add .\sketches\783.js
git commit -m "add artwork 783"
git push origin main
```

If `aex-site` metadata is already deployed, pushing this repo is enough to fix the load error. No site redeploy is required for that specific case.

## Release Checklist
Before finishing the day:
- the new `sketches/<id>.js` file exists
- `git status --short --branch` is clean
- the commit is on `origin/main`
- the matching metadata exists in `C:\Users\AMD\projects\aex-site\public\data\collection-2026.json`
- the latest sketch loads locally through `http://localhost:3000/every-days`

## Notes
- this repo stores sketch source only
- artwork title and description are managed in `aex-site`
