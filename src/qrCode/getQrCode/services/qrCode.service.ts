import { Injectable, Scope } from '@nestjs/common';
import { Builder, Capabilities, WebDriver, By } from "selenium-webdriver";

@Injectable({ scope: Scope.REQUEST })
export class QRCodeService {
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

    async getqrcode(): Promise<string> {
        var self=this;
        try{
                await this.driver.findElement(By.className('n9gYh')).then(function(webElement) {
                    self.driver.navigate().refresh();
                }, function(err) {
                    if (err.state && err.state === 'no such element') {
                    } 
                });
                let string = await this.driver.findElement(By.className('_1yHR2')).takeScreenshot();
                this.removeSession(); 
                return string;
        } catch {
            return "Logado";
        }
    }

    removeSession(): void {
        this.driver.quit();
    }
}
