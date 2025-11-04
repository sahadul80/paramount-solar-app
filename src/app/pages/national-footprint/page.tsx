import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import NationalFootprint from "@/app/components/NationalFootprint";

export default function NationalFootprintPage() {
    return (
        <>
        <Header/>
        <div className="p-2 sm:p-4 mx-auto m-4">
        <NationalFootprint/>
        </div>
        <Footer/>
        </>
    )
}