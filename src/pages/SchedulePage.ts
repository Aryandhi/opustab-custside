import { Page, expect } from '@playwright/test';
import { ScheduleLocator } from '../locators/ScheduleLocator';
import { ScheduleData } from '../data/ScheduleData';

export class SchedulePage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToSchedule() {
        // console.log('Navigating to schedule page...');
        await this.page.click(ScheduleLocator.scheduleMenu);
        await this.page.waitForTimeout(2000); // Tunggu loading
        await this.verifyOnSchedulePage();
    }

    async verifyOnSchedulePage() {
        // console.log('Verifying on schedule page...');
        // Tunggu hingga element group class tab visible
        await this.page.waitForSelector(ScheduleLocator.groupClassTab, { timeout: 10000 });
        await expect(this.page.locator(ScheduleLocator.groupClassTab)).toBeVisible();
        await expect(this.page.locator(ScheduleLocator.groupClassTab)).toHaveText(ScheduleData.GROUP_CLASS_TAB_TEXT);
        
        // Juga verifikasi container tanggal visible
        await expect(this.page.locator(ScheduleLocator.dateWeekContainer)).toBeVisible();
        // console.log('Successfully verified on schedule page');
    }

    async verifySevenDaysDisplayed() {
        // console.log('Verifying 7 days displayed...');
        
        // Tunggu hingga date buttons visible
        await this.page.waitForSelector(ScheduleLocator.dateButtons, { timeout: 10000 });
        const dateButtons = this.page.locator(ScheduleLocator.dateButtons);
        
        // Verify exactly 7 days are displayed
        await expect(dateButtons).toHaveCount(ScheduleData.EXPECTED_DAYS_COUNT);
        console.log(`✓ Verified ${ScheduleData.EXPECTED_DAYS_COUNT} days displayed`);
        
        // Verify format for each date button
        for (let i = 0; i < ScheduleData.EXPECTED_DAYS_COUNT; i++) {
            const dateButton = dateButtons.nth(i);
            
            // Verify all elements are visible
            await expect(dateButton.locator(ScheduleLocator.dayName)).toBeVisible();
            await expect(dateButton.locator(ScheduleLocator.dateNumber)).toBeVisible();
            await expect(dateButton.locator(ScheduleLocator.monthName)).toBeVisible();
            
            // Verify format patterns
            const dayName = await dateButton.locator(ScheduleLocator.dayName).textContent();
            expect(dayName).toMatch(ScheduleData.DAY_NAME_PATTERN);
            
            const dateNumber = await dateButton.locator(ScheduleLocator.dateNumber).textContent();
            expect(dateNumber).toMatch(ScheduleData.DATE_PATTERN);
            
            const monthName = await dateButton.locator(ScheduleLocator.monthName).textContent();
            expect(monthName).toMatch(ScheduleData.MONTH_NAME_PATTERN);
            
            // Verify data-date attribute exists and has correct format
            const dataDate = await dateButton.getAttribute('data-date');
            expect(dataDate).toBeTruthy();
            expect(dataDate).toMatch(ScheduleData.DATE_ATTRIBUTE_PATTERN);
            
            // console.log(`✓ Verified date button ${i + 1}: ${dayName} ${dateNumber} ${monthName} (${dataDate})`);
        }
    }

    async verifyEffectiveDateIsFirst() {
        // console.log('Verifying effective date is first...');
        
        const dateButtons = this.page.locator(ScheduleLocator.dateButtons);
        const firstDateButton = dateButtons.first(); // Gunakan .first() daripada selector :first-child
        
        // Verifikasi first date button ada
        await expect(firstDateButton).toBeVisible();
        
        // Cek apakah first date button memiliki class active
        const firstDateClass = await firstDateButton.getAttribute('class');
        console.log('First date button class:', firstDateClass);
        
        if (firstDateClass && firstDateClass.includes('active')) {
            console.log('✓ First date has active class');
        } else {
            console.log('⚠ First date does not have active class, checking which date is active...');
            
            // Cari date button mana yang memiliki class active
            const activeDateButton = this.page.locator(ScheduleLocator.activeDateButton);
            if (await activeDateButton.isVisible()) {
                const activeDateText = await activeDateButton.locator(ScheduleLocator.dateNumber).textContent();
                console.log(`Active date is: ${activeDateText}`);
            }
        }
        
        // Verifikasi first date memiliki data-date attribute
        const firstDateValue = await firstDateButton.getAttribute('data-date');
        expect(firstDateValue).toBeTruthy();
        // console.log(`✓ First date value: ${firstDateValue}`);
        
        // Verifikasi tanggal pertama adalah hari ini atau masa depan
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const firstDate = new Date(firstDateValue!);
        
        expect(firstDate.getTime()).toBeGreaterThanOrEqual(currentDate.getTime());
        // console.log('✓ First date is today or future date');
    }

    async verifyPreviousDayNotVisible() {
        // console.log('Verifying previous day not visible...');
        const prevWeekButton = this.page.locator(ScheduleLocator.prevWeekButton);
        
        // Verify previous week button is visible and disabled
        await expect(prevWeekButton).toBeVisible();
        
        const buttonClass = await prevWeekButton.getAttribute('class');
        const isDisabled = await prevWeekButton.isDisabled();
        
        // console.log('Prev week button class:', buttonClass);
        // console.log('Prev week button disabled:', isDisabled);
        
        if (buttonClass && buttonClass.includes('disabled')) {
            console.log('✓ Previous week button is disabled');
        }
        
        if (isDisabled) {
            console.log('✓ Previous week button is disabled (attribute)');
        }
        
        // Verify all displayed dates are today or future dates
        const dateButtons = this.page.locator(ScheduleLocator.dateButtons);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        
        for (let i = 0; i < ScheduleData.EXPECTED_DAYS_COUNT; i++) {
            const dateButton = dateButtons.nth(i);
            const dateValue = await dateButton.getAttribute('data-date');
            
            if (dateValue) {
                const displayedDate = new Date(dateValue);
                const isFuture = displayedDate.getTime() >= currentDate.getTime();
                expect(isFuture).toBe(true);
                console.log(`✓ Date ${i + 1} (${dateValue}) is today or future: ${isFuture}`);
            }
        }
    }

    async debugDateButtons() {
        // console.log('=== DEBUG DATE BUTTONS ===');
        const dateButtons = this.page.locator(ScheduleLocator.dateButtons);
        const count = await dateButtons.count();
        // console.log(`Total date buttons found: ${count}`);
        
        for (let i = 0; i < count; i++) {
            const button = dateButtons.nth(i);
            const isVisible = await button.isVisible();
            const className = await button.getAttribute('class');
            const dataDate = await button.getAttribute('data-date');
            // console.log(`Button ${i}: visible=${isVisible}, class=${className}, data-date=${dataDate}`);
        }
        // console.log('=== END DEBUG ===');
    }
}