import { MyBucketListPage } from './app.po';

describe('my-bucket-list App', () => {
  let page: MyBucketListPage;

  beforeEach(() => {
    page = new MyBucketListPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
