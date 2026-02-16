import type { CourseItem } from "@/lib/experience-data";

export function CoursesCard({ courses }: { courses: CourseItem[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-medium text-sienna">AI Engineering Training</h2>
      <div className="rounded-2xl border border-white/[0.06] bg-black/85 px-6 py-5 backdrop-blur-xl sm:px-8 sm:py-6">
        <div className="space-y-6">
          {courses.map((course) => (
            <div key={course.title}>
              <div className="mb-3 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 text-xs text-muted-foreground">
                    {course.type}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">
                    {course.title}
                  </h3>
                </div>
                <p className="text-sm font-medium text-sienna">
                  {course.instructor}{" "}
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    (course description)
                  </a>
                </p>
                <p className="text-xs text-muted-foreground">{course.dates}</p>
              </div>

              {course.bullets.length > 0 && (
                <ul className="space-y-2">
                  {course.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-foreground/80"
                    >
                      <span className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-sienna" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
