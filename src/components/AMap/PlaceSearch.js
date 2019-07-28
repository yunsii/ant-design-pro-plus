import React from 'react';
import { callFunctionIfFunction } from '@/utils/decorators/callFunctionOrNot';

export default class PlaceSearch extends React.Component {
  constructor(props) {
    super(props);
    const { __map__: map } = props;
    if (!map) {
      throw new Error('PlaceSearch has to be a child of Map component');
    }
  }

  componentDidMount() {
    const { __map__: map, onPlaceSelect } = this.props;
    if (!map) return;

    const auto = new window.AMap.Autocomplete({
      input: 'placeSearch',
    });
    // const placeSearch = new window.AMap.PlaceSearch({
    //   map
    // });  // 构造地点查询类
    function select(e) {
      // placeSearch.setCity(e.poi.adcode);
      // placeSearch.search(e.poi.name);  // 关键字查询查询
      map.setCenter(new window.AMap.LngLat(e.poi.location.lng, e.poi.location.lat));
      callFunctionIfFunction(onPlaceSelect)(e.poi);
    }
    window.AMap.event.addListener(auto, 'select', select); // 注册监听，当选中某条记录时会触发
  }

  render() {
    const { style: customStyle } = this.props;
    const style = {
      position: 'absolute',
      top: '10px',
      left: '10px',
      background: '#fff',
      width: 210,
      ...customStyle,
    };

    return <input id="placeSearch" style={style} placeholder="搜索地址" />;
  }
}
