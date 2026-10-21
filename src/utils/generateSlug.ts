export const generateSlug = (text: string) => {
  let slug = text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+|-+\$/g, "");     // Trim leading and trailing -

    if(!slug){
      const randomId = Math.random().toString(36).substring(2, 8);
      slug = `org-${randomId}`;
    }

    return slug;
};
