import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";

import {useCoursesContext} from "../../../../../context/coursesContext";

import InputField from "../../../../common/InputField/InputField";
import Button, {BUTTON_VARIANT} from "../../../../common/Button/Button";

import {MAX_DESCRIPTION_SYMBOLS_AMOUNT, MODES} from "../../../../../constants/general";
import {COURSE_LANGUAGES} from "../../../../../constants/courses";

import {
    buildDefaultLessonPartContent,
    buildLessonPartData,
    buildLessonPartFileData
} from "../../../../../utils/courseUtil";

import styles from "./LessonPartsModal.module.scss";
import FileInput from "../../../../common/FileInput/FileInput";
import LessonPartPreview from "../LessonPartPreview/LessonPartPreview";

const LessonPartsModal = ({ lessonPart, setEdit }) => {
    const mode = lessonPart?.id ? MODES.EDIT : MODES.CREATE;

    const { courseId, lessonId } = useParams();
    const fileFormRef = useRef(null);

    const {
        singleCourse: course,
        getCourse,
        getFile,
        addFile,
        createLessonPart,
        updateLessonPart
    } = useCoursesContext();

    const [uaContent, setUAContent] = useState(
        mode === MODES.CREATE
            ? buildDefaultLessonPartContent()
            : lessonPart?.content.find(content => content.language === COURSE_LANGUAGES.UA)
    );
    const [engContent, setEngContent] = useState(
        mode === MODES.CREATE
            ? buildDefaultLessonPartContent(COURSE_LANGUAGES.EN)
            : lessonPart?.content.find(content => content.language === COURSE_LANGUAGES.EN)
    );
    const [uaFile, setUAFile] = useState(null);
    const [engFile, setEngFile] = useState(null);

    const [uaFilePreviewURL, setUAFilePreviewURL] = useState(null);
    const [engFilePreviewURL, setEngFilePreviewURL] = useState(null);

    const [previewMode, setPreviewMode] = useState(false);
    const [previewLanguage, setPreviewLanguage] = useState(COURSE_LANGUAGES.UA);

    console.log(uaFile)
    console.log(engFile)

    const handleClose = () => setEdit(false);

    const handleOpenPreview = (language) => {
        setPreviewMode(true)
        setPreviewLanguage(language)
    }
    const handleClosePreview = () => {
        setPreviewMode(false)
    }

    const handleGetFile = async () => {
        if (course.language === COURSE_LANGUAGES.EN_UA) {
            setUAFilePreviewURL(await getFile(uaContent.file))
            setEngFilePreviewURL(await getFile(engContent.file))
        } else {
            course.language === COURSE_LANGUAGES.EN ? setEngFilePreviewURL(await getFile(engContent.file)) : setUAFilePreviewURL(await getFile(uaContent.file))
        }
    }

    const handleSetUAContent = (value, index) => {
        setUAContent(prevState => (
            {...prevState, text: prevState.text.map((prevContent, i) => {
                    return i === index ? value : prevContent
                })
            }
        ))
    }

    const handleSetEngContent = (value, index) => {
        setEngContent(prevState => (
            {...prevState, text: prevState.text.map((prevContent, i) => {
                    return i === index ? value : prevContent
                })
            }
        ))
    }

    const handleAddNewText = () => {
        setEngContent(prevState => ({ ...prevState, text: [ ...prevState.text, "" ] }))
        setUAContent(prevState => ({ ...prevState, text: [ ...prevState.text, "" ] }))
    }

    const handleFileChange = (e, language) => {
        let file = e.target.files["0"]

        if (!!file) {
            language === COURSE_LANGUAGES.UA ? setUAFile(file) : setEngFile(file)

            let reader = new FileReader();
            reader.onload = (event) => {
                const URL = event.target.result
                language === COURSE_LANGUAGES.UA ? setUAFilePreviewURL(URL) : setEngFilePreviewURL(URL)
            }

            reader.readAsDataURL(file)
        }
    }

    const handleSave = async () => {
        const data = buildLessonPartData(course.language, { ...uaContent, file: uaFile.name }, { ...engContent, file: engFile.name });
        const fileData = buildLessonPartFileData(course.language, uaFile, engFile);

        const result = mode === MODES.CREATE ? await createLessonPart(lessonId, data) : await updateLessonPart(lessonId, lessonPart.id, data)

        result.content.forEach(async (content, index) => {
            const data = new FormData(fileFormRef.current);
            data.append("media", fileData[index], fileData[index].name)
            await addFile(mode === MODES.CREATE ? content?.id : !index ? uaContent.id : engContent.id, data)
        })

        // fileData.map(async file => {
        //     const data = new FormData(fileFormRef.current);
        //     data.append("media", file, file.name)
        //     await addFile(mode === MODES.CREATE ? result?.id : lessonPart.id, data)
        // })

        handleClose()
    }

    useEffect(() => {
        if (mode === MODES.EDIT) {
            handleGetFile()
        }
    }, [mode])

    useEffect(() => {
        if (!!courseId) {
            getCourse(courseId)
        }
    }, [courseId])

    return (
        <div className={styles.lessonPartModal}>
            <div className={styles.fileWrapper}>
                    {course?.language === COURSE_LANGUAGES.EN_UA ? (
                        <>
                            <FileInput fileName={uaFile?.name || uaContent.file} language={COURSE_LANGUAGES.UA} onChange={handleFileChange} />
                            <FileInput fileName={engFile?.name || engContent.file} language={COURSE_LANGUAGES.EN} onChange={handleFileChange} />
                        </>
                    ) : course?.language === COURSE_LANGUAGES.EN ? (
                        <FileInput fileName={engFile?.name || engContent.file} language={COURSE_LANGUAGES.EN} onChange={handleFileChange} />
                    ) : (
                        <FileInput fileName={uaFile?.name || uaContent.file} language={COURSE_LANGUAGES.UA} onChange={handleFileChange} />
                    )}
                <form action="#" ref={fileFormRef}>
                </form>
            </div>
            <div className={styles.content}>
                {course?.language === COURSE_LANGUAGES.EN_UA || course?.language === COURSE_LANGUAGES.UA ? (
                    uaContent?.text.map((text, index) => (
                        <InputField
                            courseLanguage={course?.language}
                            inputUkr={uaContent.text.at(index)}
                            setInputUkr={(value) => handleSetUAContent(value, index)}
                            inputEng={engContent.text.at(index)}
                            setInputEng={(value) => handleSetEngContent(value, index)}
                            symbol={MAX_DESCRIPTION_SYMBOLS_AMOUNT}
                        />
                    ))
                ) : course?.language === COURSE_LANGUAGES.EN && (
                        engContent?.text.map((text, index) => (
                            <InputField
                                courseLanguage={course?.language}
                                inputUkr={uaContent.text.at(index)}
                                setInputUkr={(value) => handleSetUAContent(value, index)}
                                inputEng={engContent.text.at(index)}
                                setInputEng={(value) => handleSetEngContent(value, index)}
                                symbol={MAX_DESCRIPTION_SYMBOLS_AMOUNT}
                            />
                        ))
                    )}
            </div>
            <div className={styles.controls}>
                <button onClick={handleAddNewText}>+ Абзац</button>
                <button onClick={() => handleOpenPreview(COURSE_LANGUAGES.UA)} >Показати UA</button>
                <button onClick={() => handleOpenPreview(COURSE_LANGUAGES.EN)} >Показати ENG</button>
            </div>
            <div className={styles.buttons}>
                <Button onClick={handleSave}>
                    Зберегти
                </Button>
                <Button onClick={handleClose} variant={BUTTON_VARIANT.SECONDARY}>
                    Скасувати
                </Button>
            </div>
            {previewMode && <LessonPartPreview
                active={previewMode}
                close={handleClosePreview}
                content={previewLanguage === COURSE_LANGUAGES.UA ? {
                    ...uaContent,
                    file: uaFilePreviewURL || uaFile
                } : {
                    ...engContent,
                    file: engFilePreviewURL || engFile
                } }
            />}
        </div>
    );
};

export default LessonPartsModal;