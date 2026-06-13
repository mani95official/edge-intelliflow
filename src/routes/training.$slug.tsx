import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, Award, BookOpen, Layers, Users, PhoneCall, Check } from "lucide-react";
import { TrainingEnquiryForm } from "@/components/training-enquiry-form";

const trainingCourses = {
  "esp32-programming": {
    slug: "esp32-programming",
    title: "Production-Grade ESP32 Programming & Firmware Engineering",
    subtitle: "Master Wi-Fi connectivity, Bluetooth Low Energy, RTOS primitives, OTA updates, and power optimization for scalable IoT products.",
    description: "A comprehensive hands-on program designed for firmware developers, hardware engineers, and builders looking to transition from basic Arduino code to professional, robust, and secure ESP-IDF/C++ codebases.",
    duration: "4 Weeks / 32 Hours",
    credential: "Certificate of Course Completion",
    features: [
      { title: "Direct ESP-IDF & FreeRTOS API programming", desc: "Write low-overhead, multi-tasking C++ application code directly using the official Espressif IoT Development Framework." },
      { title: "Secure Over-The-Air (OTA) Updates", desc: "Build secure firmware rollouts incorporating digital signatures, fallback partition tables, and integrity checking." },
      { title: "Ultra-Low Power Optimization", desc: "Understand sleep modes (light/deep/hibernation), wake stubs, and how to program the Ultra Low Power (ULP) co-processor." },
      { title: "Production Security Practices", desc: "Configure NVS encryption, Flash encryption, Secure Boot v2, and secure HTTPS socket connections." }
    ],
    audience: "Firmware Engineers, Hardware Designers, IoT Developers, and Engineering Students with basic C/C++ knowledge.",
    syllabus: [
      {
        module: "Module 1: Architecture & Foundations",
        topics: [
          "ESP32 hardware blocks & dual-core Xtensa microcontroller structure",
          "Bootloader phase, custom partition tables, and memory mapping (IRAM/DRAM/Flash)",
          "Setting up the ESP-IDF toolchain & project layout configurations",
          "GPIOs, hardware timers, and basic peripheral drivers (ADC, DAC, PWM)"
        ]
      },
      {
        module: "Module 2: FreeRTOS Core Primitives",
        topics: [
          "Multitasking: Task priority, stack sizes, and core pinning (Core 0 vs Core 1)",
          "Thread communication: Event loops, FreeRTOS queues, and ring buffers",
          "Synchronization: Binary semaphores, counting semaphores, and mutexes",
          "Dealing with priority inversion, watchdog timers, and task starvation"
        ]
      },
      {
        module: "Module 3: Wi-Fi, BLE, and Cloud Protocols",
        topics: [
          "Configuring station (STA) and access point (AP) modes with auto-reconnection",
          "MQTT clients, HTTP REST clients, and secure WebSocket sockets",
          "GATT Server design, BLE advertising packets, services, and characteristics",
          "Securing data transit using SSL/TLS handshake client certificates"
        ]
      },
      {
        module: "Module 4: Field Operations & Advanced Topics",
        topics: [
          "Non-Volatile Storage (NVS) structure, custom FATFS filesystems, and partitions",
          "Designing robust OTA update systems with custom backend server checking",
          "Using core dumps, debuggers (OpenOCD), and firmware logging macros",
          "Power profiling: Deep sleep current optimization, timer wakeups, and GPIO wakeups"
        ]
      }
    ]
  },
  "embedded-systems": {
    slug: "embedded-systems",
    title: "Professional Embedded Systems & RTOS Firmware Engineering",
    subtitle: "Bridge the gap between bare-metal firmware and multi-threaded, real-time operating systems using modern STM32/ARM architectures.",
    description: "Learn the core paradigms of real-time embedded systems, sensor driver development, interrupt handling, custom memory management, and debugging embedded targets using professional logic analyzers and oscilloscopes.",
    duration: "6 Weeks / 48 Hours",
    credential: "Certificate of Course Completion",
    features: [
      { title: "ARM Cortex-M Hardware Foundations", desc: "Understand register layouts, NVIC structure, memory alignment, and boot configurations of STM32 microcontrollers." },
      { title: "Low-Level Peripheral Drivers", desc: "Implement custom I2C, SPI, and UART drivers using polling, interrupts, and DMA (Direct Memory Access)." },
      { title: "Professional Hardware Debugging", desc: "Utilize logic analyzers, SWD/JTAG debuggers, stack analysis, and register-level breakpoints." },
      { title: "RTOS Architecture Patterns", desc: "Learn how to structure reliable multi-threaded firmware, manage queues, avoid race conditions, and profile memory." }
    ],
    audience: "Embedded Engineers, Electronics/Communication Graduates, and Firmware Professionals seeking deeper RTOS & ARM Cortex mastery.",
    syllabus: [
      {
        module: "Module 1: ARM Cortex-M Architecture",
        topics: [
          "ARM registers, execution modes (Thread vs Handler), and stack pointers (MSP/PSP)",
          "Memory map: Flash, SRAM, peripheral registers, and bit banding",
          "System tick timer, vector tables, and NVIC interrupt prioritization",
          "Linker scripts and startup assembly files breakdown"
        ]
      },
      {
        module: "Module 2: Peripherals, Interrupts & DMA",
        topics: [
          "GPIO configurations: Pull-up/down, open-drain, and push-pull configurations",
          "Interrupt service routines (ISRs) and volatile keyword constraints",
          "I2C and SPI protocol specifications, handshakes, and register sequencing",
          "DMA concepts: Channel allocation, stream configurations, and circular buffering"
        ]
      },
      {
        module: "Module 3: Real-Time Operating Systems (RTOS)",
        topics: [
          "RTOS scheduler internals, context switching mechanics, and task states",
          "Task creation, priority schemes, and time slicing behavior",
          "Inter-task communication using event groups, binary semaphores, and queues",
          "Detecting memory leaks, buffer overflows, and diagnosing hard faults"
        ]
      },
      {
        module: "Module 4: Firmware Reliability & Embedded CI/CD",
        topics: [
          "Writing hardware abstraction layers (HAL) vs direct register access (LL)",
          "HIL (Hardware-In-The-Loop) testing frameworks and hardware stubbing",
          "Implementing watchdogs, safe failure states, and flash bootloaders",
          "Profiling flash size, RAM footprint, and battery runtime estimations"
        ]
      }
    ]
  },
  "edge-ai-tinyml": {
    slug: "edge-ai-tinyml",
    title: "Edge AI & TinyML Application Development",
    subtitle: "Train, optimize, quantize, and deploy deep learning models directly onto resource-constrained microcontrollers.",
    description: "Master the end-to-end pipeline of machine learning on the edge. Gather sensor data, build models in TensorFlow/PyTorch, quantize to INT8, and run inference locally on ARM Cortex-M or ESP32 cores.",
    duration: "5 Weeks / 40 Hours",
    credential: "Certificate of TinyML Specialty",
    features: [
      { title: "Data Collection Pipelines", desc: "Build physical data collection routines from accelerometers, gyroscopes, and microphone arrays directly to training servers." },
      { title: "Model Optimization & Quantization", desc: "Use post-training quantization (PTQ) to convert weights to INT8, saving up to 75% flash space while retaining >95% accuracy." },
      { title: "Embedded Inference Frameworks", desc: "Build applications using TensorFlow Lite for Microcontrollers (TFLM) and Edge Impulse pipelines." },
      { title: "Industrial Diagnostics Use Cases", desc: "Deploy classification models for structural vibration analysis, audio classification, and low-power vision." }
    ],
    audience: "Machine Learning Engineers, Embedded Firmware Developers, and R&D Teams building low-power intelligent hardware.",
    syllabus: [
      {
        module: "Module 1: Machine Learning & DSP at the Edge",
        topics: [
          "TinyML overview: Constraints of microcontrollers (kilobytes of RAM & Flash)",
          "Time-series sensor preprocessing: Digital filtering, windowing, and overlap",
          "Audio processing: FFT (Fast Fourier Transform), spectrograms, and MFCC feature extraction",
          "Setting up the Python ML pipeline: Scikit-learn, PyTorch, and TensorFlow"
        ]
      },
      {
        module: "Module 2: Model Training & Optimization",
        topics: [
          "Designing lightweight Neural Network architectures: CNNs, DNNs, and Autoencoders",
          "Model pruning: Eliminating redundant weights to optimize memory footprints",
          "Quantization foundations: Float32 representation vs INT8 fixed-point scaling",
          "Quantization-Aware Training (QAT) vs Post-Training Quantization (PTQ)"
        ]
      },
      {
        module: "Module 3: Deploying to Microcontrollers",
        topics: [
          "TFLite converter tools, FlatBuffers, and exporting C++ byte arrays",
          "TFLM runtime: Allocating tensor arenas, registering operators, and configuring interpreters",
          "Optimizing math kernels using CMSIS-DSP and CMSIS-NN libraries",
          "Profiling RAM utilization, latency cycles, and power consumption of inference loops"
        ]
      },
      {
        module: "Module 4: Practical Edge AI Deployments",
        topics: [
          "Project 1: Real-time keyword spotting (KWS) using microphone sensors",
          "Project 2: Machine vibration predictive maintenance anomaly detection",
          "Project 3: Gesture recognition and motion analytics from IMU data",
          "Deploying and updating models in the field without updating full firmware images"
        ]
      }
    ]
  },
  "aiot-development": {
    slug: "aiot-development",
    title: "Enterprise AIoT Systems Architecting",
    subtitle: "Build complete edge-to-cloud connected systems: from device sensors to cloud message brokers, backend processors, databases, and dashboards.",
    description: "An advanced training program detailing how to design scalable, secure, and resilient Internet of Things systems incorporating AI pipelines at the gateway and cloud.",
    duration: "6 Weeks / 48 Hours",
    credential: "Certificate of AIoT Architect",
    features: [
      { title: "Dual Edge/Cloud Networking", desc: "Implement secure, bidirectional connectivity using MQTT, HTTP/2, WebSockets, and lightweight CoAP." },
      { title: "Enterprise Cloud Platforms", desc: "Setup provisioned device registries, shadow documents, and rule engines on AWS IoT Core / Azure IoT Hub." },
      { title: "Time-Series Data Ingestion", desc: "Scale backends to ingest millions of telemetry messages using TimescaleDB, InfluxDB, and Redis caching." },
      { title: "Real-time Operations Dashboards", desc: "Develop dynamic web portals in React/Next.js featuring live websockets, command execution panels, and geo-tracking." }
    ],
    audience: "Full-Stack Developers, Cloud Architects, IoT Systems Integrators, and Hardware/Firmware Leads.",
    syllabus: [
      {
        module: "Module 1: Connected Devices & Protocols",
        topics: [
          "Edge topologies: Direct cellular connection, gateway nodes, and mesh networking",
          "JSON payload serialization vs compact binary structures (Protobuf, MessagePack)",
          "MQTT specification: QoS levels, keep-alive timers, wildcard topics, and persistent sessions",
          "CoAP (Constrained Application Protocol) and security comparison with HTTPS"
        ]
      },
      {
        module: "Module 2: Cloud Ingestion & Broker Infrastructure",
        topics: [
          "Setting up AWS IoT Core / Azure IoT Hub registries and X.509 client certificate management",
          "Device Shadows / Twins: Syncing state between offline devices and cloud interfaces",
          "Configuring IoT rule engines to route data streams to databases, lambda functions, or brokers",
          "Deploying self-hosted MQTT brokers (Mosquitto/EMQX) using Docker and Linux servers"
        ]
      },
      {
        module: "Module 3: Ingestion pipelines & Timeseries Databases",
        topics: [
          "Writing backend consumer services in Node.js and Python for high-frequency telemetry",
          "Designing database schemas for timeseries optimization (InfluxDB, TimescaleDB, PostgreSQL)",
          "Caching telemetry data with Redis to ensure low latency for web applications",
          "Configuring stream processing tools (Apache Kafka, RabbitMQ) for processing pipelines"
        ]
      },
      {
        module: "Module 4: React Dashboards & Device Control",
        topics: [
          "Building responsive React web dashboards to visualize telemetry data streams in charts",
          "Integrating WebSockets to push live updates directly to users without polling APIs",
          "Executing bidirectional commands: Remote reboot, GPIO configuration, and variable tuning",
          "Alerting pipelines: Integrating rule thresholds with email, Slack, and SMS notification APIs"
        ]
      }
    ]
  },
  "python-for-iot": {
    slug: "python-for-iot",
    title: "Python for IoT, Data Pipelines, & Gateway Development",
    subtitle: "Leverage Python for rapid prototyping, edge gateway scripts, data pipelines, backend APIs, and hardware integration.",
    description: "Master Python's extensive ecosystem to write backend services, build MQTT brokers, process timeseries data, and program Single Board Computers like Raspberry Pi.",
    duration: "4 Weeks / 32 Hours",
    credential: "Certificate of Course Completion",
    features: [
      { title: "MicroPython Hardware Programming", desc: "Write Python scripts directly on microcontrollers to manage hardware peripherals, Wi-Fi connectivity, and low-power sleeps." },
      { title: "Asynchronous Device Scripting", desc: "Deploy Python's asyncio module to query multiple modbus/serial sensors concurrently without thread overhead." },
      { title: "API Ingestion with FastAPI", desc: "Construct REST APIs, handle webhooks, validate payloads using Pydantic, and host real-time server streams." },
      { title: "IoT Data Aggregation pipelines", desc: "Implement Numpy and Pandas scripts to clean, process, and analyze sensor telemetry data streams." }
    ],
    audience: "Software Developers, Data Analysts, and Prototypers looking to utilize Python across the entire IoT stack.",
    syllabus: [
      {
        module: "Module 1: Hardware Access & MicroPython",
        topics: [
          "MicroPython boot process, virtual filesystems, and hardware interfacing (I2C/SPI/GPIO)",
          "Interfacing with environmental sensors, displays, and analog signals in Python",
          "Power management and deep sleep configurations on ESP32 in MicroPython",
          "Setting up the Thonny IDE and remote REPL scripting environments"
        ]
      },
      {
        module: "Module 2: Asynchronous Scripting & Serial Protocols",
        topics: [
          "Understanding asyncio: Coroutines, tasks, event loops, and non-blocking IO",
          "Interfacing with industrial instruments using PySerial and Modbus RTU packages",
          "Writing asynchronous MQTT clients to stream gateway payloads to brokers",
          "Exception handling, automated reconnections, and gateway watchdogs in Python"
        ]
      },
      {
        module: "Module 3: Gateway Services & Local Data Buffering",
        topics: [
          "Gateway software architectures: Buffering telemetry payloads locally during network outages",
          "Implementing lightweight SQLite schemas for edge data logging",
          "Using Python to configure custom routing, network fallbacks, and Wi-Fi portals",
          "Packaging Python gateway services into lightweight Docker containers for edge hardware"
        ]
      },
      {
        module: "Module 4: Ingestion Backends & Analytics",
        topics: [
          "Building telemetry backend servers using FastAPI, Uvicorn, and Pydantic validators",
          "Connecting Python backends to PostgreSQL and InfluxDB time-series databases",
          "Telemetry analysis: Time-series alignment, filtering noise, and basic predictions with Pandas",
          "Automated Python alert scripts: Integrating Twilio API and SMTP mailing services"
        ]
      }
    ]
  },
  "ml-on-microcontrollers": {
    slug: "ml-on-microcontrollers",
    title: "ML on Microcontrollers & Real-Time Anomaly Detection",
    subtitle: "Deploy and debug custom DSP and classical machine learning algorithms directly on bare-metal and RTOS-based microcontrollers.",
    description: "Go beyond deep learning. Learn how to write classical ML algorithms (K-Means, SVM, Random Forest, decision trees) and signal processing code in standard C++ for immediate execution on microcontrollers without heavy dependencies.",
    duration: "4 Weeks / 32 Hours",
    credential: "Certificate of TinyML Specialty",
    features: [
      { title: "Handcrafted C/C++ DSP Filters", desc: "Write low-latency digital signal processing filters (FIR, IIR, Lowpass) without bulky third-party dependencies." },
      { title: "Classical ML on Microcontrollers", desc: "Train Decision Trees, Random Forests, and Support Vector Machines (SVMs) in Python, and convert them to bare-metal C header files." },
      { title: "Real-time Classification Loops", desc: "Embed inference calls within hardware timer interrupts or DMA buffer callbacks to process high-frequency sensor streams." },
      { title: "Footprint Profiling & Optimization", desc: "Profile model execution cycles, calculate RAM overlays, and analyze execution latency for strict real-time deadlines." }
    ],
    audience: "Firmware Architects, Signal Processing Developers, and ML Engineers aiming to optimize inference on low-power hardware.",
    syllabus: [
      {
        module: "Module 1: DSP & ADC Sampling Foundations",
        topics: [
          "ADC configuration, sampling rates, Nyquist frequency limits, and hardware buffers",
          "Digital filter design: Implementing FIR and IIR filters in standard C++ code",
          "Fast Fourier Transform (FFT) implementations and spectral frequency analysis",
          "Windowing algorithms (Hamming, Hanning) and signal feature extraction"
        ]
      },
      {
        module: "Module 2: Classical Machine Learning Conversion",
        topics: [
          "Feature selection for microcontrollers: Minimizing floating-point math overhead",
          "Training classical ML classifiers (Decision Trees, Naive Bayes, SVMs) in Scikit-Learn",
          "Using Python micro-compiler scripts to auto-generate plain C structures from trained models",
          "Deploying and evaluating K-Means clustering for real-time unsupervised anomaly detection"
        ]
      },
      {
        module: "Module 3: Interrupts & Execution Optimization",
        topics: [
          "Triggering classification cycles using DMA double buffering",
          "Pinning calculations to specific processor cores, configuring compiler optimization flags (-O3)",
          "Profiling clock cycles using hardware debug pins, timers, and oscilloscope captures",
          "Managing task scheduling and resource allocation within RTOS environments"
        ]
      },
      {
        module: "Module 4: Real-World Case Studies",
        topics: [
          "Case Study 1: Real-time electrocardiogram (ECG) heartbeat anomaly detection",
          "Case Study 2: Industrial rotating motor vibration diagnostics and predictive warning triggers",
          "Case Study 3: Touch capacitive sensor swipe gesture detection and pattern classification",
          "Model updating: Over-The-Air parameter tuning without firmware re-compilation"
        ]
      }
    ]
  }
};

