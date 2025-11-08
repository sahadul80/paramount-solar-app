import About from "@/app/components/About";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

export default function AboutPage() {
    return (
        <>
        <Header/>
        <div className="p-2 sm:p-4 mx-auto sm:m-4">
            <About/>
        </div>
        <Footer/>
        </>
    )
}