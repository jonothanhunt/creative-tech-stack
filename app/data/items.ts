import { ItemWithId } from "@/lib/db";

export const items: ItemWithId[] = [
    // --- REAL-TIME 3D & WEBGL ---
    {
        id: 1,
        name: "Three.js",
        description: "The standard 3D library for the web, enabling complex 3D scenes and animations via WebGL.",
        image: "",
        type: "Library",
        categories: ["Real-time 3D", "Creative Coding"],
        stacks: ["WebGL", "Web3D"],
        featured: true,
        links: [{ title: "Website", url: "https://threejs.org" }]
    },
    {
        id: 2,
        name: "React Three Fiber",
        description: "A React renderer for Three.js, bringing declarative, component-based 3D development to the React ecosystem.",
        image: "",
        type: "Library",
        categories: ["Real-time 3D", "Web Ecosystem"],
        stacks: ["WebGL", "React", "Web3D"],
        featured: true,
        links: [{ title: "Docs", url: "https://docs.pmnd.rs/react-three-fiber" }]
    },
    {
        id: 3,
        name: "Spline",
        description: "A user-friendly 3D design tool specifically built for the web, allowing for interactive 3D experiences without deep coding.",
        image: "",
        type: "Tool",
        categories: ["Real-time 3D", "Design & Motion"],
        stacks: ["Web3D", "No-Code", "Interactive"],
        featured: true,
        links: [{ title: "Website", url: "https://spline.design" }]
    },
    {
        id: 4,
        name: "Babylon.js",
        description: "A powerful, open-source 3D engine for the web, known for its performance and extensive feature set including WebGPU support.",
        image: "",
        type: "Library",
        categories: ["Real-time 3D"],
        stacks: ["WebGL", "WebGPU", "Game Dev"],
        links: [{ title: "Website", url: "https://www.babylonjs.com" }]
    },

    // --- CREATIVE CODING ---
    {
        id: 5,
        name: "p5.js",
        description: "A JavaScript library for creative coding, making coding accessible for artists, designers, educators, and beginners.",
        image: "",
        type: "Library",
        categories: ["Creative Coding"],
        stacks: ["Creative Coding", "Canvas", "Education"],
        featured: true,
        links: [{ title: "Website", url: "https://p5js.org" }]
    },
    {
        id: 6,
        name: "TouchDesigner",
        description: "A node-based visual programming language for real-time interactive multimedia content, used widely in installations and live performances.",
        image: "",
        type: "Platform",
        categories: ["Creative Coding", "Real-time 3D"],
        stacks: ["Visual Programming", "Live", "Installation"],
        featured: true,
        links: [{ title: "Website", url: "https://derivative.ca" }]
    },
    {
        id: 7,
        name: "Processing",
        description: "A flexible software sketchbook and a language for learning how to code within the context of the visual arts.",
        image: "",
        type: "Platform",
        categories: ["Creative Coding"],
        stacks: ["Creative Coding", "Java", "Education"],
        links: [{ title: "Website", url: "https://processing.org" }]
    },
    {
        id: 8,
        name: "ShaderToy",
        description: "Cross-browser interactive tool for creating and sharing shaders in WebGL, a playground for computer graphics enthusiasts.",
        image: "",
        type: "Resource",
        categories: ["Creative Coding", "Real-time 3D"],
        stacks: ["GLSL", "Shaders"],
        links: [{ title: "Website", url: "https://shadertoy.com" }]
    },

    // --- AI & GENERATIVE ---
    {
        id: 9,
        name: "Runway",
        description: "A next-generation content creation suite offering advanced AI tools for video editing, generation, and image synthesis.",
        image: "",
        type: "Tool",
        categories: ["AI & Generative"],
        stacks: ["GenAI", "Video", "ML"],
        featured: true,
        links: [{ title: "Website", url: "https://runwayml.com" }]
    },
    {
        id: 10,
        name: "Midjourney",
        description: "An independent research lab exploring new mediums of thought and expanding the imaginative powers of the human species via generative AI.",
        image: "",
        type: "Tool",
        categories: ["AI & Generative"],
        stacks: ["GenAI", "Image"],
        links: [{ title: "Website", url: "https://midjourney.com" }]
    },
    {
        id: 11,
        name: "Hugging Face",
        description: "The AI community building the future. The hub for open-source models, datasets, and collaborative machine learning.",
        image: "",
        type: "Platform",
        categories: ["AI & Generative", "Web Ecosystem"],
        stacks: ["ML", "Open Source", "Models"],
        links: [{ title: "Website", url: "https://huggingface.co" }]
    },
    {
        id: 12,
        name: "OpenAI API",
        description: "Access to powerful AI models like GPT-4 and DALL-E for integration into applications and creative tools.",
        image: "",
        type: "API",
        categories: ["AI & Generative"],
        stacks: ["LLM", "API", "GenAI"],
        links: [{ title: "Docs", url: "https://platform.openai.com" }]
    },

    // --- EXTENDED REALITY (XR) ---
    {
        id: 13,
        name: "8th Wall",
        description: "A powerful platform for building WebAR content that works across iOS and Android without an app.",
        image: "",
        type: "Platform",
        categories: ["Extended Reality (XR)", "Web Ecosystem"],
        stacks: ["WebAR", "AR"],
        links: [{ title: "Website", url: "https://www.8thwall.com" }]
    },
    {
        id: 14,
        name: "Unity",
        description: "The world's leading platform for creating and operating real-time 3D (RT3D) content, widely used for AR/VR and games.",
        image: "",
        type: "Engine",
        categories: ["Extended Reality (XR)", "Real-time 3D"],
        stacks: ["Native", "AR/VR", "Game Dev"],
        links: [{ title: "Website", url: "https://unity.com" }]
    },
    {
        id: 15,
        name: "Lens Studio",
        description: "Snapchat's specialized IDE for creating augmented reality lenses and experiences.",
        image: "",
        type: "Tool",
        categories: ["Extended Reality (XR)"],
        stacks: ["Social AR", "Filters", "Try-On"],
        links: [{ title: "Website", url: "https://ar.snap.com/lens-studio" }]
    },

    // --- DESIGN & MOTION ---
    {
        id: 16,
        name: "Rive",
        description: "A format and tool for building interactive animations that run anywhere, offering state machines for logic-driven motion.",
        image: "",
        type: "Tool",
        categories: ["Design & Motion", "Web Ecosystem"],
        stacks: ["Animation", "Interactive", "Runtime"],
        featured: true,
        links: [{ title: "Website", url: "https://rive.app" }]
    },
    {
        id: 17,
        name: "Figma",
        description: "The collaborative interface design tool, now essential for UI/UX concepts and developer handoffs.",
        image: "",
        type: "Tool",
        categories: ["Design & Motion"],
        stacks: ["UI/UX", "Prototyping"],
        links: [{ title: "Website", url: "https://figma.com" }]
    },
    {
        id: 18,
        name: "Blender",
        description: "The free and open source 3D creation suite. It supports the entirety of the 3D pipeline.",
        image: "",
        type: "Tool",
        categories: ["Design & Motion", "Real-time 3D"],
        stacks: ["3D Modeling", "Animation", "Rendering"],
        links: [{ title: "Website", url: "https://blender.org" }]
    },

    // --- PHYSICAL & HARDWARE ---
    {
        id: 19,
        name: "Arduino",
        description: "Open-source electronic prototyping platform enabling users to create interactive electronic objects.",
        image: "",
        type: "Hardware",
        categories: ["Physical Computing"],
        stacks: ["Physical", "Embedded"],
        links: [{ title: "Website", url: "https://arduino.cc" }]
    },
    {
        id: 20,
        name: "Raspberry Pi",
        description: "A series of small single-board computers perfect for IoT projects, media centers, and learning computing.",
        image: "",
        type: "Hardware",
        categories: ["Physical Computing"],
        stacks: ["IoT", "Physical", "Linux"],
        links: [{ title: "Website", url: "https://raspberrypi.com" }]
    },

    // --- WEB ECOSYSTEM ---
    {
        id: 21,
        name: "Next.js",
        description: "The React Framework for the Web, offering hybrid static & server rendering, and smart bundling.",
        image: "",
        type: "Framework",
        categories: ["Web Ecosystem"],
        stacks: ["React", "SSR", "Web"],
        links: [{ title: "Website", url: "https://nextjs.org" }]
    },
    {
        id: 22,
        name: "Tailwind CSS",
        description: "A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.",
        image: "",
        type: "Library",
        categories: ["Web Ecosystem"],
        stacks: ["CSS", "Styling"],
        links: [{ title: "Website", url: "https://tailwindcss.com" }]
    },
    {
        id: 23,
        name: "Svelte",
        description: "Cybernetically enhanced web apps. Svelte shifts that work out of the browser and into a compile step.",
        image: "",
        type: "Framework",
        categories: ["Web Ecosystem"],
        stacks: ["Reactive", "Web", "Compiler"],
        links: [{ title: "Website", url: "https://svelte.dev" }]
    }
];
