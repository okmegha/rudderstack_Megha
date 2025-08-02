/**
 * Environment configuration helper
 * Loads environment-specific settings based on the current environment
 */

const fs = require('fs');
const path = require('path');

class EnvironmentConfig {
    constructor() {
        this.currentEnv = process.env.NODE_ENV || 'qa';
        this.config = this.loadEnvironmentConfig();
    }

    loadEnvironmentConfig() {
        const envFile = path.join(process.cwd(), `.env.${this.currentEnv}`);
        
        if (!fs.existsSync(envFile)) {
            console.warn(`Environment file ${envFile} not found. Using default configuration.`);
            return this.getDefaultConfig();
        }

        const envConfig = {};
        const envContent = fs.readFileSync(envFile, 'utf8');
        
        envContent.split('\n').forEach(line => {
            const equalIndex = line.indexOf('=');
            if (equalIndex > 0 && !line.trim().startsWith('#')) {
                const key = line.substring(0, equalIndex).trim();
                const value = line.substring(equalIndex + 1).trim();
                if (key && value) {
                    envConfig[key] = value;
                }
            }
        });

        return envConfig;
    }

    getDefaultConfig() {
        return {
            BASE_URL: 'https://app.rudderstack.com',
            API_URL: process.env.API_URL,
            USERNAME: process.env.USERNAME,
            PASSWORD: process.env.PASSWORD
        };
    }

    get(key) {
        return this.config[key] || process.env[key];
    }

    getBaseUrl() {
        return this.get('BASE_URL');
    }

    getApiUrl() {
        return this.get('API_URL');
    }

    getCredentials() {
        return {
            baseUrl: this.get('BASE_URL'),
            username: this.get('USERNAME'),
            password: this.get('PASSWORD')
        };
    }

    getCurrentEnvironment() {
        return this.currentEnv;
    }

    isProduction() {
        return this.currentEnv === 'prod';
    }

    isDevelopment() {
        return this.currentEnv === 'dev';
    }

    isQA() {
        return this.currentEnv === 'qa';
    }
}

module.exports = new EnvironmentConfig();