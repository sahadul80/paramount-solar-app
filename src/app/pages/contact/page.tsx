import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

export default function ContactPage() {
    return (
        <>
        <Header/>
        <div className="p-2 sm:p-4 mx-auto sm:m-4">
        <Contact/>
        </div>
        <Footer/>
        </>
    )
}