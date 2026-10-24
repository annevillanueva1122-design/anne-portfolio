// Built-in content: used when Supabase can't be reached. Generated from the original site.
import type { Content } from '../types';

export const fallbackContent: Content = {
  "kpis": [
    {
      "value": 2022,
      "from": 2000,
      "label": "Building automations since"
    },
    {
      "value": 10,
      "label": "Client teams served"
    },
    {
      "value": 16,
      "label": "Live funnels & sites"
    },
    {
      "value": 33,
      "label": "Lovable builds"
    },
    {
      "value": 20,
      "suffix": "+",
      "label": "Live Zaps in one account"
    }
  ],
  "work": [
    {
      "client": "Kelly Family Agency",
      "category": "Website · GHL · Booking",
      "subtitle": "Allstate insurance · Pottstown, PA",
      "headline": "Website build & full GHL pipeline",
      "description": "Built the agency site in Lovable.dev, then wired the whole client journey through GoHighLevel: custom quote forms feeding the CRM, and booking calendars for auto, home, life and business coverage enquiries.",
      "tags": [
        "Lovable.dev",
        "GoHighLevel",
        "Custom forms",
        "Calendars"
      ],
      "liveUrl": "https://kellyagency.us/"
    },
    {
      "client": "ZZ Med Spa",
      "category": "Landing pages · ManyChat · SMS",
      "subtitle": "Campaign pages & automation",
      "headline": "Campaign pages & Instagram automation",
      "description": "HTML landing pages for laser hair removal campaigns and a consultation booking page with phone and clinic-visit options. ManyChat comment-to-DM flows, Zenoti email templates, Pixel setup and A2P 10DLC registration.",
      "tags": [
        "HTML/CSS",
        "ManyChat",
        "Zenoti",
        "Meta Pixel",
        "A2P 10DLC"
      ]
    },
    {
      "client": "Harvest AF",
      "category": "GHL · Funnels · Automation",
      "subtitle": "Financial consulting · Legacy Builders Collective",
      "headline": "Quiz funnel, intake system & automation",
      "description": "Built the \"2026 Tax & Family Wealth Check\" quiz funnel, a multi-screen HTML build with tag tracking feeding straight into GHL. Developed a custom \"Roadmap Intake\" form with inbound webhook submission, email/SMS nurture sequences, a vanilla HTML/JS community dashboard, GHL AI Studio automations and the full harvestaf.net landing page.",
      "tags": [
        "GoHighLevel",
        "HTML/JS",
        "Webhooks",
        "Email/SMS",
        "AI Studio"
      ]
    },
    {
      "client": "Raise AI",
      "category": "Onboarding · CRM",
      "subtitle": "Client onboarding systems",
      "headline": "Onboarding & CRM build-out",
      "description": "Ten months running client onboarding and GoHighLevel setup: sub-account builds, pipelines and the workflows that carry a new client from signup to active.",
      "tags": [
        "GoHighLevel",
        "Onboarding",
        "Pipelines"
      ]
    },
    {
      "client": "Roxell Richards Law",
      "category": "Law firm · GHL tech",
      "subtitle": "CRM & tech systems",
      "headline": "GoHighLevel systems for a law practice",
      "description": "On-call tech specialist across fourteen months: intake automation, CRM upkeep and the integrations that keep case enquiries from slipping between tools.",
      "tags": [
        "GoHighLevel",
        "Intake automation",
        "Integrations"
      ]
    }
  ],
  "automations": [
    {
      "platform": "ghl",
      "title": "1 to 10 Days Call Route",
      "description": "Ten sequential call attempts, each day its own branch. Contact-changed triggers count the attempts, a tag check routes booked, no-show and not-interested outcomes, and every branch loops back into manual-call assignment and opportunity updates.",
      "image": "img-07.jpg",
      "tags": [
        "Power dialer",
        "Tag routing"
      ]
    },
    {
      "platform": "ghl",
      "title": "Pre-Booking Follow-Up",
      "description": "Eight parallel follow-up tracks split by tag condition, each running its own wait, email and SMS cadence before rejoining, so a lead in any segment gets a sequence written for that segment.",
      "image": "img-08.jpg",
      "tags": [
        "Email & SMS",
        "Segmentation"
      ]
    },
    {
      "platform": "ghl",
      "title": "Appointment Booked: Nurture & Reminders",
      "description": "The post-booking lifecycle: confirmation, nurture and reminder steps fanning into ten condition branches, so the messaging matches the appointment type and where the lead came from.",
      "image": "img-09.jpg",
      "tags": [
        "Reminders",
        "Lifecycle"
      ]
    },
    {
      "platform": "ghl",
      "title": "Instagram Lead Routing",
      "description": "An inbound custom webhook tags the contact, then a per-weekday business-hours check decides where the conversation goes. Outside hours it hands off to Conversation AI; unmatched cases fire a Slack notification.",
      "image": "img-10.jpg",
      "tags": [
        "Webhook",
        "Conversation AI",
        "Slack"
      ]
    },
    {
      "platform": "ghl",
      "title": "Lead Status → Update Pipeline",
      "description": "Six lead-status triggers each look up the opportunity, then move the pipeline stage or create the opportunity when none is found, with tag checks and assigned-user logic deciding the stage.",
      "image": "img-11.jpg",
      "tags": [
        "Opportunities",
        "Pipeline logic"
      ]
    },
    {
      "platform": "ghl",
      "title": "Lead Status → Slack & Sheets",
      "description": "Status changes route to the right Slack channel, inbound SMS replies are parsed for reschedule and cancel keywords, and each outcome writes a row to a spreadsheet.",
      "image": "img-12.jpg",
      "tags": [
        "Slack",
        "Google Sheets",
        "SMS parsing"
      ]
    },
    {
      "platform": "ghl",
      "title": "AI Voice → Conversational AI Handoff",
      "description": "An AI Voice Agent answers every inbound inquiry, an AI classification step reads how the call went and routes it into the matching branch, then Conversational AI sends the SMS and email that fit. Running live inside a client's GHL account.",
      "image": "img-13.jpg",
      "tags": [
        "AI Voice Agent",
        "Conversational AI",
        "SMS/Email"
      ]
    },
    {
      "platform": "zapier",
      "title": "Stripe Payments into Slack & GHL",
      "description": "Every new Stripe payment is logged across three Google Sheets tabs, announced in two Slack channels, and created or updated as a contact in GHL. A filter checks the purchase before tagging the buyer in Kit.",
      "image": "img-14.jpg",
      "tags": [
        "Stripe",
        "Sheets",
        "Slack",
        "LeadConnector",
        "Kit"
      ]
    },
    {
      "platform": "zapier",
      "title": "Whop Payments into Slack & GHL",
      "description": "The same sales pipeline for purchases made through Whop: rows written to Sheets, team notified in Slack, contact synced to GHL, and a filtered Kit tag for follow-up.",
      "image": "img-15.jpg",
      "tags": [
        "Whop",
        "Sheets",
        "Slack",
        "Kit"
      ]
    },
    {
      "platform": "zapier",
      "title": "Typeform into GHL Triple Play",
      "description": "A new Typeform application adds the lead to a Kit nurture sequence and creates or updates an opportunity in the GHL pipeline from a single form submission.",
      "image": "img-16.jpg",
      "tags": [
        "Typeform",
        "Kit",
        "LeadConnector"
      ]
    },
    {
      "platform": "zapier",
      "title": "Skool Membership Alerts",
      "description": "Membership question answers from new Skool community joiners are posted straight to Slack so the team can review and approve them quickly.",
      "image": "img-17.jpg",
      "tags": [
        "Skool",
        "Slack"
      ]
    },
    {
      "platform": "zapier",
      "title": "The Full Zap Library",
      "description": "Twenty-plus live Zaps: Calendly bookings into GHL, Stripe and UTM sources into Sheets for attribution, a webhook driving webinar automations, Typeform-to-Slack alerts and GHL-to-Kit blueprints.",
      "image": "img-18.jpg",
      "extraImage": "img-19.jpg",
      "tags": [
        "Calendly",
        "Webhooks",
        "UTM tracking"
      ]
    }
  ],
  "sites": [
    {
      "name": "GHL Funnel Preview",
      "category": "GoHighLevel funnel",
      "url": "https://sites.leadconnectorhq.com/preview/GS0c7aKXxjlXJYwDyegP"
    },
    {
      "name": "Future At Home Care",
      "category": "Home care",
      "url": "https://futureathomecare.net/home-page"
    },
    {
      "name": "Excelora",
      "category": "Maths tutoring",
      "url": "https://excelora.co.uk/"
    },
    {
      "name": "Lyceum Tutors",
      "category": "Psychology tutoring",
      "url": "https://lyceumtutors.co.uk/home-page"
    },
    {
      "name": "Lambda Tuition",
      "category": "Computer science tutoring",
      "url": "https://go.lambdatuition.com/home-page"
    },
    {
      "name": "Provider Man Plan",
      "category": "Website",
      "url": "https://providermanplan.com/"
    },
    {
      "name": "Sweet2Elite",
      "category": "Website",
      "url": "https://www.sweet2elite.com/"
    },
    {
      "name": "X Virtual Assistants",
      "category": "Website",
      "url": "https://xvirtualassistants.com/"
    },
    {
      "name": "Kelly Family Agency",
      "category": "Insurance agency",
      "url": "https://kellyfamilyagency.com/"
    },
    {
      "name": "Allbright Start",
      "category": "Website",
      "url": "https://allbrightstart.com/home-page"
    },
    {
      "name": "Excel English",
      "category": "English tutoring",
      "url": "https://excelmeenglish.com/home-page"
    },
    {
      "name": "Ethos Learning",
      "category": "Science tutoring",
      "url": "https://ethoslearning.co/home-page"
    },
    {
      "name": "K8 Creative",
      "category": "Drama & LAMDA tutoring",
      "url": "https://go.k8creative.co.uk/home-page"
    },
    {
      "name": "Rise Tutoring",
      "category": "SATs & 11+ tutoring",
      "url": "https://rise-tutoring.co.uk/home-page"
    },
    {
      "name": "The Italian Way by Aurora",
      "category": "Language lead magnet",
      "url": "https://theitalianwaybyaurora.com/lead-magnet"
    },
    {
      "name": "Tang Tutoring",
      "category": "GCSE, A-Level & UCAT",
      "url": "https://tangtutoring.co.uk/home-page"
    }
  ],
  "library": [
    {
      "image": "img-02.jpg",
      "caption": "Coaching funnels, decks and presenters"
    },
    {
      "image": "img-03.jpg",
      "caption": "Pitch decks, landing pages and registration funnels"
    },
    {
      "image": "img-04.jpg",
      "caption": "Blueprints, funnels and member hubs"
    },
    {
      "image": "img-05.jpg",
      "caption": "Athlete systems, audits and dashboards"
    },
    {
      "image": "img-06.jpg",
      "caption": "E-commerce stores, brand sites and webinar pages"
    }
  ],
  "lovableBuilds": [
    "Signal System Deck",
    "Traffic Light Presenter",
    "Signal Funnel",
    "Zacc Funnel Steps",
    "Athlete Reset System",
    "Next Chapter Builder",
    "EBA Pitchdeck",
    "SmartStickx Landing Page",
    "Blueprint Registration Pages",
    "Truck Run System",
    "Flocka Fadez Funnel",
    "Chef Andrea",
    "Capital Ready Funnel",
    "The First Deal Blueprint",
    "Capital Navigator",
    "Athlete OS Discovery",
    "Athlete Hub Connect",
    "Shop Revenue Audit",
    "Operator System Builder",
    "Outdoor Adventures Hub",
    "Sutra Maison Luxury",
    "ROC Pitchdeck",
    "Visual Concept Mockup",
    "AI Scale Webinar",
    "City Line Liquors Online",
    "Jared's Bat Hub"
  ],
  "experiences": [
    {
      "company": "ZZ Med Spa",
      "role": "GHL Expert / Automation Specialist",
      "period": "Apr 2026 — Present",
      "isCurrent": true,
      "summary": "HTML landing pages for laser hair removal campaigns and a consultation booking page. Facebook lead forms flow into the GHL CRM, and uncontacted leads are pushed by webhook into the sales call queue. Meta Pixel, ManyChat comment-to-DM and Reels campaigns.",
      "tags": [
        "GoHighLevel",
        "Meta Ads",
        "Funnels"
      ],
      "caseStudyUrl": "https://drive.google.com/file/d/16F-PssfplhQJb5dy84u_BKpJMU0748hL/view?usp=drive_link"
    },
    {
      "company": "Harvest AF",
      "role": "GHL Expert",
      "period": "Feb 2026 — Present",
      "isCurrent": true,
      "summary": "Ran the full website and business automations in GHL for a tax preparation business: the \"2026 Tax & Family Wealth Check\" quiz funnel, a custom Roadmap Intake form with webhook submission, and email/SMS nurture sequences.",
      "tags": [
        "GoHighLevel",
        "Funnels",
        "Webhooks"
      ],
      "caseStudyUrl": "https://drive.google.com/file/d/1rMqwvc9zvmrdi4sqZe6v9-hm7UqmIv-Q/view?usp=drive_link"
    },
    {
      "company": "Kelly Family Agency",
      "role": "GHL Expert · Project-based",
      "period": "Feb 2026 — Apr 2026",
      "isCurrent": false,
      "summary": "Built the Allstate agency website in Lovable.dev and connected the client journey through GoHighLevel: custom quote forms, Conversation AI booking, a webinar path and on-page SEO.",
      "tags": [
        "GoHighLevel",
        "Funnels",
        "On-page SEO"
      ],
      "caseStudyUrl": "https://drive.google.com/file/d/1p8eM10ZzTdFJIO5wve7j0hlrB64AU8fL/view?usp=drive_link",
      "liveUrl": "https://kellyagency.us/"
    },
    {
      "company": "Roxell Richards Injury Law",
      "role": "GHL Expert / Tech Specialist",
      "period": "Aug 2024 — Oct 2025",
      "isCurrent": false,
      "summary": "Built the firm's website from scratch and reworked intake. Each case type has its own lead form, and signed cases go to monday.com, tagging the attorney who handles them.",
      "tags": [
        "GoHighLevel",
        "Website",
        "Intake automation"
      ],
      "caseStudyUrl": "https://drive.google.com/file/d/1TzFimzUioMurNr0iKw5YsJmKastAltQw/view?usp=sharing"
    },
    {
      "company": "Raise AI",
      "role": "GHL Expert / Onboarding Specialist",
      "period": "Sep 2024 — Jul 2025",
      "isCurrent": false,
      "summary": "Built the GoHighLevel agency for a capital-raising SaaS offer from scratch, including sub-account setup, snapshots, pipelines and client onboarding.",
      "tags": [
        "GoHighLevel",
        "SaaS",
        "Onboarding"
      ],
      "caseStudyUrl": "https://drive.google.com/file/d/1wewFcQSBzNBKQwWXPB2qMMkE1hjU0BH5/view?usp=drive_link"
    },
    {
      "company": "Advanced Agent Marketing",
      "role": "GHL Expert / Onboarding Specialist",
      "period": "Aug 2025 — Nov 2025",
      "isCurrent": false,
      "tags": []
    },
    {
      "company": "DSOA Dance School",
      "role": "GHL Expert / Onboarding Specialist",
      "period": "Feb 2024 — Oct 2024",
      "isCurrent": false,
      "tags": []
    },
    {
      "company": "Graystone Media Trading",
      "role": "Appointment Setter / Marketing VA for GHL",
      "period": "Aug 2023 — Feb 2024",
      "isCurrent": false,
      "tags": []
    },
    {
      "company": "Oscar Realtor LLC",
      "role": "GHL Specialist",
      "period": "Mar 2022 — Jan 2023",
      "isCurrent": false,
      "tags": []
    },
    {
      "company": "Sheik Media",
      "role": "GHL Specialist",
      "period": "Jan 2022 — Nov 2022",
      "isCurrent": false,
      "tags": []
    }
  ],
  "services": [
    {
      "section": "service",
      "title": "AI Automation",
      "body": "AI agents and workflows that run your marketing follow-up on their own.",
      "tags": []
    },
    {
      "section": "service",
      "title": "CRM Systems",
      "body": "GoHighLevel, HubSpot and Salesforce: pipelines, workflows and clean data.",
      "tags": []
    },
    {
      "section": "service",
      "title": "Integrations",
      "body": "Zapier, Make.com, n8n, ManyChat and webhooks connecting your tools.",
      "tags": []
    },
    {
      "section": "service",
      "title": "Funnels & Websites",
      "body": "High-converting funnels and custom-coded pages.",
      "tags": []
    },
    {
      "section": "service",
      "title": "Ads, SEO & Tracking",
      "body": "Meta Ads, Pixel and CAPI setup, on- and off-page SEO.",
      "tags": []
    },
    {
      "section": "service",
      "title": "Front-End Development",
      "body": "HTML, CSS, JavaScript, JSON and Python.",
      "tags": []
    },
    {
      "section": "approach",
      "title": "Systems that don't break at volume",
      "body": "Pipelines, workflows and integrations built to hold up once lead volume increases, not just to work in a demo.",
      "tags": [
        "GoHighLevel",
        "HubSpot",
        "Salesforce",
        "n8n",
        "Make.com",
        "Zapier"
      ]
    },
    {
      "section": "approach",
      "title": "Custom code where off-the-shelf stops",
      "body": "Custom-coded funnel pages, API integrations and automation logic no drag-and-drop builder can handle.",
      "tags": [
        "HTML / CSS / JS",
        "Python",
        "Node.js",
        "SQL"
      ]
    },
    {
      "section": "approach",
      "title": "AI agents that never miss a lead",
      "body": "Voice and chat agents qualify and follow up with every inquiry the moment it comes in.",
      "tags": [
        "AI voice agents",
        "AI chat agents",
        "Auto follow-up"
      ]
    },
    {
      "section": "approach",
      "title": "Support built from support experience",
      "body": "I've onboarded clients onto GoHighLevel, HubSpot and Kartra myself, so I build systems your team can run day to day.",
      "tags": [
        "Client onboarding",
        "CRM training",
        "Ongoing support"
      ]
    },
    {
      "section": "ads",
      "title": "Keyword & competitor research",
      "body": "Google Keyword Planner and Ahrefs for volume, difficulty and gap analysis, benchmarked against direct competitors.",
      "tags": [
        "Keyword Planner",
        "Ahrefs"
      ]
    },
    {
      "section": "ads",
      "title": "On-page SEO",
      "body": "H1–H3 structure, CTR-focused meta titles and descriptions, site speed and a silo structure so authority flows to the pages that need to rank.",
      "tags": [
        "Header tags",
        "Site speed",
        "Silo structure"
      ]
    },
    {
      "section": "ads",
      "title": "Off-page SEO & outreach",
      "body": "Backlinks through targeted outreach, plus community links on Quora and Reddit for early domain trust.",
      "tags": [
        "Backlinks",
        "Quora",
        "Reddit"
      ]
    },
    {
      "section": "ads",
      "title": "Meta campaigns judged on booked calls",
      "body": "The ad gets the click and GHL turns the lead into a booked call, so campaigns are judged on cost per booked call, reading the chain from CPM to CTR, CPL and ROAS.",
      "tags": [
        "CPM",
        "Link CTR",
        "CPL",
        "ROAS"
      ]
    },
    {
      "section": "ads",
      "title": "CAPI & GHL attribution",
      "body": "Conversions API sends GHL conversion data to Meta alongside the pixel, and every lead is tagged with source and UTMs.",
      "tags": [
        "Conversions API",
        "UTM tagging"
      ]
    },
    {
      "section": "ads",
      "title": "Creative & VSLs",
      "body": "Campaign graphics and carousels in Canva, VSL edits and short-form cuts in CapCut, so ads, pages and follow-up look like one brand.",
      "tags": [
        "Canva",
        "CapCut",
        "VSLs"
      ]
    }
  ],
  "toolkit": [
    {
      "name": "CRM & automation",
      "tools": [
        "GoHighLevel",
        "n8n",
        "Make.com",
        "Zapier",
        "ManyChat",
        "HubSpot",
        "Salesforce",
        "ClickFunnels",
        "Mailchimp"
      ]
    },
    {
      "name": "Code",
      "tools": [
        "HTML",
        "CSS",
        "JavaScript",
        "JSON",
        "Python",
        "Node.js",
        "SQL"
      ]
    },
    {
      "name": "Ads & SEO",
      "tools": [
        "Meta Ads",
        "Meta Business Suite",
        "Facebook Ads Manager",
        "Ahrefs",
        "Google Keyword Planner",
        "SiteGround",
        "SEO outreach"
      ]
    },
    {
      "name": "Sales & commerce",
      "tools": [
        "Apollo.io",
        "LinkedIn Sales Navigator",
        "Shopify",
        "Gorgias"
      ]
    },
    {
      "name": "Creative",
      "tools": [
        "Canva",
        "CapCut",
        "HeyGen",
        "Higgsfield"
      ]
    },
    {
      "name": "Team & ops",
      "tools": [
        "ClickUp",
        "Asana",
        "Trello",
        "Slack",
        "Google Suite"
      ]
    }
  ],
  "credentials": [
    {
      "title": "BSBA, Business Management",
      "detail": "University of the East",
      "period": "2009–2013",
      "shortLabel": "University of the East · 2009–2013"
    },
    {
      "title": "GoHighLevel In-Depth Course",
      "detail": "Platform certification training",
      "period": "April – May 2021",
      "shortLabel": "April – May 2021"
    },
    {
      "title": "n8n Automation System Tool",
      "detail": "In-depth course",
      "period": "2024–2025",
      "shortLabel": "In-depth course · 2024–2025"
    }
  ],
  "webBuilds": [
    {
      "name": "Buildison",
      "kind": "Website · React · Supabase",
      "headline": "Marketing automation site for Buildison Agency",
      "description": "A standalone site for an all-in-one marketing CRM: animated hero and stats, feature sections with live product previews, tiered pricing with an annual/monthly toggle and a chat widget. Code on GitHub, data in Supabase, auto-deployed on Vercel.",
      "tags": [
        "React",
        "Supabase",
        "GitHub",
        "Vercel"
      ],
      "coverImage": "buildison.jpg",
      "coverCaption": "Buildison Agency home page",
      "liveUrl": "https://buildison-react.vercel.app/"
    },
    {
      "name": "Pulse",
      "kind": "Mobile app · Clickable prototype",
      "headline": "The owner's app for a service-business website",
      "description": "A companion app that shows a business owner what their website is doing: conversion rate, new leads with one-tap call, text and email, the day's bookings and Stripe payments. Try it: switch tabs, change the date range, filter and act on leads, pick a booking day, tap the revenue bars. Demo data for a fictional med spa.",
      "tags": [
        "Mobile UI",
        "Leads",
        "Bookings",
        "Stripe payments"
      ],
      "demo": "pulse"
    }
  ]
};
