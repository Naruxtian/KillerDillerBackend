import bcrypt from 'bcryptjs';

export const initialData = {
    users: [
        {
            name: 'Admin User',
            email: 'admin@killerdiller.com',
            password: bcrypt.hashSync('123456'),
            role: 'admin'
        },
        {
            name: 'John Doe',
            email: 'john@mail.com',
            password: bcrypt.hashSync('123456'),
            role: 'client'
        }
    ],
    brands: [
        {
            name: 'Zara'
        },
        {
            name: 'H&M'
        },
        {
            name: 'Pull & Bear'
        },
        {
            name: 'Bershka'
        },
        {
            name: 'Stradivarius'
        }
    ],
    colors: [
        {
            name: 'Blanco',
            hex: '#ffffff'
        },
        {
            name: 'Negro',
            hex: '#000000'
        },
        {
            name: 'Amarillo Pastel',
            hex: '#fcd568'
        },
        {
            name: 'Rosa Mexicano',
            hex: '#f702aa'
        },
        {
            name: 'Rosa Pastel',
            hex: '#ffcff0'
        },
        {
            name: 'Malva',
            hex: '#f3cfff'
        },
        {
            name: 'Café Claro',
            hex: '#ccad95'
        }
    ],
    information: [
        {
            title: 'Materiales',
            description: 'MATERIALES, CUIDADOS Y ORIGEN JOIN LIFE Care for water: producido utilizando menos agua. Etiquetamos bajo el nombre Join Life las prendas que se producen utilizando tecnologías y materias primas que nos ayudan a reducir el impacto medioambiental de nuestros productos.'
        },
        {
            title: 'Cuidado',
            description: 'Lavar a máquina máximo 30ºC, no usar lejía, planchar a temperatura baja, no limpiar en seco, no secar en secadora.'
        }
    ],
    products: [
        {
            title: 'Conjunto de traje formal',
            slug: 'conjunto_de_traje_formal',
            description: 'Conjunto de traje formal para mujer, parte de la colección navideña de Zara',
            information: [
                '63c8b52a8482840a87c890e6',
                '63c8b52a8482840a87c890e7'
            ],
            category: 'conjuntos',
            price: 700,
            discount: 0,
            images: [
                'https://res.cloudinary.com/killer-diller/image/upload/v1683597374/killer-diller/h6ubp9x4zcdgkx4jdr88.jpg'
            ],
            brand: '63a23bb1f3ebfcd4f32d1929',
            colors: [
                '63b0e3b6bcd1abace340d8b4'
            ],
            gender: 'mujeres',
            size: 'M',
            fit: 'regular',
            internalCondition: 5,
            externalCondition: 5,
            tags: [
                'traje',
                'formal',
                'zara',
                'blanco',
                'mujeres',
                'conjunto'
            ],
            isSold: false
        },
        {
            title: 'Pantalón casual holgado',
            slug: 'pantalon_casual_holgado',
            description: 'Pantalon blanco estilo holgado, ideal para ocasiones casuales o semi-formales.',
            information: [
                '63c8b52a8482840a87c890e6',
                '63c8b52a8482840a87c890e7'
            ],
            category: 'pantalones',
            price: 400,
            discount: 0,
            images: [
                'https://res.cloudinary.com/killer-diller/image/upload/v1683597374/killer-diller/fgpww6o69gnivzeygihe.jpg'
            ],
            brand: '63a23bb1f3ebfcd4f32d192c',
            colors: [
                '63b0e3b6bcd1abace340d8b4'
            ],
            gender: 'mujeres',
            size: 'S',
            fit: 'loose',
            internalCondition: 5,
            externalCondition: 4.5,
            tags: [
                'pantalon',
                'casual',
                'holgado',
                'bershka',
                'blanco',
                'mujeres'
            ],
            isSold: false
        },
        {
            title: 'Conjunto de Traje Estilo Zebra',
            slug: 'conjunto_de_traje_estilo_zebra',
            description: 'Conjunto de traje casual para mujer con estilo de zebra, parte de la colección verano de 2022.',
            information: [
                '63c8b52a8482840a87c890e6',
                '63c8b52a8482840a87c890e7'
            ],
            category: 'conjuntos',
            price: 600,
            discount: 0,
            images: [
                'https://res.cloudinary.com/killer-diller/image/upload/v1683597374/killer-diller/boi9sg6rralbkfhwqgcb.jpg'
            ],
            brand: '63a23bb1f3ebfcd4f32d1929',
            colors: [
                '63b0e3b6bcd1abace340d8ba',
                '63b0e3b6bcd1abace340d8b5'
            ],
            gender: 'mujeres',
            size: 'M',
            fit: 'loose',
            internalCondition: 5,
            externalCondition: 5,
            tags: [
                'traje',
                'casual',
                'zara',
                'blanco',
                'mujeres',
                'conjunto',
                'zebra'
            ],
            isSold: false
        },
        {
            title: 'Conjunto de Traje Formal Amarillo Pastel',
            slug: 'conjunto_de_traje_formal_amarillo_pastel',
            description: 'Conjunto de traje formal para mujer color amarilo (incluye cinturón), parte de la colección otoño de 2022.',
            information: [
                '63c8b52a8482840a87c890e6',
                '63c8b52a8482840a87c890e7'
            ],
            category: 'conjuntos',
            price: 900,
            discount: 0,
            images: [
                'https://res.cloudinary.com/killer-diller/image/upload/v1683597374/killer-diller/iap8es06oh8arbycabwd.jpg'
            ],
            brand: '63a23bb1f3ebfcd4f32d192d',
            colors: [
                '63b0e3b6bcd1abace340d8b6'
            ],
            gender: 'mujeres',
            size: 'L',
            fit: 'regular',
            internalCondition: 5,
            externalCondition: 5,
            tags: [
                'traje',
                'casual',
                'zara',
                'blanco',
                'mujeres',
                'conjunto',
                'zebra'
            ],
            isSold: false
        },
        {
            title: 'Blusa Top Color Malva',
            slug: 'blusa_top_color_malva',
            description: 'Blusa tipo top color malva, parte de la colección de Pull & Bear para el verano de 2021.',
            information: [
                '63c8b52a8482840a87c890e6',
                '63c8b52a8482840a87c890e7'
            ],
            category: 'tops',
            price: 300,
            discount: 0,
            images: [
                'https://res.cloudinary.com/killer-diller/image/upload/v1683597375/killer-diller/lnmi6dwyqnjvxanikcw1.jpg'
            ],
            brand: '63a23bb1f3ebfcd4f32d192b',
            colors: [
                '63b0e3b6bcd1abace340d8b9'
            ],
            gender: 'mujeres',
            size: 'S',
            fit: 'slim',
            internalCondition: 5,
            externalCondition: 5,
            tags: [
                'top',
                'pull&bear',
                'magenta',
                'mujeres',
                'blusa',
                'verano'
            ],
            isSold: false
        },
        {
            title: 'Vestido Rosa Pastel con Cuello',
            slug: 'vestido_rosa_pastel_con_cuello',
            description: 'Vestido de algodón color rosa pastel con cuello y terminado en capas por la parte inferior de la prenda.',
            information: [
                '63c8b52a8482840a87c890e6',
                '63c8b52a8482840a87c890e7'
            ],
            category: 'vestidos',
            price: 500,
            discount: 0,
            images: [
                'https://res.cloudinary.com/killer-diller/image/upload/v1683597374/killer-diller/fvgkclek6szcnkqnymv5.jpg'
            ],
            brand: '63a23bb1f3ebfcd4f32d1929',
            colors: [
                '63b0e3b6bcd1abace340d8b8'
            ],
            gender: 'mujeres',
            size: 'M',
            fit: 'regular',
            internalCondition: 5,
            externalCondition: 5,
            tags: [
                'vestido',
                'zara',
                'rosa',
                'mujeres',
                'capas',
                'cuello'
            ],
            isSold: false
        },
        {
            title: 'Vestido Desmangado Rosa Mexicano',
            slug: 'vestido_desmangado_rosa_mexicano',
            description: 'Vestido sencillo con diseño sin mangas, color rosa mexicano.',
            information: [
                '63c8b52a8482840a87c890e6',
                '63c8b52a8482840a87c890e7'
            ],
            category: 'vestidos',
            price: 400,
            discount: 0,
            images: [
                'https://res.cloudinary.com/killer-diller/image/upload/v1683597374/killer-diller/ivlqrabbgqphrjfq1ihy.jpg'
            ],
            brand: '63a23bb1f3ebfcd4f32d192a',
            colors: [
                '63b0e3b6bcd1abace340d8b7'
            ],
            gender: 'mujeres',
            size: 'L',
            fit: 'slim',
            internalCondition: 4.5,
            externalCondition: 4.5,
            tags: [
                'vestido',
                'zara',
                'rosa',
                'mujeres',
                'desmangado',
            ],
            isSold: false
        }
    ],
    events: [
        {
            title: 'Día de San Valentín',
            description: '15% de descuento en prendas y accesorios con los colores blanco y rojo',
            date: '2023/02/14',
            image: 'https://res.cloudinary.com/killer-diller/image/upload/v1683597377/killer-diller/muhwk6gar96lgq49sqaf.jpg'
        },
        {
            title: 'Día de la Madre',
            description: '20% de descuento en prendas y accesorios para mujeres',
            date: '2023/05/10',
            image: 'https://res.cloudinary.com/killer-diller/image/upload/v1683597377/killer-diller/y1ggnmotvmd5bfuqo1sx.jpg'
        }
    ]
};