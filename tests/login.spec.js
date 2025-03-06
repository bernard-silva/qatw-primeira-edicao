import { test, expect } from '@playwright/test';

test('Nao deve logar quando o codigo de autenticacao e invalido', async ({ page }) => {

  const user = {
    cpf: '00000014141',
    senha: '147258'
  }

  await page.goto('http://paybank-mf-auth:3000/');

  await page.getByRole('textbox', { name: 'Digite seu CPF' }).fill(user.cpf);
  await page.getByRole('button', { name: 'Continuar' }).click();

  for (const digit of user.senha) {
    await page.getByRole('button', { name: digit }).click();
  }
  await page.getByRole('button', { name: 'Continuar' }).click();

  await page.getByRole('textbox', { name: '000000' }).fill('123456');
  await page.getByRole('button', { name: 'Verificar' }).click();

  await expect(page.locator('span')).toContainText('Código inválido. Por favor, tente novamente.');
});