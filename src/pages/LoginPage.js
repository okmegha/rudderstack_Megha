const envConfig = require('../../config/environments');
const TestDataStore = require('../utils/TestDataStore');

/**
 * Page object for RudderStack Login page
 * Handles authentication and navigation to dashboard
 */
class LoginPage {
    get credentials() { 
        return envConfig.getCredentials(); 
    }
    
    get emailInput() { 
        return $('input[data-testid="Email"]'); 
    }
    
    get passwordInput() { 
        return $('input[data-testid="Password"]'); 
    }
    
    get loginButton() { 
        return $('button.ant-btn-primary'); 
    }
    
    get enable2FAButton() { 
        return $("//div[contains(text(), 'Add an extra layer of security')]"); 
    }
    
    get skip2FASetupLink() {
        return $("//a[text()=\"I'll do this later\"]");
    }
    
    get goToDashboardButton() {
        return $("//button[.//span[text()='Go to dashboard']]");
    }
    
    get aiAssistanceTooltip() {
        return $('//div[contains(@class, "react-joyride__tooltip")]//div[contains(text(), "Have a question? Ask AI")]');
    }
    
    get aiAssistanceTooltipCloseBtn() {
        return $('.__floater__body svg');
    }
    
    get errorMessage() {
        return $('.ant-form-item-explain-error');
    }



    /**
     * Perform login to RudderStack dashboard
     * Handles 2FA setup and navigation to dashboard
     */
    async login() {
        const creds = this.credentials;
        
        // Validate credentials
        if (!creds.baseUrl || !creds.username || !creds.password) {
            throw new Error('Missing required credentials. Please check environment configuration.');
        }
        
        console.log('🔑 Starting login process...');
        console.log('Base URL:', creds.baseUrl);
        console.log('Username:', creds.username.substring(0, 3) + '***');
        
        try {
            // Navigate to login page
            await browser.url(creds.baseUrl);
            await TestDataStore.wait(2000); // Allow page to load
            
            // Fill login form
            await TestDataStore.waitForElement(this.emailInput);
            await this.emailInput.setValue(creds.username);
            
            await TestDataStore.waitForElement(this.passwordInput);
            await this.passwordInput.setValue(creds.password);
            
            // Submit login
            await this.loginButton.click();
            console.log('✓ Login form submitted');
            
            // Check for login errors
            try {
                await this.errorMessage.waitForDisplayed({ timeout: 3000 });
                const errorText = await this.errorMessage.getText();
                throw new Error(`Login failed: ${errorText}`);
            } catch (err) {
                // No error message found, continue
            }
            
            // Handle 2FA setup if presented
            await this.handle2FASetup();
            
            // Navigate to dashboard
            await this.navigateToDashboard();
            
            // Close any onboarding tooltips
            await this.closeOnboardingTooltips();
            
            console.log('✓ Login completed successfully');
            
        } catch (error) {
            await TestDataStore.takeScreenshot('login-error');
            console.error('✗ Login failed:', error.message);
            throw error;
        }
    }
    
    /**
     * Handle 2FA setup dialog if it appears
     */
    async handle2FASetup() {
        try {
            await this.enable2FAButton.waitForDisplayed({ timeout: 10000 });
            console.log('📱 2FA setup dialog detected');
            
            if (await this.skip2FASetupLink.isDisplayed()) {
                await this.skip2FASetupLink.click();
                console.log('✓ Skipped 2FA setup');
            }
        } catch (err) {
            // 2FA setup not shown, continue
            console.log('ℹ️ 2FA setup not required');
        }
    }
    
    /**
     * Navigate to the main dashboard
     */
    async navigateToDashboard() {
        try {
            await this.goToDashboardButton.waitForDisplayed({ timeout: 10000 });
            await this.goToDashboardButton.click();
            console.log('✓ Navigated to dashboard');
        } catch (err) {
            // Dashboard button not found, might already be on dashboard
            console.log('ℹ️ Already on dashboard or navigation not required');
        }
    }
    
    /**
     * Close any onboarding tooltips that appear
     */
    async closeOnboardingTooltips() {
        try {
            await this.aiAssistanceTooltipCloseBtn.waitForDisplayed({ timeout: 5000 });
            await this.aiAssistanceTooltipCloseBtn.click();
            console.log('✓ Closed onboarding tooltip');
        } catch (err) {
            // No tooltip found, continue
            console.log('ℹ️ No onboarding tooltips to close');
        }
    }

  }
  module.exports = new LoginPage();