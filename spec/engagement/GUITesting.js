var semver = require("semver");
if (!semver.satisfies(process.version, '^1.6.0')) {
    console.log("Can't execute zombie tests due to node version requirements");
    return;
}
var Browser = require("zombie");
var port = process.env.NODE_ENV === 'production' ? '8080' : '3000';
var base_url = "http://localhost:" + port;
var expect = require('expect');

function assertPageHeaderText(selector, expectedtext, browser)
{
    var header = browser.query(selector);
    expect(header).toNotBe(undefined);
    expect(header).toNotBe(null);
    expect(header._childNodes[0]._data).toBe(expectedtext);
}

describe("the website index page", function () {
    var url = base_url;

    it("should have defined headless browser", function(next) {
        var browser = new Browser();
        expect(typeof browser !== undefined).toBe(true);
        expect(browser instanceof Browser).toBe(true);
        next();
    });

    it("should have valid story gallery navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', 'Our Story');
            browser.clickLink('Our Story', function () {
                browser.wait();
                browser.assert.text('title', 'Our Story');
                next();
            });
        });
    }, 10000);

    it("should visit the site and see the index page", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', 'Our Story');
            assertPageHeaderText('h1.text-center', 'Our Story', browser);
            next();
        });
    }, 10000);

    it("should have valid story page navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', 'Our Story');
            browser.clickLink('Bride', function () {
                browser.wait();
                browser.assert.text('title', 'Bride');
                assertPageHeaderText('h1.text-center', 'Taylor Dozier', browser);
                next();
            });
        });
    }, 10000);
    it("should have valid story bride navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', 'Our Story');
            browser.clickLink('Groom', function () {
                browser.wait();
                browser.assert.text('title', 'Groom');
                assertPageHeaderText('h1.text-center', 'Jonathan Poston', browser);
                next();
            });
        });
    }, 10000);

    it("should have valid story groom navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', 'Our Story');
            browser.clickLink('Bridesmaids', function () {
                browser.wait();
                browser.assert.text('title', 'Bridal Party');
                assertPageHeaderText('h1.text-center', 'Bridesmaids', browser);
                next();
            });
        });
    }, 10000);

    it("should have valid story bridal party navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', 'Our Story');
            browser.clickLink('Groomsmen', function () {
                browser.wait();
                browser.assert.text('title', 'Groomsmen');
                assertPageHeaderText('h1.text-center', 'Groomsmen', browser);
                next();
            });
        });
    }, 10000);
    it("should have valid story groomsmen navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', 'Our Story');
            browser.clickLink('Wedding Information', function () {
                browser.wait();
                browser.assert.text('title', 'Wedding Information');
                assertPageHeaderText('h1.text-center', 'Wedding Information', browser);
                next();
            });
        });
    }, 10000);
    it("should have valid story weddingInfo navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', 'Our Story');
            browser.clickLink('Photos', function () {
                browser.wait();
                browser.assert.text('title', 'Photo Gallery');
                assertPageHeaderText('h1', 'Photo Gallery', browser);
                next();
            });
        });
    }, 10000);
});


describe("the website story page", function () {
    var url = base_url + '/story';
    var initialTitle = 'Our Story';
    it("should have defined headless browser", function(next) {
        var browser = new Browser();
        expect(typeof browser !== undefined).toBe(true);
        expect(browser instanceof Browser).toBe(true);
        next();
    });

    it("should have valid story gallery navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Our Story', function () {
                browser.wait();
                browser.assert.text('title', 'Our Story');
                next();
            });
        });
    }, 10000);

    it("should visit the site and see the index page", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            assertPageHeaderText('h1.text-center', 'Our Story', browser);
            next();
        });
    }, 10000);

    it("should have valid story page navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Bride', function () {
                browser.wait();
                browser.assert.text('title', 'Bride');
                assertPageHeaderText('h1.text-center', 'Taylor Dozier', browser);
                next();
            });
        });
    }, 10000);
    it("should have valid story bride navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Groom', function () {
                browser.wait();
                browser.assert.text('title', 'Groom');
                assertPageHeaderText('h1.text-center', 'Jonathan Poston', browser);
                next();
            });
        });
    }, 10000);

    it("should have valid story groom navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Bridesmaids', function () {
                browser.wait();
                browser.assert.text('title', 'Bridal Party');
                assertPageHeaderText('h1.text-center', 'Bridesmaids', browser);
                next();
            });
        });
    });

    it("should have valid story bridal party navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Groomsmen', function () {
                browser.wait();
                browser.assert.text('title', 'Groomsmen');
                assertPageHeaderText('h1.text-center', 'Groomsmen', browser);
                next();
            });
        });
    }, 10000);
    it("should have valid story groomsmen navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Wedding Information', function () {
                browser.wait();
                browser.assert.text('title', 'Wedding Information');
                assertPageHeaderText('h1.text-center', 'Wedding Information', browser);
                next();
            });
        });
    }, 10000);
    it("should have valid story weddingInfo navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Photos', function () {
                browser.wait();
                browser.assert.text('title', 'Photo Gallery');
                assertPageHeaderText('h1', 'Photo Gallery', browser);
                next();
            });
        });
    }, 10000);
});

