/* 
 *************************************
 * <!-- Pagination -->
 *************************************
 */
import { useRouter } from 'next/navigation';

/*-- Apply this component styles --*/
import myStyles from '@/components/Pagination/styles/index.module.scss';

//
import { paginationNavigators } from '@/components/Pagination/pagination-navigators';


type PageFnType = (arg1: number) => void;

type PaginationProps = {
    /** An API URL Path. Use `{page}` characters to place a placeholder. */
    apiUrl: string;
    /** The range of pages displayed */
    pageRangeDisplayed: number;
    /**  The currently selected page number. */
    activePage: number;
    /** The total number of pages. */
    totalPages: number;
    /** The method to call when a page is clicked. Exposes the current page number as an argument. */
    gotoPageClickEvent?: React.MouseEventHandler<HTMLAnchorElement> | PageFnType | any;
    /** Label for the previous button. */
	previousLabel?: React.ReactNode;
    /** Label for the next button. */
	nextLabel?: React.ReactNode;
    /** Label for the first button. */
	firstLabel?: React.ReactNode;
    /** Label for the last button. */
	lastLabel?: React.ReactNode;
    /** Label for ellipsis */
    breakLabel?: React.ReactNode;
    /** Set the alignment of the control */
    align?: string | null;
    /** Only display the previous and next buttons. */
    onlyPrevNext?: boolean;
    /** The classname for the active page */
    activeClass?: string; 
    /** The classname on tag li of the previous button */
    previousClass?: string;	
    /** The classname on tag li of the next button */
    nextClass?: string;	
    /** The classname on tag li of the first button */
    firstClass?: string;	
    /** The classname on tag li of the last button */
    lastClass?: string;	
    /** The classname for disabled buttons */
    disabledClass?: string;	
    /** The activation button is symmetrical on the left and right sides. */
    symmetry?: boolean;

};

