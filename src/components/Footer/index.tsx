/* 
 *************************************
 * <!-- Footer -->
 *************************************
 */
import appData from "@/data/app.json";

export default function Footer() {
    return (
        <>
            <footer className="clearfix">
               <p dangerouslySetInnerHTML={{__html: appData.copyright}}/>
            </footer>

        </>
    )
}

