<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-rules -->
# Article image dimensions

All article images must use **1600 × 900 px** (16:9 aspect ratio). This includes:
- The return value of `getBlogImageDimensions()` in `src/lib/blog-images.ts`
- The `width`/`height` in Open Graph image metadata for articles in `src/app/[slug]/page.tsx`
<!-- END:project-rules -->
