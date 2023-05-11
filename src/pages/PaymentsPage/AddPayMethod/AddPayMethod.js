import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom';

import CustomSelect from './CustomSelect/CustomSelect';
import Layout from '../../../components/common/Layout/Layout';
import InputField from "../../../components/common/InputField/InputField";

import {buildDefaultTitle, courseTextDataBuild} from "../../../utils/courseUtil";

import {COURSE_LANGUAGES} from "../../../constants/courses";
import {MAX_TITLE_SYMBOLS_AMOUNT, MODES, TITLE_TYPES} from "../../../constants/general";
import {PAYMENT_CURRENCIES, PAYMENT_TYPES} from "../../../constants/payments";

import {useCoursesContext} from "../../../context/coursesContext";
import {useStudentsContext} from "../../../context/studentsContext";
import {useSubscriptionContext} from "../../../context/subscriptionsContext";

import styles from './AddPayMethod.module.scss';

const optionPrice = [
  {value: 'USD', label: 'USD'},
  // {value: 'UAH', label: 'UAH'},
];

const optionSubscribe = [
  {value: 'monthly', label: '1 місяць'},
  {value: 'halfYear', label: '6 місяців'},
  {value: 'annual', label: '1 рік'},
  {value: 'lifetime', label: 'Lifetime'}
];

const AddPayMethod = ({ mode = MODES.CREATE }) => {
  const navigate = useNavigate()
  const { subscriptionId } = useParams();

  const { courses } = useCoursesContext();
  const { students, getStudents } = useStudentsContext();
  const { getSubscription, subscription, addSubscription, editSubscription } = useSubscriptionContext();

  const [payNameUkr, setPayNameUkr] = useState(buildDefaultTitle());
  const [payNameEng, setPayNameEng] = useState(buildDefaultTitle(COURSE_LANGUAGES.EN));
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState(PAYMENT_CURRENCIES.USD);
  const [published, setPublished] = useState(false);

  const [paymentType, setPaymentType] = useState(PAYMENT_TYPES.MONTHLY);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([])

  const handleClick = async () => {
    const data = {
      titles: courseTextDataBuild(payNameUkr, payNameEng, COURSE_LANGUAGES.EN_UA),
      type: paymentType,
      courses: selectedCourses,
      students: selectedStudents,
      price,
      currency,
      published: published
    }

    mode === MODES.CREATE ? await addSubscription(data) : await editSubscription(subscriptionId, data)
    navigate(-1);
  }

  const handleSelectPaymentType = ({ value }) => {
    setPaymentType(value)
  }

  const handleSelectCourse = (courses) => {
    setSelectedCourses(courses?.map(course => course.value))
  }

  const handleSelectStudent = (students) => {
    setSelectedStudents(students?.map(student => student.value))
  }

  const handleCurrencySelect = ({ value }) => {
    setCurrency(value)
  }

  const handleUATitleChange = (value) => setPayNameUkr(prevState => ({ ...prevState, text: value}));
  const handleENTitleChange = (value) => setPayNameEng(prevState => ({ ...prevState, text: value}));

  const validate = () => {
    return !payNameUkr?.text?.length || !payNameEng?.text?.length  || !selectedCourses.length || !selectedStudents.length ;
  };

  useEffect(() => {
    if (!!subscription) {
      setPayNameEng(mode === MODES.CREATE ? buildDefaultTitle(COURSE_LANGUAGES.EN) : subscription?.titles?.find(title => title.language === COURSE_LANGUAGES.EN))
      setPayNameUkr(mode === MODES.CREATE ? buildDefaultTitle() : subscription?.titles?.find(title => title.language === COURSE_LANGUAGES.UA))
      setPrice(mode === MODES.CREATE ? 0 : subscription?.price)
      setPublished(mode === MODES.CREATE ? false : subscription?.published)
      setPaymentType(mode === MODES.CREATE ? PAYMENT_TYPES.MONTHLY : subscription?.is_lifetime ? PAYMENT_TYPES.LIFETIME : subscription?.type )
      setSelectedCourses(mode === MODES.CREATE ? [] : subscription?.courses)
      setSelectedStudents(mode === MODES.CREATE ? [] : subscription?.students?.map(selStudent => {
        return students?.find(student => student.id === selStudent.id)
      }))
    }
  }, [subscription, students])

  useEffect(() => {
    if (!!subscriptionId) {
      getSubscription(subscriptionId)
    }
  }, [subscriptionId])

  useEffect(() => {
    getStudents()
  }, [])

  return (
    <Layout type={mode === MODES.CREATE ? TITLE_TYPES.ADD_PAYMENT : TITLE_TYPES.EDIT_PAYMENT} buttonName="Назад">
      <div className={styles.container}>
        <div className={styles.name}>
          <div className={styles.name_title}>Назва плану</div>
          <div className={styles.name_container}>
            <InputField
              inputEng={payNameEng?.text}
              inputUkr={payNameUkr?.text}
              setInputEng={handleENTitleChange}
              setInputUkr={handleUATitleChange}
              courseLanguage={COURSE_LANGUAGES.EN_UA}
              symbol={MAX_TITLE_SYMBOLS_AMOUNT}
            />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.content_title}>Вид підписки</div>
          <div className={styles.content_select}>
            <CustomSelect
              options={optionSubscribe}
              defaultValue={optionSubscribe.find(option => option.value === paymentType)}
              handleSelect={handleSelectPaymentType}
            />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.content_title}>Виберіть курси, що входять до цього пакету</div>
          <div className={styles.content_select}>
            <CustomSelect
              options={courses?.map(course => ({ value: course, label: course.titles[0].text }))}
              isMulti
              defaultValue={selectedCourses?.map(course => ({ value: course, label: course?.titles[0]?.text }))}
              handleSelect={handleSelectCourse}
            />
          </div>
        </div>
        <div className={styles.price}>
          <div className={styles.price_title}>Ціна</div>
          <div className={styles.price_container}>
            <input
              type="number"
              min="0"
              className={styles.input}
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
            <div className={styles.price_container_dropdown} >
              <CustomSelect
                  options={optionPrice}
                  defaultValue={optionPrice[0]}
                  handleSelect={handleCurrencySelect} />
            </div>
          </div>
          {/*{!price?.length && <b className={styles.error}>Поле не має бути пустым</b>}*/}
        </div>
        <div className={styles.content}>
          <div className={styles.content_title}>Вибір студентів</div>
          <div className={styles.content_select}>
            <CustomSelect
                options={students?.map(student => ({ value: student, label: student.fullname }))}
                isMulti
                defaultValue={selectedStudents?.map(student => ({ value: student, label: student?.fullname }))}
                handleSelect={handleSelectStudent}
            />
          </div>
        </div>
        <button disabled={validate()} className={styles.button} onClick={handleClick}>Зберегти</button>
      </div>
    </Layout>
  )
}

export default AddPayMethod
