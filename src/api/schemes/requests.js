export const getCourses = [
    {
        id: 1,
        titles: [
            {
                id: 1,
                language: "EN",
                text: "ENG Title",
            },
            {
                id: 2,
                language: "UA",
                text: "UA Title",
            },
        ],
        published: false,
        language: "EN_UA"
    },
    {
        id: 2,
        titles: [
            {
                id: 1,
                language: "EN",
                text: "ENG Title 2",
            },
            {
                id: 2,
                language: "UA",
                text: "UA Title 2",
            },
        ],
        published: true,
        language: "EN_UA"
    },
]

export const getCourse1 = {
    id: 1,
    titles: [
        {
            id: 1,
            language: "EN",
            text: "ENG Title"
        },
        {
            id: 2,
            language: "UA",
            text: "UA Title"
        },
    ],
    published: false,
    language: "EN_UA",
    description: [
        {
            id: 1,
            language: "EN",
            text: "ENG Description"
        },
        {
            id: 2,
            language: "UA",
            text: "UA Description"
        },
    ],
    topics: [
        {
            id: 1,
            titles: [
                {
                    id: 1,
                    language: "EN",
                    text: "ENG Topic Title",
                },
                {
                    id: 2,
                    language: "UA",
                    text: "UA Topic Title"
                },
            ]
        },
        {
            id: 2,
            titles: [
                {
                    id: 1,
                    language: "EN",
                    text: "ENG Topic Title 2"
                },
                {
                    id: 2,
                    language: "UA",
                    text: "UA Topic Title 2"
                },
            ]
        },
    ]
}

export const getTopic1 = {
    id: 1,
    titles: [
        {
            id: 1,
            language: "EN",
            text: "ENG Topic Title"
        },
        {
            id: 2,
            language: "UA",
            text: "UA Topic Title"
        },
    ],
    isFree: false,
    lessons: [
        {
            id: 1,
            titles: [
                {
                    id: 1,
                    language: "EN",
                    text: "ENG Lesson Title"
                },
                {
                    id: 2,
                    language: "UA",
                    text: "UA Lesson Title"
                }
            ]
        },
        {
            id: 2,
            titles: [
                {
                    id: 1,
                    language: "EN",
                    text: "ENG Lesson Title 2"
                },
                {
                    id: 2,
                    language: "UA",
                    text: "UA Lesson Title 2"
                }
            ]
        },
    ],
    quizzes: [
        {
            id: 1,
            titles: [
                {
                    id: 1,
                    language: "EN",
                    text: "ENG Quiz Title"
                },
                {
                    id: 2,
                    language: "UA",
                    text: "UA Quiz Title"
                }
            ]
        },
        {
            id: 2,
            titles: [
                {
                    id: 1,
                    language: "EN",
                    text: "ENG Quiz Title 2"
                },
                {
                    id: 2,
                    language: "UA",
                    text: "UA Quiz Title 2"
                }
            ]
        },
    ]
}

export const getLesson1 = {
    id: 1,
    titles: [
        {
            id: 1,
            language: "EN",
            text: "ENG Lesson Title"
        },
        {
            id: 2,
            language: "UA",
            text: "UA Lesson Title"
        }
    ],
    lessonParts: [
        {
            id: 1,
            titles: [
                {
                    id: 1,
                    language: "EN",
                    text: "ENG Lesson Part Title"
                },
                {
                    id: 2,
                    language: "UA",
                    text: "UA Lesson Part Title"
                }
            ],
        },
        {
            id: 1,
            titles: [
                {
                    id: 1,
                    language: "EN",
                    text: "ENG Lesson Part Title"
                },
                {
                    id: 2,
                    language: "UA",
                    text: "UA Lesson Part Title"
                }
            ],
        },
    ]
}

export const getQuiz1 = {
    id: 1,
    titles: [
        {
            id: 1,
            language: "EN",
            text: "ENG Quiz Title"
        },
        {
            id: 2,
            language: "UA",
            text: "UA Quiz Title"
        }
    ],
    questions: [
        {
            id: 1,
            titles: [
                {
                    id: 1,
                    language: "EN",
                    text: "ENG Quiz Question Title"
                },
                {
                    id: 2,
                    language: "UA",
                    text: "UA Quiz Question Title"
                }
            ],
            type: "one",
            answers: [
                {
                    id: 1,
                    titles: [
                        {
                            id: 1,
                            language: "EN",
                            text: "ENG Quiz Question Answer Title"
                        },
                        {
                            id: 2,
                            language: "UA",
                            text: "UA Quiz Question Answer Title"
                        }
                    ],
                    isCorrect: false
                },
                {
                    id: 2,
                    titles: [
                        {
                            id: 1,
                            language: "EN",
                            text: "ENG Quiz Question Answer Title 2"
                        },
                        {
                            id: 2,
                            language: "UA",
                            text: "UA Quiz Question Answer Title 2"
                        }
                    ],
                    isCorrect: true
                },
            ]
        }
    ]
}

