summaryInclude = 60;
var fuseOptions = {
    shouldSort: true,
    includeMatches: true,
    // threshold: 0.0,
    threshold: 0.3,
    tokenize: true,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        { name: "title", weight: 0.8 },
        { name: "contents", weight: 0.5 },
        { name: "tags", weight: 0.3 }
        // , {name:"categories",weight:0.3}
    ]
};


var searchQuery = param("s");
if (searchQuery) {
    $("#search-query").val(searchQuery);
    executeSearch(searchQuery);
} else {
    $('#search-results').append("<p>Please enter a word or phrase above</p>");
}


function executeSearch(searchQuery) {
    $.getJSON("/NJU-AI-Course/index.json", function (data) {
        var pages = data;
        //console.log({ "pages": pages });
        var fuse = new Fuse(pages, fuseOptions);
        var result = fuse.search(searchQuery);
        //console.log({ "matches": result });
        if (result.length > 0) {
            populateResults(result);
        } else {
            $('#search-results').css({
                'display': 'flex',
                'justify-content': 'center',
                'align-items': 'center',
                'flex-wrap': 'wrap'
            });
            $('#search-results').append("<div class='notification is-warning'>未找到搜索结果，请更换关键词后重试。</div>");
        }
    });
}

function populateResults(result) {
    $.each(result, function (key, value) {
        var contents = value.item.contents;
        //console.log({ "print": result });
        var snippet = "";
        var snippetHighlights = [];
        var tags = [];
        if (fuseOptions.tokenize) {
            snippetHighlights.push(searchQuery);
        } else {
            $.each(value.matches, function (matchKey, mvalue) {
                if (mvalue.key == "tags" || mvalue.key == "categories") {
                    snippetHighlights.push(mvalue.value);
                } else if (mvalue.key == "contents" || mvalue.key == "description") {
                    start = mvalue.indices[0][0] - summaryInclude > 0 ? mvalue.indices[0][0] - summaryInclude : 0;
                    end = mvalue.indices[0][1] + summaryInclude < contents.length ? mvalue.indices[0][1] + summaryInclude : contents.length;
                    snippet += contents.substring(start, end);
                    snippetHighlights.push(mvalue.value.substring(mvalue.indices[0][0], mvalue.indices[0][1] - mvalue.indices[0][0] + 1));
                }
            });
        }

        if (snippet.length < 1) {
            snippet += contents.substring(0, summaryInclude * 2);
        }
        //pull template from hugo templarte definition
        var templateDefinition = $('#search-result-template').html();
        //replace values
        var output = render(templateDefinition, { key: key, title: value.item.title, link: value.item.permalink, rating: value.item.rating, description: value.item.description, tags: value.item.tags, featured_image: value.item.featured_image, snippet: snippet });
        $('#search-results').append(output);

        $.each(snippetHighlights, function (snipkey, snipvalue) {
            $("#summary-" + key).mark(snipvalue);
        });

    });
}

function param(name) {
    return decodeURIComponent((location.search.split(name + '=')[1] || '').split('&')[0]).replace(/\+/g, ' ');
}

function render(templateString, data) {
    var conditionalMatches, conditionalPattern, copy;
    conditionalPattern = /\$\{\s*isset ([a-zA-Z_]*) \s*\}(.*)\$\{\s*end\s*}/g;


    //since loop below depends on re.lastInxdex, we use a copy to capture any manipulations whilst inside the loop
    copy = templateString;
    while ((conditionalMatches = conditionalPattern.exec(templateString)) !== null) {
        //console.log(conditionalMatches);
        if (data[conditionalMatches[1]]) {
            //valid key, remove conditionals, leave contents.
            copy = copy.replace(conditionalMatches[0], conditionalMatches[2]);
        } else {
            //not valid, remove entire section
            copy = copy.replace(conditionalMatches[0], '');
        }
    }
    templateString = copy;

    // 处理 for in range 语句
    loopPattern = /\$\{\s*for\s+([a-zA-Z_]+)\s+in\s+range\((\d+),\s*(\d+)\)\s*\}(.*?)\$\{\s*end\s*\}/gs;
    while ((loopMatches = loopPattern.exec(templateString)) !== null) {
        var loopVariable = loopMatches[1];
        var start = parseInt(loopMatches[2]);
        var end = parseInt(loopMatches[3]);
        var loopContent = '';

        // 根据范围执行循环
        for (var i = start; i < end; i++) {
            loopContent += loopMatches[4].replace(new RegExp(`\\$\\{\\s*${loopVariable}\\s*\\}`, 'g'), i);
        }

        templateString = templateString.replace(loopMatches[0], loopContent);
    }

    // 处理 for in array 语句
    loopPattern = /\$\{\s*for\s+([a-zA-Z_]+)\s+in\s+([a-zA-Z_]+)\s*\}(.*?)\$\{\s*end\s*\}/gs;
    while ((loopMatches = loopPattern.exec(templateString)) !== null) {
        var loopVariable = loopMatches[1];
        var arrayName = loopMatches[2];
        var loopContent = '';

        if (Array.isArray(data[arrayName])) {
            // 遍历数组
            data[arrayName].forEach(function (item) {
                loopContent += loopMatches[3].replace(new RegExp(`\\$\\{\\s*${loopVariable}\\s*\\}`, 'g'), item);
            });
        }

        templateString = templateString.replace(loopMatches[0], loopContent);
    }


    //now any conditionals removed we can do simple substitution
    var key, find, re;
    for (key in data) {
        find = '\\$\\{\\s*' + key + '\\s*\\}';
        re = new RegExp(find, 'g');
        templateString = templateString.replace(re, data[key]);
    }
    var rating = data['rating']; // 这里用3作为示例，你可以根据需要获取实际的rating值

    // 获取要插入星星的容器
    var starContainer = "";

    // 生成有色星星
    for (var i = 0; i < rating; i++) {
        var star = '<i class="fas fa-star has-text-warning"></i>';
        starContainer += star;
    }

    // 生成灰色星星
    for (var i = 0; i < (5 - rating); i++) {
        var star = '<i class="fas fa-star"></i>';
        starContainer += star;
    }
    //starContainer = "<span\s+id=\"rating-space\">" + starContainer + "</span>";
    templateString = templateString.replace(
        "${Code for replace }",
        starContainer
    );
    return templateString;
}