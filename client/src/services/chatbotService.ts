interface ChatResponse {
  text: string;
  options?: string[];
}

interface Intent {
  patterns: string[];
  responses: ChatResponse[];
}

const intents: Intent[] = [
  {
    patterns: [
      "how to register",
      "registration process",
      "join sdc",
      "how to join",
      "apply",
      "registration steps"
    ],
    responses: [
      {
        text: "The registration process for SDC is simple! Here are the steps:",
        options: [
          "1. Fill out the registration form",
          "2. Submit your application",
          "3. Wait for application review",
          "4. Attend technical interview",
          "5. Complete SDC orientation"
        ]
      }
    ]
  },
  {
    patterns: [
      "requirements",
      "eligibility",
      "who can join",
      "qualifications",
      "criteria"
    ],
    responses: [
      {
        text: "To join SDC, you need:",
        options: [
          "• Be a student of MVJ College of Engineering",
          "• Have interest in software development",
          "• Basic programming knowledge",
          "• Willingness to learn and collaborate"
        ]
      }
    ]
  },
  {
    patterns: [
      "activities",
      "what do you do",
      "club activities",
      "events",
      "programs"
    ],
    responses: [
      {
        text: "SDC offers various exciting activities:",
        options: [
          "• Hands-on coding workshops",
          "• Technical project collaborations",
          "• Industry expert sessions",
          "• Hackathons and coding competitions",
          "• Peer learning programs"
        ]
      }
    ]
  },
  {
    patterns: [
      "timeline",
      "how long",
      "when",
      "duration",
      "process time"
    ],
    responses: [
      {
        text: "Here's our typical registration timeline:",
        options: [
          "• Application review: 3-5 days",
          "• Technical interview scheduling: Within 1 week",
          "• Interview process: 30-45 minutes",
          "• Final decision: Within 2 days",
          "• Orientation: Next scheduled session"
        ]
      }
    ]
  },
  {
    patterns: [
      "benefits",
      "why join",
      "advantages",
      "what will i gain",
      "perks"
    ],
    responses: [
      {
        text: "Joining SDC comes with many benefits:",
        options: [
          "• Hands-on experience with real projects",
          "• Networking with industry professionals",
          "• Enhanced technical skills",
          "• Certificate of membership",
          "• Priority access to workshops and events"
        ]
      }
    ]
  },
  {
    patterns: [
      "contact",
      "help",
      "support",
      "reach out",
      "questions"
    ],
    responses: [
      {
        text: "Need more help? You can:",
        options: [
          "• Email us at sdc@mvjce.edu.in",
          "• Visit the SDC office (Room 401, Block B)",
          "• Contact faculty coordinator",
          "• Check our FAQ section on the website"
        ]
      }
    ]
  },
  {
    patterns: [
      "technical skills",
      "what should i know",
      "required skills",
      "programming knowledge"
    ],
    responses: [
      {
        text: "While we welcome all skill levels, these skills are helpful:",
        options: [
          "• Basic programming concepts",
          "• Any programming language (Python/Java/JavaScript)",
          "• Understanding of web technologies",
          "• Version control basics (Git)",
          "• Problem-solving ability"
        ]
      }
    ]
  }
];

const defaultResponses = [
  {
    text: "I'm not sure I understand. Here are some things you can ask me about:",
    options: [
      "• How to register for SDC",
      "• Requirements to join",
      "• Club activities",
      "• Registration timeline",
      "• Benefits of joining"
    ]
  }
];

function findBestMatch(input: string): ChatResponse {
  const normalizedInput = input.toLowerCase().trim();
  
  // Check each intent for matching patterns
  for (const intent of intents) {
    for (const pattern of intent.patterns) {
      if (normalizedInput.includes(pattern)) {
        return intent.responses[Math.floor(Math.random() * intent.responses.length)];
      }
    }
  }
  
  // If no match is found, return a random default response
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

export function generateResponse(input: string): ChatResponse {
  return findBestMatch(input);
} 