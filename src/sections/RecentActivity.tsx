// src/sections/RecentActivity.tsx
import Section from "../components/Section";
import SectionHeader from "../components/SectionHeader";
import { activities, type Activity } from "../data/activities";

const STATUS_LABEL: Record<Activity["status"], string> = {
  ongoing: "Ongoing",
  upcoming: "Upcoming",
  completed: "Completed",
};

function StatusChip({ status }: { status: Activity["status"] }) {
  return (
    <span className="caption-box shrink-0">
      {status === "ongoing" && (
        <span className="pixel-live-dot !mr-0" aria-hidden="true" />
      )}
      {STATUS_LABEL[status]}
    </span>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  const cardClassName = "pixel-panel pixel-panel--blue block";

  const cardContent = (
    <>
      <div className="panel-bar panel-bar--blue">
        <span>{activity.org}</span>
        <span>{activity.period}</span>
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-lg font-extrabold leading-7 text-[var(--color-text-base)] sm:text-xl">
              {activity.title}
            </h3>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.06em] text-[var(--color-accent)]">
              {activity.role}
            </p>
          </div>

          <StatusChip status={activity.status} />
        </div>

        <p className="mt-5 max-w-4xl text-lg font-normal leading-8 text-[var(--color-text-base)]">
          {activity.description}
        </p>

        {activity.highlights && activity.highlights.length > 0 && (
          <ul className="pixel-list mt-6 max-w-4xl text-base font-normal leading-7 text-[var(--color-text-base)]">
            {activity.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {activity.tags.map((tag) => (
            <span key={tag} className="pixel-chip">
              {tag}
            </span>
          ))}
        </div>

        {activity.link && (
          <p className="mt-6 font-pixel-ui text-[11px] uppercase tracking-[0.12em] text-[var(--color-accent-2)]">
            View inzva AI Projects ↗
          </p>
        )}
      </div>
    </>
  );

  if (activity.link) {
    return (
      <a
        id={`activity-${activity.id}`}
        href={activity.link}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`View ${activity.title} at ${activity.org}`}
        className={cardClassName}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <article id={`activity-${activity.id}`} className={cardClassName}>
      {cardContent}
    </article>
  );
}

export default function RecentActivity() {
  return (
    <Section id="recent-activity">
      <SectionHeader
        eyebrow="Research Log"
        title="Recent Activity"
        description="Current research and collaborative engineering work beyond my shipped products."
      />

      <div className="space-y-10">
        {activities.map((activity) => (
          <ActivityCard key={activity.title} activity={activity} />
        ))}
      </div>
    </Section>
  );
}
