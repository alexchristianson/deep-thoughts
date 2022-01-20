import decode from 'jwt-decode';

class AuthService {
    // retrieve data saved in token
    getProfile() {
        return decode(this.getToken());
    }

    // check if the use is stil logged in 
    loggedIn() {
        // Checks if there is a saved token an it's still valid
        const token = this.getToken();
        // use type coersion to ceck if token is NOT undefined and the toek is NOT expired
        return !!token && !this.isTokenExpired(token);
    }

    // check if the token has expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    // retrieve token from localStorage
    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token');
    }

    // set toekn to localStorage and reload page to homepage
    login(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);

        window.location.assign('/');
    }

    // clear token from localStorage and force logout with reload
    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        // this wil reload the page and reset the state of the application
        window.location.assign('/');
    }
}

export default new AuthService();