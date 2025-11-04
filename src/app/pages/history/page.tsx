import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import History from "@/app/components/History";

export default function HistoryPage() {
    return (
        <>
        <Header/>
        <div className="p-2 sm:p-4 mx-auto m-4">
        <History/>
        </div>
        <Footer/>
        </>
    )
}