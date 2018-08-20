function pages(totalPage, max_page, firstPage, nextPage, prevPage, nowPage, url) {
    var totalPage = totalPage;
    var max_page = max_page;
    var firstPage = firstPage;
    var next = nextPage;
    var prev = prevPage;
    var nowPage = nowPage;

    var page = ""
    if (nowPage > 1) {
        page += "<li class='prev page_nums'><a class='num-" + prev + "' href='javascript:void(0);' data-num='" + prev + "'>上一页</a></li>"
    }
    var i = 1;
    if (nowPage > 10) {
        page += "<li class='page_nums'><a class='num-1' href='javascript:void(0);' data-num='1'>1</a></li>"
        page += "<li>...</li>"
        i = nowPage;
        if (i >= Number(totalPage) - 9 && i <= totalPage) {
            i = Number(totalPage) - 9;
        }
    }

    for (i; i <= max_page; i++) {
        if (i > max_page) {
            break;
        }
        var active = "";
        if (i == nowPage) {
            active = "page-active"
        }
        page += "<li class='page_nums'><a class='num-" + i + " " + active + "' href='javascript:void(0);' data-num='" + i + "'>" + i + "</a></li>"
    }
    if (nowPage < Number(totalPage) - 9) {
        page += "<li class='next page_nums'>...</li>"
        page += "<li class='page_nums'><a class='num-" + totalPage + "' href='javascript:void(0);' data-num='" + totalPage + "'>" + totalPage + "</a></li>"
    }
    if (nowPage < totalPage) {
        page += "<li class='next page_nums'><a class='num-" + next + "' href='javascript:void(0);' data-num='" + next + "'>下一页</a></li>"
    }

    $(".pages-div ul").empty(page);
    $(".pages-div ul").append(page);

}