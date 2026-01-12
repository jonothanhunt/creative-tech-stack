import { Tool } from "@/lib/db";

export const tools: Tool[] = [
    {
        "name": "Three.js",
        "description": "The standard 3D library for the web, enabling complex 3D scenes and animations via WebGL.",
        "image": "/images/tools/threejs.webp",
        "type": "Library",
        "isOpenSource": true,
        "categories": [
            "Real-time 3D",
            "Creative Coding"
        ],
        "stacks": [
            "WebGL",
            "Web3D"
        ],
        "featured": true,
        "links": [
            {
                "title": "Website",
                "url": "https://threejs.org"
            }
        ]
    },
    {
        "name": "React Three Fiber",
        "description": "A React renderer for Three.js, bringing declarative, component-based 3D development to the React ecosystem.",
        "image": "/images/tools/react-three-fiber.webp",
        "type": "Library",
        "isOpenSource": true,
        "categories": [
            "Real-time 3D",
            "Web Ecosystem"
        ],
        "stacks": [
            "WebGL",
            "React",
            "Web3D"
        ],
        "featured": true,
        "links": [
            {
                "title": "Docs",
                "url": "https://docs.pmnd.rs/react-three-fiber"
            }
        ]
    },
    {
        "name": "Spline",
        "description": "A user-friendly 3D design tool specifically built for the web, allowing for interactive 3D experiences without deep coding.",
        "image": "/images/tools/spline.webp",
        "type": "Tool",
        "categories": [
            "Real-time 3D",
            "Design & Motion"
        ],
        "stacks": [
            "Web3D",
            "No-Code",
            "Interactive"
        ],
        "featured": true,
        "links": [
            {
                "title": "Website",
                "url": "https://spline.design"
            }
        ]
    },
    {
        "name": "Babylon.js",
        "description": "A powerful, open-source 3D engine for the web, known for its performance and extensive feature set including WebGPU support.",
        "image": "/images/tools/babylon-js.webp",
        "type": "Library",
        "isOpenSource": true,
        "categories": [
            "Real-time 3D"
        ],
        "stacks": [
            "WebGL",
            "WebGPU",
            "Game Dev"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://www.babylonjs.com"
            }
        ]
    },
    {
        "name": "p5.js",
        "description": "A JavaScript library for creative coding, making coding accessible for artists, designers, educators, and beginners.",
        "image": "/images/tools/p5-js.webp",
        "type": "Library",
        "isOpenSource": true,
        "categories": [
            "Creative Coding"
        ],
        "stacks": [
            "Creative Coding",
            "Canvas",
            "Education"
        ],
        "featured": true,
        "links": [
            {
                "title": "Website",
                "url": "https://p5js.org"
            }
        ]
    },
    {
        "name": "TouchDesigner",
        "description": "A node-based visual programming language for real-time interactive multimedia content, used widely in installations and live performances.",
        "image": "/images/tools/touchdesigner.webp",
        "type": "Platform",
        "categories": [
            "Creative Coding",
            "Real-time 3D"
        ],
        "stacks": [
            "Visual Programming",
            "Live",
            "Installation"
        ],
        "featured": true,
        "links": [
            {
                "title": "Website",
                "url": "https://derivative.ca"
            }
        ]
    },
    {
        "name": "Processing",
        "description": "A flexible software sketchbook and a language for learning how to code within the context of the visual arts.",
        "image": "/images/tools/processing.webp",
        "type": "Platform",
        "isOpenSource": true,
        "categories": [
            "Creative Coding"
        ],
        "stacks": [
            "Creative Coding",
            "Java",
            "Education"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://processing.org"
            }
        ]
    },
    {
        "name": "ShaderToy",
        "description": "Cross-browser interactive tool for creating and sharing shaders in WebGL, a playground for computer graphics enthusiasts.",
        "image": "/images/tools/shadertoy.webp",
        "type": "Resource",
        "categories": [
            "Creative Coding",
            "Real-time 3D"
        ],
        "stacks": [
            "GLSL",
            "Shaders"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://shadertoy.com"
            }
        ]
    },
    {
        "name": "Runway",
        "description": "A next-generation content creation suite offering advanced AI tools for video editing, generation, and image synthesis.",
        "image": "/images/tools/runway.webp",
        "type": "Tool",
        "categories": [
            "AI & Generative"
        ],
        "stacks": [
            "GenAI",
            "Video",
            "ML"
        ],
        "featured": true,
        "links": [
            {
                "title": "Website",
                "url": "https://runwayml.com"
            }
        ]
    },
    {
        "name": "Midjourney",
        "description": "An independent research lab exploring new mediums of thought and expanding the imaginative powers of the human species via generative AI.",
        "image": "/images/tools/midjourney.webp",
        "type": "Tool",
        "categories": [
            "AI & Generative"
        ],
        "stacks": [
            "GenAI",
            "Image"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://midjourney.com"
            }
        ]
    },
    {
        "name": "Hugging Face",
        "description": "The AI community building the future. The hub for open-source models, datasets, and collaborative machine learning.",
        "image": "/images/tools/hugging-face.webp",
        "type": "Platform",
        "categories": [
            "AI & Generative",
            "Web Ecosystem"
        ],

        "stacks": [
            "ML",
            "Models"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://huggingface.co"
            }
        ]
    },
    {
        "name": "OpenAI API",
        "description": "Access to powerful AI models like GPT-4 and DALL-E for integration into applications and creative tools.",
        "image": "/images/tools/openai-api.webp",
        "type": "API",
        "categories": [
            "AI & Generative"
        ],
        "stacks": [
            "LLM",
            "API",
            "GenAI"
        ],
        "links": [
            {
                "title": "Docs",
                "url": "https://platform.openai.com"
            }
        ]
    },
    {
        "name": "8th Wall",
        "description": "EDIT: Is closing down as is! A powerful platform for building WebAR content that works across iOS and Android without an app.",
        "image": "/images/tools/8th-wall.webp",
        "type": "Platform",
        "categories": [
            "Extended Reality (XR)",
            "Web Ecosystem"
        ],
        "stacks": [
            "WebAR",
            "AR"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://www.8thwall.com"
            }
        ]
    },
    {
        "name": "Unity",
        "description": "The world's leading platform for creating and operating real-time 3D (RT3D) content, widely used for AR/VR and games.",
        "image": "/images/tools/unity.webp",
        "type": "Engine",
        "categories": [
            "Game Engine",
            "Extended Reality (XR)",
            "Real-time 3D"
        ],
        "stacks": [
            "Native",
            "AR/VR",
            "Game Dev"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://unity.com"
            }
        ]
    },
    {
        "name": "Lens Studio",
        "description": "Snapchat's specialized IDE for creating augmented reality lenses and experiences.",
        "image": "/images/tools/lens-studio.webp",
        "type": "Tool",
        "categories": [
            "Extended Reality (XR)"
        ],
        "stacks": [
            "Social AR",
            "Filters",
            "Try-On"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://ar.snap.com/lens-studio"
            }
        ]
    },
    {
        "name": "Rive",
        "description": "A format and tool for building interactive animations that run anywhere, offering state machines for logic-driven motion.",
        "image": "/images/tools/rive.webp",
        "type": "Tool",
        "categories": [
            "Design & Motion",
            "Web Ecosystem"
        ],
        "stacks": [
            "Animation",
            "Interactive",
            "Runtime"
        ],
        "featured": true,
        "links": [
            {
                "title": "Website",
                "url": "https://rive.app"
            }
        ]
    },
    {
        "name": "Figma",
        "description": "The collaborative interface design tool, now essential for UI/UX concepts and developer handoffs.",
        "image": "/images/tools/figma.webp",
        "type": "Tool",
        "categories": [
            "Design & Motion"
        ],
        "stacks": [
            "UI/UX",
            "Prototyping"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://figma.com"
            }
        ]
    },
    {
        "name": "Blender",
        "description": "The free and open source 3D creation suite. It supports the entirety of the 3D pipeline.",
        "image": "/images/tools/blender.webp",
        "type": "Tool",
        "isOpenSource": true,
        "categories": [
            "Design & Motion",
            "Real-time 3D"
        ],
        "stacks": [
            "3D Modeling",
            "Animation",
            "Rendering"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://blender.org"
            }
        ]
    },
    {
        "name": "Arduino",
        "description": "Open-source electronic prototyping platform enabling users to create interactive electronic objects.",
        "image": "/images/tools/arduino.webp",
        "type": "Hardware",
        "isOpenSource": true,
        "categories": [
            "Physical Computing"
        ],
        "stacks": [
            "Physical",
            "Embedded"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://arduino.cc"
            }
        ]
    },
    {
        "name": "Raspberry Pi",
        "description": "A series of small single-board computers perfect for IoT projects, media centers, and learning computing.",
        "image": "/images/tools/raspberry-pi.webp",
        "type": "Hardware",
        "categories": [
            "Physical Computing"
        ],
        "stacks": [
            "IoT",
            "Physical",
            "Linux"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://raspberrypi.com"
            }
        ]
    },
    {
        "name": "Next.js",
        "description": "The React Framework for the Web, offering hybrid static & server rendering, and smart bundling.",
        "image": "/images/tools/nextjs.webp",
        "type": "Framework",
        "isOpenSource": true,
        "categories": [
            "Web Ecosystem"
        ],
        "stacks": [
            "React",
            "SSR",
            "Web"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://nextjs.org"
            }
        ]
    },
    {
        "name": "Tailwind CSS",
        "description": "A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.",
        "image": "/images/tools/tailwind-css.webp",
        "type": "Library",
        "isOpenSource": true,
        "categories": [
            "Web Ecosystem"
        ],
        "stacks": [
            "CSS",
            "Styling"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://tailwindcss.com"
            }
        ]
    },
    {
        "name": "Svelte",
        "description": "Cybernetically enhanced web apps. Svelte shifts that work out of the browser and into a compile step.",
        "image": "/images/tools/svelte.webp",
        "type": "Framework",
        "isOpenSource": true,
        "categories": [
            "Web Ecosystem"
        ],
        "stacks": [
            "Reactive",
            "Web",
            "Compiler"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://svelte.dev"
            }
        ]
    },
    {
        "name": "Design+Code",
        "description": "Learn design and code by building real apps with a focus on creative coding and design systems.",
        "image": "/images/tools/design-code.webp",
        "type": "Platform",
        "categories": [
            "Resources",
            "Creative Coding"
        ],
        "stacks": [
            "Education",
            "Design"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://designcode.io/"
            }
        ]
    },
    {
        "name": "SuperHi",
        "description": "Learn to code, design, and create with online courses and a creative community.",
        "image": "/images/tools/superhi.webp",
        "type": "Platform",
        "categories": [
            "Resources"
        ],
        "stacks": [
            "Education",
            "Design",
            "Creative Coding"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://www.superhi.com/"
            }
        ]
    },
    {
        "name": "Codecademy",
        "description": "A comprehensive platform for learning many coding languages and technical skills.",
        "image": "/images/tools/codecademy.webp",
        "type": "Platform",
        "categories": [
            "Resources"
        ],
        "stacks": [
            "Education",
            "Coding"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://www.codecademy.com/"
            }
        ]
    },
    {
        "name": "Are.na",
        "description": "A platform for connecting ideas and building knowledge through visual organization.",
        "image": "/images/tools/are-na.webp",
        "type": "Platform",
        "categories": [
            "Resources"
        ],
        "stacks": [
            "Inspiration",
            "Knowledge"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://www.are.na/"
            }
        ]
    },
    {
        "name": "Eagle",
        "description": "Organize all your reference visuals and design assets in one place.",
        "image": "/images/tools/eagle.webp",
        "type": "Software",
        "categories": [
            "Design & Motion"
        ],
        "stacks": [
            "Asset Management",
            "Productivity"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://eagle.cool/"
            }
        ]
    },
    {
        "name": "Curated",
        "description": "A web design inspiration catalog featuring high-quality design examples.",
        "image": "/images/tools/curated.webp",
        "type": "Platform",
        "categories": [
            "Resources"
        ],
        "stacks": [
            "Inspiration",
            "Web Design"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://www.curated.design/"
            }
        ]
    },
    {
        "name": "Endless Tools",
        "description": "A design multitool for creating and manipulating visual elements.",
        "image": "/images/tools/endless-tools.webp",
        "type": "Tool",
        "categories": [
            "Design & Motion"
        ],
        "stacks": [
            "Design",
            "3D"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://endless.tools/"
            }
        ]
    },
    {
        "name": "Unicorn Studio",
        "description": "A powerful web design tool for creating high-end, dazzling websites.",
        "image": "/images/tools/unicorn-studio.webp",
        "type": "Tool",
        "categories": [
            "Web Ecosystem"
        ],
        "stacks": [
            "Web Design",
            "No-Code"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://www.unicorn.studio/"
            }
        ]
    },
    {
        "name": "Mobbin",
        "description": "The world’s largest design library for mobile and web apps.",
        "image": "/images/tools/mobbin.webp",
        "type": "Platform",
        "categories": [
            "Resources"
        ],
        "stacks": [
            "Inspiration",
            "UI/UX"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://mobbin.com/"
            }
        ]
    },
    {
        "name": "GitHub",
        "description": "The leading platform for version control and collaborative software development.",
        "image": "/images/tools/github.webp",
        "type": "Platform",
        "categories": [
            "Web Ecosystem"
        ],
        "stacks": [
            "Version Control",
            "Collaboration"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://github.com/"
            }
        ]
    },
    {
        "name": "GitLab",
        "description": "A complete DevOps platform for speeding up the software development life cycle.",
        "image": "/images/tools/gitlab.webp",
        "type": "Platform",
        "categories": [
            "Web Ecosystem"
        ],
        "stacks": [
            "Version Control",
            "DevOps"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://about.gitlab.com/"
            }
        ]
    },
    {
        "name": "Codepen",
        "description": "An online community for testing and showcasing HTML, CSS, and JS code snippets.",
        "image": "/images/tools/codepen.webp",
        "type": "Platform",
        "categories": [
            "Creative Coding",
            "Web Ecosystem"
        ],
        "stacks": [
            "Coding",
            "Playground",
            "Education"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://codepen.io/"
            }
        ]
    },
    {
        "name": "GSAP",
        "description": "A wildly robust JavaScript animation library for the modern web.",
        "image": "/images/tools/gsap.webp",
        "type": "Library",
        "categories": [
            "Web Ecosystem",
            "Design & Motion"
        ],
        "stacks": [
            "Animation",
            "JavaScript"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://gsap.com/"
            }
        ]
    },
    {
        "name": "Cursor",
        "description": "An AI-powered code editor designed for pair programming with an AI.",
        "image": "/images/tools/cursor.webp",
        "type": "Software",
        "categories": [
            "Web Ecosystem"
        ],
        "stacks": [
            "Code Editor",
            "AI"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://cursor.sh/"
            }
        ]
    },
    {
        "name": "CodeSandbox",
        "description": "Instant cloud development environment for building and sharing web projects.",
        "image": "/images/tools/codesandbox.webp",
        "type": "Platform",
        "categories": [
            "Web Ecosystem"
        ],
        "stacks": [
            "Cloud Dev",
            "Playground"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://codesandbox.io/"
            }
        ]
    },
    {
        "name": "VS Code",
        "description": "A powerful, extensible code editor that has redefined modern development.",
        "image": "/images/tools/vs-code.webp",
        "type": "Software",
        "isOpenSource": true,
        "categories": [
            "Web Ecosystem"
        ],
        "stacks": [
            "Code Editor",
            "Microsoft"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://code.visualstudio.com/"
            }
        ]
    },
    {
        "name": "Zed",
        "description": "A high-performance code editor built for speed and collaborative coding.",
        "image": "/images/tools/zed.webp",
        "type": "Software",
        "isOpenSource": true,
        "categories": [
            "Web Ecosystem"
        ],
        "stacks": [
            "Code Editor",
            "Performance"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://zed.dev/"
            }
        ]
    },
    {
        "name": "Tuple",
        "description": "The best-in-class remote pair programming tool for macOS and Windows.",
        "image": "/images/tools/tuple.webp",
        "type": "Software",
        "categories": [
            "Web Ecosystem"
        ],
        "stacks": [
            "Collaboration",
            "Remote"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://tuple.app/"
            }
        ]
    },
    {
        "name": "StackBlitz",
        "description": "Brings fullstack development to the browser for instant, collaborative coding.",
        "image": "/images/tools/stackblitz.webp",
        "type": "Platform",
        "categories": [
            "Web Ecosystem"
        ],
        "stacks": [
            "Cloud Dev",
            "Playground"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://stackblitz.com/"
            }
        ]
    },
    {
        "name": "Bolt.new",
        "description": "An AI-powered web development agent that allows you to build, edit, and deploy full-stack web apps directly in the browser.",
        "image": "/images/tools/bolt-new.webp",
        "type": "Tool",
        "categories": [
            "AI & Generative",
            "Web Ecosystem"
        ],
        "stacks": [
            "Vibe Coding",
            "Web Dev",
            "AI"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://bolt.new/"
            }
        ]
    },
    {
        "name": "Lovable",
        "description": "An AI tool that turns text into fully functional software, capable of building real-world full-stack applications.",
        "image": "/images/tools/lovable.webp",
        "type": "Tool",
        "categories": [
            "AI & Generative",
            "Web Ecosystem"
        ],
        "stacks": [
            "Vibe Coding",
            "No-Code",
            "AI"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://lovable.dev/"
            }
        ]
    },
    {
        "name": "v0",
        "description": "Vercel's generative UI system that creates copy-and-paste friendly React code based on text prompts.",
        "image": "/images/tools/v0.webp",
        "type": "Tool",
        "categories": [
            "AI & Generative",
            "Web Ecosystem"
        ],
        "stacks": [
            "Vibe Coding",
            "UI/UX",
            "React"
        ],
        "featured": true,
        "links": [
            {
                "title": "Website",
                "url": "https://v0.dev/"
            }
        ]
    },
    {
        "name": "Windsurf",
        "description": "The first agentic IDE that combines deep context awareness with AI to keep you in the flow.",
        "image": "/images/tools/windsurf.webp",
        "type": "Software",
        "categories": [
            "Web Ecosystem",
            "AI & Generative"
        ],
        "stacks": [
            "Vibe Coding",
            "Code Editor",
            "AI"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://codeium.com/windsurf"
            }
        ]
    },
    {
        "name": "Google AntiGravity",
        "description": "A powerful agentic AI coding assistant designed by the Google Deepmind team.",
        "image": "/images/tools/google-antigravity.webp",
        "type": "Tool",
        "categories": [
            "AI & Generative",
            "Web Ecosystem"
        ],
        "stacks": [
            "Vibe Coding",
            "Agent",
            "AI"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://deepmind.google/"
            }
        ]
    },
    {
        "name": "Notch",
        "description": "A node-based tool for real-time motion graphics and interactive video, widely used in live events and concerts.",
        "image": "/images/tools/notch.webp",
        "type": "Tool",
        "categories": [
            "Real-time 3D",
            "Design & Motion"
        ],
        "stacks": [
            "Experiential",
            "Live",
            "VFX"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://www.notch.one/"
            }
        ]
    },
    {
        "name": "Disguise",
        "description": "The platform for visual storytelling, powering the world's largest and most spectacular live experiences.",
        "image": "/images/tools/disguise.webp",
        "type": "Platform",
        "categories": [
            "Real-time 3D"
        ],
        "stacks": [
            "Experiential",
            "Live",
            "Mapping"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://www.disguise.one/"
            }
        ]
    },
    {
        "name": "Ventuz",
        "description": "A real-time graphics content creation, authoring and playout control software for high-end AV productions.",
        "image": "/images/tools/ventuz.webp",
        "type": "Software",
        "categories": [
            "Real-time 3D"
        ],
        "stacks": [
            "Experiential",
            "Broadcast",
            "Installation"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://www.ventuz.com/"
            }
        ]
    },
    {
        "name": "MadMapper",
        "description": "The advanced video mapping software for projection mapping and LED mapping.",
        "image": "/images/tools/madmapper.webp",
        "type": "Software",
        "categories": [
            "Creative Coding"
        ],
        "stacks": [
            "Experiential",
            "Projection Mapping",
            "Lighting"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://madmapper.com/"
            }
        ]
    },
    {
        "name": "Zappar",
        "description": "A comprehensive XR platform and creative studio offering powerful WebAR tools and SDKs for bringing AR to the browser.",
        "image": "/images/tools/zappar.webp",
        "type": "Platform",
        "categories": [
            "Extended Reality (XR)",
            "Web Ecosystem"
        ],
        "stacks": [
            "WebAR",
            "AR",
            "Computer Vision"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://www.zappar.com/"
            }
        ]
    },
    {
        "name": "Niantic Lightship",
        "description": "The ARDK from the Pokémon GO creators, enabling shared AR experiences, visual positioning (VPS), and advanced depth/occlusion.",
        "image": "/images/tools/lightship.webp",
        "type": "Platform",
        "categories": [
            "Extended Reality (XR)"
        ],
        "stacks": [
            "AR",
            "VPS",
            "Shared AR"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://lightship.dev/"
            }
        ]
    },
    {
        "name": "ARKit",
        "description": "Apple's native augmented reality framework for iOS, providing world tracking, scene understanding, and lighting estimation.",
        "image": "/images/tools/ar-kit.webp",
        "type": "Framework",
        "categories": [
            "Extended Reality (XR)"
        ],
        "stacks": [
            "iOS",
            "Mobile AR",
            "Tracking"
        ],
        "links": [
            {
                "title": "Docs",
                "url": "https://developer.apple.com/augmented-reality/arkit/"
            }
        ]
    },
    {
        "name": "ARCore",
        "description": "Google's platform for building augmented reality experiences across Android and iOS, featuring environmental understanding and motion tracking.",
        "image": "/images/tools/ar-core.webp",
        "type": "Framework",
        "categories": [
            "Extended Reality (XR)"
        ],
        "stacks": [
            "Android",
            "Mobile AR",
            "Tracking"
        ],
        "links": [
            {
                "title": "Docs",
                "url": "https://developers.google.com/ar"
            }
        ]
    },
    {
        "name": "RealityKit",
        "description": "Apple's high-level 3D rendering, animation, physics, and spatial audio framework expressly built for AR.",
        "image": "/images/tools/reality-kit.webp",
        "type": "Framework",
        "categories": [
            "Extended Reality (XR)",
            "Real-time 3D"
        ],
        "stacks": [
            "iOS",
            "Rendering",
            "AR"
        ],
        "links": [
            {
                "title": "Docs",
                "url": "https://developer.apple.com/augmented-reality/realitykit/"
            }
        ]
    },
    {
        "name": "MindAR",
        "description": "A lightweight, open-source web augmented reality library for image tracking and face tracking.",
        "image": "/images/tools/mind-ar.webp",
        "type": "Library",
        "categories": [
            "Extended Reality (XR)",
            "Web Ecosystem"
        ],
        "isOpenSource": true,
        "stacks": [
            "WebAR",
            "Computer Vision"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://hiukim.github.io/mind-ar-js-doc/"
            }
        ]
    },
    {
        "name": "Unreal Engine",
        "description": "The world's most open and advanced real-time 3D creation tool for photoreal visuals and immersive experiences.",
        "image": "/images/tools/unreal-engine.webp",
        "type": "Engine",
        "categories": [
            "Game Engine",
            "Real-time 3D",
            "Extended Reality (XR)"
        ],
        "stacks": [
            "C++",
            "Blueprints",
            "Visual Scripting"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://www.unrealengine.com"
            }
        ]
    },
    {
        "name": "GameMaker",
        "description": "The ultimate 2D game development environment, making it easy to turn ideas into playable games.",
        "image": "/images/tools/gamemaker.webp",
        "type": "Engine",
        "categories": [
            "Game Engine",
            "Creative Coding"
        ],
        "stacks": [
            "2D",
            "GML",
            "Game Dev"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://gamemaker.io"
            }
        ]
    },
    {
        "name": "Godot",
        "description": "A feature-packed, completely free and open-source game engine for 2D and 3D games.",
        "image": "/images/tools/godot.webp",
        "type": "Engine",
        "isOpenSource": true,
        "categories": [
            "Game Engine",
            "Real-time 3D"
        ],
        "stacks": [
            "GDScript",
            "C#",
            "Indie"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://godotengine.org"
            }
        ]
    },
    {
        "name": "PlayCanvas",
        "description": "A Web-first game engine. Build lightweight, beautiful 3D games and apps for the mobile and desktop web.",
        "image": "/images/tools/playcanvas.webp",
        "type": "Engine",
        "categories": [
            "Game Engine",
            "Web Ecosystem",
            "Real-time 3D"
        ],
        "stacks": [
            "WebGL",
            "JavaScript",
            "Cloud Dev"
        ],
        "links": [
            {
                "title": "Website",
                "url": "https://playcanvas.com"
            }
        ]
    }
];
