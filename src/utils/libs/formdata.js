/**
 * Serialize form values
 * @param  {Array} types   - An array of field strings.
 * @param {HTMLFormElement} form      - Element
 * @returns Array
 */
function serializeArray(form, types = ['input', 'textarea', 'select', 'checkbox', 'progress', 'datalist']) {

    const objects = [];
    const fieldsTypes = types;
    
    fieldsTypes.map((item, index) => {
        const fields = form.getElementsByTagName(item);
        for (let i = 0; i < fields.length; i++) {

            const _name = fields[i].getAttribute("name");
            let _value = fields[i].value;

            // if field is Array
            if ( _name !== null && _name.match(/(\[.*?\])/gi) ) {
                const inputs = form.querySelectorAll("[name='"+_name+"']");
                const _arrFieldValue = [];
                for (let j = 0; j < inputs.length; j++) {
                    const _arrField = inputs[j];
                    //if checkbox or radio
                    if (_arrField.type === "radio" || _arrField.type === "checkbox") {
                        if (_arrField.checked === true) {
                            _arrFieldValue.push(_arrField.value);
                        } else {
                            _arrFieldValue.push("");
                        }
                    } else {
                        _arrFieldValue.push(_arrField.value);
                    }
                }

                _value = _arrFieldValue;
            }

            
            //if checkbox or radio
            if ( fields[i].type === 'radio' || fields[i].type === 'checkbox' ) {
                if ( fields[i].checked === true ) {
                    objects[objects.length] = {
                        name: _name,
                        value: _value
                    };
                }
            } else {
                objects[objects.length] = {
                    name: _name,
                    value: _value
                };
            }
        

        }
    });

    // remove Duplicate objects from JSON Array
    const clean = objects.filter((item, index, self) => index === self.findIndex((t) => (t.name === item.name)));

    return clean;
}


export {
    serializeArray
}