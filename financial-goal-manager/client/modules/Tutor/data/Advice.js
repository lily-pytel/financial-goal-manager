import React from 'react'

const advice = [
  {
    key: 'noEmergencySavings',
    title: 'Emergency Savings',
    paragraphs: [
      (<p key={'p1'}>
        Our information indicates that you have not yet set aside some savings for <b>emergency expenses</b>,
        such as loss of employment, car trouble or medical emergencies.
      </p>),
      (<p key={'p2'}>
        We recommend setting aside <b>3-6 months of expenses</b> as a <b>'rainy day'</b> fund in a low-risk location.
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
        Our information indicates that while you have set aside some savings for <b>emergency expenses</b>,
        your emergency fund is lower than 3-6 months of expenses. Emergency expenses can take many forms,
        such as loss of employment, car trouble or medical emergencies.
        They can sometimes come in multiples - remember, when it rains, it pours!
      </p>),
      (<p key={'p2'}>
        We recommend setting aside <b>3-6 months of expenses</b> as a <b>'rainy day'</b> fund in a low-risk location.
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
    paragraphs: [
      (<p key={'p1'}>
        Based on our information, you hold a lot of savings in <strong>cash</strong>.
        Unlike our other pieces of advice, this one should be taken with a grain of salt and depends on factors
        such as the state of the <strong>financial market</strong>, your age, your <strong>risk tolerance</strong>
        and your ability to hold your investments during a <strong>market downturn</strong>. While the stock market
        has historically gone up, past data does not guarantee future data.
        Our goal is to help you make an informed decision, so our useful links will include articles that encourage
        cash savings, as well as articles that discourage holding too much of your savings in cash.
      </p>),
      (<p key={'p2'}>
        Holding too much money in cash that earns less than 1% in interest may prevent you from building wealth
        and retiring comfortably. Historically, the stock market has earned an <strong>average</strong> of 7% yearly returns.
        The word average here is important - some years the market can go down tens of percents, while another year it might
        go up 30%. The key to seeing the coveted 7% is to stay in the market for as long as possible. The stock market is only one
        investment option, but it is usually the most suitable for individuals who want to keep it simple.
        There are many ways of getting into the stock market. You can have as much or as little control as you'd like.
        Investments can be done automatically through tools like <a href='https://www.betterment.com/'>Betterment</a> or you can choose your own stocks by opening
        a brokerage account from with one of <a href='https://www.nerdwallet.com/blog/investing/best-online-brokers-for-stock-trading/'>these</a> institutions.
      </p>),
      (<p key={'p3'}>
        Building wealth is the least straightforward decision out of all the advice we could give you.
        We recommend getting informed before making risky investments in individual stocks.
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
      link: 'https://www.investopedia.com/articles/personal-finance/040915/how-much-cash-should-i-keep-bank.asp',
      label: 'How Much Cash Should I Keep in the Bank?'
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
        Our information indicates that you have some <b>high interest debt</b>,
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
    }, {
      link: 'https://www.cnbc.com/2017/09/13/how-much-americans-at-have-in-their-savings-accounts.html',
      label: 'Here\'s how much money Americans have in their savings accounts'
    }]
  }]

export default advice
