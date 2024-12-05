import {Page} from '@playwright/test';
import path from 'path';
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

    protected async isElementDisable(locator: string){
        await this.page.locator(locator).isDisabled();

    }

    protected async isElementEditable(locator: string){
        await this.page.locator(locator).isEditable();

    }

    protected async selectToDropdown(locator: string, option: string){
        await this.page.locator(locator).selectOption(option);

    }

    protected async redirectToUrl(url: string){
        await this.page.goto(url);

    }

    protected async getInputValues(locator: string){
        return this.page.locator(locator).inputValue();

    }

    protected async getAttribute(locator: string, attributeName: string){
        return this.page.locator(locator).getAttribute(attributeName);

    }

    protected async reloadUrl(){
        await this.page.reload();

    }

    protected async getNumberOfElements(locator: string){
        const elements = await this.page.$$(locator) //await this.page.locator(locator).all()
        return elements.length;

    }

    protected async blurElement(locator: string){
        await this.page.locator(locator).blur();

    }

    protected async uploadFile(locator: string, fileName: string){
       const pathToFile = path.resolve(__dirname, fileName)
       await this.page.locator(locator).setInputFiles(pathToFile);

    }

    protected async uploadMultipleFiles(locator: string, ...fileName: string[]){
        let filePaths: string[] = fileName.map(fileName => path.resolve(__dirname), fileName);
        await this.page.locator(locator).setInputFiles(filePaths);

 
     }

     protected async scrollToPageTop(){
        await this.page.evaluate (() => window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        }));
     }

     protected async hideElement(locator: string){
        await this.page.locator(locator).evaluate(el =>el.style.display ='none !important');

     }

     protected async goBack(){
        await this.page.goBack();

     }

     protected async goForward(){
        await this.page.goForward()

     }

     protected async getPageSource(){
        await this.page.content()

     }

     protected async ClickElementIframe(locator: string, iframeLocator: string){
        const frameElement = this.page.locator(iframeLocator);

        await frameElement.locator(locator).click();


     }

     protected async fileElementIframe(locator: string, iframeLocator: string, inputText: string){
        const frameElement = this.page.locator(iframeLocator);

        await frameElement.locator(locator).click();

        await frameElement.locator(locator).fill(inputText);


     }


}