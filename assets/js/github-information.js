function userInformationHTML(user){
    return `
    <h2>${user.name}
        <span class="small-name">
            (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
        </span>
    </h2>
    <div class="gh-content">
        <div class="gh-avatar">
            <a href="${user.html_url}" target="_blank">
                <img src="${user.avatar_url}"width="80" height="80" alt="${user.login}"/>
            </a>
        </div>
        <p>followers:${user.followers} - following: ${user.following} <br> repos:${user.public_repos} </p>
    </div>`;

}


function fetchGitHubInformation(event) {

    var username = $("#gh-username").val();
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }

    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`);

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`)
    ).then(
        function (response){
            var userDate =response;
            $("#gh-user-data").html(userInformationHTML(userDate));
        }, function (errorRespons){
            if (errorRespons.status === 404) {
                $("#gh-user-data").html(`<h2>No info found for user${username}</h2>`);
            } else{
                console.log(errorRespons);
            $("#gh-user-data").html(
                `<h2>error: ${errorResponse.responseJSON.message}</h2>`
            );
            });
}