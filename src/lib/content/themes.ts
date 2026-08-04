// AlongsideYou Companion Themes
// This file is the working content source while the CMS is being built.
// The same structure maps directly to the Supabase tables in supabase/schema.sql,
// so content entered here can be migrated into the database without rework.
//
// Themes marked draft: true are placeholders awaiting Natalie's review.

export type Topic = {
  /** Database id. Absent only in local preview mode without Supabase. */
  id?: string;
  title: string;
  summary: string;
};

export type Tool = {
  id?: string;
  title: string;
  summary: string;
};

export type Theme = {
  id?: string;
  slug: string;
  title: string;
  strapline: string;
  draft?: boolean;
  topics: Topic[];
  tools: Tool[];
};

export const themes: Theme[] = [
  {
    slug: "the-neighbourhood-shift",
    title: "The Neighbourhood Shift",
    strapline:
      "Making sense of neighbourhood and place-based working, and your role within an Integrated Neighbourhood Team.",
    topics: [
      {
        title: "What neighbourhood health actually means",
        summary:
          "Cutting through the policy language to what changes day to day for you and the people you support.",
      },
      {
        title: "Your place in the team around the person",
        summary:
          "How personalised care roles fit alongside clinical and community colleagues in an INT.",
      },
      {
        title: "Working across organisational boundaries",
        summary:
          "Practical ways to collaborate when colleagues sit in different organisations with different systems.",
      },
      {
        title: "Knowing your neighbourhood",
        summary:
          "Building and keeping a live picture of local assets, groups, and support beyond services.",
      },
      {
        title: "When the system is still catching up",
        summary:
          "Holding your ground when structures, data sharing, or referral routes have not caught up with the model.",
      },
    ],
    tools: [
      {
        title: "Neighbourhood asset map starter",
        summary: "A simple structure for capturing what exists locally and who to contact.",
      },
      {
        title: "Role clarity conversation guide",
        summary: "Prompts for agreeing who does what within the team around the person.",
      },
      {
        title: "MDT preparation checklist",
        summary: "Getting the most from multidisciplinary team discussions.",
      },
      {
        title: "Boundary-spanning email templates",
        summary: "Ready-to-adapt wording for reaching colleagues in other organisations.",
      },
    ],
  },
  {
    slug: "navigating-systems-and-services",
    title: "Navigating Systems and Services",
    strapline:
      "Finding a way through referral routes, eligibility criteria, and waiting lists with and for the people you support.",
    topics: [
      {
        title: "Mapping the route before you set off",
        summary: "Understanding a pathway before making promises about it.",
      },
      {
        title: "When the person does not fit the criteria",
        summary: "What to do when eligibility rules exclude someone who clearly needs support.",
      },
      {
        title: "Holding people through the wait",
        summary: "Supporting someone well while they are on a waiting list.",
      },
    ],
    tools: [
      {
        title: "Referral tracking sheet",
        summary: "Keeping oversight of where each referral has got to.",
      },
      {
        title: "Escalation script",
        summary: "Wording for chasing a stalled referral without burning bridges.",
      },
    ],
  },
  {
    slug: "power-voice-and-choice",
    title: "Power, Voice and Choice",
    strapline:
      "Keeping the person's own voice and choices at the centre, especially when systems and professionals speak loudly.",
    topics: [
      {
        title: "Whose goal is it anyway",
        summary: "Noticing when a plan has drifted from what the person actually wants.",
      },
      {
        title: "Supporting choice without abandoning people",
        summary: "Respecting decisions you would not have made, while staying alongside.",
      },
      {
        title: "Advocating inside the MDT",
        summary: "Bringing the person's voice into rooms they are not in.",
      },
    ],
    tools: [
      {
        title: "What matters to you conversation frame",
        summary: "A structure for surfacing goals in the person's own words.",
      },
      {
        title: "Decision summary template",
        summary: "Recording a person's choice and reasoning so it travels with them.",
      },
    ],
  },
  {
    slug: "when-theres-no-clear-answer",
    title: "When There's No Clear Answer",
    strapline:
      "Working with uncertainty, complexity, and situations where every option has a cost.",
    topics: [
      {
        title: "Sitting with not knowing",
        summary: "Staying useful when there is no fix to offer.",
      },
      {
        title: "Weighing options that all have downsides",
        summary: "Thinking through trade-offs with the person rather than for them.",
      },
      {
        title: "Knowing when to escalate",
        summary: "Judging the line between holding uncertainty and raising a concern.",
      },
    ],
    tools: [
      {
        title: "Uncertainty check-in",
        summary: "Questions to ask yourself when a situation feels stuck.",
      },
      {
        title: "Options and trade-offs worksheet",
        summary: "A one-page way to lay out choices with the person.",
      },
    ],
  },
  {
    slug: "when-conversations-feel-charged",
    title: "When Conversations Feel Charged",
    strapline:
      "Handling conversations carrying anger, distress, or high stakes, and looking after yourself afterwards.",
    topics: [
      {
        title: "Reading what is underneath the anger",
        summary: "Responding to the fear or frustration driving a charged moment.",
      },
      {
        title: "Staying steady under pressure",
        summary: "Practical grounding when a conversation gets heated.",
      },
      {
        title: "Repairing after a difficult exchange",
        summary: "Coming back from a conversation that went badly.",
      },
    ],
    tools: [
      {
        title: "De-escalation phrase bank",
        summary: "Words that lower the temperature without dismissing the person.",
      },
      {
        title: "Post-conversation debrief prompt",
        summary: "Five minutes of structured reflection after a hard conversation.",
      },
    ],
  },
  {
    slug: "starting-well-with-people",
    title: "Starting Well with People",
    strapline: "First conversations, building trust, and setting expectations early.",
    draft: true,
    topics: [
      {
        title: "The first conversation",
        summary: "Draft placeholder awaiting content review.",
      },
    ],
    tools: [],
  },
  {
    slug: "working-with-what-matters",
    title: "Working with What Matters",
    strapline: "Personalised care and support planning built around the person's own priorities.",
    draft: true,
    topics: [
      {
        title: "From assessment to conversation",
        summary: "Draft placeholder awaiting content review.",
      },
    ],
    tools: [],
  },
  {
    slug: "the-team-around-the-person",
    title: "The Team Around the Person",
    strapline: "Working well with colleagues, MDTs, and the wider neighbourhood team.",
    draft: true,
    topics: [
      {
        title: "Making MDTs work for the person",
        summary: "Draft placeholder awaiting content review.",
      },
    ],
    tools: [],
  },
  {
    slug: "looking-after-yourself",
    title: "Looking After Yourself",
    strapline: "Sustaining yourself in emotionally demanding work.",
    draft: true,
    topics: [
      {
        title: "Noticing your own warning signs",
        summary: "Draft placeholder awaiting content review.",
      },
    ],
    tools: [],
  },
  {
    slug: "endings-and-moving-on",
    title: "Endings and Moving On",
    strapline: "Closing support well, handing over, and helping people move forward.",
    draft: true,
    topics: [
      {
        title: "Ending support without ending the relationship badly",
        summary: "Draft placeholder awaiting content review.",
      },
    ],
    tools: [],
  },
];

export function getTheme(slug: string): Theme | undefined {
  return themes.find((t) => t.slug === slug);
}
