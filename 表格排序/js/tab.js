//需要获取的元素
var oTab = document.getElementById("tab");
var tHead = oTab.tHead;
var oThs = tHead.rows[0].cells;
var tBody = oTab.tBodies[0];
var oRows = tBody.rows;

//获取后台数据
var data = null;
var xhr = new XMLHttpRequest;
xhr.open("get", "json/data.txt", false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
        var val = xhr.responseText;
        data = utils.jsonParse(val);
    }
};
xhr.send(null);
//绑定数据
function bind() {
    var frg = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
        var cur = data[i];
        var oTr = document.createElement("tr");
        for (var key in cur) {
            var oTd = document.createElement("td");
            if (key === "sex") {
                oTd.innerHTML = cur[key] === 0 ? "男" : "女";
            } else {
                oTd.innerHTML = cur[key];
            }
            oTr.appendChild(oTd);
        }
        frg.appendChild(oTr);
    }
    tBody.appendChild(frg);
    frg = null;
}
bind();
//隔行变色
function changeBg() {
    for (var i = 0; i < oRows.length; i++) {
        oRows[i].className = i % 2 === 1 ? "bg" : null;
    }
}
changeBg();
//排序

function sort(n) {
    var arr = utils.listToArray(oRows);
    var _this = this;

    for (var k = 0; k < oThs.length; k++) {
        if (oThs[k] !== this) {
            oThs[k].flag = -1;
        }
    }

    _this.flag *= -1;
    arr.sort(function (a, b) {
        var curInn = a.cells[n].innerHTML;
        var nextInn = b.cells[n].innerHTML;
        var curInnNum = parseFloat(curInn);
        var nextInnNum = parseFloat(nextInn);
        if (isNaN(curInnNum) || isNaN(nextInnNum)) {
            return (curInn.localeCompare(nextInn)) * _this.flag;
        } else {
            return (curInnNum - nextInnNum) * _this.flag;
        }
    });
    var frg = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
        frg.appendChild(arr[i]);
    }
    tBody.appendChild(frg);
    frg = null;
    changeBg();
}


//设置点击事件
for (var i = 0; i < oThs.length; i++) {
    var curTh = oThs[i];
    if (curTh.className === "cursor") {
        curTh.index = i;
        curTh.flag = -1;
        curTh.onclick = function () {
            sort.call(this, this.index);
        }
    }
}

