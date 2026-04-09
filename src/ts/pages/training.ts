import { t, getLang } from '../i18n';
import { getRouteParam, navigate } from '../main';

interface Module {
  id: string;
  title: { en: string; cn: string };
  description: { en: string; cn: string };
  sections: { title: { en: string; cn: string }; content: { en: string; cn: string } }[];
  quiz: { question: { en: string; cn: string }; options: { en: string; cn: string }[]; correct: number }[];
  reflection: { en: string; cn: string };
}

function getModules(): Module[] {
  return [
    {
      id: '1',
      title: { en: 'Who Are Chinese International Students?', cn: '谁是中国留学生？' },
      description: { en: 'Demographics, motivations, and cultural context', cn: '人口统计、动机和文化背景' },
      sections: [
        {
          title: { en: 'By the Numbers', cn: '数据概览' },
          content: {
            en: 'There are approximately 277,398 Chinese students enrolled in U.S. higher education as of 2023-24. China has been the #1 sending country for over a decade. Most are pursuing STEM degrees at the graduate level, though undergraduate enrollment has grown significantly. The majority come from middle-class urban families — not the ultra-wealthy stereotype. Many have taken on significant family debt to study abroad.',
            cn: '截至2023-24学年，约有277,398名中国学生在美国高校就读。中国已连续十多年成为最大的留学生来源国。大多数学生攻读STEM研究生学位，虽然本科入学人数也显著增长。大多数来自城市中产家庭——并非超级富豪的刻板印象。许多人为了出国留学承担了大量家庭债务。'
          }
        },
        {
          title: { en: 'Cultural Context', cn: '文化背景' },
          content: {
            en: 'Most Chinese international students grew up in a society where religion is viewed with suspicion. The dominant worldview is pragmatic materialism — success measured by career, income, and family status. Many have never met a Christian. Their primary cultural values include filial piety (孝), face (面子), relational networks (关系), and educational achievement. Understanding these values is essential for meaningful cross-cultural ministry.',
            cn: '大多数中国留学生在一个对宗教持怀疑态度的社会中长大。主流世界观是实用主义唯物论——以事业、收入和家庭地位来衡量成功。许多人从未遇到过基督徒。他们的核心文化价值观包括孝道、面子、关系和学业成就。理解这些价值观对于有意义的跨文化事工至关重要。'
          }
        },
        {
          title: { en: 'Why They Come', cn: '为什么来留学' },
          content: {
            en: 'The top motivations are: (1) better career prospects, (2) quality education unavailable in China, (3) family expectations, (4) escape from the gaokao pressure cooker, (5) personal growth and independence. Religious exploration is almost never a stated reason — but it becomes one of the most significant outcomes for a substantial minority.',
            cn: '首要动机是：(1) 更好的职业前景，(2) 中国无法获得的优质教育，(3) 家庭期望，(4) 逃离高考压力，(5) 个人成长和独立。宗教探索几乎从不是明确的原因——但对于相当多的少数人来说，它成为了最重要的结果之一。'
          }
        },
      ],
      quiz: [
        {
          question: { en: 'Approximately how many Chinese students are enrolled in U.S. higher education?', cn: '约有多少中国学生在美国高校就读？' },
          options: [
            { en: '50,000', cn: '5万' },
            { en: '150,000', cn: '15万' },
            { en: '277,000', cn: '27.7万' },
            { en: '500,000', cn: '50万' },
          ],
          correct: 2,
        },
        {
          question: { en: 'What is the dominant worldview of most Chinese students?', cn: '大多数中国学生的主流世界观是什么？' },
          options: [
            { en: 'Buddhist spirituality', cn: '佛教灵性' },
            { en: 'Pragmatic materialism', cn: '实用主义唯物论' },
            { en: 'Confucian traditionalism', cn: '儒家传统主义' },
            { en: 'Political activism', cn: '政治激进主义' },
          ],
          correct: 1,
        },
        {
          question: { en: 'Which cultural value is NOT typically central to Chinese students?', cn: '以下哪个文化价值通常不是中国学生的核心？' },
          options: [
            { en: 'Filial piety (孝)', cn: '孝道' },
            { en: 'Individual autonomy', cn: '个人自主' },
            { en: 'Face (面子)', cn: '面子' },
            { en: 'Educational achievement', cn: '学业成就' },
          ],
          correct: 1,
        },
      ],
      reflection: { en: 'Think of a Chinese student you know or have met. What assumptions did you make about them that might not be accurate? How might understanding their cultural background change your approach?', cn: '想想你认识或遇到过的一位中国学生。你对他们做了哪些可能不准确的假设？了解他们的文化背景可能会如何改变你的方式？' },
    },
    {
      id: '2',
      title: { en: 'The First 90 Days', cn: '最初的90天' },
      description: { en: 'The critical welcome window for building relational trust', cn: '建立关系信任的关键欢迎窗口' },
      sections: [
        { title: { en: 'Why 90 Days Matter', cn: '为什么90天很重要' }, content: { en: 'Research consistently shows that the first 90 days after arrival are the most critical window for meaningful connection. Students are experiencing culture shock, loneliness, and identity disruption. They are simultaneously most open to new relationships and most vulnerable to isolation. The patterns established in these first weeks often determine the trajectory of the entire overseas experience.', cn: '研究一致表明，到达后的前90天是有意义联系的最关键窗口。学生正在经历文化冲击、孤独和身份认同动摇。他们同时最开放接受新关系，也最容易陷入孤立。在这最初几周建立的模式通常决定了整个海外经历的走向。' } },
        { title: { en: 'Practical Welcome Actions', cn: '实际欢迎行动' }, content: { en: 'Airport pickup, first grocery trip, phone plan help, apartment setup, campus tour, first home-cooked meal. These practical helps build more trust than any Bible study invitation. The relational pathway: service first → friendship second → spiritual conversations third. Never invert this order.', cn: '机场接送、第一次去超市、手机套餐帮助、公寓布置、校园导览、第一顿家庭烹饪的饭。这些实际帮助比任何查经邀请都能建立更多信任。关系路径：先服务 → 再建立友谊 → 然后才是属灵对话。永远不要颠倒这个顺序。' } },
        { title: { en: 'Common Mistakes', cn: '常见错误' }, content: { en: '(1) Inviting to church before building friendship. (2) Treating students as "projects" rather than people. (3) Overwhelming with information. (4) Ignoring practical needs in favor of spiritual conversations. (5) Assuming all Chinese students are the same. (6) Being offended when they don\'t reciprocate immediately — trust-building takes longer in Chinese culture.', cn: '(1) 在建立友谊之前就邀请去教会。(2) 把学生当"项目"而不是人。(3) 信息过载。(4) 忽视实际需求而偏重属灵对话。(5) 假设所有中国学生都一样。(6) 当他们不立即回应时感到冒犯——在中国文化中建立信任需要更长时间。' } },
      ],
      quiz: [
        { question: { en: 'What should come FIRST in building relationships?', cn: '在建立关系中应该首先做什么？' }, options: [{ en: 'Bible study invitation', cn: '查经邀请' }, { en: 'Practical service', cn: '实际服务' }, { en: 'Theological discussion', cn: '神学讨论' }, { en: 'Church attendance', cn: '参加教会' }], correct: 1 },
        { question: { en: 'Why are the first 90 days critical?', cn: '为什么最初的90天至关重要？' }, options: [{ en: 'Visa regulations', cn: '签证规定' }, { en: 'Students are most open and vulnerable', cn: '学生最开放也最脆弱' }, { en: 'Academic deadlines', cn: '学术截止日期' }, { en: 'Weather conditions', cn: '天气条件' }], correct: 1 },
        { question: { en: 'Which is a common volunteer mistake?', cn: '以下哪个是志愿者常犯的错误？' }, options: [{ en: 'Cooking Chinese food', cn: '做中餐' }, { en: 'Being patient', cn: '耐心等待' }, { en: 'Treating students as projects', cn: '把学生当项目' }, { en: 'Learning basic Mandarin', cn: '学习基本普通话' }], correct: 2 },
      ],
      reflection: { en: 'Describe your current approach to welcoming international students. What would you change after reading this module?', cn: '描述你目前欢迎留学生的方式。阅读本模块后你会改变什么？' },
    },
    {
      id: '3',
      title: { en: 'Cultural Intelligence', cn: '文化智慧' },
      description: { en: 'Understanding Chinese cultural values and communication patterns', cn: '理解中国文化价值观和沟通模式' },
      sections: [
        { title: { en: 'High-Context Communication', cn: '高语境沟通' }, content: { en: 'Chinese culture is high-context: meaning is carried by implication, tone, and relationship, not just words. "Yes" might mean "I hear you" not "I agree." Silence isn\'t discomfort — it\'s thinking. Asking direct questions about faith can feel aggressive. Learn to read indirect signals and create space for gradual disclosure.', cn: '中国文化是高语境文化：意义通过暗示、语气和关系传达，不仅仅是文字。"是的"可能意味着"我听到了"而不是"我同意"。沉默不是不舒服——而是在思考。直接询问关于信仰的问题可能会让人感到咄咄逼人。学会阅读间接信号，为渐进式分享创造空间。' } },
        { title: { en: 'Face and Shame', cn: '面子与羞耻' }, content: { en: 'Face (面子) is the social currency of Chinese culture. Losing face — through public correction, ignorance, or failed expectations — is deeply painful. Never correct a Chinese student publicly. Never assume their silence means agreement. Create face-saving exits in every conversation. This is not dishonesty; it\'s social architecture.', cn: '面子是中国文化的社交货币。丢面子——通过公开纠正、暴露无知或未达期望——是非常痛苦的。永远不要在公开场合纠正中国学生。永远不要假设他们的沉默意味着同意。在每次对话中创造保全面子的出路。这不是不诚实；这是社交架构。' } },
        { title: { en: 'Guanxi (Relationships)', cn: '关系' }, content: { en: 'Guanxi (关系) is the network of relationships through which Chinese society operates. Trust is not given — it\'s earned through consistent small acts over time. Invitations to meals matter more than invitations to events. Meeting family members signals deep commitment. Understanding guanxi means understanding that your relationship IS the ministry — not a means to it.', cn: '关系是中国社会运作的人际网络。信任不是给予的——而是通过持续的小行为逐渐赢得的。吃饭的邀请比活动的邀请更重要。认识家人意味着深层承诺。理解关系意味着理解你的人际关系本身就是事工——而不是事工的手段。' } },
      ],
      quiz: [
        { question: { en: 'In Chinese culture, "yes" often means:', cn: '在中国文化中，"是的"通常意味着：' }, options: [{ en: '"I fully agree"', cn: '"我完全同意"' }, { en: '"I hear you"', cn: '"我听到了"' }, { en: '"Please continue"', cn: '"请继续"' }, { en: '"I disagree"', cn: '"我不同意"' }], correct: 1 },
        { question: { en: 'What is the best way to handle a Chinese student\'s mistake?', cn: '处理中国学生犯错的最佳方式是什么？' }, options: [{ en: 'Correct them publicly to help them learn', cn: '公开纠正以帮助他们学习' }, { en: 'Ignore it completely', cn: '完全忽略' }, { en: 'Address it privately with face-saving language', cn: '私下用保全面子的方式提出' }, { en: 'Tell their friends', cn: '告诉他们的朋友' }], correct: 2 },
        { question: { en: 'Guanxi is best understood as:', cn: '关系最好理解为：' }, options: [{ en: 'A business transaction', cn: '商业交易' }, { en: 'Trust earned through consistent small acts', cn: '通过持续小行为赢得的信任' }, { en: 'Social media connections', cn: '社交媒体关系' }, { en: 'Family obligation', cn: '家庭义务' }], correct: 1 },
      ],
      reflection: { en: 'Think about a cross-cultural miscommunication you\'ve experienced. How might understanding face, high-context communication, or guanxi have changed the outcome?', cn: '想想你经历过的一次跨文化误解。理解面子、高语境沟通或关系可能如何改变结果？' },
    },
    {
      id: '4',
      title: { en: 'Faith Conversations', cn: '信仰对话' },
      description: { en: 'Navigating spiritual discussions with sensitivity and depth', cn: '以敏感和深度引导属灵讨论' },
      sections: [
        { title: { en: 'Starting Points', cn: '起点' }, content: { en: 'Most Chinese students have never had a meaningful conversation about faith. Start with questions, not statements. Ask about their family\'s beliefs, their experience of meaning and purpose, what they admire most in other cultures. The conversion pathway for Chinese students is typically: curiosity about Western culture → friendship with Christians → exposure to community → encounter with the gospel → intellectual engagement → personal faith.', cn: '大多数中国学生从未有过关于信仰的深入对话。从问题开始，而不是陈述。询问他们家庭的信仰、对意义和目标的体验、他们在其他文化中最欣赏什么。中国学生的信仰转变路径通常是：对西方文化的好奇 → 与基督徒的友谊 → 接触社区 → 遇到福音 → 理性参与 → 个人信仰。' } },
        { title: { en: 'Common Objections', cn: '常见反对意见' }, content: { en: 'Be ready for: "Religion is superstition" (address the intellectual tradition), "Christianity is Western" (share Chinese Christianity\'s 1,400-year history), "Science disproves God" (engage the philosophy of science), "My parents would be devastated" (acknowledge the real cost). Each objection is actually a door — they\'re engaging, not dismissing.', cn: '做好准备应对："宗教是迷信"（介绍知识传统），"基督教是西方的"（分享中国基督教1400年的历史），"科学否定了上帝"（参与科学哲学），"我父母会崩溃"（承认真实的代价）。每个反对意见实际上都是一扇门——他们在参与，而不是拒绝。' } },
        { title: { en: 'The Long Game', cn: '持久战' }, content: { en: 'Average time from first Christian contact to baptism for Chinese students: 2-4 years. This is not a sprint. Many will not convert during their time abroad. Your role may be planting seeds that someone else will water in Shanghai or Chengdu years later. Be faithful to the relationship, not attached to the outcome.', cn: '中国学生从首次接触基督徒到受洗的平均时间：2-4年。这不是冲刺。许多人在海外期间不会皈依。你的角色可能是播种，而别人会在几年后在上海或成都浇灌。忠于关系，不执着于结果。' } },
      ],
      quiz: [
        { question: { en: 'What is the typical first step in a Chinese student\'s faith journey?', cn: '中国学生信仰旅程的典型第一步是什么？' }, options: [{ en: 'Reading the Bible', cn: '读圣经' }, { en: 'Curiosity about Western culture', cn: '对西方文化的好奇' }, { en: 'A crisis moment', cn: '危机时刻' }, { en: 'A dream or vision', cn: '异梦或异象' }], correct: 1 },
        { question: { en: 'When a student says "Christianity is Western," they are:', cn: '当学生说"基督教是西方的"时，他们是在：' }, options: [{ en: 'Ending the conversation', cn: '结束对话' }, { en: 'Engaging with an objection worth addressing', cn: '提出值得回应的反对意见' }, { en: 'Being rude', cn: '粗鲁' }, { en: 'Quoting their parents', cn: '引用父母的话' }], correct: 1 },
        { question: { en: 'Average time from first contact to baptism:', cn: '从首次接触到受洗的平均时间：' }, options: [{ en: '1-3 months', cn: '1-3个月' }, { en: '6-12 months', cn: '6-12个月' }, { en: '2-4 years', cn: '2-4年' }, { en: '5+ years', cn: '5年以上' }], correct: 2 },
      ],
      reflection: { en: 'How does the idea of a 2-4 year timeline change your approach to faith conversations? Are you comfortable planting seeds that you may never see grow?', cn: '2-4年的时间线这个概念如何改变你对信仰对话的方式？你是否能接受播种而可能永远看不到收获？' },
    },
    {
      id: '5',
      title: { en: 'Discipleship That Sticks', cn: '持久的门训' },
      description: { en: 'Building faith foundations that survive the return to China', cn: '建立能经受回国考验的信仰基础' },
      sections: [
        { title: { en: 'The 80% Problem', cn: '80%的问题' }, content: { en: 'An estimated 80-85% of Chinese students who become Christians abroad cease fellowship within 1-2 years of returning to China. This is the single biggest failure point in Chinese student ministry. The causes: shallow discipleship, no pre-return preparation, social pressure, no landing community, and identity discontinuity between "American Christian" and "Chinese professional."', cn: '估计80-85%在海外成为基督徒的中国学生在回国后1-2年内停止团契。这是中国学生事工中最大的失败点。原因：浅薄的门训、没有回国前准备、社会压力、没有接应社区、以及"美国基督徒"和"中国职场人"之间的身份不连续。' } },
        { title: { en: 'What Deep Discipleship Looks Like', cn: '深度门训的样子' }, content: { en: 'It\'s not just Bible knowledge. It\'s: (1) Personal devotional habits that don\'t depend on a group. (2) Theology articulated in Chinese, not just English. (3) A practiced response to family pressure. (4) At least 2-3 Christian contacts in their home city. (5) Experience leading — not just attending — a small group. The goal: a self-sustaining faith, not a church-dependent one.', cn: '不仅仅是圣经知识。而是：(1) 不依赖团体的个人灵修习惯。(2) 用中文而不仅是英文表达的神学。(3) 对家庭压力的练习回应。(4) 在家乡城市至少有2-3个基督徒联系人。(5) 带领小组的经验——而不仅仅是参加。目标：自我维持的信仰，而不是依赖教会的信仰。' } },
        { title: { en: 'Pre-Return Checklist', cn: '回国前清单' }, content: { en: 'Before a student returns: (1) Download offline Bible and devotional apps. (2) Print key Scripture passages. (3) Connect with at least one trusted contact in their destination city. (4) Complete the Returnee Preparation Tool for a personalized kit. (5) Have an honest conversation about the challenges ahead. (6) Establish a regular check-in schedule with an overseas mentor.', cn: '在学生回国前：(1) 下载离线圣经和灵修应用。(2) 打印关键经文。(3) 在目的地城市联系至少一位可信赖的联系人。(4) 完成回国准备工具以获得个性化指南。(5) 坦诚地讨论前方的挑战。(6) 与海外导师建立定期联系计划。' } },
      ],
      quiz: [
        { question: { en: 'What percentage of returnee Christians lose fellowship?', cn: '多少比例的回国基督徒失去团契？' }, options: [{ en: '30-40%', cn: '30-40%' }, { en: '50-60%', cn: '50-60%' }, { en: '80-85%', cn: '80-85%' }, { en: '95%', cn: '95%' }], correct: 2 },
        { question: { en: 'Deep discipleship requires:', cn: '深度门训需要：' }, options: [{ en: 'More Bible classes', cn: '更多查经课' }, { en: 'Self-sustaining faith practices', cn: '自我维持的信仰实践' }, { en: 'Larger church attendance', cn: '更多教会出席' }, { en: 'Theological degree', cn: '神学学位' }], correct: 1 },
        { question: { en: 'What should be done BEFORE a student returns?', cn: '在学生回国前应该做什么？' }, options: [{ en: 'Nothing — they\'ll figure it out', cn: '什么都不用——他们会自己弄明白' }, { en: 'Pre-return preparation and connection', cn: '回国前准备和联系' }, { en: 'More evangelism events', cn: '更多布道活动' }, { en: 'Fundraising', cn: '筹款' }], correct: 1 },
      ],
      reflection: { en: 'Evaluate a student you\'re currently discipling (or have discipled). Using the 5 criteria above, which areas are strong and which need attention before they return?', cn: '评估你目前正在门训（或曾经门训）的一位学生。根据以上5个标准，哪些方面很强，哪些需要在他们回国前加强？' },
    },
    {
      id: '6',
      title: { en: 'Preparing for Goodbye', cn: '准备告别' },
      description: { en: 'Healthy transitions and lasting connections across borders', cn: '健康的过渡和跨越国界的持久联系' },
      sections: [
        { title: { en: 'The Emotional Weight of Goodbye', cn: '告别的情感重量' }, content: { en: 'Graduation isn\'t just academic — for a Christian Chinese student, it means leaving the community that nurtured their faith. Many describe it as "losing everything at once." Acknowledge this grief. Don\'t minimize it with platitudes about God\'s plan. Sit in the sadness with them.', cn: '毕业不仅仅是学术上的——对于一个基督徒中国学生来说，这意味着离开培育他们信仰的社区。许多人将其描述为"一下子失去一切。"承认这种悲伤。不要用关于上帝计划的陈词滥调来淡化它。与他们一起在悲伤中坐一会。' } },
        { title: { en: 'Building Bridges Before They Leave', cn: '在他们离开前建桥' }, content: { en: 'Start the goodbye process 3 months before departure. Help them build a "faith support network" that spans borders: (1) An overseas mentor for monthly calls. (2) A local Christian contact in their destination. (3) An online small group or accountability partner. (4) Saved resources that work without VPN. The transition from "American church member" to "Chinese underground Christian" is the hardest identity shift in ministry.', cn: '在离开前3个月开始告别过程。帮助他们建立一个跨越国界的"信仰支持网络"：(1) 一位海外导师进行月度通话。(2) 目的地的一位当地基督徒联系人。(3) 一个在线小组或问责伙伴。(4) 不需要VPN就能使用的保存资源。从"美国教会成员"到"中国地下基督徒"的转变是事工中最困难的身份转换。' } },
        { title: { en: 'After They Leave', cn: '他们离开后' }, content: { en: 'The first 90 days back are as critical as the first 90 days abroad. Check in consistently — not just once. Use WeChat, not email (email feels formal and distant in Chinese communication culture). Celebrate small wins: "I found a church!" "I told my mom." "I read my Bible today." Each of these is a victory against the 80% statistic.', cn: '回国后的前90天和出国后的前90天同样关键。持续联系——不仅仅是一次。使用微信，而不是电子邮件（在中国通讯文化中电子邮件感觉正式而疏远）。庆祝小胜利："我找到教会了！""我告诉我妈了。""我今天读圣经了。"每一个都是对抗80%统计数字的胜利。' } },
      ],
      quiz: [
        { question: { en: 'When should goodbye preparation begin?', cn: '告别准备应该何时开始？' }, options: [{ en: 'The week before departure', cn: '离开前一周' }, { en: '3 months before departure', cn: '离开前3个月' }, { en: 'At graduation', cn: '毕业时' }, { en: 'After they leave', cn: '他们离开后' }], correct: 1 },
        { question: { en: 'What communication method should you use after they return?', cn: '他们回国后应该使用什么沟通方式？' }, options: [{ en: 'Email', cn: '电子邮件' }, { en: 'Phone calls', cn: '电话' }, { en: 'WeChat', cn: '微信' }, { en: 'Facebook', cn: 'Facebook' }], correct: 2 },
        { question: { en: 'The hardest identity shift is:', cn: '最困难的身份转变是：' }, options: [{ en: 'Student to professional', cn: '学生到职场人' }, { en: 'American church member to Chinese underground Christian', cn: '美国教会成员到中国地下基督徒' }, { en: 'Single to married', cn: '单身到已婚' }, { en: 'Chinese to Western', cn: '中国到西方' }], correct: 1 },
      ],
      reflection: { en: 'If a student you\'re close to were leaving next month, what three specific things would you do to prepare them? Be concrete — not "pray for them" but "schedule a monthly WeChat call for the first 6 months."', cn: '如果你亲近的一位学生下个月就要离开，你会做哪三件具体的事来为他们做准备？要具体——不是"为他们祷告"而是"安排前6个月每月一次微信通话。"' },
    },
  ];
}