export default function Pagination(props: PaginationProps) {

    const { 
        apiUrl,
        gotoPageClickEvent, 
        pageRangeDisplayed,
        activePage, 
        totalPages,
        previousLabel,
        nextLabel,
        firstLabel,
        lastLabel,   
        breakLabel, 
        align,
        onlyPrevNext,
        activeClass,
        previousClass,
        nextClass,
        firstClass,
        lastClass,
        disabledClass,
        symmetry
    } = props;

    const router = useRouter();


    function handleNavigateClick(parameter) {
        const { 
            gotoPageClickEvent, 
            activePage, 
            totalPages 
        } = props;

        switch (parameter) {
            case "prev":
                gotoPageClickEvent(activePage - 1);
                router.push(apiUrl.replace('{page}',(activePage - 1) as any));
                break;
            case "next":
                gotoPageClickEvent(activePage + 1);
                router.push(apiUrl.replace('{page}',(activePage + 1) as any));
                break;
            case "first":
                gotoPageClickEvent(1);
                router.push(apiUrl.replace('{page}','1'));
                break;
            case "last":
                gotoPageClickEvent(totalPages);
                router.push(apiUrl.replace('{page}',totalPages as any));
                break;
            default:
                gotoPageClickEvent(1);
                router.push(apiUrl.replace('{page}','1'));
                break;
        }
    }

    const visibleNavigators = pageRangeDisplayed ? pageRangeDisplayed : 3;

    let alignClassName = '';
    switch (align) {
        case 'left':
            alignClassName = ' t-l';
            break;
        case 'right':
            alignClassName = ' t-r';
            break;
        case 'center':
            alignClassName = ' t-c';
            break;
    }

    const _activeClassName = activeClass ? activeClass : myStyles['is-active'],
          _previousClassName = previousClass ? previousClass : 'prev',
          _nextClassName = nextClass ? nextClass : 'next',
          _firstClassName = firstClass ? firstClass : 'first',
          _lastClassName = lastClass ? lastClass : 'last',
          _disabledClassName = disabledClass ? disabledClass : myStyles['is-disabled'],
          _onlyPrevNextButtons = typeof(onlyPrevNext) === 'undefined' ? false : onlyPrevNext,
          _symmetry = typeof(symmetry) === 'undefined' ? false : symmetry;


    //get navigation array
    //------------------------------------------
    const navArr = paginationNavigators( visibleNavigators, totalPages, activePage, true, _symmetry );


    // Use ellipsis to extend page numbers
    //------------------------------------------
    let _ellipsis = breakLabel ? breakLabel : '';
    let _ellipsisArr: any[any] = [];
    let _ellipsisEnabled = false;

    if ( _ellipsis !== '' ) _ellipsisArr = [totalPages - 1, totalPages];
    if ( activePage+2 >= totalPages) {
        _ellipsisArr = [];
        _ellipsis = '';
    }

    const _ellipsisElements = _ellipsisArr.map((item, i) => {
        if (item > 0 && item <= totalPages && !_onlyPrevNextButtons) {
            //Delete values whose display range is more than the total
            if ( navArr.indexOf(item) === -1 ) {
                _ellipsisEnabled = true;

                return (
                    <li key={i} className={activePage === item ? _activeClassName : ''}>
                        <a href={apiUrl.replace('{page}', item)} onClick={(e) => {
                            e.preventDefault(); 
                            gotoPageClickEvent(item);  
                            router.push(apiUrl.replace('{page}',item as any));
                        }}>{item}</a>
                    </li>
                );
            }
        }
    });

  
    return (
        <>
        <nav aria-label="Page navigation" className={myStyles['pagination__container'] + alignClassName}>
            <ul>
                {firstLabel ? (
                    <li className={activePage > 1 ? _firstClassName : `${_firstClassName} ${_disabledClassName}`}>
                        <a href={apiUrl.replace('{page}', '1')} onClick={(e) => { e.preventDefault(); handleNavigateClick('first'); }}>
                            {firstLabel || null}
                        </a>
                    </li>
                ) : ''}

                {previousLabel ? (
                    <li className={activePage > 1 ? _previousClassName : `${_previousClassName} ${_disabledClassName}`}>
                        <a href={apiUrl.replace('{page}',(activePage - 1) as any)} onClick={(e) => { e.preventDefault(); handleNavigateClick('prev'); }}>
                            {previousLabel || null}
                        </a>
                    </li>
                ) : ''}


                {
                    navArr.map((item, i) => {
                        if (item > 0 && item <= totalPages && !_onlyPrevNextButtons) {
                            return (
                                <li key={i} className={activePage === item ? _activeClassName : ''}>
                                    <a href={apiUrl.replace('{page}', item)} onClick={(e) => { 
                                        e.preventDefault(); 
                                        gotoPageClickEvent(item); 
                                        router.push(apiUrl.replace('{page}',item as any));
                                    }}>{item}</a>
                                </li>
                            );
                        }

                    })
                }


                {_ellipsis !== '' && _ellipsisEnabled ? <><li><span>{_ellipsis}</span></li></> : ''}
                {_ellipsisElements}

                {nextLabel ? (
                    <li className={activePage < totalPages ? _nextClassName : `${_nextClassName} ${_disabledClassName}`}>
                        <a href={apiUrl.replace('{page}',(activePage + 1) as any)} onClick={(e) => { e.preventDefault(); handleNavigateClick('next'); }}>
                            {nextLabel || null}
                        </a>
                    </li>
                ) : ''}


                {lastLabel ? (
                    <li className={activePage < totalPages ? _lastClassName : `${_lastClassName} ${_disabledClassName}`}>
                        <a href={apiUrl.replace('{page}', totalPages as any)} onClick={(e) => { e.preventDefault(); handleNavigateClick('last'); }}>
                            {lastLabel || null}
                        </a>
                    </li>
                ) : ''}

            </ul>

        </nav>

    </>
    )
  
  }
