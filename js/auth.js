class Auth {
    constructor() {
        this.baseURL = 'http://your-api-endpoint.com/api';
        this.token = this.getStoredToken();
        this.user = this.getStoredUser();
        this.sessionTimeout = null;
        this.setupSocialAuth();
        this.initializeSession();
    }

    // Session Management
    initializeSession() {
        if (this.token) {
            this.refreshSession();
            this.setupSessionMonitoring();
        }
    }

    setupSessionMonitoring() {
        // Monitor user activity
        ['click', 'keypress', 'mousemove', 'touchstart'].forEach(event => {
            document.addEventListener(event, () => this.refreshSession());
        });

        // Check token expiration every minute
        setInterval(() => this.checkSession(), 60000);
    }

    refreshSession() {
        if (this.sessionTimeout) {
            clearTimeout(this.sessionTimeout);
        }
        
        // Set session timeout to 30 minutes
        this.sessionTimeout = setTimeout(() => {
            this.logout('Session expired. Please login again.');
        }, 30 * 60 * 1000);

        // Update last activity timestamp
        localStorage.setItem('lastActivity', Date.now().toString());
    }

    async checkSession() {
        try {
            const response = await fetch(`${this.baseURL}/check-session`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (!response.ok) {
                throw new Error('Session invalid');
            }
        } catch (error) {
            this.logout('Session expired. Please login again.');
        }
    }

    getStoredToken() {
        const token = localStorage.getItem('token');
        if (!token) return null;

        // Check if token is expired
        const tokenData = this.parseJwt(token);
        if (tokenData.exp * 1000 < Date.now()) {
            this.clearStorage();
            return null;
        }

        return token;
    }

    getStoredUser() {
        try {
            return JSON.parse(localStorage.getItem('user'));
        } catch {
            return null;
        }
    }

    parseJwt(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            return JSON.parse(window.atob(base64));
        } catch {
            return {};
        }
    }

    clearStorage() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('lastActivity');
    }

    // Existing authentication methods with session handling
    async login(email, password) {
        try {
            const response = await fetch(`${this.baseURL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            this.setSession(data.token, data.user);
            this.initializeSession();
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    setSession(token, user) {
        this.token = token;
        this.user = user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('lastActivity', Date.now().toString());
        this.setupSessionMonitoring();
    }

    logout(message = null) {
        if (this.sessionTimeout) {
            clearTimeout(this.sessionTimeout);
        }
        
        this.token = null;
        this.user = null;
        this.clearStorage();
        
        if (message) {
            alert(message);
        }
        
        window.location.href = 'login.html';
    }

    // Rest of your existing Auth class methods...
    // (Social auth, validation, error handling, etc.)
}

// Initialize auth with session management
const auth = new Auth();

// Protect routes that require authentication
document.addEventListener('DOMContentLoaded', () => {
    const protectedPages = ['index.html', 'profile.html', 'checkout.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage) && !auth.isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }

    // Rest of your existing event listeners...
}); 