export const Route = createFileRoute("/training/$slug")({
  loader: ({ params }) => {
    const data = trainingCourses[params.slug as keyof typeof trainingCourses];
    if (!data) {
      throw notFound();
    }
    return data;
  },
  head: ({ loaderData }) => {
    const SITE_URL = "https://astrointelli.com";
    return {
      meta: [
        { title: `${loaderData.title} — AstroIntelli Training` },
        { name: "description", content: loaderData.subtitle },
        { property: "og:title", content: `${loaderData.title} — AstroIntelli Training` },
        { property: "og:description", content: loaderData.subtitle },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${SITE_URL}/training/${loaderData.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${loaderData.title} — AstroIntelli Training` },
        { name: "twitter:description", content: loaderData.subtitle },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/training/${loaderData.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": loaderData.title,
            "description": loaderData.description,
            "provider": {
              "@type": "EducationalOrganization",
              "name": "AstroIntelli",
              "url": SITE_URL
            },
            "educationalCredentialAwarded": loaderData.credential,
            "offers": {
              "@type": "Offer",
              "category": "Paid/Corporate",
              "priceCurrency": "INR"
            }
          }),
        },
      ],
    };
  },
  component: TrainingDetailComponent,
});

function TrainingDetailComponent() {
  const course = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Breadcrumb & Back Link */}
      <div className="border-b border-border bg-secondary/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link
            to="/training"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 text-brand" />
            Back to training
          </Link>
          <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            Syllabus / {course.slug}
          </div>
        </div>
      </div>

      {/* Hero Landing Page Section */}
      <section className="relative border-b border-border bg-gradient-to-b from-secondary/20 to-background py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-5 md:px-8 text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-mono text-muted-foreground uppercase tracking-widest">
            <span className="inline-block size-2 rounded-full bg-brand animate-pulse" />
            {course.duration}
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl text-foreground">
            {course.title}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-4xl">
            {course.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-muted-foreground font-mono">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-brand" />
              <span>{course.duration} Hands-on Labs</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="size-4 text-brand" />
              <span>{course.credential} Awarded</span>
            </div>
          </div>
        </div>
      </section>

      {/* Landing Page Content Grid */}
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          
          {/* Main Syllabus & Covering Areas (Left 7 Columns) */}
          <main className="lg:col-span-8 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <BookOpen className="size-5 text-brand" />
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Training Covering Area
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-base">
                {course.description}
              </p>
            </div>

            {/* Modules / Syllabus Accordion List */}
            <div className="space-y-6">
              {course.syllabus.map((module, mIdx) => (
                <div 
                  key={module.module} 
                  className="rounded-lg border border-border bg-secondary/10 p-6 md:p-8 space-y-4"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs text-brand bg-brand/10 px-2.5 py-1 rounded">
                      0{mIdx + 1}
                    </span>
                    <h3 className="text-xl font-semibold tracking-tight text-foreground">
                      {module.module}
                    </h3>
                  </div>
                  <ul className="grid gap-3 pl-10 text-sm md:text-base text-muted-foreground">
                    {module.topics.map((topic, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-3">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand/60" />
                        <span className="leading-snug">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </main>

          {/* Features, Meta & Sidebar CTA (Right 4 Columns) */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24 h-fit">
            
            {/* Highlights Box */}
            <div className="rounded-lg border border-border p-6 md:p-8 space-y-6 bg-background shadow-sm">
              <div className="flex items-center gap-2">
                <Layers className="size-5 text-brand" />
                <h3 className="text-lg font-semibold text-foreground uppercase tracking-wider font-mono text-xs">
                  Course Highlights
                </h3>
              </div>
              <ul className="space-y-5 text-sm">
                {course.features.map((feature, fIdx) => (
                  <li key={fIdx} className="space-y-1">
                    <div className="flex items-start gap-2 font-semibold text-foreground">
                      <Check className="size-4 shrink-0 mt-0.5 text-brand" />
                      <span>{feature.title}</span>
                    </div>
                    <p className="pl-6 text-muted-foreground text-xs leading-relaxed">
                      {feature.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Audience Profile */}
            <div className="rounded-lg border border-border p-6 bg-secondary/20 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                <Users className="size-4 text-brand" />
                <span>Audience Profile</span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed font-light">
                {course.audience}
              </p>
            </div>

            {/* Booking Callout Form */}
            <TrainingEnquiryForm courseTitle={course.title} courseSlug={course.slug} />

          </aside>
        </div>
      </div>
    </div>
  );
}
