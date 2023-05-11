import {COURSE_LANGUAGES} from "../../constants/courses";
import {NOTIFICATION_TYPES} from "../../constants/notifications";

export const getNotifications = [
    {
        id: 1,
        language: COURSE_LANGUAGES.EN_UA,
        type: NOTIFICATION_TYPES.DISCOUNT,
        isPublished: false,
        titles: [
            {
                id: 1,
                language: "en",
                text: "enG Notification Title"
            },
            {
                id: 2,
                language: "ua",
                text: "ua Notification Title"
            }
        ],
        description: [
            {
                id: 1,
                language: "en",
                text: "enG Notification Desc "
            },
            {
                id: 2,
                language: "ua",
                text: "ua Notification Desc "
            }
        ]
    },
    {
        id: 1,
        language: COURSE_LANGUAGES.EN_UA,
        type: NOTIFICATION_TYPES.DISCOUNT,
        isPublished: false,
        titles: [
            {
                id: 2,
                language: "en",
                text: "enG Notification Title 2"
            },
            {
                id: 2,
                language: "ua",
                text: "ua Notification Title 2"
            }
        ],
        description: [
            {
                id: 1,
                language: "en",
                text: "enG Notification Desc 2"
            },
            {
                id: 2,
                language: "ua",
                text: "ua Notification Desc 2"
            }
        ]
    },
];

const postNotification = {
    language: COURSE_LANGUAGES.EN_UA,
    type: NOTIFICATION_TYPES.DISCOUNT,
    isPublished: false,
    titles: [
        {
            language: "en",
            text: "enG Notification Title"
        },
        {
            language: "ua",
            text: "ua Notification Title"
        }
    ],
    description: [
        {
            language: "en",
            text: "enG Notification Desc "
        },
        {
            language: "ua",
            text: "ua Notification Desc "
        }
    ]
}

const editNotification1 = {
    type: NOTIFICATION_TYPES.NEW_COURSE,
    titles: [
        {
            language: "en",
            text: "New enG Notification Title"
        },
        {
            language: "ua",
            text: "New ua Notification Title"
        }
    ],
}

const editNotification1Published = {
    isPublished: true
}

const deleteNotification1 = 1