# SaniCrete Website - Image Guide
## How to Add SEO-Optimized Photos

---

## BEFORE YOU START

### Step 1: Rename Your Files
Use descriptive, keyword-rich names with hyphens:
- ❌ `IMG_4532.jpg`
- ❌ `photo1.jpg`
- ✅ `sanicrete-stx-poultry-floor-ohio.jpg`
- ✅ `dairy-processing-floor-installation.jpg`

### Step 2: Compress Your Images
Before uploading, compress at:
- **TinyPNG:** https://tinypng.com (drag & drop, free)
- **Squoosh:** https://squoosh.app (more control)

**Target sizes:**
- Hero/large images: Under 300KB
- Card images: Under 150KB
- Thumbnails/logos: Under 50KB

### Step 3: Recommended Dimensions
- **Hero images:** 1920 x 800 px
- **Card images:** 800 x 600 px
- **Product images:** 800 x 800 px
- **Team photos:** 600 x 600 px
- **Client logos:** 300 x 150 px (or smaller)

---

## IMAGE LOCATIONS BY PAGE

---

## HOMEPAGE (index.html)

### Video Poster Image (optional)
- **Location in file:** Line ~85
- **Current:** No poster image
- **File to add:** `images/video-poster.jpg`
- **Dimensions:** 1280 x 720 px
- **Suggested filename:** `sanicrete-video-poster.jpg`
- **Alt text:** Not needed for poster

### Industry Cards (6 images)
Find the section with `class="card-image"` around line 115-170

| Card | Suggested Filename | Alt Text |
|------|-------------------|----------|
| Meat & Poultry | `meat-poultry-processing-floor.jpg` | "USDA compliant flooring in meat processing facility" |
| Dairy & Cheese | `dairy-cheese-production-floor.jpg` | "Acid-resistant flooring in dairy production plant" |
| Breweries | `brewery-flooring-installation.jpg` | "Chemical-resistant brewery floor coating" |
| Bakeries | `bakery-food-manufacturing-floor.jpg` | "Food-grade flooring in commercial bakery" |
| Seafood | `seafood-processing-floor.jpg` | "Slip-resistant flooring in seafood processing facility" |
| Cold Storage | `cold-storage-freezer-floor.jpg` | "Thermal shock resistant freezer flooring" |

**How to replace:** Change this:
```html
<div class="card-image"><span class="card-image-icon">🍗</span></div>
```
To this:
```html
<div class="card-image"><img src="images/meat-poultry-processing-floor.jpg" alt="USDA compliant flooring in meat processing facility" style="width:100%; height:100%; object-fit:cover;"></div>
```

### Product Cards (3 images)
Around line 230-270

| Card | Suggested Filename | Alt Text |
|------|-------------------|----------|
| SaniCrete STX | `sanicrete-stx-finished-floor.jpg` | "SaniCrete STX heavy-duty urethane concrete flooring" |
| SaniCrete SL | `sanicrete-sl-self-leveling-floor.jpg` | "SaniCrete SL self-leveling floor system" |
| SaniPatch | `sanipatch-repair-kit.jpg` | "SaniPatch DIY concrete repair kit" |

### Feature Icons (4 spots)
Around line 195-220 - These work well as icons, but you could replace with photos:

| Feature | Suggested Filename | Alt Text |
|---------|-------------------|----------|
| Vertically Integrated | `sanicrete-manufacturing-facility.jpg` | "SaniCrete manufacturing facility in Michigan" |
| 5-Year Warranty | `warranty-badge.jpg` | "SaniCrete 5-year warranty guarantee" |
| 24-48 Hour Return | `floor-curing-process.jpg` | "Fast-curing urethane concrete floor" |
| Patented Technology | `stx-stainless-steel-reinforcement.jpg` | "Patented stainless steel wire reinforcement" |

---

## ABOUT PAGE (about.html)

### "One Throat to Choke" Section Image
Around line 65

