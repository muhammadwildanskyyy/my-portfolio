import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Muhammad Wildan",
  lastName: "Yulio Ardana",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Software Engginer",
  avatar: "/images/avatar.jpg",
  email: "muhammad.wildanya@gmail.com",
  location: "Asia/Jakarta", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Bahasa"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName} Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the
      intersection of creativity and engineering.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/muhammadwildanskyyy",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/muhammadwildanyulioardana/",
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/ardnskyyy/",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name} Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Innovation Architects, Powered by Logic and Code.</>,
  featured: {
    display: true,
    title: (
      <>
        Recent project: <strong className="ml-4">Skyyy</strong>
      </>
    ),
    href: "/work",
  },
  subline: (
    <>
      Hi! I am Ardan, a Software Engineer dedicated to building and designing
      efficient and scalable software systems, transforming complex ideas into
      working digital solutions.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: true,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        As a full-stack Software Engineer with a focus on the backend, I design
        the foundation of systems that are not only robust, but also
        revolutionary. With expertise in Machine Learning, I turn data into
        intelligence, pushing the boundaries of technology to create
        transformative solutions.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "PT Arka Data Pratama",
        timeframe: "August 2025 - November 2025",
        role: "Frontend Developer Intern",
        achievements: [
          <>
            <strong>Frontend & UI Development:</strong> Developed an interactive and responsive user interface for the Real-time Monitoring Dashboard and Intelligent Drilling Dashboard projects using React.js with CSS Grid-based layout implementations.
          </>,
          <>
            <strong>High-Performance Data Visualization:</strong> Resolved performance bottlenecks in large-scale data rendering by refactoring chart visualizations from ECharts (SVG-based) to D3.js using an HTML Canvas approach. This optimization enabled the dashboard to process and render tens of thousands of real-time data points without lag.
          </>,
          <>
            <strong>Advanced Chart Interactivity:</strong> Designed and implemented advanced interactivity across various chart types (such as Scatter, Line, and Combo Charts) using D3.js, including Zoom, Pan, Tooltip, and Brush selection features.
          </>,
          <>
            <strong>Complex Data Synchronization:</strong> Built cross-chart interaction synchronization (Brushing and Linking) in the "Depth-Based Analysis" module, where zoom or pan navigation on one chart is automatically applied to other comparison charts.
          </>,
          <>
            <strong>State Management & Dynamic Filtering:</strong> Managed global application state using the React Context API for multi-well navigation features. Developed a dynamic cascading filter system for granular server data queries using Cube.js integration.
          </>,
          <>
            <strong>Client-Side Data Processing:</strong> Developed raw data import functionality by parsing Excel files directly on the client side using the SheetJS library, complete with a preview table feature before the data is uploaded to the database.
          </>,
          <>
            <strong>Data Export Capabilities:</strong> Implemented filtered JSON data extraction and conversion features to CSV format to facilitate reporting and advanced offline data analysis needs for engineers.
          </>,
        ],
        images: [{
          src: "/images/work/frontend-developer1.jpeg",
          alt: "All Team",
          width: 16,
          height: 9,
        },
        {
          src: "/images/work/frontend-developer2.jpeg",
          alt: "me",
          width: 16,
          height: 9,
        },],
      },
      {
        company: "Dewo Robotic",
        timeframe: "2024 - Present",
        role: "Senior Software Engineer, Wheeled Soccer Robot Division ",
        achievements: [
          <>
            Wheeled Soccer Robots: I'm actively involved in the research and
            development (R&D) of software for wheeled soccer robots, focusing on
            creating intelligent and agile autonomous systems.
          </>,
          <>
            Real-time Communication Architectures: My work includes R&D of
            Real-time Database (RTDB) for robot communication, ensuring seamless
            and immediate data exchange crucial for robot performance.
          </>,
          <>
            Onboard Server Development: I've led the R&D of communication
            servers within the robots, establishing robust internal networks
            that facilitate complex operations and strategic decision-making.
          </>,
          <>
            Advanced Robot Control Systems: A significant part of my expertise
            lies in the R&D of sophisticated robot control systems, enabling
            precise movements and adaptive behaviors in dynamic environments.
          </>,
          <>
            Vision Systems: I specialize in the R&D of vision-based object
            detection for robots, equipping them with the ability to accurately
            perceive and interact with their surroundings.
          </>,
          <>
            Recognized National Achievements: My efforts culminated in securing
            the fourth place in the 2024 Region Indonesian Robot Contest and
            also the fourth place in the 2024 National Indonesian Robot Contest,
            demonstrating a proven track record of competitive success and
            technical excellence.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/work/dewo-robotic1.jpg",
            alt: "All Team",
            width: 16,
            height: 9,
          },
          {
            src: "/images/work/dewo-robotic2.jpg",
            alt: "All Team",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Google Cloud Developer Surabaya",
        timeframe: "",
        role: "Photografer & Videografer ",
        achievements: [
          <>
            I'm responsible for accurately recording and organizing all project
            processes, progress, and outcomes. I ensure all crucial information
            is well-documented for future reference, knowledge sharing, and
            reporting, especially in the context of events and organizational
            activities.
          </>,
          <>
            As a Photographer, I capture pivotal moments and the atmosphere of
            technology seminars and events hosted by the Google Cloud Developer
            Group Surabaya. My goal is to visually represent the learning,
            interactions, and innovations taking place at each event with
            high-quality photographs.
          </>,
          <>
            As a Videographer & Editor, I record and produce dynamic video
            content from the Google Cloud Developer Group Surabaya technology
            seminars and events. I also edit this material into cohesive,
            professional videos, highlighting speakers, participants, and key
            technological insights, for publication across various platforms.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/work/google-cloud1.jpg",
            alt: "All Team",
            width: 16,
            height: 9,
          },
          {
            src: "/images/work/google-cloud1.1.JPG",
            alt: "Doc Team",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Surabaya State University | 2023 - present",
        description: <>informatics engineering</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Languages",
        description: <>JavaScript | TypeScript | Golang | Python | C++</>,
        images: [],
      },
      {
        title: "Frontend Frameworks",
        description: <>React.js | Next.js</>,
        images: [],
      },
      {
        title: "Backend Frameworks",
        description: <>Node.js | Express.js | NestJS | Hapi | Gin Gonic | Go Fiber</>,
        images: [],
      },
      {
        title: "Database & ORM",
        description: <>PostgreSQL | MongoDB | Redis | Prisma | GORM | SQL | NoSQL</>,
        images: [],
      },
      {
        title: "Architecture & DevOps",
        description: <>Docker | Kong API Gateway | Apache Kafka | Git | Jira | Taskfile</>,
        images: [],
      },
      {
        title: "Machine Learning & Services",
        description: <>TensorFlow | OpenCV | Xendit | Cloudinary </>,
        images: [],
      },
    ],
  },
  otherSkill: {
    display: true, // set to false to hide this section
    title: "Other skills",
    skills: [
      {
        title: "Media & Content",
        description: <>Photography | Videography | Editor</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          // {
          //   src: "/images/projects/project-01/cover-02.jpg",
          //   alt: "Project image",
          //   width: 16,
          //   height: 9,
          // },
          // {
          //   src: "/images/projects/project-01/cover-03.jpg",
          //   alt: "Project image",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about Technologi",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
