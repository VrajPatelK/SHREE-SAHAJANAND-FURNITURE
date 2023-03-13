function addFav(pid, cid, category) {


    const data = { pid: pid, cid: cid, category: category };
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "http://127.0.0.1:8500/add-favourite");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200) { }
    };

    xhr.send(JSON.stringify(data));

}

function removeFav(pid, cid, category) {


    const data = { pid: pid, cid: cid, category: category };
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "http://127.0.0.1:8500/remove-favourite");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200) { }
    };

    xhr.send(JSON.stringify(data));

}
