/* 
 *************************************
 * <!-- Back To Top -->
 *************************************
 */
import { useEffect, useState, useRef } from 'react';

/*-- Apply this component styles --*/
import myStyles from '@/components/BackToTop/styles/index.module.scss';

import CoreUtils from '@/utils/CoreUtils';

// Adapt the easing parameters of TweenMax
enum EasingList {
    linear = 'linear',
    easeIn = 'ease-in',
    easeOut = 'ease-out',
    easeInOut = 'ease-in-out'
}


type BackToTopProps = {
    /** Speed of scrolling up. Amount of time measured in milliseconds. */
    speed?: number;
    /** Types of easing animation */
    easing: string;
    /** Button Icon */
    btnIcon?: React.ReactNode;
};


export default function BackToTop(props: BackToTopProps) {

    const {
        btnIcon,
    } = props;

    const easeType = EasingList[props.easing];
    const speed = props.speed ? props.speed : 500;


    const btnRef = useRef<any>(null);
    const [isAtRange, setIsAtRange] = useState<boolean>(false);
    const windowScrollUpdate = CoreUtils.return('throttle', handleScrollEvent, 5);


    function handleScrollEvent() {
        const scrollTop = window.pageYOffset;

        if (scrollTop < window.innerHeight / 2) {
            setIsAtRange(false);
        } else {
            setIsAtRange(true);
        }
    }


    function moveToTop() {

        const duration = speed;

        const scrollToTarget = function (target) {

            const top = target.getBoundingClientRect().top;
            const startPos = window.pageYOffset;
            const diff = top;


            const start = new Date().getTime();
            const from = 0;
            const to = 100;
            let requestId;

            const loop = function () {

                //easing
                const time = new Date().getTime() - start;
                let val;

                switch (easeType) {
                    case "linear":
                        val = CoreUtils.return('easeLinear', time, from, to - from, duration);
                        break;
                    case "ease-in":
                        val = CoreUtils.return('easeInQuad', time, from, to - from, duration);
                        break;
                    case "ease-out":
                        val = CoreUtils.return('easeOutQuad', time, from, to - from, duration);
                        break;
                    case "ease-in-out":
                        val = CoreUtils.return('easeInOutQuad', time, from, to - from, duration);
                        break;
        
                    default:
                        val = CoreUtils.return('easeLinear', time, from, to - from, duration);
                }
        
                // Elapsed time in miliseconds
                const percent = val/100;
                
                window.scrollTo(0, startPos + diff * percent);

                if (time < duration) {
                    // Continue moving
                    requestId = window.requestAnimationFrame(loop);
                } else {
                    window.cancelAnimationFrame(requestId);
                }
            };
            requestId = window.requestAnimationFrame(loop);
        };

        scrollToTarget(document.body);

    }


    function handleClick(e) {
        e.preventDefault();
        moveToTop();
    }


    useEffect(() => {


        //Hide other pages button of back-to-top
        btnRef.current?.classList.remove(myStyles['is-active']);

        // Remove scroll events from window
        // Add a scroll event listener to window
        window.removeEventListener('scroll', windowScrollUpdate);
        window.removeEventListener('touchmove', windowScrollUpdate);



        // Add function to the element that should be used as the scrollable area.
        window.removeEventListener('scroll', windowScrollUpdate);
        window.removeEventListener('touchmove', windowScrollUpdate);
        window.addEventListener('scroll', windowScrollUpdate);
        window.addEventListener('touchmove', windowScrollUpdate);
        windowScrollUpdate();


        //
        btnRef.current?.removeEventListener('click', handleClick);
        btnRef.current?.addEventListener('click', handleClick);


        return () => {
            btnRef.current?.removeEventListener('click', handleClick);
            window.removeEventListener('scroll', windowScrollUpdate);
            window.removeEventListener('touchmove', windowScrollUpdate);

            //Hide other pages button of back-to-top
            btnRef.current?.classList.remove(myStyles['is-active']);

        }


    }, []); 

    return (
        <>
            <div className={myStyles['back-to-top']} ref={btnRef}>
                <button type="button" className={isAtRange ? myStyles['is-active'] : ''}>
                    {btnIcon || <>
                        <svg width="40" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 300.222 300.221">
                            <g>
                                <path d="M299.201,93.188c-14.688-25.704-29.988-50.184-43.452-76.5c-3.06-6.12-12.852-4.284-14.688,1.836
		c-7.345,26.316-16.524,58.14-15.301,85.068c0,6.12,6.732,7.344,10.404,4.284c0.612,0.612,1.836,0.612,3.061,0.612
		c6.731-0.612,13.464-1.836,19.584-2.448c22.031,55.692,39.779,152.388-44.677,158.508c-8.567,0.612-15.3-1.224-20.195-4.896
		c11.628-9.792,21.42-22.031,26.315-36.107c6.732-18.36-6.731-57.528-31.824-46.512c-20.195,9.18-24.479,45.899-20.808,64.26
		c1.224,5.508,3.06,10.403,4.896,14.688c-1.837,1.225-3.061,1.836-4.896,3.061c-15.912,9.18-34.883,13.464-53.244,12.852
		c-13.464-0.612-21.42-7.956-26.316-17.748c16.524-8.567,29.988-22.032,33.66-36.107c7.344-29.988-31.212-49.572-47.124-20.196
		c-7.344,13.464-8.568,32.436-4.284,48.96c-0.612,0.612-1.836,0.612-2.448,1.224c-52.632,21.42-68.544-45.288-38.556-78.336
		c2.448-3.06-0.612-7.956-4.284-5.508c-36.108,25.704-33.048,80.784,8.568,98.532c11.016,4.896,26.928,3.06,41.616-1.836
		c6.732,13.464,17.748,23.868,33.66,25.704c23.868,3.06,51.408-3.673,73.44-17.137c12.852,10.404,31.212,12.853,50.184,8.568
		c80.172-15.912,65.484-113.832,42.228-171.972c6.12-0.612,11.629-0.612,17.748-0.612
		C297.978,105.427,302.261,98.083,299.201,93.188z M83.166,240.067c-0.612-4.283-1.224-8.567-1.224-12.852
		c0-6.732,1.224-13.464,3.06-19.584c4.284-14.688,29.988-9.792,22.032,9.792C102.138,226.603,92.958,234.559,83.166,240.067z
		 M180.473,229.664c0-8.568,3.673-39.168,16.524-39.78c9.792-0.612,9.792,26.316,9.18,30.6c-2.447,11.629-11.016,21.42-21.42,28.765
		C181.697,243.127,180.473,236.395,180.473,229.664z M252.077,43.615c8.568,15.912,17.748,31.212,26.928,46.512
		c-12.852,1.836-25.704,4.284-37.943,7.344C246.569,80.947,249.018,61.975,252.077,43.615z"/>
                            </g>
                        </svg>
                    </>}
                </button>
            </div>

        </>
    )
}

