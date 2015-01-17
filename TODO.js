ad_accounts
id
fb_account_id
fb_amount_spent
fb_daily_spent_limit
fb_currency
fb_name(bywa puste)
fb_business_name
fb_timezone_name
fb_timezone_offset_hours_utc

advertisers
id
name

$scope.accounts = "pierwsze";

angular.element($0).scope().accounts
alert($scope.accounts.ad_accounts[0]);


it('should jsonify filtered objects', function () {
    expect(element(by.binding("{'namea:vaalue'}")).getText()).toMatch(/\{\n  "name": ?"value"\n}/);
});





SELECT av.id, count(av.id)
FROM falshpoint.advertisers as av
INNER JOIN falshpoint.facebook_accounts as fa
ON av.id = fa.advertiser_id
WHERE
GROUP BY
av.id
HAVING COUNT(av.id) > 1


________________________

GROUP BY
av.id


falshpoint.advertisers as av

falshpoint.facebook_accounts as fa