import { useState } from "react"
export default function useIsOnline() {
    const [online, setOnline] = useState(true)
    window.addEventListener("offline", function () {
        setOnline(false)
    })
    window.addEventListener("online", function () {
        setOnline(true)
    })
    return online
}