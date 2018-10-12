import cuid from 'cuid'
import Goal from './models/goal'

export default function () {
  Goal.count().exec((err, count) => {
    if (count > 0) {
      return
    }

    const goals = [
      {
        key: cuid(),
        name: 'Contribute to an IRA',
        type: 'Retirement',
        description: 'Reach the maximum contribution',
        years: [
          { year: 2019, value: 5500 },
          { year: 2020, value: 5500 },
          { year: 2021, value: 5500 }
        ],
        progress: [
          { date: '2019-12-31', value: 4500 },
          { date: '2020-12-31', value: 5500 },
          { date: '2021-12-31', value: 5500 }
        ]
      },
      {
        key: cuid(),
        name: 'Build emergency savings',
        type: 'Savings',
        description: 'Build 3 months of expenses',
        years: [
          { year: 2019, value: 1000 },
          { year: 2020, value: 2000 },
          { year: 2021, value: 3000 }
        ],
        progress: [
          { date: '2019-12-31', value: 1010 },
          { date: '2020-12-31', value: 2000 },
          { date: '2021-12-31', value: 3500 }
        ]
      },
      {
        key: cuid(),
        name: 'Save part of salary',
        type: 'Wealth',
        description: 'Save 10% of salary',
        years: [
          { year: 2019, value: 2000 },
          { year: 2020, value: 4000 },
          { year: 2021, value: 6000 }
        ],
        progress: [
          { date: '2019-12-31', value: 2200 },
          { date: '2020-12-31', value: 4000 },
          { date: '2021-12-31', value: 6000 }
        ]
      },
      {
        key: cuid(),
        name: 'Save part of bonus',
        type: 'Wealth',
        description: 'Reach the maximum contribution',
        years: [
          { year: 2019, value: 3000 },
          { year: 2020, value: 6000 },
          { year: 2021, value: 9000 }
        ],
        progress: [
          { date: '2019-12-31', value: 3000 },
          { date: '2020-12-31', value: 6000 },
          { date: '2021-12-31', value: 9200 }
        ]
      }
    ]

    Goal.create(goals, (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    })
  })
}
