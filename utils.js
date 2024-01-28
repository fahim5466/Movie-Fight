// Returns a debounced version of 'func'.
// When the debounced function is called it is not run immediately.
// Rather it is set to run after 'delay' milliseconds.
// If another function call is made within this time frame,
// the previous call is canceled.
// This makes sure that at most one function call gets executed within 'delay' milliseconds.
const debounce = (func, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        if(timeoutId){
            clearInterval(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};