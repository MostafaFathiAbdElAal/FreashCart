import AmazonPay from "../../assets/images/amazon-pay.png"
import AmericanExpress from "../../assets/images/American-Express-Color.png"
import MasterCard from "../../assets/images/mastercard.webp"
import Paypal from "../../assets/images/paypal.png"
import GooglePlay from "../../assets/images/get-google-play.png"
import AppleStore from "../../assets/images/get-apple-store.png"
export default function Footer() {
    return <>
        <footer className="bg-light-white py-4 absolute bottom-0 left-0 right-0">
            <div className="container">
                <h6 className="text-3xl mb-2 font-bold">Get the FreshCart app</h6>
                <p className="text-base text-gray-700 font-medium">We will send you a link, open it on your phone to download the app.</p>
                <div className="flex gap-4 mt-4 px-4">
                    <input type="email" autoComplete="on" placeholder="Email" className="flex-grow form-control" />
                    <button type="submit" className="btn-success">Share App Link</button>
                </div>
                <div className="py-2 px-4 border-t font-semibold border-b border-gray-700 border-opacity-10 mt-6">
                    <div className="flex gap-4 items-center">
                        <div className="mb-3">
                            <span className="text-xl">Payment Partners</span>
                        </div>
                        <div className="flex gap-6 items-center">
                            <img src={AmazonPay} alt="Amazone pay" className="w-14" />
                            <img src={AmericanExpress} alt="American express" className="w-14" />
                            <img src={MasterCard} alt="Master card" className="w-14" />
                            <img src={Paypal} alt="Paypal" className="w-14" />
                        </div>
                        <div className="ms-auto flex gap-2 items-center ">
                            <span className="text-xl">Get deliveries with FreshCart</span>
                            <div className="flex gap-1 items-center">
                                <img src={GooglePlay} alt="Googleplay link FreshCart" className="w-28" />
                                <img src={AppleStore} alt="Apple store link FreshCart" className="w-28" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </>
}