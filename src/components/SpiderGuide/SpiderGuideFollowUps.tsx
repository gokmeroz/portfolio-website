import type { GuideIntent } from "../../lib/spiderGuide/types";

type SpiderGuideFollowUpsProps = {
  intent: GuideIntent;
  intentById: Map<string, GuideIntent>;
  onSelect: (intent: GuideIntent) => void;
};

export default function SpiderGuideFollowUps({ intent, intentById, onSelect }: SpiderGuideFollowUpsProps) {
  const followUps = (intent.followUpIntentIds ?? [])
    .map((id) => intentById.get(id))
    .filter((i): i is GuideIntent => Boolean(i))
    .slice(0, 4);

  if (followUps.length === 0) return null;

  return (
    <div className="pixel-guide-followups" aria-label="Follow-up questions">
      {followUps.map((followUp) => (
        <button
          key={followUp.id}
          type="button"
          className="pixel-guide-followup"
          onClick={() => onSelect(followUp)}
        >
          <span className="pixel-guide-followup-strand" aria-hidden="true" />
          {followUp.title}
        </button>
      ))}
    </div>
  );
}
