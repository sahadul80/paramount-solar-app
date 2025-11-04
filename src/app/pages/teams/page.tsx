import CompanyBoard from "@/app/components/CompanyBoard";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

export default function TeamsPage() {
    return (
        <>
        <Header/>
        <div className="p-2 sm:p-4 mx-auto m-4">
        <CompanyBoard/>
        </div>
        <Footer/>
        </>
    )
}