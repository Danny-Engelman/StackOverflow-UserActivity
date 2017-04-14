/*global console,document,window,$*/
function daycol(n, html) { //wicked, 2 functions in one, based on second param
    if (!html) return n < 60 ? 'limegreen' : n < 180 ? 'goldenrod' : n < 365 ? 'firebrick' : 'black';
    var el = document.createElement('p');
    //number of days between today and date in html text
    return ~~((new Date() - new Date((el.innerHTML = html, el).querySelector(n + ' .relativetime').title)) / 864e5);
}
//loop each user DOM element as array
[].map.call(document.querySelectorAll('.user-info'), function (user) {
    $.get(user.querySelector('a').href, function (profile) {//get the HREF linked user profile page as text
        $.get(user.querySelector('a').href + '?tab=answers&sort=newest', function (answers) {//get this persons answer page as text
            var login = daycol('.icon-time +', profile),
                answer = daycol('#user-tab-answers', answers);
            user.querySelector('.user-tags').innerHTML = '<b style=padding:1px;background:' + daycol(login) + '>Days Since Login ' + login + '  Answer ' + answer + '</b>';
            user.style.cssText = 'color:#fff;width:21em;margin:1px;background:' + daycol(answer);
        });
    });
});
