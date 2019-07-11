const getNotices = (req, res) =>
  res.json([
    {
      id: '000000001',
      avatar: 'http://www.snh48.com/images/member/mp_10146.jpg',
      profile: 'https://www.snh48.com/member_details.html?sid=10146',
      name: '孙珍妮',
      nickname: '珍妮',
      birthday: '05.05',
      speciality: '唱歌、吉他',
      habit: '吃东西、逛街',
    },
    {
      id: '000000002',
      avatar: 'http://www.bej48.com/images/member/zp_20001.jpg',
      profile: 'https://www.bej48.com/member/member_details.html?sid=20001',
      name: '陈美君',
      nickname: 'MIMI',
      birthday: '01.15',
      speciality: '钢琴、吉他',
      habit: '旅游、宅',
    },
    {
      id: '000000003',
      avatar: 'http://www.snh48.com/images/member/mp_10119.jpg',
      profile: 'https://www.snh48.com/member_details.html?sid=10119',
      name: '姜杉',
      nickname: '扇子、姜姜',
      birthday: '10.06',
      speciality: '做羊毛毡、粘土、编辫子',
      habit: '日剧、动漫、手工',
    },
    {
      id: '000000004',
      avatar: 'http://www.snh48.com/images/member/mp_10211.jpg',
      profile: 'https://www.snh48.com/member_details.html?sid=10211',
      name: '郝婧怡',
      nickname: '静静、果酱',
      birthday: '02.23',
      speciality: '舞蹈',
      habit: '舞蹈、游泳',
    },
    {
      id: '000000005',
      avatar: 'http://www.bej48.com/images/member/zp_20081.jpg',
      profile: 'https://www.bej48.com/member/member_details.html?sid=20081',
      name: '杨鑫',
      nickname: 'jojo',
      birthday: '11.23',
      speciality: '烹饪',
      habit: '游戏、追剧听歌、吃',
    },
  ]);

export default {
  'GET /api/enhance/curd-page': getNotices,
};
