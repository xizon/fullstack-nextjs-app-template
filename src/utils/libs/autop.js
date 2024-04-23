
/**
 * Text Auto Paragraph
 * 
 * @reference: https://developer.wordpress.org/reference/functions/wpautop/
 * @param {String} pee  - The text which has to be formatted. Characters entered, including "Enter" but not <p>, <br> tags
 * @param {?Boolean} br - If set, this will convert all remaining line breaks after paragraphing. 
 *                        Line breaks within <script>, <style>, and <svg> tags are not affected.
 * @return {String}     - Text which has been converted into correct paragraph tags.
 */
function autop(pee, br = true) {

    const pre_tags = {};
    if ( pee.trim() === '' ) {
        return '';
    }

    pee = pee + "\n"; // just to make things a little easier, pad the end
    if ( pee.indexOf( '<pre' ) > -1 ) {
        const pee_parts = pee.split( '</pre>' );
        const last_pee = pee_parts.pop();
        pee = '';
        pee_parts.forEach(function(pee_part, index) {
            const start = pee_part.indexOf( '<pre' );

            // Malformed html?
            if ( start === -1 ) {
                pee += pee_part;
                return;
            }

            const name = "<pre wp-pre-tag-" + index + "></pre>";
            pre_tags[name] = pee_part.substr( start ) + '</pre>';
            pee += pee_part.substr( 0, start ) + name;

        });

        pee += last_pee;
    }

    pee = pee.replace(/<br \/>\s*<br \/>/, "\n\n");

    // Space things out a little
    const allblocks = '(?:table|thead|tfoot|caption|col|colgroup|tbody|tr|td|th|div|dl|dd|dt|ul|ol|li|pre|form|map|area|blockquote|address|math|style|p|h[1-6]|hr|fieldset|legend|section|article|aside|hgroup|header|footer|nav|figure|figcaption|details|menu|summary)';
    pee = pee.replace( new RegExp('(<' + allblocks + '[^>]*>)', 'gmi'), "\n$1");
    pee = pee.replace( new RegExp('(</' + allblocks + '>)', 'gmi'), "$1\n\n");
    pee = pee.replace( /\r\n|\r/, "\n" ); // cross-platform newlines

    if ( pee.indexOf( '<option' ) > -1 ) {
        // no P/BR around option
        pee = pee.replace( /\s*<option'/gmi, '<option');
        pee = pee.replace( /<\/option>\s*/gmi, '</option>');
    }

    if ( pee.indexOf('</object>') > -1 ) {
        // no P/BR around param and embed
        pee = pee.replace( /(<object[^>]*>)\s*/gmi, '$1');
        pee = pee.replace( /\s*<\/object>/gmi, '</object>' );
        pee = pee.replace( /\s*(<\/?(?:param|embed)[^>]*>)\s*/gmi, '$1');
    }

    if ( pee.indexOf('<source') > -1 || pee.indexOf('<track') > -1 ) {
        // no P/BR around source and track
        pee = pee.replace( /([<\[](?:audio|video)[^>\]]*[>\]])\s*/gmi, '$1');
        pee = pee.replace( /\s*([<\[]\/(?:audio|video)[>\]])/gmi, '$1');
        pee = pee.replace( /\s*(<(?:source|track)[^>]*>)\s*/gmi, '$1');
    }

    pee = pee.replace(/\n\n+/gmi, "\n\n"); // take care of duplicates

    // make paragraphs, including one at the end
    const pees = pee.split(/\n\s*\n/);
    pee = '';
    pees.forEach(function(tinkle) {
        pee += '<p>' + tinkle.replace( /^\s+|\s+$/g, '' ) + "</p>\n";
    });

    pee = pee.replace(/<p>\s*<\/p>/gmi, ''); // under certain strange conditions it could create a P of entirely whitespace
    pee = pee.replace(/<p>([^<]+)<\/(div|address|form)>/gmi, "<p>$1</p></$2>");
    pee = pee.replace(new RegExp('<p>\s*(</?' + allblocks + '[^>]*>)\s*</p>', 'gmi'), "$1", pee); // don't pee all over a tag
    pee = pee.replace(/<p>(<li.+?)<\/p>/gmi, "$1"); // problem with nested lists
    pee = pee.replace(/<p><blockquote([^>]*)>/gmi, "<blockquote$1><p>");
    pee = pee.replace(/<\/blockquote><\/p>/gmi, '</p></blockquote>');
    pee = pee.replace(new RegExp('<p>\s*(</?' + allblocks + '[^>]*>)', 'gmi'), "$1");
    pee = pee.replace(new RegExp('(</?' + allblocks + '[^>]*>)\s*</p>', 'gmi'), "$1");

    if ( br ) {
        pee = pee.replace(/<(script|style)(?:.|\n)*?<\/\\1>/gmi, autopNewlinePreservationHelper); // /s modifier from php PCRE regexp replaced with (?:.|\n)
        pee = pee.replace(/(<br \/>)?\s*\n/gmi, "<br />\n"); // optionally make line breaks
        pee = pee.replace( '<PreserveNewline />', "\n" );
    }

    pee = pee.replace(new RegExp('(</?' + allblocks + '[^>]*>)\s*<br />', 'gmi'), "$1");
    pee = pee.replace(/<br \/>(\s*<\/?(?:p|li|div|dl|dd|dt|th|pre|td|ul|ol)[^>]*>)/gmi, '$1');
    pee = pee.replace(/\n<\/p>$/gmi, '</p>');

    if ( Object.keys(pre_tags).length ) {
        pee = pee.replace( new RegExp( Object.keys( pre_tags ).join( '|' ), "gi" ), function (matched) {
            return pre_tags[matched];
        });
    }

    return pee;
}


function autopNewlinePreservationHelper(matches) {
    return matches[0].replace( "\n", "<PreserveNewline />" );
}



/**
 * Undo autop
 * 
 * @param {String} str  - The text which has to be formatted. Characters entered, including "Enter" but not <p>, <br> tags
 */
function reverseAutop(str) {
    if (typeof str === 'undefined') return str;

    //remove any new lines already in there
    str = str.replace("\n", "");

    //remove all <p>
    str = str.replace("<p>", "");

    //replace <br /> with \n
    str = str.replace(/[<]br[^>]*[>]/gi, "\n");

    //replace </p> with \n\n
    str = str.replace("</p>", "\n\n");


    //remove last line from string
    str = str.replace(/(\r\n|\n|\r).*$/, "");

    return str;
}

export {
    autop,
    reverseAutop
}