function getProgress(): Record<string, boolean> {
  const stored = localStorage.getItem('xuanyan-training');
  return stored ? JSON.parse(stored) : {};
}

function saveProgress(moduleId: string, completed: boolean): void {
  const progress = getProgress();
  progress[moduleId] = completed;
  localStorage.setItem('xuanyan-training', JSON.stringify(progress));
}

export function renderTraining(): void {
  const app = document.getElementById('app')!;
  const lang = getLang();
  const modules = getModules();
  const progress = getProgress();
  const completedCount = Object.values(progress).filter(Boolean).length;

  app.innerHTML = `
    <div class="tool-page container">
      <div class="tool-header">
        <h1>${t('training.title')}</h1>
        <p>${t('training.subtitle')}</p>
      </div>
      <div style="margin-bottom: 32px;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
          <span style="font-family: var(--font-mono); color: var(--accent-gold); font-size: 1.5rem;">${completedCount}</span>
          <span style="color: var(--text-secondary); font-size: 0.875rem;">/ 6 ${t('training.progress')}</span>
        </div>
        <div style="height: 4px; background: var(--border); border-radius: 2px; overflow: hidden;">
          <div style="height: 100%; width: ${(completedCount / 6) * 100}%; background: var(--accent-gold); border-radius: 2px; transition: width 0.3s;"></div>
        </div>
      </div>
      <div class="module-grid">
        ${modules.map(m => `
          <a class="module-card" href="#/tools/training/${m.id}" style="text-decoration:none; color:inherit; display:block;">
            <div style="display: flex; justify-content: space-between;">
              <span class="number">${m.id.padStart(2, '0')}</span>
              ${progress[m.id] ? '<span class="check">✓</span>' : ''}
            </div>
            <h3>${m.title[lang]}</h3>
            <p style="font-size: 0.8125rem; color: var(--text-secondary);">${m.description[lang]}</p>
            <div class="progress">
              <div class="progress-fill" style="width: ${progress[m.id] ? '100' : '0'}%"></div>
            </div>
          </a>
        `).join('')}
      </div>
    </div>
  `;
}

