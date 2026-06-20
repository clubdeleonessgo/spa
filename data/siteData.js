export const topStats = [
    {id: "services", label: "Obras de servicio", value: 800},
    {id: "people", label: "Personas beneficiadas", value: 15000},
    {id: "courses", label: "Capacitaciones realizadas", value: 40},
    {id: "alliances", label: "Alianzas con instituciones", value: 5},
    {id: "years", label: "Años de servicio", value: 8},
    {id: "volunteers", label: "Voluntarios", value: 100}
];

const enviroment_activities = [
    'Colecta de tapitas y cartones',
    'Ropero solidario',
    'Plantación de árboles',
    'Cuidado de espacios verdes'
];

const hunger_activities = [
    'Colecta y banco de alimentos',
    'Café Solidario',
    'Ayuda a personas vulnerables',
    'Donación a comedores y merenderos'
];

const vision_activities = [
    'Pesquizas visuales en escuelas y jardines',
    'Campañas de difusión, prevención y concientización'
];

const diabetes_activities = [
    'Jornadas de medición y actividades recreativas',
    'Campañas de difusión, prevención y concientización'
];

const cancer_activities = [
    'Colectas de Sangre y Registro de Médula Ósea',
    'Campañas de difusión y concientización',
    'Colecta de mechones de cabello'
];

const youth_activities = [
    'Concurso Cartel de la Paz',
    'Jornadas, cursos y talleres sobre temas de actualidad',
    'Capacitaciones en liderazgo'
];

const humanitarian_activities = [
    'Asistencia a personas vulnerables',
    'Ropero solidario'
];

const disaster_activities = [
    'Asistencia ante emergencias y catástrofes',
    'Donación de insumos'
];

const health_activities = [
    'Jornadas y talleres sobre salud mental',
    'Campañas de difusión, prevención y concientización'
];

export const causes = [
    {
        id: 1, color: 'bg-cause-enviroment', image: 'ambiente.png',
        title: 'Medio Ambiente', value: 100,
        src: ['ambiente_2.jpg', 'ambiente_1.jpg', 'ambiente_3.jpg', 'ambiente_4.jpg'],
        activities: enviroment_activities
    },
    {
        id: 2, color: 'bg-cause-hunger', image: 'hambre.png',
        title: 'Hambre', value: 200, src: ['hambre.jpg', 'hambre_2.jpg', 'hambre_3.jpg'],
        activities: hunger_activities
    },
    {
        id: 3, color: 'bg-cause-vision', image: 'vision.png',
        title: 'Visión', value: 25, src: ['vision.jpg', 'vision_2.jpg', 'vision_3.jpg'],
        activities: vision_activities
    },
    {
        id: 4, color: 'bg-cause-diabetes', image: 'diabetes.png',
        title: 'Diabetes', value: 10, src: ['diabetes.jpg', 'diabetes_2.jpg'],
        activities: diabetes_activities
    },
    {
        id: 5, color: 'bg-cause-cancer', image: 'cancer.png',
        title: 'Cáncer Infantil', value: 20, src: ['cancer.jpg', 'cancer_2.jpg', 'cancer_3.jpg'],
        activities: cancer_activities,
        black: true
    },
    {
        id: 6, color: 'bg-cause-youth', image: 'juventud.png',
        title: 'Juventud', value: 60, src: ['juventud.jpg', 'juventud_2.jpg', 'juventud_3.jpg',
            'juventud_4.jpg', 'juventud_5.jpg'],
        activities: youth_activities
    },
    {
        id: 7, color: 'bg-cause-humanitarian', image: 'humanitario.png',
        title: 'Ayuda Humanitaria', value: 50, src: ['ayuda.jpg', "ayuda_2.jpg",
            "ayuda_3.jpg", "ayuda_4.jpg"],
        activities: humanitarian_activities
    },
    {
        id: 8, color: 'bg-cause-disaster', image: 'disaster.png',
        title: 'Auxilio en Casos de Desastres', value: 0,
        activities: disaster_activities
    },
    {
        id: 9, color: 'bg-cause-health', image: 'salud.png',
        title: 'Salud Mental', value: 10, src: ['salud_1.jpg', 'salud.jpg'],
        activities: health_activities
    },
];

export const activities = [
    '📚 Formación y capacitación: ofrecemos talleres y jornadas para jóvenes y docentes de la provincia en temáticas actuales.',
    '🍲 Solidaridad con merenderos y familias: organizamos colectas y entregamos alimentos a comedores y personas en situación vulnerable.',
    '♻️ Reciclaje y cuidado del ambiente: trabajamos en la recolección de cartones, tapitas y el mantenimiento de espacios verdes.',
    '👀 Cuidado de la visión: llevamos a cabo pesquisas visuales en escuelas y jardines para la detección temprana de la ceguera infantil.',
    '👕 Ropero y asistencia solidaria: brindamos ropa y acompañamiento a familias que más lo necesitan.',
    '💇‍♀️ Pequeños gestos que cambian vidas: juntamos mechones de cabello, promovemos la donación de sangre y concientizamos sobre el cáncer infantil.',
    '🩺 Prevención y salud: realizamos jornadas, charlas y actividades recreativas sobre diabetes y otros temas de salud.',
];
