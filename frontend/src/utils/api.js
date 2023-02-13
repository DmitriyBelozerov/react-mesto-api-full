const apiOptions = {
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-52",
    baseUrlAuth: "https://auth.nomoreparties.co",
    headers: {
        authorization: 'eedc1c72-62bc-4062-b0d7-5fb34f1900fa',
        'Content-Type': 'application/json'
    },

}

class Api {
    constructor(config) {
        this._header = config.headers;
        this._baseUrl = config.baseUrl;
        this._baseUrlAuth = config.baseUrlAuth;

    }

    _getJsonOrError(res) {
        if (res.ok) {
            return res.json();
        }
        throw new Error('Ошибка при загрузке данных с сервера')
    }

    register(newEmail, newPassword) { 
        return fetch(`${this._baseUrlAuth}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: `${newPassword}`,
                email: `${newEmail}`
            }),
        })
            .then(this._getJsonOrError)
    }

    logIn(emailIn, passwordIn) {
        return fetch(`${this._baseUrlAuth}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: `${passwordIn}`,
                email: `${emailIn}`
            }),
        })
            .then(this._getJsonOrError)
    }

    getProfileInfo() {
        return fetch(`${this._baseUrlAuth}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            },
        })
            .then(this._getJsonOrError)
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._header,
        })
            .then(this._getJsonOrError)
    }

    setUserInfo(newName, newAbout) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._header,
            body: JSON.stringify({
                name: `${newName}`,
                about: `${newAbout}`
            }),
        })
            .then(this._getJsonOrError)
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._header,
        })
            .then(this._getJsonOrError)
    }

    createNewCard(newName, newLink) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._header,
            body: JSON.stringify({
                name: `${newName}`,
                link: `${newLink}`
            }),
        })
            .then(this._getJsonOrError)
    }



    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._header,
        })
            .then(this._getJsonOrError)
    }

    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'PUT',
                headers: this._header,
            })
                .then(this._getJsonOrError)
        } else {
            return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'DELETE',
                headers: this._header,
            })
                .then(this._getJsonOrError)
        }
    }

    submitAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._header,
            body: JSON.stringify({
                avatar: `${link}`
            }),
        })
            .then(this._getJsonOrError)
    }
}


const api = new Api(apiOptions);

export default api;