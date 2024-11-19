// Formik
import { useFormik } from 'formik'

// Utils
import { FileParser } from '../utils/FileParser';

// Yup
import * as Yup from 'yup'

// redux
import { useDispatch } from 'react-redux'
import { loggedUserAction } from '../store/userSlice'

// router
import { useNavigate } from 'react-router-dom'

function FormComponent() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Validation IMG

    // type
    const VALID_TYPE = ['image/png', 'image/jpg', 'image/jpeg']

    //size
    const KB = 1024;
    const MB = KB * 1024;

    const Formik = useFormik({

        // 1. initialValues
        initialValues: {
            firstName: '',
            lastName: '',
            // Nastavak
            birthDate: '',
            email: '',
            password: '',
            gender: '',
            image: ''
        },

        // 2. Validation
        validationSchema: Yup.object({
            firstName: 
            Yup
            .string()
            .required('This field is required!'),
            lastName: 
            Yup
            .string()
            .required('This field is required!'),
            birthDate: 
            Yup
            .string()
            .required('This field is required!'),
            email: 
            Yup
            .string()
            .email('Invalid E-Mail')
            .required('This field is required!'),
            password: 
            Yup
            .string()
            .min(8, 'Password must be atleast 8 character long!')
            .required('This field is required!'),
            gender: 
            Yup
            .string()
            .required('This field is required!'),
            image: 
            Yup
            .mixed()
            .required('Image is required!')
            .test('fileType', 'File type must be JPG/PNG/JPEG!', (value) => VALID_TYPE.includes(value.type))
            .test('fileSize', 'File size over 2MB!', (value) => value.size < MB * 2)
        }),

        // 3. onSubmit
        onSubmit : (values) => {
            // console.log(values);
            FileParser(values.image)
                .then((res) => {
                    dispatch(loggedUserAction({ ...values, image: res }))
                    navigate('/')
                })
                .catch((err) => console.log(err))
            Formik.resetForm()
        }
    });

    // * SHOW ERROR 
    const showError = (name) => 
        Formik.errors[name] &&
        Formik.touched[name] &&
        Formik.errors[name];

    return (
        <form 
        onSubmit={Formik.handleSubmit}
        className='bg-slate-300 p-[22px] mt-[22px] rounded-lg flex flex-col gap-[12px] w-full md:w-[500px] md:mx-auto'>
            {/* First Name */}
            <div className='flex flex-col'>
                <label 
                htmlFor="first_name"
                className='text-[16px] text-gray-600'
                >First Name
                <span className='text-[14px] ml-[12px] text-red-500'>
                    {showError('firstName')}
                </span>
                </label>
                <input 
                    id="first_name"
                    type="text" 
                    placeholder="Insert First Name" 
                    name='firstName'
                    value={Formik.values.firstName}
                    onChange={Formik.handleChange}
                    className='outline-none px-[16px] py-[8px] rounded-lg'
                />
            </div>
            {/* Last Name */}
            <div className='flex flex-col'>
                <label 
                htmlFor="last_name"
                className='text-[16px] text-gray-600'
                >Last Name
                <span className='text-[14px] ml-[12px] text-red-500'>
                    {showError('lastName')}
                </span>
                </label>
                <input 
                    id="last_name" 
                    type="text" 
                    placeholder="Insert Last Name" 
                    name='lastName'
                    value={Formik.values.lastName}
                    onChange={Formik.handleChange}
                    className='outline-none px-[16px] py-[8px] rounded-lg'
                />
            </div>
            {/* Birth Date */}
            <div className='flex flex-col'>
                <label 
                htmlFor="birthDate"
                className='text-[16px] text-gray-600'
                >Birth Date
                <span className='text-[14px] ml-[12px] text-red-500'>
                    {showError('birthDate')}
                </span>
                </label>
                <input 
                    id="birthDate" 
                    type="date" 
                    name='birthDate'
                    value={Formik.values.birthDate}
                    onChange={Formik.handleChange}
                    className='outline-none px-[16px] py-[8px] rounded-lg'
                />
            </div>
            {/* E-Mail */}
            <div className='flex flex-col'>
                <label 
                htmlFor="email"
                className='text-[16px] text-gray-600'
                >E-Mail
                <span className='text-[14px] ml-[12px] text-red-500'>
                    {showError('email')}
                </span>
                </label>
                <input 
                    id="email" 
                    type="email" 
                    placeholder="Insert E-Mail" 
                    name='email'
                    value={Formik.values.email}
                    onChange={Formik.handleChange}
                    className='outline-none px-[16px] py-[8px] rounded-lg'
                />
            </div>
            {/* Password */}
            <div className='flex flex-col'>
                <label 
                htmlFor="password"
                className='text-[16px] text-gray-600'
                >Password
                <span className='text-[14px] ml-[12px] text-red-500'>
                    {showError('password')}
                </span>
                </label>
                <input 
                    id="password" 
                    type="password" 
                    placeholder="Insert Password" 
                    name='password'
                    value={Formik.values.password}
                    onChange={Formik.handleChange}
                    className='outline-none px-[16px] py-[8px] rounded-lg'
                />
            </div>
            {/* Gender */}
            <div className='flex flex-col'>
                <label 
                htmlFor="gender"
                className='text-[16px] text-gray-600'
                >Gender
                <span className='text-[14px] ml-[12px] text-red-500'>
                    {showError('gender')}
                </span>
                </label>
                <select 
                name="" 
                id="gender"
                value={Formik.values.gender}
                onChange={Formik.handleChange}
                className='outline-none px-[16px] py-[8px] rounded-lg'
                >
                    <option value="" defaultChecked>Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            {/* Image */}
            <div className='flex flex-col'>
                <label 
                htmlFor="image"
                className='text-[16px] text-gray-600'
                >Image
                <span className='text-[14px] ml-[12px] text-red-500'>
                    {showError('image')}
                </span>
                </label>
                <input 
                    id="image" 
                    type="file" 
                    name='image'
                    onChange={(e) => Formik.setFieldValue(
                        e.target.name,
                        e.target.files[0]
                    )}
                    className='outline-none px-[16px] py-[8px] rounded-lg'
                />
            </div>
            

            <button 
            type='submit'
            className='bg-blue-400 text-black px-[16px] py-[8px] rounded-lg mt-[20px]'
            >Register</button>
        </form>
    )
}

export default FormComponent