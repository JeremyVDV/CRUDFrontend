import { CRUDFrontendPage } from './app.po';

describe('crudfrontend App', () => {
  let page: CRUDFrontendPage;

  beforeEach(() => {
    page = new CRUDFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
