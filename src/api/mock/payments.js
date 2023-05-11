import {PAYMENT_CURRENCIES, PAYMENT_TYPES} from "../../constants/payments";

const getPayments = [
    {
        id: 1,
        titles: [
            {
                id: 1,
                language: "en",
                text: "enG Payment Title"
            },
            {
                id: 2,
                language: "ua",
                text: "ua Payment Title"
            }
        ],
        type: PAYMENT_TYPES.LIFETIME,
        courses: [
            {
                id: 1,
                titles: [
                    {
                        id: 1,
                        language: "en",
                        text: "enG Course Title 1"
                    },
                    {
                        id: 2,
                        language: "ua",
                        text: "ua Course Title 1"
                    }
                ]
            },
            {
                id: 2,
                titles: [
                    {
                        id: 3,
                        language: "en",
                        text: "enG Course Title 1"
                    },
                    {
                        id: 4,
                        language: "ua",
                        text: "ua Course Title 1"
                    }
                ]
            }
        ],
        price: { amount: 100, currency: PAYMENT_CURRENCIES.USD },
        published: false,
        students: [
            {
                id: 1,
                name: "John Doe"
            },
            {
                id: 2,
                name: "Jane Doe"
            },
        ]
    }
]

const postPayment = {
    titles: [
        {
            language: "en",
            text: "enG Payment Title"
        },
        {
            language: "ua",
            text: "ua Payment Title"
        }
    ],
    type: PAYMENT_TYPES.ANNUAL,
    courses: [
        {
            id: 1,
            titles: [
                {
                    id: 1,
                    language: "en",
                    text: "enG Course Title 1"
                },
                {
                    id: 2,
                    language: "ua",
                    text: "ua Course Title 1"
                }
            ]
        },
        {
            id: 2,
            titles: [
                {
                    id: 3,
                    language: "en",
                    text: "enG Course Title 1"
                },
                {
                    id: 4,
                    language: "ua",
                    text: "ua Course Title 1"
                }
            ]
        }
    ],
    price: { amount: 350, currency: PAYMENT_CURRENCIES.USD },
    published: false,
    students: [
        {
            id: 1,
            name: "John Doe"
        },
        {
            id: 2,
            name: "Jane Doe"
        },
    ]
}

const pathPayment = {
    id: 2,
    type: PAYMENT_TYPES.RECURRING,
    courses: [
        {
            id: 1,
            titles: [
                {
                    id: 1,
                    language: "en",
                    text: "enG Course Title 1"
                },
                {
                    id: 2,
                    language: "ua",
                    text: "ua Course Title 1"
                }
            ]
        }
    ],
    price: { amount: 450, currency: PAYMENT_CURRENCIES.USD },
}