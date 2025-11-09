import BusinessVerticals from "@/app/components/BusinessVerticals";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import ProjectsPortfolio from "@/app/components/ProjectsPortfolio";

export default function BusinessPage() {
    return (
        <>
        <Header/>
        <div className="p-2 sm:p-4 mx-auto sm:m-4">
            <BusinessVerticals/>
            <ProjectsPortfolio/>
        </div>
        <Footer/>
        </>
    )
}