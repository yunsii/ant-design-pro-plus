const members = [
  {
    id: '000000001',
    avatar: 'http://www.snh48.com/images/member/mp_10146.jpg',
    profile: 'http://www.snh48.com/member_details.html?sid=10146',
    name: '孙珍妮',
    nickname: '珍妮',
    birthday: '05.05',
    birthplace: '中国 上海',
    speciality: '唱歌、吉他',
    habit: '吃东西、逛街',
  },
  {
    id: '000000002',
    avatar: 'http://www.bej48.com/images/member/zp_20001.jpg',
    profile: 'http://www.bej48.com/member/member_details.html?sid=20001',
    name: '陈美君',
    nickname: 'MIMI',
    birthday: '01.15',
    birthplace: '中国 广东',
    speciality: '钢琴、吉他',
    habit: '旅游、宅',
  },
  {
    id: '000000003',
    avatar: 'http://www.snh48.com/images/member/mp_10119.jpg',
    profile: 'http://www.snh48.com/member_details.html?sid=10119',
    name: '姜杉',
    nickname: '扇子、姜姜',
    birthday: '10.06',
    birthplace: '中国 河南',
    speciality: '做羊毛毡、粘土、编辫子',
    habit: '日剧、动漫、手工',
  },
  {
    id: '000000004',
    avatar: 'http://www.snh48.com/images/member/mp_10211.jpg',
    profile: 'http://www.snh48.com/member_details.html?sid=10211',
    name: '郝婧怡',
    nickname: '静静、果酱',
    birthday: '02.23',
    birthplace: '中国 陕西',
    speciality: '舞蹈',
    habit: '舞蹈、游泳',
  },
  {
    id: '000000005',
    avatar: 'http://www.bej48.com/images/member/zp_20081.jpg',
    profile: 'http://www.bej48.com/member/member_details.html?sid=20081',
    name: '杨鑫',
    nickname: 'jojo',
    birthday: '11.23',
    birthplace: '中国 北京',
    speciality: '烹饪',
    habit: '游戏、追剧听歌、吃',
  },
  {
    id: '000000006',
    avatar: 'http://www.snh48.com/images/member/mp_10181.jpg',
    profile: 'http://www.snh48.com/member_details.html?sid=10181',
    name: '王奕',
    nickname: '一一',
    birthday: '06.06',
    speciality: '画画、种花、DIY',
    habit: '画画',
  },
  {
    id: '000000007',
    avatar: 'http://www.snh48.com/images/member/mp_10087.jpg',
    profile: 'http://www.snh48.com/member_details.html?sid=10087',
    name: '宋昕冉',
    nickname: '冉冉',
    birthday: '07.08',
    speciality: '唱歌、拉丁舞、二胡',
    habit: '运动、旅游、看电影',
  },
  {
    id: '000000008',
    avatar: 'http://www.snh48.com/images/member/mp_10188.jpg',
    profile: 'http://www.snh48.com/member_details.html?sid=10188',
    name: '李星羽',
    nickname: '抛抛',
    birthday: '02.06',
    speciality: '朗诵',
    habit: '看书、主持',
  },
  {
    id: '000000009',
    avatar: 'http://www.bej48.com/images/member/zp_20006.jpg',
    profile: 'http://www.bej48.com/member/member_details.html?sid=20006',
    name: '胡晓慧',
    nickname: '包子',
    birthday: '09.16',
    birthplace: '中国 河南',
    speciality: '舞蹈、接受能力强',
    habit: '跳高、羽毛球、看电影',
  },
  {
    id: '000000010',
    avatar: 'http://www.bej48.com/images/member/zp_20092.jpg',
    profile: 'http://www.bej48.com/member/member_details.html?sid=20092',
    name: '周湘',
    nickname: '香菜',
    birthday: '03.18',
    birthplace: '中国 江西',
    speciality: '睫毛特长',
    habit: '古筝',
  },
  {
    id: '000000011',
    avatar: 'http://www.bej48.com/images/member/zp_20056.jpg',
    profile: 'http://www.bej48.com/member/member_details.html?sid=20056',
    name: '张怀瑾',
    nickname: '锦鲤',
    birthday: '05.11',
    birthplace: '中国 辽宁',
    speciality: '写作 水彩画',
    habit: '跳舞 逗猫 配音',
  },
];

export const getMembers = params => {
  let { page = '1', limit = '10' } = params;
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const startIndex = (page - 1) * limit;

  return {
    data: {
      data: members.slice(startIndex, startIndex + limit),
      current_page: page,
      per_page: limit,
      total: members.length,
    },
    status_code: 200,
  };
};

export const getDetail = id => {
  return {
    data: {
      name: 'XXX',
      textarea: id,
    },
  };
};
