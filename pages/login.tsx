import { useEffect, useRef } from "react"
import Image from "next/image"
import login from "@/public/login.jpg"
import Link from "next/link"
import Cookie from "js-cookie"
import { v4 as uuid } from "uuid"

type Auth = {
    sessionId: string
    userId: string
}

function Login() {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        document.body.style.display = "block"
        document.documentElement.style.visibility = "visible"
        let authCookie = Cookie.get("auth")
        if (authCookie) {
            let auth: Auth = JSON.parse(authCookie)
            location.href = `/${auth.userId}/surveys/`
        }
    }, [])

    async function handleClick(event: { preventDefault: () => void }) {
        event.preventDefault()
        const responseObj = {
            email: emailRef?.current?.value,
            password: passwordRef?.current?.value
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(responseObj)
        }
        const response = await fetch("/api/login", options)
        const res = await response.json()
        const authCookie = {
            sessionId: uuid(),
            userId: res.data.id
        }
        if (res.auth === undefined) return
        let auth = JSON.stringify(authCookie)
        Cookie.set("auth", auth, {
            expires: 1 / 24,
            secure: true,
            sameSite: "strict",
            path: "/"
        })
        location.href = `/${res.data.id}/surveys`
    }

    return (
        <>
            <div className="flex bg-gray-50">
                <div className="sm:w-2/3 hidden sm:block p-4 h-screen">
                    <Image
                        src={login}
                        alt="abstract"
                        className="rounded-md object-cover h-full"
                    />
                </div>
                <div className="xl:w-1/3 md:w-1/2 xs:w-full p-4 mt-3">
                    <form>
                        <div>
                            <p>Get Started</p>
                            <h2 className="text-2xl font-bold">
                                Welcome back .
                            </h2>
                        </div>
                        <div className="mt-5">
                            <label
                                htmlFor="email"
                                className="text-md font-medium"
                            >
                                Email
                            </label>
                            <br />
                            <input
                                type="text"
                                id="email"
                                ref={emailRef}
                                placeholder="developer@gmail.com"
                                className="border-2 border-gray-200 rounded p-3 outline-none w-full sm:w-96 focus:border-green-500 duration-200"
                            />
                        </div>
                        <div className="mt-5">
                            <label
                                htmlFor="password"
                                className="text-md font-medium"
                            >
                                Password
                            </label>
                            <br />
                            <input
                                type="password"
                                id="password"
                                ref={passwordRef}
                                placeholder="************"
                                className="border-2 border-gray-200 rounded p-3 outline-none w-full sm:w-96 focus:border-green-500 duration-200"
                            />
                        </div>
                        <div className="mt-6 sm:w-96">
                            <button
                                className="w-full py-3 text-white font-medium text-center bg-green-500"
                                onClick={handleClick}
                            >
                                Login
                            </button>
                        </div>
                        <div className="mt-6">
                            <Link
                                href="/register"
                                className="hover:text-green-600 font-semi-bold cursor-pointer duration-75"
                            >
                                Don&apos;t you have an account?
                            </Link>
                        </div>
                        <div className="mt-6 w-72 text-sm">
                            <p>
                                By creating an account, you agreeing to our
                                privacy policy.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
