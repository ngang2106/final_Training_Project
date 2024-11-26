import {Page} from '@playwright/test';
export default class BasePage{

    protected page: Page;
    constructor(page: Page) {
        this.page = page;

    }

    protected async clickToElement(locator: string){
        await this.highlightElement(locator);
        await this.page.click(locator);
    }

    protected async doubleClickToElement(locator: string) {
        await this.highlightElement(locator);
        await this.page.dblclick(locator);
    }

    protected async highlightElement(locator: string) {
        let originalStyle: string;
        const element = this.page.locator(locator);
        await element.evaluate(el =>originalStyle = el.style.border);
        await element.evaluate(el => el.style.border = '2px dashed red');
        await this.page.waitForTimeout(500);
        await element.evaluate(el => el.style.border = originalStyle);

    }

    protected async rightClickToElement(locator: string) {
        await this.highlightElement(locator);

        await this.page.click(locator,{button: 'right'});

    }

    protected async middleClickToElement(locator: string) {
        await this.highlightElement(locator);

        await this.page.click(locator,{button: 'middle'});

    }

    protected async fillToElement(locator: string, inputValue: string){
        await this.highlightElement(locator);
        await this.page.fill(locator, inputValue);
    }

    protected async checkToCheckbox(locator: string){
        await this.highlightElement(locator);
        await this.page.check(locator);

    }

    protected async unCheckToCheckbox(locator: string){
        await this.highlightElement(locator);
        await this.page.uncheck(locator);

    }

    protected async hoverToCheckbox(locator: string){
        await this.highlightElement(locator);
        await this.page.hover(locator);

    }

    protected async scrollToCheckbox(locator: string){
        await this.page.locator(locator).scrollIntoViewIfNeeded();

    }

    protected async getUrl(){
        return this.page.url();

    }

    protected async getText(locator: string){
        await this.page.innerText(locator);

    }

    protected async isElementChecked(locator: string){
        await this.page.locator(locator).isChecked();

    }

    protected async isElementVisible(locator: string){
        await this.page.locator(locator).isVisible();

    }

    protected async isElementHidden(locator: string){
        await this.page.locator(locator).isHidden();

    }
}