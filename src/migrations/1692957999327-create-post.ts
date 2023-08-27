import { Post } from '@/post/entities/post.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePost1692957999327 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const posts = [
      {
        blog: "The OPM Director's Blog",
        title: 'Open Season Offers Benefit Choices',
        url: 'http://www.opm.gov/blogs/Director/2016/11/15/Open-Season-Offers-Benefit-Choices/',
        author: 'Alan P. Spielman, Director, Healthcare & Insurance',
        tags: [
          'Federal Benefits Open Season',
          'Federal Healthcare Benefits',
          'FEHB',
          'FSA',
          'Health Insurance',
          'Open Season',
        ],
        description:
          '\nFederal Benefits Open Season is here! Each year, we encourage all eligible employees and retirees to review their health, dental, vision, and dependent care needs and to make changes to or enroll in one of the available benefit programs. Open Season is the time to make choices you generally cannot make at any other time of the year.\nRemember, all health, dental, or vision plans are not alike. Open Season is about exercising your ability to choose the benefits that best meet you and your family&rsquo;s needs. You have between now and December 12 to make your benefit decisions. Here is a link to learn more about the Federal Benefits Open Season.\nThe Federal Employees Health Benefits (FEHB) Program \nThe FEHB Program covers over 8.2 million employees, retirees, and their families all across this country. For 2017, there will be 245 health plans available, with 15 of them available nationwide. And remember, all FEHB Plans now offer the opportunity to enroll in a Self Plus One enrollment type. This option allows you to cover yourself and one eligible family member who you designate, such as a spouse or child. If you did not take advantage of Self Plus One last year, you...',
        thumbnail: null,
        image: null,
        mediumsquare: null,
        published: '2016-11-15T13:57:00',
        shortitle: '',
      },
      {
        blog: "The OPM Director's Blog",
        title: 'Celebrating our Veterans',
        url: 'http://www.opm.gov/blogs/Director/2016/11/11/Celebrating-our-Veterans/',
        author: 'Beth Cobert',
        tags: [
          'Tomb of the Unknown Soldier',
          'Veterans',
          'Veterans Day',
          'Veterans Hiring',
        ],
        description:
          'This Veterans Day, as we honor and express our gratitude to the men and women who so valiantly served our nation in uniform, I want us to take a moment and think about the battle so many of our returning heroes face &ndash; how to make the transition to the next chapter of their lives.\nI&rsquo;m thinking about veterans like Christopher, who after being deployed to Iraq and Afghanistan during his decade of service in the Air Force went from job to job, doing work that did not satisfy him.\nOr Georgia, a disabled combat veteran whose work as a water purification and distribution specialist during Desert Shield/Desert Storm did not, she said, translate very well in the civilian sector.\nOr Julien, a Purple Heart recipient who was a field radio operator in the Marine Corps. When he left the military, his challenge was to balance going to school full time and working full time.\nVeterans like these were on President Obama&rsquo;s mind when he issued Executive Order 13518 to honor our obligations to our nation&rsquo;s returning service members and establish a hallmark Federal employment initiative to encourage more veterans to join the Federal service.\nA look at the numbers shows we&rsquo;re delivering on the...',
        thumbnail: null,
        image: null,
        mediumsquare: null,
        published: '2016-11-11T09:03:33.733',
        shortitle: '',
      },
      {
        blog: "The OPM Director's Blog",
        title:
          'Federal Employees Unite to "Show Some Love" as 2016 CFC Builds Momentum',
        url: 'http://www.opm.gov/blogs/Director/2016/10/24/Federal-Employees-Unite-to-Show-Some-Love-as-2016-CFC-Builds-Momentum/',
        author: 'Keith Willingham, Director, Combined Federal Campaign',
        tags: ['2013 CFC Campaign', 'CFC', 'Combined Federal Campaign'],
        description:
          '\nWhether its animal welfare, art and music programs, support for veterans or the environment, cancer research or soup kitchens, the issues Federal employees care about are varied and diverse. &nbsp;But Federal employees share a common goal: &nbsp;they care about the world we live in, and want to make it a better place.&nbsp; You should know that through the Combined Federal Campaign (CFC), you can contribute to your favorite cause that has special meaning for you and/or your family.\nYou and nearly 4 million of your Federal civilian, postal, and military colleagues continue to make the CFC the largest and most successful workplace philanthropic giving programs in the world. &nbsp;In 2015, Federal employees donated nearly $178 million through the CFC to charitable causes in their local communities, throughout the nation, and around the world. &nbsp;In fact, since the program began, more than $8 billion has been contributed by Federal employees to help those in need.\nThe reasons for you to give through the CFC are simple:\nChoice &ndash; Participation in the CFC is voluntary and easy to do. &nbsp;You can choose from a number of giving methods: &nbsp;one-time or recurring; cash, check, credit card, or payroll deduction; paper pledge form or online pledge. &nbsp;The...',
        thumbnail: null,
        image: null,
        mediumsquare: null,
        published: '2016-10-24T07:37:51.843',
        shortitle: '',
      },
      {
        blog: "The OPM Director's Blog",
        title: 'OPM and DOJ Partner On Domestic Violence Strategy',
        url: 'http://www.opm.gov/blogs/Director/2016/10/12/OPM-and-DOJ-Partner-On-Domestic-Violence-Strategy/',
        author: 'Beth Cobert',
        tags: [],
        description:
          '\n\nWe all know that domestic violence, sexual assault, and stalking (DVSAS) are significant problems that affect individuals, families, and communities. The unfortunate reality is that &ndash; whether we know it or not &ndash; at some point in our careers most of us likely will have a colleague who has experienced or is experiencing domestic violence, sexual assault, or stalking. The effects of such violence often don&rsquo;t just remain within the walls of the home.&nbsp; They affect all of us who live and work with victims and survivors, their children, and other loved ones. To do our part in providing all employees with a safe and supportive workplace, OPM and DOJ have announced a new online training to educate Federal employees and managers on this sensitive topic. \nOctober is Domestic Violence Awareness Month, and whether DVSAS has affected you personally, a family member or friend, this issue is unfortunately, extremely prevalent in today&rsquo;s society. According to the Centers for Disease Control and Prevention (CDC), on average, 20 people per minute in the United States are victims of physical violence by an intimate partner and domestic violence costs our nation approximately $8 billion a year in lost productivity and health care costs....',
        thumbnail: null,
        image: null,
        mediumsquare: null,
        published: '2016-10-12T10:00:00',
        shortitle: '',
      },
      {
        blog: "The OPM Director's Blog",
        title: 'Factsheet: National Background Investigations Bureau',
        url: 'http://www.opm.gov/blogs/Director/2016/9/29/Factsheet-National-Background-Investigations-Bureau/',
        author: 'Beth Cobert',
        tags: [
          'Background Investigations',
          'FIS',
          'National Background Investigations Bureau',
          'NBIB',
        ],
        description:
          '\nEarlier this year, the Administration announced a series of policy decisions to streamline and enhance how the Federal government conducts background investigations. A central component in this effort is the establishment of the National Background Investigations Bureau (NBIB), a new semi-autonomous entity within the Office of Personnel Management (OPM). NBIB will be the primary provider of effective, efficient, and secure background investigations for the Federal Government. NBIB is designed with an enhanced focus on national security, customer service, and continuous process improvement to meet this critical government-wide need now and in the future. \nToday, the President took the next step in this effort by issuing an Executive Order (EO) that sets forth the new interagency framework to modernize, strengthen and secure the Federal Government&rsquo;s background investigation process, including the roles and responsibilities for NBIB and for DoD&rsquo;s related IT efforts.\nIn addition, the Administration is announcing the appointment of Charles S. Phalen, Jr. as NBIB&rsquo;s first Director. Mr. Phalen brings a wealth of experience and security expertise from the Federal Government and the private sector to NBIB. As Director of Security for the Central Intelligence Agency (CIA) from 2007 to 2011, he led the CIA&rsquo;s world-wide security program, responsible for investigating...',
        thumbnail: null,
        image: null,
        mediumsquare: null,
        published: '2016-09-29T13:28:00',
        shortitle: '',
      },
    ];

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('post')
      .values(
        posts.map(({ description, title }, index) => ({
          id: index + 2,
          title,
          content: description,
        })),
      )
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from(Post)
      .execute();
  }
}
