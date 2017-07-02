import { Fccr3Page } from './app.po';

describe('fccr3 App', () => {
  let page: Fccr3Page;

  beforeEach(() => {
    page = new Fccr3Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
