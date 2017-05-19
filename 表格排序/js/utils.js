var utils = {
    listToArray: function (likeArray) {
        var arr = [];
        try {
            arr = Array.prototype.slice.call(likeArray, 0);
        } catch (e) {
            for (var i = 0; i < likeArray.length; i++) {
                arr[arr.length] = likeArray[i];
            }
        }
        return arr;
    },
    jsonParse: function (str) {
       return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    }
};