describe("the website bride page", function () {
    var url = base_url + '/bride';
    var initialTitle = 'Bride';
    it("should have defined headless browser", function(next) {
        var browser = new Browser();
        expect(typeof browser !== undefined).toBe(true);
        expect(browser instanceof Browser).toBe(true);
        next();
    });

    it("should have valid story gallery navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Our Story', function () {
                browser.wait();
                browser.assert.text('title', 'Our Story');
                next();
            });
        });
    }, 10000);

    it("should visit the site and see the index page", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            assertPageHeaderText('h1.text-center', 'Taylor Dozier', browser);
            next();
        });
    }, 10000);

    it("should have valid story page navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Bride', function () {
                browser.wait();
                browser.assert.text('title', initialTitle);
                assertPageHeaderText('h1.text-center', 'Taylor Dozier', browser);
                next();
            });
        });
    }, 10000);
    it("should have valid story bride navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Groom', function () {
                browser.wait();
                browser.assert.text('title', 'Groom');
                assertPageHeaderText('h1.text-center', 'Jonathan Poston', browser);
                next();
            });
        });
    }, 10000);

    it("should have valid story groom navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Bridesmaids', function () {
                browser.wait();
                browser.assert.text('title', 'Bridal Party');
                assertPageHeaderText('h1.text-center', 'Bridesmaids', browser);
                next();
            });
        });
    }, 10000);

    it("should have valid story bridal party navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', 'Bride');
            browser.clickLink('Groomsmen', function () {
                browser.wait();
                browser.assert.text('title', 'Groomsmen');
                assertPageHeaderText('h1.text-center', 'Groomsmen', browser);
                next();
            });
        });
    }, 10000);
    it("should have valid story groomsmen navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Wedding Information', function () {
                browser.wait();
                browser.assert.text('title', 'Wedding Information');
                assertPageHeaderText('h1.text-center', 'Wedding Information', browser);
                next();
            });
        });
    }, 10000);
    it("should have valid story weddingInfo navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Photos', function () {
                browser.wait();
                browser.assert.text('title', 'Photo Gallery');
                assertPageHeaderText('h1', 'Photo Gallery', browser);
                next();
            });
        });
    }, 10000);
});

describe("the website groom page", function () {
    var url = base_url + '/groom';
    var initialTitle = 'Groom';
    it("should have defined headless browser", function(next) {
        var browser = new Browser();
        expect(typeof browser !== undefined).toBe(true);
        expect(browser instanceof Browser).toBe(true);
        next();
    });

    it("should have valid story gallery navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Our Story', function () {
                browser.wait();
                browser.assert.text('title', 'Our Story');
                next();
            });
        });
    }, 10000);

    it("should visit the site and see the index page", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            assertPageHeaderText('h1.text-center', 'Jonathan Poston', browser);
            next();
        });
    }, 10000);

    it("should have valid story page navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Bride', function () {
                browser.wait();
                browser.assert.text('title', 'Bride');
                assertPageHeaderText('h1.text-center', 'Taylor Dozier', browser);
                next();
            });
        });
    }, 10000);
    it("should have valid story bride navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Groom', function () {
                browser.wait();
                browser.assert.text('title', 'Groom');
                assertPageHeaderText('h1.text-center', 'Jonathan Poston', browser);
                next();
            });
        });
    }, 10000);

    it("should have valid story groom navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Bridesmaids', function () {
                browser.wait();
                browser.assert.text('title', 'Bridal Party');
                assertPageHeaderText('h1.text-center', 'Bridesmaids', browser);
                next();
            });
        });
    }, 10000);

    it("should have valid story bridal party navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Groomsmen', function () {
                browser.wait();
                browser.assert.text('title', 'Groomsmen');
                assertPageHeaderText('h1.text-center', 'Groomsmen', browser);
                next();
            });
        });
    }, 10000);
    it("should have valid story groomsmen navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Wedding Information', function () {
                browser.wait();
                browser.assert.text('title', 'Wedding Information');
                assertPageHeaderText('h1.text-center', 'Wedding Information', browser);
                next();
            });
        });
    }, 10000);
    it("should have valid story weddingInfo navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Photos', function () {
                browser.wait();
                browser.assert.text('title', 'Photo Gallery');
                assertPageHeaderText('h1', 'Photo Gallery', browser);
                next();
            });
        });
    }, 10000);
});

