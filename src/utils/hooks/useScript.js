/**
 * Mount/Unmount next/script on page change in next.js
 * 
 * @usage:


const App = () => {
    useScript("xxx.js");
};

 */

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function useScript(url) {
    const router = useRouter();
    useEffect(() => {
        const script = document.createElement("script");
        script.src = url;
        script.async = true;
        document.body.appendChild(script);

        // Needed for cleaning residue left by the external script that can only be removed by reloading the page
        const onRouterChange = (newPath) => {
            window.location.href = router.basePath + newPath;
        };
        router.events.on("routeChangeStart", onRouterChange);

        return () => {
            router.events.off("routeChangeStart", onRouterChange);

            document.body.removeChild(script);
        };
    }, [router, url]);
}

export default useScript;

