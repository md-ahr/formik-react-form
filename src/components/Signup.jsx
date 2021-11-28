import { useFormik } from 'formik';
import * as Yup from 'yup';

const Signup = () => {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            profession: '',
            phone: '',
            password: '',
            confirmPassword: '',
            description: '',
            gender: '',
            acceptTerms: false
        },
        validationSchema: Yup.object({
            name: Yup.string().max(15, 'Name must be less than 15 characters').required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email address is required'),
            profession: Yup.string().required('Profession is required'),
            phone: Yup.number().required('Phone number is required'),
            password: Yup.string().required('Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, 'At least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'),
            confirmPassword: Yup.string().required('Confirm password is required').when('password', {
                is: val => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                  [Yup.ref('password')],
                  'Password does not matched'
                )}),
            description: Yup.string().required('Description is required').min(60, 'At least 60 characters required'),
            gender: Yup.string().required(),
            acceptTerms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required')
        }),
        onSubmit: (data, { resetForm }) => {
            resetForm();
            console.log(data);
        }
    });

    return (
        <>
            <h1 className="title">Signup Form</h1>
            <form className="signup-form" onSubmit={formik.handleSubmit}>
                <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" className={formik.touched.name && formik.errors.name ? 'error-field' : ''} value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter name..." />
                        {formik.touched.name && formik.errors.name ? <p className="error">{formik.errors.name}</p> : null}
                    </div>
                    <div className="form-group" style={{ marginLeft: '20px' }}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" className={formik.touched.email && formik.errors.email ? 'error-field' : ''} value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter email..." />
                        {formik.touched.email && formik.errors.email ? <p className="error">{formik.errors.email}</p> : null}
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
                    <div className="form-group">
                        <label htmlFor="profession">Profession</label>
                        <select name="profession" className={formik.touched.profession && formik.errors.profession ? 'error-field' : ''} value={formik.values.profession} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                            <option value="">Select Profession</option>
                            <option value="1">Student</option>
                            <option value="2">Teacher</option>
                            <option value="3">Doctor</option>
                            <option value="4">Engineer</option>
                            <option value="5">Others</option>
                        </select>
                        {formik.touched.profession && formik.errors.profession ? <p className="error">{formik.errors.profession}</p> : null}
                    </div>
                    <div className="form-group" style={{ marginLeft: '20px' }}>
                        <label htmlFor="phone">Phone Number</label>
                        <input type="text" name="phone" className={formik.touched.phone && formik.errors.phone ? 'error-field' : ''} value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter phone number..." />
                        {formik.touched.phone && formik.errors.phone ? <p className="error">{formik.errors.phone}</p> : null}
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" className={formik.touched.password && formik.errors.password ? 'error-field' : ''} value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter password..." />
                        {formik.touched.password && formik.errors.password ? <p className="error">{formik.errors.password}</p> : null}
                    </div>
                    <div className="form-group" style={{ marginLeft: '20px' }}>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name="confirmPassword" className={formik.touched.confirmPassword && formik.errors.confirmPassword ? 'error-field' : ''} value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter confirm password..." />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p className="error">{formik.errors.confirmPassword}</p> : null}
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" rows="4" className={formik.touched.description && formik.errors.description ? 'error-field' : ''} value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter your description..."></textarea>
                        {formik.touched.description && formik.errors.description ? <p className="error">{formik.errors.description}</p> : null}
                    </div>
                    <div className="form-group" style={{ marginLeft: '20px' }}>
                        <label htmlFor="gender">Gender</label>
                        <span>
                            <input type="radio" name="gender" value="male" onChange={formik.handleChange} /> Male
                        </span>
                        <span style={{ marginLeft: '20px' }}>
                            <input type="radio" name="gender" value="female" onChange={formik.handleChange} /> Female
                        </span>
                        {formik.touched.gender && formik.errors.gender ? <p className="error">{formik.errors.gender}</p> : null}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="acceptTerms">
                        <input type="checkbox" name="acceptTerms" className={formik.touched.acceptTerms && formik.errors.acceptTerms ? 'error-field' : ''} value={formik.values.acceptTerms} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        &nbsp; You should agree with our terms and conditions
                    </label>
                    {formik.touched.acceptTerms && formik.errors.acceptTerms ? <p className="error">{formik.errors.acceptTerms}</p> : null}
                </div>
                <div className="form-group">
                    <input type="submit" className="btn"value="Submit" />
                </div>
            </form>
        </>
    );

};

export default Signup;
