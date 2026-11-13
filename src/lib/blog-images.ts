// Licensed editorial photos: docs/GUIDE-PHOTO-SOURCES.md.
const photos = {
 finance: ["finance", "Financial paperwork and cash being reviewed at a desk"],
 budget: ["budget", "Calculator and banknotes arranged for a budget review"],
 investing: ["investing", "Stock exchange display showing market quotations"],
 home: ["home", "Residential home with a lawn and landscaped entrance"],
 construction: ["construction", "Construction workers pouring concrete at a building site"],
 study: ["study", "Student learning at a desk during an online lesson"],
 math: ["math", "Notebook containing handwritten mathematical calculations"],
 technology: ["technology", "Computer workstation displaying programming code"],
 fitness: ["fitness", "Athlete performing a strength training exercise with weights"],
 nutrition: ["nutrition", "Fresh vegetables and a balanced meal served on a plate"],
 water: ["water", "Drinking water being poured from a glass bottle into a clear glass"],
 planning: ["planning", "Paper notes and planning materials arranged on a desk"],
};
function photoFor(slug: string, category: string): string[] {
 const subject = `${slug} ${category}`.toLowerCase();
 if (/mortgage|house|home-equity|rent|inheritance/.test(subject)) return photos.home;
 if (/concrete|floor|roof|construction/.test(subject)) return photos.construction;
 if (/water/.test(subject)) return photos.water;
 if (/calori|nutrition|pregnancy/.test(subject)) return photos.nutrition;
 if (/bmi|bmr|body|weight|heart|health|fitness/.test(subject)) return photos.fitness;
 if (/grade|gpa|cgpa|education/.test(subject)) return photos.study;
 if (/matrix|fraction|equation|prime|math|percentage|scientific|gcf|lcm/.test(subject)) return photos.math;
 if (/electric|resistor|voltage|engineering|api|token|creator|technology/.test(subject)) return photos.technology;
 if (/date|time|age-|week|month|calendar/.test(subject)) return photos.planning;
 if (/invest|interest|deposit|401k|retire|rrsp|tfsa|roth|roi/.test(subject)) return photos.investing;
 if (/budget|expense|tip|debt|emergency|cash-flow/.test(subject)) return photos.budget;
 return photos.finance;
}
export function getBlogImageUrl(slug: string, category: string): string {
 return `/images/guides/photos/${photoFor(slug, category)[0]}.webp`;
}
export function getBlogImageAlt(slug: string, category: string): string {
 return photoFor(slug, category)[1];
}
export function getPlaceholderImage(slug: string): string {
 return getBlogImageUrl(slug, "");
}
export function getBlogImageDimensions(): { width: number; height: number } {
 return { width: 1600, height: 900 };
}
