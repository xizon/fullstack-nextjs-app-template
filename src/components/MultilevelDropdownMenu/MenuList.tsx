import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

/*-- Apply this component styles --*/
import myStyles from '@/components/MultilevelDropdownMenu/styles/index.module.scss';

import CoreUtils from '@/utils/CoreUtils';
import useDebounce from '@/utils/hooks/useDebounce';


/* Recursively nested components to traverse nodes
-------------------------------------------------*/		
type MenuListProps = {
	menuListData: any[any];
};



export default function MenuList(props: MenuListProps) {

    const router = useRouter();
    const pathname = usePathname();
    const vmenuRef = useRef<any>(null);

    
    const activeClass = (el, mode) => {
        if ( mode === 'add' ) {
            el.classList.add(myStyles['is-active'], 'is-active');
        } else {
            el.classList.remove(myStyles['is-active'], 'is-active');
        }
        
    };

    const closeChild = (hyperlink, ul) => {
        if ( ul.length === 0 ) return;

        activeClass(hyperlink, 'remove');
        hyperlink.setAttribute('aria-expanded', false);
        activeClass(hyperlink.parentNode, 'remove');

        //to close
        [].slice.call(ul).forEach(function(element: any){
            element.style.maxHeight = 0;
        });
    };

    const openChild = (hyperlink, ul) => {
        if ( ul.length === 0 ) return;

        activeClass(hyperlink, 'add');
        hyperlink.setAttribute('aria-expanded', true);
        activeClass(hyperlink.parentNode, 'add');

        // init <ul> height
        [].slice.call(ul).forEach(function(el: any){
            const calcH = el.querySelectorAll('li').length * el.querySelectorAll('li')[0].scrollHeight;
            el.style.maxHeight = `${calcH}px`;
        });

    };


    //performance
    const handleClickSafe = useDebounce((e) => {
        handleClick(e);
    }, 500, []);



    function handleClick(e) {
        const hyperlink = e.target.closest('li').querySelector('.m-item');
        const url = hyperlink.getAttribute('href');
        const subElement = CoreUtils.return('getNextSiblings', hyperlink, 'ul');

        // route switching
        //=====================
        if ( typeof hyperlink.parentNode.dataset.router !== 'undefined' ) {
            router.push(url);
        }

        
        // hide child if expandedLink doesn't exist, on the contrary
        //=====================
        if ( hyperlink.getAttribute('aria-expanded') === 'false' || hyperlink.getAttribute('aria-expanded') === null ) {


            //Hide all other siblings of the selected <ul>
            if (vmenuRef.current) [].slice.call(vmenuRef.current.children).forEach(function(li: any){

                activeClass(li, 'remove');
    
                const _li = li.firstChild;
                activeClass(_li, 'remove');
                _li.setAttribute('aria-expanded', false);
                
                [].slice.call(CoreUtils.return('getNextSiblings', _li, 'ul')).forEach(function(element: any){
                    element.style.maxHeight = 0;
                });
            });

            //open current
            openChild(hyperlink, subElement);

        } else {

            //close current
            closeChild(hyperlink, subElement);
        }

    }


    useEffect(() => {

        const allItems = vmenuRef.current ? [].slice.call(document.querySelectorAll(`.${myStyles['vertical-menu']} a`)).map( (item: any) => {
            return {
                href: item.getAttribute('href'),
                el: item,
                actived: item.parentNode.classList?.contains(myStyles['is-active']) ? true : false,
                expandedLink: document.body.contains(item.parentNode.parentNode.previousSibling) ? item.parentNode.parentNode.previousSibling : false
            }
        } ) : [];

   
        // Activate current item
        //=====================
        allItems.forEach( (hyperlink: any) => {
            if ( hyperlink.actived && hyperlink.expandedLink ) {
                const expandedLink: any = hyperlink.expandedLink;  // <a>
                activeClass(expandedLink.parentNode, 'add');
                expandedLink.setAttribute('aria-expanded', true);

                // init <ul> height
                const child = expandedLink.parentNode.querySelector('ul');
                const calcH = child.scrollHeight + 1;
                child.style.maxHeight = `${calcH}px`;
            }

        });

    }, []); 


    if ( props.menuListData ) {
        
        return (
            <>
            <ul className={myStyles['vertical-menu']}  ref={vmenuRef}>
                
                {props.menuListData.map((item, i) => {

                    if ( item.heading ) return (
                        <li key={i}>
                        <h3>{item.icon ? <><i className={item.icon}></i> </> : null}{item.title}</h3>
                    </li>
                    );
                    if (item.link.indexOf('#') >= 0 || item.link.indexOf('http') >= 0 ) {
                        return (
                            <li key={'primaey-menu' + i} className={ (pathname === item.link || pathname.indexOf(item.link.replace(/\/[\d]+\.html|\.html/ig,'')) >= 0 && item.link !== '/') ?  `${myStyles['is-active']} is-active` : ''}>
                                <a className="m-item" tabIndex={-1} href={item.link === '#' ? `${item.link}-${i}` : item.link} aria-expanded="false" onClick={(e) => {
                                    e.preventDefault();
                                    handleClickSafe(e);
                                }}>
                                    {item.icon ? item.icon.indexOf('</svg>') < 0 ? <><i className={item.icon}></i> </> : <var dangerouslySetInnerHTML={{__html: `${item.icon}`}} /> : null}{item.title}
                                    {item.children ? <span className={myStyles['vertical-menu__arrow']}></span> : ''}
                                </a>
                                {item.children && <MenuList menuListData={item.children}  />}
                            </li>
                            );
                    } else {
                        return (
                            <li data-router="true" key={'primaey-menu' + i} className={ (pathname === item.link || pathname.indexOf(item.link.replace(/\/[\d]+\.html|\.html/ig,'')) >= 0 && item.link !== '/') ?  `${myStyles['is-active']} is-active` : ''}>
                                <a className="m-item" tabIndex={-1} href={item.link === '#' ? `${item.link}-${i}` : item.link} onClick={(e) => {
                                    e.preventDefault();
                                    handleClickSafe(e);
                                }}>
                                   {item.icon ? item.icon.indexOf('</svg>') < 0 ? <><i className={item.icon}></i> </> : <var dangerouslySetInnerHTML={{__html: `${item.icon}`}} /> : null}{item.title}
                                    {item.children ? <span className={myStyles['vertical-menu__arrow']}></span> : ''}
                                </a>
                                {item.children && <MenuList menuListData={item.children}  />}
                            </li>
                            );
                    }

                })}
            </ul>

            </>
        )	
    } else {
        return (
            <></>
        )
    }

}

