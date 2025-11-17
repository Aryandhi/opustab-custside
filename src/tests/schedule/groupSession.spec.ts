import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { LoginData } from '../../data/LoginData';
import { SchedulePage } from '../../pages/SchedulePage';

test.describe('Schedule - View Weekly Schedule', () => {
    let loginPage: LoginPage;
    let schedulePage: SchedulePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        schedulePage = new SchedulePage(page);

        // Step 1: Customer berhasil login dan berada di halaman menu
        // console.log('Step 1: Logging in...');
        await loginPage.navigateToLogin();
        await loginPage.loginWithEmail(LoginData.VALID_EMAIL, LoginData.VALID_PASSWORD);
        await loginPage.verifySuccessfulLogin();
        await page.waitForTimeout(3000); // Tunggu setelah login
    });

    test('TC-SG-13: Customers can view the schedule within 1 week @schedule @weekly', async ({ page }) => {
        // Step 2: Klik menu schedule/jadwal
        // console.log('Step 2: Navigating to schedule...');
        await schedulePage.navigateToSchedule();

        // Debug: lihat apa yang ada di page
        await schedulePage.debugDateButtons();

        // Step 3: Customer melihat tanggal yang tampil berjumlah 7 hari
        // console.log('Step 3: Verifying 7 days displayed...');
        await schedulePage.verifySevenDaysDisplayed();

        // Step 4: Customer melihat tanggal efektif tampil di bagian paling kiri
        // console.log('Step 4: Verifying effective date is first...');
        await schedulePage.verifyEffectiveDateIsFirst();

        // Step 5: Customer tidak bisa melihat jadwal hari kemarin
        // console.log('Step 5: Verifying previous day not visible...');
        await schedulePage.verifyPreviousDayNotVisible();

        // console.log('✅ All steps completed successfully!');
    });
});