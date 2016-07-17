
// return a dictionary with all method names and number of times they were called.
function set_coverage(obj)
{
    // return dictionary
    var ret = {};

    // function to wrap a method for coverage
    function wrap_method(obj, key)
    {
        // add to return dict
        ret[key] = 0;

        // copy the old function
        obj["__coverage_" + key] = obj[key];

        // create the wrapping function
        obj[key] = function()
        {
            // add counter
            ret[key]++;

            // call original function
            return obj["__coverage_" + key].apply(this, arguments);
        }
    }

    // set all object methods
    for (var key in obj)
    {
        if (typeof obj[key] === "function") {
            wrap_method(obj, key);
        }
    }

    // set all object prototype methods
    for (var key in obj.prototype)
    {
        if (typeof obj.prototype[key] === "function") {
            wrap_method(obj.prototype, key);
        }
    }

    // return the results dictionary
    return ret;
}