- **Suggested filename:** `sanicrete-team-manufacturing.jpg`
- **Alt text:** "SaniCrete team at manufacturing facility in Michigan"
- **Dimensions:** 800 x 600 px

**Replace:**
```html
<div class="two-col-image">🏭</div>
```
**With:**
```html
<div class="two-col-image"><img src="images/sanicrete-team-manufacturing.jpg" alt="SaniCrete team at manufacturing facility in Michigan" style="width:100%; height:100%; object-fit:cover; border-radius:18px;"></div>
```

### Team Photos (2 images)
Around line 100-130

| Person | Suggested Filename | Alt Text | Dimensions |
|--------|-------------------|----------|------------|
| Keith Kwasny | `keith-kwasny-founder.jpg` | "Keith Kwasny, Founder and President of SaniCrete" | 600 x 600 px |
| Tyler Kwasny | `tyler-kwasny-vp-operations.jpg` | "Tyler Kwasny, VP Operations at SaniCrete" | 600 x 600 px |

**Replace:**
```html
<div class="team-photo">👤</div>
```
**With:**
```html
<div class="team-photo"><img src="images/keith-kwasny-founder.jpg" alt="Keith Kwasny, Founder and President of SaniCrete" style="width:100%; height:100%; object-fit:cover;"></div>
```

---

## PRODUCT PAGES (products/*.html)

Each product page has one large image area.

| Product | Filename | Alt Text |
|---------|----------|----------|
| STX | `products/sanicrete-stx-installed.jpg` | "SaniCrete STX heavy-duty urethane concrete floor" |
| SL | `products/sanicrete-sl-installed.jpg` | "SaniCrete SL self-leveling floor finish" |
| HF | `products/sanicrete-hf-installed.jpg` | "SaniCrete HF heavy-traffic industrial floor" |
| MD | `products/sanicrete-md-installed.jpg` | "SaniCrete MD medium-duty floor system" |
| VR | `products/sanicrete-vr-cove-base.jpg` | "SaniCrete VR cove base and vertical application" |
| PC | `products/sanicrete-pc-slope-repair.jpg` | "SaniCrete PC polymer concrete slope correction" |
| SaniQuartz | `products/saniquartz-decorative-floor.jpg` | "SaniQuartz decorative quartz flooring" |
| SaniFlake | `products/saniflake-decorative-floor.jpg` | "SaniFlake decorative vinyl flake flooring" |
| Drains | `products/sanitary-drain-stainless.jpg` | "Stainless steel sanitary floor drain" |

**Location:** Look for `class="product-image"` near the top of each file

**Replace:**
```html
<div class="product-image">⭐</div>
```
**With:**
```html
<div class="product-image"><img src="../images/products/sanicrete-stx-installed.jpg" alt="SaniCrete STX heavy-duty urethane concrete floor" style="width:100%; height:100%; object-fit:cover; border-radius:18px;"></div>
```

---

## INDUSTRY PAGES (industries/*.html)

Each industry page has one large image area.

| Industry | Filename | Alt Text |
|----------|----------|----------|
| Meat & Poultry | `industries/meat-poultry-floor.jpg` | "Urethane concrete flooring in poultry processing plant" |
| Dairy & Cheese | `industries/dairy-cheese-floor.jpg` | "Acid-resistant flooring in cheese production facility" |
| Brewery | `industries/brewery-floor.jpg` | "Chemical-resistant flooring in craft brewery" |
| Bakery | `industries/bakery-floor.jpg` | "Food-grade flooring in commercial bakery" |
| Seafood | `industries/seafood-floor.jpg` | "Slip-resistant flooring in seafood processing" |
| Cold Storage | `industries/cold-storage-floor.jpg` | "Thermal shock resistant flooring in freezer" |
| Pharmaceutical | `industries/pharmaceutical-floor.jpg` | "Clean room flooring in pharmaceutical facility" |
| Commercial | `industries/commercial-industrial-floor.jpg` | "Industrial epoxy flooring in warehouse" |

