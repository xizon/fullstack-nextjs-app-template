/**
 * Serialize form values
 * @param {HTMLFormElement} form      - Element
 * @returns Array
 */
function serializeArray(form) {

    const objects = [];
    if (typeof form == 'object' && form.nodeName.toLowerCase() == "form") {

        const fieldsTypes = ['input', 'textarea', 'select', 'checkbox', 'progress', 'datalist'];
        fieldsTypes.map((item, index) => {
            const fields = form.getElementsByTagName(item);
            for (let i = 0; i < fields.length; i++) {

                //if checkbox or radio
                if ( fields[i].type === 'radio' || fields[i].type === 'checkbox' ) {
                    if ( fields[i].checked === true ) {
                        objects[objects.length] = {
                            name: fields[i].getAttribute("name"),
                            value: fields[i].value
                        };
                    }
                } else {
                    objects[objects.length] = {
                        name: fields[i].getAttribute("name"),
                        value: fields[i].value
                    };
                }
           

            }
        });

    }

    return objects;
}


module.exports = {
    serializeArray
}