function createClient() {

    function getPersonalData() {
        var request = new XMLHttpRequest();
        request.addEventListener('load', getPersonalData);
        var data = JSON.parse(request.responseText);
        request.open('GET', 'http://localhost:3000/api/server-data');
        request.send();
    }

    return {
        getPersonalData
    }
}