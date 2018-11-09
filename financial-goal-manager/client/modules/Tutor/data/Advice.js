import React from 'react'

const advice = [
  {
    key: 'noEmergencySavings',
    title: 'Emergency Savings',
    paragraphs: [
      (<p key={'p1'}>
        Our information indicates that you have not yet set aside some savings for <strong>emergency expenses</strong>,
        such as loss of employment, car trouble or medical emergencies.
      </p>),
      (<p key={'p2'}>
        We recommend setting aside <strong>3-6 months of expenses</strong> as a <strong>'rainy day'</strong> fund in a low-risk location.
        Remember that risky investments often require a long time in the market, and this is money you might need tomorrow.
        Start by saving any amount you can - any contribution matters!
      </p>)
    ],
    usefulLinks: [{
      link: 'https://www.wellsfargo.com/financial-education/basic-finances/manage-money/cashflow-savings/emergencies/',
      label: 'Saving for an Emergency'
    }, {
      link: 'https://investor.vanguard.com/emergency-fund/amount',
      label: 'What\'s the right emergency fund amount?'
    }, {
      link: 'https://learnvest.com/article/how-much-should-i-save-in-an-emergency-fund',
      label: 'How Much Should I Save in an Emergency Fund?'
    }, {
      link: 'https://www.discover.com/online-banking/banking-topics/where-to-keep-emergency-fund/',
      label: '4 Places to Keep Your Emergency Fund'
    }]
  }, {
    key: 'lowEmergencySavings',
    title: 'Emergency Savings',
    paragraphs: [
      (<p key={'p1'}>
        Our information indicates that while you have set aside some savings for <strong>emergency expenses</strong>,
        your emergency fund is lower than 3-6 months of expenses. Emergency expenses can take many forms,
        such as loss of employment, car trouble or medical emergencies.
        They can sometimes come in multiples - remember, when it rains, it pours!
      </p>),
      (<p key={'p2'}>
        We recommend setting aside <strong>3-6 months of expenses</strong> as a <strong>'rainy day'</strong> fund in a low-risk location.
        Remember that risky investments often require a long time in the market, and this is money you might need tomorrow.
        Start by saving any amount you can - any contribution matters!
      </p>)
    ],
    usefulLinks: [{
      link: 'https://investor.vanguard.com/emergency-fund/amount',
      label: 'What\'s the right emergency fund amount?'
    }, {
      link: 'https://learnvest.com/article/how-much-should-i-save-in-an-emergency-fund',
      label: 'How Much Should I Save in an Emergency Fund?'
    }, {
      link: 'https://www.discover.com/online-banking/banking-topics/where-to-keep-emergency-fund/',
      label: '4 Places to Keep Your Emergency Fund'
    }]
  }, {
    key: 'moreWealth',
    title: 'Building Wealth',
    lastAdvice: true,
    paragraphs: [
      (<p key={'p1'}>
        Based on our information, you hold a lot of savings in <strong>cash</strong>.
      </p>),
      (<p key={'p2'}>
        Unlike our other pieces of advice, this one should be taken with a grain of salt and depends on factors
        such as the state of the <strong>financial market</strong>, your age,
        your <strong>risk tolerance</strong> and your ability to hold your investments during
        a <strong>market downturn</strong>. While the stock market has historically gone up,
        past data does not guarantee future data.
        Our goal is to help you make an informed decision, so our useful links will include articles that encourage
        cash savings, as well as articles that discourage holding too much of your savings in cash.
      </p>),
      (<p key={'p3'}>
        Holding too much money in cash that earns less than 1% in interest may prevent you from building wealth
        and retiring comfortably. Historically, the stock market has earned a <strong>average</strong> of 7% yearly returns.
        The word average here is important - some years can be far below or above the average.
        The key to seeing the coveted 7% is to stay in the market for as long as possible. The stock market is only one
        investment option, but it is usually the most suitable for individuals who want to keep it simple.
        There are many ways of getting into the stock market. You can have as much or as little control as you'd like.
        Investments can be done automatically through tools like <a href='https://www.betterment.com/'>Betterment</a> or you can choose your own stocks by opening
        a brokerage account from with one of <a href='https://www.nerdwallet.com/blog/investing/best-online-brokers-for-stock-trading/'>these</a> institutions.
      </p>),
      (<p key={'p4'}>
        Building wealth is the least straightforward decision out of all the advice we could give you.
        We recommend getting informed before making risky investments in individual stocks or not investing at all.
        There is nothing wrong with sticking to simple investments like the <strong>S&P 500</strong>,
        but there is also nothing wrong with using <strong>some</strong> of your excess money for fun investments.
      </p>)
    ],
    usefulLinks: [{
      link: 'https://www.bankrate.com/calculators/retirement/investment-goal-calculator.aspx',
      label: 'Investment Calculator - Calculate your investment earnings'
    }, {
      link: 'https://money.usnews.com/money/blogs/the-smarter-mutual-fund-investor/2015/03/25/how-much-cash-is-too-much-cash-for-your-portfolio',
      label: 'How Much Cash Is Too Much Cash for Your Portfolio?'
    }, {
      link: 'https://money.usnews.com/money/blogs/the-smarter-mutual-fund-investor/2014/10/08/4-reasons-why-cash-is-king',
      label: '4 Reasons Why Cash Is King'
    }, {
      link: 'https://www.forbes.com/sites/advisor/2018/02/23/if-youve-been-stockpiling-cash-youre-not-alone-heres-what-you-need-to-do/#56fcc5e826d1',
      label: 'Don\'t Be Ashamed You\'re Holding So Much Cash'
    }, {
      link: 'https://www.businessinsider.com/when-to-invest-in-stocks-2018-7',
      label: 'Even the Americans sitting on piles of cash aren\'t using it correctly to build wealth'
    }, {
      link: 'https://www.businessinsider.com/when-to-invest-in-stocks-2018-7',
      label: 'Think Twice Before Investing In Individual Stocks'
    }]
  }, {
    key: 'highInterestDebt',
    title: 'High Interest Debt',
    paragraphs: [
      (<p key={'p1'}>
        Our information indicates that you have some <strong>high interest debt</strong>,
        such as credit card, an auto loan or student loans.
        No investment strategy pays off as well or is less risky than eliminating high interest debt.
        Most credit cards charge high interest rates -- as much as 18% or more
        - if you don’t pay off your balance in full each month.
      </p>),
      (<p key={'p2'}>
        You might have been told that saving for retirement is the most important thing you can do
        for your finances. This is the only case where that is not true.
        Generally, if you’re paying more interest than you’re earning in interest, you’re losing money.
        Let's look at the numbers: The stock market has an average historical return rate of 7%.
        However, high-interest debt has a negative rate of return.
        If you have $100 in debt with 15% interest, ivesting it might get you $7 at the end of the year,
        but not paying it down will <strong>cost</strong> you $15 every <strong>month</strong>.
      </p>),
      (<p key={'p3'}>
        There are two popular methods for eliminating high-interest debt:
        the <strong>snowball</strong> method and the <strong>avalanche</strong> method.
        With the avalanche method, you make the minimum payments on all your debts, and put any leftover money
        into the debt with the highest interest rate. When that debt is eliminated, move onto the next debt.
        With the snowball method, you would pay the minimum payments on all your debts, and put any leftover money
        into paying beyond the minimum payment.
      </p>)
    ],
    usefulLinks: [{
      link: 'https://www.nbcnews.com/better/business/how-debt-avalanche-method-helped-one-woman-pay-68-000-ncna881356',
      label: 'How to pay off your loans using the \'debt avalanche\' method'
    }, {
      link: 'https://www.nbcnews.com/better/business/how-get-out-debt-build-wealth-snowball-ncna864111',
      label: 'How to get out of debt and build a \'wealth snowball\''
    }, {
      link: 'https://www.bankrate.com/banking/savings/these-guidelines-will-help-you-decide-whether-to-pay-down-debt-or-save/',
      label: 'Should you pay debts first or save? Use these guidelines to decide'
    }, {
      link: 'http://time.com/money/collection-post/2791960/which-debts-should-i-pay-off-first/',
      label: 'Which Debts Should I Pay Off First?'
    }, {
      link: 'https://www.forbes.com/sites/nancyanderson/2013/10/11/when-not-to-pay-off-your-high-interest-credit-card-debt/#297f7e8f136a',
      label: 'When Not To Pay Off Your High-Interest Credit Card Debt'
    }, {
      link: 'https://investorjunkie.com/29981/investments-paying-high-rate-debt/',
      label: 'The Best Type of Investment: Paying Off High-Interest Rate Debt'
    }]
  }, {
    key: 'lowInterestDebt',
    title: 'Low Interest Debt',
    paragraphs: [
      (<p key={'p1'}>
        Our information indicates that you have some <strong>loo interest debt</strong>,
        such as a car payment or mortage with less than 5% interest.
      </p>),
      (<p key={'p2'}>
        Low interest debt is a unique kind of debt, because some recommend
        <strong>not paying it down aggressively</strong> by making extra payments and focusing on investing any extra income in wealth-building avenues.
        This is because the interest rate on some loans is <strong>less than the average market return</strong>, which is 7%.
        Let's look at the numbers: if you have a loan with 3% interest and you pay $100 towards it, you saved
        $3 you would have had to pay in interest. However, if you instead invested those $100 in the stock market,
        in theory you would earn $7. So, by investing instead of making extra payments, you have a <strong>net gain</strong> of $4.
      </p>),
      (<p key={'p3'}>
        The caveat is that stock market returns are <strong>not guaranteed</strong>. During the life of the loan, your returns might be
        much higher - but also much lower - than the historical average of 7%. Moreover, if you don't like being in debt
        or you have a low risk tolerance for investing (both completely okay!),
        many would recommend to enjoy the <strong>peace of mind</strong> that will come with being debt-free.
      </p>)
    ],
    usefulLinks: [{
      link: 'https://www.fool.com/investing/2018/07/10/should-you-pay-off-debt-or-should-you-save-and-inv.aspx',
      label: 'Should You Pay Off Debt, or Should You Save and Invest?'
    }, {
      link: 'https://www.bankrate.com/banking/savings/these-guidelines-will-help-you-decide-whether-to-pay-down-debt-or-save/',
      label: 'Should you pay debts first or save? Use these guidelines to decide'
    }, {
      link: 'https://www.thesimpledollar.com/is-low-interest-debt-good-debt/',
      label: 'Is Low-Interest Debt \'Good Debt\'?'
    }]
  }, {
    key: 'refusedRetirementUnmatched401k',
    title: 'Contributing to a Unmatched 401(k)',
    paragraphs: [
      (<p key={'p1'}>
        Our information indicates that your employer offers a <strong>401(k)</strong> without a match,
        but you do not participate. We also see that you have emergency savings and no high interest debt.
        You are not alone, 25% of firms in America don't offer an employer match. In this case,
        you might be asking yourself if it is worth investing in a 401(k) without a match.
      </p>),
      (<p key={'p2'}>
        Even without a match, a 401(k) remains an attractive way to invest for retirement. If your employer offers
        reliable funds with low fees, investing in a a 401(k) is nice and simple, since it comes out of payroll.
        You don't have to remember to do it, you usually don't need to worry about contributing too much
        (your employer will most likely keep track for you) and your contributions are tax-free.
        It also has a higher yearly limit than another popular option, an IRA account.
      </p>),
      (<p key={'p3'}>
        However, if you don't like the options in the 401(k) your employer offers, consider investing in an IRA
        before participating in your workplace 401(k). However, considering the lower yearly limit of IRA accounts
        ($5.5k or $6.5 for persons over 50), we recommend contributing the max allowed amount to your IRA
        and then as much as you can to your 401(k). Don't be discouraged from saving for retirement - the opposite!
        If your employer isn't supplementing your retirement savings, you need to take care of yourself even more!
      </p>)
    ],
    usefulLinks: [{
      link: 'https://money.usnews.com/money/personal-finance/retirement/articles/2015/11/13/should-you-invest-in-a-401-k-if-you-dont-get-a-match',
      label: 'Should You Invest in a 401(k) If You Don\'t Get a Match?'
    }, {
      link: 'https://www.cnbc.com/2018/02/02/no-employer-401k-match-at-the-office-no-problem.html',
      label: 'No employer 401(k) match at the office? No problem'
    }, {
      link: 'https://www.nerdwallet.com/blog/investing/401k-matching-contributions/',
      label: '401(k)s Without Matching Contributions: Worth It?'
    }, {
      link: 'https://cashmoneylife.com/contribute-401k-no-employer-match/',
      label: 'Should You Contribute to a 401k Without an Employer Match?'
    }]
  }, {
    key: 'refusedRetirementMatched401k',
    title: 'Contributing to a Matched 401(k)',
    paragraphs: [
      (<p key={'p1'}>
        Our information indicates that your employer offers a <strong>401(k)</strong> with a match,
        but you do not participate. We also see that you have emergency savings and no
        high interest debt.
      </p>),
      (<p key={'p2'}>
        An employer match is a guaranteed return on your investment. It's <strong>free money</strong>!
        No other investment will offer a similar guarantee, so we recommend contributing at least
        enough to your 401(k) to get the full match. Bonus: your contributions are tax free
        (though you will be taxed when you withdraw them during retirement).
      </p>),
      (<p key={'p3'}>
        In 2018, the most you can contribute to a 401(k) is <strong>$18,500</strong>.
        It increases to $24,500 if you’re 50 or older.
        Whatever your employer matches is not included in this limit.
        If you contributed $18,500 to a 401(k) each year for <strong>35 years</strong> and got a 6% average annual return,
        you’d have around <strong>$2.2 million</strong>. Your employer match would add to that total.
        How much money you’ll need in retirement depends on when you plan to retire,
        your desired income during retirement (don't forget to take into account inflation and healtchcare costs)
        and your confidence in the Social Security system.
      </p>)
    ],
    usefulLinks: [{
      link: 'https://www.investopedia.com/articles/personal-finance/112315/how-401k-matching-works.asp',
      label: 'How 401(k) Matching Works?'
    }, {
      link: 'https://www.nerdwallet.com/blog/investing/how-much-should-i-contribute-to-a-401k/',
      label: 'How Much Should I Contribute to a 401(k)?'
    }, {
      link: 'https://www.nerdwallet.com/blog/investing/contribute-company-401k/',
      label: 'Yes, You Need a 401(k) in Your 20s — Here’s Why'
    }, {
      link: 'http://www.401khelpcenter.com/401k_education/10_reasons_to_join_your_401k.html#.W9-FA2hKiUk',
      label: 'Top 10 Reasons to Join Your 401k Plan'
    }]
  }]

export default advice