describe("the website bridal party page", function () {
    var url = base_url + '/bridalParty';
    var initialTitle = 'Bridal Party';
    it("should have defined headless browser", function(next) {
        var browser = new Browser();
        expect(typeof browser !== undefined).toBe(true);
        expect(browser instanceof Browser).toBe(true);
        next();
    });

    it("should have valid story gallery navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Our Story', function () {
                browser.wait();
                browser.assert.text('title', 'Our Story');
                next();
            });
        });
    }, 10000);

    it("should visit the site and see the index page", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            assertPageHeaderText('h1.text-center', 'Bridesmaids', browser);
            next();
        });
    }, 10000);

    it("should have valid story page navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Bride', function () {
                browser.wait();
                browser.assert.text('title', 'Bride');
                assertPageHeaderText('h1.text-center', 'Taylor Dozier', browser);
                next();
            });
        });
    }, 10000);
    it("should have valid story bride navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Groom', function () {
                browser.wait();
                browser.assert.text('title', 'Groom');
                assertPageHeaderText('h1.text-center', 'Jonathan Poston', browser);
                next();
            });
        });
    }, 10000);

    it("should have valid story groom navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Bridesmaids', function () {
                browser.wait();
                browser.assert.text('title', 'Bridal Party');
                assertPageHeaderText('h1.text-center', 'Bridesmaids', browser);
                next();
            });
        });
    }, 10000);

    it("should have valid story bridal party navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Groomsmen', function () {
                browser.wait();
                browser.assert.text('title', 'Groomsmen');
                assertPageHeaderText('h1.text-center', 'Groomsmen', browser);
                next();
            });
        });
    }, 10000);
    it("should have valid story groomsmen navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Wedding Information', function () {
                browser.wait();
                browser.assert.text('title', 'Wedding Information');
                assertPageHeaderText('h1.text-center', 'Wedding Information', browser);
                next();
            });
        });
    }, 10000);
    it("should have valid story weddingInfo navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Photos', function () {
                browser.wait();
                browser.assert.text('title', 'Photo Gallery');
                assertPageHeaderText('h1', 'Photo Gallery', browser);
                next();
            });
        });
    }, 10000);
});

describe("the website groomsmen page", function () {
    var url = base_url + '/groomsmen';
    var initialTitle = 'Groomsmen';
    it("should have defined headless browser", function(next) {
        var browser = new Browser();
        expect(typeof browser !== undefined).toBe(true);
        expect(browser instanceof Browser).toBe(true);
        next();
    });

    it("should have valid story gallery navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Our Story', function () {
                browser.wait();
                browser.assert.text('title', 'Our Story');
                next();
            });
        });
    }, 10000);

    it("should visit the site and see the index page", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            assertPageHeaderText('h1.text-center', 'Groomsmen', browser);
            next();
        });
    }, 10000);

    it("should have valid story page navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Bride', function () {
                browser.wait();
                browser.assert.text('title', 'Bride');
                assertPageHeaderText('h1.text-center', 'Taylor Dozier', browser);
                next();
            });
        });
    }, 10000);
    it("should have valid story bride navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Groom', function () {
                browser.wait();
                browser.assert.text('title', 'Groom');
                assertPageHeaderText('h1.text-center', 'Jonathan Poston', browser);
                next();
            });
        });
    }, 10000);

    it("should have valid story groom navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Bridesmaids', function () {
                browser.wait();
                browser.assert.text('title', 'Bridal Party');
                assertPageHeaderText('h1.text-center', 'Bridesmaids', browser);
                next();
            });
        });
    }, 10000);

    it("should have valid story bridal party navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Groomsmen', function () {
                browser.wait();
                browser.assert.text('title', 'Groomsmen');
                assertPageHeaderText('h1.text-center', 'Groomsmen', browser);
                next();
            });
        });
    }, 10000);
    it("should have valid story groomsmen navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Wedding Information', function () {
                browser.wait();
                browser.assert.text('title', 'Wedding Information');
                assertPageHeaderText('h1.text-center', 'Wedding Information', browser);
                next();
            });
        });
    }, 10000);
    it("should have valid story weddingInfo navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Photos', function () {
                browser.wait();
                browser.assert.text('title', 'Photo Gallery');
                assertPageHeaderText('h1', 'Photo Gallery', browser);
                next();
            });
        });
    }, 10000);
});

