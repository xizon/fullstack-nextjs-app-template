
/*
* Generate page navigators
*
* @param  {Number} visibleNavigators    - The range of pages displayed.
* @param  {Number} totalPages           - The total number of pages.
* @param  {Number} activePage           - The currently selected page number.
* @param  {Boolean} adjustmentEnabled   - Whether to complete the page number range.
* @param  {Boolean} symmetry            - The activation button is symmetrical on the left and right sides.
* @return {Array}                       - Return an array.
*/
export function paginationNavigators(visibleNavigators, totalPages, activePage, adjustmentEnabled = true, symmetry = false) {

	// Generate a sequence of numbers
	// Since the array is initialized with `undefined` on each position,
	// the value of `v` below will be `undefined`

	let result: any[number] = [];
	if ((activePage + visibleNavigators - 1) < totalPages) {
		result = Array.from({ length: visibleNavigators }, (v, k) => k + activePage);
	} else {
		let diff = totalPages - activePage;
		if (diff >= 0) {
			result = Array.from({ length: diff + 1 }, (v, k) => k + activePage);
		}

	}

	//Shift the elements forward to complete the display range
	const adjustmentResult = ( arr ) => {
		if ( arr.length < totalPages ) {
			let adjustment = visibleNavigators - arr.length;
			for (let i = 1; i <= adjustment; i++) {
				arr.unshift(activePage - i);
			}
		}
		return arr;
	};

	if ( adjustmentEnabled ) result = adjustmentResult(result);


    // symmetrical on the left and right sides
    if ( symmetry ) {
        if ( totalPages > activePage ) {
            const totalDisplayedPages = visibleNavigators + (visibleNavigators - 1);
            const activedPageIndex = result.indexOf(activePage);
            const leftSideTotal = (visibleNavigators - 1) - activedPageIndex;

            for (let i = 1; i <= leftSideTotal; i++) {
                result.unshift(activePage - i - activedPageIndex);
            }
        }
    }

	
	return result;
}

export default paginationNavigators;