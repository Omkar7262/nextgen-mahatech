import { prisma } from "@/lib/prisma";

export async function getPageContent(page: string, section: string, key: string, defaultValue: string = "") {
  try {
    const result = await prisma.pageContent.findFirst({
      where: {
        page,
        section,
        key
      },
    });
    return result?.value ?? defaultValue;
  } catch (err) {
    return defaultValue;
  }
}

export async function getSectionContent(page: string, section: string) {
  try {
    const results = await prisma.pageContent.findMany({
      where: {
        page,
        section
      },
    });
    
    const content: Record<string, string> = {};
    results.forEach(item => {
      content[item.key] = item.value;
    });
    return content;
  } catch (err) {
    return {};
  }
}
