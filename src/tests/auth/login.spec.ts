import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { LoginData } from '../../data/LoginData';

test.describe('Authentication - Login', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    });

    test('TC-AUTH-LOGIN-1: Login with valid credentials @login @auth', async ({ page }) => {
    await loginPage.loginWithEmail(LoginData.VALID_EMAIL, LoginData.VALID_PASSWORD);
    await loginPage.verifySuccessfulLogin();
    });

    test('TC-AUTH-LOGIN-2: Login with invalid email format @login @auth', async ({ page }) => {
    await loginPage.loginWithEmail(LoginData.INVALID_EMAIL, '');
    await loginPage.verifyInvalidEmailError();
    });

    test('TC-AUTH-LOGIN-3: Login with incorrect password @login @auth', async ({ page }) => {
    await loginPage.loginWithEmail(LoginData.VALID_EMAIL, LoginData.WRONG_PASSWORD);
    await loginPage.verifyInvalidPasswordError();
    });
});