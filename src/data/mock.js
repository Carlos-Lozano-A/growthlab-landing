// Mock data for IteraGrow landing page

export const testimonials = [
    {
        id: 1,
        name: "Carlos Mendoza",
        business: "TechStore Colombia",
        role: "Fundador",
        image: "https://images.unsplash.com/photo-1642257834579-eee89ff3e9fd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHwxfHxzdWNjZXNzZnVsJTIwYnVzaW5lc3MlMjBvd25lcnxlbnwwfHx8fDE3NzQzODEzMzB8MA&ixlib=rb-4.1.0&q=85",
        testimonial: "Después de 3 meses con IteraGrow, nuestras ventas aumentaron un 320%. Finalmente tenemos un flujo constante de clientes calificados.",
        result: "+320% en ventas"
    },
    {
        id: 2,
        name: "Ana Rodríguez",
        business: "Moda Bella Boutique",
        role: "Dueña",
        image: "https://images.pexels.com/photos/10375901/pexels-photo-10375901.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        testimonial: "Invertía en publicidad sin resultados. IteraGrow optimizó mi inversión y ahora cada peso que invierto me genera retorno real.",
        result: "ROI de 4.5x"
    },
    {
        id: 3,
        name: "María Gómez",
        business: "BeautyLab Spa",
        role: "Gerente General",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NzQzMDU3NjR8MA&ixlib=rb-4.1.0&q=85",
        testimonial: "El equipo de IteraGrow no solo manejó nuestras campañas, sino que nos enseñó a entender nuestros números. Ahora tengo control total.",
        result: "+150 leads/mes"
    }
    ];

    export const pricingPlans = [
    {
        id: 1,
        name: "Scale",
        subtitle: "Básico",
        price: 500000,
        currency: "COP",
        period: "mes",
        description: "Perfecto para comenzar tu crecimiento digital",
        popular: false,
        features: [
        "1 plataforma (TikTok, Meta ads o Google)",
        "Diagnostico inicial y estrategia personalizada",
        "Segmentación de audiencia",
        "Gestión completa de campañas",
        "Reporte mensual de rendimiento",
        "Soporte por email"
        ]
    },
    {
        id: 2,
        name: "Accelerate",
        subtitle: "Profesional",
        price: 750000,
        currency: "COP",
        period: "mes",
        description: "La opción más elegida por empresas en crecimiento",
        popular: true,
        features: [
        "2 plataformas a elección",
        "Todo lo incluido en Scale",
        "Embudo básico (Landing + flujo de contacto)",
        "Análisis de competencia",
        "Reportes quincenales",
        "Soporte prioritario"
        ]
    },
    {
        id: 3,
        name: "Velocity",
        subtitle: "Premium con IA",
        price: 1000000,
        currency: "COP",
        period: "mes",
        description: "Máximo rendimiento con automatización inteligente",
        popular: false,
        features: [
        "Todas las plataformas",
        "Todo lo incluido en Accelerate",
        "Embudo de alta conversión",
        "Chatbot con IA automatizado",
        "Reportes predictivos de ventas",
        "Consultor dedicado",
        "Optimización diaria"
        ]
    }
    ];

    export const addOns = [
    {
        category: "IA & Automatización",
        icon: "Bot",
        services: [
        { name: "Agente de atención con IA" },
        { name: "Automatización de respuestas" },
        { name: "Flujos de WhatsApp automatizados" }
        ]
    },
    {
        category: "Data & BI",
        icon: "BarChart3",
        services: [
        { name: "Dashboard personalizado" },
        { name: "Forecasting predictivo" }
        ]
    },
    {
        category: "CRO & Optimización",
        icon: "TrendingUp",
        services: [
        { name: "Auditoría de conversión" },
        { name: "Optimización de landing" }
        ]
    }
    ];

    export const trustMetrics = [
    { value: "50%", label: "Aumento promedio en ventas" },
    { value: "30+", label: "Empresas impulsadas" },
    { value: "4.8/5", label: "Calificación de clientes" },
    { value: "24/7", label: "Monitoreo de campañas" }
    ];

    export const problems = [
    {
        icon: "UserX",
        title: "No consigues clientes o no comprendes cómo funciona la publicidad digital",
        description: "Tu negocio tiene potencial pero los clientes no llegan o no sabes como funciona la publicidad digital."
    },
    {
        icon: "DollarSign",
        title: "Inviertes en publicidad y no vendes",
        description: "Gastas dinero en ads de TikTok, Meta ads o Google ads pero el retorno es nulo o muy bajo."
    },
    {
        icon: "AlertCircle",
        title: "No tienes control de tus procesos",
        description: "No sabes qué funciona, qué no, ni cómo optimizar. Falta visibilidad y datos claros."
    },
    {
        icon: "AutomationAgent",
        title: "Haces tareas una y otra vez sin automatizar",
        description: "Actividades manuales y repetitivas que te consumen tiempo."
    },
    {
        icon: "Lightbulb",
        title: "No sabes leer metricas o no tienes una estrategia digital clara",
        description: "Te sientes perdido en el mundo digital, sin un plan definido para alcanzar tus objetivos."
    },
    {
        icon: "Heart",
        title: "Tus clientes no regresan o no los fidelizas",
        description: "Inviertes mucho en conseguir nuevos clientes, pero te cuesta mantenerlos a largo plazo."
    }
    ];

    export const solutions = [
    {
        icon: "Target",
        title: "Campañas basadas en datos",
        description: "Usamos métricas reales y análisis profundo para crear campañas que realmente convierten."
    },
    {
        icon: "Layers",
        title: "Estrategia multiplataforma",
        description: "TikTok, Meta ads y Google Ads trabajando juntos para maximizar tu alcance y ventas."
    },
    {
        icon: "Zap",
        title: "Optimización continua",
        description: "Monitoreamos y ajustamos tus campañas constantemente para mejorar el rendimiento."
    },
    {
        icon: "PieChart",
        title: "Tracking de rendimiento",
        description: "Dashboards claros que te muestran exactamente dónde va tu inversión y qué resultados genera."
    }
    ];

    // Mock function to simulate form submission
    export const submitLeadForm = async (formData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
        console.log("Lead submitted:", formData);
        resolve({ success: true, message: "¡Gracias! Nos pondremos en contacto pronto." });
        }, 1000);
    });
};