describe("the website wedding information page", function () {
    var url = base_url + '/weddinginfo';
    var initialTitle = 'Wedding Information';
    it("should have defined headless browser", function(next) {
        var browser = new Browser();
        expect(typeof browser !== undefined).toBe(true);
        expect(browser instanceof Browser).toBe(true);
        next();
    });

    it("should have valid story gallery navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Our Story', function () {
                browser.wait();
                browser.assert.text('title', 'Our Story');
                next();
            });
        });
    }, 100000);

    it("should visit the site and see the index page", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            assertPageHeaderText('h1.text-center', 'Wedding Information', browser);
            next();
        });
    }, 10000);

    it("should have valid story page navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Bride', function () {
                browser.wait();
                browser.assert.text('title', 'Bride');
                assertPageHeaderText('h1.text-center', 'Taylor Dozier', browser);
                next();
            });
        });
    }, 10000);
    it("should have valid story bride navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Groom', function () {
                browser.wait();
                browser.assert.text('title', 'Groom');
                assertPageHeaderText('h1.text-center', 'Jonathan Poston', browser);
                next();
            });
        });
    }, 10000);

    it("should have valid story groom navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Bridesmaids', function () {
                browser.wait();
                browser.assert.text('title', 'Bridal Party');
                assertPageHeaderText('h1.text-center', 'Bridesmaids', browser);
                next();
            });
        });
    }, 10000);

    it("should have valid story bridal party navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Groomsmen', function () {
                browser.wait();
                browser.assert.text('title', 'Groomsmen');
                assertPageHeaderText('h1.text-center', 'Groomsmen', browser);
                next();
            });
        });
    }, 10000);
    it("should have valid story wedding information navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Wedding Information', function () {
                browser.wait();
                browser.assert.text('title', 'Wedding Information');
                assertPageHeaderText('h1.text-center', 'Wedding Information', browser);
                next();
            });
        });
    }, 10000);
    it("should have valid story photo gallery navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Photos', function () {
                browser.wait();
                browser.assert.text('title', 'Photo Gallery');
                assertPageHeaderText('h1', 'Photo Gallery', browser);
                next();
            });
        });
    }, 100000);
});

describe("the website photo gallery page", function () {
    var url = base_url + '/gallery';
    var initialTitle = 'Photo Gallery';
    it("should have defined headless browser", function(next) {
        var browser = new Browser();
        expect(typeof browser !== undefined).toBe(true);
        expect(browser instanceof Browser).toBe(true);
        next();
    });

    it("should have valid story gallery navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Our Story', function () {
                browser.wait();
                browser.assert.text('title', 'Our Story');
                next();
            });
        });
    }, 10000);

    it("should visit the site and see the index page", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            assertPageHeaderText('h1', 'Photo Gallery', browser);
            next();
        });
    }, 10000);

    it("should have valid story page navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Bride', function () {
                browser.wait();
                browser.assert.text('title', 'Bride');
                assertPageHeaderText('h1.text-center', 'Taylor Dozier', browser);
                next();
            });
        });
    }, 10000);
    it("should have valid story bride navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Groom', function () {
                browser.wait();
                browser.assert.text('title', 'Groom');
                assertPageHeaderText('h1.text-center', 'Jonathan Poston', browser);
                next();
            });
        });
    }, 10000);

    it("should have valid story groom navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Bridesmaids', function () {
                browser.wait();
                browser.assert.text('title', 'Bridal Party');
                assertPageHeaderText('h1.text-center', 'Bridesmaids', browser);
                next();
            });
        });
    }, 10000);

    it("should have valid story bridal party navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Groomsmen', function () {
                browser.wait();
                browser.assert.text('title', 'Groomsmen');
                assertPageHeaderText('h1.text-center', 'Groomsmen', browser);
                next();
            });
        });
    }, 10000);
    it("should have valid story groomsmen navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Wedding Information', function () {
                browser.wait();
                browser.assert.text('title', 'Wedding Information');
                assertPageHeaderText('h1.text-center', 'Wedding Information', browser);
                next();
            });
        });
    }, 10000);
    it("should have valid story weddingInfo navigation link", function (next) {
        var browser = new Browser();
        browser.visit(url, function() {
            expect(browser.success).toBe(true);
            browser.assert.text('title', initialTitle);
            browser.clickLink('Photos', function () {
                browser.wait();
                browser.assert.text('title', 'Photo Gallery');
                assertPageHeaderText('h1', 'Photo Gallery', browser);
                next();
            });
        });
    }, 10000);
});
