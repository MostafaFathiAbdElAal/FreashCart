import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function CountDownTimer() {
    const [seconds, setSeconds] = useState(600);
    const [interval, setIntervals] = useState(null)
    useEffect(() => {
        setIntervals(setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1)
        }, 1000))
        return
    }, []);
    const minutes = Math.floor(seconds / 60);
    const countDownSeconds = seconds % 60;
    function validTime() {
        if (seconds >= 0) {
            return countDownSeconds
        } else {
            clearInterval(interval)
            return 0
        }

    }
    return <div className="flex justify-between w-full">
        <span className="text-sm ms-1 text-black">
            Activation code expires in <span>
            {minutes >= 0 ? minutes : "0"}:{countDownSeconds < 10 ? `0${validTime()}` : countDownSeconds}
            </span>
        </span>
        <span>
            {minutes <= 0 && seconds <= 0 ? <Link className="ms-2 font-serif text-sm text-gray-700 hover:text-gray-800 transition-colors duration-300" to={"/auth/ForgotPassword"}>Send agian</Link> : null}
        </span>
    </div>
}