export const postCourse = {
    titles: [
        {
            language: "EN",
            text: "ENG Title"
        },
        {
            language: "UA",
            text: "UA Title"
        },
    ],
    language: "EN_UA"

}

export const postCourse1Description = {
    description: [
        {
            language: "EN",
            text: "ENG Description"
        },
        {
            language: "UA",
            text: "UA Description"
        },
    ]
}

export const postTopic1Lesson = {
    titles: [
        {
            language: "EN",
            text: "ENG Lesson Title"
        },
        {
            language: "UA",
            text: "UA Lesson Title"
        },
    ],
}

export const postTopic1Quiz = {
    titles: [
        {
            language: "EN",
            text: "ENG Lesson Title"
        },
        {
            language: "UA",
            text: "UA Lesson Title"
        },
    ],
}

export const postQuiz1Question = {
    titles: [
        {
            language: "EN",
            text: "ENG Quiz Question Title"
        },
        {
            language: "UA",
            text: "UA Quiz Question Title"
        }
    ],
    type: "one",
    answers: [
        {
            titles: [
                {
                    language: "EN",
                    text: "ENG Quiz Question Answer Title"
                },
                {
                    language: "UA",
                    text: "UA Quiz Question Answer Title"
                }
            ],
            isCorrect: false
        },
        {
            titles: [
                {
                    language: "EN",
                    text: "ENG Quiz Question Answer Title 2"
                },
                {
                    language: "UA",
                    text: "UA Quiz Question Answer Title 2"
                }
            ],
            isCorrect: true
        },
    ]
}

// const patchCourse1Description = [
//     {
//         id: 1,
//         language: "EN",
//         text: "ENG Description"
//     }
// ]
//
// // Multiple Description Patch
// const patchCourse1Description = [
//     {
//         id: 1,
//         language: "EN",
//         text: "ENG Description"
//     },
//     {
//         id: 2,
//         language: "UA",
//         text: "UA Description"
//     }
// ]
//
// // Full Topic Change
// const patchTopic1 = {
//     id: 1,
//     titles: [
//         {
//             id: 1,
//             language: "EN",
//             text: "ENG Topic Title"
//         },
//         {
//             id: 2,
//             language: "UA",
//             text: "UA Topic Title"
//         },
//     ],
//     isFree: false,
// }
//
// // Partial Topic Change
// const patchTopic1 = {
//     id: 1,
//     titles: [
//         {
//             id: 1,
//             language: "EN",
//             text: "ENG Topic Title"
//         },
//         {
//             id: 2,
//             language: "UA",
//             text: "UA Topic Title"
//         },
//     ],
//     isFree: false,
// }

// const postLesson1Part = {
//     titles: [
//         {
//             language: "EN",
//             text: "ENG Lesson Title"
//         },
//         {
//             language: "UA",
//             text: "UA Lesson Title"
//         },
//     ],
// }

// const getLessonPart1 = {
//     id: 1,
//     titles: [
//         {
//             language: "EN",
//             text: "ENG Lesson Part Title"
//         },
//         {
//             language: "UA",
//             text: "UA Lesson Part Title"
//         }
//     ],
//
// }

const getFAQs = [
    {
        id: 1,
        language: "en_ua",
        titles: [
            {
                id: 1,
                language: "EN",
                text: "ENG FAQ Title"
            },
            {
                id: 2,
                language: "UA",
                text: "UA FAQ Title"
            }
        ],
        text: [
            {
                id: 1,
                language: "EN",
                text: "ENG FAQ Text"
            },
            {
                id: 2,
                language: "UA",
                text: "UA FAQ Text"
            }
        ],
        index: 0
    },
    {
        id: 2,
        language: "en_ua",
        titles: [
            {
                id: 3,
                language: "EN",
                text: "ENG FAQ Title"
            },
            {
                id: 4,
                language: "UA",
                text: "UA FAQ Title"
            }
        ],
        text: [
            {
                id: 3,
                language: "EN",
                text: "ENG FAQ Text"
            },
            {
                id: 4,
                language: "UA",
                text: "UA FAQ Text"
            }
        ],
        index: 1
    },
];

