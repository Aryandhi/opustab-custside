import { Page, expect } from '@playwright/test';
import { LoginLocator } from '../locators/LoginLocator';
import { LoginData } from '../data/LoginData';

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
    this.page = page;
    }

    async navigateToLogin() {
    await this.page.goto(LoginData.URL);
    await this.page.click(LoginLocator.profileIcon);
    await this.page.click(LoginLocator.menuSignInSignUp);
    }

    async loginWithEmail(email: string, password: string) {
    await this.page.fill(LoginLocator.emailInput, email);
    await this.page.click(LoginLocator.nextButton);

    if (password) {
        await this.page.fill(LoginLocator.passwordInput, password);
        await this.page.click(LoginLocator.loginButton);
    }
    }

    async verifySuccessfulLogin() {
    await expect(this.page.locator(LoginLocator.iconSuccessLogin)).toBeVisible();
    await expect(this.page.locator(LoginLocator.successTitle)).toContainText('Verifikasi Berhasil');
    }

    async verifyInvalidEmailError() {
    await expect(this.page.locator(LoginLocator.invalidEmailError))
        .toContainText('Isian email harus berupa alamat surel yang valid.');
    }

    async verifyInvalidPasswordError() {
    await expect(this.page.locator(LoginLocator.invalidPassError))
        .toContainText('Email atau password yang anda masukkan salah! Silahkan periksa kembali.');
    }
}