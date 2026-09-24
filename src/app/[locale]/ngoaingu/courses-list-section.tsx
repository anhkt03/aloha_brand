import { getPublicCourses, getPublicCourseCategories } from "@/lib/dal/public-data";
import { TrainingList } from "./training-list";

/**
 * Split out from the page so it can sit behind a `<Suspense>` boundary —
 * this is the only part of the page that waits on the database.
 */
export async function CoursesListSection(props: { locale: string; emptyText: string }) {
  const { locale, emptyText } = props;
  const [courses, categories] = await Promise.all([
    getPublicCourses(locale),
    getPublicCourseCategories(locale),
  ]);
  if (!courses.length) {
    return <div className="card text-center text-ink-soft">{emptyText}</div>;
  }
  return <TrainingList courses={courses} categories={categories} />;
}
