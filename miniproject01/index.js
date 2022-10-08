/* Sample usage do not modify */
class FetchWrapper {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    get(endpoint) {
        return fetch(this.baseURL + endpoint, {
            headers: {
                "Authorization": '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'
            }
        })
            .then(response => response.json());
    }

    put(endpoint, body) {
        return this._send("put", endpoint, body);
    }

    post(endpoint, body) {
        return this._send("post", endpoint, body);
    }

    delete(endpoint, body) {
        return this._send("delete", endpoint, body);
    }

    _send(method, endpoint, body) {
        return fetch(this.baseURL + endpoint, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(response => response.json());
    }
}

const startLoader = element => {
    element.innerHTML = `<div class="loading-spinner"></div>`;
}

const stopLoader = (element, value) => {
    element.textContent = value;
}


/* In this mini-project, you will build a page that uses the GitHub API to list the repositories of a GitHub user.
This project does not require you to log in and authenticate with the GitHub API.
However, the API has a limit of 60 requests per minute.
So, if you get an error saying: You have triggered an abuse detection mechanism.
Please wait a few minutes before you try again., then you should wait about one minute before trying again.

The goal of this project is to allow the user to enter a GitHub username (for example,
kalwar or yourgithubusername), and then when the user submits the form,
the app will show the list of GitHub repositories for that user using the GitHub API. */

/* Write your code here... */

const form = document.querySelector('#repos-form');

const input = document.querySelector("#github-username");

const baseURL = "https://api.github.com/users/";

const resultDisplay = document.querySelector('#repos-list')
let newWrapper = new FetchWrapper(baseURL);



form.addEventListener('submit', function (e) {

    e.preventDefault();

    let userName = input.value;

    console.log(userName);

    const endpoint = userName + "/repos";

    newWrapper.get(endpoint).then(data => {
        resultDisplay.innerHTML = ''
        data?.forEach(e => renderResult(e))
    }).catch(err => alert('can not find repository'));


});



const renderResult = (item) => {
    const newLi = document.createElement('li')
    newLi.innerHTML = `<h2>
    ${item.name}
    </h2>
    <p><a>${item.html_url}</a></p>
    `
    resultDisplay.appendChild(newLi)

}
