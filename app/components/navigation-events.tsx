'use client'

/* 
 *************************************
 * <!-- Navigation events -->
 *************************************
 */
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function NavigationEvents() {
    const pathname = usePathname();
    const searchParams = useSearchParams();


    useEffect(() => {
        const url = `${pathname}?${searchParams}`;
        // console.log(url);  // "/about.html?"   "/?"

        // loading
        //---------
        const _loader: HTMLDivElement | null = document.querySelector('#loader');
        if (_loader !== null) _loader.style.display = 'none';

        const elements = [].slice.call(document.getElementsByTagName('a'));
        const showLoader = (e: any) => {
            if (pathname !== e.target.getAttribute('href')) {
                if (_loader !== null) _loader.style.display = 'flex';
            }
        };

        elements.forEach((el: HTMLAnchorElement) => {
            if (typeof el.dataset.clickev === 'undefined' && el.getAttribute('href') !== '#') {
                el.addEventListener('click', showLoader);
                el.dataset.clickev = 'true';
            }
        });
   
        return () => {
            elements.forEach((el: HTMLAnchorElement) => {
                el.removeEventListener('click', showLoader);
                el.removeAttribute('data-clickev');
            });
        }


    }, [pathname, searchParams])

    return null;
}