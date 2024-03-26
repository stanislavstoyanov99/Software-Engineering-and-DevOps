const { test, expect } = require('@playwright/test');

const baseURL = 'http://localhost:3000';

test('Verify "All Books" link is visible', async ({ page }) => {
    await page.goto(baseURL);

    await page.waitForSelector('nav.navbar');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();

    expect(isLinkVisible).toBe(true);
});

test('Verify "Login" button is visible', async ({ page }) => {
    await page.goto(baseURL);

    await page.waitForSelector('nav.navbar');
    const loginButton = await page.$('a[href="/login"]');
    const isLoginButtonVisible = await loginButton.isVisible();

    expect(isLoginButtonVisible).toBe(true);
});

test('Verify "Register" button is visible', async ({ page }) => {
    await page.goto(baseURL);

    await page.waitForSelector('nav.navbar');
    const registerButton = await page.$('a[href="/register"]');
    const isRegisterButtonVisible = await registerButton.isVisible();

    expect(isRegisterButtonVisible).toBe(true);
});

test('Verify "All Books" link is visible after user login', async ( { page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const allBooksLink = await page.$('a[href="/catalog"]');
    const isAllBooksLinkVisible = await allBooksLink.isVisible();

    expect(isAllBooksLinkVisible).toBe(true);
});

test('Verify "My Books" link is visible after user login', async ( { page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const myBooksLink = await page.$('a[href="/profile"]');
    const isMyBooksLinkVisible = await myBooksLink.isVisible();

    expect(isMyBooksLinkVisible).toBe(true);
});

test('Verify "Add Book" link is visible after user login', async ( { page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const addBookLink = await page.$('a[href="/create"]');
    const isAddBookLinkVisible = await addBookLink.isVisible();

    expect(isAddBookLinkVisible).toBe(true);
});

test('Login with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    await page.$('a[href="/catalog"]');

    expect(page.url()).toBe('http://localhost:3000/catalog');
});

test('Login with empty credentials', async ({ page }) => {
    let loginPageURL = 'http://localhost:3000/login';

    await page.goto(loginPageURL);
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/login"]');

    expect(page.url()).toBe(loginPageURL);
});

test('Login with empty email', async ({ page }) => {
    let loginPageURL = 'http://localhost:3000/login';

    await page.goto(loginPageURL);
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/login"]');

    expect(page.url()).toBe(loginPageURL);
});

test('Login with empty password', async ({ page }) => {
    let loginPageURL = 'http://localhost:3000/login';

    await page.goto(loginPageURL);
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/login"]');

    expect(page.url()).toBe(loginPageURL);
});

test('Register with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', 'test123@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');

    await page.$('a[href="/catalog"]');

    expect(page.url()).toBe('http://localhost:3000/catalog');
});


test('Register with empty credentials', async ({ page }) => {
    let registerPageURL = 'http://localhost:3000/register';

    await page.goto(registerPageURL);
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/register"]');

    expect(page.url()).toBe(registerPageURL);
});

test('Register with empty email', async ({ page }) => {
    let registerPageURL = 'http://localhost:3000/register';

    await page.goto(registerPageURL);
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/register"]');

    expect(page.url()).toBe(registerPageURL);
});

test('Register with empty password', async ({ page }) => {
    let registerPageURL = 'http://localhost:3000/register';

    await page.goto(registerPageURL);
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/register"]');

    expect(page.url()).toBe(registerPageURL);
});

test('Register with empty confirm password', async ({ page }) => {
    let registerPageURL = 'http://localhost:3000/register';

    await page.goto(registerPageURL);
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/register"]');

    expect(page.url()).toBe(registerPageURL);
});

test('Register with different passwords', async ({ page }) => {
    let registerPageURL = 'http://localhost:3000/register';

    await page.goto(registerPageURL);
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '123');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Passwords don/'/'t match!');
        await dialog.accept();
    });

    await page.$('a[href="/register"]');

    expect(page.url()).toBe(registerPageURL);
});

test('Add book with correct data', async ( { page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'Test Book');
    await page.fill('#description', 'This is a test book description');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');

    await page.waitForURL('http://localhost:3000/catalog');

    expect(page.url()).toBe('http://localhost:3000/catalog');
});

test('Add book with empty title field', async ( { page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#description', 'This is a test book description');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/create"]');

    expect(page.url()).toBe('http://localhost:3000/create');
});

test('Add book with empty description field', async ( { page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/create"]');

    expect(page.url()).toBe('http://localhost:3000/create');
});

test('Add book with empty image URL field', async ( { page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#description', 'This is a test book description');

    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/create"]');

    expect(page.url()).toBe('http://localhost:3000/create');
});

test('Login and verify all books are displayed', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.waitForSelector('.dashboard');

    const bookElements = await page.$$('.other-books-list li');

    expect(bookElements.length).toBeGreaterThan(0);
});

test('Login and verify no books are displayed', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.waitForSelector('.dashboard');

    const noBooksMessage = await page.textContent('.no-books');

    expect(noBooksMessage).toBe('No books in database!');
});

test('Login and navigate to Details page', async ( { page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'john@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/catalog"]');

    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');

    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe('Test Book');
});

test('Guest user navigates to Details page', async ( { page }) => {
    await page.goto('http://localhost:3000');
    await page.click('a[href="/catalog"]');

    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');

    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe('Test Book');
});

test('Details page info is displayed correctly', async ( { page }) => {
    await page.goto('http://localhost:3000');
    await page.click('a[href="/catalog"]');

    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');

    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe('Test Book');

    const detailsDescription = await page.textContent('.book-description p');
    expect(detailsDescription).toBe('This is a test book description');

    const detailsType = await page.textContent('.book-information .type');
    expect(detailsType).toBe('Type: Fiction');

    const detailsImage = await page.evaluate(() => {
        const imgElement = document.querySelector('.book-information .img > img');
        return imgElement ? imgElement.getAttribute('src') : null;
    });
    expect(detailsImage).toBe('https://example.com/book-image.jpg');

    const likesInfo = await page.textContent('.likes span');
    expect(likesInfo).toBe('Likes: 0');
});

test('Edit and Delete buttons are visible for book creator', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.waitForSelector('.otherBooks');
    await page.click('li.otherBooks:nth-child(3) > a:nth-child(4)');
    await page.waitForSelector('.book-information');

    const bookTitle = await page.textContent('.book-information h3');
    expect(bookTitle).toBe('Outlander');

    const editButton = await page.textContent('.actions > a:nth-child(1)');
    expect(editButton).toBe('Edit');

    const deleteButton = await page.textContent('.actions > a:nth-child(2)');
    expect(deleteButton).toBe('Delete');
});

test('Edit and Delete buttons are not visible for non-creator', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'john@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.waitForSelector('.otherBooks');
    await page.click('li.otherBooks:nth-child(3) > a:nth-child(4)');
    await page.waitForSelector('.book-information');

    const bookTitle = await page.textContent('.book-information h3');
    expect(bookTitle).toBe('Outlander');

    const editButton = await page.textContent('.actions > a:nth-child(1)');
    expect(editButton).toBe('Like');
});

test('Verify "Logout" button is visible', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const logoutLink = await page.$('a[href="javascript:void(0)"]');
    const isLogoutLinkVisible = await logoutLink.isVisible();

    expect(isLogoutLinkVisible).toBe(true);
});

test('Verify redirection of Logout link after user login', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const logoutLink = await page.$('a[href="javascript:void(0)"]');
    await logoutLink.click();

    const redirectedURL = page.url();
    expect(redirectedURL).toBe('http://localhost:3000/catalog');
});


