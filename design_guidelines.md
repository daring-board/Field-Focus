# Educational Platform Design Guidelines

## Design Approach
**System Selected:** Notion-inspired productivity design with Linear's typography clarity
**Rationale:** Educational content creation demands distraction-free editing with clear hierarchy. Drawing from Notion's editor excellence and Linear's interface precision.

## Core Design Principles
1. **Editor-First Philosophy:** Content creation interface is the hero
2. **Progressive Disclosure:** Complex features hidden until needed
3. **Scannable Hierarchy:** Clear visual distinction between courses, lessons, and content blocks

## Typography System

**Font Families:**
- Primary: Inter (headings, UI elements)
- Content: Inter (body text, editor)
- Code: JetBrains Mono (code blocks in lessons)

**Scale:**
- Display (Hero): 48px/56px, font-bold
- H1: 32px/40px, font-semibold
- H2: 24px/32px, font-semibold
- H3: 20px/28px, font-medium
- Body Large: 18px/28px, font-normal
- Body: 16px/24px, font-normal
- Small: 14px/20px, font-normal
- Tiny: 12px/16px, font-medium (labels, metadata)

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16
**Container Strategy:**
- Marketing pages: max-w-7xl
- Dashboard/Editor: Full-width with sidebar navigation
- Lesson content: max-w-3xl (optimal reading width)

**Grid System:**
- Course cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Dashboard stats: grid-cols-2 lg:grid-cols-4
- Lesson sidebar + editor: Two-column split (280px fixed sidebar + flex editor)

## Component Library

### Navigation
**Top Header (Marketing):**
- Logo left, navigation center, CTA + Login right
- Sticky with subtle shadow on scroll
- Height: 64px

**Dashboard Navigation:**
- Left sidebar: 280px fixed width
- Course list with collapsible lesson hierarchy
- Quick actions at sidebar top
- User profile at sidebar bottom

### Hero Section
**Large hero image:** Yes - classroom/learning environment photography
- Full-width hero with gradient overlay (dark to transparent)
- Image shows collaborative learning or focused student
- Height: 600px (80vh max)
- Centered content overlay with blurred-background buttons
- Headline + subheadline + dual CTA (Start Creating + View Demo)

### Course Dashboard
**Stats Cards Row:**
- 4-column grid showing: Total Courses, Active Students, Completion Rate, Revenue
- Each card: Large number (32px), label below (14px), subtle icon top-right
- Minimal borders, elevated shadow

**Course Grid:**
- Card design: Cover image (16:9 ratio), title, description preview, metadata row (lessons count, students, last updated)
- Hover: Subtle lift with increased shadow
- Action buttons appear on hover: Edit, Preview, Analytics

### Lesson Editor Interface

**Three-Panel Layout:**
1. **Left Sidebar (240px):** Lesson outline tree, drag-to-reorder, add lesson button
2. **Center Editor (flex-grow):** Clean writing space with floating toolbar
3. **Right Panel (320px, collapsible):** Lesson settings, media library, preview

**Editor Toolbar:**
- Floating above content when text selected
- Format options: Bold, Italic, Heading levels, Lists, Links, Code, Quote
- Block actions: Image, Video, Quiz, File attachment
- Minimalist icons, no text labels

**Content Blocks:**
- Text paragraphs: max-w-prose for readability
- Images: Full-width or inline options, caption support
- Video embeds: 16:9 ratio, thumbnail preview
- Code blocks: Syntax highlighting, language selector
- Quiz components: Multiple choice, true/false, fill-in-blank

### Marketing Page Structure

**Section 1 - Hero:** (described above)

**Section 2 - Value Propositions (3-column):**
- Icons above (64px size)
- Bold headline (20px)
- Description text
- Spacing: py-20

**Section 3 - Editor Showcase:**
- Large screenshot of editor interface (1200px wide)
- Annotated callouts highlighting features
- Side-by-side: features list + screenshot

**Section 4 - Course Creation Workflow:**
- 4-step visual progression (horizontal timeline)
- Icons, titles, brief descriptions
- Connecting lines between steps

**Section 5 - Testimonials (2-column):**
- Educator photos (circular, 80px)
- Quote text (18px italic)
- Name, role, institution (14px)
- Star ratings

**Section 6 - CTA Block:**
- Centered, py-24
- Headline, supporting text, primary CTA
- Trust indicators below (user count, institution logos)

**Footer:**
- 4-column layout: Product links, Resources, Company, Support
- Newsletter signup form
- Social media icons
- Copyright, legal links

## Images

**Hero Image:**
- Modern classroom or study space
- Natural lighting, diverse students collaborating
- Slightly desaturated for text overlay clarity
- Position: Center-center

**Editor Screenshot:**
- Clean interface showing rich content editing
- Sample lesson with mixed media (text, image, code block)
- Professional, polished appearance

**Testimonial Photos:**
- Professional headshots of educators
- Consistent circular crop
- High quality, well-lit

**Course Card Covers:**
- Abstract educational themes or subject-specific imagery
- Consistent 16:9 ratio
- Vibrant but not overwhelming

## Form Elements

**Input Fields:**
- Height: 44px
- Border: 1px solid with focus ring
- Padding: px-4
- Rounded corners: rounded-lg

**Buttons:**
- Primary: px-6 py-3, rounded-lg, font-medium
- Secondary: Same size, outline variant
- Small: px-4 py-2
- Icon buttons: 40x40px square

**Select/Dropdowns:**
- Match input field styling
- Custom arrow icon

## Dashboard-Specific Elements

**Course List View:**
- Table layout alternative to cards
- Columns: Title, Status, Students, Last Updated, Actions
- Row height: 64px
- Zebra striping subtle

**Analytics Charts:**
- Line graphs for enrollment trends
- Bar charts for completion rates
- Donut charts for content type distribution
- Minimal gridlines, clear data labels

**Student Management Table:**
- Avatar, name, email, progress bar, enrollment date, actions
- Sortable columns
- Bulk selection checkboxes

This design creates a professional, productivity-focused platform that prioritizes the content creation experience while maintaining marketing appeal.