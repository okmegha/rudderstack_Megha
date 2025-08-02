const envConfig = require('../config/environments');

class LoginPage {
    get credentials() { return envConfig.getCredentials(); }
    get emailInput() { return $('input[data-testid="Email"]'); }
    get passwordInput() { return $('input[data-testid="Password"]'); }
    get loginButton() { return $('button.ant-btn-primary'); }
    get enable2FAButton() { return $("//div[contains(text(), 'Add an extra layer of security')]"); }
    get skip2FASetupLink() {return $("//a[text()=\"I'll do this later\"]");}
    get goToDashboardButton() {return $("//button[.//span[text()='Go to dashboard']]");}
    get aiAssistanceTooltip () {return $('//div[contains(@class, "react-joyride__tooltip")]//div[contains(text(), "Have a question? Ask AI")]');}
    get  aiAssistanceTooltipCloseBtn  () {return $('.__floater__body svg');}



    async login() {
      const creds = this.credentials;
      console.log('Base URL:', creds.baseUrl);
      console.log('Username:', creds.username);
      console.log('Password:', creds.password);
      
      await browser.url(creds.baseUrl);
      await browser.pause(1000);
      await this.emailInput.setValue(creds.username);
      await this.passwordInput.setValue(creds.password);
      await this.loginButton.click();
      await this.enable2FAButton.waitForDisplayed();
      if (await this.skip2FASetupLink.isDisplayed()) {
        console.log('2FA is displayed');
        await this.skip2FASetupLink.click();
        await this.goToDashboardButton.waitForDisplayed();
        await this.goToDashboardButton.click();
        await this.aiAssistanceTooltipCloseBtn.click();

      }
     
    }

  }
  module.exports = new LoginPage();