export type Service = {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  items: string[];
};

export const services: Service[] = [
  {
    slug: "embedded-systems",
    number: "01",
    title: "Embedded Systems Development",
    tagline: "From silicon to system",
    description:
      "Design and development of embedded solutions for industrial, healthcare, and consumer applications.",
    items: [
      "ESP32 Development",
      "STM32 Development",
      "Arduino Prototyping",
      "Sensor Integration",
      "Firmware Development",
      "Device Optimization",
    ],
  },
  {
    slug: "edge-ai-tinyml",
    number: "02",
    title: "Edge AI & TinyML Solutions",
    tagline: "Intelligence on a chip",
    description:
      "Deploy machine learning models directly on microcontrollers and edge devices for real-time intelligence.",
    items: [
      "TinyML Development",
      "TensorFlow Lite for Microcontrollers",
      "Edge AI Deployment",
      "Predictive Analytics",
      "Anomaly Detection",
      "Smart Sensor Intelligence",
    ],
  },
  {
    slug: "aiot",
    number: "03",
    title: "AIoT — AI of Things",
    tagline: "Connected. Intelligent. Autonomous.",
    description:
      "Build intelligent connected devices that combine IoT, AI, and cloud technologies into a single platform.",
    items: [
      "Smart Device Development",
      "Remote Monitoring Systems",
      "Predictive Maintenance",
      "Industrial IoT Platforms",
      "Smart Healthcare Devices",
      "Energy Monitoring Systems",
    ],
  },
  {
    slug: "product-development",
    number: "04",
    title: "Product Development & Prototyping",
    tagline: "Idea to working prototype",
    description: "Transform ideas into working products — from concept and validation to MVP.",
    items: [
      "Hardware Prototyping",
      "PCB Design Support",
      "Proof of Concept Development",
      "MVP Development",
      "Product Validation",
      "Technical Consulting",
    ],
  },
  {
    slug: "cloud-backend",
    number: "05",
    title: "Cloud & Backend Development",
    tagline: "Scalable systems for connected products",
    description: "Develop scalable backend systems for connected products and device fleets.",
    items: [
      "Django Development",
      "REST API Development",
      "MQTT Integration",
      "Database Design",
      "Device Management Platforms",
      "Analytics Dashboards",
    ],
  },
  {
    slug: "mobile-web",
    number: "06",
    title: "Mobile & Web Applications",
    tagline: "Control surfaces for smart devices",
    description: "Create modern applications for monitoring and controlling smart devices.",
    items: [
      "Flutter App Development",
      "Android Applications",
      "IoT Dashboards",
      "Real-Time Monitoring Platforms",
      "Reporting & Analytics",
    ],
  },
  {
    slug: "industrial-automation",
    number: "07",
    title: "Industrial Automation",
    tagline: "Operational intelligence",
    description: "Improve operational efficiency through intelligent automation.",
    items: [
      "Machine Monitoring",
      "Predictive Maintenance",
      "Motor Health Analysis",
      "Production Analytics",
      "Condition Monitoring",
      "Asset Tracking",
    ],
  },
  {
    slug: "healthcare",
    number: "08",
    title: "Healthcare Technology",
    tagline: "Care, monitored intelligently",
    description: "Develop innovative healthcare monitoring and automation products.",
    items: [
      "Smart IV Monitoring Systems",
      "Patient Monitoring Devices",
      "Healthcare IoT Solutions",
      "Medical Device Prototyping",
      "Remote Health Monitoring",
    ],
  },
];