**Location:** Look for `class="two-col-image"` 

---

## PROJECTS PAGE (projects.html)

6 project cards with image areas.

| Project | Filename | Alt Text |
|---------|----------|----------|
| Case Farms | `projects/case-farms-ohio.jpg` | "SaniCrete floor installation at Case Farms Ohio" |
| Tulkoff | `projects/tulkoff-maryland.jpg` | "Food processing floor at Tulkoff Maryland" |
| Dairy Co-op | `projects/dairy-coop-wisconsin.jpg` | "Dairy flooring installation Wisconsin" |
| La Colombe | `projects/la-colombe-michigan.jpg` | "Beverage facility flooring La Colombe Michigan" |
| OSI | `projects/osi-oakland-california.jpg` | "Meat processing floor OSI Oakland" |
| Cold Storage | `projects/cold-storage-indiana.jpg` | "Freezer flooring installation Indiana" |

**Location:** Look for `class="project-image"` - there are 6 of them

**Replace:**
```html
<div class="project-image">
    <span class="project-tag">Poultry Processing</span>
</div>
```
**With:**
```html
<div class="project-image" style="background: url('images/projects/case-farms-ohio.jpg') center/cover;">
    <span class="project-tag">Poultry Processing</span>
</div>
```

---

## CAREERS PAGE (careers.html)

### Hero/Main Image
Around line 85

- **Suggested filename:** `careers-crew-working.jpg`
- **Alt text:** "SaniCrete installation crew at work"
- **Dimensions:** 800 x 600 px

**Replace:**
```html
<div class="two-col-image">🏗️</div>
```
**With:**
```html
<div class="two-col-image"><img src="images/careers-crew-working.jpg" alt="SaniCrete installation crew at work" style="width:100%; height:100%; object-fit:cover; border-radius:18px;"></div>
```

---

## SANIPATCH PAGE (sanipatch.html)

### Product Image
Around line 75

- **Suggested filename:** `sanipatch-kit-contents.jpg`
- **Alt text:** "SaniPatch DIY concrete repair kit with all components"
- **Dimensions:** 800 x 600 px

---

## FOLDER STRUCTURE FOR IMAGES

```
sanicrete-v2/
└── images/
    ├── logo.png (already there)
    ├── video-poster.jpg
    ├── sanicrete-team-manufacturing.jpg
    ├── keith-kwasny-founder.jpg
    ├── tyler-kwasny-vp-operations.jpg
    ├── careers-crew-working.jpg
    ├── sanipatch-kit-contents.jpg
    ├── logos/ (already there)
    │   ├── monogram.png
    │   ├── deanfoods.png
    │   ├── osi.png
    │   └── smithfield.png
    ├── products/
    │   ├── sanicrete-stx-installed.jpg
    │   ├── sanicrete-sl-installed.jpg
    │   └── ... (etc)
    ├── industries/
    │   ├── meat-poultry-floor.jpg
    │   ├── dairy-cheese-floor.jpg
    │   └── ... (etc)
    └── projects/
        ├── case-farms-ohio.jpg
        ├── tulkoff-maryland.jpg
        └── ... (etc)
```

---

## QUICK CHECKLIST

Before adding each image:

- [ ] Descriptive filename with keywords and hyphens
- [ ] Compressed to under 200KB (use TinyPNG)
- [ ] Correct dimensions for the spot
- [ ] Alt text written (descriptive, includes keywords)
- [ ] Placed in correct folder

---

## TOTAL IMAGE COUNT

| Section | Number of Images |
|---------|------------------|
| Homepage | 13 |
| About | 3 |
| Products (9 pages) | 9 |
| Industries (8 pages) | 8 |
| Projects | 6 |
| Careers | 1 |
| SaniPatch | 1 |
| **TOTAL** | **41 images** |

---

## NEED HELP?

If you send me your photos, I can:
1. Suggest which photo goes where
2. Update the HTML files for you
3. Give you an updated zip file ready to go

Just upload the photos to our chat!
