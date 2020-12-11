import { Injectable, Scope } from '@nestjs/common';
import { Builder, Capabilities, WebDriver, By } from "selenium-webdriver";

@Injectable({ scope: Scope.REQUEST })
export class SessionService {
    browserName = 'chrome';
    capabilityName = 'goog:chromeOptions';
    browserOptions = {
        'debuggerAddress': '127.0.0.1:9333'
    };
    builder: Builder;
    browserCapabilities: Capabilities;
    driver: WebDriver;
    imagebase64: any;

    constructor() {
        this.builder = new Builder().forBrowser(this.browserName).usingServer('http://whamess.tk:4444/wd/hub');
        this.browserCapabilities = Capabilities.chrome().set(this.capabilityName, this.browserOptions);
        this.driver = this.builder.withCapabilities(this.browserCapabilities).build();
    }

    async getSession(): Promise<boolean> {
        try {
           if (await (await this.driver.findElement(By.className('landing-headerTitle'))).getText()) {
               return false
           }
            return false
        } catch {
            try {
                if (await (await this.driver.findElement(By.className('S7_rT _1hQZ_'))).isDisplayed()) {
                    await this.driver.findElement(By.className('S7_rT _1hQZ_')).click();
                    return false
                   } else {
                    return false
                   }
            } catch {
                return true
            }
            return true
        }
    }

    removeSession(): void {
        this.driver.quit();
    }
}
