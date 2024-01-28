// 'root': The HTML element where the autocomplete will be rendered.
// 'summaryRoot': The HTML element where the summary will be rendered.
// 'fetchData': This function takes a 'searchTerm' argument. It calls a search api and fetches the matched data.
// 'renderOption': This function takes a 'dataItem' argument. It renders a dropdown option for the passed item.
// 'onOptionSelect': This function takes 3 arguments - 'dataItem', 'summaryTemplate', 'summaryRoot'.
//    It uses the dataItem and the summaryTemplate to produce the HTML for the summary
//    and puts it inside the summaryRoot element.
// getInputValueAfterSelect: This function takes a 'dataItem' argument. It returns the input value that should
//    be set after a dropdown option has been selected.
const createAutoComplete = ({root, summaryRoot, fetchData, renderOption, onOptionSelect, summaryTemplate, getInputValueAfterSelect}) => {
    root.innerHTML = `
        <label><b>Search For a Movie</b></label>
        <input class='input'/>
        <div class='dropdown'>
            <div class='dropdown-menu'>
                <div class='dropdown-content results'></div>
            </div>
        </div>
    `;

    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const results = root.querySelector('.results');

    const onInput = async e => {
        const items = await fetchData(e.target.value);

        if(!items.length){
            dropdown.classList.remove('is-active');
            return;
        }

        dropdown.classList.add('is-active');
        results.innerHTML = '';
        for(let item of items){
            const option = document.createElement('a');
            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(item);
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                onOptionSelect(item, summaryTemplate, summaryRoot);
                input.value = getInputValueAfterSelect(item);
            });
            results.appendChild(option);
        }
    };
    input.addEventListener('input', debounce(onInput, 500));
    
    // Clicking outside the autocomplete closes the dropdown.
    document.addEventListener('click', e => {
        if(!root.contains(e.target)){
            dropdown.classList.remove('is-active');
        }
    });
};