export interface SimulationStep {
  title: string;
  description: string;
  result: string;
}

export interface Simulation {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  steps: SimulationStep[];
}

export const simulations: Simulation[] = [
  {
    id: "complaint-intelligence",
    title: "Complaint Intelligence",
    description: "Automatically understand what customers are saying, how urgent it is, and who should handle it — before anyone reads the ticket.",
    bullets: [
      "Understands intent across dozens of categories",
      "Prioritizes by urgency so nothing falls through",
      "Routes to the right team instantly",
    ],
    steps: [
      {
        title: "A Complaint Arrives",
        description: "A customer submits a complaint through your CRM, email, or helpdesk. The system picks it up in real time.",
        result: "Complaint received and ready for analysis.",
      },
      {
        title: "The System Reads & Understands It",
        description: "The complaint is analyzed for intent, product references, and key details — understanding what the customer actually needs, even with typos or vague language.",
        result: "Category identified with supporting context extracted.",
      },
      {
        title: "Cross-Referenced Against History",
        description: "Similar past complaints are retrieved and compared to strengthen understanding and catch edge cases that simple rules would miss.",
        result: "Historical context applied — classification confirmed.",
      },
      {
        title: "Urgency Scored & Routed",
        description: "Each complaint is scored for urgency and automatically sent to the right department — no manual triage needed.",
        result: "Routed to the correct team with priority level assigned.",
      },
      {
        title: "Dashboard Updates Instantly",
        description: "Live dashboards reflect the latest trends, department workloads, and resolution status — replacing manual reporting entirely.",
        result: "Real-time visibility across all locations and teams.",
      },
    ],
  },
  {
    id: "support-copilot",
    title: "Support Triage Copilot",
    description: "Give your support team an AI assistant that reads tickets, suggests responses, and handles the busywork — so agents focus on resolution.",
    bullets: [
      "Classifies what the customer needs automatically",
      "Drafts a response using your knowledge base",
      "Updates your CRM and routes to the right team",
    ],
    steps: [
      {
        title: "Ticket Comes In",
        description: "A customer reaches out via email, chat, or your support platform. The system captures and processes it immediately.",
        result: "Ticket received and parsed instantly.",
      },
      {
        title: "Intent & Urgency Identified",
        description: "AI determines what the customer needs and how urgent it is — billing issue, product question, complaint, or something else entirely.",
        result: "Intent classified with urgency level assigned.",
      },
      {
        title: "Response Drafted Automatically",
        description: "A suggested reply is generated from your knowledge base and brand guidelines, ready for an agent to review and send.",
        result: "Draft response ready with relevant sources attached.",
      },
      {
        title: "Routed & CRM Updated",
        description: "The ticket goes to the right team. Your CRM is updated with classification data and response timelines — no manual entry.",
        result: "Team assigned, CRM fields populated, timeline set.",
      },
      {
        title: "Sensitive Data Protected",
        description: "Personal information is automatically redacted before storage. Every action is logged for compliance.",
        result: "PII handled and full audit trail recorded.",
      },
    ],
  },
  {
    id: "payment-automation",
    title: "Payment Automation",
    description: "Take payment processing from manual PDF handling to fully automated — extract, validate, approve, and submit without the bottlenecks.",
    bullets: [
      "Reads and extracts data from payment documents",
      "Validates against your business rules automatically",
      "Routes approvals based on amount thresholds",
    ],
    steps: [
      {
        title: "Payment Document Received",
        description: "A payment PDF arrives via email or upload. The system identifies the document type and extracts all relevant fields.",
        result: "Document processed with key fields extracted.",
      },
      {
        title: "Validated Against Your Rules",
        description: "Extracted data is checked for duplicates, verified against your approved vendor list, and matched to purchase orders.",
        result: "Validation complete — no issues detected.",
      },
      {
        title: "Routed for Approval",
        description: "Payments are automatically sent to the right approver based on amount — small payments go fast, large ones get proper review.",
        result: "Approval request sent with full context attached.",
      },
      {
        title: "Submitted to Your Bank",
        description: "Once approved, the payment is submitted securely to your banking platform with all required authentication.",
        result: "Payment submitted and confirmation received.",
      },
      {
        title: "Logged & Team Notified",
        description: "Every step is logged for audit. Your treasury team gets a notification confirming the payment was processed.",
        result: "Full audit trail captured, team notified.",
      },
    ],
  },
  {
    id: "doc-automation",
    title: "Document Processing",
    description: "Stop manually entering data from invoices, contracts, and forms. Let AI extract, validate, and push it where it needs to go.",
    bullets: [
      "Extracts structured data from any document type",
      "Checks against your business rules and flags exceptions",
      "Pushes clean data into your systems automatically",
    ],
    steps: [
      {
        title: "Document Uploaded",
        description: "An invoice, contract, or form is uploaded or arrives via email. The system identifies what kind of document it is.",
        result: "Document classified and ready for extraction.",
      },
      {
        title: "Key Data Extracted",
        description: "AI reads the document and pulls out structured data — names, amounts, dates, line items — with confidence scores for each field.",
        result: "All relevant fields extracted and structured.",
      },
      {
        title: "Checked Against Your Rules",
        description: "The extracted data is validated — approval thresholds, vendor verification, and matching against existing records.",
        result: "Validation passed with one item flagged for review.",
      },
      {
        title: "Exceptions Handled Cleanly",
        description: "Anything that doesn't pass validation is sent to the right person with full context and a suggested resolution.",
        result: "Exception routed with recommended action.",
      },
      {
        title: "Data Flows Into Your Systems",
        description: "Clean, validated data is pushed into your ERP, accounting software, or CRM — with notifications sent to relevant teams.",
        result: "Systems updated, team notified, workflow complete.",
      },
    ],
  },
];
