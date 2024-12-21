import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react"
import { Helmet } from "react-helmet"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
export default function ForgotPassword() {
    const [oneClick, setOneClick] = useState(true)
    const navigate = useNavigate()
    const validationSchema = Yup.object({
        email: Yup.string().required().email(),
    })
    async function sendToLogin(Values) {
        let toastId;
        try {
            if (oneClick) {
                setOneClick(false)
                const options = {
                    url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
                    method: "POST",
                    data: Values
                }
                toastId = toast.loading("Waiting...")
                const { data } = await axios.request(options)
                toast.success(data.message)
                setTimeout(function () {
                    if (data.message) {
                        navigate("/auth/VerverifyCode")
                        setOneClick(true)
                    }
                }, 2500)
            }
        } catch (error) {
            setOneClick(true)
            toast.error("There is no user registered with this email address")
        } finally {
            toast.dismiss(toastId)
        }
    }
    const Formik = useFormik({
        initialValues: {
            "email": ""
        },
        onSubmit: sendToLogin,
        validationSchema
    })
    return <>
        <Helmet>
            <title>Forget password</title>
        </Helmet>
        <section>
            <h2 className="text-Success space-x-2 text-2xl mb-2">
                <i className="fa-regular fa-circle-user"></i>
                <span>Forget password</span>
                <i className="fa-solid fa-key text-lg"></i>
            </h2>
            <form action="" className="space-y-2" onSubmit={Formik.handleSubmit}>
                <div>
                    <input type="email" autoComplete="on" placeholder="Email" className="form-control w-full"
                        name="email" value={Formik.values.email} onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                    />
                    {Formik.errors.email && Formik.touched.email ? <div className="text-red-600 text-base font-semibold flex ">* {Formik.errors.email}</div> : ""}
                </div>
                <div className="flex flex-col items-start mt-2" style={{ margin: 0 }}>
                    <button type="submit" className="btn-success uppercase mt-2">Send</button>
                </div>
            </form>
        </section>
    </>
}
