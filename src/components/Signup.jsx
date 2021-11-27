import { useFormik } from 'formik';
import * as Yup from 'yup';

const Signup = () => {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().max(15, 'Name must be less than 15 characters').required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email address is required'),
            password: Yup.string().min(8, 'Password must be at least 8 characters').max(15, 'Password must be less than or equal to 20 characters').required('Password is required')
        }),
        onSubmit: (data) => {
            console.log(data);
        }
    });

    return (
        <>
            <h1 className="title">Signup Form</h1>
            <form className="signup-form" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter name..." />
                    {formik.touched.name && formik.errors.name ? <p className="error">{formik.errors.name}</p> : null}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter email..." />
                    {formik.touched.email && formik.errors.email ? <p className="error">{formik.errors.email}</p> : null}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter password..." />
                    {formik.touched.password && formik.errors.password ? <p className="error">{formik.errors.password}</p> : null}
                </div>
                <div className="form-group">
                    <input type="submit" className="btn"value="Submit" />
                </div>
            </form>
        </>
    );

};

export default Signup;
