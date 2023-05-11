import {COURSE_LANGUAGES} from "../constants/courses";

export const courseTextDataBuild = (UATitle, ENTitle, languageState) => {
    return languageState === COURSE_LANGUAGES.EN_UA ? [ENTitle, UATitle] : languageState === COURSE_LANGUAGES.UA ? [UATitle] : [ENTitle]
}

export const buildDefaultTitle = (language= COURSE_LANGUAGES.UA) => {
    return { text: "", language }
}

export const buildDefaultQuizAnswer = (languageState = COURSE_LANGUAGES.UA) => {
    return {
        id: crypto.randomUUID(),
        titles:
        languageState === COURSE_LANGUAGES.UA
            ? [buildDefaultTitle()]
            : languageState === COURSE_LANGUAGES.EN
                ? [buildDefaultTitle(COURSE_LANGUAGES.EN)]
                : [buildDefaultTitle(), buildDefaultTitle(COURSE_LANGUAGES.EN)]
        , correct: false }
}

export const buildDefaultLessonPartContent = (language = COURSE_LANGUAGES.UA) => {
    return {
        language,
        text: [""],
        file: null,
        filetype: "-"
    }
}

export const buildLessonPartData = (language, uaContent, engContent) => {
    return {
        content: language === COURSE_LANGUAGES.EN_UA ? [uaContent, engContent] : language === COURSE_LANGUAGES.EN ? [engContent] : [uaContent]
    }
}

export const buildLessonPartFileData = (language, uaFile, engFile) => {
    return language === COURSE_LANGUAGES.EN_UA ? [uaFile, engFile] : language === COURSE_LANGUAGES.EN ? [engFile] : [uaFile]
}