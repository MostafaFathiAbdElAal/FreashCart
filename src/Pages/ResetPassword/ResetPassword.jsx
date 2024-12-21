import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react"
import { Helmet } from "react-helmet"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import * as Yup from "yup"
export default function ResetPassword() {
    const [errorMessage, setErrorMessage] = useState(null)
    const [oneClick, setOneClick] = useState(true)
    const navigate = useNavigate()
    const [errorRespose, setErrorRespose] = useState(null)
    const passwordRegex = /^[A-Z][0-9a-zA-Z]{6,25}$/
    const validationSchema = Yup.object({
        email: Yup.string().required().email(),
        newPassword: Yup.string().required().min(6).max(25).matches(passwordRegex, "Password must start with a capital letter"),
    })
    async function sendToLogin(Values) {
        let id;
        try {
            if (oneClick) {
                setOneClick(false)
                const options = {
                    url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
                    method: "PUT",
                    data: Values
                }
                id = toast.loading("Waiting...")
                const { data } = await axios.request(options)
                toast.success("The password has been changed")
                setTimeout(function () {
                    if (data.token) {
                        navigate("/auth/Login")
                        setOneClick(true)
                    }
                }, 2500)
                setErrorMessage(null)
                setErrorRespose(null)
            }
        } catch (error) {
            setOneClick(true)
            setErrorMessage(error.response.data.message)
            setErrorRespose(error.response.data.message)
            toast.error(error.response.data.message)
        } finally {
            toast.dismiss(id)
        }
    }
    const Formik = useFormik({
        initialValues: {
            "email": "",
            "newPassword": "",
        },
        onSubmit: sendToLogin,
        validationSchema
    })
    const [IsShowPassword, setShowPassword] = useState(false)
    function toogleEye(e) {
        if (IsShowPassword || !IsShowPassword) {
            setShowPassword(!IsShowPassword)
            if (e.target.classList.contains("fi-rs-crossed-eye") === true) {
                e.target.parentElement.previousElementSibling.setAttribute("type", "password")
            } else {
                e.target.parentElement.previousElementSibling.setAttribute("type", "text")
            }
        }
    }
    return <>
        <Helmet>
            <title>New password</title>
        </Helmet>
        <section>
            <h2 className="text-Success space-x-2 text-2xl mb-2">
                <i className="fa-regular fa-circle-user"></i>
                <span>New password</span>
            </h2>
            <form action="" className="space-y-2" onSubmit={Formik.handleSubmit}>
                <div>
                    <input type="email" autoComplete="on" placeholder="Email" className="form-control w-full"
                        name="email" value={Formik.values.email} onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                    />
                    {Formik.errors.email && Formik.touched.email ? <div className="text-red-600 text-base font-semibold flex ">* {Formik.errors.email}</div> : ""}
                </div>
                <div className="relative">
                    <input type="password" autoComplete="on" placeholder="New password" className="form-control w-full"
                        name="newPassword" value={Formik.values.newPassword} onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                    />
                    <div className="absolute top-2 right-2 " onClick={(e) => {
                        toogleEye(e)
                    }}>
                        <i className={IsShowPassword ? "fi fi-rs-crossed-eye" : "fi fi-rs-eye"} />
                    </div>
                    {Formik.errors.newPassword && Formik.touched.newPassword ? <div className="text-red-600 text-base font-semibold flex ">* {Formik.errors.newPassword}</div> : ""}
                </div>
                {errorRespose !== null ? <div className="text-red-600 text-base font-semibold flex ">* {errorRespose}</div> : ""}
                <div className="flex flex-col items-start mt-2" style={{ margin: 0 }}>
                    <button type="submit" className="btn-success uppercase mt-1">Save</button>
                </div>
            </form>
        </section>
    </>
}