export function renderTrainingModule(): void {
  const id = getRouteParam('id');
  if (!id) { navigate('/tools/training'); return; }

  const modules = getModules();
  const module = modules.find(m => m.id === id);
  if (!module) { navigate('/tools/training'); return; }

  const app = document.getElementById('app')!;
  const lang = getLang();

  app.innerHTML = `
    <div class="tool-page container" style="max-width: 800px; margin: 0 auto;">
      <p><a href="#/tools/training" style="font-size: 0.8125rem; color: var(--text-tertiary);">← ${t('common.back')}</a></p>
      <h1 style="margin-bottom: 8px;">${module.title[lang]}</h1>
      <p style="color: var(--text-secondary); margin-bottom: 48px;">${module.description[lang]}</p>

      ${module.sections.map((s, i) => `
        <div style="margin-bottom: 32px;">
          <h2 style="font-size: 1.25rem; cursor: pointer; display: flex; align-items: center; gap: 8px;" onclick="this.nextElementSibling.classList.toggle('hidden')">
            <span style="color: var(--accent-gold); font-family: var(--font-mono);">${i + 1}.</span>
            ${s.title[lang]}
            <span style="color: var(--text-tertiary); font-size: 0.875rem;">▼</span>
          </h2>
          <div style="padding: 16px 0 16px 24px; border-left: 2px solid var(--border);">
            <p style="font-size: 0.9375rem; line-height: 1.8; color: var(--text-secondary);">${s.content[lang]}</p>
          </div>
        </div>
      `).join('')}

      <div style="margin-top: 48px; padding-top: 32px; border-top: 1px solid var(--border);">
        <h2 style="font-size: 1.25rem; margin-bottom: 24px;">${t('training.quiz')}</h2>
        <div id="quiz-container">
          ${module.quiz.map((q, qi) => `
            <div class="form-group" data-quiz="${qi}">
              <p style="font-weight: 500; margin-bottom: 12px;">${qi + 1}. ${q.question[lang]}</p>
              ${q.options.map((opt, oi) => `
                <label class="checkbox-item" style="margin-bottom: 8px;">
                  <input type="radio" name="q${qi}" value="${oi}">
                  ${opt[lang]}
                </label>
              `).join('')}
            </div>
          `).join('')}
          <button class="btn btn-primary" id="check-quiz">${lang === 'en' ? 'Check Answers' : '检查答案'}</button>
          <div id="quiz-result" style="margin-top: 16px;"></div>
        </div>
      </div>

      <div style="margin-top: 48px; padding-top: 32px; border-top: 1px solid var(--border);">
        <h2 style="font-size: 1.25rem; margin-bottom: 16px;">${t('training.reflection')}</h2>
        <p style="font-size: 0.9375rem; color: var(--text-secondary); margin-bottom: 16px;">${module.reflection[lang]}</p>
        <textarea class="chat-input" rows="4" placeholder="${lang === 'en' ? 'Write your reflection...' : '写下你的反思...'}" id="reflection-text">${localStorage.getItem(`xuanyan-reflection-${id}`) || ''}</textarea>
        <button class="btn btn-ghost" style="margin-top: 8px;" id="save-reflection">${lang === 'en' ? 'Save' : '保存'}</button>
      </div>
    </div>
  `;

  // Quiz checking
  document.getElementById('check-quiz')?.addEventListener('click', () => {
    let correct = 0;
    module.quiz.forEach((q, qi) => {
      const selected = document.querySelector(`input[name="q${qi}"]:checked`) as HTMLInputElement;
      if (selected && parseInt(selected.value) === q.correct) correct++;
    });
    const passed = correct >= 2;
    const resultDiv = document.getElementById('quiz-result')!;
    resultDiv.innerHTML = `
      <p style="color: ${passed ? 'var(--success)' : 'var(--error)'}; font-weight: 600;">
        ${correct}/${module.quiz.length} ${lang === 'en' ? 'correct' : '正确'}
        ${passed ? (lang === 'en' ? ' — Module complete!' : ' — 模块完成！') : (lang === 'en' ? ' — Try again (need 2/3)' : ' — 再试一次（需要2/3）')}
      </p>
    `;
    if (passed) saveProgress(id!, true);
  });

  // Reflection saving
  document.getElementById('save-reflection')?.addEventListener('click', () => {
    const text = (document.getElementById('reflection-text') as HTMLTextAreaElement).value;
    localStorage.setItem(`xuanyan-reflection-${id}`, text);
  });
}