const getFAQ1 = {
    id: 1,
    language: "en_ua",
    titles: [
        {
            id: 1,
            language: "EN",
            text: "ENG FAQ Title"
        },
        {
            id: 2,
            language: "UA",
            text: "UA FAQ Title"
        }
    ],
    text: [
        {
            id: 1,
            language: "EN",
            text: "ENG FAQ Text"
        },
        {
            id: 2,
            language: "UA",
            text: "UA FAQ Text"
        }
    ],
    index: 0
}

const postFAQ =  {
    language: "en",
    titles: [
        {
            language: "EN",
            text: "ENG FAQ Title"
        }
    ],
    text: [
        {
            language: "EN",
            text: "ENG FAQ Text"
        }
    ]
}

const patchFAQ1 = {
    titles: [
        {
            language: "EN",
            text: "New ENG FAQ Title"
        }
    ],
    text: [
        {
            language: "EN",
            text: "New ENG FAQ Text"
        }
    ]
}

const deleteFAQ1 = 1

const getTopic1 = {
    id: 1,
    titles: [
        {
            id: 1,
            language: "EN",
            text: "ENG Topic Title"
        },
        {
            id: 2,
            language: "UA",
            text: "UA Topic Title"
        },
    ],
    isFree: false,
    lessons: [
        {
            id: 1,
            titles: [
                {
                    id: 1,
                    language: "EN",
                    text: "ENG Lesson Title"
                },
                {
                    id: 2,
                    language: "UA",
                    text: "UA Lesson Title"
                }
            ],
            quiz: [
                {
                    id: 1,
                    titles: [
                        {
                            id: 1,
                            language: "EN",
                            text: "ENG Quiz Title"
                        },
                        {
                            id: 2,
                            language: "UA",
                            text: "UA Quiz Title"
                        }
                    ]
                },
                {
                    id: 2,
                    titles: [
                        {
                            id: 1,
                            language: "EN",
                            text: "ENG Quiz Title 2"
                        },
                        {
                            id: 2,
                            language: "UA",
                            text: "UA Quiz Title 2"
                        }
                    ]
                },
            ]
        },
        {
            id: 2,
            titles: [
                {
                    id: 1,
                    language: "EN",
                    text: "ENG Lesson Title 2"
                },
                {
                    id: 2,
                    language: "UA",
                    text: "UA Lesson Title 2"
                }
            ],
            quiz: [
                {
                    id: 1,
                    titles: [
                        {
                            id: 1,
                            language: "EN",
                            text: "ENG Quiz Title"
                        },
                        {
                            id: 2,
                            language: "UA",
                            text: "UA Quiz Title"
                        }
                    ]
                }
            ]
        },
    ]
}

const postLesson = {
    titles: [
        {
            language: "EN",
            text: "ENG FAQ Title"
        },
        {
            language: "UA",
            text: "UA FAQ Title"
        }
    ],
    quiz: null
}

const postQuiz = {
    titles: [
        {
            language: "EN",
            text: "ENG FAQ Title"
        },
        {
            language: "UA",
            text: "UA FAQ Title"
        }
    ],
    type: "single",
    answers: {
        1: [
            {
                language: "EN",
                text: "ENG Quiz Answer",
                correct: false
            },
            {
                language: "UA",
                text: "UA Quiz Answer",
                correct: false
            },
        ],
        2: [
            {
                language: "EN",
                text: "ENG Quiz Answer",
                correct: false
            },
            {
                language: "UA",
                text: "UA Quiz Answer",
                correct: false
            },
        ],
        3: [
            {
                language: "EN",
                text: "ENG Quiz Answer",
                correct: true
            },
            {
                language: "UA",
                text: "UA Quiz Answer",
                correct: true
            }
        ]



    }
}

// TODO: решить что делать с англ и укр версиями, как обозначатать язык Топика
const postLesson1LessonPartEng = {
    file: File,
    content: ["lorem", "lorem"]
}

const postLesson1LessonPartUa = {
    file: File,
    content: ["лорем", "лорем"]
}

const patchLesson1 = {
    titles: [
        {
            id: 1,
            language: "EN",
            text: "ENG FAQ Title"
        },
        {
            id: 2,
            language: "UA",
            text: "UA FAQ Title"
        }
    ]
}

const patchLesson1Quiz1 = {
    type: "multiple",
    answers: {
        1: [
            {
                id: 1,
                correct: true
            },
            {
                id: 2,
                correct: true
            },
        ],
    }
}

const patchLesson1LessonPart1 = {
    file: File,
    content: ["lorem1", "lorem2", "lorem10"]
}