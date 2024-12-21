import useIsOnline from "../../hooks/Isonline/Isonline"
export default function Offline({children}) {
    let isOnline = useIsOnline()
    if(isOnline) return children
}